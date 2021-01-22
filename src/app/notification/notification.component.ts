import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSidenav } from '@angular/material/sidenav';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { ReportService } from '../service/report.service';
import { ServicesService } from '../service/services.service';
import { TosterService } from '../toster/toster.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
@ViewChild('rightDrawer', { static: false }) sideNav: MatSidenav;
  // public data:any=[]
  showFiller = false;
  tenentList: any = [];
  tenentId = '';
  detailsDetails:any = [];
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
  configureData: any  = {};
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
    this.getTenentList();
    this.formControl();
  }
  selectTenentList = (value: any) => {
    if(value ==='All'){
      this.form.reset();
    }else{
      console.log(value)
      this.tenentId = value;
      this.emailConfigure(this.tenentId)
    }
  }
   emailConfigure = (value: any) => {
    const id =value;
    this.report.getEmailConfiguration(id).subscribe((res)=>{
      console.log(res);
      if(res.msg === 'success'){
        this.configureData =res.data;
        this.populateConfigure();
      }
    },(error: any)=>{
      console.log(error);
    })
  }
  populateConfigure = () => {
    const configureData = this.configureData;
    this.form.patchValue({tenent:configureData?._id,serviceProvider:configureData?.emailServiceProvider,apiKey:configureData?.emailApiKey,domain:configureData?.domain})
  }
  selecetMailService = (value: any) => {
    console.log(value)
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

  clear = () => {
  }
  formControl = () => {
    this.form = this.fb.group({
      tenent: new FormControl('',[Validators.required,]),
      serviceProvider: new FormControl('',[Validators.required,]),
      apiKey: new FormControl('',[Validators.required,]),
      domain: new FormControl('',[Validators.required,]),
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
      const data ={
        Tenant_ID:this.tenetId,
        isBlocked:true
      }
      console.log(data)
      this.service.getTenentList(data).subscribe((res) => {
      // console.log(res);
      if (res.msg === 'success') {
        this.tenentList = res.data;
        this.tenentId = this.tenentList[0]._id;
        this.form.get('tenent').disable();
        this.emailConfigure(this.tenetId);
        this.form.patchValue({tenent: this.tenentId});
        console.log(res.data);
      }
    });
    }
  }
  selectTenent = (value: any) => {
    this.tenentId = value;
  }


  onSave = (form) => {
    console.log(form.value)
    const id = this.tenentId;
    const data = {
    emailServiceProvider: form.value.serviceProvider,
    apiKey: form.value.apiKey,
    domain:form.value.domain
    }
    console.log(id);
    console.log(data)
    this.report.emailConfiguration(id, data).subscribe((res) => {
      console.log(res)
      if(res.msg === 'success'){
        this.toster.openSnackBar('Successfully Configured Email', 'Success');
        this.form.reset();
        this.sideNav.close();
      }
    },(err: any) => {
      console.log(err)
    })
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
