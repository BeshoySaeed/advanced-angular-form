import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormGroupDirective,
  ReactiveFormsModule,
} from '@angular/forms';
import '@polymer/paper-input/paper-textarea';
import { EditableValueAccessor } from '../../value-accessors/editable-value-accessor.directive';

@Component({
  selector: 'app-custom-rating',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, EditableValueAccessor],
  templateUrl: './custom-rating.component.html',
  styleUrl: './custom-rating.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CustomRatingComponent {
  @ViewChild(FormGroupDirective) private formDir!: FormGroupDirective;
  form!: FormGroup;
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      textReview: this.fb.nonNullable.control({ value: '', disabled: false }),
    });
  }

  submitted(e: Event) {
    console.log(this.form.value);
    this.formDir.reset();
  }
}
