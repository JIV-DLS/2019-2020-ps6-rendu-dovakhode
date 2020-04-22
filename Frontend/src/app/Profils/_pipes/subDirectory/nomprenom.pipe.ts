import { Pipe, PipeTransform } from '@angular/core';
import {Profil} from '../../../../models/profil.model';

@Pipe({
  name: 'nomprenom'
})
export class NomprenomPipe implements PipeTransform {

  transform(profils: Profil[] , term: Profil): any[] {
    if (term === undefined) {
      return profils;
    }
    return profils.filter((profil) => {
      return (term.nom === '' || profil.nom.toLowerCase().includes(term.nom.toLowerCase())) ||
        (term.prenom === '' || profil.prenom.toLowerCase().includes(term.prenom.toLowerCase()));
    });
  }
}
