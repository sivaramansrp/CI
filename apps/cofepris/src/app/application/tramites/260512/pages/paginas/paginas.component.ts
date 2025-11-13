import { Component, EventEmitter, OnInit, ViewChild, inject } from '@angular/core';
import { DatosPasos, ListaPasosWizard, PASOS, WizardComponent, WizardService, esValidObject, getValidDatos } from '@libs/shared/data-access-user/src';
import { Observable, map, switchMap, take } from 'rxjs';
import { Solicitud260512State, Tramite260512Store } from '../../../../estados/tramites/260512/tramite260512.store';
import { AccionBoton } from '@ng-mf/data-access-user';
import { DatosComponent } from '../datos/datos.component';
import { DatosDomicilioService } from '../../services/datos-domicilio.service';
import { ERROR_FORMA_ALERT } from '../../constantes/constante260512.enum';
import { PANTA_PASOS } from '@ng-mf/data-access-user';
import { Shared260512Service } from '../../services/260512-payload.service';
import { ToastrService } from 'ngx-toastr';
import { Tramite260512Query } from '../../../../estados/queries/260512/tramite260512.query';
/**
 * @component PaginasComponent
 * @description
 * Componente principal para gestionar el flujo de pasos en el wizard del trámite 260512.
 * Permite la navegación entre diferentes pantallas/pasos utilizando el componente Wizard.
 * Controla el índice del paso actual y los datos necesarios para la navegación.
 * 
 */
@Component({
  selector: 'app-paginas',
  templateUrl: './paginas.component.html',
})
export class PaginasComponent implements OnInit {
  
  /**
   * @property pantallasPasos
   * @type {ListaPasosWizard[]}
   * @description
   * Lista de pasos del wizard, obtenida desde una constante.
   */
  public pantallasPasos: ListaPasosWizard[] = PANTA_PASOS;
 
  /**
   * @property indice
   * @type {number}
   * @default 1
   * @description
   * Índice del paso actual en el wizard.
   */
  public indice: number = 1;

  @ViewChild(DatosComponent) pasoUnoComponent!:DatosComponent ;

    /**
     * Lista de pasos del asistente.
     * Se obtiene de una constante definida en otro archivo.
     */
    pasos: ListaPasosWizard[] = PASOS;
  

  public esFormaValido: boolean = false;

  public formErrorAlert = ERROR_FORMA_ALERT;
 
  /**
   * @property wizardComponent
   * @type {WizardComponent}
   * @description
   * Referencia al componente Wizard para controlar la navegación entre pasos.
   */
  @ViewChild(WizardComponent)
  public wizardComponent!: WizardComponent;
 
   /**
     * @property wizardService
     * @description
     * Inyección del servicio `WizardService` para gestionar la lógica y el estado del componente wizard.
     * @type {WizardService}
     */
      wizardService = inject(WizardService);
  

  /**
   * @property datosPasos
   * @type {DatosPasos}
   * @description
   * Datos utilizados para el control del wizard, como el número de pasos, el índice actual y los textos de los botones.
   */
  public datosPasos: DatosPasos = {
    nroPasos: this.pantallasPasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };

    public solicitudState!: Solicitud260512State;
  
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

  /**
   * Indica si la carga de archivos está en progreso.
   */
  cargaEnProgreso: boolean = true;
          /**
   * @property {boolean} isSaltar
   * @description
   * Indica si se debe saltar al paso de firma. Controla la navegación
   * directa al paso de firma en el wizard.
   * @default false - No salta por defecto
   */
  isSaltar: boolean = false;

  /**
     * Constructor que inyecta los servicios necesarios para el componente.
     * - toastrService: Servicio para mostrar notificaciones al usuario.
     * - service: Servicio específico para operaciones del permiso de vegetales y nutrientes.
     * - store: Manejador del estado del trámite 260512.
     * - Shared260512Service: Servicio compartido para lógica común del trámite 2605.
     * - query: Fuente de datos reactiva para observar el estado de la solicitud.
     */
    constructor(
      private toastrService: ToastrService,
      private service: DatosDomicilioService,
      private store: Tramite260512Store,
      private shared260512Service: Shared260512Service,
      private query: Tramite260512Query
    ) {}
  
      /** Se ejecuta al inicializar el componente y suscribe al estado de la solicitud. */
  ngOnInit(): void {
    this.query.select().subscribe((data) => {
      this.solicitudState = data;
    });
    
  }

// ngOnInit(): void {
//       this.tramite260512Query.select().subscribe(state => {
//       this.solicitudState = state;
//     });
//   }
  /**
   * @method getValorIndice
   * @description
   * Actualiza el índice del paso y maneja la navegación hacia adelante o atrás en el wizard.
   * Si la acción es 'cont', avanza al siguiente paso; en caso contrario, retrocede.
   * Solo actualiza si el valor está dentro del rango de pasos válidos.
   * 
   * @param {AccionBoton} e - Objeto que contiene el valor del paso y la acción a realizar.
   * @returns {void}
   */
  // public getValorIndice(e: AccionBoton): void {
  //   // Validar formularios antes de continuar desde el paso uno
  //   if (this.indice === 1 && e.accion === 'cont') {
  //     const ISVALID = this.pasoUnoComponent.validOnButtonClick();
  //     if (!ISVALID) {
  //       this.esFormaValido = true;
  //       return; // Detener ejecución si los formularios son inválidos
  //     }
  //   }

