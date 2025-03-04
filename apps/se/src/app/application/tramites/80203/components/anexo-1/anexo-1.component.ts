/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable no-empty-function */
/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * @component Anexo1Component
 * @description Este componente es responsable de manejar el formulario de registro IMMEX.
 * Incluye la lógica para la obtención de datos y la gestión de formularios.
 */
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

import { Component } from '@angular/core';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';

import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Validators } from '@angular/forms';

import { Catalogo } from '@ng-mf/data-access-user';
import { CatalogoSelectComponent } from '@ng-mf/data-access-user';
import { ConfiguracionColumna } from '@ng-mf/data-access-user';
import { TablaDinamicaComponent } from '@ng-mf/data-access-user';
import { TablaSeleccion } from '@ng-mf/data-access-user';
import { TituloComponent } from '@ng-mf/data-access-user';

import { FRACCION_EXPORTACION } from '../../modelos/immex-registro-de-solicitud-modality.model';
import { IMMEX_SERVICIO } from '../../modelos/immex-registro-de-solicitud-modality.model';
import { NICO_TABLA } from '../../modelos/immex-registro-de-solicitud-modality.model';
import { fraccionInfo } from '../../modelos/immex-registro-de-solicitud-modality.model';
import { immexInfo } from '../../modelos/immex-registro-de-solicitud-modality.model';
import { nicoInfo } from '../../modelos/immex-registro-de-solicitud-modality.model';

import { NicoService } from '../../servicios/nico/nico.service';
import { PermisoImmexDatosService } from '../../servicios/immex/permiso-immex-datos.service';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'anexo-1',
  templateUrl: './anexo-1.component.html',
  styleUrls: ['./anexo-1.component.scss'],
  standalone: true,
  imports: [
    TituloComponent,
    CommonModule,
    ReactiveFormsModule,
    TablaDinamicaComponent,
    CatalogoSelectComponent,
    
  ]
})
export class Anexo1Component implements OnInit, OnDestroy { 
  immexRegistroform!: FormGroup;


  /**
   * Tipo de selección de la tabla.
   * @type {TablaSeleccion}
   */
  tablaSeleccionRadio: TablaSeleccion = TablaSeleccion.RADIO;
  tablaSeleccionCheckbox: TablaSeleccion = TablaSeleccion.CHECKBOX;

// Mesa IMMEX
  /**
   * Configuración de las columnas de la tabla.
   * @type {ConfiguracionColumna<immexInfo>[]}
   */
  permisoImmexTabla: ConfiguracionColumna<immexInfo>[] = IMMEX_SERVICIO;
    /**
   * Datos de los servicios.
   * @type {immexInfo[]}
   */
    ImmexDatos: immexInfo[] = [
      {
        IMMEX_Columna_1: '01',
        IMMEX_Columna_2: 'IM23377137',
        IMMEX_Columna_3: '72012001',
        IMMEX_Columna_4: 'Fundición en bruto sin alear con un contenido de fosforo superior al 0.5% en peso"',
        IMMEX_Columna_5: 'Kilogramo',
        IMMEX_Columna_6: '10',
        IMMEX_Columna_7: '28/12/203',
        estatus: true
      }
    ];

  // Mesa FRACCION EXPORTACION
  /**
   * Configuración de las columnas de la tabla.
   * @type {ConfiguracionColumna<fraccionInfo>[]}
   */
  fraccionExportacionTabla: ConfiguracionColumna<fraccionInfo>[] = FRACCION_EXPORTACION;
    /**
   * Datos de los servicios.
   * @type {fraccionInfo[]}
   */
    fraccionTablaDatos: fraccionInfo[] = [
      {
        FRACCION_Columna_1: '01',
        FRACCION_Columna_2: '72012001',
        FRACCION_Columna_3: '72012001',
        FRACCION_Columna_4: 'Kilogramo',
        FRACCION_Columna_5: 'Fundición en bruto sin alear con un contenido de fosforo superior al 0.5% en peso',
        FRACCION_Columna_6: 'FRACC EXP 1 SENASICA',
        estatus: true
      }
    ];

  // Mesa NICO
  /**
   * Configuración de las columnas de la tabla.
   * @type {ConfiguracionColumna<nicoInfo>[]}
   */
  nicoTabla: ConfiguracionColumna<nicoInfo>[] = NICO_TABLA;
    /**
   * Datos de los servicios.
   * @type {nicoInfo[]}
   */
    nicoTablaDatos: nicoInfo[] = [
      {
        NICO_Columna_1: '01',
        NICO_Columna_2: 'Fundición en bruto sin alear con un contenido de fosforo superior al 0.5% en peso',
        estatus: true
      }
    ];

  /**
   * Subject para manejar la desuscripción de observables.
   * @type {Subject<void>}
   */
  private unsubscribe$ = new Subject<void>();

  /**
   * @property {any[]} permisoImmexDatos - Array de datos permiso immex.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  permisoImmexDatos: any[] = [];
  
  /**
   * @property {any[]} fraccionDatos - Array de datos permiso immex.
   */
  fraccionDatos: any[] = [];
  
  /**
   * @property {any[]} nicoDatos - Array de datos permiso immex.
   */
  nicoDatos: any[] = [];
  
  /**
   * Configuración para el select de unidad de medida.
   * @property {CatalogosSelect} nico
   */
  nico: Catalogo[] = [];
  
  showFraccionExport: boolean = false;
  showProductoImport: boolean = false;
  showCommodityImport: boolean = false;

