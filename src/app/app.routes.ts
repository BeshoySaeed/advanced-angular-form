import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import(
        './components/angular-template-form/angular-template-form.component'
      ).then((m) => m.AngularTemplateFormComponent),
  },
];
