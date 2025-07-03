import { BtnContinuarComponent, DatosPasos } from '@ng-mf/data-access-user';
import { Component, ViewChild } from '@angular/core';
import { OnDestroy, OnInit } from '@angular/core';
import { ListaPasosWizard } from '@ng-mf/data-access-user';

import { Subject, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { map } from 'rxjs';

import { PASOS } from '../../enum/solicitante.enum';
import { PasoTresComponent } from '../paso-tres/paso-tres.component';
import { PasoUnoComponent } from '../paso-uno/paso-uno.component';
import { Tramite40401Query } from '../../../../core/queries/tramite40401.query';
import { Tramite40401Store } from '../../../../core/estados/tramites/tramite40401.store';
import { WizardComponent } from '@ng-mf/data-access-user';
interface AccionBoton {
  accion: string;
  valor: number;
}
@Component({
  selector: 'app-solicitud-page',
  templateUrl: './solicitud-page.component.html',
  styleUrl: './solicitud-page.component.scss',
  standalone: true,
  imports: [
    WizardComponent,
    PasoUnoComponent,
    PasoTresComponent,
    BtnContinuarComponent,
    CommonModule,
  ],
})
export class SolicitudPageComponent implements OnInit, OnDestroy {
  /**
   * Lista de pasos del wizard.
   *
   * Esta propiedad contiene un array de objetos `ListaPasosWizard` que representan los pasos del wizard.
   */
  pasos: Array<ListaPasosWizard> = PASOS;
  /**
   * Número del paso actual.
   */
  nombre: boolean = false;

  /**
   * Índice del paso actual en el wizard.
   *
   * Esta propiedad indica el índice del paso actual en el wizard, comenzando desde 1.
   */
  indice: number = 1;

  /**
   * Notificador para gestionar la destrucción de suscripciones y evitar fugas de memoria.
   */
  destroyNotifier$: Subject<void> = new Subject();

  /**
   * Indica si la opción de transportación está habilitada o no.
   * Este campo es un indicador booleano que se utiliza para determinar
   * si se requiere o se incluye transportación en el flujo actual.
   */
  transportacion: boolean = false;

  /**
   * Referencia al componente del wizard.
   *
   * Esta propiedad utiliza `@ViewChild` para obtener una referencia al componente `WizardComponent`.
   */
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;

  /**
   * Datos de los pasos del wizard.
   *
   * Esta propiedad contiene un objeto `DatosPasos` que almacena información sobre el número de pasos,
   * el índice actual, y los textos de los botones "Anterior" y "Continuar".
   */
  datosPasos: DatosPasos = {
    nroPasos: this.pasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };

  constructor(
    public store: Tramite40401Store,
    public tramiteQuery: Tramite40401Query
  ) {
    // Inicializa el paso activo en el store
  }

  /**
   * Método del ciclo de vida `OnInit`.
   *
   * Inicializa el formulario y carga los datos necesarios para el componente.
   */
  ngOnInit(): void {
    this.tramiteQuery.selectSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.transportacion =
            seccionState.pestanaActiva === 2 &&
            (!seccionState.pais ||
              !seccionState.codigo ||
              !seccionState.transportacion);
          // Asigna el estado de la solicitud al estado actual
        })
      )
      .subscribe();
  }

  /**
   * Método para seleccionar una pestaña específica en el wizard.
   *
   * @param {number} i - El índice de la pestaña a seleccionar.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }
  /**
   * Método para obtener el valor del índice y actualizar el wizard.
   *
   * @param {AccionBoton} e - El objeto que contiene la acción y el valor del índice.
   */
  getValorIndice(e: AccionBoton): void { console.log('getValorIndice : 125 : ', this.transportacion, ' :: ', e);
    if (e.valor > 0 && e.valor < 5) {
      if (this.transportacion && e.valor === 2) {
        this.nombre = true;
        this.datosPasos.indice = 1;
      } else {
        this.nombre = false;
        this.indice = e.valor;
        if (e.accion === 'cont') {
          this.wizardComponent.siguiente();
        } else {
          this.wizardComponent.atras();
        }
      }
      this.store.setPasoActivo(this.indice);
    }
  }

  /**
   * Método para continuar al siguiente paso en el wizard.
   */
  continuar(): void {
    this.getValorIndice({ accion: 'cont', valor: this.indice + 1 });
  }

  /**
   * Método del ciclo de vida `OnDestroy`.
   *
   * Libera los recursos y completa el `Subject` para evitar fugas de memoria.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
