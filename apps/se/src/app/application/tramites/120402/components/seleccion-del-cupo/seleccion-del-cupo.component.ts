import { AlertComponent, TablaDinamicaComponent } from '@libs/shared/data-access-user/src';
import { CLASE_TEXTO_CENTRADO, CONFIGURACION_COLUMNAS_CUPO_CONST, NOTA } from '../../constantes/definiciones.enum';
import {
  Catalogo,
  CategoriaMensaje,
  ConfiguracionColumna,
  Notificacion,
  NotificacionesComponent,
  SeleccionDelCupoService,
  TablaAcciones,
  TipoNotificacionEnum,
  TituloComponent,
} from '@ng-mf/data-access-user';

import { CatalogoSelectComponent } from '@libs/shared/data-access-user/src/tramites/components/catalogo-select/catalogo-select.component';

import { CommonModule, NgIf } from '@angular/common';

import { ConsultaioQuery } from '@ng-mf/data-access-user';

import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Subject, Subscription, map, takeUntil } from 'rxjs';

import { Tramite120402State, Tramite120402Store } from '../../estados/tramite120402.store';
import { CantidadSolicitadaComponent } from '../cantidad-solicitada/cantidad-solicitada.component';
import { DescripcionDelCupoComponent } from '../descripcion-del-cupo/descripcion-del-cupo.component';
import { Tramite120402Query } from '../../estados/tramite120402.query';

/**
 * Representa la información relacionada con un cupo o asignación.
 */
interface DatoCupo {
  /**
   * Descripción detallada del cupo o asignación.
   */
  description: string;

  /**
   * Tipo de asignación que se aplica al cupo.
   */
  assignmentType: string;

  /**
   * Códigos asociados al cupo, que pueden ser un arreglo de cadenas o una sola cadena.
   */
  codes: string[] | string;

  /**
   * Cuota asignada expresada como cadena (por ejemplo, porcentaje o cantidad).
   */
  quota: string;
}


/**
 * Interface que representa una fila dentro de la tabla de cupos.
 */
interface FilaCupo {
  /**
   * Descripción detallada de la fila o del cupo.
   */
  descripcion: string;

  /**
   * Tipo de asignación asociado a esta fila.
   */
  tipoAsignacion: string;

  /**
   * Fracciones relacionadas con la fila, que pueden ser un arreglo de cadenas o una sola cadena.
   */
  fracciones: string[] | string;

  /**
   * Tipo de cupo representado en la fila.
   */
  tipoCupo: string;
}


/**
 * Evento que ocurre al hacer clic en una acción dentro de la tabla.
 */
interface EventoAccionTabla {
  /**
   * Fila de la tabla sobre la cual se realizó la acción.
   */
  row: FilaCupo;

  /**
   * Nombre o identificador de la columna donde se hizo clic.
   */
  column: string;
}


/**
 * Representa la respuesta que contiene un arreglo de elementos del catálogo.
 */
interface RespuestaDataArray {
  /**
   * Arreglo de objetos tipo `Catalogo` que contiene los datos de la respuesta.
   */
  data: Catalogo[];
}


/**
 * Representa la respuesta que contiene un arreglo de tratados.
 */
interface RespuestaTratado {
  /**
   * Arreglo de objetos tipo `Catalogo` que representan los tratados.
   */
  tratado: Catalogo[];
}


/**
 * Componente para la selección del cupo dentro del trámite 120402.
 * Permite al usuario seleccionar el régimen, tratado, producto y subproducto,
 * así como visualizar información relacionada con cupos y su descripción.
 */
@Component({
  selector: 'app-seleccion-del-cupo',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CatalogoSelectComponent,
    TituloComponent,
    NgIf,
    TablaDinamicaComponent,
    AlertComponent,
    NotificacionesComponent,
    DescripcionDelCupoComponent,
    CantidadSolicitadaComponent,
  ],
  templateUrl: './seleccion-del-cupo.component.html',
  styleUrls: ['./seleccion-del-cupo.component.scss'],
})
export class SeleccionDelCupoComponent implements OnInit, OnDestroy {

  /** Indica si el formulario debe estar en modo de solo lectura */
  esFormularioSoloLectura: boolean = false;

