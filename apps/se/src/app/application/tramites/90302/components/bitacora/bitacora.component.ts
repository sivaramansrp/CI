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
   * Método del ciclo de vida de Angular que se ejecuta al destruir el componente.
   * Limpia las suscripciones.
   * @method ngOnDestroy
   */
  ngOnDestroy(): void {
    
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
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