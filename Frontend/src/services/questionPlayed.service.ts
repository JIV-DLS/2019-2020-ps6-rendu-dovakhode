import {HttpClient} from '@angular/common/http';
import {MatSnackBar} from '@angular/material/snack-bar';
import {environment} from '../environments/environment';
import {Question} from '../models/question.model';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {QuestionPlayed} from '../models/questionPlayed.model';
import {Injectable} from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class QuestionPlayedService {
  constructor(private http: HttpClient, private snack: MatSnackBar) {
  }

  questionplayedUrl(evolutionId) {
    return environment.url + '/evolution/' + evolutionId + '/questionPlayed';
  }

  addQuestionPlayed(idQuestion: number, evolutionId: number, trial: number): Observable<QuestionPlayed> {

    const question = new QuestionPlayed();
    question.idQuestion = idQuestion;
    question.trials = trial;
    console.log(question);
    return this.http.post<QuestionPlayed>(this.questionplayedUrl(evolutionId), question).pipe(

      tap((newQuestion: QuestionPlayed) => {

      }),
      catchError(this.handleError<QuestionPlayed>('addQuestionPlayed', undefined))
    );
  }


  deleteQuestionPlayed(question: QuestionPlayed): Observable<QuestionPlayed>  {

    return this.http.delete<QuestionPlayed>(this.questionplayedUrl(question.EvolutionId) + '/' + question.id).pipe(
      tap((questionDeleted) => {
        console.log('Suppression reussie');

      }),
      catchError(this.handleError<QuestionPlayed>('deleteQuestionPlayed', undefined))
    );
  }


  getQuestionPlayed( evolutionId: string): Observable<QuestionPlayed[]>  {
    return this.http.get<QuestionPlayed[]>(this.questionplayedUrl(evolutionId)).pipe(
      tap((question) => {
        console.log('Récupération reussie');
      }),
      catchError(this.handleError<QuestionPlayed[]>('getQuestionPlayed', undefined))
    );
  }

  /*getQuestionByIndex(index: number) {
    return index >= 0 && index < this.questions.length ? this.questions[index] : null;
  }*/
  getQuestionById(id: number, evolutionId: string): Observable<QuestionPlayed> {
    return this.http.get<QuestionPlayed>(this.questionplayedUrl(evolutionId) + '/' + id.toString()).pipe(
      tap((question) => {
        console.log('Récupération reussie');
      }),
      catchError(this.handleError<QuestionPlayed>('getQuestionPlayedById', undefined))
    );
  }

  /* getQuestion() {
     return this.questions;
   }*/
  updateQuestion(questionToModify: QuestionPlayed): Observable<QuestionPlayed> {
    // this.questions[+questionToModify.id - 1] = questionToModify;
    // @ts-ignore
    // @ts-ignore
    this.snack.open(  ...environment.snackInformation.operation.loading.update, 'close',
      {
        ...environment.snackInformation.loadingUpdate

      })
    ;
    return this.http.put<QuestionPlayed>
    (this.questionplayedUrl(questionToModify.EvolutionId)  + '/' + questionToModify.id, questionToModify).pipe(
      tap((question) => {
        // this.questions[+questionToModify.id - 1] = questionToModify;
        console.log('Modification de la question éffectuée avec succès');
        this.snack.open( environment.snackInformation.operation.succeeded.update.question, 'close',
          {
            ...environment.snackInformation.successForAll
          })
        ;
      }),
      catchError(this.handleError<QuestionPlayed>('updateQuestion', undefined))
    );
  }
  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   * @param idMessage displaying message id
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      switch (operation) {
        case 'addQuestion':
          // this.bdcsState = false;
          this.snack.open('❌ Echec de l\'enregistrement de la question...', 'close',
            {
              ...environment.snackInformation.errorForAll
            })
          ;
          break;
        case 'deleteQuestion':
          // this.bdcsState = false;
          this.snack.open('❌ Echec de la suppression de la question...', 'close',
            {
              ...environment.snackInformation.errorForAll
            })
          ;
          break;
        case 'updateQuestion':
          // this.bdcsState = false;
          this.snack.open('❌ Echec de la modification de la question ...', 'close',
            {
              ...environment.snackInformation.errorForAll
            })
          ;
          break;
        case 'getQuestion':
          // this.bdcsState = false;
          this.snack.open('❌ Impossible de charger les questions', 'close',
            {
              ...environment.snackInformation.errorForAll
            })
          ;
          break;

        case 'getQuestionById':
          // this.bdcsState = false;
          this.snack.open('❌ Impossible de charger la question', 'close',
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