  /** Notificador para la destrucción de observables */
  private destroyNotifier$: Subject<void> = new Subject();

  /** Estado actual del formulario */
  estadoSeleccionado!: Tramite120402State;

  /** Sujeto de destrucción de componentes */
  private destroy$ = new Subject<void>();

  /** Suscripción general a streams */
  private subscription: Subscription = new Subscription();

  /** Estado de la solicitud del trámite */
  public solicitudState!: Tramite120402State;

  /** Lista de mercancías disponibles */
  public mercancia!: Catalogo[];

  /** Enumeración de acciones disponibles en la tabla */
  accionesEnum = TablaAcciones;

  /** Controla si se muestra el componente de descripción del cupo */
  mostrarDescripcionCupo = false;

  /** Indica si el modal de notificación está abierto */
  modalAbierto = false;

  /** Mensaje de confirmación usado en notificaciones */
  MENSAJE_CONFIRMACION: string = NOTA.CAMPO_OBLIGATORIO_NO_ENCONTRADO;

  /** Configuración de columnas para la tabla de cupos */
  configuracionColumnasCupo: ConfiguracionColumna<FilaCupo>[] = CONFIGURACION_COLUMNAS_CUPO_CONST;

  /** Título para la alerta modal */
  tituloAlerta: string = NOTA.TITULO_ALERTA;

  /** Clase para centrar el texto en la alerta */
  infoAlerta: string = CLASE_TEXTO_CENTRADO;

  /** Datos que se mostrarán en la tabla de cupos */
  datosTablaCupo: FilaCupo[] = [];

  /** Objeto de notificación que se muestra en el modal */
  nuevaNotificacion!: Notificacion;

  /** Formulario reactivo del componente */
  seleccionForm!: FormGroup;

  /** Catálogo de opciones para el régimen */
  regimen: Catalogo[] = [];

  /** Catálogo de tratados disponibles */
  tratado: Catalogo[] = [];

  /** Catálogo de productos disponibles */
  producto: Catalogo[] = [];

  /** Catálogo de subproductos disponibles */
  subproducto: Catalogo[] = [];

  /** Cupo seleccionado o lista de cupos seleccionados */
  seleccionDelCupo: DatoCupo | DatoCupo[] = [];

  /** Sujeto para cancelar subscripciones */
  private destroyed$ = new Subject<void>();

