import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { debounceTime, distinctUntilChanged, mergeMap } from 'rxjs';

@Component({
  selector: 'app-header-nav',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, RouterLinkActive],
  templateUrl: './header-nav.component.html',
  styleUrl: './header-nav.component.css',
})
export class HeaderNavComponent {
  standAloneSearchInp = new FormControl('');

  ngOnInit() {
    this.standAloneSearchInp.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe(console.log);
  }
}
