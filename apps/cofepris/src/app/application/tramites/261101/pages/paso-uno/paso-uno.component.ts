import {
  Catalogo,
  ConfiguracionColumna,
} from '@libs/shared/data-access-user/src';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ConsultaioQuery, ConsultaioState } from '@ng-mf/data-access-user';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CONFIGURACIONCOLUMNA } from '../../enum/solicitud-permiso.enum';
import { DatosProcedureQuery } from '../../../../estados/queries/tramites261101.query'
import { DatosProcedureState } from '../../../../estados/tramites/tramites261101.store';
import { DatosProcedureStore } from '../../../../estados/tramites/tramites261101.store';
import { DatosSolicitudService } from '../../../261101/services/datoSolicitude.service';
import { SolicitanteComponent } from '@ng-mf/data-access-user';
import { Subject } from 'rxjs';
import { TramiteAsociados } from '../../../../shared/models/tramite-asociados.model';
import { map } from 'rxjs';
import { takeUntil } from 'rxjs';


/**
 * Componente que representa el primer paso en un proceso de múltiples pasos.
 */
@Component({
  selector: 'app-paso-uno',
  templateUrl: './paso-uno.component.html',
})
export class PasoUnoComponent implements OnInit,OnDestroy {
  /**
   * El índice de la pestaña actualmente seleccionada.
   */
  indice: number = 1;

  /**
   * Formulario reactivo para capturar los datos del pago de derechos.
   */
  formularioPagoDerechos!: FormGroup;

  /**
   * Estado actual de la solicitud de permiso.
   */
  estadoSolicitudPermiso!: DatosProcedureState;

  /**
   * Lista de trámites asociados que se mostrarán en la tabla.
   */
  tramiteAsociados!: TramiteAsociados[];


    /**
     * Configuración de las columnas de la tabla para mostrar los trámites asociados.
     */
    configuracionTabla: ConfiguracionColumna<TramiteAsociados>[] =
      CONFIGURACIONCOLUMNA;
  
  /**
   * Lista de bancos disponibles para seleccionar.
   */
  banco!: Catalogo[];

  /**
   * Observable utilizado para limpiar las suscripciones al destruir el componente.
   * Esto ayuda a evitar fugas de memoria.
   */
  private notificadorDestruccion$: Subject<void> = new Subject();

      /** 
   * Estado de consulta que almacena la información del estado actual del proceso.
   * Este estado se actualiza a través de un observable y se utiliza para determinar
   * el flujo de la lógica del componente.
   */
      public consultaState!:ConsultaioState;
        /**
     * Referencia al componente SolicitanteComponent para acceder a sus métodos y propiedades.
     */
    @ViewChild(SolicitanteComponent) solicitante!: SolicitanteComponent;
  
    /** Datos de respuesta del servidor utilizados para actualizar el formulario. */
    public esDatosRespuesta: boolean = false;
      /**
  * Indica si el formulario está en modo solo lectura.
  * Cuando es `true`, los campos del formulario no se pueden editar.
  */
  esFormularioSoloLectura: boolean = false; 
  /**
   * Constructor del componente.
   * Inicializa los servicios y dependencias necesarias.
   */
  constructor(
    private formBuilder: FormBuilder,
    private datosSolicitudService: DatosSolicitudService,
    private store: DatosProcedureStore,
    private query: DatosProcedureQuery,
    private consultaQuery: ConsultaioQuery,
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
   * Método del ciclo de vida que se ejecuta al inicializar el componente.
   * Configura las suscripciones necesarias y carga los datos iniciales.
   */
  ngOnInit(): void {
    this.query.selectProrroga$
      .pipe(takeUntil(this.notificadorDestruccion$))
      .subscribe((estadoSolicitudPermiso: DatosProcedureState) => {
        this.estadoSolicitudPermiso = estadoSolicitudPermiso;
      });

    this.datosSolicitudService
      .obtenerTramitesAsociados()
      .pipe(takeUntil(this.notificadorDestruccion$))
      .subscribe((tramiteAsociados: TramiteAsociados[]) => {
        this.tramiteAsociados = tramiteAsociados;
      });

    this.datosSolicitudService.inicializaPagoDeDerechosDatosCatalogos();
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
  }

  /**
   * Crea el formulario reactivo para capturar los datos del pago de derechos.
   * Algunos campos, como `claveDeReferencia`, `cadenaPagoDependencia` y `impPago`,
   * están deshabilitados porque no deben ser editados por el usuario.
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
   * Establece valores en el store según el campo y el método proporcionados.
   * $event Objeto que contiene el formulario, el campo y el nombre del método.
   */
  setValoresStore($event: {
    formularioPagoDerechos: FormGroup;
    campo: string;
  }): void {
    const VALOR = $event.formularioPagoDerechos.get($event.campo)?.value;
    this.store.establecerDatos({[$event.campo]: VALOR});
  }
  /**
   * Selecciona una pestaña estableciendo su índice.
   * i El índice de la pestaña a seleccionar.
   */
  seleccionaTab(i: number): void {
    if (i === 4) {
      this.banco = this.datosSolicitudService.banco;
      this.crearformularioPagoDerechos();
    }
    this.indice = i;
  }

    /**
   * Carga datos desde un archivo JSON y actualiza el store con la información obtenida.
   * Luego reinicializa el formulario con los valores actualizados desde el store.
   */
    guardarDatosFormulario(): void {
      this.datosSolicitudService
        .getRegistroPasoUnoData().pipe(
          takeUntil(this.notificadorDestruccion$)
        )
        .subscribe((resp) => {                
          if(resp){
          this.esDatosRespuesta = true;
          this.datosSolicitudService.actualizarEstadoFormulario(resp);
          } 
       });
      }
      /**
   * Método que se ejecuta al destruir el componente.
   * Notifica a los observables suscritos que deben finalizar mediante el `destroyNotifier$`.
   * Esto asegura que no haya fugas de memoria al eliminar las suscripciones activas.
   */
  ngOnDestroy(): void {
    this.notificadorDestruccion$.next();
    this.notificadorDestruccion$.complete();
  }
}
