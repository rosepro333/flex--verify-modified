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
  accessType = '';
  selectedTenentId = '';
  search = '';
  tenentList: any = [];
  startDate = '';
  endDate = '';
  selectedDocs = 'Document_ID';
  dataSource = new MatTableDataSource();
  pageSizeOptions = [10, 25, 50, 100];
  displayedColumns: string[] = [
    'doc-scan-id',
    'date-time',
    'name-nationality',
    'tenent-id',
    'status-date',
  ];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private router: Router,
    private documentService: DocumentService,
    private serviceService: ServicesService
  ) {}

  ngOnInit(): void {
    this.id = Cookie.get('id');
    this.accessType = Cookie.get('Access_Type');
    this.tenentId = Cookie.get('Tenant_ID');
    this.loadAllDocuments();
  }
  loadAllDocuments = () => {
    if (this.accessType === '1' || this.accessType === '2'){
      this.getTenentList();
    }
    this.docdumentsList();
  }
  scanDocList = () => {
    this.serviceService.scanDocList().subscribe((res: any) => {
      if ( res.msg === 'success'){
        this.dataSource.data = res.data;
      }
      console.log(this.dataSource.data);
    });
  }
  selectDate1 = (value: any) => {
    console.log( value);
    this.startDate = moment(value).utc().toISOString();
 }
  selectDate2 = (value: any) => {
    this.endDate = moment(value).utc().toISOString();
    console.log(moment(value).utc().toISOString());
    if ( value){
      this.loadAllDocuments();
    }
  }
  ngAfterViewInit = () => {
    this.dataSource.paginator = this.paginator;
  }
  selectDocsType = (value: any) => {
    console.log(value);
    this.selectedDocs = value;
  }
  applyFilter = (event: any) => {
    this.search = event;
    this.docdumentsList();
    // const filterValue = (event.target as HTMLInputElement).value;
    // this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  moreDetails = (id: number) => {
    console.log(id);
    this.router.navigate(['documents/' + id]);
  }
   getTenentList = () => {
    if (this.accessType === '1' || this.accessType === '2') {
      this.serviceService.getTenentList().subscribe((res) => {
        // console.log(res);
        if (res.msg === 'success') {
          this.tenentList = res.data;
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
    if (this.tenentId === 'undefined'){
      this.tenentId = '';
    }
    const data = {
    Tenant_ID: this.tenentId,
    limit: '10',
    pageNo: '1',
    order: '-1',
    search: '',
    startDate: '2020-11-08T18:30:00.000Z',
    endDate: '2020-12-23T18:30:00.000Z',
    fieldName: '',
    fieldValue: '',
    status: ''
    };
    this.serviceService.scanDocByTenent(data).subscribe((res) => {
      console.log(res);
      if ( res.msg === 'success'){
        this.dataSource.data = res.data;
        console.log(res.data);
      }
    });
  }
}
