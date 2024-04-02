import { Component, OnDestroy, OnInit } from '@angular/core';
import { JobComponent } from '../../shared/components/job/job.component';
import { JobsService } from '../../services/jobs.service';
import { Subject, takeUntil } from 'rxjs';
import { Job } from '../../shared/models/jobs.model';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { GlobalConstants } from '../../shared/constants/global.constants';
import { LocalStorageService } from '../../services/local-storage.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouteConstants } from '../../shared/constants/route.constants';

@Component({
  selector: 'app-job-list',
  standalone: true,
  imports: [JobComponent, ToastModule, CommonModule],
  templateUrl: './job-list.component.html',
  styleUrl: './job-list.component.css',
  providers: [MessageService],
})
export class JobListComponent implements OnInit, OnDestroy {
  jobList: Job[] = [];
  dataLoaded = false;
  routeConstants = RouteConstants;
  globalConstants = GlobalConstants;
  subscriptions = new Subject<void>();

  constructor(
    private jobsService: JobsService,
    private messageService: MessageService,
    private localStorageService: LocalStorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (
      this.localStorageService.getData(this.globalConstants.job_list)?.length >
      0
    ) {
      this.jobList = this.localStorageService.getData(
        this.globalConstants.job_list
      );
      this.dataLoaded = true;
    } else {
      this.initialize();
    }
  }

  private initialize(): void {
    this.jobsService
      .getAllJobs()
      .pipe(takeUntil(this.subscriptions))
      .subscribe({
        next: (response) => {
          if (response && response?.length > 0) {
            this.jobList = response.map((job) => {
              return { ...job, starred: false };
            });
            this.localStorageService.setData(
              this.globalConstants.job_list,
              this.jobList
            );
            this.dataLoaded = true;
          }
        },
        error: () => {
          this.messageService.add({
            severity: this.globalConstants.error,
            summary: this.globalConstants.something_went_wrong,
            detail: this.globalConstants.err_while_fetching,
          });
        },
      });
  }

  protected onStarClicked(event: Job): void {
    const selectedJob = this.jobList.find((job) => job.id === event.id);
    if (selectedJob) {
      selectedJob.starred = !selectedJob.starred;
    }
    this.localStorageService.setData(
      this.globalConstants.job_list,
      this.jobList
    );
  }

  protected onRedirectToJobDetails(event: number): void {
    this.localStorageService.setData(this.globalConstants.job_id, event);
    this.router.navigate([this.routeConstants.job_details_route]);
  }

  ngOnDestroy(): void {
    this.subscriptions.next();
    this.subscriptions.complete();
  }
}
