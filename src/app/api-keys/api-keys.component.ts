import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Cookie } from "ng2-cookies";
import { CreateApiKayComponent } from "../dialog-box/create-api-kay/create-api-kay.component";
import { CreateSdyKeyComponent } from "../dialog-box/create-sdy-key/create-sdy-key.component";
import { ServicesService } from "../service/services.service";

@Component({
  selector: "app-api-keys",
  templateUrl: "./api-keys.component.html",
  styleUrls: ["./api-keys.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class ApiKeysComponent implements OnInit {
  apiKeyData: any = [];
  sdkKeyData: any = [];
  constructor(public dialog: MatDialog, private service: ServicesService) {}

  ngOnInit(): void {
    this.getApiKeyList();
    this.getSdkKeyList();
  }
  copyKey() {
    alert("copy key");
  }
  createKey(value: string) {
    if (value === "api") {
      const dialogRef = this.dialog.open(CreateApiKayComponent, {
        height: "350px",
        width: "600px",
      });
      dialogRef.afterClosed().subscribe(() => {
        this.ngOnInit();
      });
    } else if (value === "mobile") {
      const dialogRef = this.dialog.open(CreateSdyKeyComponent, {
        height: "350px",
        width: "600px",
      });
      dialogRef.afterClosed().subscribe(() => {
        this.ngOnInit();
      });
    }
  }
  getApiKeyList() {
    const id = Cookie.get("Tenant_ID");
    console.log(id);
    this.service.getApiKeyList(id).subscribe((res) => {
      // console.log(res);
      // if ()
      this.apiKeyData = res.msg == "success" ? res.data : "";
      console.log(this.apiKeyData);
    });
  }
  getSdkKeyList() {
    const id = Cookie.get("Tenant_ID");
    this.service.getSdkKeyList(id).subscribe((res) => {
      // console.log(res);
      // if ()
      this.sdkKeyData = res.msg == "success" ? res.data : "";
      console.log(this.sdkKeyData);
    });
  }
  revoke() {
    alert("revoke");
  }
}
