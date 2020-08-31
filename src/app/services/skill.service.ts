import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Config} from '../config';

@Injectable({
  providedIn: 'root'
})
export class SkillService {

  constructor(private client: HttpClient) { }

  getSkills(): Observable<string[]> {
    return this.client.get<string[]>(`${Config.apiURL}/skills/`);
  }
}
