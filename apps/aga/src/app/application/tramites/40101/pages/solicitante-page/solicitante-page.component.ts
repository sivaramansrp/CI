import { Component, ViewChild } from '@angular/core';
// import { SeccionState, SeccionStore } from '../../../../estados/seccion.store';
import { Subject, map, takeUntil } from 'rxjs';
import { DatosPasos } from '@ng-mf/data-access-user';
import { ListaPasosWizard } from '@ng-mf/data-access-user';
import { PASOS } from '@ng-mf/data-access-user';
import { SECCIONES_TRAMITE_5701 } from '@ng-mf/data-access-user';
// import { SeccionQuery } from '@ng-mf/data-access-user';
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
export class SolicitantePageComponent {
  pasos: Array<ListaPasosWizard> = PASOS.slice(0, 2);
  indice: number = 1;
  //  public seccion!: SeccionState;
  private destroyNotifier$: Subject<void> = new Subject();
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;
  datosPasos: DatosPasos = {
    nroPasos: this.pasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };
  constructor(
    // private seccionQuery: SeccionQuery,
    // private seccionStore: SeccionStore
  ) {}

  ngOnInit() {
    this.pasos = PASOS.slice(0, 2);
    this.pasos = this.pasos.map((paso) => {
      if (paso.indice === 2 && paso.titulo === 'Anexar necesarios') {
        return { ...paso, titulo: 'Firmar solicitud' };
      }
      return paso;
    });
    // console.log('Updated pasos:', this.pasos);
    // this.seccionQuery.selectSeccionState$
    //   .pipe(
    //     takeUntil(this.destroyNotifier$),
    //     map((seccionState) => {
    //       this.seccion = seccionState;
    //     })
    //   )
    //   .subscribe();

    // this.asignarSecciones();
  }

  seleccionaTab(i: number): void {
    this.indice = i;
  }
  getValorIndice(e: AccionBoton) {
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
  private asignarSecciones() {
    const secciones: boolean[] = [];
    const formaValida: boolean[] = [];
    for (const llaveSeccion in SECCIONES_TRAMITE_5701.PASO_1) {
      // @ts-ignore - fix this
      secciones.push(SECCIONES_TRAMITE_5701.PASO_1[llaveSeccion]);
      formaValida.push(false);
    }
    // this.seccionStore.establecerSeccion(secciones);
    // this.seccionStore.establecerFormaValida(formaValida);
  }
}
