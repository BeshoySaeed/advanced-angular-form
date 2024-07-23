import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function banWord(bannedWords: string[]): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const foundBaned = bannedWords.find(
      (b) => b.toLowerCase() === control.value.toLowerCase()
    );
    return !foundBaned ? null : { banWord: { bannedWord: control.value } };
  };
}
