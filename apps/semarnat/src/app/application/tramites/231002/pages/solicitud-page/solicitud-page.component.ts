import {
  AlertComponent,
  BtnContinuarComponent,
  CategoriaMensaje,
  DatosPasos,
  ListaPasosWizard,
  Notificacion,
  NotificacionesComponent,
  WizardComponent,
} from '@ng-mf/data-access-user';
import {
  CodigoRespuesta,
  MSG_REGISTRO_EXITOSO,
} from '../../../231001/enum/enum-tramite';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Observable, Subject, catchError, map, of, takeUntil, tap } from 'rxjs';
import { PAGO_DE_DERECHOS, PASOS } from '../../constantes/aviso-retorno.enum';
import { CommonModule } from '@angular/common';
import { DatoSolicitudQuery } from '../../estados/queries/dato-solicitud.query';
import { DatoSolicitudStore } from '../../estados/tramites/dato-solicitud.store';
import { EstadoDatoSolicitud } from '../../models/datos-solicitud.model';
import { GuardarServiceT231002 } from '../../services/guardar.service';
import { GuardarSolicitud231002Request } from '../../models/guardar-solicitud-request';
import { PasoDosComponent } from '../paso-dos/paso-dos.component';
import { PasoUnoComponent } from '../paso-uno/paso-uno.component';
import { ResultadoSolicitud } from '../../../231001/models/ResultadoSolicitud';

/**
 * Interfaz que define la estructura de un objeto para manejar acciones de botones en el componente.
 */
export interface AccionBoton {
  accion: string;
  valor: number;
}

/** Representa la forma cruda que puede venir desde el backend */
interface ErrorModeloRaw {
  campo?: string;
  errores?: string | string[] | null | undefined;
}

/** Forma normalizada que usa el componente */
interface ErrorModelo {
  campo: string;
  errores: string[];
}

/**
 * Constante que representa el índice del primer paso en el proceso de wizard.
 */
const PASO_UNO = 1;
/**
 * Componente que gestiona el proceso de aviso de retorno mediante un sistema de pasos (wizard).
 * Controla la navegación entre diferentes pasos del proceso y maneja la lógica relacionada con:
 * - Consulta de estados
 * - Carga inicial de datos
 * - Navegación entre pasos
 * - Gestión de suscripciones
 */
@Component({
  selector: 'app-solicitud-page',
  standalone: true,
  imports: [
    CommonModule,
    WizardComponent,
    PasoUnoComponent,
    PasoDosComponent,
    BtnContinuarComponent,
    AlertComponent,
    NotificacionesComponent,
  ],
  templateUrl: './solicitud-page.component.html',
})
export class SolicitudPageComponent implements OnInit, OnDestroy {
  /**
   * Folio temporal asignado a la solicitud.
   */
  public folioTemporal: number = 0;

  /**
   * Estado actual de la solicitud.
   */
  private destroyed$ = new Subject<void>();

  constructor(
    private t231002Query: DatoSolicitudQuery,
    private t231002Store: DatoSolicitudStore,
    private guardarService: GuardarServiceT231002
  ) {}

  ngOnInit(): void {
    this.obtenerEstadoSolicitud();
  }

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
   * Notificación que se puede utilizar para mostrar mensajes emergentes (toastr).
   * Null cuando no hay notificación nueva.
   */
  public nuevaNotificacion: Notificacion | null = null;

  /**
   * Notificación tipo banner que se muestra tras operaciones exitosas.
   */
  public alertaNotificacion!: Notificacion;

  /**
   * Indica si el formulario actual es válido.
   */
  esFormaValido: boolean = true;
  /**
   * Lista de pasos configurados para el wizard.
   * @type {ListaPasosWizard[]}
   */
  pasos: ListaPasosWizard[] = PASOS;

  /**
   * Referencia al componente wizard para controlar la navegación entre pasos.
   * @type {WizardComponent}
   */
  @ViewChild('wizard', { static: false }) wizardComponent!: WizardComponent;

  /**
   * Referencia al componente del primer paso para validar formularios.
   */
  @ViewChild(PasoUnoComponent) pasoUno!: PasoUnoComponent;

  /**
   * Estado local de la solicitud obtenido desde el query/store.
   */
  public estadoSolicitud!: EstadoDatoSolicitud;
  /**
   * Clase CSS para estilizar alertas informativas.
   * @type {string}
   */
  public infoAlert = 'alert-info';

  /**
   * Textos estáticos relacionados con el pago de derechos.
   * @type {typeof PAGO_DE_DERECHOS}
   */
  TEXTOS = PAGO_DE_DERECHOS;

  /**
   * Índice del paso actual en el wizard.
   * @type {number}
   */
  indice: number = 1;

  /**
   * Datos de configuración para el componente de pasos.
   * @type {DatosPasos}
   */
  datosPasos: DatosPasos = {
    nroPasos: this.pasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };

  obtenerEstadoSolicitud(): void {
    this.t231002Query.estadoFormulario$
      ?.pipe(
        takeUntil(this.destroyed$),
        map((seccionState) => {
          this.estadoSolicitud = seccionState;
        })
      )
      .subscribe();
  }

