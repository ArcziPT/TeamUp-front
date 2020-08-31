import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {IProject} from '../../../models/data/IProject';
import {ProjectService} from '../../../services/project.service';
import {Config} from '../../../config';

@Component({
  selector: 'app-edit-project-info-dialog',
  templateUrl: './edit-project-info-dialog.component.html',
  styleUrls: ['./edit-project-info-dialog.component.css']
})
export class EditProjectInfoDialogComponent implements OnInit {

  public project: IProject;
  public id: number;

  constructor(@Inject(MAT_DIALOG_DATA) data: any, public dialogRef: MatDialogRef<EditProjectInfoDialogComponent>,
              private projectService: ProjectService) {
    this.project = data.project;
    this.id = data.id;
  }

  ngOnInit(): void {
  }

  save(): void {
    if (this.project.name === '' || this.project.briefDescription === '' || this.project.description === '') {
      alert('Fields cannot be empty!');
      return;
    }

    this.projectService.edit(this.id, this.project).subscribe(success => {
      if (success) {
        this.dialogRef.close({result: true});
      } else {
        alert('Failed to update!');
      }
    });
  }

  close(): void {
    this.dialogRef.close({result: false});
  }

  addUrl(): void {
    if (this.project.urls.length <= Config.maxNumOfURLs) {
      this.project.urls.push('New URL');
    } else {
      alert(`Maximum number of URLs is ${Config.maxNumOfURLs}`);
    }
  }

  removeUrl(i: number): void {
    this.project.urls.splice(i, 1);
  }
}
