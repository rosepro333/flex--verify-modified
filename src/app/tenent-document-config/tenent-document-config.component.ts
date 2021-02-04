import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { Observable } from 'rxjs';
import { AddDocumentComponent } from '../dialog-box/add-document/add-document.component';
import { ReportService } from '../service/report.service';
import { ServicesService } from '../service/services.service';
import { TosterService } from '../toster/toster.service';
import { of } from 'rxjs';
import { DataSource } from '@angular/cdk/table';
import { MatTableDataSource } from '@angular/material/table';
interface TypeDocument {
  createdAt: string;
  isDeleted: boolean;
  name: string;
  status: string;
  updatedAt: string;
  __v: number;
  _id: string;
}
interface TypeHeader {
  cell: string;
  columnDef: string;
  header: string;
  headerId: string;

}
@Component({
  selector: 'app-tenent-document-config',
  templateUrl: './tenent-document-config.component.html',
  styleUrls: ['./tenent-document-config.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TenentDocumentConfigComponent implements OnInit {
  @ViewChild('rightDrawer', { static: false }) sideNav: MatSidenav;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  pageSizeOptions = [10, 25, 50, 100];
  pageSize = 10;
  totalSize = 0;
  page = 0;
  currentPage = 1;
  search = '';
  accessType = '';
  // tenetId = '';
  userId = '';
  tenentList: any = [];
  tenentID = "All"
  // tenentDataSource: any = ['1','1','1','1'];
  // displayedColumns: string[] =[];
  displayedColumns1: string[] = ['Countries', 'TakeAction',];
  isCountry: boolean;
  isDocument: boolean;
  dataSource: any = ['1'];
  checkCountry = true;
  countryInfo = false;
  checkDocumentType = true;
  documentInfo = false;
  form: FormGroup;
  form1: FormGroup;
  countryLIst: any = [];
  documentTypeList: any = [];
  isCountryEdit: boolean = false;
  isDocumentEdit: boolean = false;
  isDocumentConfig: boolean = false;
  countryID = '';
  documentTypeID = '';
  countryListSearch = '';
  docTypeListSearch = '';
  countryListData: any = [];
  tenentConfigMap = new Map();
  tableHide: boolean = false;
  columns = [
    // { columnDef: 'position', header: 'No.',    cell: (element: any) => `${element.position}` },
    // { columnDef: 'name',     header: 'Name',   cell: (element: any) => `${element.name}`     },
    // { columnDef: 'weight',   header: 'Weight', cell: (element: any) => `${element.weight}`   },
    // { columnDef: 'symbol',   header: 'Symbol', cell: (element: any) => `${element.symbol}`   },
  ];
  // columns: any =[];
  colspanLength: number;
  tenentDataSource: any = [];
  dataSourceMap = new Map();
  // tenentDataSource= new ExampleDataSource();
  // displayedColumns :any = [];
  displayedColumns = this.columns.map(c => c.columnDef);


  constructor(
    private serviceService: ServicesService,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private router: Router,
    private service: ServicesService,
    private toster: TosterService,
    private report: ReportService,
    private ref: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.accessType = Cookie.get('Access_Type');
    this.formControl();
    this.countryList();
    this.formControl1()
    this.getTenentList();
    this.DocumentTypeList();
    this.documentHeader();
    this.countryListDoc();
  }
  formControl = () => {
    this.form = this.fb.group({
      createCountry: ['', [Validators.required, Validators.minLength(3)]],
      editCountry: ['', [Validators.required, Validators.minLength(3)]],
      countrySearch: ['',],
    });
  }

  formControl1 = () => {
    this.form1 = this.fb.group({
      createDocumentType: ['', [Validators.minLength(3)]],
      editDocumentType: ['', [Validators.minLength(3)]],
      documentTypeSearch: ['',],

    });
  }
  clearAll = () => {
    this.tenentID = "All"
    this.search = '';
    this.countryListDoc();
  }
  getTenentList = () => {
    const data = {
      "isBlocked": true
    }
    this.service.getTenentList(data).subscribe((res) => {
      // //(res);
      if (res.msg === 'success') {
        // this.tenentList = res.data;
        this.tenentList.splice(0, this.tenentList.length);
        if (res.data.length > 0) {
          res?.data.map((i: any, index: number) => {
            const obj = {};
            if (index === 0) {
              const obj1 = {};
              obj1['_id'] = "All";
              obj1['Name'] = "All";
              this.tenentList.push(obj1);
              obj['_id'] = i._id;
              obj['Name'] = i.Name;
              this.tenentList.push(obj);
            } else {
              obj['_id'] = i._id;
              obj['Name'] = i.Name;
              this.tenentList.push(obj);
            }
          })
        } else {
          this.tenentList = [];
        }
      }

    });

  }
  documentHeader = () => {
    this.columns = [];
    const dataColumn = []
    const cols = [{ columnDef: 'Country', header: 'Country' }]
    this.report.docTypeListForHeader().subscribe((res) => {
      //(res)
      //(this.tenentDataSource)
      if (res.apires === 1 && res.msg === 'success') {
        res.data.map((i: any, index: number) => {
          const obj = { columnDef: i.name, header: i.name, headerId: i._id, cell: (element: any) => `${element.position}` };
          cols.push(obj);
          if (res.data.length - 1 === index) {
            this.columns = cols;
            this.displayedColumns = this.columns.map(c => c.columnDef);
            this.colspanLength = this.columns.length;
            this.ref.detectChanges();
          }
        })
      } else if (res.apires === 0 && res.msg === 'success') {
        this.columns = cols;
        this.displayedColumns = this.columns.map(c => c.columnDef);
        this.colspanLength = this.columns.length;
        this.ref.detectChanges();
      }
    }, (err: any) => {
      //(err)
    })
  }
  checkedAll = (column: any, value: any) => {
    //(column);
    //(value);

  }
  checkedFunction = (row: any, header: any, value: any) => {
    console.log(row);
    console.log(header)
    console.log(value.checked)
    const data = {
      tenentId: this.tenentID,
      documentType: [header.headerId],
      country: row._id,
      checked: value.checked
    }
    console.log(data)
    this.toggleConfigCountry(data);
  }
  toggleConfigCountry = (data: any) => {
    this.report.toggleConfiguteForCountry(data).subscribe(() => { }, (error: any) => {
      console.log(error)
    })
  }
  countrySearch = () => {
    this.countryListSearch = this.form.value.countrySearch;
    //(this.countryListSearch)
    // this.countrySearch =value;
    this.countryList();
  }
  countryList = () => {
    const data = {
      search: this.countryListSearch
    }
    this.report.countryList(data).subscribe((res) => {
      //(res)
      if (res.apires === 1 && res.msg === 'success') {
        //(res.data)
        if (res.data.length > 0) {
          this.countryLIst = res.data;
          this.ref.detectChanges();
        } else if (res.apires === 0 && res.msg === 'success') {
          this.countryLIst = [];
          this.ref.detectChanges();
        }
      } else {
        // this.toster.openSnackBar('Something Went Wrong', 'Failed')
      }
    }, (error: any) => {
      //(error)
    })
  }
  editCountryForm = (id: any, name: any) => {
    this.countryInfo = true
    //(id);
    //(name);
    this.countryID = id;
    this.form.patchValue({ editCountry: name });
    this.isCountryEdit = true;
  }
  countryToggle = (id: any, value: any) => {
    var status = ''
    //(value.checked)
    const checkedStatus = value.checked;
    if (checkedStatus === true) {
      status = 'active';
    } else if (checkedStatus === false) {
      status = 'inactive';
    }
    const data = {
      status: status
    }
    //(data)
    this.countryUpdate(id, data);
  }
  editCountry = () => {
    //(this.form)
    const editCountry = this.form.value.editCountry;
    const id = this.countryID
    //(editCountry)
    const data = {
      name: editCountry
    }
    this.countryUpdate(id, data);
  }
  countryUpdate = (id: any, data: any) => {
    this.report.countryUpdate(id, data).subscribe((res) => {
      //(res)
      if (res.msg === 'success') {
        this.ref.detectChanges();
        this.displayCreateCountry();
        this.countryList();
        this.countryListDoc();
        this.selectTenentUser(this.tenentID)
        this.toster.openSnackBar('Successfully Update Country', 'Success')
      } else {
        this.toster.openSnackBar('Something Went Wrong', 'Failed')
      }
    }, (error: any) => {
      //(error)
    })
  }
  createCountry = () => {
    //(this.form)
    const createCountry = this.form.value.createCountry;
    //(createCountry)
    const data = {
      name: createCountry
    }
    this.report.createCountry(data).subscribe((res) => {
      //(res)
      if (res.msg === 'success') {
        this.ref.detectChanges();
        this.form.patchValue({ createCountry: '' })
        this.countryListDoc();
        this.disableCreateCountry()
        this.countryList();
        this.selectTenentUser(this.tenentID)
        this.toster.openSnackBar('Successfully create Country', 'Success')
      } else {
        this.toster.openSnackBar('Something Went Wrong', 'Failed')
      }
    }, (error: any) => {
      //(error)
    })
  }

  displayCreateCountry = () => {
    this.isCountryEdit = false;
    this.checkCountry = true;
    this.countryInfo = false;
  }
  displayCreateDocumentType = () => {
    this.isDocumentEdit = false;
    this.checkDocumentType = true;
    this.documentInfo = false;
  }
  searchDocumentType = () => {
    this.docTypeListSearch = this.form1.value.documentTypeSearch;
    //(this.docTypeListSearch)
    // this.countrySearch =value;
    this.DocumentTypeList();
  }
  DocumentTypeList = () => {
    const data = {
      search: this.docTypeListSearch
    }
    this.report.documentTypeList(data).subscribe((res) => {
      //(res)
      if (res.apires === 1 && res.msg === 'success') {
        //(res.data)
        this.documentTypeList = res.data;
        this.ref.detectChanges();
      }
      if (res.apires === 0 && res.msg === 'success') {
        this.documentTypeList = [];
        this.ref.detectChanges();
      }
    }, (error: any) => {
      //(error)
    })
  }
  createDocumentType = () => {
    const createDocument = this.form1.value.createDocumentType;
    const data = { name: createDocument }
    this.report.createDocumentType(data).subscribe((res) => {
      //(res)
      if (res.apires === 1 && res.msg === 'success') {
        this.ref.detectChanges();
        this.displayCreateDocumentType();
        this.form1.get('createDocumentType').patchValue('')
        this.DocumentTypeList();
        this.documentHeader();
        this.selectTenentUser(this.tenentID)
        this.toster.openSnackBar('Successfully create DocumentType', 'Success')
      } else if (res.apires === 0) {
        this.toster.openSnackBar(res.data, 'Failed')
      }
    }, (error: any) => {
      //(error)
    })
  }
  DocumentTypeToggle = (id: any, value: any) => {
    var status = ''
    //(value.checked)
    const checkedStatus = value.checked;
    if (checkedStatus === true) {
      status = 'active';
    } else if (checkedStatus === false) {
      status = 'inactive';
    }
    const data = {
      status: status
    }
    //(data)
    this.documentTypeUpdate(id, data);
  }
  editDocument = () => {
    const editCountry = this.form1.value.editDocumentType;
    const id = this.documentTypeID;
    //  this.countryID
    //(editCountry)
    const data = {
      name: editCountry
    }
    this.documentTypeUpdate(id, data);
  }
  documentTypeUpdate = (id: any, data: any) => {
    this.report.documentTypeUpdate(id, data).subscribe((res) => {
      //(res)
      if (res.msg === 'success') {
        this.displayCreateDocumentType()
        this.DocumentTypeList();
        this.documentHeader();
        this.selectTenentUser(this.tenentID)
        this.toster.openSnackBar('Successfully Update documentType', 'Success')
      } else {
        this.toster.openSnackBar('Something Went Wrong', 'Failed')
      }
    }, (error: any) => {
      //(error)
    })
  }
  enabledCreateCountry = () => {
    this.checkCountry = false;
    this.countryInfo = true;
    //();
  }
  disableCreateCountry = () => {
    this.checkCountry = true;
    this.countryInfo = false;
    //();
  }
  enabledDocumentType = () => {
    this.checkDocumentType = false;
    this.documentInfo = true;
    //();
  }
  editDocumentType = (id: any, name: any) => {
    this.documentInfo = true
    //(id);
    //(name);
    this.documentTypeID = id;
    this.form1.patchValue({ editDocumentType: name });
    this.isDocumentEdit = true;
  }
  disabledDocumentType = () => {
    this.checkDocumentType = true;
    this.documentInfo = false;
  }
  addDocument = () => {
    const dialogRef = this.dialog.open(AddDocumentComponent, {
      height: '220px',
      width: '500px',
    });
    dialogRef.afterClosed().subscribe(() => {
      // this.getTenentList();
      this.sideNav.close();
    });
  }

  selectTenentUser = async (value: string) => {
    this.search = '';
    this.tenentID = value;
    // if (this.tenentID === 'All') {
    //   return;
    // }
    const data = { tenentId: this.tenentID }
    await this.countryListDoc().then(async (res: Array<any>) => {
      if (res.length > 0) {
        this.tenentDataSource = res;
        const temp = this.columns.slice(0);
        temp.splice(0, 1)
        this.tenentDataSource.map((data: { documentType: any[]; }) => data.documentType = [])
        await this.selectTenentConfig(data).then((res: Array<any>) => {
          if (res.length > 0) {
            for (let i = 0; i < res.length; i++) {
              for (let j = 0; j < this.tenentDataSource.length; j++) {
                if (res[i].country._id === this.tenentDataSource[j]._id) {
                  res[i].documentType.map((type: TypeDocument) => {
                    this.tenentDataSource[j].documentType.push({
                      headerId: type._id,
                      header: type.name,
                      cell: type.status
                    })
                  })
                  const onlyInA = this.tenentDataSource[j].documentType.filter(this.comparer(temp));
                  const onlyInB = temp.filter(this.comparer(this.tenentDataSource[j].documentType));
                  const result = onlyInA.concat(onlyInB);
                  result.map((type: TypeHeader) => {
                    this.tenentDataSource[j].documentType.push({
                      headerId: type.headerId,
                      header: type.header,
                      cell: 'Inactive'
                    })
                  })
                }
              }
            }
          }

          this.ref.detectChanges();
        })

      }
      this.ref.detectChanges();
    })
  }

  comparer = (otherArray: any) => {
    return function (current: { headerId: string; header: string; }) {
      return otherArray.filter(function (other) {
        return other.headerId === current.headerId && other.header === current.header
      }).length === 0;
    }
  }

  selectTenentConfig = (data: any) => {
    return new Promise((resolve, reject) => {
      this.report.selectTenentConfig(data).subscribe((res) => {
        if (res.apires === 1 && res.msg === 'success') {
          resolve(res.data)
        }
      }, (err) => {
        reject(err);
      })
    })
  }
  countryListDoc = () => {
    return new Promise((resolve, reject) => {
      this.report.countryListData().subscribe((res) => {
        if (res.apires === 1 && res.msg === 'success') {
          resolve(res.data)
        }
      }, (err) => {
        reject(err)
      })
    })
  }
  searchCountry = () => {

  }

  documentToggle = (value: any) => {
    //(value)
    //(value.checked)
  }
  handlePage(value: any) {
    this.pageSize = value.pageSize;
    this.currentPage = value.pageIndex + 1;
    // this.getUserList();
  }
  openDrawer = (value: string) => {
    if (value === 'countryList') {
      this.isCountry = true;
      this.isDocument = false;
    }
    else if (value === 'document') {
      this.isDocument = true;
      this.isCountry = false;

    } else {
      this.isCountry = false;
      this.isDocument = false;
    }
  }
  clicked(a, data) {
    //(a, data);
    if (a == 'create-user') {
      if (data === null) {
        // this.userEdit = '';
        // this.form.reset();
        // this.form.get('email').enable();
        // this.form.get('access').enable();
        // this.form.get('tenent').enable();
      } else if (data) {
        // this.userEdit = data;
        // this.form.patchValue({name: this.userEdit.Contact_Name,email: this.userEdit.Contact_Email,access: this.userEdit.Access_Type,tenent: this.userEdit.Tenant_ID?._id})
        // //(data);
        // this.form.get('email').disable();
        // this.form.get('access').disable();
        // this.form.get('tenent').disable();
      }
      // this.isCreateUser = true;
      // this.isUserDetails = false;

    } else if (a == 'user-details') {
      // this.detailsDetails = data;
      // //(this.detailsDetails);
      // this.isCreateUser = false;
      // this.isUserDetails = true;
    }
    else {
      //('3')
      // this.isCreateUser = false;
      // this.isUserDetails = false;
    }
  }

}

// const ELEMENT_DATA: any[] = [
//   {'Country': 'India','	pan card' : 'Hydrogen','Aadhar Card': 1.0079, 'Passport': 'H'},
//   {'Country': 'nepal','	pan card' : 'Hydrogen','Aadhar Card': 1.0079, 'Passport': 'H'},
//   {'Country': 'australia','	pan card' : 'Hydrogen','Aadhar Card': 1.0079, 'Passport': 'H'},
//   {'Country': 'America','	pan card' : 'Hydrogen','Aadhar Card': 1.0079, 'Passport': 'H'},
//   {'Country': 'maxico','	pan card' : 'Hydrogen','Aadhar Card': 1.0079, 'Passport': 'H'},
//   {'Country': 'UAE','	pan card' : 'Hydrogen','Aadhar Card': 1.0079, 'Passport': 'H'},

//   // {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
//   // {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
//   // {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
//   // {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
//   // {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
//   // {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
//   // {position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na'},
//   // {position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg'},
//   // {position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al'},
//   // {position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si'},
//   // {position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P'},
//   // {position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S'},
//   // {position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl'},
//   // {position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar'},
//   // {position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K'},
//   // {position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca'},
// ];
// export class ExampleDataSource extends DataSource<any> {

//   connect(): Observable<Element[]> {
//     return of(ELEMENT_DATA);
//     // return Observable.of(ELEMENT_DATA);
//   }

//   disconnect() {}
// }
