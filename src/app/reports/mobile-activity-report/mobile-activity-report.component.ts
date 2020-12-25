import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

export interface PeriodicElement {
  activity: string;
  docId: string;
  dateTime: Date;
  ipAddress: string;
  appVersion: string;
}
const ELEMENT_DATA: PeriodicElement[] = [
  { docId: "8354892343", activity: 'Active', dateTime: new Date(2020, 1, 10, 9, 30, 30), ipAddress: "195.0.122.5", appVersion: 'Chrome V1.4' },
  { docId: "39240ASD8", activity: 'Inactive', dateTime: new Date(2020, 10, 10, 10, 20, 30), ipAddress: "195.122.122.255", appVersion: 'Safari V2.4' },
  { docId: "839283EWE", activity: 'Active', dateTime: new Date(2020, 10, 12, 8, 12, 30), ipAddress: "195.10.122.25", appVersion: 'Mozilla V1.4' },
];

@Component({
  selector: 'app-mobile-activity-report',
  templateUrl: './mobile-activity-report.component.html',
  styleUrls: ['./mobile-activity-report.component.scss']
})
export class MobileActivityReportComponent implements OnInit {
  displayedColumns: string[] = ['docId', 'activity', 'dateTime', 'appVersion', 'ipAddress'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  pageSizeOptions = [2, 25, 50, 100];
  pageSize = 10;
  totalSize = 0;
  currentPage = 1;

  constructor() { }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  ngOnInit(): void {
  }
}
