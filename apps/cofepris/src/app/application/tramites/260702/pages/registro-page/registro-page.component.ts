import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { PASOS } from '@ng-mf/data-access-user';
import { DatosPasos,SeccionLibQuery, SeccionLibState,
  SeccionLibStore, } from '@ng-mf/data-access-user';
import { ListaPasosWizard } from '@ng-mf/data-access-user';
import { WizardComponent } from '@ng-mf/data-access-user';
import { PASOS1 } from '../../constants/retorno.contenedores.enum';
import { map, ReplaySubject, takeUntil } from 'rxjs';

interface AccionBoton {
  accion: string;
  valor: number;
}

@Component({
  templateUrl: './registro-page.component.html',
  styles: ``,

})
export class RegistroPageComponent implements OnDestroy, OnInit {
  pasos: Array<ListaPasosWizard> = PASOS1;
  indice: number = 1;
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  public seccion!: SeccionLibState;
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;

  datosPasos: DatosPasos = {
    nroPasos: this.pasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };

constructor(
  private seccionQuery: SeccionLibQuery,
    private seccionStore: SeccionLibStore
){
  
}
  seleccionaTab(i: number): void {
    this.indice = i;
  }
  ngOnInit() {
    this.seccionQuery.selectSeccionState$
      .pipe(
        takeUntil(this.destroyed$),
        map((seccionState: SeccionLibState) => {
          this.seccion = seccionState;
        })
      )
      .subscribe();
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
  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}
