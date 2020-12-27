import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Cookie } from 'ng2-cookies';
import { ServicesService } from '../service/services.service';

@Component({
  selector: 'app-verification-url',
  templateUrl: './verification-url.component.html',
  styleUrls: ['./verification-url.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class VerificationUrlComponent implements OnInit {
  title: 'Verification Url';
  smsValue = '';
  emailValue = '';
  elementType: 'url';
  verificaionUrl = '';
  tenentList: any = [];
  sdkKey: any = [];
  selectSdk = '';
  tenetId = '';
  accessType = '';
  id = '';
  selectedTenent = '';
  emailId = '';
  constructor(private serviceService: ServicesService) { }

  ngOnInit(): void {
    this.id = Cookie.get('id');
    this.accessType = Cookie.get('Access_Type');
    this.tenetId = Cookie.get('Tenant_ID');
    this.getTenentList();
  }
  getTenentList = () => {
    if (this.accessType === '1' || this.accessType === '2') {
      const data ={};
      this.serviceService.getTenentList(data).subscribe((res) => {
        // console.log(res);
        if (res.msg === 'success') {
          this.tenentList = res.data;
        }
      });
    } else if (this.accessType === '3' || this.accessType === '4') {
      console.log('acces 3' + this.accessType);
      const tenetId = this.tenetId;
      console.log('tenent' + tenetId);
      const data ={
        "Tenant_ID":tenetId,
        "limit":"20",
        "pageNo":"1",
        "order":"-1",
        "search":"",
        "startDate":"",
        "endDate":"",
        "status":""
        };
      this.serviceService.getTenentList(data).subscribe((res) => {
        console.log(res);
        if (res.msg === 'success') {
          this.tenentList = res.data;
          console.log(this.tenentList);
        }
      });
    }
    // this.serviceService.getTenentList().subscribe((res) => {
    //   // console.log(res);
    //   if (res.msg === 'success') {
    //     this.tenentList = res.data;
    //   }
    // });
  }
  selectSdkKey = (value: any) => {
    this.selectSdk = value;
    // Cookie.set("x-access-token", value);
    // localStorage.setItem("x-access-token", value);
  }
  selectTenent = (value: any) => {
    this.selectedTenent = value;
    console.log(value);
    this.getSdkId(value);
  }
  getSdkId = (value: any) => {
    this.serviceService.getTenentSdkList(value).subscribe((res) => {
      console.log(res.msg === 'success');
      console.log(res.data);
      this.sdkKey = res.data;
      this.ngOnInit();
    });
  }
  clickGenerate = () => {
    const key = this.selectSdk;
    this.serviceService.generateUrl(key).subscribe(
      (res) => {
        if (res.url) {
          console.log(res.url);
          this.verificaionUrl = res.url;
          // this.verificaionUrl = res.url;
          // localhost:50492/
          // var url = this.verificaionUrl.split("/");
          // console.log(url);
          // console.log(url[2]);
          // window.open(res.url, "_blank");
          const data = {
            user: Cookie.get('id'),
            tenentId: Cookie.get('Tenant_ID'),
            activity: 'Generate url ',
            details: JSON.stringify({ tenant_id: this.selectedTenent, sdk_key: key })
          };
          this.audits(data);
        }
      },
      (error) => {
        console.error(error);
      }
    );
  }
  // send = (value: string, a: string) => {
  //   if (a === 'mail') {

  //     // alert('mail sent to ' + value);
  //   } else {
  //     alert('sms sent to ' + value);
  //   }

  //   console.log(a);
  // }
  audits = (data: any) => {
    this.serviceService.audit(data).subscribe((res) => {
      console.log(res);
    }, (error: any) => {
      console.log(error);
    });
  }
  sendEmail(): void {
    // alert('email send to ' + this.emailId)
    console.log(this.selectedTenent)
     const data ={
        "fromUser":this.id,
        "tenentId":this.selectedTenent,
        "recipientEmail":this.emailId,
        "type":"Verification url",
        "data":JSON.stringify({url: this.verificaionUrl, sdk:this.selectSdk })
      }
      this.serviceService.sendEmail(data).subscribe((res) =>{
        console.log(res)
      },(err) =>{
        console.log(err);
      })
  }
}
