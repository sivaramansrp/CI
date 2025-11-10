import {
  AccionBoton,
  DatosPasos,
  ListaPasosWizard,
  Notificacion,
  WizardComponent,
  esValidObject,
  getValidDatos,
} from '@ng-mf/data-access-user';
import { Component, EventEmitter, OnInit, ViewChild } from '@angular/core';
import {
  ERROR_FORMA_ALERT,
  MENSAJE_DE_PAGE,
  PASOS,
  TITULOMENSAJE,
} from '../../constants/medicamentos-destinados-uso.enum';
import {
  Tramite260208State,
  Tramite260208Store,
} from '../../estados/tramite260208Store.store';
import { GuardarAdapter_260208 } from '../../adapters/guardar-payload.adapter';
import { ImportacionDestinadosDonacioService } from '../../services/importacion-destinados-donacio.service';
import { PasoUnoComponent } from '../paso-uno/paso-uno.component';
import { ToastrService } from 'ngx-toastr';
import { Tramite260208Query } from '../../estados/tramite260208Query.query';

@Component({
  selector: 'app-contenedor-de-pasos',
  templateUrl: './contenedor-de-pasos.component.html',
  styleUrl: './contenedor-de-paso.component.scss',
})
export class ContenedorDePasosComponent implements OnInit {
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
   * Título del mensaje que se muestra en el componente.
   * Puede ser nulo si no está definido.
   * @type {string | null}
   */
  tituloMensaje: string | null = TITULOMENSAJE;

    /**
     * Estado del formulario de registro IMMEX.
     */
    storeData!: Tramite260208State;

  /**
   * Lista de pasos para el componente wizard.
   * @type {ListaPasosWizard[]}
   */
  pasos: ListaPasosWizard[] = PASOS;

  /**
   * Índice del paso actual en el wizard.
   * @type {number}
   */
  indice: number = 1;

  /**
   * Referencia al componente Wizard hijo.
   * @type {WizardComponent}
   */
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;

  /**
   * Datos de configuración para los pasos del wizard.
   * @type {DatosPasos}
   */
  datosPasos: DatosPasos = {
    nroPasos: this.pasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };
    /**
   * Indica si la carga de archivos está en progreso.
   */
  cargaEnProgreso: boolean = true;

  @ViewChild('pasoUno') pasoUnoComponent!: PasoUnoComponent;

  esFormaValido!: boolean;

  public formErrorAlert = ERROR_FORMA_ALERT;

  mostrarAlerta: boolean = false;

  /** Nueva notificación relacionada con el RFC. */
  public seleccionarFilaNotificacion!: Notificacion;

    /**
   * Evento que se emite para cargar archivos.
   * Este evento se utiliza para notificar a otros componentes que se debe realizar una acción de
   */
  cargarArchivosEvento = new EventEmitter<void>();
    constructor(
    public tramiteQuery: Tramite260208Query,
    private store: Tramite260208Store,
    private toastrService: ToastrService,
    private importacionDestinadosDonacioService: ImportacionDestinadosDonacioService
    ) {
        // No se necesita lógica de inicialización adicional.
    }
ngOnInit(): void {
    this.tramiteQuery.selectImmexRegistro$.pipe().subscribe((data) => {
      this.storeData = data;
    }); 
}
  /**
   * Selecciona una pestaña específica del wizard.
   * @method
   * @param {number} i - Índice de la pestaña a seleccionar
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }

   /**
     * @method getValorIndice
     * @description Actualiza el índice y el título del mensaje según la acción del botón.
     * Navega hacia adelante o hacia atrás en el wizard.
     * @param {AccionBoton} e - Objeto que contiene el valor del índice y la acción ('cont' o 'atras').
     */
    getValorIndice(e: AccionBoton): void {
      if (e.accion === 'cont') {
        const IS_VALID = true;
        if (this.indice === 1) {
          const ISVALID = this.validarTodosFormulariosPasoUno();
        if (!this.pasoUnoComponent.tercerosRelacionados.validarFormulario()) {
          this.mostrarAlerta = true;
          this.seleccionarFilaNotificacion = {
            tipoNotificacion: 'alert',
            categoria: 'danger',
            modo: 'action',
            titulo: '',
            mensaje: MENSAJE_DE_PAGE,
            cerrar: true,
            tiempoDeEspera: 2000,
            txtBtnAceptar: 'SI',
            txtBtnCancelar: 'NO',
          };
          setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 0);
        }
          if (!ISVALID) {
            this.esFormaValido = true;
          }
          if (this.esFormaValido) {
            this.datosPasos.indice = 1;
            setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 0);
          }
        }
        if (!IS_VALID) {
          this.esFormaValido = true;
          this.datosPasos.indice = this.indice;
          return;
        }
  
        const PAYLOAD = GuardarAdapter_260208.toFormPayload(this.storeData);
        let shouldNavigate = false;
      this.importacionDestinadosDonacioService
        .postGuardarDatos('260208', PAYLOAD)
        .subscribe((response) => {
          shouldNavigate = response.codigo === '00';
          if (!shouldNavigate) {
            const ERROR_MESSAGE =
              response.error || 'Error desconocido en la solicitud';
            this.formErrorAlert =
              ContenedorDePasosComponent.generarAlertaDeError(ERROR_MESSAGE);
            this.esFormaValido = false;
            this.indice = 1;
            this.datosPasos.indice = 1;
            this.wizardComponent.indiceActual = 1;
            setTimeout(
              () => window.scrollTo({ top: 0, behavior: 'smooth' }),
              0
            );
            return;
          }
          if (shouldNavigate) {
            if (esValidObject(response) && esValidObject(response.datos)) {
              const DATOS = response.datos as { id_solicitud?: number };
              if (getValidDatos(DATOS.id_solicitud)) {
                this.store.setIdSolicitud(DATOS.id_solicitud ?? 0);
              } else {
                this.store.setIdSolicitud(0);
              }
            }
            // Calcular el nuevo índice basado en la acción
            let indiceActualizado = e.valor;
            if (e.accion === 'cont') {
              indiceActualizado = e.valor + 1;
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
     * Genera una alerta de error en formato HTML para mostrar mensajes de validación.
     * @param {string} mensajes - Mensaje(s) de error a mostrar.
     * @returns {string} - Cadena HTML con el formato de alerta.
     */
    public static generarAlertaDeError(mensajes: string): string {
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
   * Método estático que obtiene el nombre del título según el valor del paso.
   * @param {number} valor - Valor numérico del paso actual
   * @returns {string} - Título correspondiente al paso
   */
  static obtenerNombreDelTítulo(valor: number): string {
    switch (valor) {
      case 1:
        return TITULOMENSAJE;
      case 2:
        return 'Cargar archivos';
      case 3:
        return 'Firmar';
      default:
        return TITULOMENSAJE;
    }
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
   * Método para navegar a la sección anterior del wizard.
   * Actualiza el índice y el estado de los pasos.
   * {void} No retorna ningún valor.
   */
  anterior(): void {
    this.wizardComponent.atras();
    this.indice = this.wizardComponent.indiceActual + 1;
    this.datosPasos.indice = this.wizardComponent.indiceActual + 1;
  }

  private validarTodosFormulariosPasoUno(): boolean {
    if (!this.pasoUnoComponent) {
      return true;
    }
    const ISFORM_VALID_TOUCHED = this.pasoUnoComponent.validarFormularios();
    if (!ISFORM_VALID_TOUCHED) {
      return false;
    }
    return true;
  }
}
