import {HttpClient} from '@angular/common/http';
import {environment} from '../environments/environment';
import {Evolution} from '../models/evolution.model';
import {Observable, of, Subject} from 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Answer} from '../models/answer.model';
import {catchError, tap} from 'rxjs/operators';
import {Question} from '../models/question.model';
import {Quiz} from '../models/quiz.model';
import {Injectable} from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class EvolutionService {
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
   console.log('evol du service ' + this.evolution.id);
  }
  addEvolution(idQuiz: string) {
    const evolution = new Evolution();
    evolution.quizId = parseInt(idQuiz, 10);
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


  updateEvolution(evolutionToModify: Evolution): Observable<Evolution> {
    this.snack.open( environment.snackInformation.operation.loading.update.quiz, 'close',
      {
        ...environment.snackInformation.loadingUpdate
      })
    ;

    return this.http.put<Evolution>(this.evolutionUrl  + '/' + evolutionToModify.id, evolutionToModify).pipe(
      tap((createdQuiz) => {
        console.log('Modification reussie');
        this.snack.open( environment.snackInformation.operation.succeeded.update.quiz, 'close',
          {
            ...environment.snackInformation.successForAll
          })
        ;
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
}
