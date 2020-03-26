import {MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';
export const snackData: {} = {
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
  }
};
