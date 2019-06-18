import { Component, OnInit } from '@angular/core';
import { RouterModule, Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-pending-answers',
  templateUrl: './pending-answers.component.html',
  styleUrls: ['./pending-answers.component.scss']
})
export class PendingAnswersComponent implements OnInit {
  succesfullyAnsSubmitted=false;
  question: any;
  answers: any;
  arrayOfRecords: any = [];
  constructor(private ac: ActivatedRoute, private router: Router, private authService: AuthService, private toastr: ToastrService) {
    var self = this;
    ac.params.forEach(function (param: any) {
      self.question = param['question'];
    });
  }

  pendingAnswers(form: NgForm) {
    this.authService.pendingAnswers(this.question, this.answers).subscribe(successData => {
      sessionStorage.setItem("Question", this.question);
      let data = successData;
      this.arrayOfRecords.push({ "sno": 1, "question": successData['question'], "answers": successData['answers'], "status": "completed" });
      this.toastr.success(data['message']);
      this.succesfullyAnsSubmitted=true;
      this.answers = "";
      this.router.navigate(['/dashboard']);

    }, errorData => {

    })
  }

  ngOnInit() {
  }

}
