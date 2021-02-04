import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSidenav } from '@angular/material/sidenav';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { ReportService } from '../service/report.service';
import { ServicesService } from '../service/services.service';
import { TosterService } from '../toster/toster.service';

const ELEMENT_DATA_User: any = [];
@Component({
  selector: 'app-web-hook',
  templateUrl: './web-hook.component.html',
  styleUrls: ['./web-hook.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class WebHookComponent implements OnInit {
@ViewChild('rightDrawer', { static: false }) sideNav: MatSidenav;
  // public data:any=[]
  showFiller = false;
  tenentList: any = [];
  tenentId = '';
  @ViewChild(MatSort) sort: MatSort;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  pageSizeOptions = [10, 25, 50, 100];
  pageSize = 10;
  totalSize = 0;
  page = 0;
  currentPage = 1;
  search = '';
  role:any = [{name:'All',value:'All'},{name:'Flex Admin',value:'1'},{name:'Flex Operator',value:'2'},{name:'Tenent Admin',value:'3'},{name:'Tenent Operator',value:'4'}]
  displayedColumns: string[] = [
    'Tenant',
    'URL',
    'Secret Key',
    'Secret Value',
    'Actions',
  ];
    userList: any = [{name: 'All', value: 'All'},
  {name: 'invitation sent', value: 'invitation sent'},
  {name: 'Invitation Accepted', value: 'Invitation Accepted'},
  {name: 'Created', value: 'created'},
  {name: 'Created', value: 'created'},
  {name: 'Active', value: 'active'},
  {name: 'Suspended', value: 'suspended'}];
  detailsDetails: any = [];
  dataSource: any = []
  form: FormGroup;
  accessType = '';
  tenetId = '';
  userId = '';
  isOPen = false;
  isWebhook: boolean;
  isUserDetails: boolean;
  tenentUser = 'All';
  selectedRole = 'All';
   status = '';
  userEdit: any = [];
  isTenent = false;
  clickAble: boolean =true;
  isResend: boolean = true;
  selectedID:string = '';
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
    this.userId = Cookie.get('id');
    this.getTenentList();
    this.webhookList();
    this.formControl();
  }
  selectTenentUser = (value: any) => {
    this.search = '';
     console.log(value)
     this.tenentUser = value;
     this.webhookList();
  }

  mouseOver =() =>{
    this.clickAble =false;
  }
  mouseOut = () =>{
    this.clickAble =true;
  }
  webhookList = () => {
      const data ={
          pageNo:"",
          limit:"",
          order:"",
          startDate:"",
          endDate:"",
          tenentId:this.tenentUser,
          status:""
      }
      this.report.webhookList(data).subscribe((result) => {
        if (result.msg === 'success') {
          console.log(result)
          this.totalSize = result.length;
          if(result.data!=null) {
            this.dataSource = result.data;
          }else{
            this.dataSource = null;
          }

          // console.log(this.dataSourceUser)
          // this.clear();
        }

        console.log(result.msg === 'success');
      },(error: any)=>{
        console.log(error)
      });
  }
  clear = () => {
    this.search = '';
  }
  applyUserFilter = () => {
    console.log(this.search)
    this.webhookList();
  }
  applyTenantFilter = ( event: Event) => {
  }
  handlePage(value: any) {
    this.pageSize = value.pageSize;
    this.currentPage = value.pageIndex + 1;
    this.webhookList();
  }
  blockUser = (value: any,id: any)=> {
    // if (id !== this.userId) {
    //   const dialogRef = this.dialog.open(BlockUserComponent, {
    //     height: '160px',
    //     width: '400px',
    //     data: { id, value },
    //   });
    //   dialogRef.afterClosed().subscribe(() => {
    //     this.getUserList();
    //     this.sideNav.close();
    //     // this.ngOnInit();
    //   });
    // } else {
    //   this.toster.openSnackBar('You can not block ownself', 'failed');
    // }
  }
  enableUser = (elm): any => {
    alert('unblock ' + elm.name);
  }
  deleteUser = (name: any,id: any) => {
    // if (id !== this.userId) {
    //   const dialogRef = this.dialog.open(DeleteUserComponent, {
    //     height: '160px',
    //     width: '400px',
    //     data: { id, name },
    //   });
    //   dialogRef.afterClosed().subscribe(() => {
    //     this.getUserList();
    //     this.sideNav.close();
    //     // this.ngOnInit();
    //   });
    // } else {
    //   this.toster.openSnackBar('You can not delete ownself', 'failed');
    // }
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
      tenentId: new FormControl('',),
      url: new FormControl(null, [Validators.required,]),
      secrectKey: new FormControl(null, [Validators.required, Validators.min(2)]),
      secretValue: new FormControl(null, [Validators.required, Validators.min(1)]),
      tenent: new FormControl(''),
    });
  }
  getTenentList = () => {
    if (this.accessType === '1') {
      const data = {
        "isBlocked":true
      }
      this.service.getTenentList(data).subscribe((res) => {
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
          console.log(tenetId)
          this.form.patchValue({tenent: this.tenetId});
          console.log(this.tenentList[0].Tenant_ID);
        }
      });
    }
  }
  selectTenent = (value: any) => {
     this.tenentId = value;
     console.log(value);
  }
  webhookStatus = (id:any,value:any) => {
   var status =''
    console.log(value.checked)
    const checkedStatus = value.checked;
    if(checkedStatus ===true){
       status = 'active';
    }else if(checkedStatus ===false){
      status = 'inactive';
    }
    const data ={
      status:status
    }
    console.log(data)
    this.updateWebhook(id,data);
  }
  editWebhook = () => {
    const id = this.userEdit._id;
    const tenentId = this.form.get('tenentId').value;
    const url = this.form.get('url').value;
    const secrectKey = this.form.get('secrectKey').value;
    const secretValue = this.form.get('secretValue').value;
    const data = {
      url:url,
      secrectKey:secrectKey,
      secretValue:secretValue,
      tenentId:tenentId
    }
    this.updateWebhook(id,data);
  }
  updateWebhook = (id:any,data:any) =>{
    this.report.webhookUpdate(id,data).subscribe((res)=>{
      console.log(res);
      if(res.msg === 'success'){
        this.sideNav.close();
        this.webhookList();
        this.toster.openSnackBar('Successfully Updated', res.msg);
      }
    },(err) => {
      console.log(err);
       this.toster.openSnackBar(err.error, 'failed');
    })
  }
  onSave = () => {
    console.log(this.form.value)
      const data = {
        tenentId: this.form.value.tenentId,
        secrectKey: this.form.value.secrectKey,
        secretValue: this.form.value.secretValue,
        url: this.form.value.url,
      };
      console.log(data);
      this.report.createWebhook(data).subscribe(
        (result) => {
          console.log(result);
          if (result.msg === 'success') {
            console.log(result);
            this.webhookList();
            this.sideNav.close();
          }else if(result.msg === 'failure'){
             this.toster.openSnackBar(result.error, 'failed');
          }
        },
        (error: any) => {
          console.log(error);
        }
      );
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
    if(this.clickAble === true){
      if (a == 'create-user') {
      if(data === null){
        this.userEdit = '';
        this.form.reset();
        // this.form.get('email').enable();
        // this.form.get('access').enable();
        // this.form.get('tenent').enable();
      }else if(data){
        console.log(data)
        this.userEdit = data;
        // tenentId: this.form.value.tenentId,
        this.form.patchValue({tenentId: this.userEdit?.tenentId?._id,secrectKey: this.userEdit?.secrectKey,secretValue: this.userEdit?.secretValue,url: this.userEdit?.url})
        // console.log(data);
        // this.form.get('email').disable();
        // this.form.get('access').disable();
        // this.form.get('tenent').disable();
      }
        this.isWebhook = true;
        this.isUserDetails = false;

      } else if (a == 'webhook-details') {
        this.detailsDetails = data;
        console.log(this.detailsDetails);
        this.isWebhook = false;
        this.isUserDetails = true;
      }
      else {
        console.log('3')
        this.isWebhook = false;
        this.isUserDetails = false;
      }
    }

    // console.log(id);
  }
}
