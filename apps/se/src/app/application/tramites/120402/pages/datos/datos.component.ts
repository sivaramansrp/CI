/**
 * Componente que representa la interfaz de una cortina a la italiana.
 * Permite la navegación entre diferentes pestañas mediante un índice.
 */
import { Component, OnDestroy, OnInit } from '@angular/core';

import { ConsultaioQuery, ConsultaioState } from '@ng-mf/data-access-user';
import { Subject, map, takeUntil } from 'rxjs';

import {RepresentacionFederalService,} from '@ng-mf/data-access-user';

import { Solocitud120402Service } from '../../services/service120402.service'; 
/**
 * Componente que representa la interfaz de una cortina a la italiana.
 * Permite la navegación entre diferentes pestañas mediante un índice.
 */
@Component({
  selector: 'app-datos',
  templateUrl: './datos.component.html',
})
export class DatosComponent implements OnInit, OnDestroy {  

   /** Datos de respuesta del servidor utilizados para actualizar el formulario. */
  public esDatosRespuesta: boolean = false;

  /** Subject para notificar la destrucción del componente. */
  private destroyNotifier$: Subject<void> = new Subject();
  public consultaState!:ConsultaioState;
  /**
  * Índice actual de la pestaña seleccionada.
  */
 indice: number = 1;

 /**
  * Número total de pestañas disponibles.
  */
 totalPestanas: number = 5;

   constructor(
    public pantallasSvc: RepresentacionFederalService,
    private solocitud120402Service: Solocitud120402Service,
    private consultaQuery: ConsultaioQuery
  ) {
// Constructor vacío: La inicialización se realizará en métodos específicos según sea necesario.
  }

    ngOnInit(): void {
    this.consultaQuery.selectConsultaioState$.pipe(takeUntil(this.destroyNotifier$),map((seccionState) => {
          this.consultaState = seccionState;
      })).subscribe();
    if(this.consultaState.update) {
      this.guardarDatosFormulario();
    } else {
      this.esDatosRespuesta = true;
    }
  }

   /**
   * Carga datos desde un archivo JSON y actualiza el store con la información obtenida.
   * Luego reinicializa el formulario con los valores actualizados desde el store.
   */
  guardarDatosFormulario(): void {
    this.solocitud120402Service
      .getRegistroTomaMuestrasMercanciasData().pipe(
        takeUntil(this.destroyNotifier$)
      )
      .subscribe((resp) => {
        if(resp){
        this.esDatosRespuesta = true;
        this.solocitud120402Service.actualizarEstadoFormulario(resp);
        }
      });
    }

 /**
  * Indica si la pestaña seleccionada es la primera.
  */
 get esPrimeraPestana(): boolean {
   return this.indice === 1;
 }

 /**
  * Indica si la pestaña seleccionada es la última.
  */
 get esUltimaPestana(): boolean {
   return this.indice === this.totalPestanas;
 }

 /**
  * Cambia la pestaña activa según el índice proporcionado.
  * @param i Número de la pestaña a seleccionar.
  */
 seleccionaTab(i: number): void {
   if (i >= 1 && i <= this.totalPestanas) {
     this.indice = i;
   }
 }

 /**
  * Avanza a la siguiente pestaña si no es la última.
  */
 avanzarTab(): void {
   if (!this.esUltimaPestana) {
     this.indice++;
   }
 }

 /**
  * Retrocede a la pestaña anterior si no es la primera.
  */
 retrocederTab(): void {
   if (!this.esPrimeraPestana) {
     this.indice--;
   }
 }

 /**
  * Reinicia la selección de pestañas al valor inicial.
  */
 resetTabs(): void {
   this.indice = 1;
 }

   ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}