import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SelectComponent } from '../select/select.component';

@Component({
  selector: 'app-custom-select',
  standalone: true,
  imports: [CommonModule, SelectComponent],
  templateUrl: './custom-select.component.html',
  styleUrl: './custom-select.component.css'
})
export class CustomSelectComponent {

}
