import { HttpClient } from '@angular/common/http';
import { NG_AUTH_TOKEN } from 'app/common/ng-constants';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) {
  }

  /* To generate and get authToken from API endpoints. */
  validateLogin(username: string, password: string) {
    return this.http.post('/validateLogin/', {
      username: username,
      password: password
    });
  }

  pendingAnswers(question: string, answer: string) {
    return this.http.post('/pendingAnswers', {
      question: question,
      answer: answer
    });
  }

  logout() {
    localStorage.removeItem(NG_AUTH_TOKEN);
    this.router.navigate(['/login']);
  }

}
