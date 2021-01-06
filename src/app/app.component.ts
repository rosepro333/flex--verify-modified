import { Component, OnInit,ViewChild} from '@angular/core';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { MatSidenav } from '@angular/material/sidenav';
import{ SidebarService} from '../app/sidebar/sidebar.service';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, filter, withLatestFrom } from 'rxjs/operators';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild('rightSidenav') public sidenav: MatSidenav;
  @ViewChild('aboutSidenav') public sidenav1: MatSidenav;
  title = 'flex-verify-dashboard';
  deviceInfo: any = [];
  constructor(private sidenavService: SidebarService,private breakpointObserver: BreakpointObserver,
    router: Router) {
      
  }
 

}
