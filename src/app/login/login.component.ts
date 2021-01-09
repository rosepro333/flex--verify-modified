import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { DeviceDetectorService } from 'ngx-device-detector';
import { audit } from 'rxjs/operators';
import { ServicesService } from '../service/services.service';
import { TosterService } from '../toster/toster.service';
import { AuthService } from './../auth/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  private formSubmitAttempt: boolean;
  deviceInfo: any = [];
  encryptSecretKey ='vuobnvlkdjvndvjkfnkjdlvndskvlnhuisdvbdslvbdslvbdsvdbuvdvhfvjjvbfjvbf';
  hide = true;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toast: TosterService,
    private deviceService: DeviceDetectorService,
    private service: ServicesService
  ) {}

  // tslint:disable-next-line:typedef
  ngOnInit() {
    this.form = this.fb.group({
      userName: [null, [Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      password: ['', Validators.required],
      rememberMe:[false]
    });
    this.rememberMe();
  }
  rememberMe() {
    const flex_verify = localStorage.getItem('flex_verify')
    const flex = CryptoJS.AES.decrypt(flex_verify, this.encryptSecretKey).toString(CryptoJS.enc.Utf8);
    console.log(JSON.parse(flex));
    const loginData = JSON.parse(flex);
    if(loginData.rememberMe === true){
      this.form.patchValue({userName:loginData.userName,password:loginData.password,rememberMe:loginData.rememberMe})
    }else{
      this.form.patchValue({userName:'',password:'',rememberMe:false});
    }
  }

  // tslint:disable-next-line:typedef
  isFieldInvalid(field: string) {
    return (
      (!this.form.get(field).valid && this.form.get(field).touched) ||
      (this.form.get(field).untouched && this.formSubmitAttempt)
    );
  }

  onSubmit = () => {
    if (this.form.valid) {
      this.authService.login(this.form.value).subscribe(
        (result) => {
        this.deviceDetection();
        console.log(result);
        if (result.msg === 'success') {
            // this.loggedIn.next(true);
            console.log('1');
            console.log(result);
            Cookie.set('Tenant_ID', result.user.Tenant_ID);
            Cookie.set('id', result.user.ID);
            Cookie.set('apires', result.apires);
            Cookie.set('data', result.data);
            Cookie.set('LOGIN_STATUS', result.msg);
            Cookie.set('Access_Type', result.user.Access_Type);
            this.setRememberMe();
            const data = {
              user: result.user.ID,
              tenentId: result.user.Tenant_ID,
              activity: 'Login',
              details: ''
            };
            this.audits(data);
            this.router.navigate(['/']);
          } else {
            this.toast.openSnackBar('', result.msg);
          }
        },
        (error) => {
          console.error(error);
        }
      );
    }
    this.formSubmitAttempt = true;
  }
  setRememberMe = () => {
    console.log(this.form.value)
    if(this.form.value.rememberMe === true){

      const flex = CryptoJS.AES.encrypt(JSON.stringify(this.form.value), this.encryptSecretKey).toString();
      localStorage.setItem('flex_verify',flex);
    }else if(this.form.value.rememberMe === false){
      localStorage.removeItem('flex_verify');
    }
  }
  audits = (data: any) => {
    this.service.audit(data).subscribe((res) => {
    console.log(res);
    });
  }
  forgetPassword = () => {
    this.router.navigate(['/forget-passowrd']);
  }
  deviceDetection = () => {
      console.log('hello `Home` component');
      this.deviceInfo = this.deviceService.getDeviceInfo();
      console.log(this.deviceInfo.browser);
      console.log(this.deviceInfo.browser_version);
      console.log(this.deviceInfo.deviceType);
      console.log(this.deviceInfo.os);
      console.log(this.deviceInfo.os_version);
      const  data = {
        browser: this.deviceInfo.browser,
        browser_version: this.deviceInfo.browser_version,
        deviceType: this.deviceInfo.deviceType,
        os: this.deviceInfo.os,
        os_version: this.deviceInfo.os_version,
      };
      Cookie.set('user-device', JSON.stringify(data));
      console.log(Cookie.get('user-device'));
    }
}
