/* eslint-disable no-empty-function */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable sort-imports */
/* eslint-disable @nx/enforce-module-boundaries */
import { BtnContinuarComponent, PASOS } from '@ng-mf/data-access-user';
import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatosPasos } from '@ng-mf/data-access-user';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListaPasosWizard } from '@ng-mf/data-access-user';
import { Subject, map, takeUntil } from 'rxjs';

import { SeccionLibQuery } from '@ng-mf/data-access-user';
import { SeccionLibState, SeccionLibStore } from '@ng-mf/data-access-user';
import { SECCIONES_TRAMITE_5701 } from '@ng-mf/data-access-user';
import { PasoTresComponent } from '../paso-tres/paso-tres.component';
import { PasoDosComponent } from '../paso-dos/paso-dos.component';
import { PasoUnoComponent } from '../paso-uno/paso-uno.component';
import { WizardComponent } from '@ng-mf/data-access-user';


/**
 * Interfaz para la acción del botón.
 */
interface AccionBoton {
  accion: string;
  valor: number;
}

/**
 * Componente para la página de solicitud.
 */
@Component({
  templateUrl: './solicitud-page.component.html',
  styles: ``,
   standalone: true,
   
    imports: [BtnContinuarComponent,CommonModule,FormsModule,PasoTresComponent,PasoDosComponent,PasoUnoComponent,ReactiveFormsModule,WizardComponent],
})
export class SolicitudPageComponent implements OnInit {
  /**
   * Lista de pasos del wizard.
   */
  pasos: ListaPasosWizard[] = PASOS;

  /**
   * Índice del paso actual.
   */
  indice: number = 1;

  /**
   * Estado de la sección.
   */
  public seccion: SeccionLibState | undefined;

  /**
   * Notificador para destruir observables.
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * Referencia al componente del wizard.
   */
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;

  /**
   * Datos de los pasos del wizard.
   */
  datosPasos: DatosPasos = {
    nroPasos: this.pasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };

  /**
   * Constructor del componente.
   * @param seccionQuery Consulta de la sección.
   * @param seccionStore Almacenamiento de la sección.
   */
  constructor(
    private seccionQuery: SeccionLibQuery,
    private seccionStore: SeccionLibStore,
  ) {}

  /**
   * Inicializa el componente.
   */
  ngOnInit(): void {
    this.seccionQuery.selectSeccionState$.pipe(
      takeUntil(this.destroyNotifier$),
      map(seccionState => {
        this.seccion = seccionState;
      })
    ).subscribe();

  
  }

  /**
   * Selecciona una pestaña del wizard.
   * @param {number} i - Índice de la pestaña.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }

  /**
   * Obtiene el valor del índice del evento.
   * @param {AccionBoton} e - Evento con la acción y el valor.
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
   * Método para asignar las secciones existentes al store.
   */

}
