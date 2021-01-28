import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { AddDocumentComponent } from '../dialog-box/add-document/add-document.component';
import { ReportService } from '../service/report.service';
import { ServicesService } from '../service/services.service';
import { TosterService } from '../toster/toster.service';

@Component({
  selector: 'app-tenent-document-config',
  templateUrl: './tenent-document-config.component.html',
  styleUrls: ['./tenent-document-config.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class TenentDocumentConfigComponent implements OnInit {
@ViewChild('rightDrawer', { static: false }) sideNav: MatSidenav;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  pageSizeOptions = [10, 25, 50, 100];
  pageSize = 10;
  totalSize = 0;
  page = 0;
  currentPage = 1;
  search = '';
  accessType = '';
  tenetId = '';
  userId = '';
  tenentList: any = [];
  dataSourceUser: any = ['1','1','1','1'];
  displayedColumns: string[] = [
    'Countries',
    'National ID',
    'Passport',
    'Driving Licence',
  ];
  displayedColumns1: string[] = ['Countries', 'TakeAction',];
  isCountry :boolean;
  isDocument :boolean;
  dataSource: any = ['1'];
  checkCountry= true;
  countryInfo = false;
  constructor(
    private serviceService: ServicesService,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private router: Router,
    private service: ServicesService,
    private toster: TosterService,
    private report: ReportService
  ) { }

  ngOnInit(): void {
    this.accessType = Cookie.get('Access_Type');
    this.tenetId = Cookie.get('Tenant_ID');

  }
  enabledCreateCountry = () =>{
    this.checkCountry = false;
    this.countryInfo = true;
    console.log();
  }
   disableCreateCountry = () =>{
    this.checkCountry = true;
    this.countryInfo = false;
    console.log();
  }
  addDocument = () =>{
    const dialogRef = this.dialog.open( AddDocumentComponent, {
      height: '220px',
      width: '500px',
    });
    dialogRef.afterClosed().subscribe(() => {
      // this.getTenentList();
      this.sideNav.close();
    });
  }
  selectTenentUser = (value: any) => {
    this.search = '';
     console.log(value)
    //  this.tenentUser = value;
    //  this.getUserList();
  }
  searchCountry = () =>{

  }
  toggle = (value: any) => {
    console.log(value.checked)
  }
  handlePage(value: any) {
    this.pageSize = value.pageSize;
    this.currentPage = value.pageIndex + 1;
    // this.getUserList();
  }
  openDrawer = (value:string) =>{
    if( value === 'countryList'){
      this.isCountry = true;
      this.isDocument = false;
    }
    else if( value === 'document'){
      this.isDocument = true;
      this.isCountry = false;

    }else{
      this.isCountry = false;
      this.isDocument = false;
    }
  }
  clicked(a, data) {
    console.log(a,data);
      if (a == 'create-user') {
        if(data === null){
          // this.userEdit = '';
          // this.form.reset();
          // this.form.get('email').enable();
          // this.form.get('access').enable();
          // this.form.get('tenent').enable();
        }else if(data){
          // this.userEdit = data;
          // this.form.patchValue({name: this.userEdit.Contact_Name,email: this.userEdit.Contact_Email,access: this.userEdit.Access_Type,tenent: this.userEdit.Tenant_ID?._id})
          // console.log(data);
          // this.form.get('email').disable();
          // this.form.get('access').disable();
          // this.form.get('tenent').disable();
        }
          // this.isCreateUser = true;
          // this.isUserDetails = false;

      } else if (a == 'user-details') {
        // this.detailsDetails = data;
        // console.log(this.detailsDetails);
        // this.isCreateUser = false;
        // this.isUserDetails = true;
      }
      else {
        console.log('3')
        // this.isCreateUser = false;
        // this.isUserDetails = false;
      }
    }

}
