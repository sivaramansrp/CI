import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AccionBoton,
  AlertComponent,
  DatosPasos,
  ListaPasosWizard,
  PASOS,
} from '@ng-mf/data-access-user';
import { WizardComponent } from '@ng-mf/data-access-user';
import { PasoUnoComponent } from '../paso-uno/paso-uno.component';
import { PasoDosComponent } from '../paso-dos/paso-dos.component';
import { PasoTresComponent } from '../paso-tres/paso-tres.component';
import { BtnContinuarComponent } from '@ng-mf/data-access-user';
@Component({
  selector: 'app-solicitud-page',
  standalone: true,
  imports: [
    CommonModule,
    AlertComponent,
    WizardComponent,
    PasoUnoComponent,
    PasoDosComponent,
    PasoTresComponent,
    BtnContinuarComponent,
  ],
  templateUrl: './solicitud-page.component.html',
  styleUrl: './solicitud-page.component.css',
})
export class SolicitudPageComponent {
  tituloMensaje: string | null =
    'Permiso sanitario de importación de medicamentos con registro sanitario';
  pasos: ListaPasosWizard[] = PASOS;

  indice: number = 1;
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;

  datosPasos: DatosPasos = {
    nroPasos: this.pasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };

  seleccionaTab(i: number): void {
    this.indice = i;
  }
  getValorIndice(e: AccionBoton): void {
    if (e.valor > 0 && e.valor < 5) {
      this.indice = e.valor;
      this.tituloMensaje = SolicitudPageComponent.obtenerNombreDelTítulo(
        e.valor
      );

      if (e.accion === 'cont') {
        this.wizardComponent.siguiente();
      } else {
        this.wizardComponent.atras();
      }
    }
  }

  static obtenerNombreDelTítulo(valor: number): string {
    switch (valor) {
      case 1:
        return 'Registro de solicitud IMMEX modalidad ampliación sensibles';
      case 2:
        return 'Cargar archivos';
      case 3:
        return 'Cargar archivos';
      case 4:
        return 'Firmar';
      default:
        return 'Registro de solicitud IMMEX modalidad ampliación sensibles';
    }
  }
}
