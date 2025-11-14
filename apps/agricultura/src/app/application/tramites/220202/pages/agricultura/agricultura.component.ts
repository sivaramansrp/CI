import {
  ALERT_TEXTO,
  MENSAJE_DE_EXITO_ETAPA_UNO,
  PASOS,
} from '../../constantes/220202/fitosanitario.enums';
import {
  AccionBoton,
  ListaPasosWizard,
} from '../../models/220202/fitosanitario.model';
import { Component, EventEmitter, OnInit, ViewChild } from '@angular/core';
import {
  ConsultaioQuery,
  ConsultaioState,
  DatosPasos,
  Usuario,
  WizardComponent,
} from '@ng-mf/data-access-user';
import { Subject, map, takeUntil } from 'rxjs';
import { PasoUnoComponent } from '../paso-uno/paso-uno.component';
import { USUARIO_INFO } from '@libs/shared/data-access-user/src/core/enums/usuario-info.enum';

/**
 * @fileoverview Componente para la gestión del formulario de agricultura.
 * Este componente maneja la lógica y la presentación del formulario de agricultura,
 * incluyendo la navegación entre pasos y la gestión de los datos.
 * @module agricultura
 */

/**
 * Componente para el formulario de agricultura.
 * Este componente se encarga de gestionar el formulario de agricultura, incluyendo
 * la navegación entre los pasos del formulario y la actualización de datos.
 * @class AgriculturaComponent
 * @selector app-agricultura
 * @templateUrl ./agricultura.component.html
 */
@Component({
  selector: 'app-agricultura',
  templateUrl: './agricultura.component.html',
})
export class AgriculturaComponent implements OnInit {
  /**
   * @description Texto que se muestra en la alerta del formulario.
   * Este texto es utilizado para proporcionar información al usuario sobre el propósito del formulario.
   * @type {string}
   */
  public readonly alertText = ALERT_TEXTO;

  /**
   * @description Array de objetos que definen los pasos del formulario.
   * Cada objeto contiene información sobre un paso específico,
   * incluyendo su número, título y si está completado.
   * Este array permite la gestión de las secciones o pasos dentro del formulario.
   * @type {ListaPasosWizard[]}
   */
  pasos: ListaPasosWizard[] = PASOS;

  /**
   * @description mnsaje al terminar de llenar el paso uno correctamente y generar folio
   */
  mensajePasos: string = '';

  /**
   * @description Referencia al componente Wizard.
   * Esta referencia permite acceder a los métodos y propiedades del componente Wizard,
   * como `siguiente()` y `atras()`, para controlar la navegación entre los pasos.
   *
   * @type {WizardComponent}
   * @viewChild WizardComponent
   */
  @ViewChild(WizardComponent) componenteWizard!: WizardComponent;

  //   /**
  //  * @description Referencia al componente btn-continuar.
  //  * Esta referencia permite acceder a los métodos y propiedades del componente btn-continuar,
  //  *
  //  * @type {BtnContinuarComponent}
  //  * @viewChild BtnContinuarComponent
  //  */
  @ViewChild(PasoUnoComponent) pasoUnoRef!: PasoUnoComponent;

  /**
   * @description Índice actual del paso en el que se encuentra el usuario.
   * Este índice se utiliza para determinar qué paso se muestra en cada momento.
   * Los valores posibles de `indice` corresponden a los pasos definidos en el arreglo `pasos`.
   *
   * @type {number}
   * @default 1
   */
  indice: number = 1;

  /** Indica si el botón Guardar debe mostrarse o estar habilitado en el formulario. */
  public btnGuardar: boolean = true;

  /** Indica la visibilidad del botón Guardar. */
  public btnGuardarVisible: string = 'visible';

  /**
   * Mensaje de error del formulario para mostrar en el alert.
   *
   * Contiene el HTML del mensaje de error a mostrar cuando hay validaciones fallidas.
   */
  formErrorAlert: string =
    '<strong>¡Error de registro! </strong> Faltan campos por capturar';

  /**
   * Indica si el formulario tiene errores de validación.
   *
   * Se utiliza para mostrar/ocultar el alert de errores en el modal.
   */
  esFormaInValido: boolean = false;

  /**
   * Indica si ya se llenaron todos los formularios del paso 1.
   *
   * Se utiliza para mostrar/ocultar el alert azul.
   */
  esPasoUnoCompleto: boolean = false;

  /**
   * @description Objeto que contiene los datos de los pasos del formulario.
   * Este objeto se utiliza para comunicar información entre el componente Agricultura
   * y el componente Wizard, como el número total de pasos, el índice del paso actual
   * y los textos de los botones de navegación (anterior y siguiente).
   *
   * @type {DatosPasos}
   */
  datosPasos: DatosPasos = {
    nroPasos: this.pasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };

  /**
   * Estado de la consulta actual, contiene la información relevante del solicitante.
   * @type {ConsultaioState}
   */
  public consultaState!: ConsultaioState;
  /**
   * Notificador para destruir las suscripciones y evitar fugas de memoria.
   * @type {Subject<void>}
   * @private
   */
  private destroyNotifier$: Subject<void> = new Subject();
  /**
   * Variable para almacenar el id de la solicitud.
   * @private
   */
  public idSolicitud: string = '';

