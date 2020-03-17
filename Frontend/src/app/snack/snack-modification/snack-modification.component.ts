import {Component, Inject, OnInit, Optional} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-snack-modification',
  templateUrl: './snack-modification.component.html',
  styleUrls: ['./snack-modification.component.scss']
})
export class SnackModificationComponent implements OnInit {

  constructor(@Optional() @Inject(MAT_DIALOG_DATA) public data: string) { }
   // @Inject(MD_DIALOG_DATA) data: any
  ngOnInit() {
  }

}
