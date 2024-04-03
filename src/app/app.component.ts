import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GlobalConstants } from './shared/constants/global.constants';
import { JobsDashboardComponent } from './components/jobs-dashboard/jobs-dashboard.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [RouterOutlet, JobsDashboardComponent],
})
export class AppComponent {
  globalConstants = GlobalConstants;
  title = this.globalConstants.ng_job_search;
}
