import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicesService } from '../service/services.service';
import { TosterService } from '../toster/toster.service';

@Component({
  selector: 'app-set-password',
  templateUrl: './set-password.component.html',
  styleUrls: ['./set-password.component.scss'],
})
export class SetPasswordComponent implements OnInit {
  form: FormGroup;
  private formSubmitAttempt: boolean;
  id: string = '';
  constructor(
    private fb: FormBuilder,
    private service: ServicesService,
    private router: Router,
    private route: ActivatedRoute,
    private toast: TosterService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.params['forgetPasswordId'];
    console.log(id);
    this.id = id;
    this.form = this.fb.group({
      password: ['', Validators.required],
      confirmpassword: ['', Validators.required],
    });
  }

  isFieldInvalid(field: string) {
    return (
      (!this.form.get(field).valid && this.form.get(field).touched) ||
      (this.form.get(field).untouched && this.formSubmitAttempt)
    );
  }

  onSubmit() {
    // this.router.navigate(["/login"]);
    if (
      this.form.valid &&
      this.form.value.password === this.form.value.confirmpassword
    ) {
      this.form.value.id = this.id;
      console.log(this.form.value);
      this.service.setForgetPassword(this.form.value).subscribe(
        (result) => {
          console.log(result);
          if (result.msg === 'success') {
            this.toast.openSnackBar(
              'Successfully change your password',
              'Success'
            );
            this.router.navigate(['/login']);
          }
        },
        (error) => {
          console.error(error);
        }
      );
    } else {
      this.toast.openSnackBar(
        'Password not Matching',
        'Please enter correct password'
      );
    }
    this.formSubmitAttempt = true;
  }
  forgetPassword() {
    this.router.navigate(['/forget-passowrd']);
  }
}
