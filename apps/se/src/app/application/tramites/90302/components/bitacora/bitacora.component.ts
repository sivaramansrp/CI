/**
 * @fileoverview
 * El `Ampliacion3RsComponent` es un componente de Angular diseñado para gestionar la funcionalidad del módulo "Ampliación de Servicios".
 * Maneja formularios reactivos, catálogos y la interacción con el estado para la gestión de datos relacionados con sectores y servicios.
 * 
 * @module Ampliacion3RsComponent
 * @description
 * Este componente proporciona funcionalidad para la ampliación de servicios, incluyendo la inicialización de formularios, 
 * la obtención de datos y la interacción con el estado para la gestión de sectores y reglas.
 */

import {
  Catalogo,
  TablaSeleccion,
} from '@ng-mf/data-access-user';

import {
  FormBuilder,
  FormGroup,
} from '@angular/forms';
import { OnDestroy, OnInit } from '@angular/core';
import { map, takeUntil } from 'rxjs/operators';
import { AmpliacionServiciosQuery } from '../../estados/tramite90302.query';
import { AmpliacionServiciosService } from '../../services/ampliacion-servicios.service';
import { AmpliacionServiciosState } from '../../estados/tramite90302.store';
import { CONFIGURACION_BITCORA, CONFIGURACION_MERCANCIAS_A_PRODUCIR, CONFIGURACION_PLANTAS, CONFIGURACION_PRODUCTOR_INDIRECTO, CONFIGURACION_SECTOR, CONFIGURACION_SECTOR1 } from "../../constantes/modificacion.constants";
import { Component,Input } from '@angular/core';
import { ConfiguracionColumna } from '../../models/configuracion-columna.model';
import { HttpClient } from '@angular/common/http';
import { Sector } from "../../models/datos-info.model";
import { Bitacora,MercanciasAProducir, Plantas,ProductorIndirecto,Sector1} from "../../models/datos-info.model";

import { Subject } from 'rxjs';
import { Tramite80206Store } from '../../estados/tramite90302.store';

@Component({
  selector: 'app-bitacora',
  templateUrl: './bitacora.component.html',
  styleUrl: './bitacora.component.scss',
})
export class BitacoraComponent implements OnInit, OnDestroy {
  /**
   * Indica si una regla ha sido seleccionada.
   * @property {boolean} isSelectedRegla
   */
  isSelectedRegla: boolean = false;
  
@Input() esDeSolicitante: boolean = false; 
  /**
   * Lista de sectores recibidos.
   * @property {Sector[]} recibioSector
   */
  recibioSector: Sector[] = [];

  /**
   * Formulario reactivo para la información de registro.
   * @property {FormGroup} formularioInfoRegistro
   */
  formularioInfoRegistro!: FormGroup;

  /**
   * Tipo de selección de tabla (checkbox).
   * @property {TablaSeleccion} tablaSeleccion
   */
  tablaSeleccion: TablaSeleccion = TablaSeleccion.CHECKBOX;

  /**
   * Configuración de la tabla para sectores.
   * @property {ConfiguracionColumna<Sector>[]} configuracionTablaSector
   */
  configuracionTablaSector: ConfiguracionColumna<Sector>[] = CONFIGURACION_SECTOR;

  configuracionTablaBitacora: ConfiguracionColumna<Bitacora>[] = CONFIGURACION_BITCORA;

  configuracionTablaMercancias: ConfiguracionColumna<MercanciasAProducir>[] = CONFIGURACION_MERCANCIAS_A_PRODUCIR;

  configuracionTablaPlantas: ConfiguracionColumna<Plantas>[] = CONFIGURACION_PLANTAS;
  configuracionTablaProductor: ConfiguracionColumna<ProductorIndirecto>[] = CONFIGURACION_PRODUCTOR_INDIRECTO;
  configuracionTablaSector1: ConfiguracionColumna<Sector1>[] = CONFIGURACION_SECTOR1;

  /**
   * Lista de datos de sectores.
   * @property {Sector[]} datosSector
   */
  datosSector: Sector[] = [];

  datosBitacora: Bitacora[] = [];
  datosMercancias: MercanciasAProducir[] = [];
  datosPlantas: Plantas[] = [];
  datosProductor: ProductorIndirecto[] = [];
  datosSector1: Sector1[] = [];

  /**
   * Lista de domicilios seleccionados.
   * @property {Sector[]} domiciliosSeleccionados
   */
  domiciliosSeleccionados: Sector[] = [];

