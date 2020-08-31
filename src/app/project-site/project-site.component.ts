import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {IProject} from '../models/data/IProject';
import {ProjectService} from '../services/project.service';
import {IProjectMember} from '../models/data/IProjectMember';
import {IJobPosting} from '../models/data/IJobPosting';
import {MatDialog} from '@angular/material/dialog';
import {EditProjectInfoDialogComponent} from '../dialogs/project/edit-project-info-dialog/edit-project-info-dialog.component';
import {CreateJobPostingDialogComponent} from '../dialogs/project/create-job-posting-dialog/create-job-posting-dialog.component';
import {INameAndID} from '../models/data/INameAndID';
import {IProjectInvitation} from '../models/data/IProjectInvitation';
import {AddDepartmentDialogComponent} from '../dialogs/project/add-department-dialog/add-department-dialog.component';
import {InspectJobApplicationsDialogComponent} from '../dialogs/project/inspect-job-applications-dialog/inspect-job-applications-dialog.component';

@Component({
  selector: 'app-project-site',
  templateUrl: './project-site.component.html',
  styleUrls: ['./project-site.component.css']
})
export class ProjectSiteComponent implements OnInit {
  public project: IProject;
  public members: IProjectMember[];
  public postings: IJobPosting[];
  public isAdmin = false;
  public isMember = false;
  public id: number;
  public departments: INameAndID[];
  public invitations: IProjectInvitation[];


  constructor(private route: ActivatedRoute, private projectService: ProjectService, private dialog: MatDialog) {
    this.route.params.subscribe(params => {
        this.id = params.id;
        this.refresh();
    });
  }

  refresh(): void {
    this.refreshProject();
    this.refreshPostings();
    this.refreshAdminData();
    this.refreshMembers();
    this.projectService.isMember(this.id).subscribe(is => this.isMember = is.status);
  }

  private refreshProject(): void{
    this.projectService.getProject(this.id).subscribe(p => this.project = p);
  }

  private refreshMembers(): void{
    this.projectService.getMembers(this.id).subscribe(m => this.members = m);
  }

  private refreshPostings(): void{
    this.projectService.getJobPostings(this.id).subscribe(p => this.postings = p);
  }

  private refreshAdminData(): void{
    this.projectService.isAdmin(this.id).subscribe(is => {
      this.isAdmin = is.status;

      if (this.isAdmin){
        this.projectService.getDepartments(this.id).subscribe(d => this.departments = d);
        this.projectService.getInvitations(this.id).subscribe(i => this.invitations = i);
      }
    });
  }

  ngOnInit(): void {
  }

  editInfo(): void {
    const dialogRef = this.dialog.open(EditProjectInfoDialogComponent, {
      data: {
        project: JSON.parse(JSON.stringify(this.project)),
        id: this.id.valueOf()
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.result) {
        this.refreshProject();
        alert('Project information changed!');
      }
    });
  }

  makeAdmin(i: number): void {
    this.projectService.makeAdmin(this.id, this.members[i].user.name).subscribe(status => {
      if (status.status) {
        this.members[i].admin = true;
      } else {
        alert('Error!');
      }
    });
  }

  removeMember(i: number): void {
    this.projectService.removeMember(this.id, this.members[i].user.name).subscribe(status => {
      if (status.status){
        this.members.splice(i, 1);
      } else {
        alert('Error!');
      }
    });
  }

  addPosting(): void {
    console.log(this.id);
    const dialogRef = this.dialog.open(CreateJobPostingDialogComponent, {
      data: {
        id: this.id.valueOf()
      }
    });

    dialogRef.afterClosed().subscribe(data => {
      if (data.result){
        this.refreshPostings();
        alert('New posting added!');
      }
    });
  }

  inspect(i: number): void {
    const dialogRef = this.dialog.open(InspectJobApplicationsDialogComponent, {
      data: {
        postingId: this.postings[i].id
      }
    });

    dialogRef.afterClosed().subscribe(data => {
      this.refreshAdminData();
    });
  }

  removePosting(i: number): void {
    this.postings.splice(i, 1);
  }

  addDepartment(): void {
    const dialogRef = this.dialog.open(AddDepartmentDialogComponent, {
      data: {
        id: this.id
      }
    });

    dialogRef.afterClosed().subscribe(data => {
      if (data.result) {
       this.refreshAdminData();
       alert('Department added!');
      }
    });
  }

  apply(i: number): void {
    this.projectService.apply(this.id, this.postings[i].id).subscribe(status => {
      if (status.status) {
        alert('Applied');
        this.postings[i].hasApplied = true;
        this.postings[i].applicationsCount += 1;
      } else {
        alert('Error');
      }
    });
  }
}
