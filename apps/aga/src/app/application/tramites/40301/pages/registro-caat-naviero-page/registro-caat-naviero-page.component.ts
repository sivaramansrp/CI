import { CAAT_NAVIERO_PASOS } from '../../enum/caat-naviero.enum';
import { PasoUnoComponent } from '../paso-uno/paso-uno.component';
import { SECCIONES_TRAMITE_40301 } from '../../enum/caat-naviero.enum';

import { Component, OnInit, ViewChild } from '@angular/core';
import { DatosPasos, 
  ListaPasosWizard, 
  SeccionLibQuery, 
  SeccionLibState, 
  SeccionLibStore, 
  WizardComponent } from '@ng-mf/data-access-user';
  import { Subject, map, takeUntil } from 'rxjs';

interface AccionBoton {
  accion: string;
  valor: number;
}

@Component({
  templateUrl: './registro-caat-naviero-page.component.html',
  styles: ``,
})

export class RegistroCaatNavieroPageComponent implements OnInit {
  pasos: ListaPasosWizard[] = CAAT_NAVIERO_PASOS;
  indice: number = 1;
  mostrarBotonParaModal:boolean = false;
  modal: string = 'modal';
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

  /**
   * @property {Modal} cancelarModalInstance
   *  Instancia del modal de Bootstrap.
   */

  constructor(
    private seccionQuery: SeccionLibQuery,
    private seccionStore: SeccionLibStore
  ) {
    // El constructor está intencionalmente vacío para la inyección de dependencias 
   }

  ngOnInit():void {
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
   /**
     * Método para asignar las secciones existentes al stored
     */
   private asignarSecciones(): void {
    const SECCIONES: boolean[] = Object.values(SECCIONES_TRAMITE_40301.PASO_1);
    const FORM_VALIDA: boolean[] = [];
    
    for (const LLAVE_SECCIONE in SECCIONES_TRAMITE_40301.PASO_1) {
      if(LLAVE_SECCIONE) {
        FORM_VALIDA.push(false);
      }
    }
    console.log('SECCIONES:', SECCIONES);
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

  // Cambia la visibilidad del botón del modal dependiendo del paso actual
  pestanaCambiado(event: number):void{
    console.log('Evento:', event);
    this.mostrarBotonParaModal = event === 2 ? true : false;
  }
}
