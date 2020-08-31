import { Component, OnInit } from '@angular/core';
import {UserService} from '../services/user.service';
import {IUserRegister} from '../models/data/IUserRegister';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public user: IUserRegister = {
    username: '',
    password: '',
    briefDescription: '',
    description: '',
    skills: [],
    urls: []
  };

  public hide = true;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  submit(): void {
    if (this.user.username === '' || this.user.password === '' || this.user.briefDescription === '' || this.user.description === ''
      || this.user.skills.length === 0){
      alert('Fields cannot be empty!');
      return;
    }

    this.userService.register(this.user).subscribe(result => {
      if (result.status) {
        alert('Registered');
      } else {
        alert('Error');
      }
    });
  }

}
