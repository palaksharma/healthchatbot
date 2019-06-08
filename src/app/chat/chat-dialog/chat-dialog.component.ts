import { Component, OnInit } from '@angular/core';
import { ChatService, Message } from '../../chat.service';
import { Observable, of, from } from 'rxjs';
import 'rxjs/add/operator/scan';
import { SpeechRecognitionService } from '../../speech_recognition.service';
import * as $ from 'jquery/dist/jquery.min.js';

@Component({
  selector: 'chat-dialog',
  templateUrl: './chat-dialog.component.html',
  styleUrls: ['./chat-dialog.component.css']
})
export class ChatDialogComponent implements OnInit {
  showSearchButton: boolean;
  speechData: string;
  messages: Observable<Message[]>;
  formValue: string;
  data: any;
  content: any;

  constructor(public chat: ChatService, private speechRecognitionService: SpeechRecognitionService) {
    this.showSearchButton = true;
    this.speechData = "";
    this.chat.conversation.subscribe(val => {
      this.data = val;
      if (this.data.length != 0) {
        this.content = this.data[0].content;
        if (typeof (this.content) == "object") {
          this.templateOfButton();
        }
      }
      else {
        console.log("Data is not present")
      }
    })
  }


  ngOnInit() {
    this.showVoiceRecognition();
    this.messages = this.chat.conversation.asObservable()
    .scan((acc, val) => acc.concat(val));
    console.log(this.messages);
  }


  ngOnDestroy() {
    this.speechRecognitionService.DestroySpeechObject();
  }


  /*Starting of function to create dynamic button as per the response */

  templateOfButton() {
    document.getElementById("showMessage").innerHTML = "";
    for (var i = 0; i < this.content.length; i++) {
      var btn = <HTMLInputElement>document.createElement("BUTTON");   // Create a <button> element
      btn.innerHTML += this.content[i];
      btn.className = "dynamicBtn";
      btn.style.backgroundColor= "#417a7d";
      btn.style.color= "000";
      btn.style.border= "0";
      btn.style.borderRadius= "20px";
      btn.style.width="200px",
      btn.style.padding="10px",
      btn.value = this.content[i];
      btn.id = "options_" + i;
      var id = btn.id;
      let self = this;
      btn.onclick = function (b) {
        var tvalue = (<HTMLInputElement>b.target).value;
        self.formValue = tvalue;

        var option = (<HTMLInputElement>document.getElementById("inputValuetxt")).value;
        option = (<HTMLInputElement>b.target).value;

      };// Insert text
      document.getElementById("showMessage").appendChild(btn);
    }
  }

  /*Ending of function to create dynamic button as per the response */

  /*Starting of a Function to make every template speak */
  showVoiceRecognition() {
    var arr = [];
    this.chat.conversation.subscribe(val => {
      if (val.length != 0) {
        for (var i = 0; i < val.length; i++) {
          if (val[i].sentBy == "bot") {
            arr.push(val[i].content);
            speak();
          }
        }
      }
    })
    var synth = window.speechSynthesis;
    var inputForm = $('form');
    var voiceSelect = $('#select')
    var pitch = $('#pitch');
    var pitchValue = $('.pitch-value');
    var rate = $('#rate');
    var rateValue = $('.rate-value');

    var voices = [];

    function populateVoiceList() {
      voices = synth.getVoices().sort(function (a, b) {
        const aname = a.name.toUpperCase(), bname = b.name.toUpperCase();
        if (aname < bname) return -1;
        else if (aname == bname) return 0;
        else return +1;
      });
      var selectedIndex = voiceSelect[0].selectedIndex < 0 ? 0 : voiceSelect[0].selectedIndex;
      voiceSelect.innerHTML = '';
      for (var i = 0; i < voices.length; i++) {
        var option = document.createElement('option');
        option.textContent = voices[i].name + ' (' + voices[i].lang + ')';

        if (voices[i].default) {
          option.textContent += ' -- DEFAULT';
        }

        option.setAttribute('data-lang', voices[i].lang);
        option.setAttribute('data-name', voices[i].name);
        voiceSelect.append(option);
      }
      voiceSelect.selectedIndex = selectedIndex;
    }

    populateVoiceList();
    if (speechSynthesis.onvoiceschanged !== undefined) {
      speechSynthesis.onvoiceschanged = populateVoiceList;
    }

    function speak() {
      if (synth.speaking) {
        synth.cancel();
        console.error('speechSynthesis.speaking');
        return;
      }
      let data = arr.slice(-1)[0];
      if (data !== '') {
        var utterThis = new SpeechSynthesisUtterance(data);
        utterThis.onend = function (event) {
          console.log('SpeechSynthesisUtterance.onend');
        }
        utterThis.onerror = function (event) {
          console.error('SpeechSynthesisUtterance.onerror');

        }

        //var selectedOption = voiceSelect.children("option:selected")[0].attributes[1].value
        for (var i = 0; i < voices.length; i++) {
          if (voices[i].name === "Google हिन्दी") {
            utterThis.voice = voices[i];
          }
        }

        console.log(utterThis);
        synth.speak(utterThis);
        var amISpeaking = synth.speaking;
        console.log("AmISpeaking", amISpeaking);
        // if(amISpeaking==true){
        //   speechSynthesi;
        // }
      }
    }

    $(".inputValue").change(function (event) {
      event.preventDefault();
      speak();
    });

    //   var timer = setTimeout(function () {   //calls click event after a certain time
    //   speak();
    // }, 100);

    voiceSelect.onchange = function () {
      speak();
    }
  }
  /*Ending of a Function to make every template speak */


  /*Starting of a Function which records voice and display it*/
  activateSpeechSearchMovie(): void {
    this.showSearchButton = false;
    this.speechRecognitionService.record()
      .subscribe(
        //listener
        (value) => {
          this.speechData = value;
          this.formValue = value;
        },
        //errror
        (err) => {
          if (err.error == "no-speech") {
            console.log("--restatring service--");
            this.activateSpeechSearchMovie();
          }
        },
        //completion
        () => {
          this.showSearchButton = true;
          console.log("--complete--");
          this.activateSpeechSearchMovie();
        });
  }
  /*Ending of a Function which records voice and display it*/


  /*Starting of Function to send message to dialog flow */
  sendMessage() {
    this.chat.getResponse(this.formValue).subscribe(val => {
    });
    this.chat.converse(this.formValue);
    this.formValue = '';

  }
  /*Ending of Function to send message to dialog flow */



}