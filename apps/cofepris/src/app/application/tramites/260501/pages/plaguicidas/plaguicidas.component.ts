import { Component, OnDestroy, OnInit, ViewChild, inject } from '@angular/core';
import { ConsultaioQuery, ConsultaioState, doDeepCopy, esValidObject, JSONResponse, WizardService } from '@ng-mf/data-access-user';
import { ERROR_FORMA_ALERT, MSG_REGISTRO_EXITOSO } from '../../constantes/260501constante.enum';
import { ListaPasosWizard, PASOS } from '@libs/shared/data-access-user/src';
import { Observable, Subject, map, switchMap, take, takeUntil } from 'rxjs';
import { DatosPasos } from '@libs/shared/data-access-user/src/core/models/shared/components.model';
import { ServicioDeFormularioService } from '../../../../shared/services/forma-servicio/servicio-de-formulario.service';
import { TEXTOS } from '../../constantes/260501constante.enum';
import { WizardComponent } from '@libs/shared/data-access-user/src/tramites/components/wizard/wizard.component';
import { Shared2605Service } from '../../../../shared/services/shared2605/shared2605.service';
import { ToastrService } from 'ngx-toastr';
import { Solicitud260501State, Tramite260501Store } from '../../../../shared/estados/stores/260501/tramite260509.store';
import { Tramite260501Query } from '../../../../shared/estados/queries/260501/tramite260501.query';
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
export class PlaguicidasComponent implements OnInit, OnDestroy {
  /**
   * Identificador del procedimiento que se recibe como entrada desde el componente padre.
   * Este valor se utiliza para cargar datos específicos relacionados con el procedimiento,
   * como catálogos o listas asociadas.
   */
  public idProcedimiento: number = 260501;
  /** Identificador numérico para guardar la solicitud.
   * Se inicializa en 0 y se actualiza cuando se captura una nueva solicitud.
   */
  public guardarIdSolicitud: number = 0;
  /**
   * Lista de pasos del asistente.
   * Se obtiene de una constante definida en otro archivo.
   */
  pasos: ListaPasosWizard[] = PASOS;

  /** Textos usados en el componente, provenientes de una fuente centralizada. */
    TEXTOS = TEXTOS;

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
  public solicitudState!: Solicitud260501State;

  /**
  * @property consultaState
  * @description
  * Estado actual de la consulta gestionado por el store `ConsultaioQuery`.
  */
  public consultaState!: ConsultaioState;

  /** Subject para notificar la destrucción del componente. */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
 * @property esFormaValido
 * @description
 * Indica si el formulario actual es válido. Se utiliza para habilitar o deshabilitar la navegación entre pasos en el wizard.
 * @type {boolean}
 * @default false
 */
  public esFormaValido!: boolean;

  /**
 * @property wizardService
 * @description
 * Inyección del servicio `WizardService` para gestionar la lógica y el estado del componente wizard.
 * @type {WizardService}
 */
  wizardService = inject(WizardService);

  /**
 * @property formErrorAlert
 * @description
 * Contiene el mensaje de alerta que se muestra cuando ocurre un error en el formulario.
 * @type {string}
 */
  public formErrorAlert = ERROR_FORMA_ALERT;

  /**
   * Estado del tramite Folio
   */
  public folioTemporal: number = 202773617;

  /**
 * @property formSuccessAlert
 * @description
 * Contiene el mensaje de alerta que se muestra cuando ocurre un success en el formulario.
 * @type {string}
 */
  public formSuccessAlert = MSG_REGISTRO_EXITOSO(String(this.folioTemporal));

  /**
   * @constructor
   * @description
   * Inicializa el componente e inyecta las dependencias necesarias mediante el sistema de inyección de Angular.
   *
   * @param {ServicioDeFormularioService} servicioDeFormularioService 
   * Servicio encargado de registrar, administrar y notificar cambios en los formularios dinámicos.
   *
   * @param {ConsultaioQuery} consultaQuery 
   * Consulta que permite obtener y observar el estado relacionado con la información de consulta.
   */
  constructor(
    private servicioDeFormularioService: ServicioDeFormularioService,
    private consultaQuery: ConsultaioQuery,
    private sharedSvc: Shared2605Service,
    private toastrService: ToastrService,
    private store: Tramite260501Store,
    private query: Tramite260501Query
  ) {}


