import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
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
    this.service.deleteUser(id).subscribe((res) => {
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
