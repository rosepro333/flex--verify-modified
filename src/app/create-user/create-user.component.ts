import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServicesService } from './../service/services.service';
import { Cookie } from 'ng2-cookies/ng2-cookies';
@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CreateUserComponent implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder, private router: Router , private service:ServicesService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      type: new FormControl(''),
      email: new FormControl(''),
      name: new FormControl(''),
      access: new FormControl(''),
      tenent: new FormControl(''),

    });
  }
  onSave(event: any) {
    console.log(event)
    if (event === 'user' && this.form.valid) {
      this.service.userCreate(this.form.value).subscribe((result) => {
          console.log(result)        
      }, error => {        
        console.error(error);
      })
    } else if (event === 'tenent' && this.form.valid) {
       this.service.createTenent(this.form.value).subscribe(result=>{
        console.log(result)        
      }, error => {        
        console.error(error);
      })
    }
    // if (this.form.valid) {
    //   console.log(this.form.value);
    //   

    // }
    // this.formSubmitAttempt = true;
  // }
  }
  clear() {
    this.router.navigate(['./organization']);
  }
}
