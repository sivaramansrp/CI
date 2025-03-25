import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[libUppercase]',
  standalone: true,
})
export class UppercaseDirective {

  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event']) onInputChange(event: Event) {
    const input = this.el.nativeElement;
    input.value = input.value.toUpperCase();
  }
}
