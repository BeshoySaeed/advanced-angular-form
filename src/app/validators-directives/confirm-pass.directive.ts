import { Directive } from '@angular/core';
import {
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
} from '@angular/forms';

@Directive({
  selector: '[appConfirmPass]',
  standalone: true,
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: ConfirmPassDirective,
      multi: true,
    },
  ],
})
export class ConfirmPassDirective implements Validator {
  constructor() {}
  validate(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password');
    const confirm = control.get('confirm');
    const error = { confirmPassword: { misMatch: true } };
    if (password?.value === confirm?.value) {
      return null;
    }
    confirm?.setErrors(error);
    return error;
  }
}
