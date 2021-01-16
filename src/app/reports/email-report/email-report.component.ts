import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import * as moment from 'moment';
import { ReportService } from 'src/app/service/report.service';

@Component({
  selector: 'app-email-report',
  templateUrl: './email-report.component.html',
  styleUrls: ['./email-report.component.scss']
})
export class EmailReportComponent implements OnInit {

   displayedColumns: string[] = ['docId', 'activity', 'dateTime', 'Subject', 'ipAddress'];
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
  constructor(private report: ReportService) { }

  // tslint:disable-next-line:typedef
  // ngAfterViewInit() {
  //   // this.dataSource.paginator = this.paginator;
  // }
  ngOnInit(): void {
    this.emailActivity();
  }
  selectDate1 = (value: any) => {
    console.log(value);
    this.startDate = moment(value).startOf('day').utc().toISOString();
  }
  selectDate2 = (value: any) => {
    this.endDate = moment(value).endOf('day').utc().toISOString();
    console.log(moment(value).utc().toISOString());
    if (value) {
      this.emailActivity();
    }
  }
  searchFilter = () => {
    console.log(this.search);
    this.emailActivity();
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
    this.emailActivity();
  }
  emailActivity = () => {
    const data = {
    documentId: this.search,
    limit: this.pageSize,
    order: '-1',
    pageNo: this.currentPage,
    startDate: this.startDate,
    endDate: this.endDate,
    status: ''
    };
    this.report.emaiListFilter(data).subscribe((res) => {
      if (res.msg === 'success'){
          console.log(res);
          this.totalSize = res.length;
          // res.data.map((i: any,index:number) =>{
          //   res.data[index].deviceSignature = JSON.parse(res.data[index].deviceSignature);
          // })
          this.dataSource = res.data;
          console.log(this.dataSource)
      }
    }, (err: any) => {
      console.log(err);
    });
  }

}
