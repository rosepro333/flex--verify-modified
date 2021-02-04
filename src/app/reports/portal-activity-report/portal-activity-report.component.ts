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
  selector: 'app-portal-activity-report',
  templateUrl: './portal-activity-report.component.html',
  styleUrls: ['./portal-activity-report.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class PortalActivityReportComponent implements OnInit {
  activityList:any = [{name:'All',value:'All'},{name:'Login',value:'Login'},
  {name:'Generate Url',value:'Generate Url'},{name:'View Document',value:'View Document'},
  {name:'Save Scan',value:'Save Scan'},{name:'Comment Scan',value:'Comment Scan'},
  {name:'Delete Scan',value:'Delete Scan'},{name:'Create User',value:'Create User'},
  {name:'Delete User',value:'Delete User'},{name:'Create Tenant',value:'Create Tenant'},
  {name:'Delete Tenant',value:'Delete Tenant'},{name:'Create API Key',value:'Create API Key'},
  {name:'Revoke API Key',value:'Revoke API Key'},{name:'Create SDK Key',value:'Create SDK Key'},
  {name:'Revoke SDK Key',value:'Revoke SDK Key'}]
  displayedColumns: string[] = ['docId', 'activity', 'dateTime', 'appVersion', 'ipAddress'];
  dataSource: any = [];
  search = '';
  selectedTenent = '';
  @ViewChild(MatPaginator) paginator: MatPaginator;
  pageSizeOptions = [2, 25, 50, 100];
  pageSize = 10;
  totalSize = 0;
  page = 0;
  currentPage = 1;
  activity: any = [];
  selectedActivity = '';
  tenentList: any = [];
  excelData: any = [];
  startDate: any = moment().startOf('day').toISOString();
  endDate: any = moment().endOf('day').toISOString();
  constructor(private report: ReportService, private service:ServicesService, private excelService:ExcelService) { }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  ngOnInit(): void {
    this.portalActivity()
    this.getTenentList();
  }
  selectTenent = (value: any) => {
    this.search = '';
    this.selectedTenent = value;
    console.log(value);
    this.portalActivity();
  }
  selectActivity = (value: any) => {
    this.search =''
    this.selectedActivity =value;
    console.log(value);
    this.portalActivity();
  }
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
  activityDetails = (data: any) => {

    console.log(data);
    // data.deviceSignature = JSON.parse(data.deviceSignature);
    this.activity = data;
    console.log(data);
  }
  selectDate1 = (value: any) => {
    this.search = '';
    console.log(value);
    this.startDate = moment(value).startOf('day').utc().toISOString();
  }
  selectDate2 = (value: any) => {
    this.endDate = moment(value).endOf('day').utc().toISOString();
    if (value) {
      this.portalActivity();
    }
  }
  searchFilter = () => {
    console.log(this.search);
    this.portalActivity();
  }
  handlePage = (value: any) => {
    this.search = '';
    console.log(value);
    this.pageSize = value.pageSize;
    this.currentPage = value.pageIndex + 1;
    this.portalActivity();
    // if (value.pageIndex) {
    //   console.log(value.pageIndex);
    //   const pageIndex = (value.pageIndex === 0) ? 1 : value.pageIndex;
    //   this.currentPage = pageIndex;
    //   console.log(this.currentPage);
    //   this.portalActivity();
    // }
    // if (value.pageSize) {
    //   console.log(value.pageSize);
    //   this.pageSize = value.pageSize;
    //   const pageIndex = (value.pageIndex === 0) ? 1 : value.pageIndex;
    //   this.currentPage = pageIndex;
    //   this.portalActivity();
    // }
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
      'adminPortalActivity'
    );
  }
  filterReport() {
    this.dataSource.map((i, index) => {
      console.log(i)
      const data = {};
      data['Name'] = i.user.Contact_Name;
      data['createdAt'] = moment( i.createdAt).format('DD-MMM-YYYY hh:mm A');
      data['activity'] = i.activity;
      data['deviceSignature'] = `${i.deviceSignature.browser} ${i.deviceSignature.browser_version}`;
      data['ipAddress'] = i.ipAddress;
      this.excelData.push(data);
    });
  }
  portalActivity = () => {
    const data = {
      search:this.search,
      tenentId:this.selectedTenent,
      activity:this.selectedActivity,
      limit: this.pageSize,
      order: "-1",
      pageNo: this.currentPage,
      startDate: this.startDate,
      endDate: this.endDate,
      status: ""
    }
    this.report.portalActivity(data).subscribe((res)=>{
      console.log(res);
      if( res.msg ==='success'){
        this.totalSize = res.length;
        res.data.map((i: any,index:number) =>{
          res.data[index].deviceSignature = JSON.parse(res.data[index].deviceSignature);
        })
        this.dataSource = res.data;
      }
    },(err: any ) => {
      console.log(err)
    })
    // console.log('ssdds')

  }

}
