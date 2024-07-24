import {
  Directive,
  ElementRef,
  HostListener,
  Renderer2,
  SecurityContext,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';

@Directive({
  selector:
    '[contenteditable][formControlName],[contenteditable][formControl],[contenteditable][ngModel]',
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: EditableValueAccessor,
      multi: true,
    },
  ],
})
export class EditableValueAccessor implements ControlValueAccessor {
  onChange!: (newVal: string) => void;
  onTouched!: () => void;

  @HostListener('input', ['$event'])
  onInput(e: Event) {
    this.onChange((e.target as HTMLInputElement).innerHTML);
  }
  @HostListener('blur', ['$event'])
  onBlur(e: Event) {
    this.onTouched();
  }

  constructor(
    private renderer: Renderer2,
    private elementRef: ElementRef,
    private sanitizer: DomSanitizer
  ) {}

  writeValue(obj: any): void {
    this.renderer.setProperty(
      this.elementRef.nativeElement,
      'innerHTML',
      this.sanitizer.sanitize(SecurityContext.HTML, obj)
    );
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.renderer.setProperty(
      this.elementRef.nativeElement,
      'contentEditable',
      !isDisabled
    );
  }
}
