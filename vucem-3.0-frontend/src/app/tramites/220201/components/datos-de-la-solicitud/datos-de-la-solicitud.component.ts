import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Component, OnInit } from '@angular/core';

import { TEXTOS } from '../../../../shared/constantes/módulodemodificacióndeextensióndeemisión.enum';

import { CatalogosSelect } from '../../../../core/models/shared/components.model';
import { RespuestaCatalogos } from '../../../../core/models/shared/catalogos.model';

import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-datos-de-la-solicitud',
  templateUrl: './datos-de-la-solicitud.component.html',
  styleUrl: './datos-de-la-solicitud.component.scss'
})
/**
 * @componente
 * @nombre DatosDeLaSolicitudComponent
 * @descripción
 * El `DatosDeLaSolicitudComponent` es un componente de Angular responsable de gestionar el formulario relacionado con los "Datos de la Solicitud".
 * Inicializa y gestiona un formulario reactivo utilizando el servicio `FormBuilder` de Angular.
 * 
 * @propiedad {string} TEXTOS - Una constante de cadena para recursos de texto.
 * @propiedad {FormGroup} forma - El grupo de formularios principal para el componente.
 * @propiedad {string[]} selectRangoDias - Un arreglo de cadenas que representa el rango de días.
 * @propiedad {boolean} colapsable - Un booleano que indica si la sección del formulario es colapsable.
 * @propiedad {FormGroup} datosDelaSolicitud - Un grupo de formularios anidado dentro del grupo de formularios principal.
 * 
 * @constructor
 * @param {FormBuilder} fb - El servicio `FormBuilder` para crear grupos de formularios.
 * 
 * @método crearFormulario
 * @descripción
 * Inicializa el grupo de formularios principal para el componente. Este método crea un grupo de formularios utilizando el servicio `FormBuilder` de Angular.
 * El grupo de formularios contiene un grupo anidado llamado `datosDelaSolicitud`.
 * 
 * @returns {void}
 * 
 * @método initActionFormBuild
 * @descripción
 * Inicializa el grupo de formularios para "datosDelaSolicitud" con varios controles de formulario y sus respectivos validadores.
 * Los controles de formulario incluyen:
 * - `aduanaIngreso`: Un campo requerido para la entrada de aduana.
 * - `oficinaInspeccion`: Un campo requerido para la oficina de inspección.
 * - `puntoInspeccion`: Un campo requerido para el punto de inspección.
 * - `claveUCON`: Un campo requerido para la clave UCON.
 * - `establecimientoTIF`: Un campo requerido para el establecimiento TIF.
 * - `nombreVeterinario`: Un campo requerido para el nombre del veterinario.
 * - `numeroGuia`: Un campo opcional para el número de guía.
 * - `certficacion`: Un campo opcional para la certificación.
 * - `regimen`: Un campo requerido para el régimen.
 * 
 * Después de inicializar el grupo de formularios, establece el control 'datosDelaSolicitud' en el formulario principal.
 * 
 * @returns {void}
 * 
 * @método mostrar_colapsable
 * @descripción
 * Alterna el estado colapsable de la sección del formulario.
 * 
 * @returns {void} --202201
 */
export class DatosDeLaSolicitudComponent implements OnInit {
  TEXTOS: string = TEXTOS;
  forma!: FormGroup;
  selectRangoDias: string[] = [];
  colapsable: boolean = false;
  datosDelaSolicitud!: FormGroup;
  aduanaDeIngreso: CatalogosSelect = {
    labelNombre: 'Aduana de ingreso',
    required: true,
    primerOpcion: 'Selecciona un Aduana de ingreso',
    catalogos: [],
  }
  sanidadAgropecuaria: CatalogosSelect = {
    labelNombre: 'Oficina de inspección de sanidad Agropecuaria',
    required: true,
    primerOpcion: 'Selecciona un Agropecuaria',
    catalogos: [],
  }
  puntoInspeccion: CatalogosSelect = {
    labelNombre: 'Punto de inspección',
    required: true,
    primerOpcion: 'Selecciona un Punto',
    catalogos: [],
  }
  establecimientoTIF: CatalogosSelect = {
    labelNombre: `Establecimiento TIF `,
    required: true,
    primerOpcion: 'Selecciona un Establecimiento',
    catalogos: [],
  }
  veterinario: CatalogosSelect = {
    labelNombre: 'Nombre del médico veterinario',
    required: true,
    primerOpcion: 'Selecciona un Nombre',
    catalogos: [],
  }
  regimen: CatalogosSelect = {
    labelNombre: 'Régimen',
    required: true,
    primerOpcion: 'Selecciona un Régimen',
    catalogos: [],
  }

