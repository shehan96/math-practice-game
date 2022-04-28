import { Component, OnInit, ViewChild } from '@angular/core';
import { interval, Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  // define variables
  number_one: number = 0;
  number_two: number = 0;
  user_input: any = {
    answer: null
  };
  @ViewChild("userInput") userInput: any;
  correctAnswer: boolean = false;
  startTime: Date;
  ellapsedTime = '00:00';
  timer: Observable<number>;
  diff: number;
  avarageTime: number;
  totalTime: number = 0;
  questionNumber: number = 1;
  showAvarageTime = '00:00';
  timerSubscription : any;

  constructor() { }

  ngOnInit(): void {
    // init values
    this.generateRandomNumber();
    this.startTime = new Date();
    this.ellapsedTime = '00:00';
    this.startTimer();
  }

  ngAfterViewInit() {
    this.userInput.nativeElement.focus();
  }

  ngDestroy(){
    this.timerSubscription.unsubscribe();
  }

  // method to generate random number 0-9
  generateRandomNumber() {
    this.number_one = Math.floor(Math.random() * 10);
    this.number_two = Math.floor(Math.random() * 10);
  }

  // method to calculate after press enter
  cal() {
    this.stopTimer();
    var totalVal = this.number_one + this.number_two;
    // correct answer
    if (totalVal == this.user_input.answer) {
      // show correct message
      this.correctAnswer = true;
      var showBtn = document.getElementById("showResponseButton");
      if (showBtn != null) {
        showBtn.click();
      }
      // clear numbers
      this.generateRandomNumber();
      // clear user input
      this.user_input.answer = null;
    }
    // incorrect answer
    else {
      // show wrong message
      this.correctAnswer = false;
      var showBtn = document.getElementById("showResponseButton");
      if (showBtn != null) {
        showBtn.click();
      }
      // clear user input
      this.user_input.answer = null;
    }
  }

  // method to contuine the game
  continueBtn() {
    var closeBtn = document.getElementById("closeResponseButton");
    if (closeBtn != null) {
      closeBtn.click();
    }
    this.userInput.nativeElement.focus();
    // increase question number
    this.questionNumber = this.questionNumber + 1;
    // re start timer again
    this.startTimer();
  }

  // method to try again the game
  tryAgainBtn(){
    var closeBtn = document.getElementById("closeResponseButton");
    if (closeBtn != null) {
      closeBtn.click();
    }
    this.userInput.nativeElement.focus();
    // re start timer again
    this.startTimer();
  }

  // method to manage timer
  tick() {
    const now = new Date();
    this.diff = (now.getTime() - this.startTime.getTime()) / 1000;
    this.ellapsedTime = this.parseTime(this.diff);
  }

  parseTime(totalSeconds: number) {
    let mins: string | number = Math.floor(totalSeconds / 60);
    let secs: string | number = Math.round(totalSeconds % 60);
    mins = (mins < 10 ? '0' : '') + mins;
    secs = (secs < 10 ? '0' : '') + secs;
    return `${mins}:${secs}`;
  }

  // method to stop timmer
  stopTimer(){
    this.totalTime = this.totalTime + this.diff;
    this.avarageTime = this.totalTime / this.questionNumber;
    this.showAvarageTime = this.parseTime(this.avarageTime);
    this.timerSubscription.unsubscribe();
  }

  // method to start timmer
  startTimer(){
    this.startTime = new Date();
    this.timer = interval(1000);
    this.timerSubscription = this.timer.subscribe((x : any) => {
      this.tick();
    });
  }

}