  /**
   * Formulario reactivo para datos adicionales.
   * @property {FormGroup} forma
   */
  forma!: FormGroup;

  /**
   * Lista de reglas seleccionadas.
   * @property {Catalogo[]} reglaSeleccionada
   */
  reglaSeleccionada!: Catalogo[];

  /**
   * Lista desplegable de sectores.
   * @property {Catalogo[]} sectorDesplegable
   */
  sectorDesplegable!: Catalogo[];

  /**
   * Estado actual del trámite.
   * @property {AmpliacionServiciosState} tramiteState
   */
  tramiteState: AmpliacionServiciosState = {} as AmpliacionServiciosState;

  /**
   * Notificador para gestionar la destrucción o desuscripción de observables.
   * @property {Subject<void>} destroyNotifier$
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * Constructor del componente.
   * @constructor
   * @param {FormBuilder} fb - Servicio para la creación de formularios.
   * @param {AmpliacionServiciosService} ampliacionServiciosService - Servicio para obtener datos de ampliación de servicios.
   * @param {HttpClient} httpServicios - Servicio HTTP para realizar peticiones.
   */
  constructor(
    private fb: FormBuilder,
    private ampliacionServiciosService: AmpliacionServiciosService,
    private ampliacionServiciosQuery: AmpliacionServiciosQuery,
    private tramite80206Store: Tramite80206Store,
    private readonly httpServicios: HttpClient
  ) {
    this.inicializarFormularioInfoRegistro();
  }

  /**
   * Método de inicialización del componente.
   * @method ngOnInit
   */
  ngOnInit(): void {
    this.obtenerReglaSelectList();
    this.inicializarFormularioDesdeAlmacen();
    this.obtenerSectorSelectList();
    
    this.getBitacoraProsec();
    this.getMercanciasProsec();
    this.getPlantasProsec();
    this.getProductorProsec();
    this.getSectoresProsec();
    

  }
  getBitacoraProsec(): void {
    this.ampliacionServiciosService.getBitacoraProsec()
    .pipe(takeUntil(this.destroyNotifier$))
    .subscribe((resp) => {
      if (resp.code === 200) {
        const RESPONSE = resp.data;
        this.datosBitacora = RESPONSE;
      }
    });
  }
  getMercanciasProsec(): void {
    this.ampliacionServiciosService.getMercanciasProsec()
    .pipe(takeUntil(this.destroyNotifier$))
    .subscribe((resp) => {
      if (resp.code === 200) {
        const RESPONSE = resp.data;
        this.datosMercancias = RESPONSE;
      }
    });
  }
  getPlantasProsec(): void {
    this.ampliacionServiciosService.getPlantasProsec()
    .pipe(takeUntil(this.destroyNotifier$))
    .subscribe((resp) => {
      if (resp.code === 200) {
        const RESPONSE = resp.data;
        this.datosPlantas = RESPONSE;
      }
    });
  }
  getProductorProsec(): void {
    this.ampliacionServiciosService.getProductorIndirectoProsec()
    .pipe(takeUntil(this.destroyNotifier$))
    .subscribe((resp) => {
      if (resp.code === 200) {
        const RESPONSE = resp.data;
        this.datosProductor = RESPONSE;
      }
    });
  }
  getSectoresProsec(): void {
    this.ampliacionServiciosService.getSectoresProsec()
    .pipe(takeUntil(this.destroyNotifier$))
    .subscribe((resp) => {
      if (resp.code === 200) {
        const RESPONSE = resp.data;
        this.datosSector1 = RESPONSE;
      }
    });
  }
  


