import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { AuthService } from '../auth/auth.service';
import { ServicesService } from '../service/services.service';
import { TosterService } from '../toster/toster.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss'],
})
export class ForgetPasswordComponent implements OnInit {
  form: FormGroup;
  private formSubmitAttempt: boolean;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private service: ServicesService,
    private toast: TosterService
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      userName: ['', Validators.required],
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
      this.service.forgetPassword(this.form.value).subscribe(
        (result) => {
          console.log(result);
          if (result.msg === 'success') {
            this.toast.openSnackBar(
              'Successfully sent mail to your Gmail Account',
              'success'
            );
          }
        },
        (error) => {
          console.log(error);
          console.error(error);
        }
      );
    }
    // this.formSubmitAttempt = true;
  }
  forgetPassword() {}
}
