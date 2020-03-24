import { Component, OnInit } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-snack-success',
  templateUrl: './snack-success.component.html',
  styleUrls: ['./snack-success.component.scss']
})
export class SnackSuccessComponent implements OnInit {

  constructor(private snackBar: MatSnackBar) { }

  ngOnInit() {
  }
  openSnackBar(message: string, action: string, className: string) {

    this.snackBar.open(message, action, {
      duration: 2000,
      verticalPosition: 'top',
      horizontalPosition: 'end',
      panelClass: [className]
    });
  }
}
