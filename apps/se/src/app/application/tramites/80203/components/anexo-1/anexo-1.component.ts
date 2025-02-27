/**
 * @component Anexo1Component
 * @description Este componente es responsable de manejar el formulario de registro IMMEX.
 * Incluye la lógica para la obtención de datos y la gestión de formularios.
 */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TituloComponent } from 'libs/shared/data-access-user/src/tramites/components/titulo/titulo.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { TablaDinamicaComponent } from 'libs/shared/data-access-user/src/tramites/components/tabla-dinamica/tabla-dinamica.component';
import { PERMISO_IMMEX, FRACCION_ARANCELARIA, NICO } from 'libs/shared/data-access-user/src/tramites/constantes/immex-registro-de-solicitud-modality.enums';
import { PermisoImmexDatosService } from 'libs/shared/data-access-user/src/core/services/80203/immex/permiso-immex-datos.service';
import { Catalogo, RespuestaCatalogos } from 'libs/shared/data-access-user/src/core/models/shared/catalogos.model';
import { CatalogoSelectComponent } from 'libs/shared/data-access-user/src/tramites/components/catalogo-select/catalogo-select.component';
import { NicoService } from 'libs/shared/data-access-user/src/core/services/80203/nico/nico.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { immexRegistroform, IMMEX_SERVICIO, immexInfo, FRACCION_EXPORTACION, fraccionInfo, NICO_TABLA, nicoInfo } from 'libs/shared/data-access-user/src/core/models/80203/immex-registro-de-solicitud-modality.model';
import { ConfiguracionColumna } from 'libs/shared/data-access-user/src/core/models/shared/configuracion-columna.model';
import { TablaSeleccion } from 'libs/shared/data-access-user/src/core/enums/tabla-seleccion.enum';

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
  tableColumnsPermiso = PERMISO_IMMEX;
  tableColumnsFraccion = FRACCION_ARANCELARIA;
  tableColumnsNico = NICO;

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
  ngOnDestroy(): void {
    // Guarde el estado del formulario si es necesario
    localStorage.setItem('exportacionForm', JSON.stringify(this.immexRegistroform.get('exportacionForm')?.value));
    localStorage.setItem('importacionForm', JSON.stringify(this.immexRegistroform.get('importacionForm')?.value));
  }
}
