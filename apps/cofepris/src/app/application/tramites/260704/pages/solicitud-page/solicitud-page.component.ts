import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { DatosPasos, ERROR_FORMA_ALERT, ListaPasosWizard, PASOS, WizardComponent } from '@ng-mf/data-access-user';
import { Solicitud260702State, Solicitud260702Store } from '../../../../shared/estados/stores/shared2607/tramites260702.store';
import { WizardService, esValidObject, getValidDatos  } from '@libs/shared/data-access-user/src';
import { map, Observable, switchMap, take } from 'rxjs';
import { AVISO } from '@ng-mf/data-access-user';
import { PasoUnoComponent } from '../paso-uno/paso-uno.component';
import { RegistrarSolicitudMcpService } from '../../../../shared/services/shared2607/registrar-solicitud-mcp.service';
import { Shared2607Service } from '../../../../shared/services/shared2607/shared2607.service';
import { Solicitud260702Query } from '../../../../shared/estados/queries/shared2607/tramites260702.query';
import { ToastrService } from 'ngx-toastr';
/**
 * Interfaz que define la estructura de una acción de botón
 */
interface AccionBoton {
  /**
   * La acción que se realizará.
   */
  accion: string;

  /**
   * El valor asociado a la acción.
   */
  valor: number;
}
/**
 * Componente que representa la página de solicitud.
 */
@Component({
  templateUrl: './solicitud-page.component.html',
  styles: ``,
  
})
/**
 * Componente que representa la página de solicitud.
 */
export class SolicitudPageComponent implements OnInit {
  // TEXTO_DE_ALERTA: string = TERCEROS_TEXTO_DE_ALERTA;
  /** Indica si el botón continuar ha sido activado para ejecutar las validaciones del formulario. */
  public isContinuarTriggered: boolean = false;
  /**
   * Lista de pasos del asistente.
   */
  pasos: ListaPasosWizard[] = PASOS;

    public formErrorAlert = ERROR_FORMA_ALERT;
  /**
     * Indica si la opción de peligro está activada.
     * Cuando es verdadero, representa que la condición de peligro está presente.
     */
    isPeligro:boolean=false;

  /**
   * Estado actual de la solicitud para el trámite 260702.
   * Contiene toda la información relevante sobre el proceso de la solicitud,
   * incluyendo datos ingresados por el usuario y el progreso en el flujo del trámite.
   */
  solicitudState!: Solicitud260702State;
  /**
   * Índice del paso actual.
   */
  indice: number = 1;
  public infoAlert = 'alert-info';
  TEXTOS = AVISO;
  /**
   * Referencia al componente del asistente.
   */
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;

  /**
   * Datos de los pasos del asistente.
   */
  datosPasos: DatosPasos = {
    nroPasos: this.pasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };
    /**
       * Referencia al componente `PasoUnoComponent`.
       */
      @ViewChild('pasoUnoRef') pasoUnoComponent!: PasoUnoComponent;
      

  /**
   * Selecciona una pestaña del asistente.
   * @param i Índice de la pestaña a seleccionar.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }
  
    /**
     * @property wizardService
     * @description
     * Inyección del servicio `WizardService` para gestionar la lógica y el estado del componente wizard.
     * @type {WizardService}
     */
      wizardService = inject(WizardService);

  constructor( public solicitud260703Store:Solicitud260702Store,
      private solicitud260703Query:Solicitud260702Query,
      private shared2607Service:Shared2607Service,
      private toastrService: ToastrService,
      private service: RegistrarSolicitudMcpService,){
 //constructor code
  }

    /**
   * Método del ciclo de vida de Angular que se ejecuta al inicializar el componente.
   * Suscribe al observable `selectSolicitud$` para obtener el estado actual de la solicitud
   * y actualiza las propiedades locales `solicitudState` y `isContinuarTriggered` según los datos recibidos.
   */
  ngOnInit():void{
     this.solicitud260703Query.selectSolicitud$.pipe().subscribe((data) => {
      this.solicitudState = data;
      this.isContinuarTriggered = this.solicitudState['continuarTriggered'] ?? false;
    });
  }
  /**
   * Obtiene el valor del índice de la acción del botón.
   * @param e Acción del botón.
   */
  getValorIndice(e: AccionBoton): void {
       const NEXT_INDEX =
        e.accion === 'cont' ? e.valor + 1 :
        e.accion === 'ant' ? e.valor - 1 :
        e.valor;

    if (this.indice === 1 && e.accion === 'cont') {
      this.solicitud260703Store.setContinuarTriggered(true);
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
   * Valida los formularios del paso actual antes de permitir continuar.
   * @returns {boolean} - `true` si los formularios son válidos, `false` en caso contrario.
   */
  validarFormulariosPasoActual(): boolean { 
    if (this.indice === 1) {
      return this.pasoUnoComponent?.validarFormularios() ?? false;
    }
    return true;
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
        return this.shared2607Service.getAllState().pipe(
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
            const PAYLOAD = this.shared2607Service.buildPayload(data, 260704);
            return new Promise((resolve, reject) => {
              this.service.guardarDatosPost(PAYLOAD).subscribe({
                next: (response) => {
                  if (esValidObject(response) && esValidObject(response['datos'])) {
                    const DATOS = response['datos'] as { id_solicitud?: number };
                    if (getValidDatos(DATOS.id_solicitud)) {
                      this.solicitud260703Store.setIdSolicitud(DATOS.id_solicitud ?? 0);
                    } else {
                      this.solicitud260703Store.setIdSolicitud(0);
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
      
  
}