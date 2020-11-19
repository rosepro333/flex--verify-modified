import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ServicesService } from "../service/services.service";

@Component({
  selector: "app-set-password",
  templateUrl: "./set-password.component.html",
  styleUrls: ["./set-password.component.scss"],
})
export class SetPasswordComponent implements OnInit {
  form: FormGroup;
  private formSubmitAttempt: boolean;

  constructor(
    private fb: FormBuilder,
    private service: ServicesService,
    private router: Router
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      password: ["", Validators.required],
      confirmpassword: ["", Validators.required],
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
      this.form.value;
      this.service.forgetPassword(this.form.value).subscribe(
        (result) => {
          console.log(result);
          if (result.msg === "success") {
          }
        },
        (error) => {
          console.error(error);
        }
      );
    } else {
    }
    this.formSubmitAttempt = true;
  }
  forgetPassword() {
    this.router.navigate(["/forget-passowrd"]);
  }
}
