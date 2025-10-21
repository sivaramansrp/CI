import {
  AVISO,
  DatosPasos,
  ListaPasosWizard,
  PASOS,
  WizardComponent,
} from '@libs/shared/data-access-user/src';
import { Component, OnDestroy, ViewChild } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import {
  Tramite110210State,
  Tramite110210Store,
} from '../../estados/store/tramite110210.store';
import {doDeepCopy, esValidObject } from '@ng-mf/data-access-user';
import { BuscarCertificadoDeOrigenService } from '../../services/buscar-certificado-de-origen/buscarCertificadoDeOrigen.service';
import { ERROR_FORMA_ALERT } from '../../constantes/tramite110210.enum';
import { PasoUnoComponent } from '../paso-uno/paso-uno.component';
import { Tramite110210Query } from '../../estados/queries/tramite110210.query';

/**
 * @descripcion
 * Interfaz que define la estructura de una acción de botón.
 */
interface AccionBoton {
  /**
   * La acción que se realizará.
   * @type {string}
   */
  accion: string;

  /**
   * El valor asociado a la acción.
   * @type {number}
   */
  valor: number;
}

@Component({
  templateUrl: './solicitud-page.component.html',
  styles: ``,
})
/**
 * @descripcion
 * Componente que representa la página de solicitud.
 */
export class SolicitudPageComponent implements OnDestroy {
  solicitudState!: Tramite110210State;

  /**
   * Notificador para destruir los observables y evitar posibles fugas de memoria.
   * @private
   * @type {Subject<void>}
   */
  destroyNotifier$: Subject<void> = new Subject();

  /** Identificador numérico para guardar la solicitud.
   * Se inicializa en 0 y se actualiza cuando se captura una nueva solicitud.
   */
  guardarIdSolicitud: number = 0;

  /** Mensaje de confirmación al guardar la solicitud.
   * Se inicializa como una cadena vacía y se actualiza cuando se guarda la solicitud.
   */
  guardarMensaje: string = '';

  /**
   * Identificador numérico de la solicitud actual.
   * Se inicializa en 0 y se actualiza cuando se captura una nueva solicitud.
   */
  idSolicitud: number = 0;

  /**
   * Constantes importadas desde el archivo de enumeración para los mensajes de advertencia.
   *
   * @type {AVISO}
   * @memberof RegistroParaLaComponent
   */
  public ADVERTENCIA = AVISO;
  /**
   * Lista de pasos del asistente.
   * @type {ListaPasosWizard[]}
   */
  pasos: ListaPasosWizard[] = PASOS;

  /**
   * Índice del paso actual.
   * @type {number}
   */
  indice: number = 1;

  /**
   * Referencia al componente del asistente.
   * @type {WizardComponent}
   */
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;
  /**
   * @property {PasoUnoComponent} pasoUnoComponent
   * @description
   * Referencia al componente hijo `PasoUnoComponent` mediante ViewChild.
   * Permite acceder a los métodos y propiedades del formulario del primer paso del asistente,
   * especialmente para validar todos sus formularios antes de avanzar al siguiente paso.
   */
  @ViewChild('pasoUno') pasoUnoComponent!: PasoUnoComponent;

  /**
   * @property {boolean} esFormaValido
   * @description
   * Indica si hay errores de validación en los formularios que se deben mostrar.
   * Se establece a `true` cuando se intenta avanzar al siguiente paso con formularios inválidos,
   * lo que activa la visualización de mensajes de error en la interfaz.
   */
  esFormaValido: boolean = false;

  /**
   * @property {Object} formErrorAlert
   * @description
   * Objeto que contiene la configuración del mensaje de error para formularios inválidos.
   * Utiliza la constante `ERROR_FORMA_ALERT` definida en las enumeraciones del trámite.
   * Define el título, mensaje y opciones de visualización para la alerta de error de validación de formularios.
   */
  public formErrorAlert = ERROR_FORMA_ALERT;

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
   * Constructor del componente.
   *
   * Inyecta los servicios necesarios para gestionar y consultar el estado
   * del trámite **110210**.
   * Al inicializarse, establece una suscripción al observable
   * `selectTramite110210$` expuesto por el `Tramite110210Query`,
   * manteniendo sincronizada la propiedad `solicitudState` con los cambios
   * del store.
   *
   * @param {Tramite110210Store} TramiteStore - Servicio `Store` que administra el estado global
   *                                            del trámite 110210 (crear, actualizar y resetear).
   * @param {Tramite110210Query} tramiteQuery - Servicio `Query` que expone observables y selectores
   *                                            para consultar de forma reactiva el estado del trámite 110210.
   */
  constructor(
    public TramiteStore: Tramite110210Store,
    public tramiteQuery: Tramite110210Query,
    private service: BuscarCertificadoDeOrigenService,
  ) {
    this.tramiteQuery.selectTramite110210$
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((solicitud) => {
        this.solicitudState = solicitud;
      });
  }

