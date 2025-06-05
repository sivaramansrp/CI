import { BtnContinuarComponent } from '@ng-mf/data-access-user';
import { Component } from '@angular/core';
import { DatosPasos } from '@ng-mf/data-access-user';
import { INSPECCION_FISICA_PASOS } from '../../enums/solicitud-pantallas.enum';
import { ListaPasosWizard } from '@ng-mf/data-access-user';
import { PasoDosComponent } from '../paso-dos/paso-dos.component';
import { PasoTresComponent } from '../paso-tres/paso-tres.component';
import { PasoUnoComponent } from '../paso-uno/paso-uno.component';
import { ViewChild } from '@angular/core';
import { WizardComponent } from '@ng-mf/data-access-user';

/** Interfaz para definir la estructura de las acciones de los botones */
interface AccionBoton {
  /**
   * La acción que se realizará mediante el botón
   */
  accion: string;
  /**
   * El valor del índice
   */
  valor: number;
}
/**
 * Componente para gestionar la inspección física de los servicios extraordinarios.
 */
@Component({
  selector: 'app-inspeccion-fisica',
  standalone: true,
  imports: [
    WizardComponent,
    PasoDosComponent,
    PasoUnoComponent,
    PasoTresComponent,
    BtnContinuarComponent,
  ],
  templateUrl: './inspeccion-fisica.component.html',
  styleUrl: './inspeccion-fisica.component.scss',
})
/** Componente para gestionar la inspección física de los servicios extraordinarios */
export class InspeccionFisicaComponent {
  /** Lista de pasos del asistente inicializados desde la enumeración */
  pasos: ListaPasosWizard[] = INSPECCION_FISICA_PASOS;

  /** Índice de pasos activos actuales*/
  indice: number = 1;

  /** Referencia al componente secundario Wizard */
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;

  /** Estructura de datos para gestionar las propiedades de los pasos del asistente */
  datosPasos: DatosPasos = {
    nroPasos: this.pasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };

  /**
   * Maneja la navegación entre los pasos del asistente según las acciones de los botones.
   * @param e - La acción del botón que contiene el tipo de acción y el valor del índice.
   */
  getValorIndice(evento: AccionBoton): void {
    this.indice = evento.valor;
    this.wizardComponent[evento.accion === 'cont' ? 'siguiente' : 'atras']();
  }
}
