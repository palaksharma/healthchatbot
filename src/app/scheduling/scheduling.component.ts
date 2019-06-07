import { Component, OnInit , TemplateRef , ViewChild, AfterViewInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ChatService, Message } from '../chat.service';
import * as $ from 'jquery/dist/jquery.min.js';
import { Observable, of, from } from 'rxjs';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { SpeechRecognitionService } from '../speech_recognition.service';
@Component({
  selector: 'app-scheduling',
  templateUrl: './scheduling.component.html',
  styleUrls: ['./scheduling.component.css']
})
export class SchedulingComponent implements OnInit{
  token:any;
  data:any;
  messages1: Observable<Message[]>;
  formValue1: string;
  @ViewChild('template')
  private msgTempRef : TemplateRef<any>
  modalRef: BsModalRef;
  afuConfig = {
    multiple: false,
    formatsAllowed: ".jpg,.png",
    maxSize: "1",
    uploadAPI:  {
      url:"https://example-file-upload-api",
      headers: {
     "Content-Type" : "text/plain;charset=UTF-8",
     "Authorization" : `Bearer ${this.token}`
      },
     afterUploadMsg_success: 'Successfully Uploaded !',
    }
  }

  constructor(private modalService: BsModalService,public chat: ChatService, private speechRecognitionService: SpeechRecognitionService) {
    this.token=localStorage.getItem("token");
  }

 
  ngOnInit(){
    this.showVoiceRecognition()
    this.modalRef = this.modalService.show(this.msgTempRef);
      this.messages1 = this.chat.conversation.asObservable()
      .scan((acc, val) => acc.concat(val));
  }
  
  /*Starting of a Function to make every template speak */
  showVoiceRecognition() {
    var arr=[];
    this.chat.conversation.subscribe(val => {
      if(val.length != 0){
        for(var i = 0 ; i <val.length ; i++){
          if(val[i].sentBy=="bot"){
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
        return;
      }
      let data =arr.slice(-1)[0];
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
          if (voices[i].name ==="Google हिन्दी") {
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

  sendMessage() {
    this.chat.converse(this.formValue1);
    this.formValue1 = '';
    console.log(this.formValue1);
  }
}
