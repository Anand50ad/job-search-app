import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EndpointConstants } from '../shared/constants/endpoint.constants';
import { Job, JobDetails } from '../shared/models/jobs.model';

@Injectable({
  providedIn: 'root',
})
export class JobsService {
  endpointConstants = EndpointConstants;

  constructor(private httpClient: HttpClient) {}

  getAllJobs() {
    return this.httpClient.get<Job[]>(this.endpointConstants.jobs_endpoint);
  }

  getJobDetailsById(id: number) {
    return this.httpClient.get<JobDetails>(
      `${this.endpointConstants.jobs_endpoint}/${id}`
    );
  }
}
