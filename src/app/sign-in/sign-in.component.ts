import { Component, OnInit } from '@angular/core';
import {UserSessionManagerService} from '../services/user-session-manager.service';
import {first} from 'rxjs/operators';
import {Router} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  public username: string;
  public password: string;

  public hide = true;

  public error = false;
  public errorMessage: string;

  constructor(private sessionManager: UserSessionManagerService, private router: Router) { }

  ngOnInit(): void {
  }

  submit(): void {
    this.sessionManager.login(this.username, this.password).subscribe(
      value => {
        if (value) {
          this.router.navigateByUrl('');
        }
      },
      error => {
        if (error instanceof HttpErrorResponse){
          this.errorMessage = error.message;
          this.error = true;
        }
      }
    );
  }

}
