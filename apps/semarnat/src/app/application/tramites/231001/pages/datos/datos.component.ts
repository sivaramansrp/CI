import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';

// Importación de la interfaz ListaPasosWizard desde el modelo de servicios extraordinarios.
import {
  DatosPasos,
  ListaPasosWizard,
  Notificacion,
} from '@ng-mf/data-access-user';

// Importación de la constante PASOS desde el archivo de constantes de aviso.
import { PASOS } from '@ng-mf/data-access-user';

// Importación del componente WizardComponent desde el componente compartido de wizard.

import {
  Solicitud231001State,
  Tramite231001Store,
} from '../../estados/tramites/tramite231001.store';
import { AVISO } from '../../models/datos.model';

import { Subject, map, takeUntil } from 'rxjs';
import { SolicitanteDatosTabsComponent } from '../solicitante-datos-tabs/solicitante-datos-tabs.component';
import { Tramite231001Query } from '../../estados/queries/tramite231001.query';
import { WizardComponent } from '@libs/shared/data-access-user/src';
/**
 * Interface representing the action of a button.
 */
interface AccionBoton {
  /**
   * The action to be performed.
   */
  accion: string;
  /**
   * The value associated with the action.
   */
  valor: number;
}

/**
 *  DatosComponent
 * app-datos
 * ./datos.component.html
 *
 *
 *
 * Componente Angular para manejar los datos del wizard.
 */
@Component({
  selector: 'app-datos',
  templateUrl: './datos.component.html',
  styles: ``,
})
export class DatosComponent implements OnInit, OnDestroy {
  constructor(
    private tramite231001Query: Tramite231001Query,
    private tramite231001Store: Tramite231001Store
  ) {}

  @Output() cargarArchivosEvento = new EventEmitter<void>();

  /**
   * Evento que se emite para regresar a la sección de carga de documentos.
   * Este evento se utiliza para notificar a otros componentes que se debe regresar a la sección de carga de documentos.
   */
  @Output() regresarSeccionCargarDocumentoEvento = new EventEmitter<void>();

  /**
   * Indica si el botón para cargar archivos está habilitado.
   */
  activarBotonCargaArchivos: boolean = false;

  /**
   * Indica si la sección de carga de documentos está activa.
   * Se inicializa en true para mostrar la sección de carga de documentos al inicio.
   */
  seccionCargarDocumentos: boolean = true;
  private destroyed$ = new Subject<void>();
  public nuevaNotificacion: Notificacion | null = null;
  public alertaNotificacion!: Notificacion;
  public solicitudState!: Solicitud231001State;

  ngOnInit(): void {
    this.obtenerEstadoSolicitud();
  }

  manejaEventoCargaDocumentos(carga: boolean): void {
    this.activarBotonCargaArchivos = carga;
  }

  cargaRealizada(cargaRealizada: boolean): void {
    this.seccionCargarDocumentos = cargaRealizada ? false : true;
  }

  obtenerEstadoSolicitud(): void {
    this.tramite231001Query.selectSolicitud$
      ?.pipe(
        takeUntil(this.destroyed$),
        map((seccionState) => {
          this.solicitudState = seccionState;
        })
      )
      .subscribe();
  }

  onClickCargaArchivos(): void {
    this.cargarArchivosEvento.emit();
  }

  siguiente(): void {
    this.wizardComponent.siguiente();
    this.indice = this.wizardComponent.indiceActual + 1;
    this.datosPasos.indice = this.wizardComponent.indiceActual + 1;
  }
  /**
   *  texto
   *  Texto del aviso de privacidad.
   */
  texto: string = 'Aviso de Privacidad simplificado';
  /**
   * @property pasos
   * @type {ListaPasosWizard[]}
   *  Arreglo que contiene los pasos del wizard.
   */
  pasos: ListaPasosWizard[] = PASOS;

  /**
   * @property aviso
   * @type {string}
   *  Texto del aviso de privacidad en formato HTML.
   */

  aviso = AVISO.Aviso;

  public folioTemporal: number = 0;

  /**
   * Contiene el mensaje de error que se muestra cuando la validación de formularios falla.
   */
  public formErrorAlert = `<div class="d-flex justify-content-center text-center">
  <div>
    <div class="col-md-12">
      Faltan campos por capturar.
    </div>
  </div>
</div>
`;

  /**
   * @property wizardComponent
   * @type {WizardComponent}
   *  Referencia al componente del wizard.
   */
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;

  /**
   * @property indice
   * @type {number}
   *  El índice de la pestaña seleccionada.
   */
  indice: number = 1;

  /**
   * Referencia al componente hijo `PasoUnoComponent` para acceder a sus métodos de validación de formularios.
   */
  @ViewChild('pasoUnoRef') pasoUnoComponent!: SolicitanteDatosTabsComponent;

  /**
   * Controla la visibilidad del mensaje de error cuando la validación de formularios falla.
   * }
   */
  esFormaValido: boolean = false;

