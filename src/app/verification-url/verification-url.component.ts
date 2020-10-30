import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-verification-url',
  templateUrl: './verification-url.component.html',
  styleUrls: ['./verification-url.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class VerificationUrlComponent implements OnInit {
  title: 'Verification Url';
  smsValue = '';
  emailValue = '';
  elementType: 'url';
  value: string = 'https://www.google.com/';

  constructor() { }

  ngOnInit(): void {
  }
  send(value: string, a: string) {
    if (a === 'mail') {
      alert('mail sent to ' + value)
    } else {
      alert('sms sent to ' + value)
    }

    console.log(a)

  }
}
