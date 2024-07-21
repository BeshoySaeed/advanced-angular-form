import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-angular-reactive-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './angular-reactive-form.component.html',
  styleUrl: './angular-reactive-form.component.css',
})
export class AngularReactiveFormComponent {
  phoneLabels = ['phone', 'mobile', 'home', 'work'];

  form: FormGroup = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    nickName: new FormControl(''),
    email: new FormControl(''),
    passGroup: new FormGroup({
      password: new FormControl(''),
      confirm: new FormControl(''),
    }),
    phones: new FormArray([
      new FormGroup({
        label: new FormControl(this.phoneLabels[0]),
        phone: new FormControl(''),
      }),
    ]),
  });

  get phones(): FormArray {
    return this.form.get('phones') as FormArray;
  }

  addControl() {
    this.phones.push(
      new FormGroup({
        label: new FormControl(this.phoneLabels[0]),
        phone: new FormControl(''),
      })
    );
  }
  removeControl(i: number) {
    this.phones.removeAt(i);
  }
}
