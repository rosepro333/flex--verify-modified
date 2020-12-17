import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DocumentModel } from './models/document.model';
import { DocumentService } from './services/document.service';
import { ServicesService } from '../service/services.service';
import { Cookie } from 'ng2-cookies';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DocumentComponent implements OnInit {
  statusColumn: any = [
    { name: 'Submitted', value: 'submitted' },
    { name: 'Incomplete', value: 'Incomplete' },
    { name: 'Rejected', value: 'Rejected' },
    { name: 'Verified', value: 'Verified' },
  ];
  date = new FormControl(new Date());
  serializedDate = new FormControl((new Date()).toISOString());
  id = '';
  tenetId = '';
  accessType = '';
  tenentList: any = [];
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
    this.tenetId = Cookie.get('Tenant_ID');
    this.getTenentList();
    // this.loadAllDocuments();
    this.scanDocList();
  }
  loadAllDocuments = () => {
    this.serviceService.documentList().subscribe((response: any) => {
      console.log(response.data);
      this.dataSource.data = response;
      console.log(this.dataSource.data);
    });
  }
  scanDocList = () => {
    this.serviceService.scanDocList().subscribe((res: any) => {
      if ( res.msg === 'success'){
        this.dataSource.data = res.data;
      }
      console.log(this.dataSource.data);
    });
  }

  ngAfterViewInit = () => {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter = (event: Event) => {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
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
        }
      });
    } else if (this.accessType === '3' || this.accessType === '4') {
      console.log('acces 3' + this.accessType);
      const tenetId = this.tenetId;
      console.log('tenent' + tenetId);
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
    const data = { Tenant_ID: value};
    this.serviceService.scanDocByTenent(data).subscribe((res) => {
      if ( res.msg === 'success'){
        this.dataSource.data = res.data;
      }
    });
  }
}
