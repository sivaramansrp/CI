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
export class PlaguicidasComponent implements OnDestroy {
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
    private tercerosFabricanteService: TercerosFabricanteService
  ) {}

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
   * Maneja la acción del botón "Continuar" en el asistente.
   * Cambia el paso actual al siguiente paso.
   */
  getDatosDomicilioLegalState(): DatosDomicilioLegalState {
    let PAYLOAD = {} as DatosDomicilioLegalState;
    this.datosDomicilioLegalService
      .getDatosDomicilioLegalState()
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
  getSolicitudPagoBancoState(): SolicitudPagoBancoState {
    let PAYLOAD = {} as SolicitudPagoBancoState;
    this.pagoBancoService
      .getSolicitudPagoBancoState()
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
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
