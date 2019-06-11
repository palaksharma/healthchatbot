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
  public barChartLegend: { verticalAlign: "center"}
  public barChartPlugins = [pluginDataLabels];

 
  public barChartOptions2: ChartOptions = {
    legend: {
      position: 'top',
      fullWidth : true,
      labels: {
        fontSize: 14,
        boxWidth:120,
        padding:20
      }
  },
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      xAxes: [{
      }],
      yAxes: [{
      }]
    }
  };
  public barChartLabels2: Label[] = ['Jan-Feb', 'Feb-Mar', 'Mar-April', 'April-May', 'May-June', 'June-July', 'July-August'];
 
  public barChartData2: ChartDataSets[] = [
    { data: [10, 15, 8, 13, 5, 17, 10], label:'Mensturation Problems raised', stack: 'a' },
    { data: [9, 11, 7, 11, 5, 13, 9], label: 'Mensturation Problems answered' , stack: 'b' },

    { data: [6, 10, 9, 4, 20, 15, 10], label:'Puberty Problems raised', stack: 'a' },
    { data: [3, 5, 8, 3, 10, 3, 9], label: 'Puberty Problems answered' , stack: 'b' },

    { data: [6, 10, 10, 4, 20, 15, 10], label:'Pregnancy Problems raised', stack: 'a' },
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
      "sno":1,
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
      "sno":2,
      "name": "Richa Rastogi",
      "age": "13",
      "place": "Bihar",
      "problem": "Mensturation",
      "question":"मासिक धर्म पर पेट में दर्द होने पर क्या करें",
      "answered": "Chat",
      "prescription": "",
      "status": "Completed"
    },
    {
      "sno":3,
      "name": "Parvati saini",
      "age": "22",
      "place": "Rajasthan",
      "problem": "Pregnancy",
      "question":"मुझे गर्भावस्था में रक्त मिला, मुझे क्या करना चाहिए?",
      "answered": "Video call",
      "prescription": "",
      "status": "Completed"
    },
    {
      "sno":4,
      "name": "Radha Gaur",
      "age": "32",
      "place": "Odisha",
      "problem": "Mensturation",
      "question":"मासिक धर्म में मुझे क्या करना चाहिए, इसके 7 दिनों के बाद भी मेरे रक्तस्राव को नहीं रोका गया है",
      "answered": "Chat",
      "prescription": "",
      "status": "Pending"
    },
    {
      "sno":5,
      "name": "Saraswati Roy",
      "age": "15",
      "place": "West Bengal",
      "problem": "Puberty",
      "question":"मेरा शरीर बदल रहा है और मेरे स्तन का आकार बढ़ रहा है। मुझे नहीं पता कि क्या करना है। क्या यह युवावस्था है?",
      "answered": "Chat",
      "prescription": "",
      "status": "Pending"
    },
    {
      "sno":6,
      "name": "Tabsum Garg",
      "age": "13",
      "place": "Uttar Pradesh",
      "problem": "Puberty",
      "question":"मेरा शरीर बदल रहा है और मेरे स्तन का आकार बढ़ रहा है। मुझे नहीं पता कि क्या करना है। क्या यह युवावस्था है?",
      "answered": "Chat",
      "prescription": "",
      "status": "Pending"
    },
    {
      "sno":7,
      "name": "Rani Jain",
      "age": "31",
      "place": "Rajasthan",
      "problem": "Pregnancy",
      "question":"गर्भावस्था में मेरे स्तन दर्द कर रहे हैं और मुझे क्या करना चाहिए?",
      "answered": "Chat",
      "prescription": "",
      "status": "Completed"
    },
    {
      "sno":8,
      "name": "Sonam Gupta",
      "age": "39",
      "place": "Odisha",
      "problem": "Pregnancy",
      "question":"मैं गर्भावस्था में क्या खाना चाहिए, क्या नहीं कर सकती",
      "answered": "Chat",
      "prescription": "",
      "status": "Completed"
    },
    {
      "sno":9,
      "name": "Jalebi Meena",
      "age": "22",
      "place": "Bihar",
      "problem": "Mensturation",
      "question":"मुझे मासिक धर्म में बहुत भारी रक्तस्राव हुआ, मुझे क्या करना चाहिए?",
      "answered": "Chat",
      "prescription": "",
      "status": "Completed"
    },
    {
      "sno":10,
      "name": "Pooja Munda",
      "age": "16",
      "place": "Bihar",
      "problem": "Puberty",
      "question":"मैं अपने व्यक्तिगत हिस्सों पर बाल प्राप्त कर रही हूँ यह क्या है?",
      "answered": "Chat",
      "prescription": "",
      "status": "Completed"
    }
  ];

 


}
