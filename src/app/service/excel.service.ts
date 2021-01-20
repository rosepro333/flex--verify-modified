import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
// import { Workbook } from 'exceljs';
// import * as Excel from 'exceljs';
import * as Excel from 'exceljs/dist/exceljs.min.js';
// import * as Excel from "exceljs";
import * as ExcelProper from 'exceljs';
const EXCEL_TYPE =
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
@Injectable({
  providedIn: 'root'
})
export class ExcelService {
  reportMobileActivity: any = [
    'DocumentID',
    'createdAt',
    'Activity',
    'DeviceSignature',
    'ipAddress',
  ];
   reportAdminActivity: any = [
    'Name',
    'createdAt',
    'Activity',
    'DeviceSignature',
    'ipAddress',
  ];
  reportScanActivity: any = [
    'Scan ID',
    'createdAt',
    'status',
    'ID Type',
    'Name',
  ];
  emailReportActivity: any = [
    'recipientEmail ID',
    'createdAt',
    'type',
    'ipAddress'
  ];

  constructor() {}

  public exportAsExcelFile(
    dateRange,
    json: any[],
    excelFileName: string
  ): void {
    console.log(json)
    const normalFont = { name: 'Times New Roman', size: 12, bold: true };

    let workbook: ExcelProper.Workbook = new Excel.Workbook();
    const worksheet = workbook.addWorksheet('Admin Portal');
    this.addNewRow(worksheet);
    if (dateRange) {
      worksheet.addRow([dateRange]).font = normalFont;
    }
    this.addNewRow(worksheet);
     if (excelFileName === 'mobileReportActivity') {
      worksheet
        .addRow(this.reportMobileActivity.map((i) => i))
        .eachCell((cell, number) => {
          console.log(cell + ' csvs ' + number);
          cell.alignment = { horizontal: 'left' };
          cell.font = normalFont;
        });
      console.log(json);
      json.map((i) => {
        const data = [];
        data.push(i.documentId);
        data.push(i.createdAt);
        data.push(i.activity);
        data.push(i.deviceSignature);
        data.push(i.ipAddress);
        console.log(i);

        worksheet.addRow(data.map((i) => i)).eachCell((cell, number) => {
          console.log(cell + ' csvs ' + number);
          cell.alignment = { horizontal: 'left' };
        });
      });
    }
    else if (excelFileName === 'adminPortalActivity') {
      worksheet
        .addRow(this.reportAdminActivity.map((i) => i))
        .eachCell((cell, number) => {
          console.log(cell + ' csvs ' + number);
          cell.alignment = { horizontal: 'left' };
          cell.font = normalFont;
        });
      console.log(json);
      json.map((i) => {
        const data = [];
        data.push(i.Name);
        data.push(i.createdAt);
        data.push(i.activity);
        data.push(i.deviceSignature);
        data.push(i.ipAddress);
        console.log(i);

        worksheet.addRow(data.map((i) => i)).eachCell((cell, number) => {
          console.log(cell + ' csvs ' + number);
          cell.alignment = { horizontal: 'left' };
        });
      });
    }
    else if (excelFileName === 'ScanReport') {
      worksheet
        .addRow(this.reportScanActivity.map((i) => i))
        .eachCell((cell, number) => {
          console.log(cell + ' csvs ' + number);
          cell.alignment = { horizontal: 'left' };
          cell.font = normalFont;
        });
      console.log(json);
      json.map((i) => {
        const data = [];
        data.push(i.Scan_ID);
        data.push(i.createdAt);
        data.push(i.status);
        data.push(i.ID_Type);
        data.push(i.Name);
        console.log(i);

        worksheet.addRow(data.map((i) => i)).eachCell((cell, number) => {
          console.log(cell + ' csvs ' + number);
          cell.alignment = { horizontal: 'left' };
        });
      });
    }
    else if (excelFileName === 'EmailReportActivity') {
      worksheet
        .addRow(this.emailReportActivity.map((i) => i))
        .eachCell((cell, number) => {
          console.log(cell + ' csvs ' + number);
          cell.alignment = { horizontal: 'left' };
          cell.font = normalFont;
        });
      console.log(json);
      json.map((i) => {
        const data = [];
        data.push(i.recipientEmail);
        data.push(i.createdAt);
        data.push(i.type);
        data.push(i.ipAddress);
        console.log(i);

        worksheet.addRow(data.map((i) => i)).eachCell((cell, number) => {
          console.log(cell + ' csvs ' + number);
          cell.alignment = { horizontal: 'left' };
        });
      });
    }
    worksheet.columns.forEach((column) => {
      column.width = 30;
    });
    workbook.xlsx.writeBuffer().then((data) => {
      const blob = new Blob([data], {
        type: EXCEL_TYPE,
      });
      FileSaver.saveAs(blob, excelFileName);
    });
  }
  addNewRow(worksheet) {
    worksheet.addRow([]);
  }
  addUsersHeaders(header: any) {
    console.log(header);
    const headers = 'header';
    console.log(headers + '  f');
    return headers;
  }
}
