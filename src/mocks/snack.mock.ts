import {MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';
// @ts-ignore
export const snackData: {
  update: any;
  succes: any;
  error: any;
  duration: any;
  get: any;
  delete: any;
  verticalPosition: any;
  horizontalPosition: any;
  post: {};
} = {
  duration: 3000,
  horizontalPosition: 'center' as MatSnackBarHorizontalPosition,
  verticalPosition: 'bottom' as MatSnackBarVerticalPosition,
  get: {
    label: 'Récupération de ',
    class: 'gray-snackbar'
  },
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
  }
};
