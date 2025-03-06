import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AgriculturaApiService } from '../../services/220202/agricultura-api.service';

import { Catalogo } from '@ng-mf/data-access-user';
/**
 * @fileoverview Componente para la sección de datos para movilización nacional.
 * Este componente gestiona la lógica y la presentación del formulario de datos
 * para la movilización nacional, incluyendo la inicialización, la obtención de
 * datos y la gestión de los controles del formulario.
 * @module datosParaMovilizacionNacional
 */
/**
 * * Componente para el formulario de datos para movilización nacional.
 * @class DatosParaMovilizacionNacionalComponent
 * @implements {OnInit}
 */
/**
 * Componente para mostrar el subtítulo del asistente.
 * @component DatosParaMovilizacionNacionalComponent
 * @selector app-datos-para-movilizacion-nacional
 * @templateUrl ./datos-para-movilizacion-nacional.component.html
 * @styleUrls ./datos-para-movilizacion-nacional.component.scss --220202
 */@Component({
  selector: 'app-datos-para-movilizacion-nacional',
  templateUrl: './datos-para-movilizacion-nacional.component.html',
  styleUrls: ['./datos-para-movilizacion-nacional.component.scss']
})
export class DatosParaMovilizacionNacionalComponent implements OnInit {
  /**
   * @description FormGroup que contiene los controles del formulario.
   * @type {FormGroup}
   */
  forma!: FormGroup;
  /**
   * @description Configuración para el selector de medio de transporte.
   * @type {Catalogo}
   */
  transporteList: Catalogo[] = [];
  /**
   * @description Configuración para el selector de punto de verificación federal.
   * @type {Catalogo}
   */
  puntoList: Catalogo[] = [];
  /**
   * @constructor
   * @param {AgriculturaApiService} agriculturaApiService - Servicio HttpClient para realizar peticiones.
   */
  constructor(private readonly agriculturaApiService: AgriculturaApiService) {
    console.log('constructor');
  }
  /**
   * @description Inicializa el componente.
   * Crea el FormGroup y obtiene los datos para los selectores.
   * @method ngOnInit
   */
  ngOnInit(): void {
    this.forma = new FormGroup({
      transporte: new FormControl('', Validators.required),
      medioTransporte: new FormControl('', Validators.required),
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
  obtenerTodosLosDatosDeOpciones(): void { // Added return type
    this.obtenerListaDeJustificaciones();
    this.obtenerListaDePunto();
  }
  /**
   * @description Obtiene los datos para el selector de medio de transporte.
   * @method obtenerListaDeJustificaciones
   */
  obtenerListaDeJustificaciones(): void { // Added return type
    this.agriculturaApiService.obtenerSelectorList('transporte.json').subscribe(data => {
      this.transporteList = data as Catalogo[];
    });
  }
  /**
   * @description Obtiene los datos para el selector de punto de verificación federal.
   * @method obtenerListaDePunto
   */
  obtenerListaDePunto(): void { // Added return type
    this.agriculturaApiService.obtenerSelectorList('punto.json').subscribe(data => {
      this.puntoList = data as Catalogo[];
    });
  }
}