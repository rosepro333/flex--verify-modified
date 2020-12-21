import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSidenav } from '@angular/material/sidenav';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { BlockTenentComponent } from '../model/block-tenent/block-tenent.component';
import { BlockUserComponent } from '../model/block-user/block-user.component';
import { DeleteUserComponent } from '../model/delete-user/delete-user.component';
import { ServicesService } from '../service/services.service';
import { TosterService } from '../toster/toster.service';

// tslint:disable-next-line:variable-name
const ELEMENT_DATA_Tenent: any = [];
// tslint:disable-next-line:variable-name
const ELEMENT_DATA_User: any = [];
@Component({
  selector: 'app-flex-user',
  templateUrl: './flex-user.component.html',
  styleUrls: ['./flex-user.component.scss'],
})
export class FlexUserComponent implements OnInit {
  // public data:any=[]
  showFiller = false;
  tenentList: any = [];
  tenentId = '';
  @ViewChild(MatSort) sort: MatSort;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  pageSizeOptions = [10, 25, 50, 100];

  displayedColumns: string[] = [
    'name',
    'email',
    'status',
    'accessType',
    'createdAt',
    'actions',
  ];
  dataSourceUser = new MatTableDataSource(ELEMENT_DATA_User);
  dataSourceTenant = new MatTableDataSource(ELEMENT_DATA_Tenent);
  form: FormGroup;
  accessType = '';
  tenetId = '';
  userId = '';
  isOPen = false;
  constructor(
    private serviceService: ServicesService,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private router: Router,
    private service: ServicesService,
    private toster: TosterService
  ) {}

  ngOnInit(): void {
    this.accessType = Cookie.get('Access_Type');
    this.tenetId = Cookie.get('Tenant_ID');
    this.userId = Cookie.get('id');
    this.getTenentList();
    this.getUserList();
    this.formControl();
  }

  getUserList = () => {
    if (this.accessType === '1') {
      this.serviceService.getUserList().subscribe((result) => {
        this.dataSourceUser = result.data;
      });
    } else if (this.accessType === '3') {
      const tenetId = this.tenetId;
      console.log('tenent' + tenetId);
      this.service.findUserByTenentId(tenetId).subscribe((res) => {
        console.log(res);
        if (res.msg === 'success') {
          this.dataSourceUser = res.data;
        }
      });
    }
  }

  ngAfterViewInit = () => {
    this.dataSourceUser.sort = this.sort;
    this.dataSourceUser.paginator = this.paginator;

    this.dataSourceTenant.sort = this.sort;
    this.dataSourceTenant.paginator = this.paginator;
  }

  applyUserFilter = (event: Event) => {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceUser.filter = filterValue.trim().toLowerCase();
  }
  applyTenantFilter = (event: Event) => {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceTenant.filter = filterValue.trim().toLowerCase();
  }
  blockUser = (id: any, name: any) => {
    if (id !== this.userId) {
      const dialogRef = this.dialog.open(BlockUserComponent, {
        height: '160px',
        width: '400px',
        data: { id, name },
      });
      dialogRef.afterClosed().subscribe(() => {
        this.ngOnInit();
      });
    } else {
      this.toster.openSnackBar('You can not block ownself', 'failed');
    }
  }
  enableUser = (elm): any => {
    alert('unblock ' + elm.name);
  }
  deleteUser = (id: any , name: any ) => {
    if (id !== this.userId) {
      const dialogRef = this.dialog.open(DeleteUserComponent, {
        height: '160px',
        width: '400px',
        data: { id, name },
      });
      dialogRef.afterClosed().subscribe(() => {
        this.ngOnInit();
      });
    } else {
      this.toster.openSnackBar('You can not delete ownself', 'failed');
    }
  }
  blockTenant = (elm: any ) => {
    alert('block ' + elm.name);
  }
  enableTenant = (elm: any) => {
    alert('unblock ' + elm.name);
  }
  deleteTenant = (elm: any) => {
    this.serviceService.deleteTenent(elm).subscribe((res) => {
      console.log(res);
      if (res.msg === 'success') {
        this.getTenentList();
      }
    });
  }

  formControl = () => {
    this.form = this.fb.group({
      type: new FormControl(''),
      email: new FormControl(''),
      name: new FormControl(''),
      access: new FormControl(''),
      tenent: new FormControl(''),
    });
  }
  getTenentList = () => {
    if (this.accessType === '1') {
      this.service.getTenentList().subscribe((res) => {
        // console.log(res);
        if (res.msg === 'success') {
          this.tenentList = res.data;
        }
      });
    } else if (this.accessType === '3') {
      console.log('acces 3' + this.accessType);
      const tenetId = this.tenetId;
      console.log('tenent' + tenetId);
      this.service.findTenetListById(tenetId).subscribe((res) => {
        console.log(res);
        if (res.msg === 'success') {
          this.tenentList = res.data;
          console.log(this.tenentList);
        }
      });
    }
  }
  selectTenent = (value: any) => {
    this.tenentId = value;
  }
  onSave = ()  => {
    if (this.form.valid) {
      this.form.value.tenent = this.tenentId;
      this.service.userCreate(this.form.value).subscribe(
        (result) => {
          console.log(result);
          if (result.msg === 'success') {
            console.log(result);
            const data = {
              user: Cookie.get('id'),
              tenentId: Cookie.get('Tenant_ID'),
              activity: 'Create User',
              details: JSON.stringify({id: result.docs._id, name: result.docs.Contact_Name, tenentId: result.docs.Tenant_ID})
            };
            this.audits(data);
            this.toster.openSnackBar('User Created Successfully', result.msg);
            this.getUserList();
          }
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }
  userNavigate = () => {
    setTimeout(() => {}, 200);
  }
  audits = (data: any) => {
    this.service.audit(data).subscribe((res) => {
    console.log(res);
    }, (error: any) => {
      console.log(error);
    });
  }
}
