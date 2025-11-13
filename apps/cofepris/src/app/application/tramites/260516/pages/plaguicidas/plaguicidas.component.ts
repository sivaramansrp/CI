import { Component, OnDestroy, ViewChild } from '@angular/core';
import { ERROR_FORMA_ALERT,ListaPasosWizard,PASOS,RegistroSolicitudService, esValidObject, getValidDatos, } from '@libs/shared/data-access-user/src';
import { DatosDomicilioLegalService } from '../../../../shared/services/datos-domicilio-legal.service';
import { DatosDomicilioLegalState } from '../../../../shared/estados/stores/datos-domicilio-legal.store';
import { DatosPasos } from '@libs/shared/data-access-user/src/core/models/shared/components.model';
import { GuardarAdapter_260515 } from '../../../260515/adapters/guardar-payload.adapter';
import { PagoBancoService } from '../../../../shared/services/pago-banco.service';
import { PasoUnoComponent } from '../paso-uno/paso-uno.component';
import { SolicitudPagoBancoState } from '../../../../shared/estados/stores/pago-banco.store';
import { Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Tramite260515Query } from '../../../260515/estados/queries/tramite260515Query.query';
import { Tramite260515Store } from '../../../260515/estados/stores/tramite260515Store.store';
import { WizardComponent } from '@libs/shared/data-access-user/src/tramites/components/wizard/wizard.component';
import { takeUntil } from 'rxjs/operators';

/**
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
export class PlaguicidasComponent implements OnDestroy {
    @ViewChild(PasoUnoComponent) solicitante!: PasoUnoComponent;

esFormaValido: boolean = false;
public formErrorAlert = ERROR_FORMA_ALERT;
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
   * Título del asistente.
   */
  datosPasos: DatosPasos = {
    nroPasos: this.pasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };

  /**
   * Notificador para destruir observables al destruir el componente.
   */
  private destroyNotifier$: Subject<void> = new Subject();
  constructor(private datosDomicilioLegalService: DatosDomicilioLegalService,private pagoBancoService:PagoBancoService,
    private Tramite260515Query:Tramite260515Query,
  private GuardarAdapter260515: GuardarAdapter_260515,private registroSolicitudService: RegistroSolicitudService, private tramite260515Store:Tramite260515Store, private toastrService: ToastrService,
  ) {

}

  /**
   * Maneja la acción del botón en el asistente.
   * Cambia el paso actual según la acción del botón.
   *
   * @param e - Objeto que contiene la acción y el valor del botón.
   */

 getValorIndice(e: AccionBoton): void {
      if (e.accion === 'cont') {
              // let isValid = true;

    //           if (this.indice === 1 && this.pasoUnoComponent) {
    //           isValid = this.pasoUnoComponent.validarPasoUno();
    //         }

    //         if(!this.pasoUnoComponent.contenedorDeDatosSolicitudComponent?.validarContenedor() && this.requiresPaymentData) {
    //             this.confirmarSinPagoDeDerechos = 2;
    //           }else {
    //             this.confirmarSinPagoDeDerechos = 3;
    //           }

    //         if(!this.requiresPaymentData) {
    //           if(!this.pasoUnoComponent.pagoDeDerechosContenedoraComponent.validarContenedor()){
    //             this.mostrarAlerta=true;
    //             this.seleccionarFilaNotificacion = {
    //               tipoNotificacion: 'alert',
    //               categoria: 'danger',
    //               modo: 'action',
    //               titulo: '',
    //               mensaje: MENSAJE_DE_VALIDACION,
    //               cerrar: true,
    //               tiempoDeEspera: 2000,
    //               txtBtnAceptar: 'SI',
    //               txtBtnCancelar: 'NO',
    //               alineacionBtonoCerrar:'flex-row-reverse'
    //             }
    //             setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 0);
    //  } else if(this.pasoUnoComponent.pagoDeDerechosContenedoraComponent.validarContenedor() && !this.pasoUnoComponent.contenedorDeDatosSolicitudComponent?.validarContenedor()) {
    //             this.confirmarSinPagoDeDerechos = 2;
    //           } else if(this.pasoUnoComponent.pagoDeDerechosContenedoraComponent.validarContenedor() && this.pasoUnoComponent.contenedorDeDatosSolicitudComponent?.validarContenedor() && !this.pasoUnoComponent.tercerosRelacionadosVistaComponent.validarContenedor()) {
    //             this.confirmarSinPagoDeDerechos = 3;
    //           }
    //       }
    //         if (!isValid) {
    //           this.formErrorAlert = this.MENSAJE_DE_ERROR;
    //           this.esFormaValido = true;
    //           this.datosPasos.indice = this.indice;
    //           setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 0);
    //           return;
    //         }
            const PAYLOAD = this.GuardarAdapter260515.toFormPayload();
            let shouldNavigate = false;
            this.registroSolicitudService.postGuardarDatos('260215', PAYLOAD).subscribe(response => {
              shouldNavigate = response.codigo === '00';
              if (!shouldNavigate) {
                const ERROR_MESSAGE = response.mensaje || 'Error desconocido en la solicitud';
                // this.formErrorAlert = ContenedorDePasosComponent.generarAlertaDeError(ERROR_MESSAGE);
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
                  this.tramite260515Store.setIdSolicitud(ID_SOLICITUD);
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
   * Lógica de limpieza para desuscribirse de los observables cuando el componente es destruido.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
