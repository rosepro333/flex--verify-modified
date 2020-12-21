import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { ServicesService } from 'src/app/service/services.service';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.scss'],
})
export class DeleteUserComponent implements OnInit {
  userId = '';
  name = '';
  constructor(
    // private fb: FormBuilder,
    private router: Router,
    private service: ServicesService,
    private dialogRef: MatDialogRef<DeleteUserComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    console.log(data);
    this.name = data.name;
    this.userId = data.id;
  }

  ngOnInit(): void {}

  deleteTenent = () => {
    const id = this.userId;
    const datas = {
      user: Cookie.get('id'),
      tenentId: Cookie.get('Tenant_ID'),
      activity: 'Delete User',
      details: JSON.stringify({'Delete User': id })
      };
    console.log('122');
    this.audits(datas);
    this.service.deleteUser(id).subscribe((res) => {
      console.log(res);
      if (res.msg === 'success') {
        console.log('122');
        this.clear();
      }
    });

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
