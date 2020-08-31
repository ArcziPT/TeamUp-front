import {ChangeDetectorRef, Component, OnDestroy} from '@angular/core';
import {UserSessionManagerService} from './services/user-session-manager.service';
import {MediaMatcher} from '@angular/cdk/layout';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  constructor() {}
}
