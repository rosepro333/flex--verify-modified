import { Component, OnInit, ViewEncapsulation, ViewChild, Output, EventEmitter } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DocumentModel } from './models/document.model';
import { DocumentService } from './services/document.service';
import { ServicesService } from '../service/services.service';
import { Cookie } from 'ng2-cookies';
import { FormControl } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import * as moment from 'moment';
@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DocumentComponent implements OnInit {
  showFiller = false;
  @Output() dateChange: EventEmitter<MatDatepickerInputEvent<any>> = new EventEmitter();
  statusColumn: any = [
    { name: 'All', value: 'All' },
    { name: 'Submitted', value: 'submitted' },
    { name: 'Incomplete', value: 'Incomplete' },
    { name: 'Rejected', value: 'Rejected' },
    { name: 'Verified', value: 'Verified' },
  ];
  selectdocumentType: any = [
    { name: 'Document ID', value: 'Document_ID' },
    { name: 'Name', value: 'Name' }
  ];
  date = new FormControl(new Date());
  serializedDate = new FormControl((new Date()).toISOString());
  id = '';
  tenentId = '';
  Tenant_ID = '';
  accessType = '';
  selectedTenentId = '';
  search = '';
  tenentList: any = [];
  startDate: any = moment().startOf('day').toISOString();
  endDate: any = moment().endOf('day').toISOString();
  selectStatustype = '';
  selectedDocs = '';
  disabled = false;
  selectedDocStatus = '';
  selectedTenentType = '';
  dataSource = new MatTableDataSource();
  pageSizeOptions = [2, 25, 50, 100];
  pageSize = 2;
  totalSize = 0;
  currentPage = 1;
  page = 0;
  displayedColumns: string[] = [
    'doc-scan-id',
    'date-time',
    'name-nationality',
    'tenent-id',
    // 'status-date',
  ];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private router: Router,
    private documentService: DocumentService,
    private serviceService: ServicesService) {

  }

  ngOnInit(): void {
    this.id = Cookie.get('id');
    this.accessType = Cookie.get('Access_Type');
    this.Tenant_ID = Cookie.get('Tenant_ID');
    this.loadAllDocuments();
  }
  loadAllDocuments = () => {
    // this.scanDocList();
    if (this.accessType === '1' || this.accessType === '2') {
      this.getTenentList();
    }
    this.docdumentsList();
  }
  handlePage(value: any) {
    console.log(value)
    this.pageSize = value.pageSize;
    this.currentPage = value.pageIndex + 1;
    this.docdumentsList();
    // console.log(value);
    // if (value.pageIndex) {

    //   const pageIndex = (value.pageIndex === 0) ? 1 : value.pageIndex;
    //    console.log(pageIndex)
    //   this.currentPage = pageIndex;
    //   console.log(this.currentPage);
    //   this.docdumentsList();
    // }
    // if (value.pageSize) {
    //   console.log(value.pageSize)
    //   this.pageSize = value.pageSize;
    //   const pageIndex = (value.pageIndex === 0) ? 1 : value.pageIndex;
    //   this.currentPage = pageIndex;
    //   console.log(this.currentPage);
    //   this.docdumentsList();
    // }
  }
  checkSelectButton = () => {
    // console.log(this.selectedDocs);
    // if (!this.selectedDocs) {
    //   console.log(this.selectedDocs);
    //   this.disabled = true;
    // }else{
    //   console.log(this.selectedDocs);
    //   this.disabled = false;
    // }
  }
  clear = () => {
    const start = moment().startOf('day').toISOString();
    const end = moment().endOf('day').toISOString();
    this.search = '';
    this.selectStatustype = '';
    this.startDate = new Date(start);
    this.endDate = new Date(end);
    this.selectedDocs = '';
    this.tenentId = 'All';
    this.selectedTenentType = 'All';
    this.selectedDocStatus = 'All';
    this.docdumentsList();
    // All
  }
  scanDocList = () => {
    this.serviceService.scanDocList().subscribe((res: any) => {
      if (res.msg === 'success') {
        this.dataSource.data = res.data;
      }
      console.log(this.dataSource.data);
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
      this.docdumentsList();
    }
  }
  ngAfterViewInit = () => {
    this.dataSource.paginator = this.paginator;
  }
  selectDocsType = (value: any) => {
    this.search ='';
    this.selectedDocs = value;
    console.log(this.selectedDocs);
    this.disabled = false;
  }
  applyFilter = () => {
    console.log(this.search)
    this.docdumentsList();
  }
  moreDetails = (id: number) => {
    console.log(id);
    const data = {
      user: Cookie.get('id'),
      tenentId: Cookie.get('Tenant_ID'),
      activity: 'View Document',
      details: JSON.stringify({ document_id: id })
    };
    this.audits(data);
    this.router.navigate(['documents/' + id]);
  }
  selectStatus = (value) => {
    console.log(value);
    this.selectStatustype = value;
    this.docdumentsList();
  }
  getTenentList = () => {
    this.tenentList.slice(0, this.tenentList.length);
    if (this.accessType === '1' || this.accessType === '2') {
      const data = {}
      this.serviceService.getTenentList(data).subscribe((res) => {
        if (res.msg === 'success') {
          res.data.map((i: any, index) => {
            console.log(i.Name);
            const obj = {};
            if (index === 0) {
              const objs = {};
              // tslint:disable-next-line:no-string-literal
              objs['_id'] = 'All';
              // tslint:disable-next-line:no-string-literal
              objs['Name'] = 'All';
              this.tenentList.push(objs);

              // tslint:disable-next-line:no-string-literal
              obj['_id'] = i._id;
              // tslint:disable-next-line:no-string-literal
              obj['Name'] = i.Name;
              this.tenentList.push(obj);
              console.log(this.tenentList);
            } else {
              // tslint:disable-next-line:no-string-literal
              obj['_id'] = i._id;
              // tslint:disable-next-line:no-string-literal
              obj['Name'] = i.Name;
              this.tenentList.push(obj);
            }
          });
          console.log(this.tenentList);
        }
      });
    } else if (this.accessType === '3' || this.accessType === '4') {
      console.log('acces 3' + this.accessType);
      const tenetId = this.tenentId;
      this.serviceService.findTenetListById(tenetId).subscribe((res) => {
        console.log(res);
        if (res.msg === 'success') {
          this.tenentList = res.data;
          console.log(this.tenentList);
        }
      });
    }
  }
  selectTenent = (value: any) => {
    console.log(value);
    this.tenentId = value;
    this.docdumentsList();
  }
  docdumentsList = () => {
    if (this.Tenant_ID !== 'undefined' && this.Tenant_ID !== '') {
      this.tenentId = this.Tenant_ID;
    }
    const data = {
      Tenant_ID: this.tenentId,
      limit: this.pageSize,
      pageNo: this.currentPage,
      order: '-1',
      search: this.search,
      startDate: this.startDate,
      endDate: this.endDate,
      fieldName: this.selectedDocs,
      status: this.selectStatustype
    };
    console.log(data);
    this.serviceService.scanDocByTenent(data).subscribe((res) => {
      if (res.msg === 'success') {
        if (res.data) {
          this.totalSize= res.length;
          this.dataSource.data = res.data;
          console.log( this.dataSource.data);
        } else if (!res.datas) {
          this.dataSource.data.slice(0, this.dataSource.data.length);
          console.log(res.datas);
          res.datas.map((i: any) => {
            console.log(i.docs);
            if (i.docs) {
              this.dataSource.data.push(i.doc);
            } else {
              this.dataSource.data = [];
            }
          });
        } else {
          this.dataSource.data.slice(0, this.dataSource.data.length);
          this.dataSource.data = res.datas;
        }
      }
    });
  }
  audits = (data: any) => {
    this.serviceService.audit(data).subscribe((res) => {
      console.log(res);
    }, (error: any) => {
      console.log(error);
    });
  }
}
