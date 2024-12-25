import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[HoraFormato]',
  standalone: true
})
export class HoraFormatoDirective {
  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event']) onInputChange(event: Event) {
    const input = this.el.nativeElement;
    let value = input.value.replace(/[^0-9]/g, ''); // Eliminar caracteres no numéricos

    if (value.length > 4) {
      value = value.slice(0, 4); // Limitar la longitud a 4 caracteres
    }
    if (value.length >= 3) {
      value = value.slice(0, 2) + ':' + value.slice(2, 4); // Insertar dos puntos
    } else if (value.length >= 1) {
      value = value.slice(0, 2);
    }
    input.value = value;
  }
}
