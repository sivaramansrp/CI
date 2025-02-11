import { Component, ViewChild } from '@angular/core';
import { SeccionState, SeccionStore } from '../../../../estados/seccion.store';
import { Subject, map, takeUntil } from 'rxjs';
import { DatosPasos } from '../../../../core/models/shared/components.model';
import { ListaPasosWizard } from '../../../../core/models/5701/servicios-extraordinarios.model';
import { PASOS } from '../../../../shared/constantes/servicios-extraordinarios.enum';
import { SECCIONES_TRAMITE_5701 } from '../../../../shared/constantes/seccionesTramites';
import { SeccionQuery } from '../../../../core/queries/seccion.query';
import { WizardComponent } from '../../../../shared/components/wizard/wizard.component';

interface AccionBoton {
  accion: string;
  valor: number;
}

@Component({
  templateUrl: './solicitud-page.component.html',
  styles: ``,
})
export class SolicitudPageComponent {
  pasos: ListaPasosWizard[] = PASOS;
  indice: number = 1;
  public seccion: SeccionState;
  private destroyNotifier$: Subject<void> = new Subject();

  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;

  datosPasos: DatosPasos = {
    nroPasos: this.pasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };

  constructor(
    private seccionQuery: SeccionQuery,
    private seccionStore: SeccionStore
  ) {}

  ngOnInit() {
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

  getValorIndice(e: AccionBoton) {
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
   * Método para asignar las secciones existentes al stored
   */
  private asignarSecciones() {
    const secciones: boolean[] = [];
    const formaValida: boolean[] = [];
    for (const llaveSeccion in SECCIONES_TRAMITE_5701.PASO_1) {
      secciones.push(SECCIONES_TRAMITE_5701.PASO_1[llaveSeccion]);
      formaValida.push(false);
    }
    this.seccionStore.establecerSeccion(secciones);
    this.seccionStore.establecerFormaValida(formaValida);
  }
}
