import { Component, EventEmitter,OnDestroy, OnInit, ViewChild,inject } from '@angular/core';
import { ListaPasosWizard, PASOS, WizardService,doDeepCopy, esValidObject, getValidDatos} from '@libs/shared/data-access-user/src';
import { Observable, Subject, map,switchMap, take, takeUntil } from 'rxjs';
import { Solicitud260511State, Tramite260511Store } from '../../../../shared/estados/stores/260511/tramite260511.store';
import { DatosDomicilioLegalService } from '../../../../shared/services/datos-domicilio-legal.service';
import { DatosDomicilioLegalState } from '../../../../shared/estados/stores/datos-domicilio-legal.store';
import { DatosPasos } from '@libs/shared/data-access-user/src/core/models/shared/components.model';
import { PagoBancoService } from '../../../../shared/services/pago-banco.service';
import { PasoUnoComponent } from '../paso-uno/paso-uno.component';
import { Shared2605Service } from '../../../../shared/services/shared2605/shared2605.service';
import { SolicitudPagoBancoState } from '../../../../shared/estados/stores/pago-banco.store';
import { TEXTO_DE_PELIGRO } from '../../constantes/permiso-nutrientes-exportacion.enum';
import { TercerosFabricanteService } from '../../../../shared/services/terceros-fabricante.service';
import { TercerosFabricanteState } from '../../../../shared/estados/stores/terceros-fabricante.store';
import { ToastrService } from 'ngx-toastr';
import { Tramite260511Query } from '../../../../shared/estados/queries/260511/tramite260511.query';
import { WizardComponent } from '@libs/shared/data-access-user/src/tramites/components/wizard/wizard.component';

/**
 * Interfaz para definir la estructura de los botones de acción en el asistente.
 * Contiene la acción y el valor del botón.
 * Representa la acción y el valor asociados con un botón.
*/
interface AccionBoton {
  accion: string;
  valor: number;
}

/**
 * Componente principal para la gestión de plaguicidas.
 * Contiene la lógica y la estructura del asistente de plaguicidas.
 */
@Component({
  selector: 'app-plaguicidas',
  templateUrl: './plaguicidas.component.html',
})
export class PlaguicidasComponent implements OnInit,OnDestroy {
    /** Indica si el botón continuar ha sido activado para ejecutar las validaciones del formulario. */
  public isContinuarTriggered: boolean = false;
   /**
   * Referencia al componente `PasoUnoComponent`.
   */
  @ViewChild('pasoUnoRef') pasoUnoComponent!: PasoUnoComponent;
  /**
   * Identificador del procedimiento que se recibe como entrada desde el componente padre.
   * Este valor se utiliza para cargar datos específicos relacionados con el procedimiento,
   * como catálogos o listas asociadas.
   */
  public idProcedimiento: number = 260511;
  /** Identificador numérico para guardar la solicitud.
   * Se inicializa en 0 y se actualiza cuando se captura una nueva solicitud.
   */
  public guardarIdSolicitud: number = 0;
  /**
   * Evento que se emite para cargar archivos.
   * Este evento se utiliza para notificar a otros componentes que se debe realizar una acción de
   */
  cargarArchivosEvento = new EventEmitter<void>();
  /**
   * Lista de pasos del asistente.
   * Se obtiene de una constante definida en otro archivo.
   */
  pasos: ListaPasosWizard[] = PASOS;

  /**
   * Indice actual del paso en el asistente.
   * Se inicializa en 1.
   */
  indice: number = 1;

  /**
   * Título del asistente.
   */
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;
  /**
   * @property wizardService
   * @description
   * Inyección del servicio `WizardService` para gestionar la lógica y el estado del componente wizard.
   * @type {WizardService}
   */
    wizardService = inject(WizardService);

/**
 * Indica si el botón para cargar archivos está habilitado.
 */
  activarBotonCargaArchivos: boolean = false;

   /**
 * Indica si la sección de carga de documentos está activa.
 * Se inicializa en true para mostrar la sección de carga de documentos al inicio.
 */
  seccionCargarDocumentos: boolean = true;

