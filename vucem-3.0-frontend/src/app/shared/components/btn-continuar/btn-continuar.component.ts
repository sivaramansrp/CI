import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DatosPasos } from '../../../core/models/shared/components.model';

@Component({
  selector: 'btn-continuar',
  standalone: true,
  imports: [],
  templateUrl: './btn-continuar.component.html',
  styleUrl: './btn-continuar.component.scss'
})
export class BtnContinuarComponent {
  @Input({required:true}) datos!: DatosPasos;
  @Output() continuarEvento = new EventEmitter<number>();
  constructor() {}

  get visibility() {
    return (this.datos.indice === 1 ? 'hidden' : 'visible')
  }

  continuar() : void {
    const condicion = this.datos.indice > 0  && this.datos.indice < this.datos.nro_pasos;
    if (condicion) {
      this.continuarEvento.emit(this.datos.indice += 1)
    }
  }

  anterior() : void {
    const condicion = this.datos.indice > 1 && this.datos.indice < this.datos.nro_pasos + 1;
    if (condicion) {
      this.continuarEvento.emit(this.datos.indice -= 1)
    }
  }
}
