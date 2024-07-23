import { HttpClient } from '@angular/common/http';
import { Directive } from '@angular/core';
import {
  AbstractControl,
  AsyncValidator,
  NG_ASYNC_VALIDATORS,
  ValidationErrors,
} from '@angular/forms';
import { catchError, map, Observable, of } from 'rxjs';

@Directive({
  selector: '[appAsyncDirective]',
  standalone: true,
  providers: [
    {
      provide: NG_ASYNC_VALIDATORS,
      useExisting: AsyncDirectiveDirective,
      multi: true,
    },
  ],
})
export class AsyncDirectiveDirective implements AsyncValidator {
  constructor(private http: HttpClient) {}

  validate(
    control: AbstractControl
  ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return this.http
      .get<any[]>(
        `https://jsonplaceholder.typicode.com/users?username=${control.value}`
      )
      .pipe(
        map((users) => {
          return users.length === 0
            ? null
            : { appAsyncDirective: { isTaken: true } };
        }),
        catchError(() => of(null)) // Handle errors and return null in case of an error
      );
  }
}
