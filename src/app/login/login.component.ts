import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Cookie } from 'ng2-cookies/ng2-cookies';
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

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toast: TosterService
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  isFieldInvalid(field: string) {
    return (
      (!this.form.get(field).valid && this.form.get(field).touched) ||
      (this.form.get(field).untouched && this.formSubmitAttempt)
    );
  }

  onSubmit() {
    if (this.form.valid) {
      this.authService.login(this.form.value).subscribe(
        (result) => {
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
  forgetPassword() {
    this.router.navigate(['/forget-passowrd']);
  }
}