  /**
   * Indica si la carga de archivos está en progreso.
   */
  cargaEnProgreso: boolean = true;
  /**
   * Indica si se debe mostrar un mensaje de peligro.
   */
  public isPeligro: boolean = false;

  /** Texto de advertencia que se muestra cuando hay condiciones peligrosas. */
  public textoPeligro: string = TEXTO_DE_PELIGRO;
  /**
   * Título del asistente.
   */
  datosPasos: DatosPasos = {
    nroPasos: this.pasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };
    /**
     * Estado de la solicitud.
     */
    public solicitudState!: Solicitud260511State;
  /**
   * Constructor del componente.
   * Inicializa los servicios necesarios para la gestión de plaguicidas.
   *
   * @param datosDomicilioLegalService - Servicio para gestionar datos de domicilio legal.
   * @param pagoBancoService - Servicio para gestionar pagos en el banco.
   * @param tercerosFabricanteService - Servicio para gestionar terceros fabricantes.
   */
  constructor(
    private datosDomicilioLegalService: DatosDomicilioLegalService,
    private pagoBancoService: PagoBancoService,
    private tercerosFabricanteService: TercerosFabricanteService,
    private toastrService: ToastrService,
    private _sharedSvc: Shared2605Service,
    private _store: Tramite260511Store,
    private _query: Tramite260511Query
  ) {}


  /**   
   * Método de ciclo de vida de Angular que se ejecuta al inicializar el componente.
   * Suscribe al estado de la solicitud para mantener el estado local actualizado.
   * {void} No retorna ningún valor.
   */
  ngOnInit(): void {
    this._query.selectSolicitud$.pipe().subscribe((data) => {
      this.solicitudState = data;
      this.isContinuarTriggered = this.solicitudState['continuarTriggered'] ?? false;
    });
  }

  /**
   * Notificador para destruir observables al destruir el componente.
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * Maneja la acción del botón en el asistente.
   * Cambia el paso actual según la acción del botón.
   *
   * @param e - Objeto que contiene la acción y el valor del botón.
   */
  getValorIndice(e: AccionBoton): void {
    const NEXT_INDEX =
        e.accion === 'cont' ? e.valor + 1 :
        e.accion === 'ant' ? e.valor - 1 :
        e.valor;
 
    if (this.indice === 1 && e.accion === 'cont') {
      this._store.setContinuarTriggered(true);
      const ES_VALIDO = this.validarFormulariosPasoActual();
      if (!ES_VALIDO) {
        this.isPeligro = true;
        return;
      }
      this.isPeligro = false;
    }
    if (e.valor > 0 && e.valor < this.pasos.length) {
      if (e.accion === 'cont') {
        if (this.indice === 1) {
            this.shouldNavigate$()
          .subscribe((shouldNavigate) => {
            if (shouldNavigate) {
              this.indice = NEXT_INDEX;
              this.datosPasos.indice = NEXT_INDEX;
              this.wizardService.cambio_indice(NEXT_INDEX);
              this.wizardComponent.siguiente();
            } else {
              this.indice = e.valor;
              this.datosPasos.indice = e.valor;
            }
          });
        } else {
          this.indice = NEXT_INDEX;
          this.datosPasos.indice = NEXT_INDEX;
          this.wizardService.cambio_indice(NEXT_INDEX);
          this.wizardComponent.siguiente();
        }
      } else {
        this.indice = NEXT_INDEX;
        this.datosPasos.indice = NEXT_INDEX;
        this.wizardComponent.atras();
      }
    }
  }


  /**
   * Verifica si se debe navegar al siguiente paso.
   * Realiza una llamada para guardar los datos y determina si la navegación es exitosa.
   * @returns {Observable<boolean>} Observable que emite true si se debe navegar, false en caso contrario.
   */
  private shouldNavigate$(): Observable<boolean> {
      return this._sharedSvc.getAllState().pipe(
        take(1),
        switchMap(data => this.guardar(data)),
        map((response) => {
          const API_DATOS = doDeepCopy(response)
          const OK = API_DATOS.codigo === '00';
          if (OK) {
            this.toastrService.success(API_DATOS.mensaje);
          } else {
            this.toastrService.error(API_DATOS.mensaje);
          }
          return OK;
        })
      );
    }

