import {HttpClient} from '@angular/common/http';
import {MatSnackBar} from '@angular/material/snack-bar';
import {environment} from '../environments/environment';
import {Question} from '../models/question.model';
import {Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {Subtheme} from '../models/subtheme.model';
import {Theme} from '../models/themes.model';

export class SubthemeService {
  constructor(private http: HttpClient, private snack: MatSnackBar) {}

  subThemeUrl(themeId) {
    return environment.url + '/theme/' + themeId + '/subThemes';
  }

  addSubTheme(subTheme: Subtheme): Observable<Question> {
    return this.http.post<Question>(this.subThemeUrl(subTheme.idTheme), subTheme).pipe(

      tap((newQuestion: Question) => {
      }),
      catchError(this.handleError<Question>('addSubTheme', undefined))
    );
  }
  deleteSubTheme(subTheme: Subtheme): Observable<Subtheme>  {
    return this.http.delete< Subtheme>(this.subThemeUrl(subTheme.idTheme) + '/' + subTheme.id).pipe(
      tap((quizDeleted) => {
      }),
      catchError(this.handleError< Subtheme>('deleteSubTheme', undefined))
    );
  }
  getSubTheme(themeId): Observable<Subtheme[]>  {
    return this.http.get<Subtheme[]>(this.subThemeUrl(themeId)).pipe(
      tap((theme) => {
      }),
      catchError(this.handleError<Subtheme[]>('gettheme', undefined))
    );
  }

  updateSubTheme(subTheme: Subtheme): Observable<Subtheme>  {
    return this.http.put< Subtheme>(this.subThemeUrl(subTheme.idTheme) + '/' + subTheme.id, subTheme).pipe(
      tap((quizDeleted) => {
      }),
      catchError(this.handleError< Subtheme>('UpdateSubTheme', undefined))
    );
  }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      switch (operation) {
        case 'addSubTheme':
          // this.bdcsState = false;
          this.snack.open('❌ Echec de l\'enregistrement du SubTheme...', 'close',
            {
              ...environment.snackInformation.errorForAll
            })
          ;
          break;
        case 'deleteSubTheme':
          // this.bdcsState = false;
          this.snack.open('❌ Echec de la suppression du SubTheme...', 'close',
            {
              ...environment.snackInformation.errorForAll
            })
          ;
          break;
        case 'updateQuiz':
          // this.bdcsState = false;
          this.snack.open('❌ Echec de la modification du SubTheme ...', 'close',
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
          this.snack.open('❌ Impossible de charger le SubTheme', 'close',
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
