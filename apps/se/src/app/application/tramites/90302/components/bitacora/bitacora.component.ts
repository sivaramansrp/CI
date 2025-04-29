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
  CONFIGURACION_BITCORA,
  CONFIGURACION_MERCANCIAS_A_PRODUCIR,
  CONFIGURACION_PLANTAS,
  CONFIGURACION_PRODUCTOR_INDIRECTO,
  CONFIGURACION_SECTOR,
  CONFIGURACION_SECTOR1,
} from '../../constantes/modificacion.constants';
import { Catalogo, TablaSeleccion } from '@ng-mf/data-access-user';

import {
  Bitacora,
  MercanciasAProducir,
  Plantas,
  ProductorIndirecto,
  Sector1,
} from '../../models/datos-info.model';
import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { OnDestroy, OnInit } from '@angular/core';
import { AmpliacionServiciosQuery } from '../../estados/tramite90302.query';
import { AmpliacionServiciosService } from '../../services/ampliacion-servicios.service';
import { AmpliacionServiciosState } from '../../estados/tramite90302.store';
import { ConfiguracionColumna } from '../../models/configuracion-columna.model';
import { HttpClient } from '@angular/common/http';
import { Sector } from '../../models/datos-info.model';
import { takeUntil } from 'rxjs/operators';

