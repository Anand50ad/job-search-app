import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { TabMenuModule } from 'primeng/tabmenu';
import { GlobalConstants } from '../../shared/constants/global.constants';
import { JobsService } from '../../services/jobs.service';
import { JobComponent } from '../../shared/components/job/job.component';

@Component({
  selector: 'app-jobs-dashboard',
  standalone: true,
  imports: [TabMenuModule, JobComponent],
  templateUrl: './jobs-dashboard.component.html',
  styleUrl: './jobs-dashboard.component.css',
})
export class JobsDashboardComponent implements OnInit {
  itemsTabMenu!: MenuItem[];
  activeItem!: MenuItem;
  globalConstants = GlobalConstants;

  constructor(private jobsService: JobsService) {}

  ngOnInit(): void {
    this.itemsTabMenu = [
      { label: this.globalConstants.jobs },
      { label: this.globalConstants.favourites },
    ];
    this.activeItem = this.itemsTabMenu[0];
    this.jobsService.getAllJobs().subscribe((data) => {
      console.log(data);
    });
    this.jobsService.getJobDetailsById(98596).subscribe((data) => {
      console.log(data);
    });
  }

  protected onActiveItemChange(event: any): void {}
}
