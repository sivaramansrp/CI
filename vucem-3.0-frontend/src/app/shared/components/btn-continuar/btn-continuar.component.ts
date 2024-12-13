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
  // indice = input({required: true})
  @Input({required:true}) datos!: DatosPasos;
  @Output() continuarEvento = new EventEmitter<number>();
  constructor() {}

  continuar() : void {
    const CONDICION = this.datos.indice > 0  && this.datos.indice < this.datos.nro_pasos;
    if (CONDICION) {
      this.continuarEvento.emit(this.datos.indice += 1)
    }
  }

  anterior() : void {
    const CONDICION = this.datos.indice > 1 && this.datos.indice < this.datos.nro_pasos + 1;
    if (CONDICION) {
      this.continuarEvento.emit(this.datos.indice -= 1)
    }
  }
}
