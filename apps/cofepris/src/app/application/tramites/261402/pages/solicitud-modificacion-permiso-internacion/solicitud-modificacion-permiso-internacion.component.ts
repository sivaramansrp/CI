/**
 * el cual implementa un wizard (asistente) para guiar al usuario a través del proceso de solicitud
 * de modificación de un permiso de salida del territorio. Utiliza componentes y servicios compartidos
 * para la presentación y la gestión del flujo del asistente.
 */
import { Component, ViewChild } from '@angular/core';
import { DatosPasos, ListaPasosWizard, WizardComponent } from '@libs/shared/data-access-user/src';
import { AVISO } from '@libs/shared/data-access-user/src';
import { AccionBoton } from '../../enums/accion-botton.enum';
import { PASOS_EXPORTACION } from '../../constants/solicitud-modificacion-permiso-salida-territorio.enum';


/**
 * Decorador que define el componente Angular para la solicitud de modificación de permiso de internación.
 * Incluye el selector del componente y la ruta de su plantilla HTML.
 */
@Component({
  selector: 'app-solicitud-modificacion-permiso-internacion',
  templateUrl: './solicitud-modificacion-permiso-internacion.component.html',
})
export class SolicitudModificacionPermisoInternacionComponent {
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
   * 
   * Param e Objeto que contiene la acción y el valor del índice.
   */
  getValorIndice(e: AccionBoton): void {
    if (e.valor > 0 && e.valor < 4) {
      this.indice = e.valor;
      if (e.accion === 'cont') {
        this.wizardComponent.siguiente();
      } else {
        this.wizardComponent.atras();
      }
    }
  }
}
