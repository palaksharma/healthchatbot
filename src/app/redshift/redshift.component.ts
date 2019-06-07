import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-redshift',
  templateUrl: './redshift.component.html',
  styleUrls: ['./redshift.component.scss']
})
export class RedshiftComponent implements OnInit {
  data = [
    {
      "time": "2:00 am",
      "date": "20th July 2019",
      "link": "https://zoom.us/j/3071238375",
    }
  ];


  constructor() { }

  ngOnInit() {
  }

}