  /**
   * The data for the steps in the wizard.
   */
  datosPasos: DatosPasos = {
    nroPasos: this.pasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  /**
   * Updates the index value based on the action button event.
   * @param e The action button event containing the action and value.
   */
  public getValorIndice(e: AccionBoton): void {
    if (e.accion === 'cont') {
      let isValid = true;

      if (this.indice === 1 && this.pasoUnoComponent) {
        isValid = this.pasoUnoComponent.validarTodosLosFormularios();
      }
      if (!isValid) {
        this.esFormaValido = true;
        this.datosPasos.indice = this.indice;
        setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 0);
        return;
      }
      this.ejecutaEnviarSolicitud(e);
      this.esFormaValido = false;
      this.indice = e.valor;
      this.datosPasos.indice = this.indice;

      this.wizardComponent.siguiente();
      return;
    }

    this.indice = e.valor;
    this.datosPasos.indice = this.indice;
    this.wizardComponent.atras();
  }

  actualizarDatosPasos(): void {
    this.datosPasos = {
      nroPasos: this.pasos.length,
      indice: this.indice,
      txtBtnAnt: 'Anterior',
      txtBtnSig: 'Continuar',
    };
  }

  anterior(): void {
    this.wizardComponent.atras();
    this.indice = this.wizardComponent.indiceActual + 1;
    this.datosPasos.indice = this.wizardComponent.indiceActual + 1;
  }

  anteriorSeccionCargarDocumento(): void {
    this.regresarSeccionCargarDocumentoEvento.emit();
  }
  /**
   * Método que se ejecuta cuando cambia de tab en paso-uno.
   * Oculta el mensaje de error de validación.
   */
  alCambiarPestana(): void {
    this.esFormaValido = false;
  }

  ejecutaEnviarSolicitud(e: AccionBoton): void {
    const FORM = this.pasoUnoComponent?.solicitudComponent?.solicitudComponent;
    //const FORMVALUE = FORM.getRawValue();
    const PAYLOAD = {
      solicitante: {
        rfc: 'AAL0409235E6',
        nombre: 'IGNACIO EDUARDO',
        es_persona_moral: true,
        certificado_serial_number: '3082054030820428a00302010',
      },
      representacion_federal: {
        cve_entidad_federativa: 'son',
        cve_unidad_administrativa: 'mex',
      },
      aduana_solicitud: {
        cve_aduana: this.solicitudState.aduana.padStart(3, '0'),
      },
      descripcionGenerica1: this.solicitudState.descripcionGenerica1,
      id_solcitud: null,
      mercancias: this.solicitudState.mercancias.map((item) => ({
        cantidad_en_letra: item.cantidadEnLetra,
        capitulo_fraccion: item.capituloFraccion,
        cve_partida: item.clavePartida,
        cve_subpartida: item.claveSubPartida,
        desc_fraccion: item.descFraccion,
        desc_unidad_medida_comercial: item.descUnidadMedida,
        descripcion_mercancia: item.descripcionMercancia,
        generica2: item.descFraccion,
        cantidad: item.generica2,
        cve_unidad_medida_comercial: item.unidadMedidaComercialClave,
      })),
      numeroProgramaImmex: this.solicitudState.numeroProgramaImmex,
      numeroRegistroAmbiental: this.solicitudState.numeroRegistroAmbiental,
    };
    console.log(JSON.stringify(PAYLOAD));
  }
}
// this.enviaSolicitudRequest()
//   .pipe(
//     takeUntil(this.destroyed$),
//     tap((respuesta) => {
//       if (!respuesta.exito) {
//         console.error('entra aqui');

//         const ERRORESEXTRA = (respuesta.erroresModelo || [])
//           .map((err) => `${err.campo}: ${err.errores.join(', ')}`)
//           .join('<br>');

//         const MENSAJEFINAL = `${
//           respuesta.mensaje || 'Error inesperado al enviar la solicitud.'
//         }${ERRORESEXTRA}`;

//         this.nuevaNotificacion = {
//           tipoNotificacion: 'toastr',
//           categoria: CategoriaMensaje.ERROR,
//           modo: 'action',
//           titulo: 'Error',
//           mensaje:
//             MENSAJEFINAL || 'Error inesperado al enviar la solicitud.',
//           cerrar: false,
//           txtBtnAceptar: '',
//           txtBtnCancelar: '',
//         };

//         setTimeout(
//           () => window.scrollTo({ top: 0, behavior: 'smooth' }),
//           0
//         );
//         this.indice = 1;
//         this.wizardComponent.indiceActual = 1;
//         this.actualizarDatosPasos();
//         return;
//       }

