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
    return this.http.post<Answer>(this.answerUrl(answer.questionId, answer.quizId), answer).pipe(
      tap((newAnswer) => {
        console.log('Ajout Reussi');
        this.snack.open('Enrégistrement en cours...', 'close',
          {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: 'red-snackbar'
          })
        ;
      }),
      catchError(this.handleError<Question>('PostAnswer', undefined))
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
    return this.http.get<Answer>(this.answerUrl(answer.questionId, answer.quizId) + '/' + answer.id).pipe(
      tap((theanswer) => {
        console.log('Récupération Reussie');
        this.snack.open('Supression encours...', 'close',
          {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: 'red-snackbar'
          })
        ;
      }),
      catchError(this.handleError<Question>('deleteAnswer', undefined))
    );
  }

  UpdateAnswer( answer: Answer) {
    return this.http.put<Answer>(this.answerUrl(answer.questionId, answer.quizId) + '/' + answer.id, answer).pipe(
      tap((theanswer) => {
        console.log('Modification Reussie');
        this.snack.open('Modification en cours...', 'close',
          {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: 'red-snackbar'
          })
        ;
      }),
      catchError(this.handleError<Question>('getAnswer', undefined))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      // this.logRefresh(idMessage, `${operation} failed: ${error.message}`, 'danger');

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
