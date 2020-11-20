import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "../auth/auth.service";

@Component({
  selector: "app-new-password",
  templateUrl: "./new-password.component.html",
  styleUrls: ["./new-password.component.scss"],
})
export class NewPasswordComponent implements OnInit {
  form: FormGroup;
  private formSubmitAttempt: boolean;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.params["resetUser"];
    console.log(id);
    this.form = this.fb.group({
      currentPassword: ["", Validators.required],
      newPassword: ["", Validators.required],
      confirmPassword: ["", Validators.required],
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
    if (this.form.valid) {
      if (this.form.value.newPassword === this.form.value.newPassword) {
        console.log("correct password");
        // this.authService.login(this.form.value).subscribe(
        //   (result) => {
        //     if (result.msg === "success") {
        //     }
        //   },
        //   (error) => {
        //     console.error(error);
        //   }
        // );
      } else {
      }
    }
    this.formSubmitAttempt = true;
  }
  forgetPassword() {}
}
