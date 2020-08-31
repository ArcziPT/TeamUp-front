import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ProjectService} from '../../../services/project.service';

@Component({
  selector: 'app-add-department-dialog',
  templateUrl: './add-department-dialog.component.html',
  styleUrls: ['./add-department-dialog.component.css']
})
export class AddDepartmentDialogComponent implements OnInit {

  public projectId: number;
  public departmentName: string;

  constructor(private dialogRef: MatDialogRef<AddDepartmentDialogComponent>, @Inject(MAT_DIALOG_DATA) data: any,
              private projectService: ProjectService) {
    this.projectId = data.id;
  }

  ngOnInit(): void {
  }

  save(): void {
    if (this.departmentName === '') {
      alert('Field is empty!');
      return;
    }

    this.projectService.addDepartment(this.projectId, this.departmentName).subscribe(status => {
      if (status.status) {
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
