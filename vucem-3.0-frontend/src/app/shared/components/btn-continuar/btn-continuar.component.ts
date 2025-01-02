import { Component, EventEmitter, inject, Input, Output, signal, ViewChild } from '@angular/core';
import { DatosPasos } from '../../../core/models/shared/components.model';
import { WizardComponent } from '../wizard/wizard.component';
import { WizardService } from '../../../core/services/shared/wizard/wizard.service';

interface AccionBoton {
  accion: string;
  valor: number;
}

@Component({
  selector: 'btn-continuar',
  standalone: true,
  imports: [],
  templateUrl: './btn-continuar.component.html',
  styleUrl: './btn-continuar.component.scss'
})

export class BtnContinuarComponent {
  @Input({required:true}) datos!: DatosPasos;
  @Output() continuarEvento = new EventEmitter<AccionBoton>();

// @ViewChild(WizardComponent) wizardComponent!: WizardComponent;

  wizardService = inject(WizardService);


  get btn_ant_visibility() {
    return (this.datos.indice === 1  ? 'hidden' : 'visible')
  }

  get btn_cont_visibility() {
    return (this.datos.indice === this.datos.nro_pasos  ? false : true)
  }


  continuar() : void {
    const condicion = this.datos.indice > 0  && this.datos.indice < this.datos.nro_pasos;
    if (condicion) {
      this.wizardService.cambio_indice(this.datos.indice);
      const datosContinuar: AccionBoton = {
        accion: 'cont',
        valor: this.datos.indice += 1
      }
      this.continuarEvento.emit(datosContinuar)
    }
  }

  anterior() : void {
    const condicion = this.datos.indice > 1 && this.datos.indice < this.datos.nro_pasos + 1;
    if (condicion) {
      const datosAnterior: AccionBoton = {
        accion: 'ant',
        valor: this.datos.indice -= 1
      }

      this.continuarEvento.emit(datosAnterior)
    }
  }
}
