import {HttpClient} from '@angular/common/http';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Theme} from '../models/themes.model';
import {Answer} from '../models/answer.model';
import {catchError, tap} from 'rxjs/operators';
import {environment} from '../environments/environment';
import {Question} from '../models/question.model';
import {Observable, of} from 'rxjs';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeServices {
  themeUrl = environment.url + '/theme';

  constructor(private http: HttpClient, private snack: MatSnackBar) {}

  addTheme( theme: Theme) {
    return this.http.post<Answer>(this.themeUrl, theme).pipe(
      tap((newAnswer) => {
      }),
      catchError(this.handleError<Question>('addtheme', undefined))
    );
  }
  UpdateTheme( theme: Theme) {
    return this.http.put<Theme>(this.themeUrl, theme).pipe(
      tap((theanswer) => {
      }),
      catchError(this.handleError<Question>('UpdateTheme', undefined))
    );
  }
  getTheme(): Observable<Theme[]>  {
    return this.http.get<Theme[]>(this.themeUrl).pipe(
      tap((theme) => {
      }),
      catchError(this.handleError<Theme[]>('gettheme', undefined))
    );
  }


  deleteTheme(theme: Theme): Observable<Theme>  {
    return this.http.delete<Theme>(this.themeUrl + '/' + theme.id).pipe(
      tap((quizDeleted) => {
      }),
      catchError(this.handleError<Theme>('deletetheme', undefined))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      switch (operation) {
        case 'addtheme':
          // this.bdcsState = false;
          this.snack.open('❌ Echec de l\'enregistrement du quiz...', 'close',
            {
              ...environment.snackInformation.errorForAll
            })
          ;
          break;
        case 'deletetheme':
          // this.bdcsState = false;
          this.snack.open('❌ Echec de la suppression du quiz...', 'close',
            {
              ...environment.snackInformation.errorForAll
            })
          ;
          break;
        case 'updatetheme':
          // this.bdcsState = false;
          this.snack.open('❌ Echec de la modification du quiz ...', 'close',
            {
              ...environment.snackInformation.errorForAll
            })
          ;
          break;
        case 'gettheme':
          // this.bdcsState = false;
          this.snack.open('❌ Impossible de charger les données', 'close',
            {
              ...environment.snackInformation.errorForAll
            })
          ;
          break;
        case 'getthemeById':
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
