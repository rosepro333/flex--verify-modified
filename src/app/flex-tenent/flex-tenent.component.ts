import { Component, OnInit, ViewChild } from '@angular/core';
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
  showFiller = false;
  form: FormGroup;
  tenentList: any = [];
  tenentId = '';
  // public data:any=[]
  @ViewChild(MatSort) sort: MatSort;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  pageSizeOptions = [10, 25, 50, 100];

  displayedColumns: string[] = [
    'name-email',
    'role',
    'owner',
    'status',
    'createdBy',
    'actions',
  ];
  dataSourceTenant = new MatTableDataSource(ELEMENT_DATA_Tenent);
  constructor(
    private service: ServicesService,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private router: Router,
    private toster: TosterService
  ) {}

  ngOnInit(): void {
    this.getTenentList();
    this.formControl();
  }

  getTenentList = () => {
    this.service.getTenentList().subscribe((result) => {
      this.dataSourceTenant = result.data;
      this.tenentList = result.data;
      console.log(this.dataSourceTenant);
    });
  }

  ngAfterViewInit = () => {
    this.dataSourceTenant.sort = this.sort;
    this.dataSourceTenant.paginator = this.paginator;
  }

  applyTenantFilter = (event: Event) => {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceTenant.filter = filterValue.trim().toLowerCase();
  }
  blockUser = (elm: any) => {
    alert('block ' + elm.name);
  }
  enableUser = (elm: any) => {
    alert('unblock ' + elm.name);
  }

  blockTenant = (id: any, name: any) => {
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
  deleteTenant = (id: any, name: any) => {
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
      type: new FormControl(''),
      email: new FormControl(''),
      name: new FormControl(''),
      access: new FormControl(''),
      tenent: new FormControl(''),
    });
  }

  selectTenent = (value: any) => {
    this.tenentId = value;
  }
  onSave = () => {
    if (this.form.valid) {
      console.log(this.form.value);
      this.service.createTenent(this.form.value).subscribe(
        (result) => {
          console.log(result);
          if (result.msg === 'success') {
            console.log(result);
            const data = {
              user: Cookie.get('id'),
              tenentId: Cookie.get('Tenant_ID'),
              activity: 'Create Tenant',
              details: JSON.stringify({})
            };
            this.audits(data);
            this.toster.openSnackBar('Tenent Created Successfully', result.msg);
            this.ngOnInit();
          }
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }
  audits = (data: any) => {
    this.service.audit(data).subscribe((res) => {
    console.log(res);
    }, (error: any) => {
      console.log(error);
    });
  }
}
