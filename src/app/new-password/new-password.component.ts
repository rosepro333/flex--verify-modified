import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { ServicesService } from '../service/services.service';
import { TosterService } from '../toster/toster.service';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.scss'],
})
export class NewPasswordComponent implements OnInit {
  form: FormGroup;
  id = '';
  private formSubmitAttempt: boolean;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private toast: TosterService,
    private service: ServicesService
  ) {}

  ngOnInit = () => {
    // tslint:disable-next-line:no-string-literal
    this.id = this.route.snapshot.params['resetUser'];
    console.log(this.id);
    this.form = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
  }

  isFieldInvalid = (field: string) => {
    return (
      (!this.form.get(field).valid && this.form.get(field).touched) ||
      (this.form.get(field).untouched && this.formSubmitAttempt)
    );
  }

  onSubmit = () => {
    this.form.value.id = this.id;
    if (this.form.valid) {
      if (this.form.value.newPassword === this.form.value.confirmPassword) {
        console.log(this.form.value);
        this.service.resetPassword(this.form.value).subscribe(
          (result) => {
            console.log(result);
            if (result.msg === 'success') {
              this.toast.openSnackBar(
                'Successfuly Reset Your password',
                'Success'
              );
              this.router.navigate(['/login']);
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
    this.formSubmitAttempt = true;
  }
  forgetPassword = () => {};
}
