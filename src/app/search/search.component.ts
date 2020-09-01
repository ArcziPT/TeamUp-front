import { Component, OnInit } from '@angular/core';
import {UserService} from '../services/user.service';
import {ProjectService} from '../services/project.service';
import {IUserMin} from '../models/data/IUserMin';
import {IProjectMin} from '../models/data/IProjectMin';
import {SearchResult} from '../models/data/SearchResult';
import {Config} from '../config';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  public searchFor = '';
  public type: string;

  public currentSearchType: string;
  public currentSearchFor = '';
  public currentPage = 0;
  public totalPages: number;

  public userResult: IUserMin[];
  public projectResult: IProjectMin[];

  constructor(private userService: UserService, private projectService: ProjectService) {}

  ngOnInit(): void {
  }

  newSearch(): void {
    this.currentPage = 0;
    this.currentSearchFor = this.searchFor;
    this.currentSearchType = this.type;
    this.search();
  }

  search(): void {
    switch (this.currentSearchType){
      case 'user': this.userService.search('username', this.currentSearchFor, 'username', 'asc', this.currentPage).subscribe(r => {
        this.userResult = r.result;
        this.totalPages = r.totalPages;
      });
                   break;
      case 'project': this.projectService.search('name', this.currentSearchFor, 'name', 'asc', this.currentPage).subscribe(r => {
        this.projectResult = r.result;
        this.totalPages = r.totalPages;
      });             break;
    }
  }

  changePage(page: number): void {
    if (page > this.totalPages){
      page = this.totalPages;
    }

    this.currentPage = page;
    this.search();
  }
}
