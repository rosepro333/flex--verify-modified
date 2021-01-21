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
  generateKycHeader:any = ['sdy-key:sdkkey_T0MOYD2nbs','api-key:apikey_RXkZpRdUKJ'];
  kycScanDetailsHeader:any = ['api-key:apikey_RXkZpRdUKJ'];
  generateKycBody:any = ['FirstName:Saurav','LastName:Sukla','DOB:2021-01-07T10:15:29.874+00:00','BuildingNo:42','StreetName:Btm','City:Bangalore','Nationality:Indian'];
  kycScanDetailsBody:any = ['Scan_ID: "YFyB5ujM9hIM75E"','Document_ID: "doc_H10dE7iVuKM"'];
  getKycApp:any = ["Headers: api-key, sdk-key"];
  tab = ['Overview','Getting Started', 'Generate Verification URL','Get Scan Details'];

  ngOnInit(): void {
  }
  selecteItem(value: any){
    console.log(value)
    this.selectedItem = value;
  }
}
