import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AngularTemplateFormComponent } from './components/angular-template-form/angular-template-form.component';
import { FormsModule } from '@angular/forms';
import { AngularReactiveFormComponent } from './components/angular-reactive-form/angular-reactive-form.component';
import { HeaderNavComponent } from './components/header-nav/header-nav.component';
import { CustomRatingComponent } from './components/custom-rating/custom-rating.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    FormsModule,
    AngularTemplateFormComponent,
    AngularReactiveFormComponent,
    HeaderNavComponent,
    CustomRatingComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'angular-forms';
}
