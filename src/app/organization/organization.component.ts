import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator'
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
  isBlocked: boolean
}
   const ELEMENT_DATA: OrganizationElement[] = [
  // {
  //   id: 1,
  //   name: 'Sasi Kumar Raman',
  //   email: 'sasiKumar@gmail.com',
  //   role: 'Flex Admin',
  //   owner: 'Flex Admin',
  //   expiryDate: new Date(2020, 1, 13),
  //   createdBy: 'Flemop',
  //   isBlocked: true
  // },  
];


@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class OrganizationComponent implements OnInit {
  // public data:any=[]
  @ViewChild(MatSort) sort: MatSort;


  @ViewChild(MatPaginator) paginator: MatPaginator;
  pageSizeOptions = [10, 25, 50, 100];
 

  displayedColumns: string[] = ['name-email', 'role', 'owner', 'expiryDate', 'createdBy', 'actions'];
  dataSourceUser = new MatTableDataSource(ELEMENT_DATA);
  dataSourceTenant = new MatTableDataSource(ELEMENT_DATA);
  constructor(private serviceService: ServicesService) { }

  ngOnInit(): void {
    this.getTenentList();
  }

  getTenentList() {
    this.serviceService.getTenentList().subscribe((result) => {
      console.log(result.data);
      this.dataSourceUser = result.data;
    })
  }

  ngAfterViewInit() {
    this.dataSourceUser.sort = this.sort;
    this.dataSourceUser.paginator = this.paginator;

    this.dataSourceTenant.sort = this.sort;
    this.dataSourceTenant.paginator = this.paginator;
  }

  applyUserFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceUser.filter = filterValue.trim().toLowerCase();
  }
  applyTenantFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceTenant.filter = filterValue.trim().toLowerCase();
  }
  blockUser(elm) {
    alert('block ' + elm.name);
  }
  enableUser(elm) {
    alert('unblock ' + elm.name)
  }
  deleteUser(elm) {
    this.dataSourceUser.data = this.dataSourceUser.data
      .filter(i => i !== elm)
      .map((i, idx) => (i.id = (idx + 1), i));
  }
  blockTenant(elm) {
    alert('block ' + elm.name);
  }
  enableTenant(elm) {
    alert('unblock ' + elm.name)
  }
  deleteTenant(elm) {
    this.dataSourceUser.data = this.dataSourceUser.data
      .filter(i => i !== elm)
      .map((i, idx) => (i.id = (idx + 1), i));
  }
}
