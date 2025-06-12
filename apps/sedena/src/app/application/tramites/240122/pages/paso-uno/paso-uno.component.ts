import { AfterViewInit, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatosDelTramiteContenedoraComponent } from '../../components/datos-del-tramite-contenedora/datos-del-tramite-contenedora.component';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { SolicitanteComponent } from '@ng-mf/data-access-user';
import { SolicitudService } from '../../services/solicitud/solicitud.service';
import { Subject } from 'rxjs';
import { TercerosRelacionadosContenedoraComponent } from '../../components/terceros-relacionados-contenedora/terceros-relacionados-contenedora.component';
import { Tramite240122Query } from '../../estados/tramite240122Query.query';
import { Tramite240122Store } from '../../estados/tramite240122Store.store';
import { takeUntil } from 'rxjs';

/**
 * @component
 * @name PasoUnoComponent
 * @description Este componente representa el primer paso de un formulario en el flujo de trámites.
 * Gestiona el índice de la pestaña seleccionada y actualiza el estado correspondiente en el store.
 * También maneja la suscripción a observables para evitar fugas de memoria.
 * 
 * @implements OnDestroy
 * @implements OnInit
 */
@Component({
  selector: 'app-paso-uno',
  standalone: true,
  imports: [
    CommonModule,
    SolicitanteComponent,
    DatosDelTramiteContenedoraComponent,
    TercerosRelacionadosContenedoraComponent,
  ],
  templateUrl: './paso-uno.component.html',
  styleUrl: './paso-uno.component.scss',
})
export class PasoUnoComponent implements OnDestroy, OnInit,AfterViewInit {

  /**
   * @property indice
   * @description Indica el índice de la pestaña seleccionada dentro del paso del formulario.
   * @type {number | undefined}
   */
  public indice: number | undefined = 1;

  /**
   * @property destroyNotifier$
   * @description Notificador observable para cancelar suscripciones activas cuando el componente es destruido.
   * Ayuda a prevenir fugas de memoria.
   * @type {Subject<void>}
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * @constructor
   * @description Inicializa el componente con las dependencias necesarias para la gestión del estado.
   * 
   * @param {Tramite240122Query} tramite240122Query Query para acceder al estado del trámite.
   * @param {Tramite240122Store} tramite240122Store Store para actualizar el estado del trámite.
   */
  constructor(
    private tramite240122Query: Tramite240122Query,
    private tramite240122Store: Tramite240122Store,
    private readonly solicitudService: SolicitudService // eslint-disable-next-line no-empty-function
  ) {}

  /**
   * @method ngOnInit
   * @description Método del ciclo de vida de Angular que se ejecuta al inicializar el componente.
   * Se suscribe a la pestaña seleccionada desde el estado y actualiza la propiedad `indice`.
   * 
   * @returns {void}
   */
  ngOnInit(): void {
    this.tramite240122Query.getTabSeleccionado$
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((tab) => {
        this.indice = tab;
      });
  }
  ngAfterViewInit(): void {
    this.solicitudService.getPermisoExtraordinario().pipe(takeUntil(this.destroyNotifier$))
      .subscribe((datos)=>{
      this.tramite240122Store.actualizarTrimateState(datos);
    });
  }

  /**
   * @method seleccionaTab
   * @description Actualiza el índice de la pestaña seleccionada en el store.
   * 
   * @param {number} i Índice de la pestaña seleccionada.
   * @returns {void}
   */
  public seleccionaTab(i: number): void {
    this.tramite240122Store.updateTabSeleccionado(i);
  }

  /**
   * @method ngOnDestroy
   * @description Método del ciclo de vida de Angular que se ejecuta justo antes de destruir el componente.
   * Emite y completa el `destroyNotifier$` para cancelar las suscripciones activas.
   * 
   * @returns {void}
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
