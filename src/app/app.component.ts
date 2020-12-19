import { Component, OnInit } from '@angular/core';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { DeviceDetectorService } from 'ngx-device-detector';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'flex-verify-dashboard';
  deviceInfo: any = [];
  constructor( private deviceService: DeviceDetectorService){
    this.deviceDetection();
  }
   deviceDetection = () => {
      console.log('hello `Home` component');
      this.deviceInfo = this.deviceService.getDeviceInfo();
      console.log(this.deviceInfo.browser);
      console.log(this.deviceInfo.browser_version);
      console.log(this.deviceInfo.deviceType);
      console.log(this.deviceInfo.os);
      console.log(this.deviceInfo.os_version);
      // Cookie.set('')
      const  data = {
        browser: this.deviceInfo.browser,
        browser_version: this.deviceInfo.browser_version,
        deviceType: this.deviceInfo.deviceType,
        os: this.deviceInfo.os,
        os_version: this.deviceInfo.os_version,
      };
      Cookie.set('browserinfo', JSON.stringify(data));
      console.log(Cookie.get('browserinfo'));
    }
  ngOnInit(): void {}
}
