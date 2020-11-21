import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { BlockTenentComponent } from '../model/block-tenent/block-tenent.component';
import { DeleteUserComponent } from '../model/delete-user/delete-user.component';
import { ServicesService } from '../service/services.service';
import { TosterService } from '../toster/toster.service';

let ELEMENT_DATA_Tenent: any = [];
let ELEMENT_DATA_User: any = [];
@Component({
  selector: 'app-flex-user',
  templateUrl: './flex-user.component.html',
  styleUrls: ['./flex-user.component.scss'],
})
export class FlexUserComponent implements OnInit {
  // public data:any=[]
  showFiller = false;
  tenentList: any = [];
  tenentId: string = '';
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
  constructor(
    private serviceService: ServicesService,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private router: Router,
    private service: ServicesService,
    private toster: TosterService
  ) {}

  ngOnInit(): void {
    this.getTenentList();
    this.getUserList();
    this.formControl();
  }

  getUserList() {
    this.serviceService.getUserList().subscribe((result) => {
      this.dataSourceUser = result.data;
      console.log(this.dataSourceUser);
    });
  }

  ngAfterViewInit() {
    this.dataSourceUser.sort = this.sort;
    this.dataSourceUser.paginator = this.paginator;

    this.dataSourceTenant.sort = this.sort;
    this.dataSourceTenant.paginator = this.paginator;
  }

  applyUserFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceUser.filter = filterValue.trim().toLowerCase();
  }
  applyTenantFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceTenant.filter = filterValue.trim().toLowerCase();
  }
  blockUser(id, name) {
    const dialogRef = this.dialog.open(BlockTenentComponent, {
      height: '160px',
      width: '400px',
      data: { id: id, name: name },
    });
    dialogRef.afterClosed().subscribe(() => {
      this.ngOnInit();
    });
  }
  enableUser(elm) {
    alert('unblock ' + elm.name);
  }
  deleteUser(id, name) {
    const dialogRef = this.dialog.open(DeleteUserComponent, {
      height: '160px',
      width: '400px',
      data: { id: id, name: name },
    });
    dialogRef.afterClosed().subscribe(() => {
      this.ngOnInit();
    });
  }
  blockTenant(elm) {
    alert('block ' + elm.name);
  }
  enableTenant(elm) {
    alert('unblock ' + elm.name);
  }
  deleteTenant(elm) {
    console.log(elm);
    this.serviceService.deleteTenent(elm).subscribe((res) => {
      console.log(res);
      if (res.msg === 'success') {
        this.getTenentList();
      }
    });
  }

  formControl() {
    this.form = this.fb.group({
      type: new FormControl(''),
      email: new FormControl(''),
      name: new FormControl(''),
      access: new FormControl(''),
      tenent: new FormControl(''),
    });
  }
  getTenentList() {
    this.service.getTenentList().subscribe((res) => {
      // console.log(res);
      if (res.msg === 'success') {
        this.tenentList = res.data;
      }
    });
  }
  selectTenent(value: any) {
    this.tenentId = value;
  }
  onSave() {
    if (this.form.valid) {
      this.form.value.tenent = this.tenentId;
      this.service.userCreate(this.form.value).subscribe(
        (result) => {
          console.log(result);
          if (result.msg == 'success') {
            console.log(result);
            this.toster.openSnackBar('User Created Successfully', result.msg);
            this.ngOnInit();
          }
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }
  userNavigate() {
    setTimeout(() => {}, 200);
  }
}