  /**
 * @method ngOnInit
 * @description
 * Método de inicialización del componente `PlaguicidasComponent`.
 */
  ngOnInit(): void {
    this.query.selectSolicitud$.pipe().subscribe((data) => {
      this.solicitudState = data;
    });
    this.consultaQuery.selectConsultaioState$
        .pipe(
          takeUntil(this.destroyNotifier$),
          map((seccionState) => {
            this.consultaState = seccionState;
          })
        ).subscribe();
  }

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
    if (!this.consultaState.readonly && !this.consultaState.update) {
      this.esFormaValido = this.verificarLaValidezDelFormulario();
        // if (!this.esFormaValido) {
        //   this.indice = e.valor;
        //   this.datosPasos.indice = e.valor;
        //   this.servicioDeFormularioService.markFormAsTouched('datosSolicitudForm');
        //   this.servicioDeFormularioService.markFormAsTouched('domicilioForm');
        //   this.servicioDeFormularioService.markFormAsTouched('manifiestosForm');
        //   this.servicioDeFormularioService.markFormAsTouched('representanteForm');
        //   this.servicioDeFormularioService.markFormAsTouched('tercerosForm');
        //   return;
        // }
      if (e.valor > 0 && e.valor <= this.pasos.length) {
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
        if (e.accion === 'cont' && this.esFormaValido) {
            this.indice = e.valor + 1;
            this.datosPasos.indice = e.valor + 1;
            this.wizardService.cambio_indice(this.datosPasos.indice);
            this.wizardComponent.siguiente();
        } else if (e.accion === 'ant' && this.esFormaValido) {
            this.indice = e.valor - 1;
            this.datosPasos.indice = e.valor - 1;
            this.wizardComponent.atras();
        } 
      }
    } else {
        if (e.valor > 0 && e.valor < 5) {
        this.indice = e.valor;
        this.esFormaValido = true;
        if (e.accion === 'cont') {
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
          this.wizardComponent.atras();
        }
      }
    }
  }

  /**
   * Verifica si se debe navegar al siguiente paso del asistente.
   * Guarda los datos actuales y muestra notificaciones según el resultado.
   * @return {Observable<boolean>} Observable que emite true si se debe navegar, false en caso contrario.
   */
  private shouldNavigate$(): Observable<boolean> {
    return this.sharedSvc.getAllState().pipe(
      take(1),
      switchMap(data => this.guardar(data)),
      map(response => {
        const DATOS = doDeepCopy(response);
        const OK = response.codigo === '00';
        if (OK) {
          this.toastrService.success(DATOS.mensaje);
        } else {
          //this.padreBtn = true;
          this.toastrService.error(DATOS.mensaje);
        }
        return OK;
      })
    );
  }


  /**   
    * Guarda los datos proporcionados enviándolos al servidor mediante el servicio `shared2605Service`.
   * @param datos - Los datos que se desean guardar y enviar al servidor.
   * @returns {Promise<JSONResponse>} Promesa que se resuelve con la respuesta del servidor.
   */
    public guardar(datos: Record<string, unknown>): Promise<JSONResponse> {
      const PAYLOAD = this.sharedSvc.buildPayload(datos,this.idProcedimiento);

      return new Promise((resolve, reject) => {
        this.sharedSvc.guardarDatosPost(PAYLOAD, this.idProcedimiento.toString()).pipe(
          takeUntil(this.destroyNotifier$)
        ).subscribe((response) => {
          if(esValidObject(response)) {
            const RESPONSE = doDeepCopy(response);
            this.store.setIdSolicitud(RESPONSE?.datos?.id_solicitud ?? 0);
            this.guardarIdSolicitud = RESPONSE?.datos?.id_solicitud ?? 0;
            resolve(response);
          }
        },error => {
          reject(error);
        });
      });
  }

  /**
 * @method verificarLaValidezDelFormulario
 * @description
 * Este método verifica la validez de los formularios dinámicos asociados a los pasos del wizard.
 * @returns {boolean} - Indica si todos los formularios son válidos.
 */
  verificarLaValidezDelFormulario(): boolean {
    return (
      (this.servicioDeFormularioService.isFormValid('datosSolicitudForm') ??
        false) &&
      (this.servicioDeFormularioService.isFormValid('domicilioForm') ??
        false) &&
      (this.servicioDeFormularioService.isFormValid('manifiestosForm') ??
        false) &&
      (this.servicioDeFormularioService.isFormValid('representanteForm') ??
        false) &&
      (this.servicioDeFormularioService.isFormValid('tercerosForm') ??
      false)
    );
  }

  /**
   * Método del ciclo de vida de Angular que se llama justo antes de que el componente sea destruido.
   *
   * Este método emite un valor a través del observable `destroyNotifier$` para notificar a los suscriptores
   * que el componente está siendo destruido, y luego completa el observable para liberar recursos.
   *
   * @returns {void} No retorna ningún valor.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
