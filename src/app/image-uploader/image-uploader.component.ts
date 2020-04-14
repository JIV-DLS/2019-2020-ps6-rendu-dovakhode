import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-image-uploader',
  templateUrl: './image-uploader.component.html',
  styleUrls: ['./image-uploader.component.scss']
})
export class ImageUploaderComponent implements OnInit {

  @Input()  imageReestablisher: Subject<any>;
  @Input() imagePreview: string;
  @Input() savedImage: string;
  @Input() label: string;
  @Input() quizForm: FormGroup;
  @Input() editable: boolean;
  @Output() imageChanged: EventEmitter<null> = new EventEmitter<null>();
  @Output() imageDeleted: EventEmitter<null> = new EventEmitter<null>();
  constructor() { }

  ngOnInit() {
    if (this.imageReestablisher) {
    this.imageReestablisher.subscribe(_ => {
      this.imagePreview = this.savedImage;
    });
    }
  }

  loadImageFile(file) {
    this.quizForm.get('image').patchValue(file);
    this.quizForm.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      if (this.quizForm.get('image').valid) {
        this.imageChanged.emit();
        this.imagePreview = reader.result as string;
      } else {
        this.imagePreview = null;
      }
    };
    reader.readAsDataURL(file);
  }

  onImagePick(event: Event) {
    this.loadImageFile((event.target as HTMLInputElement).files[0]);
  }
  uploadFile(event) {
    this.loadImageFile(event[0]);
    /* for (let index = 0; index < event.length; index++) {
      const element = event[index];
      this.files.push(element.name);
      console.log('entire element_ ' + element);
    } */
  }
  deleteImage() {
    this.savedImage = this.imagePreview;
    this.imageChanged.emit();
    this.quizForm.markAsDirty();
    this.quizForm.get('image').reset();
    // this.quiz.image = '';
    this.imagePreview = null;
    this.imageDeleted.emit();
  }
}
