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
              if (_.indexOf('imgurl=') > 0 && _.indexOf('&imgref') > 0) {
                const imgUrl =  decodeURIComponent(_.split(' ')[0].split('imgurl=')[1].split('&imgref')[0]);

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
                    }).then();
                } catch (err) {
                  alert('❌ Impossible de telecharger l\'image,' +
                    ' les droits sont insuffisants, Veuillez utilisez l\'icone 🔗' +
                    'pour télécharger l\'image via son lien ou' +
                    ' télécharger l\'image puis l\'importer ici' +
                    ' ou essayer avec une autre image!');
                  /*this.snack.open('❌ Impossible de telecharger l\'image,' +
                    ' les droits sont insuffisants, Veuillez importer une autre image!', 'close',
                    {
                      ...environment.snackInformation.errorForAll
                    })
                  ;*/
                }

            // console.log(_)
            // console.log(new File(decodeURIComponent(_.split(' ')[0].split('imgurl=')[1].split('&imgref')[0]),'mon fichier'));
          } else if (_.value.includes('data', 0)) {
                console.log('data');
                if ( _.value.indexOf('base64') > 0) {

                  const anArray = [];
                  anArray.push(this.dataURItoBlob(_.value.split('base64,')[1]) as File);
                  this.fileDropped.emit(anArray);
                } else { alert('Désolé le format de l\'image n\'est pas connu ou n\'a pas été fourni dans le lien!(base64 requis)'); }
              } else if (_.value.includes('http', 0)) {

                console.log('http');
                this.downloadImageUrl(_.value).then(r => console.log(r));
              } else {
                alert('Pour l\'import glissé-déposé depuis un site web, Veuillez par préférence choisir Google!');
          /*this.snack.open('Pour l\'import depuis un site web, Veuillez par préférence choisir Google!', 'close',
            {
              ...environment.snackInformation.informationForAll
            });*/ }
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

  private dataURItoBlob(dataURI: string) {
      const byteString = window.atob(dataURI);
      const arrayBuffer = new ArrayBuffer(byteString.length);
      const int8Array = new Uint8Array(arrayBuffer);
      for (let i = 0; i < byteString.length; i++) {
        int8Array[i] = byteString.charCodeAt(i);
      }
      const blob = new Blob([int8Array], { type: 'image/jpeg' });
      return blob;
  }

   private async downloadImageUrl(url: any) {
    try {
      await fetch(url)
        .then(res => res.blob()) // Gets the response and returns it as a blob
        .then(blob => {
          const anArray = [];
          anArray.push(blob as File);
          this.fileDropped.emit(anArray);
        });
    } catch (err) {
      alert('❌ Impossible de telecharger l\'image,' +
        ' les droits sont insuffisants, Veuillez la télécharger puis l\'importer ici' +
        ' ou essayer avec une autre image!');
      /*this.snack.open('❌ Impossible de telecharger l\'image,' +
        ' les droits sont insuffisants, Veuillez importer une autre image!', 'close',
        {
          ...environment.snackInformation.errorForAll
        })
      ;*/
    }
  }
}
