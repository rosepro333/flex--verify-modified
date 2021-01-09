import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';

@Component({
  selector: 'app-id--+**************************************',
  templateUrl: './id-details.component.html',
  styleUrls: ['./id-details.component.scss'],
  // encapsulation: ViewEncapsulation.None,
})
export class IdDetailsComponent implements OnInit {
  img: File;
  form: FormGroup;
  constructor( private dialogRef: MatDialogRef<IdDetailsComponent>,
        @Inject(MAT_DIALOG_DATA) data, private fb: FormBuilder,) {
          console.log(data.img)
          this.img = data.img;
        }

  ngOnInit(): void {
    // this.formControl()
  }
  formControl = () => {
    this.form = this.fb.group({
      img: new FormControl(''),
    });
  }
  clear = () => {
     this.dialogRef.close();
  }
}
