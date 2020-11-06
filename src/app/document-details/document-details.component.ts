import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DocumentModel } from '../document/models/document.model';
import { DocumentService } from '../document/services/document.service';

@Component({
  selector: 'app-document-details',
  templateUrl: './document-details.component.html',
  styleUrls: ['./document-details.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DocumentDetailsComponent implements OnInit {
  id: number;
  document: DocumentModel
  panelOpenState = false;
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    public documnetService: DocumentService
  ) {
    this.document = new DocumentModel();
  }

  ngOnInit(): void {

    this.id = this.route.snapshot.params["id"];
    //get item details using id
    this.documnetService.getItem(this.id).subscribe(response => {
      console.table(response);
      this.document = response;
    })





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
      comment: new FormControl('')
    });
  }

  shareDoc($event) {
    $event.stopPropagation();
    alert('shared')
  }
  onSave() {
    alert('saved')
  }
  clear() {
    this.form.reset();
  }
  sendComment() {
    alert('comment sent')
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
      }
    },
    nav: true
  }
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
      }
    },
    // nav: true
  }
}
