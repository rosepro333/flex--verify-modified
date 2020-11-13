import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ServicesService } from 'src/app/service/services.service';

@Component({
  selector: 'app-create-api-kay',
  templateUrl: './create-api-kay.component.html',
  styleUrls: ['./create-api-kay.component.scss']
})
export class CreateApiKayComponent implements OnInit {
 form: FormGroup;

  constructor(private fb: FormBuilder, private router: Router , private service:ServicesService,private dialogRef: MatDialogRef<CreateApiKayComponent>) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      Tenent: new FormControl(''),
      mode: new FormControl('')
    });
  }
  onSave(event: any) {
    console.log(event)
    if ( this.form.valid) {
      this.service.createApiKey(this.form.value).subscribe((result) => {
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
