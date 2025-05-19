import { Component, ViewChild } from '@angular/core';
import { DatosPasos, ListaPasosWizard, WizardComponent } from '@libs/shared/data-access-user/src';
import { AVISO } from '@libs/shared/data-access-user/src';
import { AccionBoton } from '../../enums/accion-botton.enum';
import { PASOS_EXPORTACION } from '../../constants/solicitud-modificacion-permiso-salida-territorio.enum';

/**
 * DesistirSolicitudInformacionHistoricaComponent
 * Este componente gestiona el asistente (wizard) para la solicitud de modificación de permisos.
 * Permite navegar entre los pasos del asistente y gestionar los datos relacionados con cada paso.
 */
@Component({
  selector: 'app-desistir-solicitud-informacion-historica',
  templateUrl: './desistir-solicitud-informacion-historica.component.html',
})
export class DesistirSolicitudInformacionHistoricaComponent {
  /**
   * Lista de pasos del asistente para la solicitud de modificación de permiso.
   */
  pasosSolicitar: ListaPasosWizard[] = PASOS_EXPORTACION;

  /**
   * Índice del paso actual en el asistente.
   */
  indice: number = 1;

  /**
   * Índice de la pestaña seleccionada.
   */
  tabIndex: number = 1;

  /**
   * Referencia al componente del asistente (wizard).
   */
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;

  /**
   * Mensaje de alerta utilizado en el componente.
   * Puede ser asignado a cualquiera de las claves definidas en TEXTOS.
   */
  public alert_message: string = AVISO.Aviso;

  /**
   * Datos relacionados con los pasos del asistente.
   * Incluye el número total de pasos, el índice actual y los textos de los botones.
   */
  datosPasos: DatosPasos = {
    nroPasos: this.pasosSolicitar.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };

  /**
   * Cambia el índice del paso actual en el asistente.
   * Si la acción es "cont", avanza al siguiente paso.
   * Si la acción no es "cont", retrocede al paso anterior.
   * Objeto que contiene la acción y el valor del índice.
   */
  getValorIndice(e: AccionBoton): void {
  if (e.valor <= 0 || e.valor >= 4) {
    return;
  }
  this.indice = e.valor;
  const VALOR_INDICE = e.accion === 'cont' ? this.wizardComponent.siguiente() : this.wizardComponent.atras();
}
}