import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
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
@ViewChild('rightDrawer', { static: false }) sideNav: MatSidenav;
  // public data:any=[]
  showFiller = false;
  tenentList: any = [];
  tenentId = '';
  @ViewChild(MatSort) sort: MatSort;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  pageSizeOptions = [2, 25, 50, 100];
  pageSize = 10;
  totalSize = 0;
  currentPage = 1;
  search = '';
  role:any = [{name:'All',value:'All'},{name:'Flex Admin',value:'1'},{name:'Flex Operator',value:'2'},{name:'Tenent Admin',value:'3'},{name:'Tenent Operator',value:'4'}]
  displayedColumns: string[] = [
    'name',
    // 'email',
    'accessType',
    'owner',
    'status',
    'createdAt',
    // 'actions',
  ];
  detailsDetails: any = [];
  dataSourceUser = new MatTableDataSource(ELEMENT_DATA_User);
  dataSourceTenant = new MatTableDataSource(ELEMENT_DATA_Tenent);
  form: FormGroup;
  accessType = '';
  tenetId = '';
  userId = '';
  isOPen = false;
  isCreateUser: boolean;
  isUserDetails: boolean;
  tenentUser = 'All';
  selectedRole = 'All';
  userEdit: any = [];
  isTenent = false;
  constructor(
    private serviceService: ServicesService,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private router: Router,
    private service: ServicesService,
    private toster: TosterService,
  ) { }

  ngOnInit(): void {
    this.accessType = Cookie.get('Access_Type');
    this.tenetId = Cookie.get('Tenant_ID');
    this.userId = Cookie.get('id');
    this.getTenentList();
    this.getUserList();
    this.formControl();
  }
  selectTenentUser = (value: any) => {
     console.log(value)
     this.tenentUser = value;
     this.getUserList();
  }
  selectRole = (value: any) => {
    console.log(value)
    this.selectedRole = value;
    this.getUserList();
  }
  roleSelect = (value: any) => {
    if(value <= 2){
      this.isTenent = false;
      //  console.log(value);
    }else{
      this.isTenent = true;
       console.log(value);
    }
  }
  getUserList = () => {
    if (this.accessType === '1') {
        const data = {
        "Tenant_ID": this.tenentUser,
        "limit": this.pageSize,
        "pageNo": "1",
        "order": "-1",
        "search": this.search,
        "startDate": "",
        "endDate": "",
        "status": "",
        "role": this.selectedRole
      }
      this.serviceService.getUserList(data).subscribe((result) => {
        if (result.msg === 'success') {
          this.totalSize = result.length;
          this.dataSourceUser = result.data;
          console.log(this.dataSourceUser)
          // this.clear();
        }

        console.log(result.msg === 'success');
      });
    } else if (this.accessType === '3') {
       const data = {
        "Tenant_ID": this.tenetId,
        "limit": this.pageSize,
        "pageNo": "1",
        "order": "-1",
        "search": this.search,
        "startDate": "",
        "endDate": "",
        "status": "",
        "role": this.selectedRole
      }
      const tenetId = this.tenetId;
      console.log('tenent' + tenetId);
      this.service.getUserList(data).subscribe((res) => {
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
  clear = () => {
    this.search = '';
  }
  applyUserFilter = () => {
    console.log(this.search)
    this.getUserList();
    // const filterValue = (event.target as HTMLInputElement).value;
    // this.dataSourceUser.filter = filterValue.trim().toLowerCase();
  }
  applyTenantFilter = ( event: Event) => {
    // const filterValue = (event.target as HTMLInputElement).value;
    // this.dataSourceTenant.filter = filterValue.trim().toLowerCase();
  }
  handlePage(value: any) {
    console.log(value);
    if (value.pageIndex) {
      console.log(value.pageIndex)
      const pageIndex = (value.pageIndex === 0) ? 1 : value.pageIndex;
      this.currentPage = pageIndex;
      console.log(this.currentPage);
      // this.getTenentList();
      // }

    }
    if (value.pageSize) {
      console.log(value.pageSize)
      this.pageSize = value.pageSize;
      const pageIndex = (value.pageIndex === 0) ? 1 : value.pageIndex;
      this.currentPage = pageIndex;
      this.getTenentList();
    }
    // console.log(value.pageSize)

    // this.currentPage = value.pageIndex;

  }
  blockUser = (name: any,id: any)=> {
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
  deleteUser = (name: any,id: any) => {
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
  blockTenant = (elm: any) => {
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
      type: new FormControl('',),
      email: new FormControl(''),
      name: new FormControl(''),
      access: new FormControl(''),
      tenent: new FormControl(''),
    });
  }
  getTenentList = () => {
    if (this.accessType === '1') {
      const data = {
        "Tenant_ID": "",
        "limit": 10,
        "pageNo": 1,
        "order": "-1",
        "search": "",
        "startDate": "",
        "endDate": "",
        "status": ""
      }
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
            console.log(this.tenentList)
          })
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
  editUser = () => {
    const id = this.userEdit._id;
    console.log(id);
    const name = this.form.get('name').value;
    console.log(name)
    const data = {
      Contact_Name: name
    }
    this.service.updateUser(id,data).subscribe((res)=>{
      console.log(res);
      if(res.msg === 'success'){
        this.sideNav.close();
        this.getUserList();
        this.toster.openSnackBar('Successfully Updated', res.msg);
      }
    },(err) => {
      console.log(err);
       this.toster.openSnackBar(err.error, 'failed');
    })
  }
  onSave = () => {
    if (this.form.valid) {
      console.log(this.form.value)
      this.form.value.tenent = this.tenentId;
      this.service.userCreate(this.form.value).subscribe(
        (result) => {
          console.log(result);
          if (result.msg === 'success') {
            console.log(result);
            this.sideNav.close();
            const data = {
              user: Cookie.get('id'),
              tenentId: Cookie.get('Tenant_ID'),
              activity: 'Create User',
              details: JSON.stringify({ id: result.docs._id, name: result.docs.Contact_Name, tenentId: result.docs.Tenant_ID })
            };
            this.audits(data);
            this.toster.openSnackBar('User Created Successfully', result.msg);
            this.getUserList();
            const data1 ={
              "fromUser":this.userId,
              "tenentId":this.tenentId,
              "recipientEmail":this.form.value.email,
              "user":"user",
              "type":"User Invitation",
              "data":JSON.stringify({UserId: result.docs._id, name: result.docs.Contact_Name, tenentId: result.docs.Tenant_ID})
            }
            this.serviceService.sendEmail(data1).subscribe((res) =>{
              console.log(res)
            },(err) =>{
              console.log(err);
            })
          }else if(result.msg === 'failure'){
             this.toster.openSnackBar(result.error, 'failed');
          }


        },
        (error: any) => {
          console.log(error);
        }
      );
    }
  }
  userNavigate = () => {
    setTimeout(() => { }, 200);
  }
  audits = (data: any) => {
    this.service.audit(data).subscribe((res) => {
      console.log(res);
    }, (error: any) => {
      console.log(error);
    });
  }
  clicked(a, data) {
    console.log(a,data);
    if (a == 'create-user') {
      if(data === null){
        this.userEdit = '';
        this.form.reset();
        this.form.get('email').enable();
        this.form.get('access').enable();
        this.form.get('tenent').enable();
      }else if(data){
        this.userEdit = data;
        this.form.patchValue({name: this.userEdit.Contact_Name,email: this.userEdit.Contact_Email,access: this.userEdit.Access_Type,tenent: this.userEdit.Tenant_ID._id})
        console.log(data);
        this.form.get('email').disable();
        this.form.get('access').disable();
        this.form.get('tenent').disable();
      }
        this.isCreateUser = true;
        this.isUserDetails = false;

    } else if (a == 'user-details') {
      this.detailsDetails = data;
      console.log(this.detailsDetails);
      this.isCreateUser = false;
      this.isUserDetails = true;
    }
    else {
      console.log('3')
      this.isCreateUser = false;
      this.isUserDetails = false;
    }
    // console.log(id);
  }
}
