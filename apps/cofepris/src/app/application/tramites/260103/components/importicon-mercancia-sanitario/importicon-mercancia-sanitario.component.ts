import {
  TablaMercanciaClaveConfig,
} from '../../../../shared/models/datos-solicitud.model';


import { CommonModule } from '@angular/common';

import { Component,OnDestroy, OnInit,} from '@angular/core';
import { Subject,first,takeUntil, tap } from 'rxjs';
import {
  Tramite260103State,
  Tramite260103Store,
} from '../../estados/tramite260103Store.store';
import { DatosMercanciaComponent } from '../../../../shared/components/datos-mercancia/datos-mercancia.component';
import { DatosSolicitudService } from '../../../../shared/services/datos-solicitud.service';
import { TablaMercanciasImportacion } from '../../models/importicon-retorno.model';
import { Tramite260103Query } from '../../estados/tramite260103Query.query';

/**
 * @component DatosMercanciaComponent
 * @description Componente encargado de capturar y emitir los datos de una mercancía.
 * Utiliza formularios reactivos y listas cruzadas para países de origen, procedencia y uso específico.
 */
@Component({
  selector: 'app-exporticon-mercancia-estupefacientes',
  standalone: true,
  imports: [
    CommonModule,
    DatosMercanciaComponent
  ],
  templateUrl:'./importicon-mercancia-sanitario.component.html',
  styleUrl: './importicon-mercancia-sanitario.component.scss',
  providers: [DatosSolicitudService],
})
export class ImporticonMercanciaSanitarioComponent implements OnInit, OnDestroy {

   /**
   * @property {number} idProcedimiento
   * Identificador del procedimiento actual.
   */
  public readonly idProcedimiento:number = 260103;

  /**
   * @property {Subject<void>} destroyNotifier$
   * Subject utilizado para limpiar las suscripciones activas al destruir el componente.
   * @private
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * @property {Tramite260103State} tramiteState
   * Estado completo del trámite, que contiene información como la tabla de mercancías.
   */
  public tramiteState!: Tramite260103State;

    /**
     * @property {TablaMercanciaClaveConfig[]} scianLista
     * Lista de registros Clave seleccionados.
     */
    public claveLista: TablaMercanciaClaveConfig[] = [];
    /**
     * Valida elementos según el `idProcedimiento` y establece
     * las listas de elementos no válidos y añadidos.
     * @returns {void} Lista de elementos no válidos.
     */

  /**
   * @constructor
   * Inicializa el formulario de mercancía y carga catálogos desde archivos JSON.
   *
   * @param fb - FormBuilder para construir formularios reactivos.
   * @param datosSolicitudService - Servicio que carga catálogos desde assets.
   * @param ubicaccion - Servicio para manejar navegación (si es necesario).
   */
  constructor(
    private tramite260103Query: Tramite260103Query,
    private tramite260103Store: Tramite260103Store,
  ) {
  }

  /**
   * @method ngOnInit
   * @description Hook de ciclo de vida que se ejecuta al inicializar el componente.
   * Llama al método `crearMercanciaForm` para construir el formulario.
   */
  ngOnInit(): void {
    this.tramite260103Query.selectTramiteState$
    .pipe(
      takeUntil(this.destroyNotifier$),
      first(), 
      tap((seccionState)=>{
        this.tramiteState = seccionState;
      })
    )
    .subscribe();
  }

  

  /**
   * @method mercanciaSeleccionado
   * @description Maneja la selección de una mercancía en la tabla de mercancías. 
   * Actualiza el estado de la mercancía seleccionada y la configuración de datos de la tabla.
   * 
   * @param {TablaMercanciasImportacion} event - Objeto que contiene los datos de la mercancía seleccionada.
   * 
   * @returns {void}
   */
  mercanciaSeleccionado(event: TablaMercanciasImportacion): void {
    

    const SELECCIONADO_MERCANCIA :TablaMercanciasImportacion= {
      clasificacionProducto: event.clasificacionProducto,
      especificarClasificacionProducto: event.especificarClasificacionProducto,
      denominacionEspecificaProducto: event.denominacionEspecificaProducto,
      denominacionCumonInternacional: event.denominacionCumonInternacional,
      marcaComercialDenominacion: event.marcaComercialDenominacion,
      cantidadDeLotes: event.cantidadDeLotes,
      numeroDePiezasAFabricar: event.numeroDePiezasAFabricar,
      descripcionNumeroDePiezas: event.descripcionNumeroDePiezas,
      formaFarmaceutica: event.formaFarmaceutica,
      estadoFisico: event.estadoFisico,
      fraccionArancelaria: event.fraccionArancelaria,
      descripcionFraccion: event.descripcionFraccion,
      unidadMedidaComercializacion: event.cantidadUmcValor,
      cantidadUMC: event.cantidadUMC,
      unidadMedidaTarifa: event.cantidadUmtValor ?? '',
      cantidadUMT: event.cantidadUMT,
      presentacion: event.presentacion,
      numeroRegistroSanitario: event.numeroRegistroSanitario,
      paisOrigen: event.paisOrigen,
      paisProcedencia: event.paisProcedencia,
      tipoProducto: event.tipoProducto,
      usoEspecifico: event.usoEspecifico,
      numeroCAS: event.numeroCAS,
      paisDeDestino: event.paisDeDestino,
      marca: event.marca,
    };

    const INDICES = this.tramiteState.tablaMercanciasConfigDatos.findIndex(
      (idx) =>
        idx.clasificacionProducto ===
        SELECCIONADO_MERCANCIA.clasificacionProducto.toString()
    );

    let datosActivos = [];

    if (INDICES !== -1) {
      const TABLE_MERCANCIA_DATA = this.tramiteState.tablaMercanciasConfigDatos;
      TABLE_MERCANCIA_DATA.splice(INDICES, 1, SELECCIONADO_MERCANCIA);
      datosActivos = TABLE_MERCANCIA_DATA;
    } else {
      datosActivos = [
        ...this.tramiteState.tablaMercanciasConfigDatos,
        SELECCIONADO_MERCANCIA,
      ];
    }

    this.tramite260103Store.update((state) => ({
      ...state,
      seleccionadoPRODUCTO_TABLA_IMPORTACION: [SELECCIONADO_MERCANCIA],
      tablaMercanciasConfigDatos: datosActivos,
    }));
  }
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
