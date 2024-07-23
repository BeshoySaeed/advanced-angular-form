import { Directive, Input } from '@angular/core';
import {
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
} from '@angular/forms';

@Directive({
  selector: '[appBanWords]',
  standalone: true,
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: BanWordsDirective,
      multi: true,
    },
  ],
})
export class BanWordsDirective implements Validator {
  @Input()
  set appBanWords(value: string | string[]) {
    this.appBanWordsArr = Array.isArray(value) ? value : [value];
  }
  private appBanWordsArr: string[] = [];

  constructor() {}

  validate(control: AbstractControl<'string'>): ValidationErrors | null {
    const wordsFound = this.appBanWordsArr.find(
      (word) => word.toLowerCase() === control.value?.toLowerCase()
    );
    if (control.value) {
      return !wordsFound
        ? null
        : {
            appBanWords: {
              bannedWord: this.appBanWords,
              controlVal: control.value,
            },
          };
    } else {
      return null;
    }
  }
}
