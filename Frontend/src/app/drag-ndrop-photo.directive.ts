import {Directive, EventEmitter, HostBinding, HostListener, Output} from '@angular/core';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import {environment} from '../environments/environment';

@Directive({
  selector: '[appDragNDropPhoto]'
})
export class DragNDropPhotoDirective {

  constructor(private snack: MatSnackBar) { }


  @Output() fileDropped = new EventEmitter<any>();

  @HostBinding('style.background-color') private background = '#f5fcff';
  @HostBinding('style.opacity') private opacity = '1';
  @HostBinding('style.border') private border = 'none';

  // Dragover listener
  @HostListener('dragover', ['$event']) onDragOver(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    this.background = '#9ecbec';
    this.opacity = '0.8';
    this.border = 'dotted';
  }

  // Dragleave listener
  @HostListener('dragleave', ['$event']) public onDragLeave(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    this.background = '#f5fcff';
    this.opacity = '1';
    this.border = 'none';
  }

  // Drop listener
  @HostListener('drop', ['$event']) public ondrop(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    this.background = '#f5fcff';
    this.opacity = '1';
    this.border = 'none';
    switch (evt.dataTransfer.items[0].kind) {
      case 'file':
        const files = evt.dataTransfer.files;
        if (files.length > 0) {
          this.fileDropped.emit(files);
        }
        break;
      case 'string':
            evt.dataTransfer.items[0].getAsString(async _ => {
              const imgUrl = decodeURIComponent(_.split(' ')[0].split('imgurl=')[1].split('&imgref')[0]);
              if (imgUrl) {
                /*this.snack.open(environment.snackInformation.operation.loading.get.image, 'close',
                  {
                    ...environment.snackInformation.successForAll
                  });*/
                try {
                  await fetch(imgUrl)
                    .then(res => res.blob()) // Gets the response and returns it as a blob
                    .then(blob => {
                      this.snack.dismiss();

                 //     blob.lastModifiedDate = new Date();
                 // blob.lastModifiedDate = new Date();

                      const anArray = [];
                      anArray.push(blob as File);
                      this.fileDropped.emit(anArray);
                    });
                } catch (err) {
                  alert('❌ Impossible de telecharger l\'image,' +
                    ' les droits sont insuffisants, Veuillez importer une autre image!');
                  /*this.snack.open('❌ Impossible de telecharger l\'image,' +
                    ' les droits sont insuffisants, Veuillez importer une autre image!', 'close',
                    {
                      ...environment.snackInformation.errorForAll
                    })
                  ;*/
                }

            // console.log(_)
            // console.log(new File(decodeURIComponent(_.split(' ')[0].split('imgurl=')[1].split('&imgref')[0]),'mon fichier'));
          } else {
          this.snack.open('Pour l\'import depuis un site web, Veuillez par préférence choisir Google!', 'close',
            {
              ...environment.snackInformation.informationForAll
            }); }
});
            break;
      default:
        this.snack.open('Oups une erreur s\'est produite lors de l\'importation de photos,' +
          'Veuillez réssayer avec une autre image!', 'close',
          {
            ...environment.snackInformation.errorForAll
          })
        ;
        break;
    }

  }

}