  /**
   * Inicializa el formulario con datos del store.
   * @method inicializarFormularioDesdeAlmacen
   */
  inicializarFormularioDesdeAlmacen(): void {
    this.ampliacionServiciosQuery.selectSolicitudTramite$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((datos: AmpliacionServiciosState) => {
          this.tramiteState = datos;
          this.datosSector = datos.datosSector;
          this.isSelectedRegla = datos.isSelectedRegla;
          this.ampliacionServiciosService.enviarDeberiaMostrar(this.isSelectedRegla);

          this.formularioInfoRegistro.patchValue({
            seleccionaLaModalidad: this.tramiteState.seleccionaLaModalidad,
            seleccionarRegla: this.tramiteState.aduanaDeIngresoSelecion.id,
            sector: this.tramiteState.sectorSelecion.id,
          });
        })
      )
      .subscribe();
  }

  /**
   * Inicializa el formulario de información de registro.
   * @method inicializarFormularioInfoRegistro
   */
  inicializarFormularioInfoRegistro(): void {
    this.formularioInfoRegistro = this.fb.group({
      seleccionaLaModalidad: [{ value: '', disabled: true }],
      seleccionarRegla: [{ value: '', disabled: false }],
      sector: [{ value: '', disabled: false }],
    });
  }

  /**
   * Obtiene la lista de reglas para selección.
   * @method obtenerReglaSelectList
   */
  obtenerReglaSelectList(): void {
    this.ampliacionServiciosService
      .obtenerReglaSelectList()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((data) => {
        const DATOS = data.data;
        this.tramite80206Store.setReglaSeleccionada(DATOS);
        this.ampliacionServiciosQuery.selectSolicitudTramite$
          .pipe(takeUntil(this.destroyNotifier$))
          .subscribe((sector: AmpliacionServiciosState) => {
            this.reglaSeleccionada = sector.reglaSeleccionada;
          });
      });
  }

  /**
   * Obtiene la lista de sectores para selección.
   * @method obtenerSectorSelectList
   */
  obtenerSectorSelectList(): void {
    this.ampliacionServiciosService
      .obtenerSectorSelectList()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((data) => {
        const DATOS = data.data;
        this.tramite80206Store.setSectorDesplegable(DATOS);
        this.ampliacionServiciosQuery.selectSolicitudTramite$
          .pipe(takeUntil(this.destroyNotifier$))
          .subscribe((sector: AmpliacionServiciosState) => {
            this.sectorDesplegable = sector.sectorDesplegable;
          });
      });
  }

  /**
   * Elimina servicios seleccionados del grid.
   * @method eliminarServiciosGrid
   */
  eliminarServiciosGrid(): void {
    const DATOS_IMMEX_ACTUALIZADOS = [...this.datosSector];
    this.domiciliosSeleccionados.forEach((selectedItem) => {
      const INDICE = DATOS_IMMEX_ACTUALIZADOS.findIndex(
        (item: Sector) => item.descripcion === selectedItem['descripcion']
      );
      if (INDICE !== -1) {
        DATOS_IMMEX_ACTUALIZADOS.splice(INDICE, 1);
      }
    });
    this.tramite80206Store.setDatosSector(DATOS_IMMEX_ACTUALIZADOS);
    this.domiciliosSeleccionados = [];
  }

  /**
   * Agrega servicios a la ampliación.
   * @method agregarServiciosAmpliacion
   */
  agregarServiciosAmpliacion(): void {
    const CUERPODATOS = {
      descripcion: this.recibioSector[0]?.descripcion,
      descripcionSector: this.recibioSector[0]?.descripcionSector,
    };
    this.tramite80206Store.setDatosSector([...this.datosSector, CUERPODATOS]);
  }

  /**
   * Método del ciclo de vida de Angular que se ejecuta al destruir el componente.
   * Limpia las suscripciones.
   * @method ngOnDestroy
   */
  ngOnDestroy(): void {
    this.ampliacionServiciosService.enviarDeberiaMostrar(true);
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }

  /**
   * Maneja los datos recibidos del componente hijo.
   * @method procesarDatosDelHijo
   * @param {Catalogo | Catalogo[]} data - Datos recibidos.
   */
  procesarDatosDelHijo(data: Catalogo | Catalogo[]): void {
    this.isSelectedRegla = true;
    this.ampliacionServiciosService.enviarDeberiaMostrar(this.isSelectedRegla);
    this.tramite80206Store.setIsSelectedRegla(this.isSelectedRegla);
    this.tramite80206Store.setAduanaDeIngresoSeleccion(data as Catalogo);
  }

  /**
   * Actualiza el sector seleccionado basado en la entrada del usuario.
   * @method cambioDeSector
   * @param {Catalogo | Catalogo[]} data - Datos del sector seleccionado.
   */
  cambioDeSector(data: Catalogo | Catalogo[]): void {
    this.recibioSector = Array.isArray(data) ? data : [data];
    this.tramite80206Store.setSectorSeleccion(data as Catalogo);
  }

  /**
   * Actualiza la lista de domicilios seleccionados.
   * @method seleccionarDomicilios
   * @param {Sector[]} domicilios - Domicilios seleccionados.
   */
  seleccionarDomicilios(domicilios: Sector[]): void {
    this.domiciliosSeleccionados = [...domicilios];
  }
}