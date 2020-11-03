import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CreateUserComponent implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) { }

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
    alert('saved')
  }
  clear() {
    this.router.navigate(['./organization']);
  }
}
