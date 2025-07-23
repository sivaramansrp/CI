import { Component, ViewChild } from '@angular/core';
import { DatosPasos, ListaPasosWizard, WizardComponent } from '@ng-mf/data-access-user';
import { ERROR_FORMA_ALERT, PASOSACUICULTURA, PRIVACY_NOTICE_CONTENT } from '../../constantes/220203/importacion-de-acuicultura.enum';
import { AccionBoton } from '../../models/220203/importacion-de-acuicultura.module';
import { PasoUnoComponent } from '../paso-uno/paso-uno.component';

/**
 * @fileoverview
 * Componente principal para la gestión del certificado de sanidad en el trámite de importación de acuicultura (220203).
 * Controla el flujo de pasos del wizard, la navegación entre secciones y la validación de formularios.
 * Cobertura de documentación completa: cada clase, método, propiedad y ViewChild está documentado en español.
 * @module SanidadCertificadoComponent
 */

/**
 * Componente principal para la gestión del certificado de sanidad en el trámite de importación de acuicultura.
 * Permite navegar entre los pasos del wizard, controla la validación de formularios y gestiona el estado del trámite.
 * Coordina la navegación entre diferentes secciones del proceso de importación.
 * 
 * @class SanidadCertificadoComponent
 * @memberof SanidadCertificadoComponent
 */
@Component({
  selector: 'app-sanidad-certificado',
  templateUrl: './sanidad-certificado.component.html',
})
export class SanidadCertificadoComponent {

  /**
   * Indicador de validez del formulario para mostrar mensajes de error.
   * @public
   * @type {boolean}
   * @default false
   * @memberof SanidadCertificadoComponent
   */
  esFormaValido: boolean = false;

  /**
   * Mensaje de error que se muestra cuando la validación de formularios falla.
   * @public
   * @readonly
   * @type {string}
   * @memberof SanidadCertificadoComponent
   */
  public readonly FORM_ERROR_ALERT = ERROR_FORMA_ALERT;

  /**
   * Contenido del aviso de privacidad utilizado en el componente.
   * @public
   * @readonly
   * @type {string}
   * @memberof SanidadCertificadoComponent
   */
  readonly PRIVACY_NOTICE_CONTENT: string = PRIVACY_NOTICE_CONTENT;

  /**
   * Lista de pasos del wizard obtenida de las constantes del trámite de acuicultura.
   * @public
   * @readonly
   * @type {ListaPasosWizard[]}
   * @memberof SanidadCertificadoComponent
   */
  readonly PASOS: ListaPasosWizard[] = PASOSACUICULTURA;

  /**
   * Índice actual del paso seleccionado en el wizard.
   * @public
   * @type {number}
   * @default 1
   * @memberof SanidadCertificadoComponent
   */
  indice: number = 1;

  /**
   * Objeto con la configuración de los textos y número de pasos del wizard.
   * @public
   * @type {DatosPasos}
   * @memberof SanidadCertificadoComponent
   */
  datosPasos: DatosPasos = {
    nroPasos: this.PASOS.length,
    indice: this.indice,
    txtBtnAnt: 'Guardar',
    txtBtnSig: 'Continuar',
  };

  /**
   * Referencia al componente Wizard para controlar la navegación entre pasos.
   * @public
   * @type {WizardComponent}
   * @memberof SanidadCertificadoComponent
   */
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;

  /**
   * Referencia al componente del primer paso para validación de formularios.
   * @public
   * @type {PasoUnoComponent}
   * @memberof SanidadCertificadoComponent
   */
  @ViewChild('pasoUnoRef') pasoUnoComponent!: PasoUnoComponent;

  /**
   * Método que maneja la acción del botón y navega entre los pasos del wizard.
   * Valida formularios antes de continuar desde el primer paso y controla la navegación.
   * @public
   * @param {AccionBoton} e - Objeto que contiene la acción (cont/ant) y el valor del índice del botón
   * @memberof SanidadCertificadoComponent
   */
  getValorIndice(e: AccionBoton): void {
    this.esFormaValido = false;

    // Validar formularios antes de continuar desde el paso uno
    if (this.indice === 1 && e.accion === 'cont') {
      const ES_VALIDO = this.validarTodosFormulariosPasoUno();
      if (!ES_VALIDO) {
        this.esFormaValido = true;
        return; // Detener ejecución si los formularios son inválidos
      }
    }
    // Calcular el nuevo índice basado en la acción
    let indiceActualizado = e.valor;
    if (e.accion === 'cont') {
      indiceActualizado = e.valor + 1;
    } else if (e.accion === 'ant') {
      indiceActualizado = e.valor - 1;
    }

    // Validar que el nuevo índice esté dentro de los límites permitidos
    if (indiceActualizado > 0 && indiceActualizado <= this.PASOS.length) {

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
  /**
   * Valida todos los formularios del primer paso antes de permitir continuar al siguiente paso.
   * Verifica que el componente del primer paso esté disponible y ejecuta su método de validación.
   * @private
   * @returns {boolean} Retorna true si todos los formularios son válidos, false en caso contrario
   * @memberof SanidadCertificadoComponent
   */
  private validarTodosFormulariosPasoUno(): boolean {
    if (!this.pasoUnoComponent) {
      return true;
    }
    const ES_FORMULARIO_VALIDO = this.pasoUnoComponent.validarFormularios();
    return ES_FORMULARIO_VALIDO;
  }

}