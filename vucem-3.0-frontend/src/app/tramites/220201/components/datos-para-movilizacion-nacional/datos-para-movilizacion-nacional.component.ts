import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CatalogosSelect } from '../../../../core/models/shared/components.model';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Catalogo, RespuestaCatalogos } from '../../../../core/models/shared/catalogos.model';

/**
 * @fileoverview Componente para la gestión del formulario de datos para la movilización nacional.
 * Este componente se encarga de la lógica y la presentación del formulario de datos para la movilización nacional,
 * incluyendo la inicialización, la obtención de datos y la gestión de los controles del formulario.
 * @module datosParaMovilizacionNacional
 */

/**
 * Componente para el formulario de datos para la movilización nacional.
 * @class DatosParaMovilizacionNacionalComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-datos-para-movilizacion-nacional',
  templateUrl: './datos-para-movilizacion-nacional.component.html',
  styleUrl: './datos-para-movilizacion-nacional.component.scss'
})
export class DatosParaMovilizacionNacionalComponent implements OnInit {

  /**
   * Grupo de formularios para la movilización nacional.
   * @property {FormGroup} movilizacionForm
   */
  movilizacionForm: FormGroup;

  /**
   * Configuración para el selector de medio de transporte.
   * @property {CatalogosSelect} medioTransporteList
   */
  medioTransporteList: Catalogo[];

  /**
   * Configuración para el selector de identificación del transporte.
   * @property {CatalogosSelect} identificacionTransporteList
   */
  identificacionTransporteList: Catalogo[];

  /**
   * Configuración para el selector de nombre de la empresa transportista.
   * @property {CatalogosSelect} nombreDeLaEmpresaTransportista
   */
  nombreDeLaEmpresaTransportista: Catalogo[];

  /**
   * Configuración para el selector de punto de verificación federal.
   * @property {CatalogosSelect} puntoDeVerificacionFederal
   */
  puntoDeVerificacionFederal: Catalogo[];
  /**
   * Constructor de la clase DatosParaMovilizacionNacionalComponent.
   * @constructor
   * @param {FormBuilder} fb - Inyección de dependencia del servicio FormBuilder.
   * @param {HttpClient} httpServicios - Inyección de dependencia del servicio HttpClient.
   */
  constructor(private readonly fb: FormBuilder, private readonly httpServicios: HttpClient) {
    this.movilizacionForm = this.fb.group({
      coordenadas: ['', Validators.required],
      nombre: ['', Validators.required],
      medio: ['Aereo', Validators.required],
      transporte: ['', [Validators.required]],
      punto: ['', [Validators.required]]
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
   * Obtiene las listas desplegables.
   * @method obtenerListasDesplegables
   */
  obtenerListasDesplegables() {
    this.obtenerTransporteListList();
    this.obtenernombreDeLaEmpresaTransportistaList();
    this.obtenerPuntoDeVerificaciónList();
    this.obtenerIdentificacionTransporteList();
  }

  /**
   * Obtiene la lista de transportes.
   * @method obtenerTransporteListList
   */
  obtenerTransporteListList() {
    this.httpServicios.get<RespuestaCatalogos>('../../../../../assets/json/220201/transporte.json').subscribe((data): void => {
      const datos = data?.data;
      this.medioTransporteList = datos;
    });
  }

  /**
   * Obtiene la lista de nombres de empresas transportistas.
   * @method obtenernombreDeLaEmpresaTransportistaList
   */
  obtenernombreDeLaEmpresaTransportistaList() {
    this.httpServicios.get<RespuestaCatalogos>('../../../../../assets/json/220201/nombre.json').subscribe((data): void => {
      const datos = data?.data;
      this.nombreDeLaEmpresaTransportista = datos;
    });
  }

  /**
   * Obtiene la lista de puntos de verificación.
   * @method obtenerPuntoDeVerificaciónList
   */
  obtenerPuntoDeVerificaciónList() {
    this.httpServicios.get<RespuestaCatalogos>('../../../../../assets/json/220201/punto.json').subscribe((data): void => {
      const datos = data?.data;
      this.puntoDeVerificacionFederal = datos;
    });
  }

  /**
 * Obtiene la lista de identificaciones de transporte. --220201
 * @method obtenerIdentificacionTransporteList
 */
  obtenerIdentificacionTransporteList() {
    this.httpServicios.get<RespuestaCatalogos>('../../../../../assets/json/220201/punto.json').subscribe((data): void => {
      const datos = data?.data;
      this.identificacionTransporteList = datos;
    });
  }
}