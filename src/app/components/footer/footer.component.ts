import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent {
  @Input()
  year!: number;

  @Output()
  yearChange = new EventEmitter<number>();

  @HostListener('click')
  onClick() {
    this.year = this.year + 1;
    this.yearChange.emit(this.year);
  }
}
