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
  accessType = '';
  selectedTenentId = '';
  search = '';
  tenentList: any = [];
  startDate = '';
  endDate = '';
  selectStatustype = '';
  selectedDocs = '';
  disabled = true;
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
    private serviceService: ServicesService) {

  }

  ngOnInit(): void {
    this.id = Cookie.get('id');
    this.accessType = Cookie.get('Access_Type');
    this.tenentId = Cookie.get('Tenant_ID');
    this.loadAllDocuments();
  }
  loadAllDocuments = () => {
    this.scanDocList();
    if (this.accessType === '1' || this.accessType === '2'){
      this.getTenentList();
    }
    this.docdumentsList();
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
    if (value){
      this.docdumentsList();
    }
  }
  ngAfterViewInit = () => {
    this.dataSource.paginator = this.paginator;
  }
  selectDocsType = (value: any) => {
    this.selectedDocs = value;
    console.log(this.selectedDocs);
    // if (this.selectedDocs){
    this.disabled = false;
    // console.log(this.disabled);
    // }
    // this.checkSelectButton();
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
  selectStatus = (value) => {
    console.log(value);
    this.selectStatustype = value;
    this.docdumentsList();
  }
   getTenentList = () => {
    this.tenentList.slice(0, this.tenentList.length);
    if (this.accessType === '1' || this.accessType === '2') {
      this.serviceService.getTenentList().subscribe((res) => {
        // console.log(res);
        if (res.msg === 'success') {
          // this.tenentList = res.data;
          res.data.map((i: any, index) => {
            console.log(i.Name);
            const obj = {};
            if ( index === 0){
              console.log('index ' + index);
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
            }else{
              // tslint:disable-next-line:no-string-literal
              obj['_id'] = i._id;
              // tslint:disable-next-line:no-string-literal
              obj['Name'] = i.Name;
              this.tenentList.push(obj);
              // console.log(this.tenentList);
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
    if (this.tenentId === 'undefined'){
      this.tenentId = '';
    }
    const data = {
    Tenant_ID: this.tenentId,
    limit: '10',
    pageNo: '1',
    order: '-1',
    search: this.search,
    startDate: this.startDate,
    endDate: this.endDate,
    fieldName: this.selectedDocs,
    fieldValue: '',
    status: this.selectStatustype
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
