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
import {Profil} from '../models/profil.model';
import {FormArray} from '@angular/forms';
@Injectable({
  providedIn: 'root'
})
export class ProfilServices {



  constructor(private http: HttpClient, private snack: MatSnackBar) {
  }
  public profilUrl = environment.url + '/profil';
  // evol: Evolution;


  addProfil(profil: Profil, image?: File) {

    this.snack.open(environment.snackInformation.operation.loading.post.profile, 'close',
      {
        ...environment.snackInformation.loadingPost
      })
    ;
    const profilData = new FormData();
    if (image !== null) {
      profilData.append('profil_image', image, profil.nom);
    }

    profilData.append('profil', JSON.stringify(profil));
    console.log(profilData);
    return this.http.post<Profil>(this.profilUrl, profilData).pipe(
      tap((newAnswer) => {
        console.log('Ajout Reussi');
        this.snack.open(environment.snackInformation.operation.succeeded.post.profil, 'close',
          {
            ...environment.snackInformation.successForAll

          });
      }),
      catchError(this.handleError<Question>('addProfil', undefined))
    );
  }
  getProfilById(id: number): Observable<Profil> {
    const url = this.profilUrl + '/' + id.toString();
    return this.http.get<Profil>(url).pipe(
      tap((quiz) => {
        console.log('Récupération reussie');
      }),
      catchError(this.handleError<Profil>('getProfilById', undefined))
    );
  }
  getProfil(): Observable<Profil[]>  {
    return this.http.get<Profil[]>(this.profilUrl).pipe(
      tap((profil) => {
      }),
      catchError(this.handleError<Profil[]>('getProfil', undefined))
    );
  }

  deleteProfil(profil: Profil): Observable<Profil>  {
    this.snack.open( environment.snackInformation.operation.loading.delete.profil, 'close',
      {
        ...environment.snackInformation.loadingDelete
      })
    ;
    return this.http.delete<Profil>(this.profilUrl + '/' + profil.id).pipe(
      tap((prof) => {
        console.log('Suppression  de ' + prof.nom + 'reussie');
        this.snack.open(environment.snackInformation.operation.succeeded.delete.profil, 'close',
          {
            ...environment.snackInformation.successForAll
          })
        ;

      }),
      catchError(this.handleError<Profil>('deleteProfil', undefined))
    );
  }
  updateProfil(profil: Profil, image: File): Observable<Profil> {
    this.snack.open( environment.snackInformation.operation.loading.update.profil, 'close',
      {
        ...environment.snackInformation.loadingUpdate
      })
    ;
    const profilData = new FormData();
    console.log(image);
    if (typeof image === 'object' && image !== null) {
      profilData.delete(profil.nom);
      profilData.append('profil_image', image, profil.nom);
    }

    profilData.append('profil', JSON.stringify(profil));
    return this.http.put<Profil>(this.profilUrl  + '/' + profil.id, profilData).pipe(
      tap((pro) => {
        console.log('Modification reussie');
        this.snack.open( environment.snackInformation.operation.succeeded.update.profil, 'close',
          {
            ...environment.snackInformation.successForAll
          })
        ;
      }),
      catchError(this.handleError<Profil>('updateProfil', undefined))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      switch (operation) {
        case 'addProfil':
          // this.bdcsState = false;
          this.snack.open('❌ Echec de l\'enregistrement du profil ...', 'close',
            {
              ...environment.snackInformation.errorForAll
            })
          ;
          break;
        case 'deleteProfil':
          // this.bdcsState = false;
          this.snack.open('❌ Echec de la suppression du profil...', 'close',
            {
              ...environment.snackInformation.errorForAll
            })
          ;
          break;
        case 'updateProfil':
          // this.bdcsState = false;
          this.snack.open('❌ Echec de la modification du profil ...', 'close',
            {
              ...environment.snackInformation.errorForAll
            })
          ;
          break;
        case 'getProfil':
          // this.bdcsState = false;
          this.snack.open('❌ Impossible de charger les profil', 'close',
            {
              ...environment.snackInformation.errorForAll
            })
          ;
          break;

        case 'getProfilById':
          // this.bdcsState = false;
          this.snack.open('❌ Impossible de charger le profil', 'close',
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
