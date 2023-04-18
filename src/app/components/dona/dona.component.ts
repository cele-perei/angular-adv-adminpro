import { Component, Input } from '@angular/core';
import { ChartData, ChartType, ChartOptions } from 'chart.js';


@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styles: [
  ]
})
export class DonaComponent {

  // @Input() title: string ="Sin titulo";

  // @Input('labels') doughnutChartLabels: string[] = [ 'Label1', 'Label2', 'Label3' ];
  // @Input('data') doughnutChartData: ChartData<'doughnut'> = {
  //   labels: this.doughnutChartLabels,
  //   datasets: [
  //     { 
  //       data: [ 350, 450, 100 ],
  //       backgroundColor: ['#9E120E','#FF5800','#FFB414']
      
  //     },
      
  //   ]
  // };

  @Input() labels :string[]   =  [ 'Download Sales', 'In-Store Sales', 'Mail-Order Sales' ];
  @Input() data   :number[]   =  [ 350, 450, 100 ];
  @Input() colors :string[]   =  ['#00DDF0','#0BD9B1','#0CF888'];
  @Input() type   :ChartType  = 'doughnut';
  @Input() title  :string  = 'No title';
 
  public doughnutChartType!: ChartType;
  public doughnutChartData!: ChartData<'doughnut'>;
  public chartOptions!: ChartOptions; 
 
  
  ngOnInit(): void 
  {
    this.doughnutChartType = this.type;
  
    // Doughnut
    this.doughnutChartData = 
    {
      labels: this.labels,
      datasets: 
      [
        { 
          data: this.data,
          backgroundColor: this.colors
        }
      ]
    };
  
    this.chartOptions = 
    {
      responsive: true,
      maintainAspectRatio: false,
    }
}
}
