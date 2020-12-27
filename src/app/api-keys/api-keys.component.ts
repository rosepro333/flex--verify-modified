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
  pageSizeOptions = [2, 25, 50, 100];
  pageSize = 10;
  totalSize = 0;
  currentPage = 1;
  tenentList: any = [];
  selectTenentId = '';
  selectedMode = '';
  mode: any = [{name: 'All',value: 'All',},{name: 'Sandbox',value: 'Sandbox',},{name: 'Production',value: 'Production',}];
  ngOnInit(): void {
    this.accessType = Cookie.get('Access_Type');
    this.tenetId = Cookie.get('Tenant_ID');
    this.userId = Cookie.get('id');
    this.getTenentList()
    this.getApiKeyList();
    this.getSdkKeyList();
  }
 getTenentList = () => {
    if (this.accessType === '1') {
      const data = {
        "Tenant_ID": "",
        "limit": 10,
        "pageNo": 1,
        "order": "-1",
        "search": "",
        "startDate": "",
        "endDate": "",
        "status": ""
      }
      this.service.getTenentList(data).subscribe((res) => {
        // console.log(res);
        if (res.msg === 'success') {
          this.tenentList.splice(0,this.tenentList.length);
          res.data.map((i: any, index: number) =>{
            const obj = {};
            if(index === 0){
              const obj1 = {};
              obj1['_id']= "All";
              obj1['Name']= "All";
              this.tenentList.push(obj1);
              obj['_id'] = i._id;
              obj['Name'] = i.Name;
              this.tenentList.push(obj);
            } else{
              obj['_id'] = i._id;
              obj['Name'] = i.Name;
              this.tenentList.push(obj);
            }
            console.log(this.tenentList)
          })
        }
      });
    }
  }
  copyKey = () => {
    // alert('copy key');
  }
  selectTenent = (value: any) => {
    console.log(value);
    this.selectTenentId = value;
    this.getApiKeyList();
    this.getSdkKeyList();
  }
  selectMode = (value: any) => {
    console.log(value);
    this.selectedMode = value;
    this.getApiKeyList();
    this.getSdkKeyList();

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
    if (this.accessType === '1' ) {
        const data= {
        "Mode":this.selectedMode,
        "Tenent_ID":this.selectTenentId
        }
        console.log(data);
      this.service.getApiKeyList(data).subscribe((res) => {
        this.apiKeyData = res.msg === 'success' ? res.data : '';
        console.log(this.apiKeyData);
      });
    } else if (this.accessType === '3') {
      const tenentId = Cookie.get('Tenant_ID');
      const data= {
        "Mode":this.selectedMode,
        "Tenent_ID":tenentId
        }
        console.log(data);
      this.service.getApiKeyList(data).subscribe((res) => {
        this.apiKeyData = res.msg === 'success' ? res.data : '';
        console.log(this.apiKeyData);
      });
    }
  }
  getSdkKeyList = () => {
    if (this.accessType === '1' ) {
      const data = {
          "Mode":this.selectedMode,
          "Tenent_ID":this.selectTenentId
      }
      this.service.getSdkKeyList(data).subscribe((res) => {
        this.sdkKeyData = res.msg === 'success' ? res.data : '';
        console.log(this.sdkKeyData);
      });
    } else if (this.accessType === '3') {
      const tenentId = Cookie.get('Tenant_ID');
      const data= {
        "Mode":this.selectedMode,
        "Tenent_ID":tenentId
        }
        console.log(data);
      this.service.getSdkKeyList(data).subscribe((res) => {
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
