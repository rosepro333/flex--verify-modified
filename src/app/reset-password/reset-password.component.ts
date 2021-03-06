import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../auth/auth.service";

@Component({
  selector: "app-reset-password",
  templateUrl: "./reset-password.component.html",
  styleUrls: ["./reset-password.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class ResetPasswordComponent implements OnInit {
  form: FormGroup;
  private formSubmitAttempt: boolean;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      userName: ["", Validators.required],
      password: ["", Validators.required],
    });
  }

  isFieldInvalid(field: string) {
    return (
      (!this.form.get(field).valid && this.form.get(field).touched) ||
      (this.form.get(field).untouched && this.formSubmitAttempt)
    );
  }

  onSubmit() {
    this.router.navigate(["/new-password"]);
    // if (this.form.valid) {
    //   this.authService.login(this.form.value).subscribe(
    //     (result) => {
    //       if (result.msg === "success") {
    //       }
    //     },
    //     (error) => {
    //       console.error(error);
    //     }
    //   );
    // }
    // this.formSubmitAttempt = true;
  }
  forgetPassword() {}
}
