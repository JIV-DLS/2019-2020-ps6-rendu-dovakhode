// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.


import {MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';

export const environment = {
  production: false,
  appName: 'DOVA QUIZ',
  url : 'http://localhost:9428/api',
  maintenanceMessage: 'disponible bientôt ...',
  formFieldsRequired: 'Veuiller remplir tous les champs requis(*)',
  formFieldRequired: 'Veuiller remplir ce champs',
  formSelectRequired: 'Veuillez choisir une valeur',
  snackData: {
    loadingSuffix: ' en cour...',
    duration: 3000,
    horizontalPosition: 'center' as MatSnackBarHorizontalPosition,
    verticalPosition: 'bottom' as MatSnackBarVerticalPosition,
    post: {
      label: 'Enregistrement de ',
      class: 'green-snackbar'
    },
    delete: {
      label: 'Enregistrement de ',
      class: 'red-snackbar'
    },
    update: {
      label: 'Mise à jour de ',
      class: 'blue-snackbar'
    },
    error: {
      label: ' échoué...',
      class: 'red-snackbar'
    }, succes: {
      label: '  réussi...',
    class: 'green-snackbar'
},
    snackInformation: {
      update: {
        duration: this.snackData.duration,
        horizontalPosition:  this.snackData.horizontalPosition,
        verticalPosition: this.snackData.verticalPosition,
        panelClass: [this.snackData.succes.class]
      },
      delete: {

      },
      post: {

      }
    }

  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
