import { CommonModule } from '@angular/common';
import { Component, ViewChild, viewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { BanWordsDirective } from '../../directives/ban-words.directive';
import { ConfirmPassDirective } from '../../directives/confirm-pass.directive';
import { AsyncDirectiveDirective } from '../../directives/async-directive.directive';

@Component({
  selector: 'app-angular-template-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    BanWordsDirective,
    ConfirmPassDirective,
    AsyncDirectiveDirective,
  ],
  templateUrl: './angular-template-form.component.html',
  styleUrl: './angular-template-form.component.css',
})
export class AngularTemplateFormComponent {
  @ViewChild(NgForm)
  form!: NgForm;
  initialFormValues: unknown;
  constructor() {}

  ngAfterViewInit() {
    queueMicrotask(() => {
      this.initialFormValues = this.form.value;
    });
  }

  user = {
    firstName: '',
    lastName: '',
    email: '',
    nickName: '',
    password: '',
    confirm: '',
  };

  onSubmit(e: Event) {
    this.initialFormValues = this.form.value;
  }
  resetForm(e: Event) {
    e.preventDefault();
    this.form.resetForm(this.initialFormValues);
  }
}