  /**
   * @descripcion
   * Selecciona una pestaña del asistente.
   * @param {number} i - Índice de la pestaña a seleccionar.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }

  /**
   * @descripcion
   * Obtiene el valor del índice de la acción del botón.
   * @param {AccionBoton} e - Acción del botón.
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
        this.guardar();
      } else if (e.accion === 'ant') {
        this.wizardComponent.atras();
      }
    }
  }

  /**
   * @method guardar
   * @description
   * Envía la solicitud de guardar los datos del formulario al servicio correspondiente.
   * Utiliza el estado actual de la solicitud para construir el payload.
   * Si la respuesta es válida, actualiza los identificadores de solicitud y muestra un mensaje de éxito.
   */
  public guardar():void{
    const SOLICITUD = this.solicitudState;
    const PAYLOAD = {
        "solicitud": {
          "solicitante": {
            "rfc": "AAL0409235E6",
            "razonSocial": "INTEGRADORA DE URBANIZACIONES SIGNUM S DE RL DE CV",
            "descripcionGiro": "Siembra, cultivo y cosecha de otros cultivos",
            "correoElectronico": "vucem2021@gmail.com",
            "telefono": "55-98764532",
            "cveUsuario": "AAL0409235E6",
            "domicilio": {
              "pais": {
                "clave": "MEX",
                "nombre": "ESTADOS UNIDOS MEXICANOS"
              },
              "entidadFederativa": {
                "clave": "SIN",
                "nombre": "SINALOA"
              },
              "delegacionMunicipio": {
                "clave": "25001",
                "nombre": "AHOME"
              },
              "localidad": {
                "clave": "00181210008",
                "nombre": "LOS MOCHIS"
              },
              "colonia": {
                "clave": "00181210001",
                "nombre": "MIGUEL HIDALGO"
              },
              "calle": "CAMINO VIEJO",
              "numeroExterior": "1353",
              "numeroInterior": "",
              "codigoPostal": "81210"
            }
          },
          "cveRolCapturista": "PersonaMoral",
          "cveUsuarioCapturista": "AAL0409235E6",
          "clavePaisSeleccionado": SOLICITUD.paisBloqueClave ? SOLICITUD.paisBloqueClave : "",
          "idTratadoAcuerdoSeleccionado": SOLICITUD.tratadoAcuerdoClave ? SOLICITUD.tratadoAcuerdoClave : "",
          "discriminatorValue": "110210",
          "tramite": {
            "numFolioTramite": ""
          },
          "idSolicitud": ""
        },
        "puedeCapturarRepresentanteLegalCG": false,
        "datosMercancia": {
          "numeroCertificado": SOLICITUD.cveRegistroProductor ? SOLICITUD.cveRegistroProductor : ""
        },
        "guardar": "Continuar",
        "parametrosBP": {
          "idTramite": 110210
        }
      };

    this.service.guardar(PAYLOAD).pipe(
        takeUntil(this.destroyNotifier$)
      ).subscribe((response) => {
        if(esValidObject(response)) {
          const RESPONSE = doDeepCopy(response);
          this.guardarIdSolicitud = RESPONSE?.datos?.idSolicitud ?? 0;
          this.guardarMensaje = RESPONSE?.datos?.mensaje ?? '';
          this.generaCadena(this.guardarIdSolicitud);
        }
      });
  }
/**   * @method generaCadena
   * @description
   * Genera la cadena original para la solicitud guardada.
   */
  public generaCadena(solicitudId:number): void {
    const PAYLOAD = {
        "num_folio_tramite": null,
        "boolean_extranjero": true,
        "solicitante": {
            "rfc": "AAL0409235E6",
            "nombre": "Juan Pérez",
            "es_persona_moral": true,
            "certificado_serial_number": "string"
        },
        "cve_rol_capturista": "CapturistaGubernamental",
        "cve_usuario_capturista": "Gubernamental",
        "fecha_firma": "2025-07-01 20:01:25"
    };
    this.service.generaCadena(PAYLOAD, solicitudId).pipe(
        takeUntil(this.destroyNotifier$)
      ).subscribe((response) => {
        if(esValidObject(response)) {
          const RESPONSE = doDeepCopy(response);
          console.log('CADENA GENERADA', RESPONSE);
        }
      });
  }

  /**
   * @method validarTodosFormulariosPasoUno
   * @description
   * Valida todos los formularios del componente `PasoUnoComponent`.
   * Si la referencia al componente no existe, retorna `true` para permitir la navegación.
   * Llama al método `validarFormularios()` del componente hijo para verificar la validez de todos sus formularios.
   * Si algún formulario es inválido, retorna `false` para impedir el avance al siguiente paso.
   *
   * @returns {boolean} `true` si todos los formularios son válidos o si el componente no existe, `false` si algún formulario es inválido.
   * @private
   */
  private validarTodosFormulariosPasoUno(): boolean {
    if (!this.pasoUnoComponent) {
      return true;
    }
    const ISFORM_VALID_TOUCHED = this.pasoUnoComponent.validarFormularios();
    if (!ISFORM_VALID_TOUCHED) {
      return false;
    }
    return true;
  }

  /**
 * Hook de ciclo de vida de Angular que se ejecuta al destruir el componente.
 *
 * Se encarga de liberar recursos y cancelar las suscripciones activas
 * a observables.  
 * Para ello emite un valor (`next()`) y completa (`complete()`)
 * el `Subject` `destroyNotifier$`, el cual se utiliza en combinación
 * con `takeUntil` dentro de las suscripciones RxJS.
 *
 * @returns {void}
 *
 * @remarks
 * - Este patrón es recomendable para evitar fugas de memoria en aplicaciones Angular.
 * - Todas las suscripciones que dependan de `takeUntil(this.destroyNotifier$)`
 *   se cerrarán automáticamente al destruir el componente.
 */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}