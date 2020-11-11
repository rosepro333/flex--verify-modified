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
  onSave() {
    if (this.form.valid) {
      console.log(this.form.value);
      this.service.createTenant(this.form.value).subscribe(result=>{
        console.log(result)
        console.log(Cookie.get('data'))
      }, error => {        
        console.error(error);
      })

    }
    // this.formSubmitAttempt = true;
  // }
    alert('saved')
  }
  clear() {
    this.router.navigate(['./organization']);
  }
}