  /**
   * Obtiene el estado de los datos del domicilio legal desde el servicio `datosDomicilioLegalService`.
   * 
   * @returns {DatosDomicilioLegalState} El estado actual de los datos del domicilio legal.
   * 
   * @remarks
   * Este método utiliza un observable para suscribirse al estado proporcionado por el servicio.
   * Sin embargo, debido a la naturaleza asíncrona de los observables, el valor retornado puede no reflejar
   * el estado actualizado en el momento de la ejecución. Es importante manejar este comportamiento
   * adecuadamente si se requiere el estado más reciente.
   */
  getDatosDomicilioLegalState(): DatosDomicilioLegalState {
    let PAYLOAD= {} as DatosDomicilioLegalState
    this.datosDomicilioLegalService.getDatosDomicilioLegalState()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((state) => {
         PAYLOAD = state;
      });
      return PAYLOAD;
  }



  /**
   * Maneja la acción del botón "Continuar" en el asistente.
   * Cambia el paso actual al siguiente paso.
   */
  getTercerosFabricanteState(): TercerosFabricanteState {
    let PAYLOAD = {} as TercerosFabricanteState;
    this.tercerosFabricanteService
      .getTercerosFabricanteState()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((state) => {
        PAYLOAD = state;
      });
    return PAYLOAD;
  }

  /**
   * Maneja la acción del botón "Continuar" en el asistente.
   * Cambia el paso actual al siguiente paso.
   * Obtiene el estado de la solicitud de pago en el banco.
   * 
   * Este método utiliza el servicio `pagoBancoService` para suscribirse al estado
   * de la solicitud de pago en el banco y devuelve un objeto del tipo `SolicitudPagoBancoState`.
   * 
   * @returns {SolicitudPagoBancoState} El estado de la solicitud de pago en el banco.
   */
  getSolicitudPagoBancoState():SolicitudPagoBancoState{
  let PAYLOAD= {} as SolicitudPagoBancoState
    this.pagoBancoService.getSolicitudPagoBancoState()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((state) => {
         PAYLOAD = state;
      });
      return PAYLOAD;
  }

  /**
   * Guarda los datos proporcionados mediante una solicitud HTTP POST.
   * @param data - Los datos que se desean guardar.
   * @returns {Promise<unknown>} Una promesa que se resuelve con la respuesta de la solicitud POST.
   */
    public guardar(data: Record<string, unknown>): Promise<unknown> {
       const PAYLOAD = this._sharedSvc.buildPayload(data, this.idProcedimiento);
        return new Promise((resolve, reject) => {
          this._sharedSvc.guardarDatosPost(PAYLOAD,this.idProcedimiento.toString()).subscribe({
            next: (response) => {
              const RESPONSE = doDeepCopy(response);
              if (esValidObject(RESPONSE) && esValidObject(RESPONSE['datos'])) {
                const DATOS = RESPONSE['datos'] as { id_solicitud?: number };
                if (getValidDatos(DATOS.id_solicitud)) {
                  this.guardarIdSolicitud = DATOS.id_solicitud ?? 0;
                  this._store.setIdSolicitud(DATOS.id_solicitud ?? 0);
                } else {
                  this._store.setIdSolicitud(0);
                }
              }
              resolve(response);
            },
            error: (error) => {
              reject(error);
            }
          });
        });
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

  /** Actualiza el estado de carga en progreso. */
  onCargaEnProgreso(carga: boolean): void {
    this.cargaEnProgreso = carga;
  }
/**
   * Valida los formularios del paso actual antes de permitir continuar.
   * @returns {boolean} - `true` si los formularios son válidos, `false` en caso contrario.
   */
  validarFormulariosPasoActual(): boolean {
    if (this.indice === 1) {
      return this.pasoUnoComponent?.validarFormularios() ?? true;
    }
    return true;
  }

  /**
   * Lógica de limpieza para desuscribirse de los observables cuando el componente es destruido.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
