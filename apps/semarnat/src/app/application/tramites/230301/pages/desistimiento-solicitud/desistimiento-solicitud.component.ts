import { Component, ViewChild } from '@angular/core';
import { ERROR_FORMA_ALERT, SECCIONES_TRAMITE_230301 } from '../../enum/constants';
import { ListaPasosWizard, PASOS } from '../../models/disponsibles.model';

import { AccionBoton, DatosPasos, SeccionLibStore, WizardComponent } from '@ng-mf/data-access-user';
import { PasoUnoComponent } from '../paso-uno/paso-uno.component';

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
   * @property {PasoUnoComponent} PasoUnoComponent
   * @description
   * Referencia al componente hijo PasoUnoComponent.
   * Se utiliza para acceder a sus métodos y propiedades, especialmente para validar
   * los formularios contenidos en el primer paso del trámite de desistimiento.
   */
  @ViewChild('pasoUno') PasoUnoComponent!: PasoUnoComponent;

  /**
   * @property {boolean} esFormaValido
   * @description
   * Bandera que indica si hay errores de validación en los formularios.
   * Cuando es `true`, se muestra un mensaje de error indicando que hay campos requeridos sin completar.
   */
  esFormaValido: boolean = false;

  /**
   * @property {string} formErrorAlert
   * @description
   * Mensaje HTML que se muestra como alerta cuando faltan campos por capturar en el formulario.
   * Utiliza la constante ERROR_FORMA_ALERT definida en los archivos de constantes del módulo.
   */
  public formErrorAlert = ERROR_FORMA_ALERT;
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
    this.esFormaValido = false;
    // Validar formularios antes de continuar desde el paso uno
    if (this.indice === 1 && e.accion === 'cont') {
      const ISVALID = this.validarTodosFormulariosPasoUno();
      if (!ISVALID) {
        this.esFormaValido = true;
        return; // Detener ejecución si los formularios son inválidos
      }
    }

    let indiceActualizado = e.valor;
    if (e.accion === 'cont') {
      indiceActualizado = e.valor + 1;
    } else if (e.accion === 'ant') {
      indiceActualizado = e.valor - 1;
    }

    // Validar que el nuevo índice esté dentro de los límites permitidos
    if (indiceActualizado > 0 && indiceActualizado <= this.pasos.length) {

      // Actualizar el índice y datosPasos
      this.indice = indiceActualizado;
      this.datosPasos.indice = indiceActualizado;

      if (e.accion === 'cont') {
        this.wizardComponent.siguiente();
      } else if (e.accion === 'ant') {
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
  /**
   * @method validarTodosFormulariosPasoUno
   * @description
   * Valida todos los formularios del primer paso del trámite.
   * Si el componente hijo no está disponible, retorna true para no bloquear el flujo.
   * Si alguno de los formularios es inválido, retorna false para evitar avanzar al siguiente paso.
   * 
   * @returns {boolean} true si todos los formularios son válidos o no existe el componente hijo, false si algún formulario es inválido.
   * @private
   */
  private validarTodosFormulariosPasoUno(): boolean {
    if (!this.PasoUnoComponent) {
      return true;
    }
    const ISFORM_VALID_TOUCHED = this.PasoUnoComponent.validarFormularios();
    if (!ISFORM_VALID_TOUCHED) {
      return false;
    }
    return true;
  }
}