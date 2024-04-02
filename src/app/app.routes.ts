import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'job-list',
    pathMatch: 'full',
  },
  {
    path: 'job-list',
    loadComponent: () =>
      import('./components/job-list/job-list.component').then(
        (x) => x.JobListComponent
      ),
  },
  {
    path: 'job-favourites',
    loadComponent: () =>
      import('./components/job-favourites/job-favourites.component').then(
        (x) => x.JobFavouritesComponent
      ),
  },
  {
    path: 'job-details',
    loadComponent: () =>
      import('./components/job-details/job-details.component').then(
        (x) => x.JobDetailsComponent
      ),
  },
];
