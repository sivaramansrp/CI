/* eslint-disable guard-for-in */
import {
  Chofer40103Store,
  Choferesnacionales40103State,
} from '../../estados/chofer40103.store';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Chofer40103Query } from '../../estados/chofer40103.query';
import { DatosPasos } from '@ng-mf/data-access-user';
import { ListaPasosWizard } from '@ng-mf/data-access-user';
import { PASOS } from '@ng-mf/data-access-user';
import { SECCIONES_TRAMITE_5701 } from '@ng-mf/data-access-user';
import { Subject } from 'rxjs';
import { WizardComponent } from '@ng-mf/data-access-user';
import { map } from 'rxjs';
import { takeUntil } from 'rxjs';

interface AccionBoton {
  accion: string;
  valor: number;
}

@Component({
  selector: 'app-solicitante-page',
  templateUrl: './solicitante-page.component.html',
  styleUrl: './solicitante-page.component.scss',
})
export class SolicitantePageComponent implements OnInit {
  pasos: Array<ListaPasosWizard> = PASOS.slice(0, 2);
  indice: number = 1;
  public seccion!: Choferesnacionales40103State;
  private destroyNotifier$: Subject<void> = new Subject();
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;
  datosPasos: DatosPasos = {
    nroPasos: this.pasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };

  constructor(
    private chofer40103Query: Chofer40103Query,
    private chofer40103Store: Chofer40103Store // eslint-disable-next-line no-empty-function
  ) {}

  /**
   * Método del ciclo de vida de Angular que se llama después de que las propiedades enlazadas a datos se inicializan.
   * Inicializa los pasos del asistente y asigna las secciones.
   */
  ngOnInit(): void {
    this.pasos = PASOS.slice(0, 2);
    this.pasos = this.pasos.map((paso) => {
      if (paso.indice === 2 && paso.titulo === 'Anexar necesarios') {
        return { ...paso, titulo: 'Firmar solicitud' };
      }
      return paso;
    });
    this.chofer40103Query.selectSeccionState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.seccion = seccionState;
        })
      )
      .subscribe();

    this.asignarSecciones();
  }

  /**
   * Selecciona una pestaña específica.
   * @param i El índice de la pestaña a seleccionar.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }

  /**
   * Obtiene el valor del índice y realiza la acción correspondiente.
   * @param e El evento que contiene la acción y el valor del índice.
   */
  getValorIndice(e: AccionBoton): void {
    if (e.valor > 0 && e.valor < 6) {
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
  private asignarSecciones(): void {
    const SESSION: boolean[] = [];
    const FORMAVALIDA: boolean[] = [];
    for (const LLAVESESSION in SECCIONES_TRAMITE_5701.PASO_1) {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      const key = LLAVESESSION as keyof typeof SECCIONES_TRAMITE_5701.PASO_1;
      SESSION.push(SECCIONES_TRAMITE_5701.PASO_1[key]);
      FORMAVALIDA.push(false);
    }
    this.chofer40103Store.establecerSeccion(SESSION);
    this.chofer40103Store.establecerFormaValida(FORMAVALIDA);
  }
}