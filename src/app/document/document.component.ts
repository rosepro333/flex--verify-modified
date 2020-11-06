import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator'
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DocumentModel } from './models/document.model';
import { DocumentService } from './services/document.service';



@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.scss'],
  encapsulation: ViewEncapsulation.None,
})

export class DocumentComponent implements OnInit {
  id: number;
  dataSource = new MatTableDataSource();
  pageSizeOptions = [10, 25, 50, 100];
  displayedColumns: string[] = ['doc-scan-id', 'date-time', 'name-nationality', 'tenent-id', 'status-date'];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private router: Router, private documentService: DocumentService) {
  }

  ngOnInit(): void {
    this.loadAllDocuments();
  }
  loadAllDocuments() {
    this.documentService.getAllDocList().subscribe((response: any) => {
      this.dataSource.data = response;
    })
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  moreDetails(id: number) {
    this.router.navigate(['documents/' + id]);
  }
}



