import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { ServicesService } from 'src/app/service/services.service';

@Component({
  selector: 'app-create-api-kay',
  templateUrl: './create-api-kay.component.html',
  styleUrls: ['./create-api-kay.component.scss'],
})
export class CreateApiKayComponent implements OnInit {
  form: FormGroup;
  tenentList: any = [];
  tenentId = '';
  tenetId = '';
  accessType = '';
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private service: ServicesService,
    private dialogRef: MatDialogRef<CreateApiKayComponent>
  ) {}

   ngOnInit(): void {
    this.accessType = Cookie.get('Access_Type');
    this.tenetId = Cookie.get('Tenant_ID');
    this.formControl();
     this.getTenentList();

  }
  formControl = () => {

    this.form = this.fb.group({
      Tenent: new FormControl(''),
      mode: new FormControl(''),
    });
  }

  getTenentList = () => {
    if (this.accessType === '1' || this.accessType === '2') {
      const data ={
        "isBlocked":true
      };
      this.service.getTenentList(data).subscribe((res) => {
        console.log(res);
        if (res.msg === 'success') {
          this.tenentList = res.data;
        }
      });
    } else if (this.accessType === '3' || this.accessType === '4') {
      const data ={
        Tenant_ID:this.tenetId,
        isBlocked:true
      }
      console.log(data)
      this.service.getTenentList(data).subscribe((res) => {
      // console.log(res);
      if (res.msg === 'success') {
        this.tenentList = res.data;
        this.tenentId =this.tenentList[0]._id;
        this.form.get('Tenent').disable();
        this.form.patchValue({Tenent: this.tenentId});
        console.log(res.data);
      }
    });
    }
  }
  selectTenent = (value: any) => {
    this.tenentId = value;
  }
  onSave =  (event: any) => {
    this.form.value.Tenent = this.tenentId;
    if (this.form.valid) {
      const apiKeyData = {
        Tenent_ID: this.form.value.Tenent,
        Mode: this.form.value.mode
      };
      this.service.createApiKey(apiKeyData).subscribe(
        (result) => {
          console.log(result);
          if (result.msg === 'success') {
            setTimeout(() => {
              this.clear();
            });
            const datas = {
            user: Cookie.get('id'),
            tenentId: Cookie.get('Tenant_ID'),
            activity: 'Create API Key',
            details: JSON.stringify({api_key_id: result.data.Api_Key , tenant_id: result.data.Tenent_ID })
            };
            this.audits(datas);
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
  audits = (data: any) => {
    this.service.audit(data).subscribe((res) => {
    console.log(res);
    }, (err) => {
      console.log(err);
    });
  }
}
