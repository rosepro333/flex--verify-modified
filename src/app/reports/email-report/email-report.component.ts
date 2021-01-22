import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import * as moment from 'moment';
import { ExcelService } from 'src/app/service/excel.service';
import { ReportService } from 'src/app/service/report.service';

@Component({
  selector: 'app-email-report',
  templateUrl: './email-report.component.html',
  styleUrls: ['./email-report.component.scss'],
  encapsulation: ViewEncapsulation.None,
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
  excelData: any = [];
  constructor(private report: ReportService, private excelService: ExcelService) { }

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
      'EmailReportActivity'
    );
  }
  filterReport() {
    this.dataSource.map((i, index) => {
      console.log(i)
      const data = {};
      data['recipientEmail'] = i.recipientEmail;
      data['createdAt'] = moment( i.createdAt).format('DD-MMM-YYYY hh:mm A');
      data['type'] = i.type;
      // data['deviceSignature'] = `${i.deviceSignature.browser} ${i.deviceSignature.browser_version}`;
      data['ipAddress'] = i.ipAddress;
      this.excelData.push(data);
    });
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
