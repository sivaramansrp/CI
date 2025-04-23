import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[libUppercase]',
  standalone: true,
})
export class UppercaseDirective {

  constructor(private el: ElementRef) {
    // Lógica de inicialización si es necesario
  }

  @HostListener('input', ['$event']) onInputChange(_event: Event): void {
    const INPUT = this.el.nativeElement;
    INPUT.value = INPUT.value.toUpperCase();
  }
}
