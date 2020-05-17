import {Injectable, OnInit} from '@angular/core';
import {BehaviorSubject, Observable, of} from 'rxjs';
import { Quiz } from '../models/quiz.model';
import {HttpClient} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';
import {environment} from '../environments/environment';
import deleteProperty = Reflect.deleteProperty;
import {QuestionService} from './question.service';
import {SnackSuccessComponent} from '../app/snack/snack-success/snack-success.component';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import {FormArray} from '@angular/forms';
import {Theme} from '../models/themes.model';


@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private http: HttpClient,
              private questionService: QuestionService,
              private snack: MatSnackBar,
              private router: Router) {
  }
  // url = 'https://api.myjson.com/bins/13ajhy';
  public static quizUrl = environment.url + '/quizzes';
  /**
   * Services Documentation:
   * https://angular.io/docs/ts/latest/tutorial/toh-pt4.html
   */

  /**
   * The list of quiz.
   * The list is retrieved from the mock.
   */
  private quizzes: Quiz[] = [];

  /**
   * Observable which contains the list of the quiz.
   * Naming convention: Add '$' at the end of the variable name to highlight it as an Observable.
   */
  public quizzes$: BehaviorSubject<Quiz[]> = new BehaviorSubject(this.quizzes);
  index: number;

  addQuiz(quiz: Quiz, image: File, questions: FormArray): Observable<Quiz> {
    this.snack.open(environment.snackInformation.operation.loading.post.quiz, 'close',
      {
        ...environment.snackInformation.loadingPost
      })
    ;
    return this.http.post<Quiz>(QuizService.quizUrl,
      this.createQuizData(image, quiz, questions)).pipe(
      tap((newQuiz: Quiz) => {
        console.log('Ajout reussi');
        this.snack.open( environment.snackInformation.operation.succeeded.post.quiz, 'Afficher',
          {
            ...environment.snackInformation.successForAll
          }).onAction().subscribe(() => {
            this.router.navigateByUrl('/quiz/' + newQuiz.id);
        });
      }),
      catchError(this.handleError<Quiz>('addQuiz', undefined))
    );
  }

  private createQuizData(image: File, quiz: Quiz, questions: FormArray) {
    const quizData = new FormData();
    if (image !== null) {
      quizData.append('quiz_image', image, 'quiz ' + quiz.label);
    }
    if (questions !== null) {
      for (let i = 0; i < questions.length; i++) {
        quiz.questions[i].tmpUrl = ' ';
        if (typeof questions[i].image === 'object' && questions[i].image !== null) {
          quizData.append('quiz_image', questions[i].image, 'question_' + i + ' ' + questions[i].label);
        }
        for (let j = 0; j < questions[i].answers.length; j++) {
          quiz.questions[i].answers[j].tmpUrl = ' ';
          // quiz.questions[i].answers[i].image = ' ';
          if (typeof questions[i].answers[j].image === 'object' && questions[i].answers[j].image !== null) {
            if (quiz.questions[i].answers[j].value === null) {
            quiz.questions[i].answers[j].value = ' ';
            }
            quizData.append('quiz_image', questions[i].answers[j].image, 'answer_' + i + '_' + j + ' ' + questions[i].answers[j].value);
          }
        }
      }
    }
    quizData.append('quiz', JSON.stringify(quiz));
    return quizData;
  }

  deleteQuiz(quiz: Quiz): Observable<Quiz>  {
    this.snack.open( environment.snackInformation.operation.loading.delete.quiz, 'close',
      {
        ...environment.snackInformation.loadingDelete
      })
    ;
    return this.http.delete<Quiz>(QuizService.quizUrl + '/' + quiz.id).pipe(
      tap((quizDeleted) => {
        console.log('Suppression reussie');
        this.snack.open(environment.snackInformation.operation.succeeded.delete.quiz, 'close',
          {
            ...environment.snackInformation.successForAll
          })
        ;

      }),
     catchError(this.handleError<Quiz>('deleteQuiz', undefined))
   );
  }

/*  setQuizzesFromUrl() {
    this.http.get<Quiz[]>(QuizService.quizUrl).subscribe(
      (quiz) => {
        this.quizzes = quiz;
        this.quizzes$.next(this.quizzes);
      }
    );
  }*/

getPatientQuiz(idPatient): Observable<Quiz[]>
{
  return this.http.get<Quiz[]>(QuizService.quizUrl+'/patient/'+idPatient+'').pipe(
    tap((quiz) => {
    }),
    catchError(this.handleError<Quiz[]>('getQuiz', undefined))
  );
}
  getQuiz(): Observable<Quiz[]>  {
    return this.http.get<Quiz[]>(QuizService.quizUrl).pipe(
      tap((quiz) => {
      }),
      catchError(this.handleError<Quiz[]>('getQuiz', undefined))
    );
  }

  getQuizByIndex(index: number) {
    return index >= 0 && index < this.quizzes.length ? this.quizzes[index] : null;
  }
  getQuizById(id: number): Observable<Quiz> {
    const url = QuizService.quizUrl + '/' + id.toString();
    return this.http.get<Quiz>(url).pipe(
      tap((quiz) => {
        console.log('Récupération reussie');
      }),
      catchError(this.handleError<Quiz>('getQuiz', undefined))
    );
  }

 /* getQuiz() {
    return this.quizzes;
  }*/
  updateQuiz(quizToModify: Quiz, image: File, questions: FormArray): Observable<Quiz> {
    this.snack.open( environment.snackInformation.operation.loading.update.quiz, 'close',
      {
        ...environment.snackInformation.loadingUpdate
      })
    ;
    return this.http.put<Quiz>(QuizService.quizUrl  + '/' + quizToModify.id,
      this.createQuizData(image, quizToModify, questions)).pipe(
      tap((createdQuiz) => {
        console.log('Modification reussie');
        this.snack.open( environment.snackInformation.operation.succeeded.update.quiz, 'close',
          {
            ...environment.snackInformation.successForAll
          })
        ;
      }),
      catchError(this.handleError<Quiz>('updateQuiz', undefined))
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
        case 'addQuiz':
          // this.bdcsState = false;
          this.snack.open('❌ Echec de l\'enregistrement du quiz...', 'close',
            {
              ...environment.snackInformation.errorForAll
            })
          ;
          break;
         case 'deleteQuiz':
           // this.bdcsState = false;
           this.snack.open('❌ Echec de la suppression du quiz...', 'close',
             {
               ...environment.snackInformation.errorForAll
             })
           ;
           break;
         case 'updateQuiz':
           // this.bdcsState = false;
           this.snack.open('❌ Echec de la modification du quiz ...', 'close',
             {
               ...environment.snackInformation.errorForAll
             })
           ;
           break;
         case 'getQuiz':
           // this.bdcsState = false;
           this.snack.open('❌ Impossible de charger les données', 'close',
             {
               ...environment.snackInformation.errorForAll
             })
           ;
           break;
         case 'getQuizById':
           // this.bdcsState = false;
           this.snack.open('❌ Impossible de charger le quiz', 'close',
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
