import { Component, OnInit, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Cookie } from 'ng2-cookies';
import { ServicesService } from '../service/services.service';
import { VerificationUrlComponent } from '../verification-url/verification-url.component';
import { AuthService } from './../auth/auth.service';
import {SidebarService} from './sidebar.service';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  host: {
    "(window:click)": "onClick()"
  },
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
    private service: ServicesService,
    public viewContainerRef: ViewContainerRef,
    private sidenav: SidebarService
  ) {}
  toggleActive:boolean = true;
  toggleActive1:boolean = false;
 

	toggleRightSidenav($event) {
    $event.stopPropagation();
    console.log('Clicked');
    this.toggleActive = !this.toggleActive;
		this.sidenav.toggle();
  }
  onClick() {
    this.toggleActive = false;
  }
  toggleRightSidenav1() {
    console.log('Clicked');
    this.toggleActive1 = !this.toggleActive1;
		this.sidenav.toggle1();
  }
 
 


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
  openUserAbout = () => {
    // console.log('dsedssd')
    this.service.userDrawer('open');
    this.router.navigate([{ outlets: { about: ['about'] } }])
    // const abc =this.viewContainerRef.createComponent<VerificationUrlComponent>()
  }
}
