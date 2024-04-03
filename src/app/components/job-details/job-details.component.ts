import { Component, OnDestroy, OnInit } from '@angular/core';
import { JobsService } from '../../services/jobs.service';
import { Subject, takeUntil } from 'rxjs';
import { LocalStorageService } from '../../services/local-storage.service';
import { GlobalConstants } from '../../shared/constants/global.constants';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { JobDetails } from '../../shared/models/jobs.model';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RouteConstants } from '../../shared/constants/route.constants';

@Component({
  selector: 'app-job-details',
  standalone: true,
  imports: [ToastModule, CommonModule, ButtonModule],
  templateUrl: './job-details.component.html',
  styleUrl: './job-details.component.css',
  providers: [MessageService],
})
export class JobDetailsComponent implements OnInit, OnDestroy {
  selectedJobId!: number;
  selectedJobDetails!: JobDetails;
  dataLoaded = false;
  routeConstants = RouteConstants;
  globalConstants = GlobalConstants;
  subscriptions = new Subject<void>();

  constructor(
    private jobsService: JobsService,
    private localStorageService: LocalStorageService,
    private messageService: MessageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.selectedJobId = this.localStorageService.getData(
      this.globalConstants.job_id
    );
    this.initialize();
  }

  private initialize(): void {
    this.jobsService
      .getJobDetailsById(this.selectedJobId)
      .pipe(takeUntil(this.subscriptions))
      .subscribe({
        next: (response) => {
          if (response) {
            this.selectedJobDetails = response;
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

  protected redirectToJobList(): void {
    this.router.navigate([this.routeConstants.job_list_route]);
  }

  ngOnDestroy(): void {
    this.subscriptions.next();
    this.subscriptions.complete();
  }
}
