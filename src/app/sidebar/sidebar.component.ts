import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Cookie } from 'ng2-cookies';
import { ServicesService } from '../service/services.service';
import { AuthService } from './../auth/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SidebarComponent implements OnInit {
  // pageTitle: string;
  imgSrc = './../../assets/v-logo.svg';
  sidebarMode = 'folded';
  userName = '';
  accessType = '';
  constructor(
    private authService: AuthService,
    private router: Router,
    private service: ServicesService
  ) {}

  ngOnInit(): void {
    this.getUserDetails();
    this.getAccessType();
    // this.pageTitle = 'Dashboard';
  }
  getAccessType = () => {
    this.accessType = Cookie.get('Access_Type');
    console.log(this.accessType);
    console.log(this.accessType);
  }

  logout = () => {
    this.authService.logout();
    this.router.navigate(['login']);
  }

  // navigate(title: string) {
  //   this.pageTitle = title;
  // }

  sidebarModeFunc = (mode) => {
    if (mode === 'folded') {
      this.sidebarMode = mode;
      this.imgSrc = './../../assets/v-logo.svg';
    } else if (mode === 'unfolded') {
      this.sidebarMode = mode;
      this.imgSrc = './../../assets/logo-main.svg';
    }
  }
  getUserDetails = () => {
    const id = Cookie.get('id');
    this.service.getUserDetails(id).subscribe((res) => {
      console.log('2');
      // console.log(res.data.Contact_Name);
      this.userName = res.data.Contact_Name;
    });
  }
}
