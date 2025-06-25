/**
 * @component PasoUnoComponent
 * @description Este componente es responsable de manejar el primer paso del trámite PROSEC.
 * Controla la selección de pestañas, el estado de lectura del formulario, y la sincronización con el estado global.
 * 
 * @import { Component } from '@angular/core';
 */

import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConsultaioQuery, SolicitanteComponent } from '@libs/shared/data-access-user/src';
import { Subject, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { DomiciliosDePlantasComponent } from '../../components/domicilios-de-plantas/domicilios-de-plantas.component';
import { ProductorIndirectoComponent } from '../../components/productor-indirecto/productor-indirecto.component';
import { ProsecService } from '../../services/prosec.service';
import { SectoresYMercanciasComponent } from '../../components/sectores-y-mercancias/sectores-y-mercancias.component';

@Component({
  selector: 'app-paso-uno',
  templateUrl: './paso-uno.component.html',
  styleUrl: './paso-uno.component.scss',
  standalone: true,
  imports: [
    SolicitanteComponent,
    DomiciliosDePlantasComponent,
    ProductorIndirectoComponent,
    SectoresYMercanciasComponent,
    CommonModule
  ]
})
export class PasoUnoComponent implements OnInit, OnDestroy {
  /**
   * @property {number} indice
   * @description Índice actual de la pestaña seleccionada en el paso uno.
   */
  indice: number = 1;

  /**
   * @property {boolean} formularioDeshabilitado
   * @description Indica si el formulario debe mostrarse en modo solo lectura.
   */
  formularioDeshabilitado: boolean = false;

  /**
   * @property {Subject<void>} destroyNotifier$
   * @description Subject utilizado para cancelar suscripciones activas y evitar fugas de memoria al destruir el componente.
   * @private
   */
  private destroyNotifier$ = new Subject<void>();

  /**
   * @constructor
   * @param prosecService Servicio de PROSEC que gestiona la lógica de datos de acuicultura.
   * @param consultaQuery Query para obtener el estado global de la sección.
   */
  constructor(
    private prosecService: ProsecService,
    private consultaQuery: ConsultaioQuery
  ) {}

  /**
   * @method seleccionaTab
   * @description Cambia el índice de la pestaña activa.
   * @param {number} i Índice de la pestaña a seleccionar.
   * @returns {void}
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }

  /**
   * @method ngOnInit
   * @description Hook de ciclo de vida que se ejecuta al inicializar el componente.
   * Se suscribe al estado de la sección para detectar cambios y gestionar la habilitación del formulario.
   * Llama a `guardarDatosFormulario()` si el estado indica actualización.
   * @returns {void}
   */
  ngOnInit(): void {
    this.consultaQuery.selectConsultaioState$
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((seccionState) => {
        if (seccionState.update) {
          this.formularioDeshabilitado = false;
          this.guardarDatosFormulario();
        } else if (seccionState.readonly) {
          this.formularioDeshabilitado = true;
        }
      });
  }

  /**
   * @method guardarDatosFormulario
   * @description Obtiene los datos de acuicultura desde el servicio y actualiza el estado del formulario.
   * Se asegura de evitar fugas de memoria utilizando `takeUntil`.
   * @returns {void}
   */
  guardarDatosFormulario(): void {
    this.prosecService
      .getAcuiculturaData()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((resp) => {
        if (resp) {
          this.prosecService.actualizarEstadoFormulario(resp);
        }
      });
  }

  /**
   * @method ngOnDestroy
   * @description Hook de ciclo de vida que se ejecuta al destruir el componente.
   * Libera recursos cancelando todas las suscripciones activas.
   * @returns {void}
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
