import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ServicesService } from 'src/app/service/services.service';

@Component({
  selector: 'app-create-sdy-key',
  templateUrl: './create-sdy-key.component.html',
  styleUrls: ['./create-sdy-key.component.scss']
})
export class CreateSdyKeyComponent implements OnInit {
 form: FormGroup;

  constructor(private fb: FormBuilder, private router: Router , private service:ServicesService,private dialogRef: MatDialogRef<CreateSdyKeyComponent>) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      Tenent: new FormControl(''),
      mode: new FormControl('')
    });
  }
  onSave(event: any) {
    console.log(event)
    if ( this.form.valid) {
      this.service.createTenent(this.form.value).subscribe((result) => {
          console.log(result)        
      }, error => {        
        console.error(error);
      })
    }     
  }
  clear() {
    this.dialogRef.close()
  }
}
