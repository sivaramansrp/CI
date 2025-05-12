import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Component, OnDestroy, OnInit } from '@angular/core';

import { TEXTOS } from '../../constantes/certificado-zoosanitario.enum';

import { Catalogo, RespuestaCatalogos } from '@ng-mf/data-access-user';

import { HttpClient } from '@angular/common/http';

import { RadioOpcion } from '../../models/220201/certificado-zoosanitario.model';

import { CertificadoZoosanitarioServiceService } from '../../services/220201/certificado-zoosanitario.service';
import { skip } from 'rxjs';

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
  styleUrls: ['./datos-de-la-solicitud.component.scss']
})
export class DatosDeLaSolicitudComponent implements OnInit, OnDestroy {
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
  selectedValue: string = 'no';

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
  tableData = {
    header: [
      "No. partida",
      "Tipo de requisito",
      "Requisito",
      "Número de Certificado Internacional",
      "Fracción arancelaria",
      "Descripción de la fracción",
      "Nico",
    ],


  };

  encabezadoDeTabla: string[] = this.tableData.header;
  mesaCuerpo: string[] = [];



  /**
   * Constructor del componente.
   * @constructor
   * @param {FormBuilder} fb - Servicio para la creación de formularios.
   * @param {HttpClient} httpServicios - Cliente HTTP para realizar solicitudes.--220201
   */
  constructor(private readonly fb: FormBuilder, private readonly httpServicios: HttpClient,
    private readonly certificadoZoosanitarioServices: CertificadoZoosanitarioServiceService
  ) {
    this.crearFormulario();
    this.initActionFormBuild();
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
    this.datosDelaSolicitud.valueChanges.pipe(skip(1)).subscribe((changes) => {
      const FORMA_VALIDA_ACTUALIZADA = {
        dataDeLaSolicitud: false, // Example boolean to update
      };
      if (this.datosDelaSolicitud.valid) {
        FORMA_VALIDA_ACTUALIZADA.dataDeLaSolicitud = true;
      }
      this.certificadoZoosanitarioServices.actualizarFormaValida(FORMA_VALIDA_ACTUALIZADA);
    });
    this.obtenerListasDesplegables();
  }

  /**
   * Inicializa el grupo de formularios anidado para los datos de la solicitud.
   * @method initActionFormBuild
   */
  initActionFormBuild() {
    this.datosDelaSolicitud = this.fb.group({
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
    this.httpServicios.get<RespuestaCatalogos>('../../../../../assets/json/220201/aduana_de_ingreso.json').subscribe((data): void => {
      const DATOS = data?.data;
      this.aduanaDeIngreso = DATOS;
    });
  }

  /**
   * Obtiene la lista para el select de sanidad agropecuaria.
   * @method obtenerSanidadAgropecuariaList
   */
  obtenerSanidadAgropecuariaList() {
    this.httpServicios.get<RespuestaCatalogos>('../../../../../assets/json/220201/oficina_de_inspeccion.json').subscribe((data): void => {
      const DATOS = data?.data;
      this.sanidadAgropecuaria = DATOS;
    });
  }

  /**
   * Obtiene la lista para el select de punto de inspección.
   * @method obtenerPuntoInspeccionList
   */
  obtenerPuntoInspeccionList() {
    this.httpServicios.get<RespuestaCatalogos>('../../../../../assets/json/220201/punto.json').subscribe((data): void => {
      const DATOS = data?.data;
      this.puntoInspeccion = DATOS;
    });
  }

  /**
   * Obtiene la lista para el select de establecimiento.
   * @method obtenerEstablecimientoList
   */
  obtenerEstablecimientoList() {
    this.httpServicios.get<RespuestaCatalogos>('../../../../../assets/json/220201/establecimiento.json').subscribe((data): void => {
      const DATOS = data?.data;
      this.establecimientoTIF = DATOS;
    });
  }

  /**
   * Obtiene la lista para el select de veterinario.
   * @method obtenerVeterinarioList
   */

  obtenerVeterinarioList() {
    this.httpServicios.get<RespuestaCatalogos>('../../../../../assets/json/220201/nombre.json').subscribe((data): void => {
      const DATOS = data?.data;
      this.veterinario = DATOS;
    });
  }

  /**
   * Obtiene la lista para el select de régimen.
   * @method obtenerRegimenList
   */
  obtenerRegimenList() {
    this.httpServicios.get<RespuestaCatalogos>('../../../../../assets/json/220201/regimen.json').subscribe((data): void => {
      const DATOS = data?.data;
      this.regimen = DATOS;
    });
  }
  ngOnDestroy(): void {

    this.certificadoZoosanitarioServices.updateDatosDeLaSolicitud(this.datosDelaSolicitud.value);
  }
}