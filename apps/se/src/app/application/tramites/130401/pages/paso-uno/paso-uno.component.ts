import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModificacionMercanciaComponent } from '../../components/modificacion-mercancia/modificacion-mercancia.component';
import { SolicitanteComponent } from '@ng-mf/data-access-user';
import { SolicitudComponent } from '../../components/solicitud/solicitud.component';
import { Subject } from 'rxjs';
import { Tramite130401Query } from '../../../../estados/queries/tramite130401.query';
import { Tramite130401State } from '../../../../estados/tramites/tramite130401.store';
import { Tramite130401Store } from '../../../../estados/tramites/tramite130401.store';
import { map } from 'rxjs';
import { takeUntil } from 'rxjs';

/**
 * Componente para gestionar el paso uno del trámite.
 * 
 * Este componente permite al usuario navegar entre diferentes pestañas y gestionar
 * las secciones relacionadas con el trámite, como solicitante, destinatario, histórico
 * de productores y datos del certificado.
 */
@Component({
  selector: 'app-paso-uno',
  templateUrl: './paso-uno.component.html',
  styleUrl: './paso-uno.component.scss',
  standalone: true,
  imports: [CommonModule, SolicitanteComponent, SolicitudComponent, ModificacionMercanciaComponent]
})
export class PasoUnoComponent implements OnInit, OnDestroy {
  /**
   * Referencia al componente `SolicitanteComponent`.
   * 
   * Esta propiedad utiliza `@ViewChild` para obtener una referencia al componente
   * de solicitante dentro de la plantilla.
   */
  @ViewChild(SolicitanteComponent) solicitante!: SolicitanteComponent;

  /**
   * Índice de la pestaña activa.
   * 
   * Esta propiedad indica cuál pestaña está activa actualmente.
   */
  indice: number = 1;

  /**
   * Estado actual del trámite.
   * 
   * Esta propiedad almacena el estado del trámite obtenido desde el store.
   */
  public tramiteState!: Tramite130401State;

  /**
   * Notificador para destruir las suscripciones y evitar fugas de memoria.
   * 
   * Este `Subject` se utiliza para cancelar las suscripciones activas cuando
   * el componente se destruye.
   */
  destroyNotifier$: Subject<void> = new Subject();

  /**
   * Constructor del componente.
   * 
   * @param {Tramite130401Store} store - Store para gestionar el estado del trámite.
   * @param {Tramite130401Query} tramiteQuery - Query para obtener el estado del trámite.
   */
  constructor(
    public store: Tramite130401Store,
    public tramiteQuery: Tramite130401Query
  ) {
    // Constructor
  }

  /**
   * Método que se ejecuta al inicializar el componente.
   * 
   * Este método suscribe al estado del trámite y establece la pestaña activa
   * según el estado almacenado.
   */
  ngOnInit(): void {
    this.tramiteQuery.selectSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.tramiteState = seccionState;
        })
      )
      .subscribe();
    this.indice = this.tramiteState.pestanaActiva;
  }

  /**
   * Método para seleccionar una pestaña específica.
   * 
   * Este método actualiza el índice de la pestaña activa y almacena el valor
   * en el store.
   * 
   * @param {number} i - El índice de la pestaña a seleccionar.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
    this.store.setPestanaActiva(this.indice);
  }

  /**
   * Método que se ejecuta al destruir el componente.
   * 
   * Este método emite un valor al `destroyNotifier$` y lo completa para cancelar
   * todas las suscripciones activas y evitar fugas de memoria.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}