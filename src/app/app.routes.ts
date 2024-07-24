import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import(
        './components/angular-template-form/angular-template-form.component'
      ).then((c) => c.AngularTemplateFormComponent),
  },
  {
    path: 'reactive',
    loadComponent: () =>
      import(
        './components/angular-reactive-form/angular-reactive-form.component'
      ).then((c) => {
        return c.AngularReactiveFormComponent;
      }),
  },
  {
    path: 'customRating',
    loadComponent: () =>
      import('./components/custom-rating/custom-rating.component').then((c) => {
        return c.CustomRatingComponent;
      }),
  },
];
