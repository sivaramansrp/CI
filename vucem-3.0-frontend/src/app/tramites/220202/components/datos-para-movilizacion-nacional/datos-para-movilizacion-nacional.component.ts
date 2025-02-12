import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Catalogo, RespuestaCatalogos } from '../../../../core/models/shared/catalogos.model';

/**
 * @fileoverview Componente para la sección de datos para movilización nacional.
 * Este componente gestiona la lógica y la presentación del formulario de datos
 * para la movilización nacional, incluyendo la inicialización, la obtención de
 * datos y la gestión de los controles del formulario.
 * @module datosParaMovilizacionNacional
 */

/**
 * Componente para el formulario de datos para movilización nacional.
 * @class DatosParaMovilizacionNacionalComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-datos-para-movilizacion-nacional',
  templateUrl: './datos-para-movilizacion-nacional.component.html',
  styleUrls: ['./datos-para-movilizacion-nacional.component.scss']
})
export class DatosParaMovilizacionNacionalComponent implements OnInit {

  /**
   * @description FormGroup que contiene los controles del formulario.
   * @type {FormGroup}
   */
  forma: FormGroup;

  /**
   * @description Configuración para el selector de medio de transporte.
   * @type {Catalogo}
   */
  transporteList: Catalogo[];

  /**
   * @description Configuración para el selector de punto de verificación federal.
   * @type {Catalogo}
   */
  puntoList: Catalogo[];

  /**
   * @constructor
   * @param {HttpClient} httpServicios - Servicio HttpClient para realizar peticiones.
   */
  constructor(private readonly httpServicios: HttpClient) { }

  /**
   * @description Inicializa el componente.
   * Crea el FormGroup y obtiene los datos para los selectores.
   * @method ngOnInit
   */
  ngOnInit(): void {
    this.forma = new FormGroup({
      transporte: new FormControl('', Validators.required),
      guiaIdentificacion: new FormControl('', Validators.required),
      empresaTransportista: new FormControl('', Validators.required),
      punto: new FormControl('', Validators.required)
    });
    this.obtenerTodosLosDatosDeOpciones();
  }

  /**
   * @description Obtiene los datos para los selectores.
   * @method obtenerTodosLosDatosDeOpciones
   */
  obtenerTodosLosDatosDeOpciones() {
    this.obtenerListaDeJustificaciones();
    this.obtenerListaDePunto();
  }

  /**
   * @description Obtiene los datos para el selector de medio de transporte.
   * @method obtenerListaDeJustificaciones
   */
  obtenerListaDeJustificaciones() {
    this.httpServicios.get<RespuestaCatalogos>('../../../../../assets/json/220202/transporte.json').subscribe((data): void => {
      const datos = data?.data;
      this.transporteList = datos as Catalogo[];
    });
  }

  /**
   * @description Obtiene los datos para el selector de punto de verificación federal.
   * @method obtenerListaDePunto
   */
  obtenerListaDePunto() {
    this.httpServicios.get<RespuestaCatalogos>('../../../../../assets/json/220202/punto.json').subscribe((data): void => {
      const datos = data?.data;
      this.puntoList = datos as Catalogo[];
    });
  }
}