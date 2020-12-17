import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ServicesService } from 'src/app/service/services.service';

@Component({
  selector: 'app-create-sdy-key',
  templateUrl: './create-sdy-key.component.html',
  styleUrls: ['./create-sdy-key.component.scss'],
})
export class CreateSdyKeyComponent implements OnInit {
  form: FormGroup;
  tenentList: any = [];
  tenentId = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private service: ServicesService,
    private dialogRef: MatDialogRef<CreateSdyKeyComponent>
  ) {}

  ngOnInit(): void {
    this.formControl();
    this.getTenentList();
  }
  formControl = () => {
    this.form = this.fb.group({
      Tenent: new FormControl(''),
      mode: new FormControl(''),
    });
  }
  getTenentList = () =>{
    this.service.getTenentList().subscribe((res) => {
      // console.log(res);
      if (res.msg === 'success') {
        this.tenentList = res.data;
      }
    });
  }
  selectTenent = (value: any) => {
    this.tenentId = value;
  }
  onSave =  (event: any) => {
    console.log(event);
    this.form.value.Tenent = this.tenentId;
    if (this.form.valid) {
      this.service.createSdkKey(this.form.value).subscribe(
        (result) => {
          console.log(result);
          if (result.msg === 'success') {
            setTimeout(() => {
              this.clear();
            });
          }
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }
  clear = () => {
    this.dialogRef.close();
  }
}
