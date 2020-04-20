import {environment} from '../environments/environment';

export class Theme {
  id: number;
  label: string;
  subtheme: any[];

  constructor() {
    this.label = '';
    this.subtheme = [];
  }
}


