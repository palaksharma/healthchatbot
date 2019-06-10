import { Component, OnInit } from '@angular/core';
import { ROUTES_PATH, NO_DTLS_AVAILABLE } from './../common/ao-constants';
import { ChartType, ChartOptions } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import * as pluginAnnotations from 'chartjs-plugin-annotation';
import { LocationStrategy, PlatformLocation, Location } from '@angular/common';
//import { LegendItem, ChartType } from '../lbd/lbd-chart/lbd-chart.component';
import { ChartDataSets } from 'chart.js';
import { Color, BaseChartDirective, Label } from 'ng2-charts';
import * as Chartist from 'chartist';


@Component({
  selector: 'app-home',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  
  
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [pluginDataLabels];
 
  public barChartOptions2: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
  };
  public barChartLabels2: Label[] = ['Jan-Feb', 'Feb-Mar', 'Mar-April', 'April-May', 'May-June', 'June-July', 'July-August'];
 
  public barChartData2: ChartDataSets[] = [
    { data: [10, 15, 8, 13, 5, 17, 10], label:'Mensturation Problems raised', stack: 'a' },
    { data: [7, 12, 3, 8, 10, 15, 10], label:'Birth-Control Problems raised', stack: 'a' },
    { data: [6, 10, 9, 4, 20, 15, 10], label:'Puberty Problems raised', stack: 'a' },
    { data: [6, 10, 10, 4, 20, 15, 10], label:'Pregnancy Problems raised', stack: 'a' },
    { data: [9, 11, 7, 11, 5, 13, 9], label: 'Mensturation Problems answered' , stack: 'b' },
    { data: [4, 10, 3, 6, 10, 14, 9], label: 'Birth-Control Problems answered' , stack: 'b' },
    { data: [3, 5, 8, 3, 10, 3, 9], label: 'Puberty Problems answered' , stack: 'b' },
    { data: [3, 5, 9, 3, 10, 3, 9], label: 'Pregnancy Problems answered' , stack: 'b' },
  ];
  // Events
  chartClicked(e: any): void {
    console.log(e);
  }

  chartHovered(e: any): void {
    console.log(e);
  }
  constructor() {
  }


  ngOnInit() {
  }

  data = [
    {
      "name": "Parul Rastogi",
      "age": "13",
      "place": "Uttar Pradesh",
      "problem": "Mensturation",
       "question":"मासिक धर्म नियमित रूप से नहीं आने पर क्या करें",
      "answered": "Chat",
      "prescription": "",
      "status": "Completed"
    },
    {
      "name": "Richa Rastogi",
      "age": "13",
      "place": "Bihar",
      "problem": "Mensturation",
      "question":"मासिक धर्म पर पेट में दर्द होने पर क्या करें",
      "answered": "Chat",
      "prescription": "",
      "status": "Completed"
    }
  ];

 


}
