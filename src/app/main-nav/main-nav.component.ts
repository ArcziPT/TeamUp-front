import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import {UserSessionManagerService} from '../services/user-session-manager.service';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  public isSigned: boolean;

  constructor(private breakpointObserver: BreakpointObserver,
              public sessionManager: UserSessionManagerService) {
    sessionManager.isSigned.subscribe(isSigned => this.isSigned = isSigned);
  }

  signOut(): void {
    this.sessionManager.logout();
  }
}
