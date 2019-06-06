import { Component, OnInit } from '@angular/core';

declare interface TableData {
    headerRow: string[];
    dataRows: string[][];
}

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css']
})
export class JobComponent implements OnInit {
    data = [
        {
          "name": "Parul Rastogi",
          "age": "13",
          "place": "Maharashtra",
          "problem": "Mensturation",
          "answered": "Chat",
          "prescription": "",
          "status": "Completed"
        },
        {
          "name": "Richa Rastogi",
          "age": "13",
          "place": "Maharashtra",
          "problem": "Mensturation",
          "answered": "Chat",
          "prescription": "",
          "status": "Completed"
        }
      ];
    
      labels = {
        report_name: 'report_name',
        flag: 'flag',
        last_modified: 'last_modified',
        start_time: 'start_time',
        end_time: 'end_time',
        target_initial_count: 'target_initial_count',
        target_final_count: 'target_final_count'
      };

  constructor() { }

  ngOnInit() {
  }

}