import { Subject } from 'rxjs';
import { Tramite90302Store } from '../../estados/tramite90302.store';

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
  configuracionTablaSector: ConfiguracionColumna<Sector>[] =
    CONFIGURACION_SECTOR;

  /**
   * @variable configuracionTablaBitacora
   * @type {ConfiguracionColumna<Bitacora>[]}
   * @description Configuración de la tabla para la bitácora. Define las columnas y su configuración
   * utilizando la constante `CONFIGURACION_BITCORA`.
   *
   * @see CONFIGURACION_BITCORA
   */
  configuracionTablaBitacora: ConfiguracionColumna<Bitacora>[] =
    CONFIGURACION_BITCORA;

  /**
   * Configuración de la tabla para mercancías a producir.
   * @variable configuracionTablaMercancias
   * @type {ConfiguracionColumna<MercanciasAProducir>[]}
   * @description Define la configuración de las columnas de la tabla para las mercancías a producir,
   * utilizando la constante `CONFIGURACION_MERCANCIAS_A_PRODUCIR`.
   *
   * @see CONFIGURACION_MERCANCIAS_A_PRODUCIR
   */
  configuracionTablaMercancias: ConfiguracionColumna<MercanciasAProducir>[] =
    CONFIGURACION_MERCANCIAS_A_PRODUCIR;

  /**
   * @description Configuración de la tabla para mostrar las plantas.
   * Esta propiedad utiliza una configuración predefinida que se encuentra en `CONFIGURACION_PLANTAS`.
   *
   * @type {ConfiguracionColumna<Plantas>[]} - Arreglo de configuraciones de columnas específicas para las plantas.
   */
  configuracionTablaPlantas: ConfiguracionColumna<Plantas>[] =
    CONFIGURACION_PLANTAS;

  /**
   * @var configuracionTablaProductor
   * @type {ConfiguracionColumna<ProductorIndirecto>[]}
   * @description Configuración de la tabla para los productores indirectos.
   * Contiene las columnas y sus configuraciones específicas definidas en `CONFIGURACION_PRODUCTOR_INDIRECTO`.
   * @see CONFIGURACION_PRODUCTOR_INDIRECTO
   */
  configuracionTablaProductor: ConfiguracionColumna<ProductorIndirecto>[] =
    CONFIGURACION_PRODUCTOR_INDIRECTO;

  /**
   * @variable configuracionTablaSector1
   * @type {ConfiguracionColumna<Sector1>[]}
   * @description Configuración de la tabla para el sector 1. Este arreglo contiene las columnas
   * definidas para mostrar los datos específicos del sector 1 en la tabla.
   * @see CONFIGURACION_SECTOR1 - Configuración predeterminada de las columnas para el sector 1.
   */
  configuracionTablaSector1: ConfiguracionColumna<Sector1>[] =
    CONFIGURACION_SECTOR1;

  /**
   * Lista de datos de sectores.
   * @property {Sector[]} datosSector
   */
  datosSector: Sector[] = [];

  /**
   * @property {Bitacora[]} datosBitacora
   * @description Arreglo que almacena los datos de la bitácora.
   * @memberof BitacoraComponent
   */
  datosBitacora: Bitacora[] = [];

  /**
   * @property {MercanciasAProducir[]} datosMercancias
   * @description Arreglo que almacena los datos de las mercancías a producir.
   * @memberof BitacoraComponent
   */
  datosMercancias: MercanciasAProducir[] = [];

  /**
   * @property {Plantas[]} datosPlantas
   * @description Arreglo que almacena los datos de las plantas.
   * @memberof BitacoraComponent
   */
  datosPlantas: Plantas[] = [];

  /**
   * @property {ProductorIndirecto[]} datosProductor
   *
   * Arreglo que almacena información sobre los productores indirectos.
   * Este arreglo se utiliza para gestionar y mostrar los datos relacionados
   * con los productores indirectos en el componente de bitácora.
   */
  datosProductor: ProductorIndirecto[] = [];

  /**
   * @name datosSector1
   * @type {Sector1[]}
   * @description Arreglo que contiene los datos relacionados con el Sector 1.
   * @memberof BitacoraComponent
   */
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
    private tramite80206Store: Tramite90302Store,
    private readonly httpServicios: HttpClient
  ) {
    this.inicializarFormularioInfoRegistro();
  }

  /**
   * Método de inicialización del componente.
   * @method ngOnInit
   */
  ngOnInit(): void {
    this.getBitacoraProsec();
    this.getMercanciasProsec();
    this.getPlantasProsec();
    this.getProductorProsec();
    this.getSectoresProsec();
  }

  /**
   * @method getBitacoraProsec
   * @description Obtiene la bitácora de PROSEC desde el servicio `ampliacionServiciosService`
   * y actualiza la propiedad `datosBitacora` con los datos recibidos si la respuesta es exitosa.
   * @returns {void}
   * @example
   * // Llamar al método para obtener la bitácora de PROSEC
   * this.getBitacoraProsec();
   * @remarks
   * Este método utiliza `takeUntil` para manejar la suscripción y asegurarse de que se limpie
   * cuando el componente sea destruido. La respuesta se valida verificando que el código sea 200.
   */
  getBitacoraProsec(): void {
    this.ampliacionServiciosService
      .getBitacoraProsec()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((resp) => {
        if (resp.code === 200) {
          const RESPONSE = resp.data;
          this.datosBitacora = RESPONSE;
        }
      });
  }

  /**
   * @method getMercanciasProsec
   * @description Obtiene la lista de mercancías PROSEC desde el servicio de ampliación de servicios.
   * Suscribe a los datos recibidos y los asigna a la propiedad `datosMercancias` si la respuesta es exitosa.
   *
   * @returns {void} Este método no retorna ningún valor.
   *
   * @example
   * // Uso del método
   * this.getMercanciasProsec();
   *
   * @memberof BitacoraComponent
   */
  getMercanciasProsec(): void {
    this.ampliacionServiciosService
      .getMercanciasProsec()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((resp) => {
        if (resp.code === 200) {
          const RESPONSE = resp.data;
          this.datosMercancias = RESPONSE;
        }
      });
  }

  /**
   * @description Obtiene la lista de plantas Prosec desde el servicio `ampliacionServiciosService`.
   * La respuesta se suscribe y, si el código de respuesta es 200, los datos se asignan a `datosPlantas`.
   *
   * @method getPlantasProsec
   * @returns {void} Este método no devuelve ningún valor.
   *
   * @example
   * // Ejemplo de uso:
   * this.getPlantasProsec();
   *
   * @memberof BitacoraComponent
   */
  getPlantasProsec(): void {
    this.ampliacionServiciosService
      .getPlantasProsec()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((resp) => {
        if (resp.code === 200) {
          const RESPONSE = resp.data;
          this.datosPlantas = RESPONSE;
        }
      });
  }

  /**
   * @method getProductorProsec
   * @description Obtiene los datos del productor indirecto PROSEC desde el servicio de ampliación de servicios.
   * Suscribe a la respuesta del servicio y asigna los datos obtenidos a la propiedad `datosProductor` si el código de respuesta es 200.
   * @returns {void}
   * @memberof BitacoraComponent
   */
  getProductorProsec(): void {
    this.ampliacionServiciosService
      .getProductorIndirectoProsec()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((resp) => {
        if (resp.code === 200) {
          const RESPONSE = resp.data;
          this.datosProductor = RESPONSE;
        }
      });
  }

  /**
   * @method getSectoresProsec
   * @description Obtiene los sectores PROSEC desde el servicio `ampliacionServiciosService` y los asigna a la propiedad `datosSector1`.
   * @returns {void}
   * @example
   * // Ejemplo de uso:
   * this.getSectoresProsec();
   *
   * @remarks
   * Este método utiliza un observable para suscribirse a los datos proporcionados por el servicio.
   * La suscripción se gestiona con `takeUntil` para evitar fugas de memoria al destruir el componente.
   *
   * @property {any[]} datosSector1 - Propiedad donde se almacenan los datos obtenidos del servicio.
   *
   * @throws {Error} Si el código de respuesta no es 200, no se realiza ninguna acción.
   */
  getSectoresProsec(): void {
    this.ampliacionServiciosService
      .getSectoresProsec()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((resp) => {
        if (resp.code === 200) {
          const RESPONSE = resp.data;
          this.datosSector1 = RESPONSE;
        }
      });
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
   * Actualiza la lista de domicilios seleccionados.
   * @method seleccionarDomicilios
   * @param {Sector[]} domicilios - Domicilios seleccionados.
   */
  seleccionarDomicilios(domicilios: Sector[]): void {
    this.domiciliosSeleccionados = [...domicilios];
  }

  /**
   * Método del ciclo de vida de Angular que se ejecuta al destruir el componente.
   * Limpia las suscripciones.
   * @method ngOnDestroy
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
