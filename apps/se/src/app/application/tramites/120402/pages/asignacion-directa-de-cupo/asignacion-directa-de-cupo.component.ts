/**
 * Componente que gestiona la asignación directa de cupo.
 * Muestra una serie de pantallas de pasos y utiliza textos predefinidos.
 */

import { Component, ViewChild } from '@angular/core';
import { DatosPasos, Notificacion, WizardComponent } from '@ng-mf/data-access-user';
import { ERROR_FORMA_ALERT, NOTA, PRIVACY_NOTICE_CONTENT } from '../../constantes/definiciones.enum';
import { ASIGNACION } from '@ng-mf/data-access-user';
import { DatosComponent } from '../datos/datos.component';
import { ListaPasosWizard } from '@ng-mf/data-access-user';
import { Tramite120402Query } from '../../estados/tramite120402.query';

/**
 * Interface que representa la acción de un botón en el wizard.
 */
interface AccionBoton {
  /**
   * Acción que se debe ejecutar (por ejemplo, 'cont' para continuar, 'atras' para retroceder).
   */
  accion: string;
  /**
   * Valor asociado a la acción, generalmente representa el índice del paso.
   */
  valor: number;
}

/**
 * Componente Angular para la asignación directa de cupo.
 * Controla la navegación entre los pasos del wizard y muestra alertas según la interacción del usuario.
 */
@Component({
  selector: 'app-asignacion-directa-de-cupo',
  templateUrl: './asignacion-directa-de-cupo.component.html',
})
export class AsignacionDirectaDeCupoComponent {
  /**
   * Referencia al componente wizard que controla la navegación entre pasos.
   */
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;


  /**
   * Referencia al componente DatosComponent, utilizado para validar los formularios del paso uno.
   */
  @ViewChild('datosRef') datosRef!: DatosComponent;


  /**
   * Contiene el mensaje de error que se muestra cuando la validación de formularios falla.
   */
  public formErrorAlert = ERROR_FORMA_ALERT;

  /**
   * Controla la visibilidad del mensaje de error cuando la validación de formularios falla.
   * }
   */
  esFormaValido: boolean = false;

  /**
   * Lista de pasos que forman el wizard para la asignación directa.
   */
  pantallasPasos: ListaPasosWizard[] = ASIGNACION;

  /**
   * Índice del paso actual en el wizard.
   */
  indice: number = 1;

  /**
   * Clase CSS para el tipo de alerta que se muestra (info, error, etc.).
   */
  public infoAlert = 'alert-info';

  /**
   * Controla si se debe mostrar o no la alerta al usuario.
   */
  public showAlert: boolean = false;

  /**
   * Mensaje de confirmación que se muestra cuando hay campos obligatorios no seleccionados.
   */
  MENSAJE_CONFIRMACION: string = NOTA.CONTINUAR_BUTTON_ALERT;

  /**
   * Constructor del componente.
   * 
   * @param tramite120402Query - Servicio para consultar el estado del trámite desde el store.
   */
  constructor(private tramite120402Query: Tramite120402Query) {}

  /**
   * Objeto que contiene la notificación actual que se mostrará al usuario.
   */
  nuevaAlertaNotificacion!: Notificacion;

  /**
   * Datos configurables para los pasos del wizard.
   */
  datosPasos: DatosPasos = {
    nroPasos: this.pantallasPasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };

  /**
   * Contenido del aviso de privacidad utilizado en el componente.
   * @public
   * @readonly
   * @type {string}
   * @memberof SanidadCertificadoComponent
   */
  readonly PRIVACY_NOTICE_CONTENT: string = PRIVACY_NOTICE_CONTENT;

  /**
   * Valida los formularios del paso actual y marca los campos inválidos como tocados para mostrar errores de validación.
   */
  public validarFormularios(): boolean {
    let isValid = true;

    // Validar formulario de solicitante (pestaña 1) a través del componente paso-uno
    if (this.datosRef) {
      isValid = this.datosRef.validarFormularios();
    } else {
      isValid = false;
    }

    return isValid;
  }

  /**
   * Método que actualiza el índice del paso actual según la acción del botón pulsado.
   * Si la acción es continuar y el valor está entre 1 y 4, avanza al siguiente paso.
   * Si la acción es retroceder, regresa al paso anterior.
   * 
   * @param e - Evento que contiene la acción y el valor del botón pulsado.
   */
  public getValorIndice(e: AccionBoton): void {
    this.esFormaValido = false;
    // Validar formularios antes de continuar desde el paso uno
    if (this.indice === 1 && e.accion === 'cont') {
      const ISVALID = this.validarFormularios();
      if (!ISVALID) {
        this.esFormaValido = true;
        // Desplazar hacia arriba para mostrar el mensaje de error
        window.scrollTo({ top: 0, behavior: 'smooth' });
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
    if (indiceActualizado > 0 && indiceActualizado <= this.pantallasPasos.length) {

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
   * Método para actualizar el estado del grid de comercializadores de productos.
   * Actualmente no implementado.
   */
}