  /**
   * Maneja la navegación entre pasos del wizard.
   * @param e Objeto con información de la acción del botón
   */
  getValorIndice(e: AccionBoton): void {
    if (this.indice === PASO_UNO) {
      const FORM_VALIDO = this.pasoUno?.validarTodosLosFormularios();
      this.esFormaValido = FORM_VALIDO;
      if (!FORM_VALIDO) {
        this.datosPasos.indice = this.indice;
        setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 0);
        return;
      }
      this.ejecutarPostGuardar(e);
    } else {
      if (e.valor > 0 && e.valor < 5) {
        this.indice = e.valor;
        this.actualizarDatosPasos();
        if (e.accion === 'cont') {
          this.wizardComponent.siguiente();
        } else {
          this.wizardComponent.atras();
        }
      }
    }
  }

  /**
   * Actualiza los datos del componente de pasos con el índice actual y el número total de pasos.
   */
  actualizarDatosPasos(): void {
    this.datosPasos = {
      nroPasos: this.pasos.length,
      indice: this.indice,
      txtBtnAnt: 'Anterior',
      txtBtnSig: 'Continuar',
    };
  }

  /**
   * Lógica que se ejecuta después de intentar guardar la solicitud.
   * Maneja notificaciones, navegación del wizard y errores devueltos por el backend.
   * @param e Acción del botón con la dirección y valor de índice destino.
   */
  ejecutarPostGuardar(e: AccionBoton): void {
    if (this.indice === PASO_UNO) {
      this.ejecutaEnviarSolicitud()
        .pipe(
          takeUntil(this.destroyed$),
          tap((respuesta) => {
            if (!respuesta.exito) {
              const ERRORESEXTRA = (respuesta.erroresModelo || [])
                .map((err) => `${err.campo}: ${err.errores.join(', ')}`)
                .join('<br>');

              const MENSAJEFINAL = `${
                respuesta.mensaje || 'Error inesperado al enviar la solicitud.'
              }${ERRORESEXTRA}`;

              this.nuevaNotificacion = {
                tipoNotificacion: 'toastr',
                categoria: CategoriaMensaje.ERROR,
                modo: 'action',
                titulo: 'Error',
                mensaje:
                  MENSAJEFINAL || 'Error inesperado al enviar la solicitud.',
                cerrar: false,
                txtBtnAceptar: '',
                txtBtnCancelar: '',
              };

              setTimeout(
                () => window.scrollTo({ top: 0, behavior: 'smooth' }),
                0
              );
              this.indice = 1;
              this.wizardComponent.indiceActual = 1;
              this.actualizarDatosPasos();
              return;
            }

            if (e.valor > 0 && e.valor < 5) {
              this.alertaNotificacion = {
                tipoNotificacion: 'banner',
                categoria: 'success',
                modo: 'action',
                titulo: '',
                mensaje: MSG_REGISTRO_EXITOSO(String(this.folioTemporal)),
                cerrar: true,
                txtBtnAceptar: '',
                txtBtnCancelar: '',
              };
              this.indice = e.valor;
              this.actualizarDatosPasos();
              if (e.accion === 'cont') {
                this.wizardComponent.siguiente();
              } else {
                this.wizardComponent.atras();
              }
            }
          }),
          catchError((err) => {
            this.nuevaNotificacion = {
              tipoNotificacion: 'toastr',
              categoria: CategoriaMensaje.ERROR,
              modo: 'action',
              titulo: '',
              mensaje:
                err?.mensaje || 'Error inesperado al enviar la solicitud.',
              cerrar: false,
              txtBtnAceptar: '',
              txtBtnCancelar: '',
            };
            setTimeout(
              () => window.scrollTo({ top: 0, behavior: 'smooth' }),
              0
            );
            return of(false);
          })
        )
        .subscribe();
    } else {
      if (e.valor > 0 && e.valor < 5) {
        this.indice = e.valor;
        this.actualizarDatosPasos();
        if (e.accion === 'cont') {
          this.wizardComponent.siguiente();
        } else {
          this.wizardComponent.atras();
        }
      }
    }
  }

  /**
   * Envía el payload construido al servicio `guardarService.postSolicitud`.
   * Normaliza la respuesta y devuelve un Observable con ResultadoSolicitud.
   * @returns Observable<ResultadoSolicitud> con el resultado del intento de guardado.
   */
  ejecutaEnviarSolicitud(): Observable<ResultadoSolicitud> {
    const PAYLOAD = SolicitudPageComponent.generarRequestGuardarSolicitud();

    return this.guardarService.postSolicitud(PAYLOAD).pipe(
      map((response) => {
        if (
          response.codigo === CodigoRespuesta.EXITO &&
          response.datos?.id_solicitud
        ) {
          this.t231002Store.setIdSolicitud(response.datos.id_solicitud);
          this.folioTemporal = response.datos.id_solicitud;
          return { exito: true };
        }

        const MENSAJE =
          response?.error ||
          response?.mensaje ||
          response?.causa ||
          'Ocurrió un error al guardar la solicitud.';

        const ERRORESMODELO: ErrorModelo[] = (
          (response?.errores_modelo ?? []) as ErrorModeloRaw[]
        ).map((err) => {
          const CAMPO = typeof err?.campo === 'string' ? err.campo : 'general';
          const RAW_ERRORES = err?.errores;
          const ERRORES = Array.isArray(RAW_ERRORES)
            ? RAW_ERRORES.map(String)
            : RAW_ERRORES === null
            ? [String(RAW_ERRORES)]
            : [];
          return { campo: CAMPO, errores: ERRORES };
        });

        return {
          exito: false,
          MENSAJE,
          erroresModelo: ERRORESMODELO,
        } as ResultadoSolicitud;
      }),
      catchError((error) => {
        const MENSAJE =
          error?.error?.error ||
          error?.message ||
          'Error inesperado al guardar la solicitud.';

        return of({
          exito: false,
          MENSAJE,
          erroresModelo: error?.error?.errores_modelo || [],
        });
      }),
      takeUntil(this.destroyed$)
    );
  }

  static generarRequestGuardarSolicitud(): GuardarSolicitud231002Request {
    return {
      id_solicitud: 202786224,
      numero_programa_immex: 121578,
      discriminator_value: 231002,
      cve_rol_capturista: 'PersonaMoral',
      cve_usuario_capturista: 'AAL0409235E6',
      boolean_generico: true, // boolean
      numero_registro_ambiental: 12121285888,
      descripcion_clob_generica2: 260881744, //Domicilio IMMEX
      descripcion_clob_generica1: 'Cuidarse de los baches', // precauciones de manejo que se debe dar al residuo peligroso
      empresa_controladora: 1, // Requiere empresa retorno
      solicitante: {
        rfc: 'AAL0409235E6',
        nombre: 'IGNACIO EDUARDO',
        es_persona_moral: true,
        certificado_serial_number: '3082054030820428a00302010',
      },
      empresa_reciclaje: {
        id_empresa: null,
        razon_social: 'Empresa del sur 3',
        nombre: 'Juan Escutia 3',
        telefono: '5566565658',
        correo_electronico: 'juan.escutia3@mail.com',
      },
      destinatario: {
        razon_social: 'CODS821111RS1',
        pais: 'GTM',
        domicilio: 'Guatepeor #22',
        codigo_postal: '01009',
      },
      transporte: {
        razon_social: 'Trasportes Patito 2',
        autorizacion_semarnat_transporte: '41231231212',
      },
      aduana_salida: {
        clave: '070',
      },
      residuos: [
        {
          boolean_generico_1: true, //  Residuo (materia prima residual)
          desc_boolean_generico_1: 'Residuo (materia prima residual)',
          fraccion_arancelaria: '26190002',
          cve_nico: '99',
          desc_nico: '99-Los demás.',
          unidad_medida: '14',
          unidad_medida_name: 'Tonelada',
          nombre_quimico: 'nombreQuimico',
          nombre_residuo: 'Chocolatin',
          acotacion:
            'Únicamente: residuos peligrosos de los señalados en la Norma Oficial Mexicana NOM-052-SEMARNAT-2005, la Decisión C(2002) 107 (Final) de la OCDE o el Convenio de Basilea sobre el Control de los Movimientos Transfronterizos de Desechos Peligrosos y su Eliminación.',
          nombre_residuo_peligroso: 'residuo peligroso generado',
          cantidad: '12',
          cantidad_letra: 'DOCE',
          cve_clasificacion: 'CVERES.E63',
          nombre_clasificacion: 'CVERES.E63',
          descripcion_clasificacion: 'CVERES.E63',
          descripcion_otra_clasificacion: '',
          creti: 'CARP.RE',
          estado_fisico: 'ESFIM.OTR',
          descripcion_otro_estado_fisico: '',
          numero_manifiesto: 'manifiesto numero',
          tipo_contenedor: 'TPCONT.009',
          descripcion_otro_contenedor: '',
          capacidad: '123', //descripcionDenominacionEspecifica
          fraccion_name: '38256999',
          nico_name: '00-Los demás.',
          clave_clasificacion_desc: '',
          name_clasificacion:
            'Condensados orgánicos de la columna de recuperación de solventes en la producción de diisocianato de tolueno vía fosgenación de la toluendiamina',
          desc_clasificacion: '',
          creti_desc: 'Reactivo',
          estado_fisico_desc: 'Otro',
          tipo_contenedor_desc: 'Otro (especifique)',
          descripcion_otro: '',
          materias_primas_relacionadas: [
            {
              id_mercancia: null,
              descripcion_mercancia: 'late',
              cantidad: 3.25,
              cantidad_letra: 'TRES PUNTO  VEINTICINCO',
              descripcion_umc: 'Tonelada',
              cve_fraccion_arancelaria: '19021999',
              numeroBitacora: 'E5/00000037/10/2025',
              unidadMedidaComercial: '14',
              cveFraccion: 18040001,
              descFraccion: 'Manteca, grasa y aceite de cacao.',
            },
          ],
        },
      ],
    };
  }

  /**
   * Limpia las suscripciones para evitar fugas de memoria al destruir el componente.
   */
  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
