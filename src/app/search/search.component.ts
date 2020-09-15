import {Component, OnInit} from '@angular/core';
import {UserService} from '../services/user.service';
import {ProjectService} from '../services/project.service';
import {IUserMin} from '../models/data/IUserMin';
import {IProjectMin} from '../models/data/IProjectMin';
import {SearchResult} from '../models/data/SearchResult';
import {Config} from '../config';
import {UserSearchParams} from '../models/util/UserSearchParams';
import {ProjectSearchParams} from '../models/util/ProjectSearchParams';
import {IJobPosting} from '../models/data/IJobPosting';
import {PostingSearchParams} from '../models/util/PostingSearchParams';
import {IJobPostingMin} from '../models/data/IJobPostingMin';
import {JobPostingService} from '../services/job-posting.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  public searchFor = '';
  public type: 'user' | 'project' | 'posting';

  public currentSearchFor: string;
  public currentSearchType: string;
  public currentPage = 0;
  public totalPages: number;

  public userResult: IUserMin[];
  public projectResult: IProjectMin[];
  public postingResult: IJobPostingMin[];

  constructor(private userService: UserService, private projectService: ProjectService, private postingService: JobPostingService) {
  }

  ngOnInit(): void {
  }

  newSearch(): void {
    this.currentPage = 0;
    this.currentSearchFor = this.searchFor;
    this.currentSearchType = this.type;
    this.search();
  }

  search(): void {
    switch (this.currentSearchType) {
      case 'user':
        this.searchUser();
        break;
      case 'project':
        this.searchProject();
        break;
      case 'posting':
        this.searchPosting();
        break;
    }
  }

  searchUser(): void {
    const params = new UserSearchParams();

    const lines = this.currentSearchFor.split(' ');
    lines.forEach(line => {
      const t = line.split(':');
      // if there is no ':', then it is default param, which in case of user is username
      if (t.length === 1){
        params.username = t[0];
      }else{
        const el = t[1].split(',');

        switch (t[0]){
          case 'projects':
            params.projects = el;
            break;
          case 'skills':
            params.skills = el;
            break;
        }
      }
    });

    this.userService.search(params, this.currentPage, Config.pageSize).subscribe(r => {
      this.userResult = r.result;
      this.totalPages = r.totalPages;
    });
  }

  searchProject(): void {
    const params = new ProjectSearchParams();

    const lines = this.currentSearchFor.split(' ');
    lines.forEach(line => {
      const t = line.split(':');
      // if there is no ':', then it is default param, which in case of posting is its title
      if (t.length === 1){
        params.name = t[0];
      }else{
        const el = t[1].split(',');

        switch (t[0]){
          case 'members':
            params.members = el;
            break;
        }
      }
    });

    this.projectService.search(params, this.currentPage, Config.pageSize).subscribe(r => {
      this.projectResult = r.result;
      this.totalPages = r.totalPages;
    });
  }

  searchPosting(): void {
    const params = new PostingSearchParams();

    const lines = this.currentSearchFor.split(' ');
    lines.forEach(line => {
      const t = line.split(':');
      // if there is no ':', then it is default param, which in case of project is its name
      if (t.length === 1){
        params.title = t[0];
      }else{
        const el = t[1].split(',');

        switch (t[0]){
          case 'project':
            params.project = t[1];
            break;
          case 'roleName':
            params.roleName = t[1];
            break;
          case 'departments':
            params.departments = el;
            break;
        }
      }
    });

    this.postingService.search(params, this.currentPage, Config.pageSize).subscribe(r => {
      this.postingResult = r.result;
      this.totalPages = r.totalPages;
    });
  }

  changePage(page: number): void {
    if (page > this.totalPages) {
      page = this.totalPages;
    }

    this.currentPage = page;
    this.search();
  }
}
