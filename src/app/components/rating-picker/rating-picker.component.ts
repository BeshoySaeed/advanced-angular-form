import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  Output,
  SimpleChange,
  SimpleChanges,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

type RatingTypes = 'great' | 'good' | 'neutral' | 'bad' | null;

@Component({
  selector: 'app-rating-picker',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rating-picker.component.html',
  styleUrl: './rating-picker.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: RatingPickerComponent,
      multi: true,
    },
  ],
})
export class RatingPickerComponent implements ControlValueAccessor {
  @Input()
  value: RatingTypes = null;

  @Input()
  disabled: boolean = true;

  @Output()
  change = new EventEmitter<RatingTypes>();

  @Input()
  @HostBinding('attr.tabIndex')
  tabIndex = 0;

  @HostListener('blur')
  onBlur() {
    this.onTouch();
  }

  onChange!: (value: RatingTypes) => void;
  onTouch!: () => void;

  constructor() {}
  writeValue(obj: RatingTypes): void {
    this.value = obj;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  ngOnInit() {}

  ngOnChange(change: SimpleChanges): void {
    if (change['value']) {
      this.onChange(change['value'].currentValue);
    }
  }
  setValue(value: RatingTypes) {
    this.value = value;
    this.onChange(this.value);
    this.change.emit(this.value);
  }
}
