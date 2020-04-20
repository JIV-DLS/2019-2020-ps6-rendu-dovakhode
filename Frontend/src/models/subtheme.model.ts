export class Subtheme {
  id: number;
  idTheme: number;
  label: string;
  constructor(label?: string, idTheme?: number, id?: number) {
    this.label = '';
    if (label) { this.label = label; }
    if (idTheme) { this.idTheme = idTheme; }
    if (id) { this.id = id; }
  }

}
