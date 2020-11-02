import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator'
import { Router } from '@angular/router';

export interface DocumentElement {
  id: number;
  docId: string;
  scanId: string;
  createdAt: Date;
  name: string;
  nationality: string;
  tenentId: string;
  status: string;
  statusDate: Date;
  icon: string;

}
const ELEMENT_DATA: DocumentElement[] = [
  {
    id: 1,
    docId: 'f8ea556d-acf9-4c70-a38a-b3a577',
    scanId: 'Scea556d-acf9-4c70-a38a-b3a542',
    createdAt: new Date(2020, 1, 10, 7, 45, 30),
    name: 'Abilash',
    nationality: 'Indian',
    tenentId: '321626664',
    status: 'Processing',
    statusDate: new Date(2020, 1, 10, 9, 30, 30),
    icon: 'error'
  },
  {
    id: 2,
    docId: 'flhhjjhgd-iuhd-skhgv-jhgfc-mhbgf',
    scanId: 'kunghyUGB-hgvhv-lk54s-csa61-21bdfg',
    createdAt: new Date(2020, 2, 20, 8, 20, 45),
    name: 'Arjun',
    nationality: 'Indian',
    tenentId: '32132113',
    status: 'Verified',
    statusDate: new Date(2020, 2, 20, 8, 30, 14),
    icon: 'check_circle'
  },
  {
    id: 3,
    docId: '543sdcdfb-4152sd-dtbhrv1-5d4f3b-541dfb',
    scanId: '6842scv -32d14xf-csef34-541swe-64c2w8',
    createdAt: new Date(2020, 2, 15, 10, 50, 19),
    name: 'Ravi Shanker',
    nationality: 'Indian',
    tenentId: '38274686',
    status: 'Declined',
    statusDate: new Date(2020, 2, 15, 11, 59, 0),
    icon: 'cancel'
  },
];
@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.scss'],
  encapsulation: ViewEncapsulation.None,
})

export class DocumentComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  pageSizeOptions = [10, 25, 50, 100];
  displayedColumns: string[] = ['doc-scan-id', 'date-time', 'name-nationality', 'tenent-id', 'status-date'];

  dataSource = new MatTableDataSource(ELEMENT_DATA);

  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  moreDetails(_id: string) {
    this.router.navigate(['document/details/', _id]);
  }


}



