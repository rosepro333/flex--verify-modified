import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSidenav } from '@angular/material/sidenav';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { BlockTenentComponent } from '../model/block-tenent/block-tenent.component';
import { BlockUserComponent } from '../model/block-user/block-user.component';
import { DeleteTenentComponent } from '../model/delete-tenent/delete-tenent.component';
import { ServicesService } from '../service/services.service';
import { TosterService } from '../toster/toster.service';

// tslint:disable-next-line:variable-name
const ELEMENT_DATA_Tenent: any = [];
@Component({
  selector: 'app-flex-tenent',
  templateUrl: './flex-tenent.component.html',
  styleUrls: ['./flex-tenent.component.scss'],
})
export class FlexTenentComponent implements OnInit {
  @ViewChild('rightDrawer', { static: false }) sideNav: MatSidenav;
  showFiller = false;
  form: FormGroup;
  tenentList: any = [];
  tenentId = '';
  // public data:any=[]
  @ViewChild(MatSort) sort: MatSort;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  pageSizeOptions = [2, 25, 50, 100];
  pageSize = 10;
  totalSize = 0;
  page = 0;
  currentPage = 1;
  displayedColumns: string[] = [
    'name',
    'owner',
    'createdBy',
    'status',
    // 'actions',
  ];
  tenentStatus: any = [{name: 'All', value: 'All'},
  {name: 'Created', value: 'created'},
  {name: 'Active', value: 'active'},
  {name: 'Suspended', value: 'suspended'}];
  dataSourceTenant = new MatTableDataSource(ELEMENT_DATA_Tenent);
  isCreateTenant: boolean;
  isTenantDetails: boolean;
  tenentData: any = [];
  status = '';
  search = '';
  constructor(
    private service: ServicesService,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private router: Router,
    private toster: TosterService
  ) { }

  ngOnInit(): void {
    this.getTenentList();
    this.formControl();
  }

  getTenentList = () => {
    const data = {
      Tenant_ID: '',
      limit: this.pageSize,
      pageNo: this.currentPage,
      order: '-1',
      search: this.search,
      startDate: '',
      endDate: '',
      status: this.status
    };
    console.log(data);
    this.service.getTenentList(data).subscribe((result) => {
      console.log(result);
      if (result.msg === 'success') {
        this.totalSize = result.length;
        this.dataSourceTenant = result.data;
        // this.tenentList = result.data;
        console.log(this.dataSourceTenant);
      }


    });
  }

  ngAfterViewInit = () => {
    this.dataSourceTenant.sort = this.sort;
    this.dataSourceTenant.paginator = this.paginator;
  }

  applyTenantFilter = () => {
    // tslint:disable-next-line:no-unused-expression
    this.search;
    console.log(this.search);
    this.getTenentList();
  }
  blockUser = (elm: any) => {
    alert('block ' + elm.name);
  }
  enableUser = (elm: any) => {
    alert('unblock ' + elm.name);
  }
  selectStatus = (value: any) => {
    this.status = value;
    console.log(value);
    this.getTenentList();

  }
  handlePage = (value: any) => {
   this.pageSize = value.pageSize;
    this.currentPage = value.pageIndex + 1;
    this.getTenentList();
  }

  blockTenant = (name: any, id: any) => {
    console.log(id, name);
    const dialogRef = this.dialog.open(BlockTenentComponent, {
      height: '160px',
      width: '400px',
      data: { id, name },
    });
    dialogRef.afterClosed().subscribe(() => {
      this.ngOnInit();
    });
  }
  enableTenant = (elm: any) => {
    alert('unblock ' + elm.name);
  }
  deleteTenant = (name: any, id: any) => {
    const dialogRef = this.dialog.open(DeleteTenentComponent, {
      height: '160px',
      width: '400px',
      data: { id, name },
    });
    dialogRef.afterClosed().subscribe(() => {
      this.ngOnInit();
    });
  }
  formControl = () => {
    this.form = this.fb.group({
      name: new FormControl('', [Validators.required, ]),
      contactName: new FormControl('', [Validators.required]),
      contactEmail: new FormControl('', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
    });
  }

  selectTenent = (value: any) => {
    this.tenentId = value;
  }

  editTenent = () => {
    const id = this.tenentData._id;
    console.log(id);
    const contactName = this.form.get('contactName').value;
    const contactEmail = this.form.get('contactEmail').value;
    console.log(contactName);
    console.log(contactEmail);
    const data = {
      Contact_Name: contactName,
      Contact_Mail: contactEmail
    };
    this.service.updateTenent(id, data).subscribe((res) => {
      console.log(res);
      if ( res.msg === 'success'){
        this.sideNav.close();
        this.getTenentList();
        this.toster.openSnackBar('Successfully Updated', res.msg);
      }else if (res.msg === 'failed'){
        this.toster.openSnackBar(res.msg, 'failed' );
      }
    }, (err) => {
      console.log(err);
      this.toster.openSnackBar(err.error, 'failed');
    });
  }
  onSave = () => {
    if (this.form.valid) {
      console.log(this.form.value);
      this.service.createTenent(this.form.value).subscribe(
        (result) => {
          console.log(result);
          if (result.msg === 'success') {
            this.sideNav.close();
            this.reset();
            this.getTenentList();
            console.log(result);
            const data = {
              user: Cookie.get('id'),
              tenentId: Cookie.get('Tenant_ID'),
              activity: 'Create Tenant',
              details: JSON.stringify({ tenentId: result.data._id, tenentName: result.data.Name })
            };
            this.audits(data);
            this.toster.openSnackBar('Tenent Created Successfully', result.msg);
            this.form.reset();
          }
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }
  reset = () => {
    this.form.reset();
  }
  audits = (data: any) => {
    this.service.audit(data).subscribe((res) => {
      console.log(res);
    }, (error: any) => {
      console.log(error);
    });
  }
  clicked = (a: any, value: any) => {
    if (a === 'create-tenant') {
      if (value === null){
        this.tenentData = '';
        this.form.reset();
        this.form.get('name').enable();
        this.form.get('contactEmail').enable();
      }else if (value){
        this.tenentData = value;
        console.log(this.tenentData);
        this.form.patchValue({name: this.tenentData.Name,
          contactName: this.tenentData.Contact_Name,
          contactEmail: this.tenentData.Contact_Mail});
        this.form.get('name').disable();
        // this.form.get('contactEmail').disable();
        // console.log(data);
      }

      this.isCreateTenant = true;
      this.isTenantDetails = false;
    } else if (a === 'tenant-details') {
      this.tenentData = value;
      this.isCreateTenant = false;
      this.isTenantDetails = true;
    }
    else {
      this.isCreateTenant = false;
      this.isTenantDetails = false;
    }
    // console.log(id);
  }
}
