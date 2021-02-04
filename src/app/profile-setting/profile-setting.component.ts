import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSidenav } from '@angular/material/sidenav';
import * as moment from 'moment';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { RoleNamePipe } from '../pipe/role-name.pipe';
import { ServicesService } from '../service/services.service';
import { TosterService } from '../toster/toster.service';

@Component({
  selector: 'app-profile-setting',
  templateUrl: './profile-setting.component.html',
  styleUrls: ['./profile-setting.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class ProfileSettingComponent implements OnInit {
  @ViewChild('rightDrawer', { static: false }) sideNav: MatSidenav;
  tabView: any = ['Display Profile','Change Password',]
  selectedItem = 'Display Profile';
  form: FormGroup;
  form1: FormGroup;
  data: any =[];
  id: string= '';
  constructor(
      private fb: FormBuilder,
      private service: ServicesService,
      private toast: TosterService
  ) { }

  ngOnInit(): void {
    this.formControl();
    this.formControl1();
    this.profileDetails();
  }
  profileDetails = () => {
    this.service.userDetails().subscribe((res)=>{
      if(res.apires === 1){
        this.data = res.data;
        console.log(res.data)
        this.updateData();
      }
    },(error: any)=>{
      console.log(error);
    })
  }
  updateData = () => {

    const data = this.data;
    // const lastLogin = moment(data?.lastLogin).format('DD-MM-YYYY,HH:MM:SS');
    const lastLogin = moment(data?.lastLogin).format('DD-MM-YYYY');
    // const createdAt = moment(data?.userDetails?.createdAt).format('DD-MM-YYYY,HH:MM:SS');
    const createdAt = moment(data?.userDetails?.createdAt).format('DD-MM-YYYY');
    console.log(createdAt)
    const role = data?.userDetails?.Access_Type
    console.log(role);
    const findRole = this.service.roleFilter(role);
    // this.form.get('Contact_Email').disable();
    // this.form.get('Contact_Name').disable();
    // this.form.get('Tenant_ID').disable();
    // this.form.get('Access_Type').disable();
    // this.form.get('createdAt').disable();
    // this.form.get('lastLogin').disable();
    this.form.patchValue({Contact_Email:data?.userDetails?.Contact_Email,Contact_Name:data?.userDetails?.Contact_Name,Tenant_ID:data?.userDetails?.Tenant_ID?.Contact_Name,Access_Type:findRole,createdAt:createdAt,lastLogin:lastLogin});
  }
  formControl = () => {
    this.form = this.fb.group({
      Contact_Email: new FormControl(''),
      Contact_Name: new FormControl(''),
      Tenant_ID: new FormControl(''),
      Access_Type: new FormControl(''),
      createdAt: new FormControl(''),
      lastLogin: new FormControl(''),
      expireDate: new FormControl(''),

    });
  }
  formControl1 = () => {
    this.form1 = this.fb.group({
      currentPassword: new FormControl(''),
      newPassword: new FormControl(''),
      confirmPassword: new FormControl(''),
    });
  }
  selecteItem(value: any){
    this.selectedItem = value;
  }
  userTOken = () =>{
    const data ={
      id:this.data.userDetails._id
    }
    this.service.userForChangePassword(data).subscribe((res)=>{
      if(res.msg === 'success'){
        this.id =res.data
        // this.router.navigateByUrl('/resetPassword/'+ res.data)
      }
    },(error: any) => {
      console.log(error);
    })
  }
   onSubmit = async () => {
    this.form1.value.id = this.id;
    console.log(this.form1)
    if (this.form1.valid) {
      if (this.form1.value.newPassword === this.form1.value.confirmPassword) {
        const data = {
        id:this.form1.value.id,
        password: this.form1.value.currentPassword,
        newpassword: this.form1.value.newPassword,
      };
        this.service.resetPassword(data).subscribe(
          (result) => {
            if (result.msg === 'success' && result.apires ===1) {
              this.form1.reset();
              this.sideNav.close()
              this.toast.openSnackBar(
                'Successfuly Changed Your password',
                'Success'
              );
              // this.router.navigate(['/login']);
            } else {
              this.toast.openSnackBar('', result.msg);
            }
          },
          (error) => {
            console.error(error);
          }
        );
      } else {
        this.toast.openSnackBar('new password is not matching', 'failed');
      }
    }
  }
}
