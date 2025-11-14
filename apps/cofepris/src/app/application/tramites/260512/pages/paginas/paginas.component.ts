import { Component, EventEmitter, OnInit, ViewChild} from '@angular/core';
import { DatosPasos,ListaPasosWizard,PASOS, RegistroSolicitudService,WizardComponent, esValidObject, getValidDatos } from '@libs/shared/data-access-user/src';
import { ERROR_FORMA_ALERT, MENSAJE_DE_VALIDACION } from '../../constantes/constante260512.enum';
import { Tramite260512State, Tramite260512Store } from '../../estados/stores/tramite260512Store.store';
import { AccionBoton } from '@ng-mf/data-access-user';
import { DatosComponent } from '../datos/datos.component';
import { GuardarAdapter_260512 } from '../../adapters/guardar-payload.adapter';
import { ToastrService } from 'ngx-toastr';
import { Tramite260512Query } from '../../estados/queries/tramite260512Query.query';
/**
 * @component PaginasComponent
 * @description
 * Componente principal para gestionar el flujo de pasos en el wizard del trámite 260514.
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
   * @property {boolean} isSaltar
   * @description
   * Indica si se debe saltar al paso de firma. Controla la navegación
   * directa al paso de firma en el wizard.
   * @default false - No salta por defecto
   */
  isSaltar: boolean = false;
     /**
    /**
   * @ignore
   * Este método es ignorado por Compodoc.
   */
  cargaEnProgreso: boolean = true;
      /**
   * Indica si la sección de carga de documentos está activa.
   * Se inicializa en true para mostrar la sección de carga de documentos al inicio.
   */
  seccionCargarDocumentos: boolean = true;
  
  /**
   * Indica si el botón para cargar archivos está habilitado.
   */
  activarBotonCargaArchivos: boolean = false;
  
       /**
     * Evento que se emite para cargar archivos.
     * Este evento se utiliza para notificar a otros componentes que se debe realizar una acción de
     */
    cargarArchivosEvento = new EventEmitter<void>();
  
   /**
   * Estado de la solicitud actual.
   *
   * @type {Tramite260203State}
   * @memberof SolicitudPageComponent
   */
  idTipoTRamite: string = '260512';
  
    /**
     * URL de la página actual.
     */
      public solicitudState!: Tramite260512State;
  /**
   * Lista de pasos del asistente.
   * Se obtiene de una constante definida en otro archivo.
   */
  pasos: ListaPasosWizard[] = PASOS;

  public formErrorAlert = ERROR_FORMA_ALERT;
    
    esFormaValido: boolean = false;

  /**
   * Indice actual del paso en el asistente.
   * Se inicializa en 1.
   */
  indice: number = 1;
  
     /**
   * @property {string} MENSAJE_DE_ERROR
   * @description
   * Propiedad usada para almacenar el mensaje de error actual.
   * Se inicializa como cadena vacía y se actualiza en función
   * de las validaciones o errores capturados en el flujo.
   */
     MENSAJE_DE_ERROR: string = MENSAJE_DE_VALIDACION;
  /**
   * Título del asistente.
   */
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;
     @ViewChild(DatosComponent) datosComponent!: DatosComponent;
  

  /**
   * Título del asistente.
   */
  datosPasos: DatosPasos = {
    nroPasos: this.pasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };
  constructor(private tramite260512Query: Tramite260512Query, private guardarAdapter260512: GuardarAdapter_260512,private registroSolicitudService: RegistroSolicitudService, private tramite260512Store:Tramite260512Store, private toastrService: ToastrService,
  ) {
  }
    ngOnInit(): void {
      this.tramite260512Query.select().subscribe(state => {
      this.solicitudState = state;
    });
  }
  /**
   * Maneja la acción del botón en el asistente.
   * Cambia el paso actual según la acción del botón.
   *
   * @param e - Objeto que contiene la acción y el valor del botón.
   */
  getValorIndice(e: AccionBoton): void {
      if (e.accion === 'cont') {
              let isValid = true;

              if (this.indice === 1 && this.datosComponent) {
              isValid = this.datosComponent.validOnButtonClick();
            }
            if (!isValid) {
            this.formErrorAlert = this.MENSAJE_DE_ERROR;
            this.esFormaValido = true;
            this.datosPasos.indice = this.indice;
            setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 0);
            return;
            }
 
            const PAYLOAD = this.guardarAdapter260512.toFormPayload();
            console.log('PAYLOAD', PAYLOAD);
            let shouldNavigate = false;
            this.registroSolicitudService.postGuardarDatos('260512', PAYLOAD).subscribe(response => {
              shouldNavigate = response.codigo === '00';
              if (!shouldNavigate) {
                const ERROR_MESSAGE = response.mensaje || 'Error desconocido en la solicitud';
                //this.formErrorAlert = PaginasComponent.generarAlertaDeError(ERROR_MESSAGE);
                this.esFormaValido = true;
                this.indice = 1;
                this.datosPasos.indice = 1;
                this.wizardComponent.indiceActual = 1;
                setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 0);
                return;
              }
              if(shouldNavigate) {
                if(esValidObject(response) && esValidObject(response.datos)) {
                  this.esFormaValido = false;
                  const DATOS = response.datos as { id_solicitud?: number };
                  const ID_SOLICITUD = getValidDatos(DATOS.id_solicitud) ? (DATOS.id_solicitud ?? 0) : 0;
                  this.tramite260512Store.setIdSolicitud(ID_SOLICITUD);
                }
                // Calcular el nuevo índice basado en la acción
                let indiceActualizado = e.valor;
                if (e.accion === 'cont') {
                  indiceActualizado = e.valor;
                }
                this.toastrService.success(response.mensaje);
                if (indiceActualizado > 0 && indiceActualizado < 5) {
                  this.indice = indiceActualizado;
                  this.datosPasos.indice = indiceActualizado;
                  if (e.accion === 'cont') {
                    this.wizardComponent.siguiente();
                  } else {
                    this.wizardComponent.atras();
                  }
                }
              } else {
                this.toastrService.error(response.mensaje);
              }
            });
          }else{
            this.indice = e.valor;
            this.datosPasos.indice = this.indice;
            this.wizardComponent.atras();
          }
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
   * Maneja el estado de progreso de la carga de documentos.
   * Actualiza la variable `cargaEnProgreso` según el estado recibido.
   * @param carga - Indica si la carga está en progreso (`true`) o no (`false`).
   */
  onCargaEnProgreso(carga: boolean): void {
    this.cargaEnProgreso = carga;
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
   * Emite un evento para cargar archivos.
   * {void} No retorna ningún valor.
   */
  onClickCargaArchivos(): void {
    this.cargarArchivosEvento.emit();
  }
  /**
   * @method blancoObligatoria
   * @description Método para manejar el evento de documentos obligatorios en blanco.
   * Actualiza la bandera `isSaltar` basada en el estado recibido.
   * @param {boolean} enBlanco - Indica si hay documentos obligatorios en blanco.
   * @return {void}
   */
  onBlancoObligatoria(enBlanco: boolean): void {
    this.isSaltar = enBlanco;
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
}
