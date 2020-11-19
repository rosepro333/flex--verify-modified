import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { ServicesService } from "../service/services.service";

let ELEMENT_DATA_Tenent: any = [];
@Component({
  selector: "app-flex-tenent",
  templateUrl: "./flex-tenent.component.html",
  styleUrls: ["./flex-tenent.component.scss"],
})
export class FlexTenentComponent implements OnInit {
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
  dataSourceTenant = new MatTableDataSource(ELEMENT_DATA_Tenent);
  constructor(private serviceService: ServicesService) {}

  ngOnInit(): void {
    this.getTenentList();
  }

  getTenentList() {
    this.serviceService.getTenentList().subscribe((result) => {
      this.dataSourceTenant = result.data;
      console.log(this.dataSourceTenant);
    });
  }

  ngAfterViewInit() {
    this.dataSourceTenant.sort = this.sort;
    this.dataSourceTenant.paginator = this.paginator;
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
