import { Component, OnDestroy, ViewChild } from '@angular/core';
import { ListaPasosWizard, PASOS } from '@libs/shared/data-access-user/src';
import { Subject, takeUntil } from 'rxjs';
import { DatosDomicilioLegalService } from '../../../../shared/services/datos-domicilio-legal.service';
import { DatosDomicilioLegalState } from '../../../../shared/estados/stores/datos-domicilio-legal.store';
import { DatosPasos } from '@libs/shared/data-access-user/src/core/models/shared/components.model';
import { PagoBancoService } from '../../../../shared/services/pago-banco.service';
import { SolicitudPagoBancoState } from '../../../../shared/estados/stores/pago-banco.store';
import { TercerosFabricanteService } from '../../../../shared/services/terceros-fabricante.service';
import { TercerosFabricanteState } from '../../../../shared/estados/stores/terceros-fabricante.store';
import { WizardComponent } from '@libs/shared/data-access-user/src/tramites/components/wizard/wizard.component';

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
export class PlaguicidasComponent implements OnDestroy{
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

constructor(private datosDomicilioLegalService: DatosDomicilioLegalService,private pagoBancoService:PagoBancoService,private tercerosFabricanteService:TercerosFabricanteService) {
  
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
    if (e.valor > 0 && e.valor < 5) {
      this.indice = e.valor;
      this.getDatosDomicilioLegalState();
      this.getSolicitudPagoBancoState();
      this.getTercerosFabricanteState();  
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
    
  
    getDatosDomicilioLegalState(): DatosDomicilioLegalState {
      let PAYLOAD={} as DatosDomicilioLegalState;
       this.datosDomicilioLegalService.getDatosDomicilioLegalState()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((state) => {
           PAYLOAD = state;
          
        });
        return PAYLOAD;
    }
  
    /**
 * Recupera el estado de la "Solicitud Pago Banco" desde el servicio y lo procesa.
 * 
 * Este método se suscribe al observable `getSolicitudPagoBancoState` del `pagoBancoService`,
 * filtra las propiedades del objeto de estado que tengan valores de cadena vacía, null o undefined,
 * y registra la carga resultante en la consola.
 * 
 * La suscripción se cancela automáticamente cuando el observable `destroyNotifier$` emite un valor,
 * lo que garantiza una limpieza adecuada de los recursos.
 * 
 * @returns {void} Este método no retorna ningún valor.
 */
    getSolicitudPagoBancoState():SolicitudPagoBancoState{
      let PAYLOAD={} as SolicitudPagoBancoState;
      this.pagoBancoService.getSolicitudPagoBancoState()
        .pipe(takeUntil(this.destroyNotifier$))
        .subscribe((state) => {
           PAYLOAD = state;
        });
        return PAYLOAD;
    }
    /**
 * Recupera el estado de "Terceros Fabricante" desde el servicio y lo procesa.
 * 
 * Este método se suscribe al observable `getTercerosFabricanteState` del `tercerosFabricanteService`,
 * asigna el estado recibido al objeto `PAYLOAD` y retorna dicho objeto.
 * 
 * La suscripción se cancela automáticamente cuando el observable `destroyNotifier$` emite un valor,
 * lo que garantiza una limpieza adecuada de los recursos.
 * 
 * @returns {TercerosFabricanteState} El estado de "Terceros Fabricante".
 */
    getTercerosFabricanteState():TercerosFabricanteState{
      let PAYLOAD={} as TercerosFabricanteState;
      this.tercerosFabricanteService.getTercerosFabricanteState()
        .pipe(takeUntil(this.destroyNotifier$))
        .subscribe((state) => {
           PAYLOAD = state;
        }); 
        return PAYLOAD;
    }

    /**
 * Lógica de limpieza para cancelar la suscripción a los observables cuando el componente es destruido.
 */
    ngOnDestroy(): void {
      this.destroyNotifier$.next();
      this.destroyNotifier$.complete();
    }
}
