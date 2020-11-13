import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateApiKayComponent } from '../dialog-box/create-api-kay/create-api-kay.component';
import { CreateSdyKeyComponent } from '../dialog-box/create-sdy-key/create-sdy-key.component';

@Component({
  selector: 'app-api-keys',
  templateUrl: './api-keys.component.html',
  styleUrls: ['./api-keys.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ApiKeysComponent implements OnInit {

  constructor( public dialog: MatDialog) { }

  ngOnInit(): void {
  }
  copyKey() {
    alert('copy key')
  }
  createKey(value: string) {
    if (value === 'api') {
      const dialogRef = this.dialog.open(CreateApiKayComponent,{
        height: '350px',
        width: '600px',
      });
    } else if (value === 'mobile') {
      const dialogRef = this.dialog.open(CreateSdyKeyComponent,{
        height: '350px',
        width: '600px',
      });
    }
    
  }
  revoke() {
    alert('revoke')
  }
}
