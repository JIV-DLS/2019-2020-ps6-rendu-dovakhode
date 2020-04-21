import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Evolution} from '../../../models/evolution.model';
import {EvolutionService} from '../../../services/evolution.service';
import {QuizService} from '../../../services/quiz.service';
import {Quiz} from '../../../models/quiz.model';
import {Location} from '@angular/common';
import {QuestionPlayed} from '../../../models/questionPlayed.model';

@Component({
  selector: 'app-quiz-result-display',
  templateUrl: './quiz-result-display.component.html',
  styleUrls: ['./quiz-result-display.component.scss']
})
export class QuizResultDisplayComponent implements OnInit {

  idPatient: number;
  evolTab: Evolution[] = [];
  reverseEvolTab: Evolution[] = [];
  public quiz: Quiz;
  public  nbEssai = 0;
  constructor(private route: ActivatedRoute , private evolutionService: EvolutionService, private quizService: QuizService, private location: Location) { }

  ngOnInit() {
    this.idPatient = +this.route.snapshot.params.id;
    console.log(this.idPatient);
    this.evolutionService.getEvolutionByPatientId(this.idPatient).subscribe((res) => {
      console.log(res);
      this.evolTab = res;
      this.reverseArr(this.evolTab);
    } );

  }
  public back() {
    this.location.back();
  }

  reverseArr(input) {
    for (let i = input.length - 1; i >= 0; i--) {
      this.reverseEvolTab.push(input[i]);
    }
    this.evolTab = this.reverseEvolTab;
  }

  FirstTrialSucceed(evol: Evolution) {
   let nb = 0;
    // tslint:disable-next-line:prefer-const
   let arrayQues: number[] = [];
   for (const el of evol.questionPlayed) {
      if (el.trials <= 1 && arrayQues.includes(el.idQuestion) === false ) {
        nb = nb + 1;
        arrayQues.push(el.idQuestion);
      }
      arrayQues.push(el.idQuestion);
    }
   return nb;
  }


}
