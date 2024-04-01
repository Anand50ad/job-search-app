export interface Job {
  companyLogo: string;
  companyName: string;
  id: number;
  reference: string;
  title: string;
}

export interface JobDetails {
  companyLogo: string;
  companyName: string;
  description: string;
  id: number;
  industries: string[];
  location: string;
  publishDate: string;
  reference: string;
  title: string;
  types: string[];
}
