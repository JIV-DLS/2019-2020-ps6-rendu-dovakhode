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
        this.imageChanged.emit();
        this.imagePreview = reader.result as string;
        this.imgShower.nativeElement.src = this.imagePreview;
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

}
