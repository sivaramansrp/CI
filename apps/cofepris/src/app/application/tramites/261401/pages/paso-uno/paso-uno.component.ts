/**
 * Componente que representa el primer paso del proceso de modificación de permiso de salida del territorio.
 * Este componente gestiona la configuración de trámites asociados, el formulario de pago de derechos y la navegación entre pestañas.
 */
import { Catalogo, ConfiguracionColumna } from '@libs/shared/data-access-user/src';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConsultaioQuery, ConsultaioState } from '@ng-mf/data-access-user';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject, map } from 'rxjs';
import { CONFIGURACIONCOLUMNA } from '../../enums/tramite-asociados.enum';
import { Solicitud261401State } from '../../../../estados/tramites/tramite261401.store';
import { SolicitudModificacionPermisoSalidaTerritorioService } from '../../services/solicitudModificacionPermisoSalidaTerritorio.service';
import { Tramite261401Query } from '../../../../estados/queries/tramite261401.query';
import { Tramite261401Store } from '../../../../estados/tramites/tramite261401.store';
import { TramiteAsociados } from '../../../../shared/models/tramite-asociados.model';
import { takeUntil } from 'rxjs';
/**
 * Decorador que define el componente Angular para el primer paso del proceso.
 * Incluye el selector del componente y la ruta de su plantilla HTML.
 */
@Component({
  selector: 'app-paso-uno',
  templateUrl: './paso-uno.component.html',
})
/**
 * Clase que representa el componente Angular para el primer paso del proceso.
 * Implementa las interfaces OnInit y OnDestroy para gestionar el ciclo de vida del componente.
 */
export class PasoUnoComponent implements OnInit, OnDestroy {
  /**
   * Índice de la pestaña seleccionada.
   */
  indice: number = 1;

  /**
   * Configuración de las columnas de la tabla de trámites asociados.
   */
  configuracionTabla: ConfiguracionColumna<TramiteAsociados>[] = CONFIGURACIONCOLUMNA;

  /**
   * Lista de trámites asociados obtenidos.
   */
  tramiteAsociados!: TramiteAsociados[];

  /**
   * Subject utilizado para manejar la destrucción de suscripciones.
   */
  private notificadorDestruccion$: Subject<void> = new Subject();

  /**
   * Formulario para el pago de derechos.
   */
  formularioPagoDerechos!: FormGroup;

  /**
   * Lista de bancos disponibles.
   */
  banco!: Catalogo[];

  /**
   * Estado actual de la solicitud de permiso.
   */
  estadoSolicitudPermiso!: Solicitud261401State;
  /** Datos de respuesta del servidor utilizados para actualizar el formulario. */
  public esDatosRespuesta: boolean = false;

  /**
   * Estado actual de la consulta cargado desde el store.
   * Contiene datos como modo de solo lectura y valores del formulario.
   */
  public consultaState!: ConsultaioState;
      /**
  * Indica si el formulario está en modo solo lectura.
  * Cuando es `true`, los campos del formulario no se pueden editar.
  */
      esFormularioSoloLectura: boolean = false;
  /**
   * Constructor del componente.
   * Param formBuilder Constructor para formularios reactivos.
   * Param solicitudPermisoService Servicio para manejar datos relacionados con la solicitud de permiso.
   * Param tramite261401Store Store para gestionar el estado del trámite.
   * Param tramite261401Query Query para obtener datos del estado del trámite.
   */
  constructor(
    private formBuilder: FormBuilder,
    private solicitudPermisoService: SolicitudModificacionPermisoSalidaTerritorioService,
    private tramite261401Store: Tramite261401Store,
    private tramite261401Query: Tramite261401Query,
    private consultaQuery: ConsultaioQuery
  ) {
      this.consultaQuery.selectConsultaioState$
    .pipe(
      takeUntil(this.notificadorDestruccion$),
      map((seccionState: { readonly: boolean })=>{
        this.esFormularioSoloLectura = seccionState.readonly;
      })
    )
    .subscribe();
  }

