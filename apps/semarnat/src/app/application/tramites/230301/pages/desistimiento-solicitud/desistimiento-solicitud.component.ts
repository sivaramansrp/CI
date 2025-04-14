import { Component, ViewChild } from '@angular/core';
import { ListaPasosWizard, PASOS } from '../../models/disponsibles.model';

import { AccionBoton, DatosPasos, SeccionLibStore, WizardComponent } from '@ng-mf/data-access-user';
import { SECCIONES_TRAMITE_230301 } from '../../enum/constants';

@Component({
  selector: 'app-desistimiento-solicitud',
  templateUrl: './desistimiento-solicitud.component.html',
  styleUrl: './desistimiento-solicitud.component.scss',
})

export class DesistimientoSolicitudComponent {

  /**
   * Referencia al componente del asistente (wizard).
   * @type {WizardComponent}
   */
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;

  /**
   * Índice del paso actual en el asistente.
   * @type {number}
   */
  indice: number = 1;

  /**
   * Lista de pasos del asistente.
   * @type {ListaPasosWizard[]}
   */
  pasos: ListaPasosWizard[] = PASOS;

  /**
   * Datos de los pasos del asistente.
   * @type {DatosPasos}
   */
  datosPasos: DatosPasos = {
    nroPasos: this.pasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };

  /**
   * Clase CSS para una alerta de información.
   * 
   * Esta clase se utiliza para aplicar estilo a los mensajes de información en el componente.
   * @type {string}
   */
  public infoAlert = 'alert-info';

  /**
   * Método para seleccionar una pestaña específica.
   * @param {number} i - Índice de la pestaña a seleccionar.
   * @returns {void}
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }

  /**
   * Constructor de la clase `DesistimientoSolicitudComponent`.
   * Inicializa el estado de las secciones y las formas en el almacén.
   * @param {SeccionLibStore} seccionStore - Almacén para gestionar el estado de las secciones.
   */
  constructor(private readonly seccionStore: SeccionLibStore) {
    this.asignarSecciones();
  }

  /**
   * Obtiene el valor del índice de la acción del botón.
   * 
   * Este método actualiza el índice del asistente y navega al siguiente o anterior paso
   * dependiendo de la acción del botón.
   * @param {AccionBoton} e - Acción del botón.
   * @returns {void}
   */
  getValorIndice(e: AccionBoton): void {
    if (e.valor > 0 && e.valor < 5) {
      this.indice = e.valor;
      if (e.accion === 'cont') {
        this.wizardComponent.siguiente();
      } else {
        this.wizardComponent.atras();
      }
    }
  }

  private asignarSecciones(): void {
    const SECCIONES: boolean[] = [];
    const FORMA_VALIDA: boolean[] = [];
    const PREDETERMINADO = SECCIONES_TRAMITE_230301
    for (const LLAVE_SECCION in PREDETERMINADO.PASO_1) {
      if (Object.prototype.hasOwnProperty.call(PREDETERMINADO.PASO_1, LLAVE_SECCION)) {
        // @ts-expect-error - fix this
        SECCIONES.push(PREDETERMINADO.PASO_1[LLAVE_SECCION]);
        FORMA_VALIDA.push(false);
      }
    }
    this.seccionStore.establecerSeccion(SECCIONES);
    this.seccionStore.establecerFormaValida(FORMA_VALIDA);
  }
}