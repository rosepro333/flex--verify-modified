import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './../auth/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SidebarComponent implements OnInit {
  // pageTitle: string;
  imgSrc: string = './../../assets/v-logo.svg';
  sidebarMode: string = 'folded';
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // this.pageTitle = 'Dashboard';
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['login']);
  }

  // navigate(title: string) {
  //   this.pageTitle = title;
  // }

  onMouseOver(mode) {
    this.sidebarMode = mode;
    this.imgSrc = './../../assets/logo-main.svg';
  }

  onMouseOut(mode) {
    this.sidebarMode = mode;
    this.imgSrc = './../../assets/v-logo.svg'
  }
}