  /**
   * Constructor del componente.
   * Inicializa el estado del formulario según si es de solo lectura.
   */
  constructor(
    private fb: FormBuilder,
    private service: SeleccionDelCupoService,
    private tramite120402Store: Tramite120402Store,
    private tramite120402Query: Tramite120402Query,
    private consultaioQuery: ConsultaioQuery
  ) {
    this.consultaioQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.esFormularioSoloLectura = seccionState.readonly;
          this.inicializarEstadoFormulario();
        })
      )
      .subscribe();
  }

  /**
   * Inicializa el estado del formulario dependiendo si está en modo de solo lectura.
   */
  inicializarEstadoFormulario(): void {
    if (this.esFormularioSoloLectura) {
      this.guardarDatosFormulario();
    } else {
      this.initializeForm();
    }
  }

  /**
   * Guarda y bloquea o habilita el formulario dependiendo del modo de solo lectura.
   */
  guardarDatosFormulario(): void {
    this.initializeForm();
    if (this.esFormularioSoloLectura) {
      this.seleccionForm.disable();
    } else if (!this.esFormularioSoloLectura) {
      this.seleccionForm.enable();
    }
  }

  /**
   * Ciclo de vida: se ejecuta al inicializar el componente.
   */
  ngOnInit(): void {
    this.inicializarEstadoFormulario();
    this.loadRegimen();
    this.loadTratado();
    this.loadProducto();
  }

  /**
   * Ciclo de vida: se ejecuta al destruir el componente.
   */
  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  /**
   * Inicializa el formulario reactivo y sus valores por defecto desde el store.
   */
  private initializeForm(): void {
    this.subscription.add(
      this.tramite120402Query.selectSolicitud$
        .pipe(
          takeUntil(this.destroyNotifier$),
          map((seccionState) => {
            this.solicitudState = seccionState;
          })
        )
        .subscribe()
    );
    this.seleccionForm = this.fb.group({
      regimen: [this.solicitudState?.regimen, Validators.required],
      tratado: [this.solicitudState?.tratado, Validators.required],
      producto: [this.solicitudState.producto, Validators.required],
      subproducto: [this.solicitudState.subproducto, Validators.required],
    });
  }

  /**
   * Carga el catálogo de regímenes desde el servicio.
   */
  loadRegimen(): void {
    this.service
      .getRegimen()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data => {
        const RESPUESTA = data as RespuestaDataArray;
        this.regimen = RESPUESTA.data;
      }));
  }

  /**
   * Carga el catálogo de tratados desde el servicio.
   */
  loadTratado(): void {
    this.service
      .getTratado()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data => {
        this.tratado = (data as RespuestaTratado).tratado;
      }));
  }

  /**
   * Carga los productos y subproductos desde el servicio.
   */
  loadProducto(): void {
    this.service
      .getProducto()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data => {
        const RESPUESTA = data as RespuestaDataArray;
        this.producto = RESPUESTA.data;
        this.subproducto = RESPUESTA.data;
      }));
  }

  /**
   * Carga los datos del cupo seleccionado desde el servicio y los adapta a la tabla.
   */
  loadSeleccionDelCupo(): void {
    this.service
      .getSeleccionDelCupo()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((datos => {
        const MAPEAR_FILA = (fila: DatoCupo): FilaCupo => ({
          descripcion: fila.description,
          tipoAsignacion: fila.assignmentType,
          fracciones: Array.isArray(fila.codes)
            ? fila.codes.map((c: string) => c.trim())
            : fila.codes,
          tipoCupo: fila.quota,
        });

        const DATOS_CUPO = datos as DatoCupo | DatoCupo[];

        if (Array.isArray(DATOS_CUPO)) {
          this.datosTablaCupo = DATOS_CUPO.map(MAPEAR_FILA);
        } else {
          this.datosTablaCupo = [MAPEAR_FILA(DATOS_CUPO)];
        }
        this.seleccionDelCupo = DATOS_CUPO;
      }));
  }

  /**
   * Cierra el modal de notificación.
   */
  cerrarModal(): void {
    this.modalAbierto = false;
  }

  /**
   * Maneja la acción de una fila de la tabla de cupos.
   * @param evento Evento que contiene la fila y columna seleccionadas.
   */
  onAccionCupo(evento: EventoAccionTabla): void {
    if (this.esFormularioSoloLectura) {

      return;
    }
    this.tramite120402Store.setTramite120402State({ cupoSeleccionado: evento.row });
    this.mostrarDescripcionCupo = true;
  }

  /**
   * Ejecuta la lógica al presionar el botón de "Buscar".
   * Verifica campos requeridos y muestra notificación si es necesario.
   */
  manejarBuscar(): void {
    const VALOR_REGIMEN = this.seleccionForm.get('regimen')?.value;
    const VALOR_ENTIDAD = this.tramite120402Query.getValue().entidad;
    const VALOR_REPRESENTACION = this.tramite120402Query.getValue().representacion;

    if (!VALOR_REGIMEN || !VALOR_ENTIDAD || !VALOR_REPRESENTACION) {
      this.nuevaNotificacion = {
        tipoNotificacion: TipoNotificacionEnum.ALERTA,
        categoria: CategoriaMensaje.ALERTA,
        modo: 'modal',
        titulo: '',
        mensaje: this.MENSAJE_CONFIRMACION,
        cerrar: false,
        txtBtnAceptar: 'Aceptar',
        txtBtnCancelar: '',
      };
      this.modalAbierto = true;
    } else {
      this.loadSeleccionDelCupo();
    }
  }

  /**
   * Actualiza el valor en el store según el valor actual de un control del formulario.
   * @param FormGroup Formulario reactivo
   * @param control Nombre del control a actualizar
   */
  setValorStore(FormGroup: FormGroup, control: string): void {
    const VALOR = FormGroup.get(control)?.value;
    this.tramite120402Store.setTramite120402State({
      [control]: VALOR
    });
  }
}

