import { Inject, Optional } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { ServicesService } from 'src/app/service/services.service';

@Component({
  selector: 'app-block-user',
  templateUrl: './block-user.component.html',
  styleUrls: ['./block-user.component.scss'],
})
export class BlockUserComponent implements OnInit {
  userId = '';
  userData: any = {};
  block: number;
  constructor(
    // private fb: FormBuilder,
    private router: Router,
    private service: ServicesService,
    private dialogRef: MatDialogRef<BlockUserComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    // console.log(data);
    this.userData = data.value;
    console.log(this.userData)
    this.userId = data.id;
  }

  ngOnInit(): void {}

  blockUser = () => {
    if(this.userData.status ==='suspended'){
      this.block = 0;
    }else{
      this.block = 1;
    }
    const id = this.userId;
    const data = {
      block:this.block
    }
    this.service.blockUser(id,data).subscribe((res) => {
      console.log(res);
      if (res.msg === 'success') {
        this.clear();
      }
    });
  }

  clear = () => {
    this.dialogRef.close();
  }
}
