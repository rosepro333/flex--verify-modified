import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Cookie } from 'ng2-cookies';
import { CreateApiKayComponent } from '../dialog-box/create-api-kay/create-api-kay.component';
import { CreateSdyKeyComponent } from '../dialog-box/create-sdy-key/create-sdy-key.component';
import { ServicesService } from '../service/services.service';

@Component({
  selector: 'app-api-keys',
  templateUrl: './api-keys.component.html',
  styleUrls: ['./api-keys.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ApiKeysComponent implements OnInit {
  apiKeyData: any = [];
  sdkKeyData: any = [];
  constructor(public dialog: MatDialog, private service: ServicesService) { }
  accessType = '';
  tenetId = '';
  userId = '';
  ngOnInit(): void {
    this.accessType = Cookie.get('Access_Type');
    this.tenetId = Cookie.get('Tenant_ID');
    this.userId = Cookie.get('id');
    this.getApiKeyList();
    this.getSdkKeyList();
  }
  copyKey = () => {
    // alert('copy key');
  }
  createKey = (value: string) => {
    if (value === 'api') {
      const dialogRef = this.dialog.open(CreateApiKayComponent, {
        // height: '300',
        width: '480px',
      });
      dialogRef.afterClosed().subscribe(() => {
        this.ngOnInit();
      });
    } else if (value === 'mobile') {
      const dialogRef = this.dialog.open(CreateSdyKeyComponent, {
        // height: '300',
        width: '480px',
      });
      dialogRef.afterClosed().subscribe(() => {
        this.ngOnInit();
      });
    }
  }
  getApiKeyList = () => {
    if (this.accessType === '1' || this.accessType === '2') {
      this.service.getApiKeyList().subscribe((res) => {
        this.apiKeyData = res.msg === 'success' ? res.data : '';
        console.log(this.apiKeyData);
      });
    } else if (this.accessType === '3' || this.accessType === '4') {
      const tenentId = Cookie.get('Tenant_ID');
      this.service.getApiKeyListById(tenentId).subscribe((res) => {
        this.apiKeyData = res.msg === 'success' ? res.data : '';
        console.log(this.apiKeyData);
      });
    }
  }
  getSdkKeyList = () => {
    if (this.accessType === '1' || this.accessType === '2') {
      this.service.getSdkKeyList().subscribe((res) => {
        this.sdkKeyData = res.msg === 'success' ? res.data : '';
        console.log(this.sdkKeyData);
      });
    } else if (this.accessType === '3' || this.accessType === '4') {
      const tenetId = Cookie.get('Tenant_ID');
      this.service.getSdkKeyListById(tenetId).subscribe((res) => {
        this.sdkKeyData = res.msg === 'success' ? res.data : '';
        console.log(this.sdkKeyData);
      });
    }
  }
  revoke = (key: any, value: any) => {
    if (key === 'apiKey') {
      console.log(key, value._id);
      this.service.deleteApiKey(value._id).subscribe((res: any) => {
        console.log(res);
        if (res.msg === 'success') {
          this.getApiKeyList();
        }
        const datas = {
          user: Cookie.get('id'),
          tenentId: Cookie.get('Tenant_ID'),
          activity: 'Revoke API Key',
          details: JSON.stringify({ api_key_id: value._id, tenant_id: value.Tenent_ID._id })
        };
        this.audits(datas);
      }, (error: any) => {
        console.log(error);
      });
    } else if (key === 'sdkKey') {
      console.log(key, value._id);
      this.service.deleteSdyKey(value._id).subscribe((res: any) => {
        console.log(res);
        if (res.msg === 'success') {
          this.getSdkKeyList();
        }
        const datas = {
          user: Cookie.get('id'),
          tenentId: Cookie.get('Tenant_ID'),
          activity: 'Revoke SDK Key',
          details: JSON.stringify({ api_key_id: value._id, tenant_id: value.Tenent_ID._id })
        };
        this.audits(datas);
      }, (error: any) => {
        console.log(error);
      });
    }
  }
  audits = (data: any) => {
    this.service.audit(data).subscribe((res) => {
      console.log(res);
    }, (err) => {
      console.log(err);
    });
  }
}
