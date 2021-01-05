import { Component, OnInit,ViewChild } from '@angular/core';
import { SidebarService } from '../sidebar/sidebar.service';
import { MatSidenav } from '@angular/material/sidenav';
@Component({
  selector: 'app-right-sidenav',
  templateUrl: './right-sidenav.component.html',
  styleUrls: ['./right-sidenav.component.scss']
})
export class RightSidenavComponent implements OnInit {
  @ViewChild('rightSidenav',{static: true}) public sidenav: MatSidenav;
  constructor(private  sidenavService: SidebarService) { }
  
  ngOnInit(): void {
		this.sidenavService.setSidenav(this.sidenav);
	}

}
