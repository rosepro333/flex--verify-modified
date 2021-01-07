import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ServicesService } from 'src/app/service/services.service';

@Component({
  selector: 'app-block-tenent',
  templateUrl: './block-tenent.component.html',
  styleUrls: ['./block-tenent.component.scss'],
})
export class BlockTenentComponent implements OnInit {
  tenentId: string = '';
  tenentData: any = {};
  block: number;
  constructor(
    // private fb: FormBuilder,
    private router: Router,
    private service: ServicesService,
    private dialogRef: MatDialogRef<BlockTenentComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    console.log(data);
    this.tenentData = data.value;
    this.tenentId = data.id;
  }

  ngOnInit(): void {}

  blockTenent = () => {
    const id = this.tenentId;
    if(this.tenentData.status ==='suspended'){
      this.block = 0;
    }else{
      this.block = 1;
    }
    const data = {
      block:this.block
    }
    this.service.blockTenent(id,data).subscribe((res) => {
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
