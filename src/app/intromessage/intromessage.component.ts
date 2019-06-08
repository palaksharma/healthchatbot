import { Component, OnInit } from '@angular/core';
import { Observable, of, from } from 'rxjs';
import 'rxjs/add/operator/scan';
import { SpeechRecognitionService } from '../speech_recognition.service';
import * as $ from 'jquery/dist/jquery.min.js';
import { Router } from '@angular/router';

@Component({
  selector: 'app-intromessage',
  templateUrl: './intromessage.component.html',
  styleUrls: ['./intromessage.component.css']
})
export class IntromessageComponent implements OnInit {
  start: boolean = false;
  introIsCompleted: any = false;
  startScreen: any = true;

  constructor(private router: Router) {
  }

  ngOnInit() {
    this.introMessage();
  }

  /* Starting of Function to make intro message speak */
  introMessage() {
    var synth1 = window.speechSynthesis;
    var voiceSelect1 = $('#select1')
    var voices1 = [];


    function populateVoiceList1() {
      voices1 = synth1.getVoices().sort(function (a, b) {
        const aname = a.name.toUpperCase(), bname = b.name.toUpperCase();
        if (aname < bname) return -1;
        else if (aname == bname) return 0;
        else return +1;
      });
      var selectedIndex = voiceSelect1[0].selectedIndex < 0 ? 0 : voiceSelect1[0].selectedIndex;
      voiceSelect1.innerHTML = '';
      for (var i = 0; i < voices1.length; i++) {
        var option = document.createElement('option');
        option.textContent = voices1[i].name + ' (' + voices1[i].lang + ')';

        if (voices1[i].default) {
          option.textContent += ' -- DEFAULT';
        }

        option.setAttribute('data-lang', voices1[i].lang);
        option.setAttribute('data-name', voices1[i].name);
        voiceSelect1.append(option);
      }
      voiceSelect1.selectedIndex = selectedIndex;
    }

    populateVoiceList1();
    if (speechSynthesis.onvoiceschanged !== undefined) {
      speechSynthesis.onvoiceschanged = populateVoiceList1;
    }

    function introSpeak() {
      if (synth1.speaking) {
        console.error('speechSynthesis.speaking');
        return;
      }

      var utterThis = new SpeechSynthesisUtterance("नमस्ते, मैं अंजू हूं और मैं यहां आपको जानकारी प्रदान करने और उन विषयों पर शिक्षित करने में मदद कर राही हूं जो आपको स्वस्थ जीवन जीने में मदद करेंगे। आप मुझसे बिना किसी डर के कुछ भी बात कर सकते हैं। मैं आपका सबसे अच्छी सहेली हूं और आपकी देखभाल करने के लिए यहां हूं।");
      utterThis.onend = function (event) {
        console.log('SpeechSynthesisUtterance.onend');
         var t = event.timeStamp - t;
          console.log(event.timeStamp);
          console.log((t / 1000) + " seconds");
      }
      utterThis.onerror = function (event) {
        console.error('SpeechSynthesisUtterance.onerror');
      }

      // var selectedOption = voiceSelect.children("option:selected")[0].attributes[1].value
      for (var i = 0; i < voices1.length; i++) {
        if (voices1[i].name === "Google हिन्दी") {
          utterThis.voice = voices1[i];
        }
      }
      utterThis.rate = 0.9;
      console.log(utterThis);
      synth1.speak(utterThis);
      //synth1.cancel();
    
    }
    // $(document).ready(function () {
    //   console.log("ready");
    //   introSpeak();
    // });

    var timer = setTimeout(function () {   //calls click event after a certain time
      introSpeak();
    }, 100);

    voiceSelect1.onchange = function () {
    clearTimeout(timer);
      introSpeak();
    }
  }
  /* Ending of Function to make intro message speak */

  showTemplate() {
    // this.router.navigate(['chat']);
    this.introIsCompleted = true;
    this.startScreen = false;
  }



}
