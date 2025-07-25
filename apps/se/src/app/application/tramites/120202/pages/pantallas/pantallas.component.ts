import { AccionBoton, DatosPasos, ListaPasosWizard, WizardComponent } from '@libs/shared/data-access-user/src';
import { Component, ViewChild } from '@angular/core';
import { ALERTA_BUSCAR_ERROR } from '@libs/shared/data-access-user/src/tramites/constantes/mensajes-error-formularios';
import { AVISO } from '@libs/shared/data-access-user/src/tramites/constantes/aviso-privacidad.enum';
import { EXPEDICION_CERTIFICADO_ASIGNACION_PASOS } from '../../constantes/expedicion-certificados-asignacion-constantes.enum';

/**
 * Componente principal para la gestión de pantallas en el wizard de cupos.
 */
@Component({
  selector: 'app-pantallas',
  templateUrl: './pantallas.component.html',
  styleUrls: ['./pantallas.component.scss']
})
export class PantallasComponent {
  /**
     * Lista de pasos del wizard.
     * @type {ListaPasosWizard[]}
     */
  public pantallasPasos: ListaPasosWizard[] = EXPEDICION_CERTIFICADO_ASIGNACION_PASOS;

  /**
   * Índice del paso actual.
   * @type {number}
   * @default 1
   */
  public indice: number = 1;

  /**
   * Referencia al componente Wizard para controlar la navegación entre pasos.
   * @type {WizardComponent}
   */
  @ViewChild(WizardComponent)
  public wizardComponent!: WizardComponent;

  /**
   * 
   * Una cadena que representa la clase CSS para una alerta de información.
   * Esta clase se utiliza para aplicar estilo a los mensajes de información en el componente.
   */
  public infoAlert = 'alert-info';

  /**
   * Asigna el aviso de privacidad simplificado al atributo `TEXTOS`.
   */
  TEXTOS = AVISO.Aviso;

  /**
   * Indica si se debe mostrar un mensaje de error.
   * @type {boolean}
   */
  mostrarError: boolean = false;

  /**
   * Mensaje de error a mostrar.
   */
  esValido = true;

  /**
   * Asigna el mensaje de error al atributo `ALERTA_BUSCAR_ERROR`.
   */
  ALERTA_BUSCAR_ERROR = ALERTA_BUSCAR_ERROR;

  /**
   * Una cadena que representa la clase CSS para una alerta de error.
   */
  infoError = 'alert-danger';
  
  /**
   * Datos utilizados para el control del wizard.
   * @type {DatosPasos}
   */
  public datosPasos: DatosPasos = {
    nroPasos: this.pantallasPasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };

  /**
   * Actualiza el índice del paso y maneja la navegación hacia adelante o atrás.
   *
   * @param {AccionBoton} e - Objeto que contiene el valor del paso y la acción a realizar.
   * @returns {void}
   */
  public getValorIndice(e: AccionBoton): void {
    if (e.valor > 0 && e.valor <= this.pantallasPasos.length) {
      this.indice = e.valor;
      this.datosPasos.indice = e.valor;

      if (e.accion === 'cont') {
        this.wizardComponent.siguiente();
      } else {
        this.wizardComponent.atras();
      }
    }
  }

  /**
   * Maneja el evento de error al mostrar un mensaje de error.
   *
   * @param {boolean} event - Indica si se debe mostrar el mensaje de error.
   * @returns {void}
   */
  public mostrarErrorDirectoEvento(event: boolean): void {
    this.esValido = true;
    this.mostrarError = event;
  }
}
