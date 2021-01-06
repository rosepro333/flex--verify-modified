import { Component, OnInit,ViewChild } from '@angular/core';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { MatSidenav } from '@angular/material/sidenav';
import{ SidebarService} from '../app/sidebar/sidebar.service'

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
  constructor(private sidenavService: SidebarService) {
  }

}
