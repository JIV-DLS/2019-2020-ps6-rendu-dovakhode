import { Injectable } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {MatConfirmDialogComponent} from '../app/mat-confirm-dialog/mat-confirm-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private matDialog: MatDialog) { }

  openConfirmDialog(msg?: any) {
   return this.matDialog.open ( MatConfirmDialogComponent, {
      width: '420px',
      panelClass: 'confirm-dialog-container',
      disableClose: false,
      data: {
        message: msg
      }
    });
  }
}