  /**
   * @constructor
   * @param {FormBuilder} fb - Constructor de formularios.
   * @param {PermisoImmexDatosService} permisoImmexDatosService - Servicio para obtener datos de permiso IMMEX.
   * @param {HttpClient} httpServicios - Cliente HTTP para realizar solicitudes.
   * @param {NicoService} nicoService - Servicio para obtener datos de NICO.
   */
  constructor(
    private fb: FormBuilder,
    private readonly permisoImmexDatosService: PermisoImmexDatosService,
    private readonly httpServicios: HttpClient,
    private readonly nicoService: NicoService
  ) { }
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  /**
   * @returns {void}
   * @method ngOnInit
   * @description Inicializa el componente y obtiene los datos de los fabricantes.
   */

  ngOnInit(): void {
    this.immexRegistroform = this.fb.group({
      exportacionForm: this.fb.group({
        permisoImmexDatos: [[]],
        fraccionDatos: [[]],
        nicoDatos: ['', Validators.required],
        fraccionArancelariaExportacion: ['', Validators.required],
        productoArancelariaExportacion: ['', Validators.required],
        fraccionArancelariaDesc: ['', Validators.required],
        productoDescExportacion: ['', Validators.required],
        FraccionDescExportacion: ['', Validators.required],
        exportacionDescExportacion: ['', Validators.required],
      }),
      importacionForm: this.fb.group({
        permisoImmexDatos: [[]],
        fraccionDatos: [[]],
        nicoDatos: ['', Validators.required],
        commodityImportacion: ['', Validators.required],
        commodityDescImportacion: ['', Validators.required],
        commodityNicoDescImportacion: ['', Validators.required],
        candiadAnual: ['', Validators.required],
        capacidadPeriodo: ['', Validators.required],
        candidadPorPeriodo: ['', Validators.required],
      })
    });
    this.fetchData();
    this.obtenerListasDesplegables();
    this.disableFormControls();
  }

  /**
   * @method fetchData
   * @description Obtiene los datos de los fabricantes desde el servicio.
   */
  fetchData(): void {
    this.permisoImmexDatosService.getDatos().subscribe({
      next: (response: any) => {
        if (response && Array.isArray(response.permisoImmexDatos) && Array.isArray(response.fraccionDatos) && Array.isArray(response.nicoDatos)) {
          this.permisoImmexDatos = response.permisoImmexDatos.map((item: any) => {
            return { tbodyData: item.tbodyData };
          });

          this.fraccionDatos = response.fraccionDatos.map((item: any) => {
            return { tbodyData: item.tbodyData };
          });

          this.nicoDatos = response.nicoDatos.map((item: any) => {
            return { tbodyData: item.tbodyData };
          });

          if (this.permisoImmexDatos.length > 0) {
            this.immexRegistroform.get('exportacionForm')?.patchValue({
              fraccionArancelariaExportacion: this.permisoImmexDatos[0].tbodyData[2]
            });
          }
          if (this.fraccionDatos.length > 0) {
            this.immexRegistroform.get('exportacionForm')?.patchValue({
              productoArancelariaExportacion: this.fraccionDatos[0].tbodyData[1],
              productoDescExportacion: this.fraccionDatos[0].tbodyData[4],
              FraccionDescExportacion: this.fraccionDatos[0].tbodyData[4],
              exportacionDescExportacion: this.fraccionDatos[0].tbodyData[4], 
            });
          }
          if (this.permisoImmexDatos.length > 0) {
            this.immexRegistroform.get('importacionForm')?.patchValue({
              commodityImportacion: this.permisoImmexDatos[0].tbodyData[2],
              commodityDescImportacion: this.permisoImmexDatos[0].tbodyData[3],
              commodityNicoDescImportacion: this.permisoImmexDatos[0].tbodyData[3],
            });
          }
        } else {
          console.error('La respuesta de la API no tiene el formato esperado:', response);
          this.permisoImmexDatos = [];
          this.fraccionDatos = [];
          this.nicoDatos = [];
        }
      },
      error: (error: any) => {
        console.error('Error al obtener los datos:', error);
        this.permisoImmexDatos = [];
        this.fraccionDatos = [];
        this.nicoDatos = [];
      },
    });
    this.permisoImmexDatosService.getDatos()
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe((data) => {
      this.immexRegistroform.patchValue(data);
    });
  }

  /**
   * Obtiene las listas desplegables.
   * @method obtenerListasDesplegables
   */
  obtenerListasDesplegables() {
    this.obtenerIngresoSelectList();
  }

  /**
   * Obtiene la lista para el select de unidad de medida.
   * @method obtenerIngresoSelectList
   */
  obtenerIngresoSelectList() {
    this.nicoService.obtenerMenuDesplegable('nico.json').subscribe(data => {
      this.nico = data as Catalogo[];
    });
  }

  /**
   * Muestra la sección de fracción de exportación.
   * @method showFraccionExportacion
   */
  showFraccionExportacion(): void {
    this.showFraccionExport = true; 
  }

  /**
   * Muestra la sección de producto de importación.
   * @method showProductoImportacion
   */
  showProductoImportacion(): void {
    this.showProductoImport = true; 
  }

  /**
   * Muestra la sección de commodity de importación.
   * @method showCommodityImportacion
   */
  showCommodityImportacion(): void {
    this.showCommodityImport = true; 
  }
  disableFormControls(): void {
    this.immexRegistroform.get('exportacionForm.productoArancelariaExportacion')?.disable();
    this.immexRegistroform.get('exportacionForm.productoDescExportacion')?.disable();
    this.immexRegistroform.get('importacionForm.commodityImportacion')?.disable();
    this.immexRegistroform.get('importacionForm.commodityDescImportacion')?.disable();
    this.immexRegistroform.get('importacionForm.commodityNicoDescImportacion')?.disable();
  }
  /**
   * @method ngOnDestroy
   * @description Guarda el estado del formulario antes de destruir el componente.
   */

}