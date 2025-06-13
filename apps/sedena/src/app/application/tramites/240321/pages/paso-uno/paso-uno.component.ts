import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { DatosDelTramiteContenedoraComponent } from '../../components/datos-del-tramite-contenedora/datos-del-tramite-contenedora.component';
import { FolioComponent } from '../../components/folio/folio.component';
import { PagoDeDerechosContenedoraComponent } from '../../components/pago-de-derechos-contenedora/pago-de-derechos-contenedora.component';
import { ConsultaioQuery, ConsultaioState, SolicitanteComponent } from '@libs/shared/data-access-user/src';
import { TercerosRelacionadosContenedoraComponent } from '../../components/terceros-relacionados-contenedora/terceros-relacionados-contenedora.component';
import { map, Subject, takeUntil } from 'rxjs';
import { ModificacionService } from '../../services/modificacion.service';
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

constructor( private readonly consultaQuery: ConsultaioQuery, private modificacionService: ModificacionService,    private readonly tramiteStore: Tramite240321Store){

}
 ngOnInit(): void {
    this.consultaQuery.selectConsultaioState$.pipe(takeUntil(this.destroyNotifier$),map((seccionState) => {
          this.consultaState = seccionState;
      })).subscribe();
  }
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
