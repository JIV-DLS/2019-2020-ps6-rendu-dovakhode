import {Injectable, OnInit} from '@angular/core';
import {BehaviorSubject, Observable, of} from 'rxjs';
import { Question } from '../models/question.model';
import {HttpClient} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';
import {environment} from '../environments/environment';
import deleteProperty = Reflect.deleteProperty;
import {MatSnackBar} from '@angular/material/snack-bar';


@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private http: HttpClient, private snack: MatSnackBar) {
  }
  /**
   * Services Documentation:
   * https://angular.io/docs/ts/latest/tutorial/toh-pt4.html
   */

  /**
   * The list of question.
   * The list is retrieved from the mock.
   */
 // private questions: Question[] = [];


  /**
   * Observable which contains the list of the question.
   * Naming convention: Add '$' at the end of the variable name to highlight it as an Observable.
   */
  // public questions$: BehaviorSubject<Question[]> = new BehaviorSubject(this.questions);
  index: number;
  // url = 'https://api.myjson.com/bins/13ajhy';
  questionUrl(quizId) {
    return environment.url + '/' + quizId + '/questions';
  }

  addQuestion(question: Question): Observable<Question> {
    const questions = question.answers;
    deleteProperty(question, 'answers');
    console.log(question);
    return this.http.post<Question>(this.questionUrl(question.quizId), question).pipe(

      tap((newQuestion: Question) => {
        this.snack.dismiss();
        this.snack.open('Enrégistrement en cours...', 'close',
          {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: 'red-snackbar'
          })
        ;
         }),
      catchError(this.handleError<Question>('addQuestion', undefined))
    );
  }
  /*addQuestions(questions: Question[], quizId: string): BehaviorSubject<Question[]> {
    const newQuestions = [];
    const newQuestions$ = new BehaviorSubject(questions);
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < questions.length; i++) {
      this.addQuestion( questions[i], quizId).subscribe((question) => {
         newQuestions.push(question);
         newQuestions$.next(newQuestions);
      });
    }
    return newQuestions$;
  }*/
  updateQuestions(questions: Question[], quizId: string): BehaviorSubject<Question[]> {
    const updatedQuestions = [];
    // tslint:disable-next-line:prefer-const
    let updatedQuestions$: BehaviorSubject<Question[]>;
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < questions.length; i++) {
      this.updateQuestion( questions[i]).subscribe((updatedQuestion) => {
         updatedQuestions.push(updatedQuestion);
         updatedQuestions$.next(updatedQuestions);
      });
    }
    return updatedQuestions$;
  }

  deleteQuestion(question: Question): Observable<Question>  {
   return this.http.delete<Question>(this.questionUrl(question.quizId) + '/' + question.id).pipe(
      tap((questionDeleted) => {
       console.log('Suppression reussie');
       this.snack.open('Suppression en cours...', 'close',
          {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: 'red-snackbar'
          })
        ;
      }),
     catchError(this.handleError<Question>('deleteQuestion', undefined))
   );
  }

  setQuestionsFromUrl( quizId: string) {
    this.http.get<Question[]>(this.questionUrl(quizId)).subscribe(
      (question) => {
       // this.questions = question;
        // this.questions$.next(this.questions);
      }
    );
  }
  getQuestion( quizId: string): Observable<Question[]>  {
    return this.http.get<Question[]>(this.questionUrl(quizId)).pipe(
      tap((question) => {
       console.log('Récupération reussie');
      }),
      catchError(this.handleError<Question[]>('getQuestion', undefined))
    );
  }

  /*getQuestionByIndex(index: number) {
    return index >= 0 && index < this.questions.length ? this.questions[index] : null;
  }*/
  getQuestionById(id: number, quizId: string): Observable<Question> {
    return this.http.get<Question>(this.questionUrl(quizId) + '/' + id.toString()).pipe(
      tap((question) => {
       console.log('Récupération reussie');
      }),
      catchError(this.handleError<Question>('getQuestion', undefined))
    );
  }

 /* getQuestion() {
    return this.questions;
  }*/
  updateQuestion(questionToModify: Question): Observable<Question> {
    // this.questions[+questionToModify.id - 1] = questionToModify;
    return this.http.put<Question>(this.questionUrl(questionToModify.quizId)  + '/' + questionToModify.id, questionToModify).pipe(
      tap((question) => {
        // this.questions[+questionToModify.id - 1] = questionToModify;
        console.log('Modification reussie avec succcès');
        this.snack.open('Modification en cours...', 'close',
          {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: 'red-snackbar'
          })
        ;
      }),
      catchError(this.handleError<Question>('updateQuestion', undefined))
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
      /* switch (operation) {
        case 'getBdcs':
          this.bdcsState = false;
          break;
        case 'getBdc':
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
          break;
      } */
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      // this.logRefresh(idMessage, `${operation} failed: ${error.message}`, 'danger');

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
