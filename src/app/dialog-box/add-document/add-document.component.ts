import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-document',
  templateUrl: './add-document.component.html',
  styleUrls: ['./add-document.component.scss']
})
export class AddDocumentComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<AddDocumentComponent>
  ) { }

  ngOnInit(): void {
  }
   clear = () => {
    this.dialogRef.close();
  }
}
