import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { Cookie } from "ng2-cookies";
import { ServicesService } from "../service/services.service";

@Component({
  selector: "app-verification-url",
  templateUrl: "./verification-url.component.html",
  styleUrls: ["./verification-url.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class VerificationUrlComponent implements OnInit {
  title: "Verification Url";
  smsValue = "";
  emailValue = "";
  elementType: "url";
  verificaionUrl: string = "";
  tenentList: any = [];
  sdkKey: any = [];
  selectSdk = "";
  constructor(private serviceService: ServicesService) {}

  ngOnInit(): void {
    this.getTenentList();
  }
  getTenentList() {
    this.serviceService.getTenentList().subscribe((res) => {
      // console.log(res);
      if (res.msg === "success") {
        this.tenentList = res.data;
      }
    });
  }
  selectSdkKey(value: any) {
    Cookie.set("x-access-token", value);
  }
  selectTenent(value: any) {
    console.log(value);
    this.getSdkId(value);
  }
  getSdkId(value: any) {
    this.serviceService.getTenentSdkList(value).subscribe((res) => {
      console.log(res.msg === "success");
      console.log(res.data);
      this.sdkKey = res.data;
    });
  }
  clickGenerate() {
    this.serviceService.generateUrl().subscribe(
      (res) => {
        if (res.url) {
          console.log(res.url);
          // this.verificaionUrl = res.url;
          //localhost:50492/
          var url = this.verificaionUrl.split("/");
          console.log(url);
          console.log(url[2]);
          window.open(res.url, "_blank");
        }
      },
      (error) => {
        console.error(error);
      }
    );
  }
  send(value: string, a: string) {
    if (a === "mail") {
      alert("mail sent to " + value);
    } else {
      alert("sms sent to " + value);
    }

    console.log(a);
  }
}
