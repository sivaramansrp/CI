/**
 *  PasoSolicitanteComponent
 *  Componente para manejar el paso del solicitante en el proceso de transferencia de cupos.
 */

import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConsultaioQuery, ConsultaioState } from '@ng-mf/data-access-user';
import { map, takeUntil } from 'rxjs';
import { LicitacionesDisponiblesService } from '../../services/licitaciones-disponibles.service';
import { Subject } from 'rxjs';
/**
 * 
 *  app-paso-solicitante
 *  ./paso-solicitante.component.html
 *  Componente para manejar el paso del solicitante en el proceso de transferencia de cupos.
 */
@Component({
  selector: 'app-paso-solicitante',
  templateUrl: './paso-solicitante.component.html',
})
export class PasoSolicitanteComponent implements OnInit, OnDestroy{
  /**
   * {number} indice
   *  Índice actual del tab seleccionado.
   */
  indice: number = 1;
  private destroyed$ = new Subject<void>();
  public esDatosRespuesta: boolean = false;
  public consultaState!:ConsultaioState;
  update = true;
  constructor(private service:LicitacionesDisponiblesService,private consultaQuery: ConsultaioQuery){
  //constructor
  }
  /**
   *  seleccionaTab
   *  Método para seleccionar un tab específico.
   *  {number} i - Índice del tab a seleccionar.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }
  ngOnInit(): void {
   this.consultaQuery.selectConsultaioState$.pipe(takeUntil(this.destroyed$),map((seccionState) => {
          this.consultaState = seccionState;
      })).subscribe();
  
    if(this.consultaState.update) {
      this.guardarDatosFormulario();
    } else {
      this.esDatosRespuesta = true;
    }
  }
   guardarDatosFormulario(): void {
    this.service.getLicitationesVigentesData().pipe(
        takeUntil(this.destroyed$)).subscribe((resp) => {
        if(resp){
        this.esDatosRespuesta = true;
        this.service.actualizarEstadoFormulario(resp);
        }
      });
  }

  ngOnDestroy(): void {
  this.destroyed$.next();
  this.destroyed$.complete();
}
}