import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SolicitanteComponent } from '../../components/solicitante/solicitante.component';
import { SolicitudComponent } from '../../components/solicitud/solicitud.component';
import { Subject } from 'rxjs';
import { Tramite6403Query } from '../../estados/tramite6403.query';
import { Tramite6403State } from '../../estados/tramite6403.store';
import { Tramite6403Store } from '../../estados/tramite6403.store';
import { map } from 'rxjs';
import { takeUntil } from 'rxjs';

/**
 * Componente para gestionar el paso uno del trámite 6403.
 * 
 * Este componente permite al usuario navegar entre las pestañas del trámite y gestionar
 * los datos del solicitante y del aviso.
 */
@Component({
  selector: 'app-paso-uno',
  templateUrl: './paso-uno.component.html',
  styleUrl: './paso-uno.component.scss',
  standalone: true,
  imports: [CommonModule, SolicitanteComponent, SolicitudComponent]
})
export class PasoUnoComponent implements OnInit, OnDestroy {

  /**
   * Referencia al componente `SolicitanteComponent`.
   * 
   * Esta propiedad utiliza `@ViewChild` para obtener una referencia al componente
   * del solicitante dentro de la plantilla.
   */
  @ViewChild(SolicitanteComponent) solicitante!: SolicitanteComponent;

  /**
   * Índice de la pestaña activa.
   * 
   * Esta propiedad indica la pestaña actual seleccionada en el componente.
   */
  indice: number = 1;

  /**
   * Estado actual del trámite 6403.
   * 
   * Esta propiedad almacena el estado del trámite obtenido desde el store.
   */
  public tramiteState!: Tramite6403State;

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
   * @param {Tramite6403Store} store - Store para gestionar el estado del trámite.
   * @param {Tramite6403Query} tramiteQuery - Query para obtener el estado del trámite.
   */
  constructor(
    public store: Tramite6403Store,
    public tramiteQuery: Tramite6403Query
  ) {
    // El constructor se utiliza para la inyección de dependencias.
  }

  /**
   * Método que se ejecuta al inicializar el componente.
   * 
   * Este método suscribe al estado del trámite y actualiza la propiedad `tramiteState`
   * con los datos obtenidos. También inicializa el índice de la pestaña activa.
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
   * Cambia la pestaña activa.
   * 
   * Este método actualiza el índice de la pestaña activa y llama al método correspondiente
   * del store para actualizar el estado.
   * 
   * @param {number} i - Índice de la pestaña seleccionada.
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