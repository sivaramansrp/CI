import { Component, OnInit } from '@angular/core';
import { Tramite260204State, Tramite260204Store } from '../../estados/stores/tramite260204Store.store';
import { map, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { DatosMercanciaComponent } from '../../../../shared/components/datos-mercancia/datos-mercancia.component';
import { Subject } from 'rxjs';
import { TablaMercanciasDatos } from '../../../../shared/models/datos-solicitud.model';
import { Tramite260204Query } from '../../estados/queries/tramite260204Query.query';

@Component({
  selector: 'app-datos-mercancia-contenedora',
  standalone: true,
  imports: [CommonModule, DatosMercanciaComponent],
  templateUrl: './datos-mercancia-contenedora.component.html',
  styleUrl: './datos-mercancia-contenedora.component.scss',
})
export class DatosMercanciaContenedoraComponent implements OnInit {
  public SeleccionadoDatos!: TablaMercanciasDatos;
  private destroyNotifier$: Subject<void> = new Subject();
  public tramiteState!: Tramite260204State;

  constructor(private tramite260204Query: Tramite260204Query,
    private tramite260204Store: Tramite260204Store) { }

  ngOnInit(): void {
    this.tramite260204Query.selectTramiteState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.tramiteState = seccionState;
        })
      ).subscribe();
  }

  /**
   * Maneja la selección de una mercancía en la tabla de datos.
   * 
   * @param event - Objeto de tipo `TablaMercanciasDatos` que contiene la información de la mercancía seleccionada.
   * 
   * Este método realiza las siguientes acciones:
   * 1. Asigna el objeto seleccionado a la propiedad `SeleccionadoDatos`.
   * 2. Crea un objeto `SELECCIONADO_MERCANCIA` con los datos relevantes de la mercancía seleccionada.
   * 3. Busca el índice de la mercancía seleccionada en la configuración de la tabla de mercancías (`tablaMercanciasConfigDatos`).
   * 4. Si la mercancía ya existe en la tabla, actualiza su información en la lista.
   * 5. Actualiza el estado de la tienda (`tramite260204Store`) con los datos actualizados de la mercancía seleccionada y la tabla de mercancías.
   */
  mercanciaSeleccionado(event: TablaMercanciasDatos): void {
    this.SeleccionadoDatos = event;
    const SELECCIONADO_MERCANCIA = {
      clasificacionProducto: event.clasificacionProducto,
      especificarClasificacionProducto: event.especificarClasificacionProducto,
      denominacionEspecificaProducto: event.denominacionEspecificaProducto,
      denominacionDistintiva: event.denominacionComun,
      denominacionComun: event.denominacionComun,
      formaFarmaceutica: event.formaFarmaceutica,
      estadoFisico: event.estadoFisico,
      fraccionArancelaria: event.fraccionArancelaria,
      descripcionFraccion: event.descripcionFraccion,
      unidadMedidaComercializacion: event.unidadMedidaComercializacion,
      cantidadUMC: event.cantidadUMC,
      unidadMedidaTarifa: event.unidadMedidaTarifa,
      cantidadUMT: event.cantidadUMT,
      presentacion: event.presentacion,
      numeroRegistroSanitario: event.numeroRegistroSanitario,
      paisOrigen: event.paisOrigen,
      paisProcedencia: event.paisProcedencia,
      tipoProducto: event.tipoProducto,
      usoEspecifico: event.usoEspecifico
    }
    const INDICES = this.tramiteState.tablaMercanciasConfigDatos.findIndex((idx) => {
      return idx.clasificacionProducto === SELECCIONADO_MERCANCIA.clasificacionProducto.toString();
    })
    let datosActivos = [];
    if (INDICES !== -1) {
      const TABLE_MERCANCIA_DATA = this.tramiteState.tablaMercanciasConfigDatos;
      TABLE_MERCANCIA_DATA.splice(INDICES, 1, SELECCIONADO_MERCANCIA)
      datosActivos = TABLE_MERCANCIA_DATA;
    }else{
      datosActivos = [...this.tramiteState.tablaMercanciasConfigDatos, SELECCIONADO_MERCANCIA];
    }
    this.tramite260204Store.update((state) => ({
      ...state,
      seleccionadoTablaMercanciasDatos: [SELECCIONADO_MERCANCIA],
      tablaMercanciasConfigDatos: datosActivos
    }))
  }
}
