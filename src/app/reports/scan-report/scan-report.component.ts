import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import * as moment from 'moment';
import { ReportService } from 'src/app/service/report.service';
import { ServicesService } from 'src/app/service/services.service';

export interface PeriodicElement {
  activity: string;
  docId: string;
  dateTime: Date;
  ipAddress: string;
  appVersion: string;
}

@Component({
  selector: 'app-scan-report',
  templateUrl: './scan-report.component.html',
  styleUrls: ['./scan-report.component.scss']
})
export class ScanReportComponent implements OnInit {
  scanReport: any = [{name: 'All', value: 'All'},
  {name: 'Submitted', value: 'submitted'},
  {name: 'Incomplete', value: 'Incomplete'},
  {name: 'Rejected', value: 'Rejected'},
  {name: 'Verified', value: 'Verified'},];
  displayedColumns: string[] = ['docId', 'activity', 'dateTime', 'appVersion', 'ipAddress'];
  dataSource: any = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  pageSizeOptions = [2, 25, 50, 100];
  pageSize = 10;
  totalSize = 0;
  currentPage = 1;
  search = '';
  tenentList: any = [];
  details: any = [];
  selectedTenent = '';
  selectedStatus = '';
  startDate: any = moment().startOf('day').toISOString();
  endDate: any = moment().endOf('day').toISOString();
  constructor(private service: ServicesService, private report: ReportService) { }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  ngOnInit(): void {
    this.getTenentList();
    this.scanReports();
  }
  selectStatus = (value: any) => {
    console.log(value);
    this.selectedStatus = value;
     this.scanReports();
  }
  // searchFilter = () => {
  //   console.log(this.search)
  // }
  getTenentList(){
     const data ={
        "isBlocked":true
      };
      this.service.getTenentList(data).subscribe((res) => {
        // console.log(res);
        if (res.msg === 'success') {
           this.tenentList.splice(0,this.tenentList.length);
          res.data.map((i: any, index: number) =>{
            const obj = {};
            if(index === 0){
              const obj1 = {};
              obj1['_id']= "All";
              obj1['Name']= "All";
              this.tenentList.push(obj1);
              obj['_id'] = i._id;
              obj['Name'] = i.Name;
              this.tenentList.push(obj);
            } else{
              obj['_id'] = i._id;
              obj['Name'] = i.Name;
              this.tenentList.push(obj);
            }
          })
        }
      });
  }
  selectDate1 = (value: any) => {
    console.log(value);
    this.startDate = moment(value).utc().toISOString();
  }
  selectDate2 = (value: any) => {
    this.endDate = moment(value).utc().toISOString();
    console.log(moment(value).utc().toISOString());
    if (value) {
      this.scanReports();
    }
  }
  selectTenent = (value: any) => {
    console.log(value)
    this.selectedTenent = value;
    this.scanReports()
  }
  scanDetails = (value: any) => {
    console.log(value)
    this.details = value;
  }
  handlePage = (value: any) => {
    this.search = '';
    console.log(value);
    if (value.pageIndex) {
      console.log(value.pageIndex);
      const pageIndex = (value.pageIndex === 0) ? 1 : value.pageIndex;
      this.currentPage = pageIndex;
      console.log(this.currentPage);
      this.scanReports();
    }
    if (value.pageSize) {
      console.log(value.pageSize);
      this.pageSize = value.pageSize;
      const pageIndex = (value.pageIndex === 0) ? 1 : value.pageIndex;
      this.currentPage = pageIndex;
      this.scanReports();
    }
  }
  scanReports = () => {
    const data = {
      Tenant_ID:this.selectedTenent,
      limit:this.pageSize,
      pageNo:this.currentPage,
      order:"-1",
      startDate:this.startDate,
      endDate:this.endDate,
      status:this.selectedStatus
    }
    this.report.scanReport(data).subscribe((res) => {
      console.log(res)
      if(res.msg === 'success'){
        this.totalSize = res.length;
        this.dataSource =res.data;
      }
    }, (err) => {
      console.log(err)
    })
  }
}
