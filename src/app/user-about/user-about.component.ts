import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { ServicesService } from '../service/services.service';

@Component({
  selector: 'app-user-about',
  templateUrl: './user-about.component.html',
  styleUrls: ['./user-about.component.scss']
})
export class UserAboutComponent implements OnInit {
  @ViewChild('drawer') public drawer: MatSidenav;
  constructor( private service: ServicesService) { }

  ngOnInit(): void {
    this.service.update.subscribe((data)=>{
      console.log(data)
    })
  //  this.service.update.subscribe((res) => console.log(res));
  }

}
