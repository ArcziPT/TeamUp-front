import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {IJobPosting} from '../models/data/IJobPosting';
import {Config} from '../config';
import {Observable} from 'rxjs';
import {IJobApplication} from '../models/data/IJobApplication';
import {SearchResult} from '../models/data/SearchResult';
import {IStatus} from '../models/data/IStatus';

@Injectable({
  providedIn: 'root'
})
export class JobPostingService {

  constructor(private client: HttpClient) { }

  getJobPosting(id: number): Observable<IJobPosting>{
    return this.client.get<IJobPosting>(`${Config.apiURL}/postings/${id.toString()}`);
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
