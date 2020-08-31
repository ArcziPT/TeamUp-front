import { Component, OnInit } from '@angular/core';
import {IUser} from '../models/data/IUser';
import {ActivatedRoute} from '@angular/router';
import {UserService} from '../services/user.service';
import {IProjectMember} from '../models/data/IProjectMember';
import {UserSessionManagerService} from '../services/user-session-manager.service';
import {MatDialog} from '@angular/material/dialog';
import {CreateInvitationDialogComponent} from '../dialogs/user/create-invitation-dialog/create-invitation-dialog.component';
import {IProjectInvitation} from '../models/data/IProjectInvitation';
import {CreateProjectDialogComponent} from '../dialogs/user/create-project-dialog/create-project-dialog.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  public id: number;
  public user: IUser;
  public projects: IProjectMember[];
  public invitations: IProjectInvitation[];
  public isRated = false;

  public isCurrentUser = false;

  constructor(private route: ActivatedRoute, private userService: UserService, private sessionManager: UserSessionManagerService,
              private dialog: MatDialog) {
    this.route.params.subscribe( params => {
      this.id = params.id;
      userService.getUser(params.id).subscribe(u => {
        this.user = u;
        this.isCurrentUser = (this.user.username === this.sessionManager.username);
      });
      userService.getProjects(params.id).subscribe(p => this.projects = p);
      userService.isRated(params.id).subscribe(is => this.isRated = is.status);
      userService.getInvitations().subscribe(invitations => this.invitations = invitations);
    });
  }

  private refreshInvitations(): void{
    this.userService.getInvitations().subscribe(invitations => this.invitations = invitations);
  }

  private refreshProjects(): void{
    this.userService.getProjects(this.id).subscribe(projects => this.projects = projects);
  }

  private refreshUser(): void{
    this.userService.getUser(this.id).subscribe(u => {
      this.user = u;
      this.isCurrentUser = (this.user.username === this.sessionManager.username);
    });
  }

  ngOnInit(): void {
  }

  /**
   * If user is rated, then unrate them, otherwise rate them.
   */
  rateUser(): void{
    if (this.isRated) {
      this.userService.unrateUser(this.id).subscribe(success => {
        if (success.status){
          this.user.rating -= 1;
          this.isRated = false;
        } else {
          alert('You have not rated this user.');
        }
      });
    } else {
      this.userService.rateUser(this.id).subscribe(success => {
        if (success.status){
          this.user.rating += 1;
          this.isRated = true;
        } else {
          alert('You have already rated this user.');
        }
      });
    }
  }

  invite(): void {
    const dialogRef = this.dialog.open(CreateInvitationDialogComponent, {
      data: {
        username: this.user.username
      }
    });

    dialogRef.afterClosed().subscribe(data => {
      if (data.result) {
        alert('Invitation sent.');
      }
    });
  }

  updateInvitationStatus(i: number, accepted: boolean): void {
    this.userService.updateInvitationStatus(this.invitations[i].id, accepted).subscribe(status => {
      if (status.status) {
        this.refreshInvitations();
        alert('Accepted');
      } else {
        alert('Error');
      }
    });
  }

  createProject(): void {
    const dialogRef = this.dialog.open(CreateProjectDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result.result) {
        alert('Project Created');
        this.refreshProjects();
      }
    });
  }
}
