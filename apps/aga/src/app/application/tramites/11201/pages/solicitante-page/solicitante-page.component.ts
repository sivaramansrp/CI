import { Component, OnInit, ViewChild } from '@angular/core';
import { DatosPasos, DatosPasosCancelar } from '@ng-mf/data-access-user';
import { SeccionState, SeccionStore } from '../../../../estados/seccion.store';
import { Subject, map, takeUntil } from 'rxjs';
import { ListaPasosWizard } from '@ng-mf/data-access-user';
import { PASOS } from '@ng-mf/data-access-user';
import { SECCIONES_TRAMITE_5701 } from '@ng-mf/data-access-user';
import { SeccionQuery } from '../../../../estados/queries/seccion.query';

import { WizardComponent } from '@ng-mf/data-access-user';
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
  public seccion!: SeccionState;
  private destroyNotifier$: Subject<void> = new Subject();
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;
  datosPasos: DatosPasos = {
    nroPasos: this.pasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };
  btnCancelar: DatosPasosCancelar = {
    fin: 1,
    iniciar: 1,
    txtBtnCan: 'Cancelar',
  };
  constructor(
    private seccionQuery: SeccionQuery,
    private seccionStore: SeccionStore
  // eslint-disable-next-line no-empty-function
  ) {
  }

  ngOnInit(): void {
    this.pasos = PASOS.slice(0, 2);
    this.pasos = this.pasos.map((paso) => {
      if (paso.indice === 2 && paso.titulo === 'Anexar necesarios') {
        return { ...paso, titulo: 'Firmar solicitud' };
      }
      return paso;
    });
    this.seccionQuery.selectSeccionState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.seccion = seccionState;
        })
      )
      .subscribe();

    this.asignarSecciones();
  }

  seleccionaTab(i: number): void {
    this.indice = i;
  }
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
   * Método para asignar las secciones existentes al stored
   */
  private asignarSecciones(): void {
    type SeccionKeys = keyof typeof SECCIONES_TRAMITE_5701.PASO_1;
    const SECCIONES: boolean[] = [];
    const FORMAVALIDA: boolean[] = [];
    for (const LLAVESECCION in SECCIONES_TRAMITE_5701.PASO_1) {
      if (Object.prototype.hasOwnProperty.call(SECCIONES_TRAMITE_5701.PASO_1, LLAVESECCION)) {
        SECCIONES.push(SECCIONES_TRAMITE_5701.PASO_1[LLAVESECCION as SeccionKeys]);
        FORMAVALIDA.push(false);
      }
    }
    this.seccionStore.establecerSeccion(SECCIONES);
    this.seccionStore.establecerFormaValida(FORMAVALIDA);
  }

  getCancelarEvento(e: AccionBoton): void {
    if (e.valor > 0 && e.valor < 6) {
      this.indice = e.valor;
    }
  }
}
