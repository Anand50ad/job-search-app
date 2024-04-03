import { Component, OnInit } from '@angular/core';
import { JobComponent } from '../../shared/components/job/job.component';
import { Job } from '../../shared/models/jobs.model';
import { LocalStorageService } from '../../services/local-storage.service';
import { GlobalConstants } from '../../shared/constants/global.constants';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RouteConstants } from '../../shared/constants/route.constants';

@Component({
  selector: 'app-job-favourites',
  standalone: true,
  imports: [JobComponent, CommonModule],
  templateUrl: './job-favourites.component.html',
  styleUrl: './job-favourites.component.css',
})
export class JobFavouritesComponent implements OnInit {
  jobFavourites: Job[] = [];
  favouriteJobsAvailable = false;
  routeConstants = RouteConstants;
  globalConstants = GlobalConstants;

  constructor(
    private localStorageService: LocalStorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (
      this.localStorageService.getData(this.globalConstants.job_list)?.length >
      0
    ) {
      this.jobFavourites = this.localStorageService
        .getData(this.globalConstants.job_list)
        .filter((job: Job) => job.starred);
      if (this.jobFavourites?.length > 0) {
        this.favouriteJobsAvailable = true;
      }
    }
  }

  protected onRedirectToJobDetails(event: number): void {
    this.localStorageService.setData(this.globalConstants.job_id, event);
    this.router.navigate([this.routeConstants.job_details_route]);
  }
}
