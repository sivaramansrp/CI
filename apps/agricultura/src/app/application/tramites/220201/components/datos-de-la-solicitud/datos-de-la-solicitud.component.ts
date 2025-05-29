import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';

import { TEXTOS } from '../../constantes/certificado-zoosanitario.enum';

import {AlertComponent, Catalogo, CatalogoSelectComponent, ConfiguracionColumna, ConsultaioQuery, CrosslistComponent, InputRadioComponent, RespuestaCatalogos, SharedModule, TablaDinamicaComponent, TablaSeleccion, TituloComponent } from '@ng-mf/data-access-user';

import { HttpClient } from '@angular/common/http';

import { RadioOpcion } from '../../models/220201/certificado-zoosanitario.model';

import {Subject, map, skip, takeUntil } from 'rxjs';
import { CertificadoZoosanitarioServiceService } from '../../services/220201/certificado-zoosanitario.service';
import { CommonModule } from '@angular/common';
import { FilaSolicitud } from '../../models/220201/capturar-solicitud.model';
import { ZoosanitarioQuery } from '../../queries/220201/zoosanitario.query';


/**
 * @fileoverview Componente para la gestión del formulario de datos de la solicitud.
 * Este componente maneja la lógica y la presentación del formulario de datos de la solicitud,
 * incluyendo la inicialización, la obtención de datos y la gestión de los controles del formulario.
 * @module datosDeLaSolicitud --220201
 */

/**
 * Componente para el formulario de datos de la solicitud.
 * @class DatosDeLaSolicitudComponent --220201
 * @implements {OnInit}
 */
@Component({
  selector: 'app-datos-de-la-solicitud',
  templateUrl: './datos-de-la-solicitud.component.html',
  styleUrls: ['./datos-de-la-solicitud.component.scss'],
  standalone: true,
  imports:[SharedModule,
          CommonModule, TituloComponent,
              ReactiveFormsModule,
              CatalogoSelectComponent,
            CrosslistComponent,
          InputRadioComponent,
             AlertComponent,
        TablaDinamicaComponent]
})
export class DatosDeLaSolicitudComponent implements OnInit, OnDestroy,AfterViewInit {
  /**
   * Constantes de texto.
   * @property {string} TEXTOS
   */
  TEXTOS: string = TEXTOS;

  /**
   * Grupo de formularios principal.
   * @property {FormGroup} forma
   */
  forma!: FormGroup;

  /**
   * Rango de días para el select.
   * @property {string[]} selectRangoDias
   */
  selectRangoDias: string[] = [];

  /**
   * Indica si la sección es colapsable.
   * @property {boolean} colapsable
   */
  colapsable: boolean = false;

  /**
   * Grupo de formularios anidado para los datos de la solicitud.--220201
   * @property {FormGroup} datosDelaSolicitud
   */
  datosDelaSolicitud!: FormGroup;

  /**
   * Configuración para el select de aduana de ingreso. --220201
   * @property {Catalogo} aduanaDeIngreso
   */
  aduanaDeIngreso: Catalogo[] = [];

  /**
   * Configuración para el select de sanidad agropecuaria. --220201
   * @property {CatalogosSelect} sanidadAgropecuaria
   */
  sanidadAgropecuaria: Catalogo[] = [];

  /**
   * Configuración para el select de punto de inspección.--220201
   * @property {CatalogosSelect} puntoInspeccion
   */
  puntoInspeccion: Catalogo[] = [];

  /**
   * Configuración para el select de establecimiento TIF.--220201
   * @property {CatalogosSelect} establecimientoTIF
   */
  establecimientoTIF: Catalogo[] = [];

  /**
   * Configuración para el select de veterinario.--220201
   * @property {CatalogosSelect} veterinario
   */
  veterinario: Catalogo[] = [];
  id?: number;
  descripcion: string = '';
  tam?: string;
  dpi?: string

  /**
   * Configuración para el select de régimen.--220201
   * @property {CatalogosSelect} regimen
   */
  regimen: Catalogo[] = [];

