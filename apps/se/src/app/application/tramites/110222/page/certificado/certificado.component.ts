/**
 * @component ProsecComponent
 * @description Este componente es responsable de manejar el flujo de pasos para el trámite PROSEC.
 * Incluye la lógica para la navegación entre pasos y la obtención de títulos.
 * 
 * @import { Component, ViewChild } from '@angular/core';
 * @import { WizardComponent } from '../../../../shared/components/wizard/wizard.component';
 * @import { DatosPasos } from '../../../../core/models/shared/components.model';
 * @import { PASOS } from '../../../../shared/constantes/prosec/prosec.module';
 */

import { AccionBoton, ListaPasoWizard } from '../../models/peru-certificado.module';
import { Component, ViewChild } from '@angular/core';
import { DatosPasos, PAGO_DE_DERECHOS, SeccionLibStore } from '@ng-mf/data-access-user';
import { Subject, takeUntil } from 'rxjs';
import { PASOS } from '../../constantes/peru-certificado.module';
import { Tramite110222Query } from '../../estados/tramite110222.query';
import { WizardComponent } from '@ng-mf/data-access-user';

@Component({
  selector: 'app-certificado',
  templateUrl: './certificado.component.html',
  styleUrl: './certificado.component.scss',
})
export class CertificadoComponent {

  /**
   * @property {Array<LISTAPASOWIZARD>} pasos - Array de pasos del wizard.
   */
  pasos: ListaPasoWizard[] = PASOS;
  /**
   * @description Propiedad pública que almacena los textos relacionados con el pago de derechos.
   * @command PAGO_DE_DERECHOS
   */
  public TEXTOS = PAGO_DE_DERECHOS;

  /**
   * @property {string | null} tituloMensaje - El título del mensaje.
   */
  tituloMensaje: string | null = 'Zoosanitario para importación';

  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;

  /**
   * @property {number} indice - El índice del paso actual.
   */
  indice: number = 1;

  /**
   * @property {DatosPasos} datosPasos - Datos de los pasos del wizard.
   */
  datosPasos: DatosPasos = {
    nroPasos: this.pasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };
  /**
   * Notificador para destruir los observables y evitar posibles fugas de memoria.
   * @private
   * @type {Subject<void>}
   */
  destroyNotifier$: Subject<void> = new Subject();

  constructor(private seccionStore: SeccionLibStore, private tramiteQuery: Tramite110222Query,
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
   * @description Maneja la acción del botón y determina la navegación (siguiente o anterior).
   * @param {ACCIONBOTON} e - Objeto de acción que contiene la acción y el valor a manejar.
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
}