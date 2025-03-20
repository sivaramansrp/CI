import { Component, OnInit, ViewChild } from '@angular/core';
import { DatosPasos, ListaPasosWizard, SECCIONES_TRAMITE_570101, SeccionLibQuery, SeccionLibState, SeccionLibStore, WizardComponent } from '@ng-mf/data-access-user';
import { Subject, map, takeUntil } from 'rxjs';
import { DESISTIMIENTO_PASOS } from '../../enum/desistimiento.enum';
import { PasoUnoComponent } from '../paso-uno/paso-uno.component';
interface AccionBoton {
  accion: string;
  valor: number;
}

@Component({
  templateUrl: './desistimiento-page.component.html',
  styles: ``,
})

export class DesistimientoPageComponent implements OnInit {
  pasos: ListaPasosWizard[] = DESISTIMIENTO_PASOS;
  indice: number = 1;
  datosPasos: DatosPasos = {
    nroPasos: this.pasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };
  accionBoton!: AccionBoton;
  public seccion!: SeccionLibState;
  private destroyNotifier$: Subject<void> = new Subject();
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;
  @ViewChild(PasoUnoComponent) pasoUnoComponent!: PasoUnoComponent

  constructor(
    private seccionQuery: SeccionLibQuery,
    private seccionStore: SeccionLibStore
  ) {
    // El constructor está intencionalmente vacío para la inyección de dependencias 
   }

  /**
  * Método que se ejecuta al inicializar el componente.
  * Este método se utiliza para suscribirse al estado de las secciones y asignarlas al componente.
  */
  ngOnInit():void {
    // Suscribe a los cambios en el estado de las secciones desde el store.
    this.seccionQuery.selectSeccionState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.seccion = seccionState;
        })
      )
      .subscribe();
    // Llama al método para asignar las secciones iniciales al componente o al estado.
    this.asignarSecciones();
  }

  /**
  * Método para asignar las secciones existentes al stored
  */
  private asignarSecciones(): void {
    const SECCIONES: boolean[] = Object.values(SECCIONES_TRAMITE_570101.PASO_1);
    const FORM_VALIDA: boolean[] = [];
    for (const LLAVE_SECCIONE in SECCIONES_TRAMITE_570101.PASO_1) {
      if(LLAVE_SECCIONE) {
        FORM_VALIDA.push(false);
      }
    }
    this.seccionStore.establecerSeccion(SECCIONES);
    this.seccionStore.establecerFormaValida(FORM_VALIDA);
  }

  // Cambia la pestaña activa al índice proporcionado
  seleccionaTab(i: number): void {
    this.indice = i;
  }

  // Actualiza el índice en base al valor y ejecuta acciones de navegación
  getValorIndice(e: AccionBoton):void {
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
