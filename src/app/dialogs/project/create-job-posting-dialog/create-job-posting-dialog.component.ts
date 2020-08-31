import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ProjectService} from '../../../services/project.service';
import {IJobPostingCreate} from '../../../models/data/IJobPostingCreate';

@Component({
  selector: 'app-create-job-posting-dialog',
  templateUrl: './create-job-posting-dialog.component.html',
  styleUrls: ['./create-job-posting-dialog.component.css']
})
export class CreateJobPostingDialogComponent implements OnInit {

  public chosenDepartments: string[];
  public id: number;
  public posting: IJobPostingCreate = {
    title: 'Title',
    role: {
      name: 'Role name',
      description: 'Description',
      departments: ['']
    }
  };

  constructor(@Inject(MAT_DIALOG_DATA) data: any, public dialogRef: MatDialogRef<CreateJobPostingDialogComponent>,
              private projectService: ProjectService) {
    this.id = data.id;
    console.log(this.id);
    this.chosenDepartments = [];
  }

  ngOnInit(): void {
  }

  close(): void {
    this.dialogRef.close({result: false});
  }

  save(): void {
    this.posting.role.departments = this.chosenDepartments;

    if (this.posting.title === '' || this.posting.role.name === '' || this.posting.role.description === ''){
      alert('Fields cannot be empty!');
      return;
    }

    if (this.posting.role.departments.length === 0) {
      alert('Chose departments!');
      return;
    }

    this.projectService.createJobPosting(this.id, this.posting).subscribe(success => {
      if (success){
        this.dialogRef.close({result: true});
      } else {
        alert('Error!');
      }
    });
  }
}
