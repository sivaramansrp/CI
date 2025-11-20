import { Component, ViewChild } from '@angular/core';
import { ConsultaioQuery, ConsultaioState, DatosPasos, ListaPasosWizard, WizardComponent } from '@ng-mf/data-access-user';
import { ERROR_FORMA_ALERT, MENSAJE_DE_EXITO_ETAPA_UNO, PASOSACUICULTURA, PRIVACY_NOTICE_CONTENT } from '../../constantes/220203/importacion-de-acuicultura.enum';
import { AccionBoton } from '../../models/220203/importacion-de-acuicultura.module';
import { PasoUnoComponent } from '../paso-uno/paso-uno.component';
import { map, Subject, takeUntil } from 'rxjs';

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
  esFormaInValido: boolean = false;

  /**
 * Indica si ya se llenaron todos los formularios del paso 1.
 *
 * Se utiliza para mostrar/ocultar el alert azul.
 */
  esPasoUnoCompleto: boolean = false;

  /**
 * @description mnsaje al terminar de llenar el paso uno correctamente y generar folio
 */
  mensajePasos: string = '';

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

  /** Indica la visibilidad del botón Guardar. */
  public btnGuardarVisible: string = 'visible';

  /**
 * Notificador para destruir las suscripciones y evitar fugas de memoria.
 * @type {Subject<void>}
 * @private
 */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
 * Estado de la consulta actual, contiene la información relevante del solicitante.
 * @type {ConsultaioState}
 */
  public consultaState!: ConsultaioState;
  /**
 * Variable para almacenar el id de la solicitud.
 * @private
 */
  public idSolicitud: string = '';

  /**
   * Objeto con la configuración de los textos y número de pasos del wizard.
   * @public
   * @type {DatosPasos}
   * @memberof SanidadCertificadoComponent
   */
  datosPasos: DatosPasos = {
    nroPasos: this.PASOS.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
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
 * Constructor del componente.
 * Este constructor inicializa el componente y establece el estado inicial de la validación
 * y de las secciones del formulario utilizando el servicio `SeccionLibStore`.
 * @constructor
 * @param consultaQuery
 */
  constructor(private consultaQuery: ConsultaioQuery) { }
  ngOnInit(): void {
    this.obtenerDatosDelStore();
  }

  /**
   * Método que maneja la acción del botón y navega entre los pasos del wizard.
   * Valida formularios antes de continuar desde el primer paso y controla la navegación.
   * @public
   * @param {AccionBoton} e - Objeto que contiene la acción (cont/ant) y el valor del índice del botón
   * @memberof SanidadCertificadoComponent
   */
  async getValorIndice(e: AccionBoton): Promise<void> {
    this.esFormaInValido = false;

    // Validar formularios antes de continuar desde el paso uno
    if (this.indice === 1 && e.accion === 'cont') {
      const ES_VALIDO = await this.validarTodosFormulariosPasoUno();
      if (!ES_VALIDO) {
        console.log("no es valido");
        this.datosPasos.indice = this.indice;
        this.esFormaInValido = true;
        return; // Detener ejecución si los formularios son inválidos
      }
    }
    console.log("es valido");

    this.esFormaInValido = false;
    this.esPasoUnoCompleto = true;
    // Validar que el nuevo índice esté dentro de los límites permitidos
    if (e.valor > 0 && e.valor <= this.PASOS.length) {
      this.indice = e.valor;

      // Actualizar el índice y datosPasos
      if (e.accion === 'cont') {
        this.wizardComponent.siguiente();
      } else {
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
  private async validarTodosFormulariosPasoUno(): Promise<boolean> {
    if (!this.pasoUnoComponent) {
      console.log("!this.pasoUnoComponent");

      return true;
    }
    const ES_FORMULARIO_VALIDO = await this.pasoUnoComponent.validarFormularios();
    console.log("ES_FORMULARIO_VALIDO", ES_FORMULARIO_VALIDO);

    return ES_FORMULARIO_VALIDO;
  }

  /**
 * Obtiene los datos del store y los guarda utilizando el servicio.
 */
  obtenerDatosDelStore(): void {
    this.consultaQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.consultaState = seccionState;
          this.idSolicitud = seccionState.id_solicitud;
          const NUEVO = MENSAJE_DE_EXITO_ETAPA_UNO.replace(
            '_folio_',
            this.consultaState.id_solicitud ?? '0'
          );
          this.mensajePasos = NUEVO;
        })
      )
      .subscribe();
  }

}