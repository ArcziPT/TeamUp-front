import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {IJobPosting} from '../models/data/IJobPosting';
import {Config} from '../config';
import {Observable} from 'rxjs';
import {IJobApplication} from '../models/data/IJobApplication';
import {SearchResult} from '../models/data/SearchResult';
import {IStatus} from '../models/data/IStatus';
import {PostingSearchParams} from '../models/util/PostingSearchParams';
import {IJobPostingMin} from '../models/data/IJobPostingMin';

@Injectable({
  providedIn: 'root'
})
export class JobPostingService {

  constructor(private client: HttpClient) { }

  getJobPosting(id: number): Observable<IJobPosting>{
    return this.client.get<IJobPosting>(`${Config.apiURL}/postings/${id.toString()}`);
  }

  search(postingParams: PostingSearchParams, page: number, size: number): Observable<SearchResult<IJobPostingMin>> {
    const params = new HttpParams()
      .set('title', `${postingParams.title}`)
      .set('project', `${postingParams.project}`)
      .set('roleName', `${postingParams.roleName}`)
      .set('departments', `${postingParams.departments}`);

    return this.client.get<SearchResult<IJobPostingMin>>(`${Config.apiURL}/postings/search`, {params});
  }

  getApplications(id: number, page: number): Observable<SearchResult<IJobApplication>> {
    const params = new HttpParams().set('size', Config.pageSize.toString()).set('page', page.toString());

    return this.client.get<SearchResult<IJobApplication>>(`${Config.apiURL}/postings/${id.toString()}/applications`, {params});
  }

  updateApplicationStatus(postingId: number, appId: number, accepted: boolean): Observable<IStatus> {
    const params = new HttpParams().set('accepted', accepted ? 'true' : 'false');

    return this.client.put<IStatus>(`${Config.apiURL}/postings/${postingId.toString()}/applications/${appId.toString()}`, null, {params});
  }
}
