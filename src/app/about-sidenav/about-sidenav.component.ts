import { Component, OnInit,ViewChild } from '@angular/core';
import { SidebarService } from '../sidebar/sidebar.service';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-about-sidenav',
  templateUrl: './about-sidenav.component.html',
  styleUrls: ['./about-sidenav.component.scss']
})
export class AboutSidenavComponent implements OnInit {
  @ViewChild('aboutSidenav',{static: true}) public sidenav1: MatSidenav;
  constructor(private sidenavService: SidebarService) { }

   ngOnInit(): void {
		this.sidenavService.setSidenav1(this.sidenav1);
  }
  toggleRightSidenav1(){
    this.sidenavService.close1() ;
   }

}
