/**
 * @component PasoUnoComponent
 * @description Este componente es responsable de manejar el primer paso del trámite.
 * Incluye la lógica para seleccionar una pestaña y actualizar el índice.
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
  imports: [SolicitanteComponent, DomiciliosDePlantasComponent, ProductorIndirectoComponent, SectoresYMercanciasComponent, CommonModule]
})
export class PasoUnoComponent implements OnInit, OnDestroy {
  /**
   * @property {number} indice - El índice de la pestaña seleccionada.
   */
  indice: number = 1;

  /**
   * @descripcion
   * Subject utilizado para notificar y completar las suscripciones activas al destruir el componente,
   * evitando fugas de memoria.
   * Se utiliza junto con el operador `takeUntil`.
   * @private
   */
  private destroyNotifier$ = new Subject<void>();

  /**
   * @descripcion
   * Indica si el formulario debe estar deshabilitado (solo lectura).
   * Cuando es verdadero, los controles del formulario estarán deshabilitados y no se podrán editar.
   */
  formularioDeshabilitado: boolean = false;

  /**
   * @constructor
   * @param importacionDeAcuiculturaService Servicio para gestionar operaciones relacionadas con la importación de acuicultura.
   * 
   * @description
   * Inyecta el servicio `ImportacionDeAcuiculturaService` para manejar la lógica de negocio relacionada con los trámites de importación de acuicultura en el componente.
   */
  constructor(private prosecService: ProsecService, private consultaQuery: ConsultaioQuery) {

  }

  /**
   * @method seleccionaTab
   * @description Selecciona una pestaña y actualiza el índice.
   * @param {number} i - El índice de la pestaña seleccionada.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }

  /**
   * @inheritdoc
   * @description
   * Método del ciclo de vida de Angular que se ejecuta al inicializar el componente.
   * Suscribe al observable `selectConsultaioState$` para escuchar cambios en el estado de la sección.
   * Si el estado indica una actualización (`update`), se llama al método `guardarDatosFormulario`.
   * La suscripción se limpia automáticamente al destruir el componente usando `takeUntil`.
   *
   * @see https://angular.io/guide/lifecycle-hooks
   *
   * @memberof PasoUnoComponent
   */
  ngOnInit(): void {

    this.consultaQuery.selectConsultaioState$
    .pipe(takeUntil(this.destroyNotifier$))
    .subscribe((seccionState) => {
      if(seccionState.update){
        this.formularioDeshabilitado = false;
              this.guardarDatosFormulario();
      }
      else if (seccionState.readonly) {
        this.formularioDeshabilitado = true;
      }
    });
  }

  /**
   * @descripcion
   * Obtiene los datos de acuicultura y actualiza el estado del formulario.
   * 
   * @remarks
   * Realiza una suscripción al observable que retorna los datos de acuicultura.
   * Utiliza `takeUntil` para evitar fugas de memoria al destruir el componente.
   * Si la respuesta es válida, actualiza el estado del formulario con los datos recibidos.
   */
  guardarDatosFormulario(): void {
    this.prosecService
      .getAcuiculturaData().pipe(
        takeUntil(this.destroyNotifier$)
      )
      .subscribe((resp) => {
        if (resp) {
          this.prosecService.actualizarEstadoFormulario(resp);
        }
      });
  }
  /**
   * @method ngOnDestroy
   * @description Método del ciclo de vida de Angular que se ejecuta al destruir el componente.
   * Cancela suscripciones activas mediante `destroyNotifier$`.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}