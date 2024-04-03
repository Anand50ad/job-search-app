import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { TabMenuModule } from 'primeng/tabmenu';
import { GlobalConstants } from '../../shared/constants/global.constants';
import { RouteConstants } from '../../shared/constants/route.constants';

@Component({
  selector: 'app-jobs-dashboard',
  standalone: true,
  imports: [TabMenuModule],
  templateUrl: './jobs-dashboard.component.html',
  styleUrl: './jobs-dashboard.component.css',
})
export class JobsDashboardComponent {
  routeConstants = RouteConstants;
  globalConstants = GlobalConstants;
  itemsTabMenu: MenuItem[] = [
    {
      label: this.globalConstants.jobs,
      routerLink: [this.routeConstants.job_list_route],
    },
    {
      label: this.globalConstants.favourites,
      routerLink: [this.routeConstants.job_favourites_route],
    },
  ];
}
