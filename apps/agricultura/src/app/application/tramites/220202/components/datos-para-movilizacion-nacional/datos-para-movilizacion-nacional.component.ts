import { Component, OnDestroy, OnInit } from '@angular/core';

import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AgriculturaApiService } from '../../services/220202/agricultura-api.service';

import { Catalogo } from '@ng-mf/data-access-user';

import { Subject, Subscription, takeUntil } from 'rxjs';
import { Movilizacion } from '../../models/220202/fitosanitario.model';

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

/**
 * Componente para mostrar el subtítulo del asistente.
 * @component DatosParaMovilizacionNacionalComponent
 * @selector app-datos-para-movilizacion-nacional
 * @templateUrl ./datos-para-movilizacion-nacional.component.html
 * @styleUrls ./datos-para-movilizacion-nacional.component.scss --220202
 */
@Component({
  selector: 'app-datos-para-movilizacion-nacional',
  templateUrl: './datos-para-movilizacion-nacional.component.html',
  styleUrls: ['./datos-para-movilizacion-nacional.component.scss']
})
export class DatosParaMovilizacionNacionalComponent implements OnInit, OnDestroy {
  /**
   * @description FormGroup que contiene los controles del formulario.
   * Este objeto `FormGroup` contiene los controles de formulario necesarios para capturar los datos de movilización nacional.
   * @type {FormGroup}
   */
  forma!: FormGroup;

  /**
   * @description Lista de opciones para el selector de medio de transporte.
   * Este array contiene los objetos de tipo `Catalogo` que se utilizan para poblar el selector de medio de transporte en el formulario.
   * @type {Catalogo[]}
   */
  transporteList: Catalogo[] = [];

  /**
   * @description Lista de puntos de verificación federal.
   * Este array contiene los objetos de tipo `Catalogo` que se utilizan para poblar el selector de puntos de verificación federal en el formulario.
   * @type {Catalogo[]}
   */
  puntoList: Catalogo[] = [];
  /**
   * @description Subject para manejar la destrucción de las suscripciones.
   * Se utiliza para emitir cuando el componente es destruido, limpiando todas las suscripciones.
   */
  private destroyNotifier$ = new Subject<void>();
  formulariodataStore: Movilizacion = {} as Movilizacion;


  /**
   * @constructor
   * @param {AgriculturaApiService} agriculturaApiService - Servicio HttpClient para realizar peticiones.
   * Este servicio se utiliza para obtener las listas de opciones para los selectores del formulario y para actualizar el estado de la forma.
   */
  constructor(private readonly agriculturaApiService: AgriculturaApiService) {
    this.agriculturaApiService.getAllDatosForma().pipe(takeUntil(this.destroyNotifier$)).subscribe((datos) => {
      this.formulariodataStore = datos.movilizacion;
    })

  }

  /**
   * @description Inicializa el componente.
   * Este método se llama automáticamente después de que se crea el componente.
   * Crea el `FormGroup` y obtiene los datos para los selectores (medio de transporte y puntos de verificación).
   * @method ngOnInit
   * @returns {void}
   */
  ngOnInit(): void {
    this.forma = new FormGroup({
      transporte: new FormControl(this.formulariodataStore.transporte || '', Validators.required),
      medioTransporte: new FormControl(this.formulariodataStore.medioTransporte || ''),
      guiaIdentificacion: new FormControl(this.formulariodataStore.guiaIdentificacion || ''),
      empresaTransportista: new FormControl(this.formulariodataStore.empresaTransportista || '', Validators.required),
    });
    // Se suscribe a los cambios de estado del formulario para actualizar su validez
    this.forma.statusChanges.pipe(takeUntil(this.destroyNotifier$)).subscribe((changes) => {
      const FORMA_VALIDA_ACTUALIZADA = {
        movilizacionValidacion: false,
      };
      FORMA_VALIDA_ACTUALIZADA.movilizacionValidacion = this.forma.valid ? true : false;
      this.agriculturaApiService.actualizarFormaValida(FORMA_VALIDA_ACTUALIZADA);
    });

    // Obtiene las listas de opciones (medio de transporte y puntos de verificación)
    this.obtenerTodosLosDatosDeOpciones();
  }

  /**
   * @description Obtiene los datos para los selectores (medio de transporte y punto de verificación).
   * Este método llama a otros métodos para obtener las listas de opciones desde el servicio.
   * @method obtenerTodosLosDatosDeOpciones
   * @returns {void}
   */
  obtenerTodosLosDatosDeOpciones(): void {
    this.obtenerListaDeJustificaciones();
    this.obtenerListaDePunto();
  }

  /**
   * @description Obtiene los datos para el selector de medio de transporte.
   * Llama al servicio para obtener la lista de transportes y la asigna a `transporteList`.
   * @method obtenerListaDeJustificaciones
   * @returns {void}
   */
  obtenerListaDeJustificaciones(): void {
    this.agriculturaApiService.obtenerSelectorList('transporte.json').pipe(takeUntil(this.destroyNotifier$)).subscribe(data => {
      this.transporteList = data as Catalogo[];
    });
  }

  /**
   * @description Obtiene los datos para el selector de punto de verificación federal.
   * Llama al servicio para obtener la lista de puntos y la asigna a `puntoList`.
   * @method obtenerListaDePunto
   * @returns {void}
   */
  obtenerListaDePunto(): void {
    this.agriculturaApiService.obtenerSelectorList('punto.json').pipe(takeUntil(this.destroyNotifier$)).subscribe(data => {
      this.puntoList = data as Catalogo[];
    });
  }

  /**
   * @description Actualiza los valores en el store del servicio.
   * Este método obtiene el valor de un campo específico del formulario y lo actualiza en el servicio.
   * @method setValoresStore
   * @param {FormGroup} form - El formulario que contiene los datos a actualizar.
   * @param {string} campo - El nombre del campo cuyo valor se actualizará en el servicio.
   * @returns {void}
   */
  setValoresStore(
    form?: FormGroup,
    campo?: string,
  ): void {
    const VALOR = this.forma.value;
    this.agriculturaApiService.updateMovilizacion(VALOR);
  }

  /**
   * @description Limpia las suscripciones activas cuando el componente es destruido.
   * Este método se llama automáticamente cuando el componente es destruido para evitar fugas de memoria.
   * @method ngOnDestroy
   * @returns {void}
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
