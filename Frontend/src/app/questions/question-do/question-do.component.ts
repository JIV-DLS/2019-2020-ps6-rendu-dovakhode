import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {Question} from '../../../models/question.model';
import {DEFAULT_QUESTION} from '../../../mocks/question-list.mock';
import {MatDialog} from '@angular/material/dialog';
import {NextQuestionComponent} from '../next-question/next-question.component';
import {Evolution} from '../../../models/evolution.model';
import {Router} from '@angular/router';
import {EvolutionService} from '../../../services/evolution.service';

@Component({
  selector: 'app-question-do',
  templateUrl: './question-do.component.html',
  styleUrls: ['./question-do.component.scss']
})
export class QuestionDoComponent implements OnInit, OnChanges  {
  @Input()
  progression: {did: number, total: number};
  quit: number;
  @Input() question: Question = DEFAULT_QUESTION;
  @Input() evolution: Evolution ;
  trials: number;
  @Output()
  next: EventEmitter<number> = new EventEmitter<number>();
  indicationClass = 'animate';
  constructor( public dialog: MatDialog, private router: Router, private evolutionService: EvolutionService,
  ) { }

  ngOnInit() {
    this.quit = 0;
    this.trials = 0;
  }

  @HostListener('window:keyup', ['$event'])
  onKey(e: any) {
    if (e.key === 'Escape') {
      this.quit += 1;
      if (this.quit >= 2) {
        this.quit = 0;
        this.quitter();
      }
    }
  }
  quitter() {
    console.log(this.progression);
    // tslint:disable-next-line:max-line-length
    if (confirm((this.progression.did > 0 ? (this.progression.did + ' ' + (this.progression.did > 1 ? 'questions jouées' : 'question joué') + ' sur ' + this.progression.total + ' .') : 'Il reste ' + this.progression.total + ' questions .') +
      '\nVoulez-vous vraiment retourner au choix de quiz?')) {
      this.router.navigate(['/quiz-list', {do: true, idPatient: this.evolution.patientId}]);
    }
  }
  nextQuestion(next: boolean) {
    if (next) {
      this.quit = 0;
      const dialogRef = this.dialog.open(NextQuestionComponent, {
        width: '950px',
        maxHeight: '500px',
        disableClose: true,
      });
      dialogRef.afterClosed().subscribe(result => {
        this.next.emit(this.trials);
      });
    }
  }

  cliked() {
    this.trials++;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.indicationClass = '';
    setTimeout(() =>    this.indicationClass = 'animate'
      , 1000);
    this.trials = 0;
    console.log(changes);
  }
}
