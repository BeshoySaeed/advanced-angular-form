import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AsyncValidator implements AsyncValidator {
  constructor(private http: HttpClient) {}

  validate(
    control: AbstractControl<string>
  ): Observable<ValidationErrors | null> | Promise<ValidationErrors | null> {
    return this.http
      .get<unknown[]>(
        `https://jsonplaceholder.typicode.com/users?username=${control.value}`
      )
      .pipe(
        map((users) => {
          return users.length >= 1 ? { isExist: { exist: true } } : null;
        }),
        catchError(() => of(null))
      );
  }
}
