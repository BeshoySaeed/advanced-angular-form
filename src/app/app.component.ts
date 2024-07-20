import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AngularTemplateFormComponent } from './components/angular-template-form/angular-template-form.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AngularTemplateFormComponent, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'angular-forms';
}
