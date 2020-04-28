import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {Evolution} from '../../../models/evolution.model';
import {EvolutionService} from '../../../services/evolution.service';
import {QuestionPlayed} from '../../../models/questionPlayed.model';
import {QuestionPlayedService} from '../../../services/questionPlayed.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Quiz} from '../../../models/quiz.model';
import {QuizService} from '../../../services/quiz.service';

@Component({
  selector: 'app-quiz-end-info',
  templateUrl: './quiz-end-info.component.html',
  styleUrls: ['./quiz-end-info.component.scss']
})
export class QuizEndInfoComponent implements OnInit {
  questionsPlayed: QuestionPlayed[];
  quiz: Quiz;
  constructor( public dialog: MatDialog,
               private dialogRef: MatDialogRef<QuizEndInfoComponent>,
               @Inject(MAT_DIALOG_DATA) public evolution: Evolution, private evolutionService: EvolutionService,
               private questionPlayedService: QuestionPlayedService,
               private route: ActivatedRoute, private router: Router,
               private quizService: QuizService) { }

  ngOnInit(): void {
    this.questionsPlayed = this.evolution.questionPlayed;
    this.quizService.getQuizById(this.evolution.quizId).subscribe((quiz) => {
      this.quiz = quiz;
    });
  }
  FirstTrialSucceed() {
    let nb = 0;
    // tslint:disable-next-line:prefer-const
    let arrayQues: number[] = [];
    for (const el of this.questionsPlayed) {
      if (el.trials <= 1 && arrayQues.includes(el.idQuestion) === false ) {
        nb = nb + 1;
        arrayQues.push(el.idQuestion);
      }
      arrayQues.push(el.idQuestion);
    }
    return nb;
  }
  AfterFirstTrial() {
    const  nb = this.FirstTrialSucceed();
    return this.quiz.questions.length - nb;
  }

  Pourcentage() {
    const  nb1 = this.FirstTrialSucceed();
    const nb2 = (nb1 * 100) / this.quiz.questions.length;
    return nb2.toFixed(2);
  }
  resultat() {
    const resultat = [ 0 , 0 ];
    for (const question of this.questionsPlayed) {
      if (question.trials <= 1) {
        resultat[0] += 1;
      } else if (+question.trials === 2) {
        resultat[1] += 1;
      }
    }
    return resultat;
  }


  accueil() {
    this.dialogRef.close();
    this.router.navigate([ '/' ]);
  }
  recommencer() {
    this.dialogRef.close();

    this.router.navigate([ '/quiz-do/' + this.evolution.quizId + '/start' , { idPatient: this.evolution.patientId}]);
  }
  changer() {
    this.dialogRef.close();
    this.router.navigate(['/quiz-list', {do: true, idPatient: this.evolution.patientId}]);
  }
}
