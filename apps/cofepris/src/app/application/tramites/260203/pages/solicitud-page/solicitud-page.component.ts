import { CommonModule } from '@angular/common';

import { AVISO, AlertComponent, Notificacion, PasoCargaDocumentoComponent, RegistroSolicitudService, esValidObject, getValidDatos } from '@ng-mf/data-access-user';
import { Component, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { MENSAJE_DE_VALIDACION, PASOS, PRIVACY_NOTICE_CONTENT } from '../../constantes/materias-primas.enum';
import { AccionBoton } from '@libs/shared/data-access-user/src';
import { BtnContinuarComponent } from '@libs/shared/data-access-user/src';
import { DatosPasos } from '@libs/shared/data-access-user/src';
import { ListaPasosWizard } from '@ng-mf/data-access-user';
import { ViewChild } from '@angular/core';
import { WizardComponent } from '@ng-mf/data-access-user';

import { Subject, map,takeUntil } from 'rxjs';
import { Tramite260203State, Tramite260203Store } from '../../estados/stores/tramite260203Store.store';
import { GuardarAdapter_260203 } from '../../adapters/guardar-payload.adapter';
import { PasoDosComponent } from '../paso-dos/paso-dos.component';
import { PasoFirmaComponent } from '@libs/shared/data-access-user/src';
import { PasoTresComponent } from '../paso-tres/paso-tres.component';
import { PasoUnoComponent } from '../paso-uno/paso-uno.component';
import { ToastrService } from 'ngx-toastr';
import { Tramite260203Query } from '../../estados/queries/tramite260203Query.query';
/**
 * @component SolicitudPageComponent
 * @description Componente principal de la página de solicitud. Controla la navegación
 * entre pasos de un wizard, muestra el título correspondiente y permite avanzar o retroceder
 * según la interacción del usuario. Utiliza un componente wizard para encapsular la lógica de pasos.
 */
@Component({
  selector: 'app-solicitud-page',
  standalone: true,
  imports: [
    CommonModule,
    WizardComponent,
    PasoUnoComponent,
    PasoDosComponent,
    PasoTresComponent,
    BtnContinuarComponent,
    PasoCargaDocumentoComponent,
    PasoFirmaComponent,
    AlertComponent,
  ],
  templateUrl: './solicitud-page.component.html',
  styleUrl: './solicitud-page.component.css',
})
export class SolicitudPageComponent implements OnInit, OnDestroy{
    /**
   *
   * Una cadena que representa la clase CSS para una alerta de información.
   * Esta clase se utiliza para aplicar estilo a los mensajes de información en el componente.
   */
  public infoAlert = 'alert-info';
  /**
   * @property {string | null} tituloMensaje
   * Título principal mostrado en la parte superior según el paso actual.
   */
  tituloMensaje: string | null =
    'Permiso sanitario de importación de medicamentos con registro sanitario';

  /**
   * @property {ListaPasosWizard[]} pasos
   * Lista de pasos del wizard obtenidos desde una constante externa.
   */
  pasos: ListaPasosWizard[] = PASOS;

  PRIVACY_NOTICE_CONTENT:string=PRIVACY_NOTICE_CONTENT;

  /**
   * @property {number} indice
   * Índice actual del paso seleccionado (empieza en 1).
   */
  indice: number = 1;

  /**
   * @property {WizardComponent} wizardComponent
   * Referencia al componente Wizard para controlar navegación entre pasos.
   */
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;
   /**
    * URL de la página actual.
    */
    public storeData!: Tramite260203State;
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
    /*
    * Indica si hay una carga en progreso.
    */
    cargaEnProgreso: boolean = true;
    /**
   * Identificador del trámite actual.
   */
   tramiteId: string = '260203';
    
    /**
     * Identificador numérico de la solicitud actual.
     * Se inicializa en 0 y se actualiza cuando se captura una nueva solicitud.
     */
    idSolicitud: number = 0;
  /**
   * @property {DatosPasos} datosPasos
   * Objeto de configuración utilizado por el componente wizard.
   */
  datosPasos: DatosPasos = {
    nroPasos: this.pasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };
  
  /**
   * Clase CSS para mostrar una alerta de error.
   */
  infoError = 'alert-danger text-center';
/**
   * Textos constantes utilizados en el componente.
   */
  TEXTOS: string = AVISO.Aviso;
  /**
    * @property {PasoUnoComponent} pasoUnoComponent
    * @description
    * Referencia al componente hijo `PasoUnoComponent` mediante
    * `@ViewChild`. Permite acceder a sus métodos y propiedades
    * desde este componente padre.
  */
  @ViewChild(PasoUnoComponent) pasoUnoComponent!: PasoUnoComponent;
   /**
 * @property {string} MENSAJE_DE_ERROR
 * @description
 * Propiedad usada para almacenar el mensaje de error actual.
 * Se inicializa como cadena vacía y se actualiza en función
 * de las validaciones o errores capturados en el flujo.
 */
   MENSAJE_DE_ERROR: string = MENSAJE_DE_VALIDACION;
   /**
   * Controla la visibilidad del modal de alerta.
   * @property {boolean} mostrarAlerta
   */
  public mostrarAlerta: boolean = false;
  
   /**
   * Controla la visibilidad del mensaje de error cuando la validación de formularios falla.
   */
  esFormaValido: boolean = false;
 /**
     * Contiene el mensaje de error que se muestra cuando la validación de formularios falla.
     */
   public formErrorAlert!:string;
   /** Nueva notificación relacionada con el RFC. */
  public seleccionarFilaNotificacion!: Notificacion;
    /**
   * Notificador para gestionar la destrucción de observables.
   */
  destroyNotifier$: Subject<void> = new Subject();

  constructor(private store: Tramite260203Store,
     private tramite260203Query: Tramite260203Query,
     public registroSolicitudService: RegistroSolicitudService, private toastrService: ToastrService
  ) {
    // Suscripción al estado de la solicitud en el store
  }

  ngOnInit(): void {
       this.tramite260203Query.selectTramiteState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.storeData = seccionState;
        })
      ).subscribe();
  }
  /**
   * @method seleccionaTab
   * @description Cambia el índice actual del wizard manualmente.
   * @param {number} i - Índice del paso al que se desea cambiar.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }

 /**
   * @method getValorIndice
   * @description Controla la navegación del wizard según el botón presionado (anterior o continuar).
   * También actualiza el título correspondiente al paso actual.
   *
   * @param {AccionBoton} e - Objeto que contiene el valor y la acción del botón presionado.
   */
   getValorIndice(e: AccionBoton): void {

    // if (e.accion === 'cont') {
    //   let isValid = true;

    //     if (this.indice === 1 && this.pasoUnoComponent) {
    //     isValid = this.pasoUnoComponent.validarPasoUno();
    //   }
    //   if(!this.pasoUnoComponent.pagoDeDerechosContenedoraComponent.validarContenedor()){
    //     this.mostrarAlerta=true;
    //     this.seleccionarFilaNotificacion = {
    //       tipoNotificacion: 'alert',
    //       categoria: 'danger',
    //       modo: 'action',
    //       titulo: '',
    //       mensaje: MENSAJE_DE_VALIDACION,
    //       cerrar: true,
    //       tiempoDeEspera: 2000,
    //       txtBtnAceptar: 'SI',
    //       txtBtnCancelar: 'NO',
    //     }
    //     setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 0);
    //   }
    //   if (!isValid) {
    //     this.esFormaValido = true;
    //     this.datosPasos.indice = this.indice;
    //     return;
    //   }

    //   const PAYLOAD = GuardarAdapter_260203.toFormPayload(this.storeData);
    //   let shouldNavigate = false;
    //   this.registroSolicitudService.postGuardarDatos('260203', PAYLOAD).subscribe(response => {
    //     shouldNavigate = response.codigo === '00';
    //     if (!shouldNavigate) {
    //       const ERROR_MESSAGE = response.error || 'Error desconocido en la solicitud';
    //       this.formErrorAlert = SolicitudPageComponent.generarAlertaDeError(ERROR_MESSAGE);
    //       this.esFormaValido = false;
    //       this.indice = 1;
    //       this.datosPasos.indice = 1;
    //       this.wizardComponent.indiceActual = 1;
    //       setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 0);
    //       return;
    //     }
    //     if(shouldNavigate) {
    //       if(esValidObject(response) && esValidObject(response.datos)) {
    //         const DATOS = response.datos as { id_solicitud?: number };
    //         if(getValidDatos(DATOS.id_solicitud)) {
    //           this.store.setIdSolicitud(DATOS.id_solicitud ?? 0);
    //         } else {
    //           this.store.setIdSolicitud(0);
    //         }
    //       }
    //       // Calcular el nuevo índice basado en la acción
    //       let indiceActualizado = e.valor;
    //       if (e.accion === 'cont') {
    //         indiceActualizado = e.valor + 1;
    //       }
    //       this.toastrService.success(response.mensaje);
    //       if (indiceActualizado > 0 && indiceActualizado < 5) {
    //         this.indice = indiceActualizado;
    //         this.datosPasos.indice = indiceActualizado;
    //         if (e.accion === 'cont') {
    //           this.wizardComponent.siguiente();
    //         } else {
    //           this.wizardComponent.atras();
    //         }
    //       }
    //     } else {
    //       this.toastrService.error(response.mensaje);
    //     }
    //   });
    // }else{
    //   this.indice = e.valor;
    //   this.datosPasos.indice = this.indice;
    //   this.wizardComponent.atras();
    // }
  
  if (e.accion === 'cont') {
    const PAYLOAD = GuardarAdapter_260203.toFormPayload(this.storeData);
    let shouldNavigate = false;
    this.registroSolicitudService.postGuardarDatos('260203', PAYLOAD).subscribe(response => {
      shouldNavigate = response.codigo === '00';
      if (!shouldNavigate) {
        const ERROR_MESSAGE = response.error || 'Error desconocido en la solicitud';
        this.formErrorAlert = SolicitudPageComponent.generarAlertaDeError(ERROR_MESSAGE);
        this.esFormaValido = false;
        this.indice = 1;
        this.datosPasos.indice = 1;
        this.wizardComponent.indiceActual = 1;
        setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 0);
        return;
      }
      if(shouldNavigate) {
        if(esValidObject(response) && esValidObject(response.datos)) {
          const DATOS = response.datos as { id_solicitud?: number };
          if(getValidDatos(DATOS.id_solicitud)) {
            this.store.setIdSolicitud(DATOS.id_solicitud ?? 0);
          } else {
            this.store.setIdSolicitud(0);
          }
        }
        const INDICE_ACTUALIZADO = this.indice + 1; 
        
        this.toastrService.success(response.mensaje);
        if (INDICE_ACTUALIZADO > 0 && INDICE_ACTUALIZADO <= 3) { 
          this.indice = INDICE_ACTUALIZADO;
          this.datosPasos.indice = INDICE_ACTUALIZADO;
          this.wizardComponent.siguiente();
        }
      } else {
        this.toastrService.error(response.mensaje);
      }
    });
  } else {
    this.indice = e.valor;
    this.datosPasos.indice = this.indice;
    this.wizardComponent.atras();
  }
  }

  /**
   * @method obtenerNombreDelTítulo
   * @description Devuelve el título a mostrar según el número de paso.
   *
   * @param {number} valor - Índice del paso actual.
   * @returns {string} - Título correspondiente.
   */
  static obtenerNombreDelTítulo(valor: number): string {
    switch (valor) {
      case 1:
        return 'Permiso sanitario de importación de medicamentos con registro sanitario';
      case 2:
        return 'Anexar requisitos';
      case 3:
        return 'Firmar solicitud';

      default:
        return 'Permiso sanitario de importación de medicamentos con registro sanitario';
    }
  }
     
  /**
   * Emite un evento para cargar archivos.
   * {void} No retorna ningún valor.
   */
  onClickCargaArchivos(): void {
    this.cargarArchivosEvento.emit();
  }

  /*
  * Maneja el evento de carga en progreso.
  */
   onCargaEnProgreso(carga: boolean): void {
    this.cargaEnProgreso = carga;
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
  public static generarAlertaDeError(mensajes:string): string {
    const ALERTA = `
      <div class="d-flex justify-content-center text-center">
        <div class="col-md-12 p-3  border-danger  text-danger rounded">
          <div class="mb-2 text-secondary" >Corrija los siguientes errores:</div>

          <div class="d-flex justify-content-start mb-1">
            <span class="me-2">1.</span>
            <span class="flex-grow-1 text-center">${mensajes}</span>
          </div>  
        </div>
      </div>
      `;
      return ALERTA;
  }
  /**
   * Método que se ejecuta cuando se destruye el componente.
   * Limpia el notifier para evitar fugas de memoria.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}