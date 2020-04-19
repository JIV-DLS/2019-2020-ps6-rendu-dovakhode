import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {environment} from '../../environments/environment';
import {Quiz} from '../../models/quiz.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  headerName = environment.appName;
  isOpened = false;
  @Output()
  selectEmitter: EventEmitter<null> = new EventEmitter<null>();

  constructor() { }

  ngOnInit() {
  }

}
