import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GlobalConstants } from '../../constants/global.constants';
import { Job } from '../../models/jobs.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-job',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './job.component.html',
  styleUrl: './job.component.css',
})
export class JobComponent {
  @Input() jobList!: Job[];
  @Input() displayStar!: boolean;
  @Output() redirectToJobDetails = new EventEmitter<number>();
  @Output() starClicked = new EventEmitter<Job>();
  globalConstants = GlobalConstants;

  protected onStarClicked(job: Job): void {
    this.starClicked.emit(job);
  }

  protected onRedirectToJobDetails(jobId: number): void {
    this.redirectToJobDetails.emit(jobId);
  }
}
