import { Component, OnInit } from '@angular/core';
import {SubthemeService} from '../../../services/subtheme.service';
import {MatDialogRef} from '@angular/material';
import {Theme} from '../../../models/themes.model';
import {ThemeServices} from '../../../services/theme.services';
import {Subtheme} from '../../../models/subtheme.model';

@Component({
  selector: 'app-theme-list',
  templateUrl: './theme-list.component.html',
  styleUrls: ['./theme-list.component.scss']
})
export class ThemeListComponent implements OnInit {
  themes: Theme[];

  constructor(private themeServices: ThemeServices,
              public dialogRef: MatDialogRef<ThemeListComponent>) { }

  ngOnInit(): void {
    this.getAllTheme();
  }
  getAllTheme() {
    this.themeServices.getTheme().subscribe(themes => {
      if (themes) { this.themes = themes; }
    });
  }
  addTheme(value: string) {
    this.themeServices.addTheme(new Theme(value)).subscribe(theme => {
      if (theme != null) {
        this.getAllTheme();
      }
    });
  }

  deleteTheme(id: number, label: string) {
    if (confirm('Voulez-vous vraiment supprimé le thème' + label + '?')) {
      this.themeServices.deleteTheme(new Theme('theme', id)).subscribe(theme => {
        if (theme != null) {
          this.getAllTheme();
        }
      });
    }
  }
}
