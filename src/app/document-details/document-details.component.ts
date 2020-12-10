import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { DocumentModel } from '../document/models/document.model';
import { DocumentService } from '../document/services/document.service';
import { ServicesService } from '../service/services.service';
import { Cookie } from 'ng2-cookies/ng2-cookies';

@Component({
  selector: 'app-document-details',
  templateUrl: './document-details.component.html',
  styleUrls: ['./document-details.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DocumentDetailsComponent implements OnInit {
  disabled: Boolean = false;
  accessType: string = '';
  id: number;
  document: any = [];
  scanDocument: any = [];
  panelOpenState = false;
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private serviceServive: ServicesService
  ) {}

  ngOnInit(): void {
    this.accessType = Cookie.get('Access_Type');
    console.log();
    this.id = this.route.snapshot.params['id'];
    this.checkAccessType();
    this.formModule();
    this.getDocument(this.id);
    this.getAllScanDocumentById(this.id);
  }
  checkAccessType() {
    if (this.accessType === '2' || this.accessType === '4') {
      this.disabled = true;
    } else if (this.accessType === '1' || this.accessType === '3') {
      this.disabled = false;
    }
  }
  formModule() {
    this.form = this.fb.group({
      idType: new FormControl(''),
      idNum: new FormControl(''),
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      dobPicker: new FormControl(''),
      streetName: new FormControl(''),
      city: new FormControl(''),
      postalCode: new FormControl(''),
      idExpirypicker: new FormControl(''),
      userId: new FormControl(''),
      mode: new FormControl(''),
      updatedDate: new FormControl(''),
      idCardFront: new FormControl(''),
      idCardBack: new FormControl(''),
      selfieMatching: new FormControl(''),
      liveCheck: new FormControl(''),
      scanResult: new FormControl(''),
      reason: new FormControl(''),
      comment: new FormControl(''),
    });
  }

  getDocument(id: any) {
    //get item details using id
    this.serviceServive.getDocumentBy(id).subscribe((response) => {
      // console.table(response.data);
      console.log(response);
      this.document = response.data;
    });
  }
  getAllScanDocumentById(id: any) {
    this.serviceServive.geScanDocumentList(id).subscribe((response) => {
      console.table(response.data);
      if (response.msg == 'success') {
        console.table(response.data);
        console.log(response.data);
        this.scanDocument = response.data;
      }
    });
  }

  shareDoc($event) {
    $event.stopPropagation();
    alert('shared');
  }
  onSave() {
    // alert('saved');
    const id = '5fc8a980298e600b185f34e6';
    const data = {
      _id: id,
      Id_Card_No: '12',
      First_Name: 'edees',
      Last_Name: 'dsad',
      DOB: 'dad',
      Street_Name: 'daad',
      City: 'dad',
      postalcode: 'dad',
      ID_Expiry_Date: 'adada',
      Updated_Date_Time: Date.now(),
      idCardFrontStatus: 'ded',
      idCardBackStatus: 'dad',
      selfiePhotoMatchStatus: 'dada',
      liveCheckingStatus: 'dad',
      scanResultStatus: 'dada',
      reason: 'dada',
    };
    this.serviceServive.approvedScanDocument(id, data).subscribe((response) => {
      console.log(response);
    });
  }
  clear() {
    this.form.reset();
  }
  sendComment() {
    alert('comment sent');
  }
  customOptions: OwlOptions = {
    loop: false,
    autoplay: false,
    center: true,
    dots: true,
    autoHeight: true,
    autoWidth: true,
    responsive: {
      0: {
        items: 1,
      },
    },
    nav: true,
  };
  livelinessOptions: OwlOptions = {
    loop: false,
    autoplay: false,
    center: true,
    dots: true,
    autoHeight: true,
    autoWidth: true,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 1,
      },
      1000: {
        items: 1,
      },
    },
    // nav: true
  };
}
