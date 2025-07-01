/**
 * @component PeruCertificadoComponent
 * @description
 * El componente `PeruCertificadoComponent` es responsable de manejar el flujo de pasos para el trámite zoosanitario de importación del Perú.
 * Utiliza un componente `WizardComponent` para gestionar la navegación entre pasos del trámite.
 * También maneja la actualización del estado de la sección y la validez del formulario observando el estado del trámite.
 * 
 * @example
 * <app-peru-certificado></app-peru-certificado>
 */

import { AccionBoton, ListaPasoWizard } from '../../models/peru-certificado.module';
import { Component, OnDestroy, ViewChild } from '@angular/core';
import { DatosPasos, PAGO_DE_DERECHOS, SeccionLibStore } from '@ng-mf/data-access-user';
import { Subject, takeUntil } from 'rxjs';
import { PASOS } from '../../constantes/peru-certificado.module';
import { Tramite110205Query } from '../../estados/tramite110205.query';
import { WizardComponent } from '@ng-mf/data-access-user';

@Component({
  selector: 'app-peru-certificado',
  templateUrl: './peru-certificado.component.html',
  styleUrl: './peru-certificado.component.scss',
})
export class PeruCertificadoComponent implements OnDestroy {

  /**
   * @property {ListaPasoWizard[]} pasos
   * @description
   * Lista de pasos que componen el flujo del trámite en el wizard.
   */
  pasos: ListaPasoWizard[] = PASOS;

  /**
   * @property {string | null} tituloMensaje
   * @description
   * Título principal mostrado en el encabezado del trámite.
   */
  tituloMensaje: string | null = 'Zoosanitario para importación';

  /**
   * @property {WizardComponent} wizardComponent
   * @description
   * Referencia al componente hijo `WizardComponent`, utilizado para controlar la navegación entre pasos.
   */
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;

  /**
   * @property {number} indice
   * @description
   * Índice actual del paso activo dentro del wizard. Comienza en 1.
   */
  indice: number = 1;

  /**
   * @property {DatosPasos} datosPasos
   * @description
   * Objeto con metainformación sobre el flujo de pasos del wizard.
   */
  datosPasos: DatosPasos = {
    nroPasos: this.pasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };

  /**
   * @property {any} TEXTOS
   * @description
   * Contiene los textos informativos para el pago de derechos.
   */
  public TEXTOS = PAGO_DE_DERECHOS;

  /**
   * @property {Subject<void>} destroyNotifier$
   * @description
   * Notificador para gestionar la destrucción de suscripciones reactivas y evitar fugas de memoria.
   */
  destroyNotifier$: Subject<void> = new Subject();

  /**
   * @constructor
   * @description
   * Constructor del componente. Se encarga de suscribirse a `FormaValida$` del `Tramite110205Query`
   * para actualizar el estado de la sección y la validez del formulario en el store de sección.
   *
   * @param {SeccionLibStore} seccionStore - Store para actualizar el estado de la sección.
   * @param {Tramite110205Query} tramiteQuery - Query para observar el estado de validez del formulario.
   */
  constructor(
    private seccionStore: SeccionLibStore,
    private tramiteQuery: Tramite110205Query,
  ) {
    this.tramiteQuery.FormaValida$.pipe(
      takeUntil(this.destroyNotifier$)
    ).subscribe((res) => {
      this.seccionStore.establecerSeccion([true]);
      this.seccionStore.establecerFormaValida([res]);
    });
  }

  /**
   * @method getValorIndice
   * @description
   * Maneja la navegación entre pasos en el wizard. Cambia el índice actual
   * y llama a los métodos `siguiente` o `atras` del `WizardComponent` dependiendo de la acción.
   *
   * @param {AccionBoton} e - Objeto que contiene la acción y el valor del paso a navegar.
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
   * @method ngOnDestroy
   * @description
   * Método del ciclo de vida que se ejecuta al destruir el componente.
   * Se utiliza para cerrar y completar las suscripciones activas.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
