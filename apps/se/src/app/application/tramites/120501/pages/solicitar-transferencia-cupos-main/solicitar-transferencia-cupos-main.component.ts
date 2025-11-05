/**
 * SolicitarTransferenciaCuposMainComponent
 *  Componente principal para solicitar la transferencia de cupos.
 */

import { Component, ViewChild } from '@angular/core';
import { DatosPasos } from '@ng-mf/data-access-user';
import { ListaPasosWizard } from '@ng-mf/data-access-user';
import { PASOS } from '@ng-mf/data-access-user';
import { WizardComponent } from '@ng-mf/data-access-user';
import { Solicitud120501State } from '../../estados/tramites/tramite120501.store';
import { Subject, takeUntil } from 'rxjs';
import { Tramite120501Query } from '../../estados/queries/tramite120501.query';
/**
 *  AccionBoton
 *  Interfaz que describe la estructura de un objeto de acción de botón.
 */
interface AccionBoton {
  accion: string;
  valor: number;
}

/**
 * 
 *  app-solicitar-transferencia-cupos-main
 * ./solicitar-transferencia-cupos-main.component.html
 *  Componente para manejar la solicitud de transferencia de cupos.
 */
@Component({
  selector: 'app-solicitar-transferencia-cupos-main',
  templateUrl: './solicitar-transferencia-cupos-main.component.html',
})
export class SolicitarTransferenciaCuposMainComponent {
  /**
    * Notificador para destruir los observables y evitar posibles fugas de memoria.
    * @private
    * @type {Subject<void>}
    */
  destroyNotifier$: Subject<void> = new Subject();
  /**
   * {ListaPasosWizard[]} pasosSolicitar
   *  Arreglo que contiene los pasos del wizard.
   */
  pasosSolicitar: ListaPasosWizard[] = PASOS;
  LOGIN: string = "";
  /**
   * {number} indice
   *  Índice actual del wizard.
   */
  indice: number = 1;

  /**
     * Identificador numérico de la solicitud actual.
     * Se inicializa en 0 y se actualiza cuando se captura una nueva solicitud.
     */
  solicitudState!: Solicitud120501State;

  /**
   * {string} texto
   *  Texto informativo sobre la solicitud.
   */
  texto: string = 'La solicitud ha quedado registrada con el número temporal 202758644. Este no tiene validez legal y sirve solamente para efectos de identificar tu solicitud. Un folio oficial le será asignado a la solicitud al momento en que ésta sea firmada.';

  /**
   * {WizardComponent} wizardComponent
   *  Referencia al componente 'WizardComponent'.
   */
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;

  /**
   * {DatosPasos} datosPasos
   *  Objeto que contiene los datos de los pasos del wizard.
   */
  datosPasos: DatosPasos = {
    nroPasos: this.pasosSolicitar.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };

  /**
   * Constructor para la clase SolicitarTransferenciaCuposMainComponent.
   * @param tramiteQuery 
   * 
   */
  constructor(private tramiteQuery: Tramite120501Query) {
    this.tramiteQuery.selectSolicitud$
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((solicitud) => {
        this.solicitudState = solicitud;
      });
  }

  /**
   * Hook de ciclo de vida de Angular que se ejecuta al inicializar el componente.
   * Se suscribe a los cambios en la solicitud del trámite y actualiza el estado local.
   */
  ngOnInit(): void {
    this.tramiteQuery.selectSolicitud$
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((solicitud) => {
        this.solicitudState = solicitud;
      });
  }

  /**
   *  getValorIndice
   *  Método que actualiza el índice del wizard basado en la acción del botón.
   *  {AccionBoton} e - Objeto que contiene la acción y el valor del botón.
   */
  getValorIndice(e: AccionBoton): void {
    if (e.valor > 0 && e.valor < 5) {
      this.indice = e.valor;
      if (e.accion === 'cont') {
        this.wizardComponent.siguiente();
      } else {
        this.wizardComponent.atras();
      }
    }
  }

  /**
  * Hook de ciclo de vida de Angular que se ejecuta al destruir el componente.
  *
  * Su objetivo es limpiar los recursos utilizados durante la vida del componente,
  * principalmente las suscripciones a observables.
  * Para lograrlo, emite un valor (`next()`) y completa (`complete()`)
  * el `Subject` `destroyNotifier$`, el cual se usa junto con `takeUntil`
  * en las suscripciones RxJS.
  */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}