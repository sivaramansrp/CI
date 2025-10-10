/**
 * @component CertificadoComponent
 * @descripcion
 * Componente responsable de manejar el flujo de pasos para el trámite de certificado zoosanitario para importación.
 * Permite la navegación entre los pasos del wizard, controla el índice actual, y gestiona la validación de las secciones.
 * Además, expone los textos y títulos relevantes para la interfaz y utiliza el componente Wizard para la navegación.
 *
 * @import { Component, ViewChild } from '@angular/core';
 * @import { WizardComponent } from '@ng-mf/data-access-user';
 * @import { DatosPasos } from '@ng-mf/data-access-user';
 * @import { PASOS } from '../../constantes/peru-certificado.module';
 */
import { AccionBoton, ListaPasoWizard } from '../../models/peru-certificado.module';
import { Component, ViewChild } from '@angular/core';
import { DatosPasos, ERROR_FORMA_ALERT, WizardComponent } from '@libs/shared/data-access-user/src'
import { PAGO_DE_DERECHOS, SeccionLibStore } from '@ng-mf/data-access-user';
import { PASOS } from '../../constantes/peru-certificado.module';
import { PasoUnoComponent } from '../paso-uno/paso-uno.component';
import { Subject} from 'rxjs';
import { Tramite110222Query } from '../../estados/tramite110222.query';
import { Tramite110222State } from '../../estados/tramite110222.store';
/**
 * @component CertificadoComponent
 * @description
 * Componente responsable de manejar el flujo de pasos para el trámite de certificado zoosanitario para importación.
 * Permite la navegación entre los pasos del wizard, controla el índice actual, y gestiona la validación de las secciones.
 * Además, expone los textos y títulos relevantes para la interfaz y utiliza el componente Wizard para la navegación.
 *
 * @import { Component, ViewChild } from '@angular/core';
 * @import { WizardComponent } from '@ng-mf/data-access-user';
 * @import { DatosPasos } from '@ng-mf/data-access-user';
 * @import { PASOS } from '../../constantes/peru-certificado.module';
 */
@Component({
  selector: 'app-certificado',
  templateUrl: './certificado.component.html',
  styleUrl: './certificado.component.scss',
})
export class CertificadoComponent {

  /**
   * Array de pasos del wizard.
   * @type {Array<ListaPasoWizard>}
   */
  pasos: ListaPasoWizard[] = PASOS;

  /**
   * Propiedad pública que almacena los textos relacionados con el pago de derechos.
   * @type {any}
   */
  public TEXTOS = PAGO_DE_DERECHOS;

  /**
   * El título del mensaje mostrado en la vista.
   * @type {string | null}
   */
  tituloMensaje: string | null = 'Zoosanitario para importación';

  /**
   * Referencia al componente Wizard para controlar la navegación entre pasos.
   * @type {WizardComponent}
   */
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;

  /**
   * El índice del paso actual.
   * @type {number}
   */
  indice: number = 1;

  /**
   * Datos de los pasos del wizard, incluyendo textos de botones y número de pasos.
   * @type {DatosPasos}
   */
  datosPasos: DatosPasos = {
    nroPasos: this.pasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };

  solicitudState!: Tramite110222State;

  /**
   * Identificador numérico de la solicitud actual.
   * Se inicializa en 0 y se actualiza cuando se captura una nueva solicitud.
   */
  idSolicitud: number = 0;

  /**
   * Notificador para destruir los observables y evitar posibles fugas de memoria.
   * @type {Subject<void>}
   * @private
   */
  destroyNotifier$: Subject<void> = new Subject();

  /**
   * @property {boolean} esFormaValido
   * @description
   * Indica si el formulario del paso actual es válido.
   * Se utiliza para mostrar mensajes de error o controlar la navegación en el asistente.
   */
  esFormaValido: boolean = false;

  /**
   * @property {string} formErrorAlert
   * @description
   * Mensaje HTML que se muestra como alerta cuando faltan campos por capturar en el formulario.
   */
  public formErrorAlert = ERROR_FORMA_ALERT;

  /**
   * @property {PasoUnoComponent} pasoUnoComponent
   * @description
   * Referencia al componente hijo `PasoUnoComponent` mediante ViewChild.
   * Permite acceder a los métodos y propiedades del formulario del primer paso del asistente desde el componente padre.
   */
  @ViewChild(PasoUnoComponent) pasoUnoComponent!: PasoUnoComponent;

  /**
   * Inyecta los servicios necesarios y suscribe a la validación de la forma para actualizar el estado de la sección.
   * @param seccionStore Servicio para manejar el estado de la sección.
   * @param tramiteQuery Query para consultar el estado del trámite.
   */
  constructor(private seccionStore: SeccionLibStore, private tramiteQuery: Tramite110222Query) {
    this.tramiteQuery.selectTramite$
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((solicitud) => {
        this.solicitudState = solicitud;
      });

  }

  /**
   * Obtiene el valor del índice de la acción del botón.
   * Este método controla el cambio de paso en el wizard dependiendo de la acción del botón presionado.
   *
   * Si la acción es 'cont', pasa al siguiente paso. Si la acción es 'atras', regresa al paso anterior.
   *
   * @param e Acción del botón (cont o atras) y el valor asociado a la acción.
   */
  getValorIndice(e: AccionBoton): void {
    this.esFormaValido = false;
    if (e.accion === 'cont') {
      if (this.pasoUnoComponent && !this.pasoUnoComponent.validateAllForms()) {
        return;
      }
    }

    if (this.indice === 1 && e.accion === 'cont') {
      const ISVALID = this.validarTodosFormulariosPasoUno();
      if (!ISVALID) {
        this.esFormaValido = true;
        this.indice = 1;
        this.datosPasos.indice = 1;
      } else {
        this.indice = 2;
        this.datosPasos.indice = 2;
      }
    } else if (e.valor > 0 && e.valor <= this.pasos.length) {
      this.pasoNavegarPor(e);
    }
  }

  /**
   * Navega entre los pasos de un asistente (wizard) según la acción recibida.
   *
   * @param e - Objeto de tipo `AccionBoton` que contiene la acción a realizar y el valor del índice del paso.
   *
   * - Actualiza el índice actual y el índice en `datosPasos` con el valor proporcionado.
   * - Si el valor está entre 1 y 4 (inclusive), navega al siguiente paso si la acción es 'cont',
   *   o al paso anterior en caso contrario, utilizando los métodos del componente wizard.
   */
  pasoNavegarPor(e: AccionBoton): void {
    this.indice = e.valor;
    this.datosPasos.indice = e.valor;
    if (e.valor > 0 && e.valor < 5) {
      if (e.accion === 'cont') {
        this.wizardComponent.siguiente();
      } else {
        this.wizardComponent.atras();
      }
    }
  }

  /**
   * @method validarTodosFormulariosPasoUno
   * @description
   * Valida todos los formularios del componente `PasoUnoComponent`.
   * Si la referencia al componente no existe, retorna `true` (no hay formularios que validar).
   * Llama al método `validarFormularios()` del componente hijo y retorna `false` si algún formulario es inválido.
   * Retorna `true` si todos los formularios son válidos.
   *
   * @returns {boolean} Indica si todos los formularios del paso uno son válidos.
   */
  private validarTodosFormulariosPasoUno(): boolean {
    if (!this.pasoUnoComponent) {
      return true;
    }
    const ES_FORMULARIO_VALIDO_TOCADO = this.pasoUnoComponent.validarTodo();
    if (!ES_FORMULARIO_VALIDO_TOCADO) {
      return false;
    }
    return true;
  }
}