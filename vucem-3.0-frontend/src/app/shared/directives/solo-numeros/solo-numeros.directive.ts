import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appSoloNumeros]'
})
export class SoloNumerosDirective {

  constructor() { }

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    const teclaPermitida = [
      'Backspace', 'Tab', 'End', 'Home', 'ArrowLeft', 'ArrowRight', 'Delete'
    ];

    if (teclaPermitida.indexOf(event.key) !== -1)
      return;

    const numero = /^[0-9]$/;

    if(!numero.test(event.key))
      event.preventDefault();
  }
}
