import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ServicesService } from '../service/services.service';
import { TosterService } from '../toster/toster.service';

@Component({
  selector: 'app-create-flex-user',
  templateUrl: './create-flex-user.component.html',
  styleUrls: ['./create-flex-user.component.scss'],
})
export class CreateFlexUserComponent implements OnInit {
  form: FormGroup;
  tenentList: any = [];
  tenentId = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private service: ServicesService,
    private toster: TosterService
  ) {}

  ngOnInit(): void {
    this.formControl();
    this.getTenentList();
  }
  formControl = () => {
    this.form = this.fb.group({
      type: new FormControl(''),
      email: new FormControl(''),
      name: new FormControl(''),
      access: new FormControl(''),
      tenent: new FormControl(''),
    });
  }
  getTenentList = () =>{
    const data = {
      "isBlocked":true
    }
    this.service.getTenentList(data).subscribe((res) => {
      // console.log(res);
      if (res.msg === 'success') {
        this.tenentList = res.data;
      }
    });
  }
  selectTenent = (value: any) => {
    this.tenentId = value;
  }
  onSave = () => {
    if (this.form.valid) {
      this.form.value.tenent = this.tenentId;
      this.service.userCreate(this.form.value).subscribe(
        (result) => {
          console.log(result);
          if (result.msg == 'success') {
            console.log(result);
            this.toster.openSnackBar('User Created Successfully', result.msg);
            this.userNavigate();
          }
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }
  userNavigate = () => {
    setTimeout(() => {
      this.router.navigateByUrl('/flexm-user');
    }, 200);
  }

  clear = () => {
    this.router.navigate(['./flexm-user']);
  }
}
