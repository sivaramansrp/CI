import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Catalogo, CatalogoSelectComponent, TituloComponent } from '@ng-mf/data-access-user';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject, map, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ConsultaioQuery } from '@libs/shared/data-access-user/src';
import { FormularioMovilizacion } from '../../models/220203/importacion-de-acuicultura.module';
import { ImportacionDeAcuiculturaService } from '../../services/220203/importacion-de-acuicultura.service';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

/**
 * @fileoverview
 * Componente para la gestión de los datos de movilización en el trámite de importación de acuicultura.
 * Permite capturar, validar y actualizar la información relacionada con el transporte y puntos de verificación.
 * Cobertura de documentación completa: cada propiedad, método y constructor está documentado en español.
 * @module DatosParaMovilizacionComponent
 */

/**
 * Componente para la gestión de los datos de movilización en el trámite de importación de acuicultura.
 * Permite capturar, validar y actualizar la información relacionada con el transporte y puntos de verificación.
 * Gestiona formularios reactivos con validaciones y mantiene sincronización con el estado global.
 * 
 * @export
 * @class DatosParaMovilizacionComponent
 * @implements {OnInit}
 * @implements {OnDestroy}
 * @implements {AfterViewInit}
 */
@Component({
  selector: 'app-datos-para-movilizacion',
  templateUrl: './datos-para-movilizacion.component.html',
  styleUrls: ['./datos-para-movilizacion.component.scss'],
  standalone: true,
  imports: [
    TituloComponent,
    CatalogoSelectComponent,
    ReactiveFormsModule,
    CommonModule,
    TooltipModule
  ]
})
export class DatosParaMovilizacionComponent implements OnInit, OnDestroy, AfterViewInit {

  /**
   * Lista de opciones de transporte obtenidas del catálogo correspondiente.
   * Contiene los medios de transporte disponibles para la movilización de mercancías.
   * @type {Catalogo[]}
   * @memberof DatosParaMovilizacionComponent
   */
  transportes: Catalogo[] = [];

  /**
   * Lista de puntos de verificación obtenidos del catálogo correspondiente.
   * Contiene los puntos de control disponibles para la verificación de mercancías.
   * @type {Catalogo[]}
   * @memberof DatosParaMovilizacionComponent
   */
  puntos: Catalogo[] = [];

  /**
   * Formulario reactivo para capturar los datos de movilización de acuicultura.
   * Incluye validaciones para campos obligatorios y opcionales.
   * @type {FormGroup}
   * @memberof DatosParaMovilizacionComponent
   */
  formularioMovilizacion!: FormGroup;

  /**
   * Estado actual del formulario de movilización almacenado en el store.
   * Mantiene la persistencia de los datos ingresados por el usuario.
   * @type {FormularioMovilizacion}
   * @memberof DatosParaMovilizacionComponent
   */
  formularioMovilizacionStore: FormularioMovilizacion = {} as FormularioMovilizacion;

  /**
   * Subject para controlar la destrucción de suscripciones y evitar memory leaks.
   * Se utiliza para limpiar todas las suscripciones activas al destruir el componente.
   * @type {Subject<void>}
   * @private
   * @memberof DatosParaMovilizacionComponent
   */
  private readonly DESTROY_NOTIFIER$ = new Subject<void>();

  /**
   * Indica si el formulario está en modo solo lectura.
   * Controla la habilitación/deshabilitación de los campos del formulario.
   * @type {boolean}
   * @memberof DatosParaMovilizacionComponent
   */
  esFormularioSoloLectura: boolean = false;

  /**
   * Constructor del componente DatosParaMovilizacionComponent.
   * Inicializa los servicios necesarios y establece la suscripción al estado del formulario.
   * 
   * @param {FormBuilder} fb - Servicio para construir formularios reactivos de Angular
   * @param {ImportacionDeAcuiculturaService} importacionDeAcuiculturaServices - Servicio para obtener datos de catálogos y actualizar el store
   * @param {ConsultaioQuery} consultaQuery - Servicio para consultar el estado de solo lectura del formulario
   * @memberof DatosParaMovilizacionComponent
   */
  constructor(
    private readonly fb: FormBuilder,
    private readonly importacionDeAcuiculturaServices: ImportacionDeAcuiculturaService,
    private consultaQuery: ConsultaioQuery
  ) {
    this.importacionDeAcuiculturaServices.obtenerDatos().pipe(takeUntil(this.DESTROY_NOTIFIER$)).subscribe((datos) => {
      this.formularioMovilizacionStore = datos.formularioMovilizacion
    })
  }

