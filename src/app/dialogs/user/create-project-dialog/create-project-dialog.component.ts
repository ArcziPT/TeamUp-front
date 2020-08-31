import { Component, OnInit } from '@angular/core';
import {IProject} from '../../../models/data/IProject';
import {IProjectCreate} from '../../../models/data/IProjectCreate';
import {ProjectService} from '../../../services/project.service';
import {MatDialogRef} from '@angular/material/dialog';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';

@Component({
  selector: 'app-create-project-dialog',
  templateUrl: './create-project-dialog.component.html',
  styleUrls: ['./create-project-dialog.component.css']
})
export class CreateProjectDialogComponent implements OnInit{

  public project: IProjectCreate = {
    name: '',
    briefDescription: '',
    description: '',
    role: {
      name: '',
      description: '',
      departments: []
    },
    urls: []
  };

  constructor(private dialogRef: MatDialogRef<CreateProjectDialogComponent>, private projectService: ProjectService) { }

  ngOnInit(): void {
  }

  save(): void {
    if (this.project.name === '' || this.project.description === '' || this.project.role.name === '' || this.project.role.description === ''
      || this.project.role.departments.length === 0){
      alert('Fields cannot be empty!');
      return;
    }

    this.projectService.createProject(this.project).subscribe(status => {
      if (status.status){
        this.dialogRef.close({result: true});
      } else {
        alert('Error');
      }
    });
  }

  close(): void {
    this.dialogRef.close({result: false});
  }
}
