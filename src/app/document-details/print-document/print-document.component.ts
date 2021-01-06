import { Component, OnInit } from '@angular/core';
import { retry } from 'rxjs/operators';
import { ReportService } from 'src/app/service/report.service';
import { jsPDF}  from 'jspdf';
import html2canvas from 'html2canvas';
@Component({
  selector: 'app-print-document',
  templateUrl: './print-document.component.html',
  styleUrls: ['./print-document.component.scss']
})
export class PrintDocumentComponent implements OnInit {
  printData : any = {
    Building_No: "42",
Document_ID: "5ff2b30114441f4fc06a55c7",
ID_Card_Back: "/id_back__1609741156411.jpg",
ID_Card_Front: "/id_front_doc82YFgqomRZ_1609741149213.jpg",
ID_Type: "Nationality Identify Card",
LiveCheck_Photos: ["/livecheck_left_1609741165620.jpg", "/livecheck_up_1609741165628.jpg", "/livecheck_left_1609741165633.jpg", "/livecheck_up_1609741165636.jpg", "/livecheck_center_1609741165638.jpg"],
Mode: "Sandbox",
Scan_ID: "-zRBlNRDc3",
Scaned_Date: "1609741151414",
Selfie_Photo: "/livecheck_center_1609741165638.jpg",
Tenant_ID: "5fec7c2014441f4fc06a559e",
addressStatus: "clear",
city: "Bangalore",
createdAt: "2021-01-04T06:19:11.415Z",
deviceSignature: {browser: "Chrome", browser_version: "87.0.4280.88", deviceType: "desktop", os: "Windows", os_version: "windows-10"},
dob: "2021-01-27T18:30:00.000Z",
firstName: "Vishal",
idCardNo: "123",
idCardStatus: "clear",
idExpiryDate: "2021-01-27T18:30:00.000Z",
ipAddress: "::ffff:127.0.0.1",
isActive: true,
isDeleted: false,
lastName: "Gupta",
liveCheckingStatus: "Ok",
postalCode: "560068",
scanResultComment: "clear",
scanResultStatus: "Verified",
selfiePhotoMatchStatus: "87.28",
streetName: "Btm",
updatedAt: "2021-01-04T11:24:25.801Z",
updatedDate: null,
_id: "5ff2b35f14441f4fc06a55ca",
};
  constructor(private report: ReportService) {

  }

  ngOnInit(): void {
    this.report.printData.subscribe((res)=>{
      // this.printData = res;
      console.log(res);
    })
  }
  print = () =>{
    // var data = document.getElementById('main');
    var data = document.body;
    html2canvas(data).then(canvas => {
      // Few necessary setting options
      var imgWidth = 208;
      var pageHeight = 295;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF
      var position = 0;
      // const data = 'data:image/jpg;base64,' + btoa(`https://firebasestorage.googleapis.com/v0/b/flexverify.appspot.com/o/id_front_doc82YFgqomRZ_1609741149213.jpg?alt=media`)
      pdf.addImage(contentDataURL, 'JPG', 0, position, imgWidth, imgHeight)
      pdf.save('MYPdf.pdf'); // Generated PDF
    });
    // window.print();
  }
  //  Encodeuint8arr(){
  //   return new TextEncoder().encode(`https://firebasestorage.googleapis.com/v0/b/flexverify.appspot.com/o/id_front_doc82YFgqomRZ_1609741149213.jpg?alt=media`);
  // }
}
