import { Component, Input, OnInit } from '@angular/core';
import { ChartData, ChartType, Color } from 'chart.js';

@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styles: [
  ]
})
export class DonaComponent  {
  @Input() title:string = 'Sin titulo';


  // Doughnut
  @Input('labels') doughnutChartLabels: string[] = [ 'Download Sales', 'In-Store Sales', 'Mail-Order Sales' ];
  public doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [
      { data: [ 350, 450, 100 ] },
    
    ]
  };
  public doughnutChartType: ChartType = 'doughnut';

  // public colors: Color[] = [
  //   { backgroundColor: [ '#6857E6', '#009FEE', '#F02059' ] }
  // ];

}
