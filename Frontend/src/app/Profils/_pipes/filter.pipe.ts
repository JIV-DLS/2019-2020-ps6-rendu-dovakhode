import { Pipe, PipeTransform } from '@angular/core';
import {Profil} from '../../../models/profil.model';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(profils: Profil[] , term: Profil): any[] {
    if (term === undefined ) {
      return profils;
    }
    return profils.filter( (profil) => {
      return (term.nom === '' || profil.nom.toLowerCase().includes(term.nom.toLowerCase())) &&
        (term.prenom === '' || profil.prenom.toLowerCase().includes(term.prenom.toLowerCase()) ) &&
        (term.sexe === '' || profil.sexe.toLowerCase().includes(term.sexe.toLowerCase()) ) &&
        (term.stade === '' || profil.stade.toLowerCase().includes(term.stade.toLowerCase()));
    });

  }




}
