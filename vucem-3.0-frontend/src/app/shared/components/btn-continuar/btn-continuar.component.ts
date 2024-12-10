import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'btn-continuar',
  standalone: true,
  imports: [],
  templateUrl: './btn-continuar.component.html',
  styleUrl: './btn-continuar.component.scss'
})
export class BtnContinuarComponent {
  @Output() continuarEvento = new EventEmitter<number>();
  constructor() {}

  indice: number = 1;

  continuar() : void {
    this.continuarEvento.emit(this.indice += 1)
  }

  anterior() : void {
    this.continuarEvento.emit(this.indice -= 1)
  }
}
