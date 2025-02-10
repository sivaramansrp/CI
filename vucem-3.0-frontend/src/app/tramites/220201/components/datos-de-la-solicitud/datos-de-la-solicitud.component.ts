import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Component, OnInit } from '@angular/core';

import { TEXTOS } from '../../../../shared/constantes/certificado-zoosanitario.enum';

import { CatalogosSelect } from '../../../../core/models/shared/components.model';
import { RespuestaCatalogos } from '../../../../core/models/shared/catalogos.model';

import { HttpClient } from '@angular/common/http';

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
export class DatosDeLaSolicitudComponent implements OnInit {
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
   * @property {CatalogosSelect} aduanaDeIngreso
   */
  aduanaDeIngreso: CatalogosSelect = {
    labelNombre: 'Aduana de ingreso',
    required: true,
    primerOpcion: 'Selecciona una Aduana de ingreso',
    catalogos: [],
  };

  /**
   * Configuración para el select de sanidad agropecuaria. --220201
   * @property {CatalogosSelect} sanidadAgropecuaria
   */
  sanidadAgropecuaria: CatalogosSelect = {
    labelNombre: 'Oficina de inspección de sanidad Agropecuaria',
    required: true,
    primerOpcion: 'Selecciona una Agropecuaria',
    catalogos: [],
  };

  /**
   * Configuración para el select de punto de inspección.--220201
   * @property {CatalogosSelect} puntoInspeccion
   */
  puntoInspeccion: CatalogosSelect = {
    labelNombre: 'Punto de inspección',
    required: true,
    primerOpcion: 'Selecciona un Punto',
    catalogos: [],
  };

  /**
   * Configuración para el select de establecimiento TIF.--220201
   * @property {CatalogosSelect} establecimientoTIF
   */
  establecimientoTIF: CatalogosSelect = {
    labelNombre: `Establecimiento TIF `,
    required: true,
    primerOpcion: 'Selecciona un Establecimiento',
    catalogos: [],
  };

  /**
   * Configuración para el select de veterinario.--220201
   * @property {CatalogosSelect} veterinario
   */
  veterinario: CatalogosSelect = {
    labelNombre: 'Nombre del médico veterinario',
    required: true,
    primerOpcion: 'Selecciona un Nombre',
    catalogos: [],
  };

  /**
   * Configuración para el select de régimen.--220201
   * @property {CatalogosSelect} regimen
   */
  regimen: CatalogosSelect = {
    labelNombre: 'Régimen',
    required: true,
    primerOpcion: 'Selecciona un Régimen',
    catalogos: [],
  };

  /**
   * Constructor del componente.
   * @constructor
   * @param {FormBuilder} fb - Servicio para la creación de formularios.
   * @param {HttpClient} httpServicios - Cliente HTTP para realizar solicitudes.--220201
   */
  constructor(private readonly fb: FormBuilder, private readonly httpServicios: HttpClient) {
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
      claveUCON: ['', [Validators.required]],
      establecimientoTIF: ['', Validators.required],
      nombreVeterinario: ['', Validators.required],
      numeroGuia: [''],
      certficacion: [''],
      regimen: ['', Validators.required]
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
      const datos = data?.data;
      this.aduanaDeIngreso['catalogos'] = datos;
    });
  }

  /**
   * Obtiene la lista para el select de sanidad agropecuaria.
   * @method obtenerSanidadAgropecuariaList
   */
  obtenerSanidadAgropecuariaList() {
    this.httpServicios.get<RespuestaCatalogos>('../../../../../assets/json/220201/oficina_de_inspeccion.json').subscribe((data): void => {
      const datos = data?.data;
      this.sanidadAgropecuaria['catalogos'] = datos;
    });
  }

  /**
   * Obtiene la lista para el select de punto de inspección.
   * @method obtenerPuntoInspeccionList
   */
  obtenerPuntoInspeccionList() {
    this.httpServicios.get<RespuestaCatalogos>('../../../../../assets/json/220201/punto.json').subscribe((data): void => {
      const datos = data?.data;
      this.puntoInspeccion['catalogos'] = datos;
    });
  }

  /**
   * Obtiene la lista para el select de establecimiento.
   * @method obtenerEstablecimientoList
   */
  obtenerEstablecimientoList() {
    this.httpServicios.get<RespuestaCatalogos>('../../../../../assets/json/220201/establecimiento.json').subscribe((data): void => {
      const datos = data?.data;
      this.establecimientoTIF['catalogos'] = datos;
    });
  }

  /**
   * Obtiene la lista para el select de veterinario.
   * @method obtenerVeterinarioList
   */

  obtenerVeterinarioList() {
    this.httpServicios.get<RespuestaCatalogos>('../../../../../assets/json/220201/nombre.json').subscribe((data): void => {
      const datos = data?.data;
      this.veterinario['catalogos'] = datos;
    });
  }

  /**
   * Obtiene la lista para el select de régimen.
   * @method obtenerRegimenList
   */
  obtenerRegimenList() {
    this.httpServicios.get<RespuestaCatalogos>('../../../../../assets/json/220201/regimen.json').subscribe((data): void => {
      const datos = data?.data;
      this.regimen['catalogos'] = datos;
    });
  }
}