  constructor(private readonly fb: FormBuilder, private readonly httpServicios: HttpClient) {
    this.crearFormulario();
    this.initActionFormBuild();
  }
  /**
   * Inicializa el grupo de formularios para el componente.
   * 
   * Este método crea un grupo de formularios utilizando el servicio FormBuilder de Angular.
   * El grupo de formularios contiene un grupo anidado llamado `datosDelaSolicitud`.
   * 
   * @returns {void}
   */
  crearFormulario(): void {
    this.forma = this.fb.group({
      datosDelaSolicitud: this.fb.group({}),
    });
  }
  ngOnInit(): void {
    this.obtenerListasDesplegables();
  }

  /**
   * Inicializa el grupo de formularios para "datosDelaSolicitud" con varios controles de formulario y sus respectivos validadores.
   * 
   * Los controles de formulario incluyen:
   * - `aduanaIngreso`: Un campo requerido para la entrada de aduana.
   * - `oficinaInspeccion`: Un campo requerido para la oficina de inspección.
   * - `puntoInspeccion`: Un campo requerido para el punto de inspección.
   * - `claveUCON`: Un campo requerido para la clave UCON.
   * - `establecimientoTIF`: Un campo requerido para el establecimiento TIF.
   * - `nombreVeterinario`: Un campo requerido para el nombre del veterinario.
   * - `numeroGuia`: Un campo opcional para el número de guía.
   * - `certficacion`: Un campo opcional para la certificación.
   * - `regimen`: Un campo requerido para el régimen.
   * 
   * Después de inicializar el grupo de formularios, establece el control 'datosDelaSolicitud' en el formulario principal.
   * 
   * @returns {void}
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
   * @description Cambia el estado de la propiedad `colapsable` entre verdadero y falso.
   * @method
   * @memberof DatosDeLaSolicitudComponent --220201
   */
  mostrar_colapsable() {
    this.colapsable = !this.colapsable;
  }

  obtenerListasDesplegables() {
    this.obtenerIngresoSelectList();
    this.obtenerSanidadAgropecuariaList();
    this.obtenerPuntoInspeccionList();
    this.obtenerEstablecimientoList();
    this.obtenerVeterinarioList();
    this.obtenerRegimenList();
  }

  obtenerIngresoSelectList() {
    this.httpServicios.get<RespuestaCatalogos>('../../../../../assets/json/220201/aduana_de_ingreso.json').subscribe((data): void => {
      const datos = data?.data;
      this.aduanaDeIngreso['catalogos'] = datos;
    });
  }

  obtenerSanidadAgropecuariaList() {
    this.httpServicios.get<RespuestaCatalogos>('../../../../../assets/json/220201/oficina_de_inspeccion.json').subscribe((data): void => {
      const datos = data?.data;
      this.sanidadAgropecuaria['catalogos'] = datos;
    });
  }
  obtenerPuntoInspeccionList() {
    this.httpServicios.get<RespuestaCatalogos>('../../../../../assets/json/220201/punto.json').subscribe((data): void => {
      const datos = data?.data;
      this.puntoInspeccion['catalogos'] = datos;
    });
  }
  obtenerEstablecimientoList() {
    this.httpServicios.get<RespuestaCatalogos>('../../../../../assets/json/220201/establecimiento.json').subscribe((data): void => {
      const datos = data?.data;
      this.puntoInspeccion['catalogos'] = datos;
    });
  }
  obtenerVeterinarioList() {
    this.httpServicios.get<RespuestaCatalogos>('../../../../../assets/json/220201/nombre.json').subscribe((data): void => {
      const datos = data?.data;
      this.veterinario['catalogos'] = datos;
    });
  }
  obtenerRegimenList() {
    this.httpServicios.get<RespuestaCatalogos>('../../../../../assets/json/220201/regimen.json').subscribe((data): void => {
      const datos = data?.data;
      this.regimen['catalogos'] = datos;
    });
  }
}
