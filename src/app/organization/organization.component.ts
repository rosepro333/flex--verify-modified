import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ServicesService } from '../service/services.service';

export interface OrganizationElement {
  id: number;
  name: string;
  email: string;
  role: string;
  owner: string;
  expiryDate: Date;
  createdBy: string;
  isBlocked: boolean;
}
// tslint:disable-next-line:variable-name
const ELEMENT_DATA_Tenent: OrganizationElement[] = [];
// tslint:disable-next-line:variable-name
const ELEMENT_DATA_User: OrganizationElement[] = [];

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class OrganizationComponent implements OnInit {
  // public data:any=[]
  @ViewChild(MatSort) sort: MatSort;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  pageSizeOptions = [10, 25, 50, 100];

  displayedColumns: string[] = [
    'name-email',
    'role',
    'owner',
    'createdBy',
    'actions',
  ];
  dataSourceUser = new MatTableDataSource(ELEMENT_DATA_User);
  dataSourceTenant = new MatTableDataSource(ELEMENT_DATA_Tenent);
  constructor(private serviceService: ServicesService) {}

  ngOnInit(): void {
    this.getTenentList();
    this.getUserList();
  }

  getTenentList = () => {
    const data ={}
    this.serviceService.getTenentList(data).subscribe((result) => {
      this.dataSourceTenant = result.data;
      console.log(this.dataSourceTenant);
    });
  }
  getUserList = () => {
     const data ={}
    this.serviceService.getUserList(data).subscribe((result) => {
      this.dataSourceUser = result.data;
      console.log(this.dataSourceUser);
    });
  }

  ngAfterViewInit = () => {
    this.dataSourceUser.sort = this.sort;
    this.dataSourceUser.paginator = this.paginator;

    this.dataSourceTenant.sort = this.sort;
    this.dataSourceTenant.paginator = this.paginator;
  }

  applyUserFilter = (event: Event) => {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceUser.filter = filterValue.trim().toLowerCase();
  }
  applyTenantFilter = (event: Event) => {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceTenant.filter = filterValue.trim().toLowerCase();
  }
  blockUser = (elm: any) =>  {
    alert('block ' + elm.name);
  }
  enableUser = (elm: any) => {
    alert('unblock ' + elm.name);
  }
  deleteUser = (elm: any) =>{
    console.log(elm);
    this.serviceService.deleteUser(elm).subscribe((res) => {
      console.log(res);
      if (res.msg === 'success') {
        this.getUserList();
      }
      // this.dataSourceUser.data.splice(this.dataSourceUser.data.indexOf(elm));
      // this.dataSourceUser.data = this.dataSourceUser.data.filter((i) =>
      //   console.log(i)
      // );
      // .filter((i) => i !== elm)
      // .map((i, idx) => ((i.id = idx + 1), i));
    });
  }
  blockTenant = (elm: any) => {
    alert('block ' + elm.name);
  }
  enableTenant = (elm: any) =>{
    alert('unblock ' + elm.name);
  }
  deleteTenant = (elm: any) =>{
    console.log(elm);
    this.serviceService.deleteTenent(elm).subscribe((res) => {
      console.log(res);
      if (res.msg === 'success') {
        this.getTenentList();
      }
    });
  }
}
