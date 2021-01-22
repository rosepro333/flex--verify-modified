import { Component, Inject, OnInit, Optional, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { ServicesService } from 'src/app/service/services.service';

@Component({
  selector: 'app-delete-tenent',
  templateUrl: './delete-tenent.component.html',
  styleUrls: ['./delete-tenent.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DeleteTenentComponent implements OnInit {
  tenentId = '';
  name = '';
  constructor(
    // private fb: FormBuilder,
    private router: Router,
    private service: ServicesService,
    private dialogRef: MatDialogRef<DeleteTenentComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    console.log(data);
    this.name = data.name;
    this.tenentId = data.id;
  }

  ngOnInit(): void {}

  deleteTenent = () => {
    const id = this.tenentId;
    this.service.deleteTenent(id).subscribe((res) => {
      console.log(res);
      if (res.msg === 'success') {
        this.clear();
      }
    });
    const datas = {
      user: Cookie.get('id'),
      tenentId: Cookie.get('Tenant_ID'),
      activity: 'Delete Tenant',
      details: JSON.stringify({tenentId: id })
      };
    this.audits(datas);
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
