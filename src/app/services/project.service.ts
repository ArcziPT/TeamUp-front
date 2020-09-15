import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {IProject} from '../models/data/IProject';
import {Config} from '../config';
import {IProjectInvitation} from '../models/data/IProjectInvitation';
import {IJobPosting} from '../models/data/IJobPosting';
import {IProjectInvitationCreate} from '../models/data/IProjectInvitationCreate';
import {IJobPostingCreate} from '../models/data/IJobPostingCreate';
import {IProjectMin} from '../models/data/IProjectMin';
import {IProjectMember} from '../models/data/IProjectMember';
import {SearchResult} from '../models/data/SearchResult';
import {INameAndID} from '../models/data/INameAndID';
import {IStatus} from '../models/data/IStatus';
import {IProjectCreate} from '../models/data/IProjectCreate';
import {catchError} from 'rxjs/operators';
import {ProjectSearchParams} from '../models/util/ProjectSearchParams';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private client: HttpClient) { }

  getProject(id: number): Observable<IProject>{
    return this.client.get<IProject>(`${Config.apiURL}/project/${id.toString()}`);
  }

  search(projectParams: ProjectSearchParams, page: number, size: number): Observable<SearchResult<IProjectMin>> {
    const params = new HttpParams()
      .set('name', `${projectParams.name}`)
      .set('members', `${projectParams.members}`);

    return this.client.get<SearchResult<IProjectMin>>(`${Config.apiURL}/project/search`, {params});
  }

  createProject(project: IProjectCreate): Observable<IStatus>{
    return this.client.post<IStatus>(`${Config.apiURL}/project/`, project).pipe(catchError(err => {
      return throwError(err.error);
    }));
  }

  getMembers(id: number): Observable<IProjectMember[]> {
    return this.client.get<IProjectMember[]>(`${Config.apiURL}/project/${id.toString()}/members`);
  }

  getInvitations(id: number): Observable<IProjectInvitation[]> {
    return this.client.get<IProjectInvitation[]>(`${Config.apiURL}/project/${id.toString()}/invitations`);
  }

  sendInvitation(id: number, invitation: IProjectInvitationCreate): Observable<IStatus> {
    return this.client.post<IStatus>(`${Config.apiURL}/project/${id.toString()}/invitations`, invitation, {observe: 'body'});
  }

  getJobPostings(id: number): Observable<IJobPosting[]> {
    return this.client.get<IJobPosting[]>(`${Config.apiURL}/project/${id.toString()}/postings`);
  }

  createJobPosting(id: number, jobPosting: IJobPostingCreate): Observable<IStatus> {
    return this.client.post<IStatus>(`${Config.apiURL}/project/${id.toString()}/postings`, jobPosting, {observe: 'body'});
  }

  isAdmin(id: number): Observable<IStatus>{
    return this.client.get<IStatus>(`${Config.apiURL}/project/${id.toString()}/isAdmin`, {observe: 'body'});
  }

  isMember(id: number): Observable<IStatus>{
    return this.client.get<IStatus>(`${Config.apiURL}/project/${id.toString()}/isMember`);
  }

  edit(id: number, project: IProject): Observable<IStatus> {
    return this.client.post<IStatus>(`${Config.apiURL}/project/${id.toString()}`, project, {observe: 'body'});
  }

  removeMember(id: number, username: string): Observable<IStatus> {
    return this.client.delete<IStatus>(`${Config.apiURL}/project/${id.toString()}/members`, {params: {username}});
  }

  makeAdmin(id: number, username: string): Observable<IStatus> {
    return this.client.post<IStatus>(`${Config.apiURL}/project/${id.toString()}/makeAdmin`, username, {observe: 'body'});
  }

  getDepartments(id: number): Observable<INameAndID[]> {
    return this.client.get<INameAndID[]>(`${Config.apiURL}/project/${id.toString()}/departments`);
  }

  addDepartment(id: number, departmentName: string): Observable<IStatus> {
    return this.client.post<IStatus>(`${Config.apiURL}/project/${id.toString()}/departments`, departmentName);
  }

  apply(projectId: number, postingId: number): Observable<IStatus> {
    return this.client.post<IStatus>(`${Config.apiURL}/project/${projectId.toString()}/postings/${postingId.toString()}`, null, {observe: 'body'});
  }

  hasApplied(projectId: number, postingId: number): Observable<IStatus> {
    return this.client.get<IStatus>(`${Config.apiURL}/project/${projectId.toString()}/postings/${postingId.toString()}/hasApplied`);
  }
}
