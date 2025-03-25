import { Component, OnDestroy, OnInit } from '@angular/core';
import { DatosDeTablaSeleccionados, DatosSolicitudFormState, TablaMercanciasDatos, TablaOpcionConfig, TablaScianConfig, TablaSeleccion } from '../../../../shared/models/datos-solicitud.model';
import { OPCION_TABLA, PRODUCTO_TABLA, SCIAN_TABLA, TABLA_OPCION_DATA } from '../../../../shared/constantes/datos-solicitud.enum';
import { Tramite260204State, Tramite260204Store } from '../../estados/stores/tramite260204Store.store';
import { map, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { DatosDeLaSolicitudComponent } from '../../../../shared/components/datos-de-la-solicitud/datos-de-la-solicitud.component';
import { Subject } from 'rxjs';
import { Tramite260204Query } from '../../estados/queries/tramite260204Query.query';

@Component({
  selector: 'app-contenedor-de-datos-solicitud',
  standalone: true,
  imports: [CommonModule, DatosDeLaSolicitudComponent],
  templateUrl: './contenedor-de-datos-solicitud.component.html',
  styleUrl: './contenedor-de-datos-solicitud.component.scss',
})
export class ContenedorDeDatosSolicitudComponent implements OnInit, OnDestroy{
  private destroyNotifier$: Subject<void> = new Subject();
  public tramiteState!: Tramite260204State;

  public opcionConfig = {
    tipoSeleccionTabla: undefined,
    configuracionTabla: OPCION_TABLA,
    datos: [] as TablaOpcionConfig[],
  }
  public scianConfig = {
    tipoSeleccionTabla: TablaSeleccion.CHECKBOX,
    configuracionTabla: SCIAN_TABLA,
    datos: [] as TablaScianConfig[],
  }
  public tablaMercanciasConfig = {
    tipoSeleccionTabla: TablaSeleccion.CHECKBOX,
    configuracionTabla: PRODUCTO_TABLA,
    datos: [] as TablaMercanciasDatos[],
  }

  
  public opcionConfigDatos: TablaOpcionConfig[] = [];
  public scianConfigDatos: TablaScianConfig[] = [];
  public tablaMercanciasConfigDatos: TablaMercanciasDatos[] = [];
  
  public seleccionadoopcionDatos: TablaOpcionConfig[] = [];
  public seleccionadoScianDatos: TablaScianConfig[] = [];
  public seleccionadoTablaMercanciasDatos: TablaMercanciasDatos[] = [];
  constructor(private tramite260204Query: Tramite260204Query,
    private tramite260204Store: Tramite260204Store
  ) { }

  ngOnInit(): void {
    this.tramite260204Query.selectTramiteState$
    .pipe(
      takeUntil(this.destroyNotifier$),
      map((seccionState) => {
        this.tramiteState = seccionState;
        this.opcionConfig.datos = this.tramiteState.opcionConfigDatos;
        this.scianConfig.datos = this.tramiteState.scianConfigDatos;
        this.tablaMercanciasConfig.datos = this.tramiteState.tablaMercanciasConfigDatos;
      })
    ).subscribe();
  }



  opcionSeleccionado(event: TablaOpcionConfig[]): void {
    this.opcionConfigDatos = event;
  }

  scianSeleccionado(event: TablaScianConfig[]): void {
    this.scianConfigDatos = event;
  }

  mercanciasSeleccionado(event: TablaMercanciasDatos[]): void {
    this.tablaMercanciasConfigDatos = event;
  }


  datasolicituActualizar(event: DatosSolicitudFormState): void {
    this.tramite260204Store.updateDatosSolicitudFormState(event);
  }

  datosDeTablaSeleccionados(event: DatosDeTablaSeleccionados): void {
    this.seleccionadoScianDatos = event.scianSeleccionados;
    this.seleccionadoTablaMercanciasDatos = event.mercanciasSeleccionados;
    this.seleccionadoopcionDatos = event.opcionSeleccionados;

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
