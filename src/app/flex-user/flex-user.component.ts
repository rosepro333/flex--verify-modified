import { Component, OnInit, ViewEncapsulation, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { ServicesService } from "../service/services.service";

let ELEMENT_DATA_Tenent: any = [];
let ELEMENT_DATA_User: any = [];
@Component({
  selector: "app-flex-user",
  templateUrl: "./flex-user.component.html",
  styleUrls: ["./flex-user.component.scss"],
})
export class FlexUserComponent implements OnInit {
  // public data:any=[]
  @ViewChild(MatSort) sort: MatSort;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  pageSizeOptions = [10, 25, 50, 100];

  displayedColumns: string[] = [
    "name-email",
    "role",
    "owner",
    "createdBy",
    "actions",
  ];
  dataSourceUser = new MatTableDataSource(ELEMENT_DATA_User);
  dataSourceTenant = new MatTableDataSource(ELEMENT_DATA_Tenent);
  constructor(private serviceService: ServicesService) {}

  ngOnInit(): void {
    this.getTenentList();
    this.getUserList();
  }

  getTenentList() {
    this.serviceService.getTenentList().subscribe((result) => {
      this.dataSourceTenant = result.data;
      console.log(this.dataSourceTenant);
    });
  }
  getUserList() {
    this.serviceService.getUserList().subscribe((result) => {
      this.dataSourceUser = result.data;
      console.log(this.dataSourceUser);
    });
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
    alert("block " + elm.name);
  }
  enableUser(elm) {
    alert("unblock " + elm.name);
  }
  deleteUser(elm) {
    console.log(elm);
    this.serviceService.deleteUser(elm).subscribe((res) => {
      console.log(res);
      if (res.msg === "success") {
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
  blockTenant(elm) {
    alert("block " + elm.name);
  }
  enableTenant(elm) {
    alert("unblock " + elm.name);
  }
  deleteTenant(elm) {
    console.log(elm);
    this.serviceService.deleteTenent(elm).subscribe((res) => {
      console.log(res);
      if (res.msg === "success") {
        this.getTenentList();
      }
    });
  }
}
