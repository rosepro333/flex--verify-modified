import { map } from 'rxjs/operators';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import * as moment from 'moment';
import { ReportService } from 'src/app/service/report.service';
import { ExcelService } from 'src/app/service/excel.service';

export interface PeriodicElement {
  activity: string;
  docId: string;
  dateTime: Date;
  ipAddress: string;
  appVersion: string;
}

@Component({
  selector: 'app-mobile-activity-report',
  templateUrl: './mobile-activity-report.component.html',
  styleUrls: ['./mobile-activity-report.component.scss']
})
export class MobileActivityReportComponent implements OnInit {
  displayedColumns: string[] = ['docId', 'activity', 'dateTime', 'appVersion', 'ipAddress'];
  dataSource: any = [];
  activity: any = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  pageSizeOptions = [10, 25, 50, 100];
  pageSize = 10;
  totalSize = 0;
  page = 0;
  currentPage = 1;
  search = '';
  startDate: any = moment().startOf('day').toISOString();
  endDate: any = moment().endOf('day').toISOString();
  excelData: any = [];
  constructor(private report: ReportService,private excelService: ExcelService) { }

  // tslint:disable-next-line:typedef
  // ngAfterViewInit() {
  //   // this.dataSource.paginator = this.paginator;
  // }
  ngOnInit(): void {
    this.mobileActivity();
  }
  selectDate1 = (value: any) => {
    console.log(value);
    this.startDate = moment(value).startOf('day').utc().toISOString();
  }
  selectDate2 = (value: any) => {
    this.endDate = moment(value).endOf('day').utc().toISOString();
    console.log(moment(value).utc().toISOString());
    if (value) {
      this.mobileActivity();
    }
  }
  searchFilter = () => {
    console.log(this.search);
    this.mobileActivity();
  }
  activityDetails = (data: any) => {
    console.log(data);
    // data.deviceSignature = JSON.parse(data.deviceSignature);
    this.activity = data;
    console.log(data);
  }
  handlePage = (value: any) => {
    this.search = '';
    console.log(value);
    this.pageSize = value.pageSize;
    this.currentPage = value.pageIndex + 1;
    this.mobileActivity();
  }
  mobileActivity = () => {
    const data = {
    documentId: this.search,
    limit: this.pageSize,
    order: '-1',
    pageNo: this.currentPage,
    startDate: this.startDate,
    endDate: this.endDate,
    status: ''
    };
    this.report.mobileActivity(data).subscribe((res) => {
      if (res.msg === 'success'){
          console.log(res);
          this.totalSize = res.length;
          res.data.map((i: any,index:number) =>{
            res.data[index].deviceSignature = JSON.parse(res.data[index].deviceSignature);
          })
          this.dataSource = res.data;
      }
    }, (err: any) => {
      console.log(err);
    });
  }
  exportAsXLSX(): void {
    this.excelData.splice(0, this.excelData.length);
    console.log(this.dataSource)
    const dateRange =
      moment(this.startDate).format('DD-MM-YYYY') +
      ' to ' +
      moment(this.endDate).format('DD-MM-YYYY');
    this.filterReport();
    this.excelService.exportAsExcelFile(
      dateRange,
      this.excelData,
      'mobileReportActivity'
    );
  }
  filterReport() {
    this.dataSource.map((i, index) => {
      console.log(i)
      const data = {};
      data['documentId'] = i.documentId._id;
      data['createdAt'] = moment( i.createdAt).format('DD-MMM-YYYY hh:mm A');
      data['activity'] = i.activity;
      data['deviceSignature'] = `${i.deviceSignature.browser} ${i.deviceSignature.browser_version}`;
      data['ipAddress'] = i.ipAddress;
      this.excelData.push(data);
    });
  }
}
