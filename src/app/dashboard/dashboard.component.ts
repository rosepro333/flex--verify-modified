import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ServicesService } from '../service/services.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DashboardComponent implements OnInit {

  constructor(
    private service : ServicesService
  ) { }

  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartData = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' },
    { data: [65, 21, 84, 32, 58, 25, 100], label: 'Series C' },
    { data: [24, 32, 62, 35, 69, 77, 98], label: 'Series D' }
  ];

  ngOnInit(): void {
    this.service.update.subscribe((data)=>{
      console.log(data)
    })
  }
}
