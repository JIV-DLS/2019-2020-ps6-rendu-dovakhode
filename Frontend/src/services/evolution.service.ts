import {HttpClient} from '@angular/common/http';
import {environment} from '../environments/environment';
import {Evolution} from '../models/evolution.model';
import {Observable, of, Subject} from 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar';
import {catchError, tap} from 'rxjs/operators';
import {Quiz} from '../models/quiz.model';
import {Injectable} from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class EvolutionService {
  evolutionProgressValue = new Subject<{did: number, total: number}>();
  evolutionSubject = new Subject<Evolution>();
  evolution = new Evolution();

  constructor(private http: HttpClient, private snack: MatSnackBar) {
  }
  public evolutionUrl = environment.url + '/evolution';
 // evol: Evolution;


  emitEvolution() {
    this.evolutionSubject.next(this.evolution);
  }

  changeEvol(evolution: Evolution) {
   this.evolution = new Evolution();
   this.evolution = evolution;
   this.emitEvolution();

  }
  addEvolution(quiz: Quiz, idPatient: number) {
    const evolution = new Evolution();
    evolution.quizId = quiz.id;
    evolution.quizQuestion = quiz.questions.length;
    evolution.quizDifficulty = quiz.difficulty;
    evolution.quizNom = quiz.label ;
    evolution.patientId = idPatient;
    return this.http.post<Evolution>(this.evolutionUrl, evolution).pipe(
      tap((newAnswer) => {
        console.log('Ajout Reussi');
      }),
      catchError(this.handleError<Evolution>('addEvolution', undefined))
    );

  }
  deleteEvolution(evolution: Evolution): Observable<Evolution>  {
    this.snack.open( environment.snackInformation.operation.loading.delete.quiz, 'close',
      {
        ...environment.snackInformation.loadingDelete
      })
    ;
    return this.http.delete<Evolution>(this.evolutionUrl + '/' + evolution.id).pipe(
      tap((quizDeleted) => {
        console.log('Suppression reussie');
        this.snack.open(environment.snackInformation.operation.succeeded.delete.quiz, 'close',
          {
            ...environment.snackInformation.successForAll
          })
        ;

      }),
      catchError(this.handleError<Evolution>('deleteEvolution', undefined))
    );
  }


  getEvolutionById(id: number): Observable<Evolution> {
    const url = this.evolutionUrl + '/' + id.toString();
    return this.http.get<Evolution>(url).pipe(
      tap((quiz) => {
        console.log('Récupération reussie');
      }),
      catchError(this.handleError<Evolution>('getEvolution', undefined))
    );
  }

  getEvolutionByPatientId(id: number): Observable<Evolution[]> {
    const url = this.evolutionUrl + '/patient/' + id.toString();
    return this.http.get<Evolution[]>(url).pipe(
      tap((quiz) => {
        console.log('Récupération reussie');
      }),
      catchError(this.handleError<Evolution[]>('getEvolution', undefined))
    );
  }
  getAll()  {
    return this.http.get<Evolution[]>(this.evolutionUrl).pipe(
      tap((quiz) => {
        console.log('Récupération reussie');
      }),
      catchError(this.handleError<Evolution[]>('getEvolution', undefined))
    );
  }


  updateEvolution(evolutionToModify: Evolution, id?: number): Observable<Evolution> {

    if (id !== 1) {
      this.snack.open(environment.snackInformation.operation.loading.update.quiz, 'close',
        {
          ...environment.snackInformation.loadingUpdate
        })
      ;
    }

    return this.http.put<Evolution>(this.evolutionUrl  + '/' + evolutionToModify.id, evolutionToModify).pipe(
      tap((createdQuiz) => {
        console.log('Modification reussie');
        if (id !== 1) {
          this.snack.open(environment.snackInformation.operation.succeeded.update.quiz, 'close',
            {
              ...environment.snackInformation.successForAll
            })
          ;
        }
      }),
      catchError(this.handleError<Evolution>('updateEvolution', undefined))
    );
  }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      switch (operation) {
        case 'addAnswer':
          // this.bdcsState = false;
          this.snack.open('❌ Echec de l\'enregistrement de la réponse...', 'close',
            {
              ...environment.snackInformation.errorForAll
            })
          ;
          break;
        case 'deleteAnswer':
          // this.bdcsState = false;
          this.snack.open('❌ Echec de la suppression de la réponse...', 'close',
            {
              ...environment.snackInformation.errorForAll
            })
          ;
          break;
        case 'updateAnswer':
          // this.bdcsState = false;
          this.snack.open('❌ Echec de la modification de la réponse ...', 'close',
            {
              ...environment.snackInformation.errorForAll
            })
          ;
          break;
        case 'getAnswer':
          // this.bdcsState = false;
          this.snack.open('❌ Impossible de charger les réponses', 'close',
            {
              ...environment.snackInformation.errorForAll
            })
          ;
          break;

        case 'getAnswerById':
          // this.bdcsState = false;
          this.snack.open('❌ Impossible de charger la réponse', 'close',
            {
              ...environment.snackInformation.errorForAll
            })
          ;
          break;
        /*case 'getBdc':
          this.bdcState = false;
          break;
        case 'addBdc':
          this.bdcAddState = false;
          break;
        case 'deleteBdc':
          this.bdcDeleteState = false;
          break;
        case 'updateBdc':
          console.log('url');
          this.bdcUpdateState = false;
          break;*/
      }
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      // this.logRefresh(idMessage, `${operation} failed: ${error.message}`, 'danger');

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  FirstTrialSucceed(questionsPlayed) {
    let nb = 0;
    // tslint:disable-next-line:prefer-const
    let arrayQues: number[] = [];
    for (const el of questionsPlayed) {
      if (el.trials <= 1 && arrayQues.includes(el.idQuestion) === false ) {
        nb = nb + 1;
        arrayQues.push(el.idQuestion);
      }
      arrayQues.push(el.idQuestion);
    }
    return nb;
  }

  Pourcentage(questionPlayed, quiz) {
    const  nb1 = this.FirstTrialSucceed(questionPlayed);
    const nb2 = (nb1 * 100) / quiz.questions.length;
    return nb2.toFixed(2);
  }
}
