import {environment} from '../environments/environment';

export class Theme {
  id: number;
  label: string;
  subtheme: any[];

  constructor(label?: string, id?: number) {
    this.label = '';
    if (label) { this.label = label; }
    this.subtheme = [];

    if (id) { this.id = id; }
  }
}


