import { AbstractControl, ValidationErrors } from '@angular/forms';

export function passwordConfirmation(
  control: AbstractControl
): ValidationErrors | null {
  const password = control.get('password');
  const confirm = control.get('confirm');
  const error = { passwordConfirmation: { mismatch: true } };

  if (confirm?.errors && !confirm.hasError('passwordConfirmation')) {
    return null;
  }

  if (password?.value !== confirm?.value) {
    confirm?.setErrors(error);
    return error;
  }

  confirm?.setErrors(null);
  return null;
}
