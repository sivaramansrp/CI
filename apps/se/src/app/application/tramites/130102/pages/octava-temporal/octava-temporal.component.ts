/* eslint-disable @nx/enforce-module-boundaries */
/**
 * @fileoverview Este archivo contiene la clase OctavaTemporalComponent, que es responsable de manejar la lógica del componente Octava Temporal.
 * 
 * @module OctavaTemporalComponent
 */

import { Component, OnDestroy, OnInit, ViewChild, inject } from '@angular/core';
import { ConsultaioQuery, ConsultaioState} from '@ng-mf/data-access-user';
import { DatosPasos, WizardComponent } from '@libs/shared/data-access-user/src';
import { ListaPasosWizard, WizardService } from '@libs/shared/data-access-user/src';
import { Subject, map, takeUntil } from 'rxjs';
import {ERROR_DE_REGISTRO_ALERT} from '../../constantes/octava-temporal.enum';
import { FormularioRegistroService } from '../../services/octava-temporal.service';
import { OCTA_TEMPO } from 'libs/shared/data-access-user/src/core/services/130102/octava-temporal.enum';

/**
 * @class OctavaTemporalComponent
 * @classdesc Esta clase representa el componente Octava Temporal.
 */

interface AccionBoton {
  accion: string;
  valor: number;
}

@Component({
  selector: 'app-octava-temporal',
  templateUrl: './octava-temporal.component.html',
})
export class OctavaTemporalComponent implements OnInit, OnDestroy{
  /**
   * Referencia al componente del asistente (wizard) para controlar su navegación.
   */
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;

  /**
   * @property {ListaPasosWizard[]} pantallasPasos - Array para almacenar los pasos del wizard.
   */
  pantallasPasos: ListaPasosWizard[] = OCTA_TEMPO;

  /**
   * @property {number} indice - El índice actual del paso.
   */
  indice: number = 1;

  /**
   * @property {DatosPasos} datosPasos - Objeto con la información para el botón de continuar.
   */
  datosPasos: DatosPasos = {
    nroPasos: this.pantallasPasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };

  
  /**
   * Bandera que indica si se deben mostrar los errores del formulario.
   */
  mostrarErrorFormularios: boolean = false;

  /**
   * Alerta que se muestra en caso de error en el registro.
   */
  registroAlert = ERROR_DE_REGISTRO_ALERT;

  /*
  * @description Notificador para destruir el componente y cancelar suscripciones.
  */
  private destroyNotifier$: Subject<void> = new Subject();

  /*
  * @description Estado actual de la consulta, obtenido desde el store.
  */
  public consultaState!: ConsultaioState;

  /**
   * @property wizardService
   * @description
   * Inyección del servicio `WizardService` para gestionar la lógica y el estado del componente wizard.
   * @type {WizardService}
   */
  private wizardService = inject(WizardService);


  /**
   * Constructor del componente/servicio.
   * Inyecta los servicios necesarios para la consulta del estado y la gestión del formulario de registro.
   *
   * @param {ConsultaioQuery} consultaQuery - Servicio para consultar el estado actual desde el store.
   * @param {FormularioRegistroService} formularioRegistroService - Servicio para gestionar el formulario de registro.
   */
  constructor(private consultaQuery: ConsultaioQuery, private formularioRegistroService: FormularioRegistroService) {}

  /**
   * Método del ciclo de vida `ngOnInit`.
   * Inicializa el componente y sus dependencias.
   * Se suscribe al observable del estado de consulta para obtener el estado actual desde el store.
   * Al recibir un nuevo estado, lo asigna a la propiedad `consultaState`.
   */
  ngOnInit(): void {
    this.consultaQuery.selectConsultaioState$
    .pipe(
      takeUntil(this.destroyNotifier$),
      map((seccionState) => {
      this.consultaState = seccionState;
      }
    )).subscribe();
  }

  /**
   * Maneja el cambio de índice en el flujo del wizard.
   * Valida los formularios antes de avanzar o retroceder.
   * 
   * @param e - Objeto que contiene la acción y el nuevo valor del índice.
   */
  getValorIndice(e: AccionBoton): void {
    if (!this.consultaState.readonly) {
      const TODOS_VALIDOS = this.formularioRegistroService.validarTodosFormularios();

      if (!TODOS_VALIDOS) {
        this.mostrarErrorFormularios = true;
        return;
      }
      this.mostrarErrorFormularios = false;
      if (e.valor > 0 && e.valor < 5) {
        this.indice = e.valor;
        this.datosPasos.indice = e.valor;
        if (e.accion === 'cont' && !this.mostrarErrorFormularios) {
          this.indice = e.valor + 1;
          this.datosPasos.indice = e.valor + 1;
          this.wizardService.cambio_indice(this.datosPasos.indice);
          this.wizardComponent.siguiente();
        } else if (e.accion === 'ant' && !this.mostrarErrorFormularios){
          this.indice = e.valor - 1;
          this.datosPasos.indice = e.valor - 1;
          this.wizardComponent.atras();
        }
      }
    } else {
      if (e.valor > 0 && this.pantallasPasos.length) {
      this.indice = e.valor;
      if (e.accion === 'cont') {
        this.wizardComponent.siguiente();
      } else {
        this.wizardComponent.atras();
      }
    }
    }
    
  }

  /*
    * Método que se ejecuta al destruir el componente.
  */
   ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
