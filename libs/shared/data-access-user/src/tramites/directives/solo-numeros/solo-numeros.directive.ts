import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[libSoloNumeros]',
  standalone: true,
})
export class SoloNumerosDirective {
  
  // eslint-disable-next-line class-methods-use-this
  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    const TECLAPERMITIDA = [
      'Backspace', 'Tab', 'End', 'Home', 'ArrowLeft', 'ArrowRight', 'Delete'
    ];

    if (TECLAPERMITIDA.indexOf(event.key) !== -1)
      {return;}

    const NUMERO = /^[0-9]$/;

    if (!NUMERO.test(event.key))
      {event.preventDefault();}
  }
}