//       if (e.valor > 0 && e.valor < 5) {
//         this.alertaNotificacion = {
//           tipoNotificacion: 'banner',
//           categoria: 'success',
//           modo: 'action',
//           titulo: '',
//           mensaje: MSG_REGISTRO_EXITOSO(String(this.folioTemporal ?? '0')),
//           cerrar: true,
//           txtBtnAceptar: '',
//           txtBtnCancelar: '',
//         };
//         this.indice = e.valor;
//         this.actualizarDatosPasos();
//         if (e.accion === 'cont') {
//           this.wizardComponent.siguiente();
//         } else {
//           this.wizardComponent.atras();
//         }
//       }
//     }),
//     catchError((err) => {
//       this.nuevaNotificacion = {
//         tipoNotificacion: 'toastr',
//         categoria: CategoriaMensaje.ERROR,
//         modo: 'action',
//         titulo: '',
//         mensaje: err?.mensaje || 'Error inesperado al enviar la solicitud.',
//         cerrar: false,
//         txtBtnAceptar: '',
//         txtBtnCancelar: '',
//       };
//       setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 0);
//       return of(false);
//     })
//   )
//   .subscribe();

// enviaSolicitudRequest(): Observable<ResultadoSolicitud> {

//const RequestPayload = { ...this.solicitudState };

// const PAYLOAD: GuadarSolicitudRequest = {
//   id_solcitud:
//     this.solicitudState.idSolicitud === 0
//       ? null
//       : this.solicitudState.idSolicitud,
//   cve_regimen: DATOS_REGIMEN.regimenMercancia,
//   cve_clasificacion_regimen: DATOS_REGIMEN.clasifiRegimen,

//   mercancia: {
//     cve_fraccion_arancelaria: DATOS_MERCANCIA.fraccionArancelaria,
//     cve_subdivision: DATOS_MERCANCIA.nico,
//     descripcion: DATOS_MERCANCIA.valueTA,
//     cve_unidad_medida_tarifaria:
//       DATOS_MERCANCIA.unidadMedidaTarifaria === '-1'
//         ? '1'
//         : DATOS_MERCANCIA.unidadMedidaTarifaria,
//     cve_pais_origen: DATOS_MERCANCIA.paisOrigen,
//     cve_pais_destino: DATOS_MERCANCIA.paisDestino,
//     cantidad_tarifaria: DATOS_MERCANCIA.cantidadTarifaria,
//     valor_factura_usd: DATOS_MERCANCIA.valorFacturaUSD.toString(),
//     precio_unitario: DATOS_MERCANCIA.precioUnitarioUSD,
//     lote: DATOS_MERCANCIA.lote,
//     fecha_salida: this.convertirFechaISO(DATOS_MERCANCIA.fechaSalida),
//     observaciones: DATOS_MERCANCIA.observaciones,
//   },

//   productor: {
//     tipo_persona: DATOS_PRODUCTO.tipoPersona === 'pmoral',
//     nombre: DATOS_PRODUCTO.nombre || null,
//     apellido_paterno: DATOS_PRODUCTO.apellidoPaterno || null,
//     apellido_materno: DATOS_PRODUCTO.apellidoMaterno || null,
//     razon_social: DATOS_PRODUCTO.razonSocial ?? '',
//     descripcion_ubicacion: DATOS_PRODUCTO.domicilio,
//     rfc: 'AAL0409235E6',
//     pais: DATOS_MERCANCIA.paisOrigen,
//   },

//   solicitante: {
//     rfc: 'AAL0409235E6',
//     nombre: 'IGNACIO EDUARDO',
//     es_persona_moral: true,
//     certificado_serial_number: '3082054030820428a00302010',
//   },

//   representacion_federal: {
//     cve_entidad_federativa: REGISTRO_FEDERAL.estado,
//     cve_unidad_administrativa: REGISTRO_FEDERAL.representacionFederal,
//   },
// };

// return this.guardarService.postSolicitud(PAYLOAD).pipe(
//   map((response) => {
//     // Si la respuesta es exitosa, actualiza el ID de la solicitud en el store
//     if (response?.codigo === '00' && response?.datos?.id_solicitud) {
//       this.tramite130118Store.setIdSolicitud(response.datos.id_solicitud);
//       this.folioTemporal = response.datos.id_solicitud;
//       return { exito: true };
//     }

//     const MENSAJE =
//       response?.error ||
//       response?.mensaje ||
//       response?.causa ||
//       'Ocurrió un error al guardar la solicitud.';

//     const ERRORESMODELO = (response?.errores_modelo || []).map(
//       (error: any) => {
//         return {
//           campo: error.campo || 'general',
//           errores: Array.isArray(error.errores)
//             ? error.errores
//             : [String(error.errores)],
//         };
//       }
//     );

//     return {
//       exito: false,
//       MENSAJE,
//       erroresModelo: ERRORESMODELO,
//     } as ResultadoSolicitud;
//   }),
//   catchError((error) => {
//     const MENSAJE =
//       error?.error?.error ||
//       error?.message ||
//       'Error inesperado al guardar la solicitud.';

//     return of({
//       exito: false,
//       MENSAJE,
//       erroresModelo: error?.error?.errores_modelo || [],
//     });
//   }),
//   takeUntil(this.destroyed$)
// );
