import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {INameAndID} from '../../../models/data/INameAndID';
import {UserSessionManagerService} from '../../../services/user-session-manager.service';
import {MatStep, MatStepper} from '@angular/material/stepper';
import {ProjectService} from '../../../services/project.service';
import {IProjectInvitationCreate} from '../../../models/data/IProjectInvitationCreate';

@Component({
  selector: 'app-create-invitation-dialog',
  templateUrl: './create-invitation-dialog.component.html',
  styleUrls: ['./create-invitation-dialog.component.css']
})
export class CreateInvitationDialogComponent implements OnInit {

  @ViewChild('stepper') stepper: MatStepper;

  @ViewChild('projectStep') projectStep: MatStep;
  @ViewChild('roleStep') roleStep: MatStep;

  public username: string;

  // declare as an array to force js to pass it by reference to projectSelection component,
  // which will change its content, value != null means that project was selected
  public selectedProjects: INameAndID[] = [null];

  public roleName: string;
  public description: string;
  public selectedDepartments: string[] = [];

  constructor(private dialogRef: MatDialogRef<CreateInvitationDialogComponent>, @Inject(MAT_DIALOG_DATA) data: any,
              public sessionManager: UserSessionManagerService, private projectService: ProjectService) {
    this.username = data.username;
  }

  ngOnInit(): void {}

  send(): void {
    if (this.roleName === '' || this.description === '' || this.selectedDepartments.length === 0 || this.selectedProjects[0] == null) {
      alert('Fields cannot be empty!');
      return;
    }

    const invitation: IProjectInvitationCreate = {
      projectName: this.selectedProjects[0].name,
      username: this.username,
      role: {
        name: this.roleName,
        description: this.description,
        departments: this.selectedDepartments
      }
    };

    this.projectService.sendInvitation(this.selectedProjects[0].id, invitation).subscribe(success => {
      if (success) {
        this.dialogRef.close({result: true});
      } else {
        alert('Error!');
      }
    });
  }

  next(): void {
    // if value is not null then project is selected and step is completed
    if (this.stepper.selected === this.projectStep) {
      if (this.selectedProjects[0] !== null) {
        this.projectStep.completed = true;
        this.stepper.next();
      }
    }

    // if roleName, description and selectedDepartments are not empty then step is completed
    if (this.stepper.selected === this.roleStep) {
      if (this.roleName.length !== 0 && this.description.length !== 0 && this.selectedDepartments.length !== 0) {
        this.stepper.next();
      }
    }
  }

  close(): void {
    this.dialogRef.close({result: false});
  }
}
