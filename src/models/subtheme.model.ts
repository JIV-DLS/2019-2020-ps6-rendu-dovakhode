export class Subtheme {
  id: number;
  themeId: number;
  label: string;
  constructor(label?: string, themeId?: number, id?: number) {
    this.label = '';
    if (label) { this.label = label; }
    if (themeId) { this.themeId = themeId; }
    if (id) { this.id = id; }
  }

}
