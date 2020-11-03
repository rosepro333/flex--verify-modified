import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-api-keys',
  templateUrl: './api-keys.component.html',
  styleUrls: ['./api-keys.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ApiKeysComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  copyKey() {
    alert('copy key')
  }
  createKey() {
    alert('create key')
  }
  revoke() {
    alert('revoke')
  }
}
