import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ContenedorDeDatosSolicitudComponent } from '../../components/contenedor-de-datos-solicitud/contenedor-de-datos-solicitud.component';
import { PagoDeDerechosContenedoraComponent } from '../../components/pago-de-derechos-contenedora/pago-de-derechos-contenedora/pago-de-derechos-contenedora.component';
import { SolicitanteComponent } from '@ng-mf/data-access-user';
import { TercerosRelacionadosVistaComponent } from '../../components/terceros-relacionados-vista/terceros-relacionados-vista.component';
import { Tramite260214Query } from '../../estados/tramite260214Query.query';
import { Tramite260214Store } from '../../estados/tramite260214Store.store';

/**
 * @component PasoUnoComponent
 * @description Componente que representa el primer paso del flujo del trámite.
 * Gestiona la selección de pestañas y la interacción con el estado del trámite a través del store y las consultas.
 */
@Component({
  selector: 'app-paso-uno',
  standalone: true,
  imports: [
    CommonModule,
    SolicitanteComponent,
    ContenedorDeDatosSolicitudComponent,
    TercerosRelacionadosVistaComponent,
    PagoDeDerechosContenedoraComponent,
  ],
  templateUrl: './paso-uno.component.html',
  styleUrl: './paso-uno.component.css',
})
export class PasoUnoComponent implements OnDestroy, OnInit {
  /**
   * @property {number | undefined} indice
   * @description Índice de la pestaña seleccionada actualmente.
   */
  indice: number | undefined = 1;

  /**
   * @property {Subject<void>} destroyNotifier$
   * @description Observable utilizado para notificar y cancelar suscripciones activas al destruir el componente.
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * @constructor
   * @description Constructor que inyecta las dependencias `Tramite260214Query` y `Tramite260214Store`
   * para gestionar el estado del trámite.
   *
   * @param {Tramite260214Query} tramite260214Query - Consulta para obtener el estado del trámite.
   * @param {Tramite260214Store} tramite260214Store - Store que administra el estado del trámite.
   */
  constructor(
    private tramite260214Query: Tramite260214Query,
    private tramite260214Store: Tramite260214Store
  ) {}

  /**
   * @method ngOnInit
   * @description Método del ciclo de vida de Angular que se ejecuta al inicializar el componente.
   * Suscribe al estado de la pestaña seleccionada y actualiza el índice.
   */
  ngOnInit(): void {
    this.tramite260214Query.getTabSeleccionado$
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((tab) => {
        this.indice = tab;
      });
  }

  /**
   * @method seleccionaTab
   * @description Actualiza el índice de la pestaña seleccionada en el store del trámite.
   *
   * @param {number} i - Índice de la pestaña seleccionada.
   */
  seleccionaTab(i: number): void {
    this.tramite260214Store.updateTabSeleccionado(i);
  }

  /**
   * Método del ciclo de vida de Angular que se llama justo antes de que el componente sea destruido.
   *
   * Este método emite un valor a través del observable `destroyNotifier$` para notificar a los suscriptores
   * que el componente está siendo destruido, y luego completa el observable para liberar recursos.
   *
   * @returns {void} No retorna ningún valor.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
