import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild, ViewChildren} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-image-uploader',
  templateUrl: './image-uploader.component.html',
  styleUrls: ['./image-uploader.component.scss']
})
export class ImageUploaderComponent implements OnInit {
  @ViewChildren('add') addElement: ElementRef;
  @Input()  imageReestablisher: Subject<any>;
  @Input() imagePreview: string;
  @Input() savedImage: string;
  @Input() label: string;
  @Input() form: FormGroup;
  @Input() editable: boolean;
  @Output() imageChanged: EventEmitter<null> = new EventEmitter<null>();
  @Output() imageDeleted: EventEmitter<null> = new EventEmitter<null>();
  @ViewChild('imgShower') imgShower: ElementRef;
  editByLink = false;
  linkError: string;
  constructor() { }

  ngOnInit() {
    if (this.imageReestablisher) {
    this.imageReestablisher.subscribe(_ => {
      this.imagePreview = this.savedImage;
    });
    }
  }

  loadImageFile(file) {
    this.form.get('image').patchValue(file);
    this.form.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (this.form.get('image').valid) {
        this.editByLink = false;
        this.imageChanged.emit();
        this.imagePreview = reader.result as string;
        if (this.imgShower) {
        this.imgShower.nativeElement.src = this.imagePreview;
        }
        if (this.form.get('imagePreview')) {this.form.get('imagePreview').setValue(this.imagePreview); }
      } else {
        this.imagePreview = null;
      }
    };
  }

  onImagePick(event: Event) {
    this.loadImageFile((event.target as HTMLInputElement).files[0]);
  }
  uploadFile(event) {
    this.loadImageFile(event[0]);
  }
  deleteImage() {
    this.savedImage = this.imagePreview;
    this.imageChanged.emit();
    this.form.markAsDirty();
    this.form.get('image').reset();
    // this.quiz.image = '';
    this.imagePreview = null;
    this.imageDeleted.emit();
  }
  dataURItoBlob(dataURI) {
    const byteString = window.atob(dataURI);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([int8Array], { type: 'image/jpeg' });
    return blob;
  }
  imgLinkError(error: string) {
    this.linkError = error;
    setTimeout(() =>    this.linkError = ''
      , 2000);
  }
  async downloadImageUrl(url: string) {
    try {
      await fetch(url)
        .then(res => res.blob()) // Gets the response and returns it as a blob
        .then(blob => {
          this.loadImageFile(blob as File);
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
  indicateToDownload() {
    this.imgLinkError('Pour télécharger cliquer sur le bouton de téléchargement!');
  }
  uploadByLink(link: HTMLInputElement) {

    if (link.value.length > 0 && link.checkValidity()) {
      this.linkError = '';
      try {
        if (link.value.includes('data', 0)) {
          if ( link.value.indexOf('base64') > 0) {
          this.loadImageFile(this.dataURItoBlob(link.value.split('base64,')[1]));
          } else { this.imgLinkError('Désolé le format de l\'image n\'est pas connu ou n\'a pas été fourni dans le lien!(base64 requis)'); }
        } else if (link.value.includes('http', 0)) {
          this.downloadImageUrl(link.value).then(r => console.log(r));
        } else {
          this.imgLinkError('Format incorrect!' +
            ' Format correcte: http://exampledelien.com/monimage.png ' +
            'ou data:image/jpeg;base64,/9j/4AAQSk...'); }
      } catch (e) {
        console.log(e);
        this.imgLinkError('Désolé une erreur s\'est produite lors de l\'import!');
        alert('Désolé une erreur s\'est produite lors de l\'import! Veuillez essayer avec un autre lien!');
      }
    } else {
      this.imgLinkError('le texte fourni n\'est pas un lien valide!');
    }
  }
}
