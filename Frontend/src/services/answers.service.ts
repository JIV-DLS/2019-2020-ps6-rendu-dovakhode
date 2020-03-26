import {HttpClient} from '@angular/common/http';
import {environment} from '../environments/environment';
import {Answer} from '../models/answer.model';
import {catchError, tap} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {Question} from '../models/question.model';
import {MatSnackBar} from '@angular/material/snack-bar';
export class AnswersService {
  constructor(private http: HttpClient, private snack: MatSnackBar ) {
  }

  answerUrl(questionId, quizId) {
    return environment.url + '/' + quizId.toString() + '/questions' + '/' + questionId.toString() + '/answers';
  }

  addAnswer(answer: Answer) {

        this.snack.open('Enrégistrement de la réponse en cours...', 'close',
          {
            duration: 3000,
            horizontalPosition: environment.snackData.horizontalPosition,
            verticalPosition:  environment.snackData.verticalPosition,
          })
        ;
        return this.http.post<Answer>(this.answerUrl(answer.questionId, answer.quizId), answer).pipe(
      tap((newAnswer) => {
        console.log('Ajout Reussi');
        this.snack.open('Enrégistrement de la réponse éffectuée avec succès...', 'close',
          {
            duration: environment.snackData.duration,
            horizontalPosition:  environment.snackData.horizontalPosition,
            verticalPosition:  environment.snackData.verticalPosition,
            panelClass: ['green-snackbar']
          })
        ;
      }),
      catchError(this.handleError<Question>('addAnswer', undefined))
    );
  }
  getAnswerById(id: number , quizId: string , questionId: string) {
    return this.http.get<Answer>(this.answerUrl(questionId, quizId) + '/' + id.toString()).pipe(
      tap((answer) => {
        console.log('Récupération par Id Reussie');
      }),
      catchError(this.handleError<Question>('getAnswerById', undefined))
    );
  }
  getAnswer( quizId: string , questionId: string) {
    return this.http.get<Answer[]>(this.answerUrl(questionId, quizId)).pipe(
      tap((answer) => {
        console.log('Récupération Reussie');
      }),
      catchError(this.handleError<Question>('getAnswer', undefined))
    );
  }

  deleteAnswer( answer: Answer) {
    this.snack.open('Supression de la question en cours...', 'close',
      {
        duration: environment.snackData.duration,
        horizontalPosition:  environment.snackData.horizontalPosition,
        verticalPosition:  environment.snackData.verticalPosition,
        panelClass: ['yellow-snackbar']
      })
    ;
    return this.http.delete<Answer>(this.answerUrl(answer.questionId, answer.quizId) + '/' + answer.id).pipe(
      tap((theanswer) => {
        console.log('Récupération Reussie');
        this.snack.open('Supression éffectuée avec succès avec succès', 'close',
          {
            duration: environment.snackData.duration,
            horizontalPosition:  environment.snackData.horizontalPosition,
            verticalPosition:  environment.snackData.verticalPosition,
            panelClass: ['green-snackbar']
          })
        ;
      }),
      catchError(this.handleError<Question>('deleteAnswer', undefined))
    );
  }

  UpdateAnswer( answer: Answer) {
    this.snack.open('Modification de la réponse en cours...', 'close',
      {
        duration: environment.snackData.duration,
        horizontalPosition:  environment.snackData.horizontalPosition,
        verticalPosition:  environment.snackData.verticalPosition,
        panelClass: ['blue-snackbar']
      })
    ;
    return this.http.put<Answer>(this.answerUrl(answer.questionId, answer.quizId) + '/' + answer.id, answer).pipe(
      tap((theanswer) => {
        console.log('Modification Reussie');
        this.snack.open('Modification de la réponse éffectuée avec succès', 'close',
          {
            duration: environment.snackData.duration,
            horizontalPosition:  environment.snackData.horizontalPosition,
            verticalPosition:  environment.snackData.verticalPosition,
            panelClass: ['green-snackbar']
          })
        ;
      }),
      catchError(this.handleError<Question>('UpdateAnswer', undefined))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      switch (operation) {
        case 'addAnswer':
          // this.bdcsState = false;
          this.snack.open('Echec de l\'enregistrement de la réponse...', 'close',
            {
              duration: environment.snackData.duration,
              horizontalPosition: environment.snackData.horizontalPosition,
              verticalPosition: environment.snackData.verticalPosition,
              panelClass: ['red-snackbar']
            })
          ;
          break;
        case 'deleteAnswer':
          // this.bdcsState = false;
          this.snack.open('Echec de la suppression de la réponse...', 'close',
            {
              duration: environment.snackData.duration,
              horizontalPosition: environment.snackData.horizontalPosition,
              verticalPosition: environment.snackData.verticalPosition,
              panelClass: ['red-snackbar']
            })
          ;
          break;
        case 'updateAnswer':
          // this.bdcsState = false;
          this.snack.open('Echec de la modification de la réponse ...', 'close',
            {
              duration: environment.snackData.duration,
              horizontalPosition: environment.snackData.horizontalPosition,
              verticalPosition: environment.snackData.verticalPosition,
              panelClass: ['red-snackbar']
            })
          ;
          break;
        case 'getAnswer':
          // this.bdcsState = false;
          this.snack.open('Impossible de charger les réponses', 'close',
            {
              duration: environment.snackData.duration,
              horizontalPosition: environment.snackData.horizontalPosition,
              verticalPosition: environment.snackData.verticalPosition,
              panelClass: ['red-snackbar']
            })
          ;
          break;

        case 'getAnswerById':
          // this.bdcsState = false;
          this.snack.open('Impossible de charger la réponse', 'close',
            {
              duration: environment.snackData.duration,
              horizontalPosition: environment.snackData.horizontalPosition,
              verticalPosition: environment.snackData.verticalPosition,
              panelClass: ['red-snackbar']
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
