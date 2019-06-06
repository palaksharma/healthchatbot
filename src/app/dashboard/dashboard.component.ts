import { Component, OnInit } from '@angular/core';
import { ROUTES_PATH, NO_DTLS_AVAILABLE } from './../common/ao-constants';
import { LocationStrategy, PlatformLocation, Location } from '@angular/common';
//import { LegendItem, ChartType } from '../lbd/lbd-chart/lbd-chart.component';
import { ChartDataSets } from 'chart.js';
import { Color, BaseChartDirective, Label } from 'ng2-charts';
import * as Chartist from 'chartist';
import { AppSharedService } from '../services/app-shared.service';
import { DataService } from '../services/data.service';
import { ChartType, ChartOptions } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import * as pluginAnnotations from 'chartjs-plugin-annotation';

@Component({
  selector: 'app-home',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
 

  constructor(private dataService: DataService, private sharedService: AppSharedService) {
  }


  ngOnInit() {
  }

  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'top',
    },
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          const label = ctx.chart.data.labels[ctx.dataIndex];
          return label;
        },
      },
    }
  };
  public pieChartLabels: Label[] = ['Puberty', 'Birth-Control', 'Preganancy'];
  public pieChartData: number[] = [30, 35, 35];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [pluginDataLabels];
  public pieChartColors = [
    {
      backgroundColor: ['rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)'],
    },
  ];



  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  public barChartLabels: Label[] = ['Pune', 'Delhi', 'Mumbai', 'Banglore', 'Kolkata', 'Chennai'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [pluginDataLabels];

  public barChartData: ChartDataSets[] = [
    { data: [20, 50, 10, 10, 30, 50], label: 'Issues' },
  ];

  public barChartLabels1: Label[] = ['Ahmadnagar', 'Akola', 'Amravati', 'Bhandara', 'Bid', 'Chandrapur'];

  public barChartData1: ChartDataSets[] = [
    { data: [22, 51, 10, 19, 31, 57], label: 'Issues' },
  ];

  public barChartOptions2: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
  };
  public barChartLabels2: Label[] = ['Jan-Feb', 'Feb-Mar', 'Mar-April', 'April-May', 'May-June', 'June-July', 'July-August'];
 
  public barChartData2: ChartDataSets[] = [
    { data: [10, 15, 8, 8, 5, 5, 10], label: 'Problems Raised' },
    { data: [9, 4, 4, 2, 5, 3, 9], label: 'Problems Answered' }
  ];
  // Events
  chartClicked(e: any): void {
    console.log(e);
  }

  chartHovered(e: any): void {
    console.log(e);
  }

  public lineChartData: ChartDataSets[] = [
    { data: [65, 59, 80], label: 'Puberty' },
    { data: [28, 12, 40], label: 'Birth-Control' },
    { data: [180, 48, 770], label: 'Preganancy', yAxisID: 'y-axis-1' }
  ];
  public lineChartLabels: Label[] = ['10-15', '15-25', '25-40'];
  public lineChartOptions: (ChartOptions & { annotation: any }) = {
    responsive: true,
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      xAxes: [{}],
      yAxes: [
        {
          id: 'y-axis-0',
          position: 'left',
        },
        {
          id: 'y-axis-1',
          position: 'right',
          gridLines: {
            color: 'rgba(255,0,0,0.3)',
          },
          ticks: {
            fontColor: 'red',
          }
        }
      ]
    },
    annotation: {
      annotations: [
        {
          type: 'line',
          mode: 'vertical',
          scaleID: 'x-axis-0',
          value: 'March',
          borderColor: 'orange',
          borderWidth: 2,
          label: {
            enabled: true,
            fontColor: 'orange',
            content: 'LineAnno'
          }
        },
      ],
    },
  };
  public lineChartColors: Color[] = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // red
      backgroundColor: 'rgba(255,0,0,0.3)',
      borderColor: 'red',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';
  public lineChartPlugins = [pluginAnnotations];


}