  opcionDeBotonDeRadio: RadioOpcion[] = [
    {
      "label": "Animales Vivos",
      "value": "yes"
    },
    {
      "label": "Productos Subproductos",
      "value": "no"
    },
  ]
   cuerpoTabla: FilaSolicitud[] = [];

  mesaCuerpo: string[] = [];
tipoSeleccionsoli: TablaSeleccion = TablaSeleccion.UNDEFINED;
  tipoSeleccionsoliMercancias: TablaSeleccion = TablaSeleccion.CHECKBOX;
  configuracionColumnasoli: ConfiguracionColumna<FilaSolicitud>[] = [
    { encabezado: 'No. partida', clave: (fila) => fila.noPartida, orden: 1 },
    { encabezado: 'Tipo de requisito', clave: (fila) => fila.tipoRequisito, orden: 2 },
    { encabezado: 'Requisito', clave: (fila) => fila.requisito, orden: 3 },
    { encabezado: 'Número de Certificado Internacional', clave: (fila) => fila.numeroCertificadoInternacional, orden: 4 },
    { encabezado: 'Fracción arancelaria', clave: (fila) => fila.fraccionArancelaria, orden: 5 },
    { encabezado: 'Descripción de la fracción', clave: (fila) => fila.descripcionFraccion, orden: 6 },
    { encabezado: 'Nico', clave: (fila) => fila.nico, orden: 7 },
  ];

  private destroyNotifier$ = new Subject<void>();

  esFormularioSoloLectura:boolean = false;
  /**
   * Constructor del componente.
   * @constructor
   * @param {FormBuilder} fb - Servicio para la creación de formularios.
   * @param {HttpClient} httpServicios - Cliente HTTP para realizar solicitudes.--220201
   */
  constructor(private readonly fb: FormBuilder, private readonly httpServicios: HttpClient,
    private readonly certificadoZoosanitarioServices: CertificadoZoosanitarioServiceService,
    private readonly certificadoZoosanitarioQuery:ZoosanitarioQuery,
      private consultaQuery: ConsultaioQuery
  ) {
     this.obtenerListasDesplegables();

       
  }

  /**
   * Crea el grupo de formularios principal.
   * @method crearFormulario
   */
  crearFormulario(): void {
    this.forma = this.fb.group({
      datosDelaSolicitud: this.fb.group({}),
    });
  }

  /**
   * Inicializa el componente.
   * @method ngOnInit
   */
  ngOnInit(): void {
        this.crearFormulario();
    this.initActionFormBuild();
 


  }

