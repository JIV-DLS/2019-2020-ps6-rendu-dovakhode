import {Component, Inject, OnInit} from '@angular/core';
import {SubthemeService} from '../../../services/subtheme.service';
import {Subtheme} from '../../../models/subtheme.model';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-sub-theme-list',
  templateUrl: './sub-theme-list.component.html',
  styleUrls: ['./sub-theme-list.component.scss']
})
export class SubThemeListComponent implements OnInit {

  constructor(private subThemeServices: SubthemeService,
              public dialogRef: MatDialogRef<SubThemeListComponent>,
              @Inject(MAT_DIALOG_DATA) public themeId: number
  ) { }
  subThemes = [];
  ngOnInit(): void {
    this.getAllSubTheme();
  }

  addSubTheme(theme: string) {
    this.subThemeServices.addSubTheme(new Subtheme(theme, this.themeId)).subscribe(subTheme => {
      if (subTheme != null) {
        this.getAllSubTheme();
      }
    });
  }

  deleteSubTheme(id: any, label: string) {
    if (confirm('Voulez-vous vraiment supprimé le sous-thème' + label + '?')) {
      this.subThemeServices.deleteSubTheme(new Subtheme('theme', this.themeId, id)).subscribe(subTheme => {
        if (subTheme != null) {
          this.getAllSubTheme();
        }
      });
    }
  }

  private getAllSubTheme() {
    this.subThemeServices.getSubTheme(this.themeId).subscribe(subthemes => {
      if (subthemes) {
        this.subThemes = subthemes;
      }
    });
  }
}