  /**
   * Método del ciclo de vida OnInit de Angular.
   * Inicializa el formulario reactivo con validaciones y obtiene los catálogos necesarios.
   * 
   * @public
   * @method ngOnInit
   * @memberof DatosParaMovilizacionComponent
   * @returns {void}
   */
  ngOnInit(): void {
    this.formularioMovilizacion = this.fb.group({
      medioDeTransporte: [this.formularioMovilizacionStore.medioDeTransporte || '', Validators.required],
      identificacionTransporte: [this.formularioMovilizacionStore.identificacionTransporte || ''],
      puntoVerificacion: [this.formularioMovilizacionStore.puntoVerificacion || ''],
      nombreEmpresaTransportista: [this.formularioMovilizacionStore.nombreEmpresaTransportista || '', Validators.required]
    });

    this.obtenerCatalogosTransporte();
    this.obtenerCatalogosPuntos();
  }

  /**
   * Método del ciclo de vida AfterViewInit de Angular.
   * Se ejecuta después de inicializar la vista y configura la suscripción al estado de solo lectura.
   * 
   * @public
   * @method ngAfterViewInit
   * @memberof DatosParaMovilizacionComponent
   * @returns {void}
   */
  ngAfterViewInit(): void {
    this.consultaQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.DESTROY_NOTIFIER$),
        map((seccionState) => {
          this.esFormularioSoloLectura = seccionState.readonly;
          this.inicializarEstadoFormulario();
        }
      )
    ).subscribe();
  }

  /**
   * Inicializa el estado del formulario según el modo de solo lectura.
   * Habilita o deshabilita los controles del formulario basado en el estado actual.
   * 
   * @public
   * @method inicializarEstadoFormulario
   * @memberof DatosParaMovilizacionComponent
   * @returns {void}
   */
  inicializarEstadoFormulario(): void {
    if (this.esFormularioSoloLectura) {
      this.formularioMovilizacion.disable();
    } else {
      this.formularioMovilizacion.enable();
    }
  }

  /**
   * Obtiene los datos del catálogo de medios de transporte.
   * Realiza una petición al servicio para cargar las opciones disponibles de transporte.
   * 
   * @public
   * @method obtenerCatalogosTransporte
   * @memberof DatosParaMovilizacionComponent
   * @returns {void}
   */
  obtenerCatalogosTransporte(): void {
    this.importacionDeAcuiculturaServices.obtenerDetallesDelCatalogo('transporte.json')
      .pipe(takeUntil(this.DESTROY_NOTIFIER$))
      .subscribe((data) => {
        this.transportes = data.data as Catalogo[];
      }, (_error) => {
        console.error('Error al obtener datos de transporte:', _error);
      });
  }

  /**
   * Obtiene los datos del catálogo de puntos de verificación.
   * Realiza una petición al servicio para cargar las opciones disponibles de puntos de control.
   * 
   * @public
   * @method obtenerCatalogosPuntos
   * @memberof DatosParaMovilizacionComponent
   * @returns {void}
   */
  obtenerCatalogosPuntos(): void {
    this.importacionDeAcuiculturaServices.obtenerDetallesDelCatalogo('punto.json')
      .pipe(takeUntil(this.DESTROY_NOTIFIER$))
      .subscribe((data) => {
        this.puntos = data.data as Catalogo[];
      }, (_error) => {
        console.error('Error al obtener datos de puntos:', _error);
      });
  }

  /**
   * Establece los valores del formulario en el servicio de almacenamiento correspondiente.
   * Actualiza el estado global con los datos actuales del formulario de movilización.
   * 
   * @public
   * @method setValoresStore
   * @memberof DatosParaMovilizacionComponent
   * @returns {void}
   */
  setValoresStore(): void {
    const VALOR = this.formularioMovilizacion.value;
    (this.importacionDeAcuiculturaServices.actualizarFormularioMovilizacion as (value: FormularioMovilizacion) => void)(
      VALOR
    );
  }
  /**
   * Valida el estado actual del formulario de movilización.
   * Verifica si todos los campos obligatorios están completos y marca los campos como tocados si hay errores.
   * 
   * @public
   * @method validarFormulario
   * @memberof DatosParaMovilizacionComponent
   * @returns {boolean} True si el formulario es válido, false en caso contrario
   */
  public validarFormulario(): boolean {
    if (this.formularioMovilizacion.invalid) {
      this.formularioMovilizacion.markAllAsTouched();
      return false;
    }
    return true;
  }


  /**
   * Método del ciclo de vida OnDestroy de Angular.
   * Ejecuta la limpieza de recursos, detiene las suscripciones activas y libera memoria.
   * Previene memory leaks al destruir el componente.
   * 
   * @public
   * @method ngOnDestroy
   * @memberof DatosParaMovilizacionComponent
   * @returns {void}
   */
  ngOnDestroy(): void {
    this.DESTROY_NOTIFIER$.next();
    this.DESTROY_NOTIFIER$.complete();
  }
}