   ngAfterViewInit(): void {
       this.datosDelaSolicitud.valueChanges.pipe(skip(1)).subscribe((changes) => {
      const FORMA_VALIDA_ACTUALIZADA = {
        dataDeLaSolicitud: false, 
      };
      if (this.datosDelaSolicitud.valid) {
        FORMA_VALIDA_ACTUALIZADA.dataDeLaSolicitud = true;
      }
      this.certificadoZoosanitarioServices.actualizarFormaValida(FORMA_VALIDA_ACTUALIZADA);
    });
     this.consultaQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.esFormularioSoloLectura = seccionState.readonly;
      if(this.esFormularioSoloLectura){
    this.datosDelaSolicitud.disable();
      }
        })
      )
      .subscribe();
  }
  /**
   * Inicializa el grupo de formularios anidado para los datos de la solicitud.
   * @method initActionFormBuild
   */
  initActionFormBuild() { 
    this.datosDelaSolicitud = this.fb.group({
      tipoMercancia: ['no', Validators.required],
      aduanaIngreso: ['', Validators.required],
      oficinaInspeccion: ['', Validators.required],
      puntoInspeccion: ['', Validators.required],
      claveUCON: [''],
      establecimientoTIFs: [''],
      nombreVeterinario: [''],
      numeroGuia: [''],
      certficacion: [''],
      regimen: ['', Validators.required],
    });
        this.certificadoZoosanitarioQuery.seleccionarDatosSolicitud$.pipe(takeUntil(this.destroyNotifier$)).subscribe((datosDeLaSolicitud) => {
      if (datosDeLaSolicitud) {
        this.datosDelaSolicitud.patchValue(datosDeLaSolicitud);
      }
    });
    this.forma.setControl('datosDelaSolicitud', this.datosDelaSolicitud);
  }

  /**
   * Alterna el estado colapsable de la sección del formulario.
   * @method mostrar_colapsable
   */
  mostrar_colapsable() {
    this.colapsable = !this.colapsable;
  }

  /**
   * Obtiene las listas desplegables.
   * @method obtenerListasDesplegables
   */
  obtenerListasDesplegables() {
    this.obtenerIngresoSelectList();
    this.obtenerSanidadAgropecuariaList();
    this.obtenerPuntoInspeccionList();
    this.obtenerEstablecimientoList();
    this.obtenerVeterinarioList();
    this.obtenerRegimenList();
  }

  /**
   * Obtiene la lista para el select de aduana de ingreso.
   * @method obtenerIngresoSelectList
   */
  obtenerIngresoSelectList() {
    this.httpServicios.get<RespuestaCatalogos>('../../../../../assets/json/220201/aduana_de_ingreso.json').pipe(takeUntil(this.destroyNotifier$)).subscribe((data): void => {
      const DATOS = data?.data;
      this.aduanaDeIngreso = DATOS;
    });
  }

  /**
   * Obtiene la lista para el select de sanidad agropecuaria.
   * @method obtenerSanidadAgropecuariaList
   */
  obtenerSanidadAgropecuariaList() {
    this.httpServicios.get<RespuestaCatalogos>('../../../../../assets/json/220201/oficina_de_inspeccion.json').pipe(takeUntil(this.destroyNotifier$)).subscribe((data): void => {
      const DATOS = data?.data;
      this.sanidadAgropecuaria = DATOS;
    });
  }

  /**
   * Obtiene la lista para el select de punto de inspección.
   * @method obtenerPuntoInspeccionList
   */
  obtenerPuntoInspeccionList() {
    this.httpServicios.get<RespuestaCatalogos>('../../../../../assets/json/220201/punto.json').pipe(takeUntil(this.destroyNotifier$)).subscribe((data): void => {
      const DATOS = data?.data;
      this.puntoInspeccion = DATOS;
    });
  }

  /**
   * Obtiene la lista para el select de establecimiento.
   * @method obtenerEstablecimientoList
   */
  obtenerEstablecimientoList() {
    this.httpServicios.get<RespuestaCatalogos>('../../../../../assets/json/220201/establecimiento.json').pipe(takeUntil(this.destroyNotifier$)).subscribe((data): void => {
      const DATOS = data?.data;
      this.establecimientoTIF = DATOS;
    });
  }

  /**
   * Obtiene la lista para el select de veterinario.
   * @method obtenerVeterinarioList
   */

  obtenerVeterinarioList() {
    this.httpServicios.get<RespuestaCatalogos>('../../../../../assets/json/220201/nombre.json').pipe(takeUntil(this.destroyNotifier$)).subscribe((data): void => {
      const DATOS = data?.data;
      this.veterinario = DATOS;
    });
  }

  /**
   * Obtiene la lista para el select de régimen.
   * @method obtenerRegimenList
   */
  obtenerRegimenList() {
    this.httpServicios.get<RespuestaCatalogos>('../../../../../assets/json/220201/regimen.json').pipe(takeUntil(this.destroyNotifier$)).subscribe(data => {
      const DATOS = data?.data;
      this.regimen = DATOS;
    });
  }
  
    /**
     * @description Actualiza los datos almacenados en el store.
     * @method setValoresStore
     * @param {FormGroup} form - El formulario a obtener los valores.
     * @param {string} campo - El nombre del campo del formulario a obtener.
     */
    setValoresStore(
    ): void {
      const VALOR = this.datosDelaSolicitud.value;
      this.certificadoZoosanitarioServices.updateDatosDeLaSolicitud(VALOR);
    }

  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}