  //   // Calcular el nuevo índice basado en la acción
  //   let indiceActualizado = e.valor;
  //   if (e.accion === 'cont') {
  //     indiceActualizado = e.valor + 1;
  //   } else if (e.accion === 'ant') {
  //     indiceActualizado = e.valor - 1;
  //   }

  //   // Validar que el nuevo índice esté dentro de los límites permitidos
  //   if (indiceActualizado > 0 && indiceActualizado <= this.pantallasPasos.length) {

  //     // Actualizar el índice y datosPasos
  //     this.indice = indiceActualizado;
  //     this.datosPasos.indice = indiceActualizado;

  //     if (e.accion === 'cont') {
  //       this.wizardComponent.siguiente();
  //     } else if (e.accion === 'ant') {
  //       this.wizardComponent.atras();
  //     }
  //   }
  // }
    getValorIndice(e: AccionBoton): void {
       const NEXT_INDEX = e.valor;

  if (NEXT_INDEX > 0 && NEXT_INDEX <= this.pantallasPasos.length) {
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
      this.indice = NEXT_INDEX;
      this.datosPasos.indice = NEXT_INDEX;
      this.wizardComponent.atras();
    }
  }
    }
  
    /**
     * Maneja la lógica para actualizar el índice del paso del wizard según el evento del botón de acción proporcionado.
     *
     * Este método obtiene el estado actual desde `nuevoProgramaIndustrialService`, lo guarda,
     * y muestra un mensaje de éxito o error dependiendo del código de respuesta. Si la respuesta es exitosa
     * y el valor del evento está dentro del rango válido (1 a 4), actualiza el índice del wizard y navega
     * hacia adelante o atrás según el tipo de acción.
     *
     * @param e - El evento del botón de acción que contiene el valor y el tipo de acción.
     */
      private shouldNavigate$(): Observable<boolean> {
        return this.shared260512Service.getAllState().pipe(
          take(1),
          switchMap(data => this.guardar(data)),
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          map((response: any) => {
            const OK = response.codigo === '00';
            if (OK) {
              this.toastrService.success(response.mensaje);
            } else {
              this.toastrService.error(response.mensaje);
            }
            return OK;
          })
        );
      }
  
      /**
       * Guarda los datos proporcionados enviándolos al servidor mediante el servicio `nuevoProgramaIndustrialService`.
       *
       * @param data - Los datos que se desean guardar y enviar al servidor.
       * @returns void
       */
      guardar(data: Record<string, unknown>): Promise<unknown> {
        const PAYLOAD = this.shared260512Service.buildPayload(data, 260512);
        return new Promise((resolve, reject) => {
          this.service.guardarDatosPost(PAYLOAD).subscribe({
            next: (response) => {
              if (esValidObject(response) && esValidObject(response['datos'])) {
                const DATOS = response['datos'] as { id_solicitud?: number };
                if (getValidDatos(DATOS.id_solicitud)) {
                  this.store.setIdSolicitud(DATOS.id_solicitud ?? 0);
                } else {
                  this.store.setIdSolicitud(0);
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
     * Valida los formularios del paso actual antes de permitir continuar.
     * @returns {boolean} - `true` si los formularios son válidos, `false` en caso contrario.
     */
    validarFormulariosPasoActual(): boolean {
      if (this.indice === 1) {
        return this.pasoUnoComponent?.validOnButtonClick() ?? true;
      }
      return true;
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
   * Método para navegar a la sección anterior del wizard.
   * Actualiza el índice y el estado de los pasos.
   * {void} No retorna ningún valor.
   */
  anterior(): void {
    this.wizardComponent.atras();
    this.indice = this.wizardComponent.indiceActual + 1;
    this.datosPasos.indice = this.wizardComponent.indiceActual + 1;
  }
   /**
   * @method saltar
   * @description
   * Método para saltar directamente al paso de firma en el wizard.
   * Actualiza los índices correspondientes y ejecuta la transición
   * forward en el componente wizard.
   */
  saltar(): void {
    this.indice = 3;
    this.datosPasos.indice = 3;
    this.wizardComponent.siguiente();
  }
    /**
   * Método para navegar a la siguiente sección del wizard.
   * Realiza la validación de los documentos cargados y actualiza el índice y el estado de los pasos.
   * {void} No retorna ningún valor.
   */
  siguiente(): void {
    // Aqui se hara la validacion de los documentos cargdados
    this.wizardComponent.siguiente();
    this.indice = this.wizardComponent.indiceActual + 1;
    this.datosPasos.indice = this.wizardComponent.indiceActual + 1;
  }
}
