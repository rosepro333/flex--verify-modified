import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-developer-page',
  templateUrl: './developer-page.component.html',
  styleUrls: ['./developer-page.component.scss']
})
export class DeveloperPageComponent implements OnInit {
  selectedItem = 'Getting Started';
  constructor() { }
  startedType:any = ['Overview Api', 'Authentication',"Issue"];
  generateKycApp:any = ['Route: project_root/module_root/src/main/res/values-en/', 'Method: POST',"  Headers:","Body:"];
  getKycApp:any = ['Route: https://verify.flexm.com/api/scans/kycScanDetails', 'Method: POST',"  Headers: api-key, sdk-key"," Body: Document_ID"];
  tab = ['Overview','Getting Started', 'Generate Verification URL','Get Scan Details'];

  ngOnInit(): void {
  }
  selecteItem(value: any){
    console.log(value)
    this.selectedItem = value;
  }
}
