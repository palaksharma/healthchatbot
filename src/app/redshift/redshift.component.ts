import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-redshift',
  templateUrl: './redshift.component.html',
  styleUrls: ['./redshift.component.scss']
})
export class RedshiftComponent implements OnInit {
  date:any;
  time:any;
  data:any=[]

  constructor() {
     this.date = localStorage.getItem("Date");
     this.time = localStorage.getItem("Time");
     this.data = [
      {
        "time": this.date,
        "date": this.time,
        "link": "https://zoom.us/j/3071238375",
      }
    ];
    console.log(this.data);
   }

  ngOnInit() {
  }

}
