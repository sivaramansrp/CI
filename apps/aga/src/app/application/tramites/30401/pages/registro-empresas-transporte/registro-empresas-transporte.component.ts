import { NOTA, PASOS } from '../../enums/registro-empresas-transporte.enum';
import { Component } from '@angular/core';
import { DatosPasos } from '@ng-mf/data-access-user';
import { ListaPasosWizard } from '@ng-mf/data-access-user';
import { ViewChild } from '@angular/core';
import { WizardComponent } from '@ng-mf/data-access-user';

/**
 * Interfaz que representa el botón de acción.
 */
interface AccionBoton {
  /**
   * La acción a realizar.
   */
  accion: string;
  /**
   * El valor asociado con la acción.
   */
  valor: number;
}

/**
 * Componente de registro-empresas-transporte.
 *
 * Este componente maneja el flujo de pasos para el proceso de registro-empresas-transporte.
 *
 * @selector 'app-registro-empresas-transporte'
 * @templateUrl './registro-empresas-transporte.component.html'
 * @styleUrl './registro-empresas-transporte.component.scss'
 */
@Component({
  selector: 'app-registro-empresas-transporte',
  templateUrl: './registro-empresas-transporte.component.html',
  styleUrl: './registro-empresas-transporte.component.scss',
})
export class RegistroEmpresasTransporteComponent {
  /**
   * Esta variable se utiliza para almacenar la lista de pasos.
   */
  pasos: ListaPasosWizard[] = PASOS;
  /**
   * Esta variable se utiliza para almacenar el índice del paso actual.
   */
  indice: number = 1;

  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;

  AVISO_PRIVACIDAD_ADJUNTAR = NOTA.AVISO_PRIVACIDAD_ADJUNTAR;

  /**
   * Datos relacionados con los pasos.
   */
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