  /**
   * Método del ciclo de vida de Angular que se ejecuta al inicializar el componente.
   * Obtiene el estado de la solicitud y los trámites asociados, e inicializa los datos de los catálogos.
   */
  ngOnInit(): void {
    this.consultaQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.notificadorDestruccion$),
        map((seccionState) => {
          this.consultaState = seccionState;
        })
      )
      .subscribe();
    if (this.consultaState.update) {
      this.guardarDatosFormulario();
    } else {
      this.esDatosRespuesta = true;
    }
    this.inicializarDatosSolicitud();
  }
    /**
  * Obtiene los datos de la solicitud desde un servicio y actualiza el estado del formulario.  
  * Si la respuesta es válida, activa el indicador de datos cargados.
  */
  guardarDatosFormulario(): void {
       this.solicitudPermisoService
      .getDatosDeLaSolicitud().pipe(
        takeUntil(this.notificadorDestruccion$)
      )
      .subscribe((resp) => {
        if(resp){
        this.esDatosRespuesta = true;
        this.solicitudPermisoService.actualizarEstadoFormulario(resp);
        }else {
          this.esDatosRespuesta = false;
        }
      });
  }
  /**
   * Cambia la pestaña seleccionada y, si es la pestaña de pago, inicializa el formulario de pago.
   * Param i Índice de la pestaña seleccionada.
   */
  seleccionaTab(i: number): void {
    if (i === 4) {
      this.banco = this.solicitudPermisoService.banco;
      this.crearformularioPagoDerechos();
    }
    this.indice = i;
  }

  /**
   * Inicializa los datos de la solicitud, incluyendo el estado actual y los trámites asociados.
   */
  inicializarDatosSolicitud(): void {
    this.tramite261401Query.selectSolicitud$
      .pipe(takeUntil(this.notificadorDestruccion$))
      .subscribe((estadoSolicitudPermiso: Solicitud261401State) => {
        this.estadoSolicitudPermiso = estadoSolicitudPermiso;
      });

    this.solicitudPermisoService
      .obtenerTramitesAsociados()
      .pipe(takeUntil(this.notificadorDestruccion$))
      .subscribe(tramiteAsociados => {
        this.tramiteAsociados = tramiteAsociados;
      });

    this.solicitudPermisoService.inicializaPagoDeDerechosDatosCatalogos();
  }

  /**
   * Crea el formulario reactivo para el pago de derechos.
   */
  crearformularioPagoDerechos(): void {
    this.formularioPagoDerechos = this.formBuilder.group({
      claveDeReferencia: new FormControl(
        this.estadoSolicitudPermiso.claveDeReferencia,
        Validators.required
      ),
      cadenaPagoDependencia: new FormControl(
        this.estadoSolicitudPermiso.cadenaPagoDependencia,
        Validators.required
      ),
      bancoClave: new FormControl(
        this.estadoSolicitudPermiso.bancoClave,
        Validators.required
      ),
      llaveDePago: new FormControl(
        this.estadoSolicitudPermiso.llaveDePago,
        Validators.required
      ),
      fecPago: new FormControl(
        this.estadoSolicitudPermiso.fecPago,
        Validators.required
      ),
      impPago: new FormControl(
        this.estadoSolicitudPermiso.impPago,
        [Validators.required, Validators.min(0)]
      ),
    });
  }

  /**
   * Actualiza el estado del store con los valores del formulario.
   * Param $event Evento que contiene el formulario y el campo a actualizar.
   */
  setValoresStore($event: {
    formularioPagoDerechos: FormGroup;
    campo: string;
  }): void {
    const VALOR = $event.formularioPagoDerechos.get($event.campo)?.value;
    this.tramite261401Store.actualizarEstado({ [$event.campo]: VALOR });
  }

  /**
   * Método del ciclo de vida de Angular que se ejecuta al destruir el componente.
   * Completa el Subject para evitar fugas de memoria.
   */
  ngOnDestroy(): void {
    this.notificadorDestruccion$.next();
    this.notificadorDestruccion$.complete();
  }
}