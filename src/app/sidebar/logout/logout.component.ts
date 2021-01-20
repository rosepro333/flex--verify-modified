import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { AuthService } from 'src/app/auth/auth.service';
import { CreateApiKayComponent } from 'src/app/dialog-box/create-api-kay/create-api-kay.component';
import { ServicesService } from 'src/app/service/services.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {
 form: FormGroup;
  tenentList: any = [];
  tenentId = '';
  tenetId = '';
  accessType = '';
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private service: ServicesService,
    private dialogRef: MatDialogRef<CreateApiKayComponent>,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {}
  clear = () => {
    this.dialogRef.close();
  }
  logout = () => {
    const close =this.dialogRef.close();
      setTimeout(()=>{
        this.authService.logout();
        this.router.navigate(['login']);
      },500)



  }
  audits = (data: any) => {
    this.service.audit(data).subscribe((res) => {
    console.log(res);
    }, (err) => {
      console.log(err);
    });
  }

}
