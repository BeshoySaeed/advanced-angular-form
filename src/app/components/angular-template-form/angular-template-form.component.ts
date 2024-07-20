import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
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
  constructor() {}

  user = {
    firstName: '',
    lastName: '',
    email: '',
    nickName: '',
    password: '',
    confirm: '',
  };

  onSubmit(form: any) {}
}
