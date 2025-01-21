import { Directive, ElementRef, Host, HostListener } from '@angular/core';

@Directive({
  selector: '[appNumeroTelefonico]',
  standalone: true,
})
export class NumeroTelefonicoDirective {
  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event'])
  onInputChange(event: Event) {
    const input = this.el.nativeElement as HTMLInputElement;

    let valor = input.value.replace(/\D/g, '');

    if (valor.length > 3 && valor.length <= 6) {
      valor = valor.replace(/(\d{3})(\d+)/, '$1 $2');
    } else if (valor.length > 6) {
      valor = valor.replace(/(\d{3})(\d{3})(\d+)/, '$1 $2 $3');
    }
    input.value = valor;
  }
}
