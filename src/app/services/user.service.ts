import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {IUser} from '../models/data/IUser';
import {UserSessionManagerService} from './user-session-manager.service';
import {Observable} from 'rxjs';
import {Config} from '../config';
import {first, map} from 'rxjs/operators';
import {IJobApplication} from '../models/data/IJobApplication';
import {IProjectInvitation} from '../models/data/IProjectInvitation';
import {IUserMin} from '../models/data/IUserMin';
import {IProjectMember} from '../models/data/IProjectMember';
import {SearchResult} from '../models/data/SearchResult';
import {INameAndID} from '../models/data/INameAndID';
import {IStatus} from '../models/data/IStatus';
import {IUserRegister} from '../models/data/IUserRegister';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private client: HttpClient, private session: UserSessionManagerService) { }

  register(user: IUserRegister): Observable<IStatus> {
    return this.client.post<IStatus>(`${Config.backendURL}/register`, user);
  }

  getUser(id: number): Observable<IUser>{
    return this.client.get<IUser>(`${Config.apiURL}/user/${id.toString()}`);
  }

  getProjects(id: number): Observable<IProjectMember[]> {
    return this.client.get<IProjectMember[]>(`${Config.apiURL}/user/${id.toString()}/projects`);
  }

  /**
   * Returns true if operation succeeded.
   * @param id - user's id
   */
  rateUser(id: number): Observable<IStatus> {
    return this.client.post<IStatus>(`${Config.apiURL}/user/${id.toString()}/rate`, null, {observe: 'body'});
  }

  /**
   * Returns true if operation succeeded.
   * @param id - user's id
   */
  unrateUser(id: number): Observable<IStatus> {
    return this.client.post<IStatus>(`${Config.apiURL}/user/${id.toString()}/unrate`, null, {observe: 'body'});
  }

  isRated(id: number): Observable<IStatus> {
    return this.client.get<IStatus>(`${Config.apiURL}/user/${id.toString()}/isRated`, {observe: 'body'});
  }

  getApplications(): Observable<IJobApplication[]> {
    return this.client.get<IJobApplication[]>(`${Config.apiURL}/user/applications`);
  }

  getInvitations(): Observable<IProjectInvitation[]> {
    return this.client.get<IProjectInvitation[]>(`${Config.apiURL}/user/invitations`);
  }

  search(searchBy: string, pattern: string, sortBy: string, order: string, page: number): Observable<SearchResult<IUserMin>> {
    const params = new HttpParams()
      .set('searchBy', `${searchBy}`)
      .set('pattern', `${pattern}`)
      .set('sortBy', `${sortBy}`)
      .set('order', `${order}`)
      .set('page', `${page.toString()}`)
      .set('size', `${Config.pageSize}`);

    return this.client.get<SearchResult<IUserMin>>(`${Config.apiURL}/user/search`, {params});
  }

  edit(id: number, user: IUser): Observable<IStatus> {
    return this.client.post<IStatus>(`${Config.apiURL}/user/${id.toString()}`, user, {observe: 'body'});
  }

  getManagedProjects(id: number): Observable<INameAndID[]> {
    return this.client.get<INameAndID[]>(`${Config.apiURL}/user/${id.toString()}/managedProjects`);
  }

  updateInvitationStatus(id: number, accepted: boolean): Observable<IStatus> {
    const params = new HttpParams().set('accepted', accepted ? 'true' : 'false');

    return this.client.put<IStatus>(`${Config.apiURL}/user/invitations/${id.toString()}`, null, {params});
  }
}
