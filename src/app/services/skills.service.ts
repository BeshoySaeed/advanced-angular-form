import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SkillsService {
  constructor() {}

  getSkills() : Observable<string[]> {
    return of(['Javascript', 'Typescript', 'RxJs', 'NgRx', 'CSS', 'HTML']);
  }
}
