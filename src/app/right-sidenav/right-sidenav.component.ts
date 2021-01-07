import { Component, OnInit,ViewChild } from '@angular/core';
import { SidebarService } from '../sidebar/sidebar.service';
import { MatSidenav } from '@angular/material/sidenav';
import { ServicesService } from '../service/services.service';
@Component({
  selector: 'app-right-sidenav',
  templateUrl: './right-sidenav.component.html',
  styleUrls: ['./right-sidenav.component.scss']
})
export class RightSidenavComponent implements OnInit {
  @ViewChild('rightSidenav',{static: true}) public sidenav: MatSidenav;
  data: any = {};
  constructor(private  sidenavService: SidebarService,
    private service:ServicesService) { }

  ngOnInit(): void {
    this.sidenavService.setSidenav(this.sidenav);
    this.userDetails()
  }
  userDetails = () => {
    this.service.userDetails().subscribe((res)=>{
      console.log(res);
      this.data = res.data;
      console.log(this.data);
    },(error: any) => {
      console.log(error);
    })
  }
  toggleRightSidenav(){
    this.sidenavService.close() ;
   }

}
