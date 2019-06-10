import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ChatService, Message } from '../../chat.service';
import { Observable, of, from } from 'rxjs';
import 'rxjs/add/operator/scan';
import { SpeechRecognitionService } from '../../speech_recognition.service';
import * as $ from 'jquery/dist/jquery.min.js';
import Keyboard from "simple-keyboard";
import layout from "simple-keyboard-layouts/build/layouts/hindi";

@Component({
  selector: 'chat-dialog',
  templateUrl: './chat-dialog.component.html',
  styleUrls: [ './chat-dialog.component.css']
})
export class ChatDialogComponent implements OnInit,AfterViewInit {
  showSearchButton: boolean;
  speechData: string;
  keyboardIsHide:any=false;
  messages: Observable<Message[]>;
  formValue: string;
  data: any;
  content: any;

  value = "";
  keyboard: Keyboard;


  ngAfterViewInit() {
    this.keyboard = new Keyboard({
      onChange: input => this.onChange(input),
      onKeyPress: button => this.onKeyPress(button),
      layout: layout
    });
  }

  onChange = (input: string) => {
    this.formValue = input;
    console.log("Input changed", input);
  };

  onKeyPress = (button: string) => {
    console.log("Button pressed", button);

    /**
     * If you want to handle the shift and caps lock buttons
     */
    if (button === "{shift}" || button === "{lock}") this.handleShift();
  };

  onInputChange = (event: any) => {
    this.keyboard.setInput(event.target.value);
  };

  handleShift = () => {
    let currentLayout = this.keyboard.options.layoutName;
    let shiftToggle = currentLayout === "default" ? "shift" : "default";

    this.keyboard.setOptions({
      layoutName: shiftToggle
    });
  };

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
      console.log(voices);
      var result = voices.filter(obj => {
        return obj.lang == 'hi-IN'
      });
      console.log(result);
      if(result.length > 0) {
        console.log(result[0]);
        var selectedIndex = result[0].selectedIndex < 0 ? 0 : result[0].selectedIndex;
        voiceSelect.innerHTML = '';
        var option = document.createElement('option');
        option.textContent = result[0].name + ' (' + result[0].lang + ')';

        if (result[0].default) {
          option.textContent += ' -- DEFAULT';
        }

        option.setAttribute('data-lang', result[0].lang);
        option.setAttribute('data-name', result[0].name);
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
      console.log(data);
      if (data !== '') {
        var utterThis = new SpeechSynthesisUtterance(data);
        utterThis.onend = function (event) {
          console.log('SpeechSynthesisUtterance.onend');
          (<HTMLElement>document.getElementsByClassName("from")[3]).style.display="none";
          (<HTMLElement>document.getElementsByClassName("from")[5]).style.display="none";
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
      }
    }

    $(".inputValue").change(function (event) {
      event.preventDefault();
      speak();
    });

    voiceSelect.onchange = function () {
      speak();
    }
  }
  /*Ending of a Function to make every template speak */


  /*Starting of a Function which records voice and display it*/
  activateSpeechSearchMovie(): void {
    console.log("INN:::")
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
  myfunc()
 { 
  console.log("document.getElementsByClassName");
  (<HTMLElement>document.getElementsByClassName("from")[3]).style.display="none"
   // document.getElementsByClassName("from")[5].style.display="none"
 }
}