  /**
   * Evento que se emite para cargar archivos.
   * Este evento se utiliza para notificar a otros componentes que se debe realizar una acción de
   */
  cargarArchivosEvento = new EventEmitter<void>();

  /**
   * Indica si el botón para cargar archivos está habilitado.
   */
  activarBotonCargaArchivos: boolean = false;

  /**
   * Indica si la sección de carga de documentos está activa.
   * Se inicializa en true para mostrar la sección de carga de documentos al inicio.
   */
  seccionCargarDocumentos: boolean = true;

  /** Carga de progreso del archivo */
  cargaEnProgreso: boolean = true;

  datosUsuario: Usuario = USUARIO_INFO;

  /**
   * Constructor del componente.
   * Este constructor inicializa el componente y establece el estado inicial de la validación
   * y de las secciones del formulario utilizando el servicio `SeccionLibStore`.
   * @constructor
   * @param consultaQuery
   */
  constructor(private consultaQuery: ConsultaioQuery) {}
  ngOnInit(): void {
    this.obtenerDatosDelStore();
  }

  /**
   * @description Maneja la acción del botón y determina la navegación (siguiente o anterior).
   * Este método se llama cuando el usuario hace clic en uno de los botones de navegación
   * del formulario.
   *
   * Recibe un objeto `AccionBoton` que contiene la acción a realizar (`cont` o `atras`)
   * y el valor del índice del paso al que se debe navegar.
   *
   * @param {AccionBoton} e - Objeto que contiene la acción y el valor a manejar.
   *   El `valor` representa el índice del paso al que ir. La `accion` determina si avanzar
   *   (valor `cont`) o retroceder (valor `atras`).
   *
   * @returns {void}
   */
  getValorIndice(e: AccionBoton): void {
    // Si estamos en el paso 1, validar antes de continuar

    if (this.indice === 1) {
      const VALIDA_PESTANAS = this.pasoUnoRef?.validarFormularios();
      if (!VALIDA_PESTANAS.valido) {
        // Detener la navegación si no es válido
        this.datosPasos.indice = this.indice;
        this.esFormaInValido = true;

        if (VALIDA_PESTANAS.mensaje) {
          this.formErrorAlert =
            '<strong>¡Error de registro! </strong> Faltan campos por capturar <br>' +
            VALIDA_PESTANAS.mensaje;
        } else {
          this.formErrorAlert =
            '<strong>¡Error de registro! </strong> Faltan campos por capturar';
        }
        return;
      }
    }

    this.esFormaInValido = false;
    this.esPasoUnoCompleto = true;
    if (e.valor > 0 && e.valor < 5) {
      this.indice = e.valor;
      if (e.accion === 'cont') {
        this.componenteWizard.siguiente();
      } else {
        this.componenteWizard.atras();
      }
    }
  }

  /**
   * Obtiene los datos del store y los guarda utilizando el servicio.
   */
  // eslint-disable-next-line class-methods-use-this
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

  /**
   * Emite un evento para cargar archivos.
   * {void} No retorna ningún valor.
   */
  onClickCargaArchivos(): void {
    this.cargarArchivosEvento.emit();
  }

  /**
   * Método para manejar el evento de carga de documentos.
   * Actualiza el estado del botón de carga de archivos.
   *  carga - Indica si la carga de documentos está activa o no.
   * {void} No retorna ningún valor.
   */
  manejaEventoCargaDocumentos(carga: boolean): void {
    this.activarBotonCargaArchivos = carga;
  }

  /**
   * Método para manejar el evento de carga de documentos.
   * Actualiza el estado de la sección de carga de documentos.
   *  cargaRealizada - Indica si la carga de documentos se realizó correctamente.
   * {void} No retorna ningún valor.
   */
  cargaRealizada(cargaRealizada: boolean): void {
    this.seccionCargarDocumentos = cargaRealizada ? false : true;
  }

  /**
   * Maneja el evento de carga en progreso emitido por un componente hijo.
   * Actualiza el estado de cargaEnProgreso según el valor recibido.
   * @param cargando Valor booleano que indica si la carga está en progreso.
   */
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  onCargaEnProgresoPadre(cargando: boolean) {
    this.cargaEnProgreso = cargando;
  }

  /**
   * Método para navegar a la sección anterior del wizard.
   * Actualiza el índice y el estado de los pasos.
   * {void} No retorna ningún valor.
   */
  anterior(): void {
    this.componenteWizard.atras();
    this.indice = this.componenteWizard.indiceActual + 1;
    this.datosPasos.indice = this.componenteWizard.indiceActual + 1;
  }

  /**
   * Método para navegar a la siguiente sección del wizard.
   * Realiza la validación de los documentos cargados y actualiza el índice y el estado de los pasos.
   * {void} No retorna ningún valor.
   */
  siguiente(): void {
    // Aqui se hara la validacion de los documentos cargdados
    this.componenteWizard.siguiente();
    this.indice = this.componenteWizard.indiceActual + 1;
    this.datosPasos.indice = this.componenteWizard.indiceActual + 1;
  }
  
}
