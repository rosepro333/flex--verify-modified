import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-developer-page',
  templateUrl: './developer-page.component.html',
  styleUrls: ['./developer-page.component.scss']
})
export class DeveloperPageComponent implements OnInit {
  selectedItem: '';
  constructor() { }
  startedType:any = ['Overview Api', 'Authentication',"Issue"];
  projectSetting:any = ['aapt2 compile project_root/module_root/src/main/res/values-en/', 'Authe strings.xml -o compiled/ntication'," aapt2 compile project_root/module_root/src/main/res/drawabl"];
  tab:any = ['Overview','Getting Started', 'Basis of authentications','Manage deploye Keys','Using SSH agent','Api keys for getting','Data Creation in Document','Update Document','Delete Document','Gett data Document','Scan data Document','Best Pratice integrations'];

  ngOnInit(): void {
  }
  selecteItem(value: any){
    this.selectedItem = value;
  }
}
