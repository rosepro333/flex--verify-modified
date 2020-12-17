import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ServicesService } from 'src/app/service/services.service';

@Component({
  selector: 'app-delete-tenent',
  templateUrl: './delete-tenent.component.html',
  styleUrls: ['./delete-tenent.component.scss'],
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
  }

  clear = () => {
    this.dialogRef.close();
  }
}
