import {snackData} from '../mocks/snack.mock';

export const environment = {
  production: true,
  appName: 'DOVA QUIZ',
  url : 'http://192.168.43.97:9428/api',
  maintenanceMessage: 'disponible bientôt ...',
  formFieldsRequired: 'Veuiller remplir tous les champs requis(*)',
  deleteWarning: ' voulez-vous vraiment supprimer (',
  formFieldRequired: 'Veuiller remplir ce champs',
  formSelectRequired: 'Veuillez choisir une valeur',
  snackInformation: {
    successForAll: {
      duration: snackData.duration,
      horizontalPosition:  snackData.horizontalPosition,
      verticalPosition: snackData.verticalPosition,
      panelClass: [snackData.succes.class]
    },
    errorForAll: {
      duration:  snackData.duration,
      horizontalPosition:  snackData.horizontalPosition,
      verticalPosition: snackData.verticalPosition,
      panelClass: [snackData.error.class]
    },
    loadingUpdate: {
      horizontalPosition:  snackData.horizontalPosition,
      verticalPosition: snackData.verticalPosition,
      panelClass: [snackData.update.class]

    },
    loadingPost: {
      horizontalPosition:  snackData.horizontalPosition,
      verticalPosition: snackData.verticalPosition,
      panelClass: [snackData.succes.class]

    },
    loadingDelete: {
      horizontalPosition:  snackData.horizontalPosition,
      verticalPosition: snackData.verticalPosition,
      panelClass: [snackData.delete.class]

    },
    loadingGet: {
      horizontalPosition:  snackData.horizontalPosition,
      verticalPosition: snackData.verticalPosition,
      panelClass: [snackData.get.class]

    },
    operation: {
      loading: {
        getAll: {
          quiz: 'Récupération de tous les quizs en cours...',
          question: 'Récupération de les question en cours...',
          answer: 'Récupération de toutes les réponses en cours...'
        },
        get: {
          quiz: 'Récupération d\'un quiz en cours...',
          question: 'Récupération d\'une question en cours...',
          answer: 'Récupération d\'une réponse en cours...'
        },
        update: {
          quiz: '⏳ Modification du quiz en cours...',
          question: '⏳ Modification de la question en cours...',
          answer: '⏳Modification de la réponse en cours...'
        },
        delete:  {
          quiz: '⏳ Suppression du quiz en cours...',
          question: '⏳ Suppression de la question en cours...',
          answer: '⏳ Suppression de la réponse en cours...'
        },
        post: {
          quiz: '⏳ Enregistrement de la question en cours...',
          question: '⏳ Enregistrement de la question en cours...',
          answer: '⏳ Enregistrement de la réponse en cours...'
        }},
      succeeded: {
        getAll: {
          quiz: 'Récupération des quizs terminé!',
          question: 'Récupération des question terminé!',
          answer: 'Récupération des réponses terminé!'
        },
        get: {
          quiz: 'Récupération du quiz éffectuée avec succès!',
          question: 'Récupération de la question éffectuée avec succès!',
          answer: 'Récupération de la réponse éffectuée avec succès!'
        },
        update: {
          quiz: '✅ Modification du quiz éffectuée avec succès!',
          question: '✅ Modification de la question éffectuée avec succès!',
          answer: '✅ Modification de la réponse éffectuée avec succès!'
        },
        delete:  {
          quiz: '✅ Suppression du quiz éffectuée avec succès!',
          question: '✅ Suppression de la question éffectuée avec succès!',
          answer: '✅ Suppression de la réponse éffectuée avec succès!'
        },
        post: {
          quiz: '✅ Enregistrement du quiz éffectué avec succès!',
          question: '✅ Enregistrement de la question éffectuée avec succès!',
          answer: '✅ Enregistrement de la réponse éffectuée avec succès!'
        }

      }
    }
  },
  runningQuiz: 'DovaQuiz'


};
