import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {Evolution} from '../../../models/evolution.model';
import {EvolutionService} from '../../../services/evolution.service';
import {QuestionPlayed} from '../../../models/questionPlayed.model';
import {QuestionPlayedService} from '../../../services/questionPlayed.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-quiz-end-info',
  templateUrl: './quiz-end-info.component.html',
  styleUrls: ['./quiz-end-info.component.scss']
})
export class QuizEndInfoComponent implements OnInit {
  questionsPlayed: QuestionPlayed[];
  constructor( public dialog: MatDialog,
               private dialogRef: MatDialogRef<QuizEndInfoComponent>,
               @Inject(MAT_DIALOG_DATA) public evolution: Evolution, private evolutionService: EvolutionService,
               private questionPlayedService: QuestionPlayedService,
               private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.questionsPlayed = this.evolution.questionPlayed;
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
