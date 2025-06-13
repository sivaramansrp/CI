import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ConsultaioQuery, ConsultaioState, SolicitanteComponent } from '@libs/shared/data-access-user/src';
import { Subject,map,takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { DatosDelTramiteContenedoraComponent } from '../../components/datos-del-tramite-contenedora/datos-del-tramite-contenedora.component';
import { FolioComponent } from '../../components/folio/folio.component';
import { ModificacionService } from '../../services/modificacion.service';
import { PagoDeDerechosContenedoraComponent } from '../../components/pago-de-derechos-contenedora/pago-de-derechos-contenedora.component';
import { TercerosRelacionadosContenedoraComponent } from '../../components/terceros-relacionados-contenedora/terceros-relacionados-contenedora.component';
import { Tramite240321Store } from '../../estados/tramite240321Store.store';

/**
 * @title Paso Uno
 * @description Componente que representa el primer paso del flujo de solicitud. Contiene los datos del solicitante, datos del trámite, terceros relacionados y pago de derechos.
 * @summary Agrupa los subcomponentes necesarios para capturar la información inicial del trámite.
 */
@Component({
  selector: 'app-paso-uno',
  templateUrl: './paso-uno.component.html',
  styleUrl: './paso-uno.component.scss',
  standalone: true,
  imports:[SolicitanteComponent,DatosDelTramiteContenedoraComponent,TercerosRelacionadosContenedoraComponent,PagoDeDerechosContenedoraComponent,CommonModule,FolioComponent]
})
export class PasoUnoComponent implements OnInit,AfterViewInit,OnDestroy {
   /**
   * Índice utilizado para identificar la posición actual en un proceso o lista.
   * @type {number}
   */
   indice: number = 1;
    /**
     * @description
     * Estado actual de la consulta para el componente.
     * 
     * @type {ConsultaioState}
     * @memberof PasoUnoComponent
     */
     public consultaState!:ConsultaioState;
       /** Subject para notificar la destrucción del componente. */
  private destroyNotifier$: Subject<void> = new Subject();

/**
 * @constructor
 * @desc Constructor de la clase PasoUnoComponent.
 * 
 * @param consultaQuery Servicio para consultar información relacionada con el trámite.
 * @param modificacionService Servicio para manejar las modificaciones del trámite.
 * @param tramiteStore Almacén de estado específico para el trámite 240321.
 */
constructor( private readonly consultaQuery: ConsultaioQuery, private modificacionService: ModificacionService, private readonly tramiteStore: Tramite240321Store){

}
  /**
   * @inheritdoc
   * @description
   * Método del ciclo de vida de Angular que se ejecuta al inicializar el componente.
   * 
   * En este método, se suscribe al estado de la consulta utilizando el servicio `consultaQuery` y actualiza el estado del componente.
   * La suscripción se gestiona para evitar fugas de memoria utilizando el observable `destroyNotifier$`.
   * 
   * @see https://angular.io/api/core/OnInit
   */
 ngOnInit(): void {
    this.consultaQuery.selectConsultaioState$.pipe(takeUntil(this.destroyNotifier$),map((seccionState) => {
          this.consultaState = seccionState;
      })).subscribe();
  }
   /**
   * @inheritdoc
   * @description
   * Método del ciclo de vida de Angular que se ejecuta después de que la vista del componente ha sido inicializada.
   * 
   * En este método, se obtiene el estado del trámite utilizando el servicio `modificacionService` y se actualiza el estado en el store correspondiente.
   * La suscripción se gestiona para evitar fugas de memoria utilizando el observable `destroyNotifier$`.
   * 
   * @see https://angular.io/api/core/AfterViewInit
   */
  ngAfterViewInit(): void {
    // if(this.consultaState.update) {
    this.modificacionService.getTrimateState240321().pipe(takeUntil(this.destroyNotifier$),map((seccionState) => {
     this.tramiteStore.updateState(seccionState);
      })).subscribe();
    // }
  
  }
   /**
    * Selecciona una pestaña específica.
    * @param i - El índice de la pestaña a seleccionar.
    */
   seleccionaTab(i:number): void {
     this.indice = i;
   }
  /**
   * @inheritdoc
   * @description
   * Método del ciclo de vida de Angular que se ejecuta cuando el componente es destruido.
   * Notifica a los suscriptores y completa el observable `destroyNotifier$` para evitar fugas de memoria.
   *
   * @see https://angular.io/api/core/OnDestroy
   */
   ngOnDestroy(): void {
     this.destroyNotifier$.next();
     this.destroyNotifier$.complete();
   }
   
}
