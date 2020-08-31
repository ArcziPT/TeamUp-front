import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {UserService} from '../../../services/user.service';
import {IUser} from '../../../models/data/IUser';
import {Config} from '../../../config';

@Component({
  selector: 'app-edit-user-info-dialog',
  templateUrl: './edit-user-info-dialog.component.html',
  styleUrls: ['./edit-user-info-dialog.component.css']
})
export class EditUserInfoDialogComponent implements OnInit {

  public user: IUser;
  public id: number;

  constructor(@Inject(MAT_DIALOG_DATA) data: any, public dialogRef: MatDialogRef<EditUserInfoDialogComponent>,
              private userService: UserService) {
    this.user = data.user;
    this.id = data.id;
  }

  ngOnInit(): void {
  }

  addUrl(): void {
    if (this.user.urls.length <= Config.maxNumOfURLs) {
      this.user.urls.push('');
    } else {
      alert(`Maximum number of URLs is ${Config.maxNumOfURLs}`);
    }
  }

  removeUrl(i: number): void {
    this.user.urls.splice(i, 1);
  }

  save(): void {
    if (this.user.username === '' || this.user.skills.length === 0 || this.user.description === '' || this.user.briefDescription === ''){
      alert('Fields cannot be empty!');
      return;
    }

    this.userService.edit(this.id, this.user).subscribe(success => {
      if (success){
        this.dialogRef.close({success});
      } else {
        alert('Failed to update!');
      }
    });
  }

  close(): void {
    this.dialogRef.close({success: false});
  }

}
