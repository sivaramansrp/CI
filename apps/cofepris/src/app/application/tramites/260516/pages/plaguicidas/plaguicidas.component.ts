import { Component, OnDestroy, ViewChild } from '@angular/core';
import { ListaPasosWizard, PASOS } from '@libs/shared/data-access-user/src';
import { DatosDomicilioLegalService } from '../../../../shared/services/datos-domicilio-legal.service';
import { DatosPasos } from '@libs/shared/data-access-user/src/core/models/shared/components.model';
import { PagoBancoService } from '../../../../shared/services/pago-banco.service';
import { Subject } from 'rxjs';
import { WizardComponent } from '@libs/shared/data-access-user/src/tramites/components/wizard/wizard.component';
import { takeUntil } from 'rxjs/operators';

/**
 * Represents the action and value associated with a button.
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
constructor(private datosDomicilioLegalService: DatosDomicilioLegalService,private pagoBancoService:PagoBancoService) {

}

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

  /**
   * Maneja la acción del botón en el asistente.
   * Cambia el paso actual según la acción del botón.
   *
   * @param e - Objeto que contiene la acción y el valor del botón.
   */
  getValorIndice(e: AccionBoton): void {
    if (e.valor > 0 && e.valor < 5) {
      this.getDatosDomicilioLegalState();
      this.getSolicitudPagoBancoState();
      this.indice = e.valor;
      if (e.accion === 'cont') {
        this.wizardComponent.siguiente();
      } else {
        this.wizardComponent.atras();
      }
    }
  }

  

  /**
   * Método que obtiene el estado de los datos del domicilio legal desde el servicio
   * `datosDomicilioLegalService` y los asigna a la propiedad `datosDomicilioLegal`.
   * 
   * @returns {void} Este método no retorna ningún valor.
   */
  

  getDatosDomicilioLegalState(): void {
    this.datosDomicilioLegalService.getDatosDomicilioLegalState()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((state) => {
        const PAYLOAD = state;
        return PAYLOAD;
      });
  }

  /**
   * Retrieves the state of the "Solicitud Pago Banco" from the service and processes it.
   * 
   * This method subscribes to the `getSolicitudPagoBancoState` observable from the `pagoBancoService`,
   * filters out any properties in the state object that have empty string, null, or undefined values,
   * and logs the resulting payload to the console.
   * 
   * The subscription is automatically unsubscribed when the `destroyNotifier$` observable emits a value,
   * ensuring proper cleanup of resources.
   * 
   * @returns {void} This method does not return a value.
   */
  getSolicitudPagoBancoState():void{
    this.pagoBancoService.getSolicitudPagoBancoState()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((state) => {
        const PAYLOAD = state;
        return PAYLOAD;
      });
  }
  /**
   * Cleanup logic to unsubscribe from observables when the component is destroyed.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
