import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

import { ApiAiClient } from 'api-ai-javascript/es6/ApiAiClient';

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HttpClient } from '@angular/common/http';
import { Http, Headers } from '@angular/http';

// Message class for displaying messages in the component
export class Message {
  constructor(public content: string, public sentBy: string) { }
}

@Injectable()
export class ChatService {
  token = "680f27497a674e2389fc3bf44f5471f5";
  client = new ApiAiClient({ accessToken: this.token });

  conversation = new BehaviorSubject<Message[]>([]);

  private baseURL: string = "https://api.dialogflow.com/v1/intents?v=20150910";

  constructor(private http: Http) { }

  public getResponse(query: string) {
    return this.http
      .get(`${this.baseURL}`, { headers: this.getHeaders() })
      .map(res => {
        return res.json()
      })
  }


  public getHeaders() {
    let headers = new Headers();
    headers.append('Authorization', `Bearer ${this.token}`);
    headers.append('Content-Type', 'application/json')
    return headers;
  }

  // Sends and receives messages via DialogFlow
  converse(msg: string) {
    const userMessage = new Message(msg, 'user');
    this.update(userMessage);

    return this.client.textRequest(msg)
      .then(res => {
        if (res.result.fulfillment.messages[0].speech) {
          var speech = res.result.fulfillment.messages[0].speech;
          if(res.result.parameters.DateofAppointment !="" && res.result.parameters.TimeOfAppointment != ""){
            localStorage.setItem("Date", res.result.parameters.DateofAppointment);
            localStorage.setItem("Time", res.result.parameters.TimeOfAppointment);
          }
          const botMessage = new Message(speech, 'bot');
          this.update(botMessage);
          document.getElementById("showMessage").innerHTML = "";
        } else {
          var speech= res.result.fulfillment.messages[1].speech;
          const botMessage = new Message(speech, 'bot');
          this.update(botMessage);
          var s = res.result.fulfillment.messages[0].payload.data;
          const botMessageOp = new Message(s, 'bot');
          this.update(botMessageOp);
        }
      });
  }




  // Adds message to source
  update(msg: Message) {
    this.conversation.next([msg]);
  }

}