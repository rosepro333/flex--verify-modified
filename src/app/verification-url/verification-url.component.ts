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
  value: string = "https://www.google.com/";
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
        console.log(res);
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
