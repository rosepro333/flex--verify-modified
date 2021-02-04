import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import * as moment from 'moment';
import { ExcelService } from 'src/app/service/excel.service';
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
  styleUrls: ['./scan-report.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
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
  page = 0;
  currentPage = 1;
  search = '';
  tenentList: any = [];
  details: any = [];
  selectedTenent = '';
  selectedStatus = '';
  excelData: any = [];
  startDate: any = moment().startOf('day').toISOString();
  endDate: any = moment().endOf('day').toISOString();
  constructor(private service: ServicesService, private report: ReportService, private excelService:ExcelService) { }

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
            console.log(this.tenentList);
          })
        }
      });
  }
  selectDate1 = (value: any) => {
    console.log(value);
    this.startDate = moment(value).startOf('day').utc().toISOString();
  }
  selectDate2 = (value: any) => {
    this.endDate = moment(value).endOf('day').utc().toISOString();
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
    this.pageSize = value.pageSize;
    this.currentPage = value.pageIndex + 1;
    this.scanReports();
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
      'ScanReport'
    );
  }
  filterReport() {
    this.dataSource.map((i, index) => {
      console.log(i)
      const data = {};
      data['Scan_ID'] = i.Scan_ID;
      data['createdAt'] = moment( i.createdAt).format('DD-MMM-YYYY hh:mm A');
      data['status'] = i.scanResultStatus;
      data['ID_Type'] = i.ID_Type;
      data['Name'] = `${i.firstName} ${i.lastName}`;
      this.excelData.push(data);
    });
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
