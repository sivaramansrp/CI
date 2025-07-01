import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Catalogo, CatalogoSelectComponent, ConsultaioQuery, TituloComponent } from '@ng-mf/data-access-user';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject, map, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormularioMovilizacion } from '../../models/220203/importacion-de-acuicultura.module';
import { ImportacionDeAcuiculturaService } from '../../services/220203/importacion-de-acuicultura.service';

/**
 * @fileoverview
 * Componente para la gestión de los datos de movilización en el trámite de importación de acuicultura.
 * Permite capturar, validar y actualizar la información relacionada con el transporte y puntos de verificación.
 * Cobertura compodoc 100%: cada propiedad, método y constructor está documentado.
 * @module DatosParaMovilizacionComponent
 */

/**
 * Componente para la gestión de los datos de movilización en el trámite de importación de acuicultura.
 * Permite capturar, validar y actualizar la información relacionada con el transporte y puntos de verificación.
 * @component DatosParaMovilizacionComponent
 * @selector app-datos-para-movilizacion
 * @templateUrl ./datos-para-movilizacion.component.html
 * @styleUrls ./datos-para-movilizacion.component.scss
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
    CommonModule
  ]
})
export class DatosParaMovilizacionComponent implements OnInit, OnDestroy, AfterViewInit {

  /**
   * Lista de opciones de transporte obtenidas del catálogo.
   * @type {Catalogo[]}
   */
  transportes: Catalogo[] = [];

  /**
   * Lista de puntos de verificación obtenidos del catálogo.
   * @type {Catalogo[]}
   */
  puntos: Catalogo[] = [];

  /**
   * Formulario para los datos de movilización de acuicultura.
   * @type {FormGroup}
   */
  formularioMovilizacion!: FormGroup;

  /**
   * Estado actual del formulario de movilización almacenado.
   * @type {FormularioMovilizacion}
   */
  formularioMovilizacionStore: FormularioMovilizacion = {} as FormularioMovilizacion;

  /**
   * Subject para controlar la destrucción de suscripciones.
   * @type {Subject<void>}
   */
  private destroyNotifier$ = new Subject<void>();

  /**
   * Indica si el formulario está en modo solo lectura.
   * @type {boolean}
   */
  esFormularioSoloLectura: boolean = false;

  /**
   * Constructor del componente.
   * Inicializa el formulario y obtiene el estado almacenado.
   * @param {FormBuilder} fb Servicio para construir formularios reactivos.
   * @param {ImportacionDeAcuiculturaService} importacionDeAcuiculturaServices Servicio para obtener datos de catálogos y actualizar el store.
   * @param {ConsultaioQuery} consultaQuery Servicio para consultar el estado de solo lectura.
   */
  constructor(
    private readonly fb: FormBuilder,
    private readonly importacionDeAcuiculturaServices: ImportacionDeAcuiculturaService,
    private consultaQuery: ConsultaioQuery
  ) {
    this.importacionDeAcuiculturaServices.obtenerDatos().pipe(takeUntil(this.destroyNotifier$)).subscribe((datos) => {
      this.formularioMovilizacionStore = datos.formularioMovilizacion
    })
  }

  /**
   * Método del ciclo de vida que se ejecuta cuando el componente se inicializa.
   * Inicializa el formulario y obtiene los catálogos necesarios.
   * @method ngOnInit
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
   * Método del ciclo de vida que se ejecuta después de inicializar la vista.
   * Suscribe a cambios en el formulario y al estado de solo lectura.
   * @method ngAfterViewInit
   * @returns {void}
   */
  ngAfterViewInit(): void {
    this.formularioMovilizacion.valueChanges
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe(() => {
        this.verificarEstadoDelBoton();
      }, (error) => {
        console.error('Error en cambios de formulario:', error);
      });

    this.consultaQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.esFormularioSoloLectura = seccionState.readonly;
          this.inicializarEstadoFormulario();
        }
      )
    ).subscribe();
  }

  /**
   * Inicializa el estado del formulario según el modo solo lectura.
   * @method inicializarEstadoFormulario
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
   * Obtiene los datos del catálogo de transporte y los asigna a la lista de transportes.
   * @method obtenerCatalogosTransporte
   * @returns {void}
   */
  obtenerCatalogosTransporte(): void {
    this.importacionDeAcuiculturaServices.obtenerDetallesDelCatalogo('transporte.json')
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((data) => {
        this.transportes = data.data as Catalogo[];
      }, (error) => {
        console.error('Error al obtener datos de transporte:', error);
      });
  }

  /**
   * Obtiene los datos del catálogo de puntos de verificación y los asigna a la lista de puntos.
   * @method obtenerCatalogosPuntos
   * @returns {void}
   */
  obtenerCatalogosPuntos(): void {
    this.importacionDeAcuiculturaServices.obtenerDetallesDelCatalogo('punto.json')
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((data) => {
        this.puntos = data.data as Catalogo[];
      }, (error) => {
        console.error('Error al obtener datos de puntos:', error);
      });
  }

  /**
   * Verifica si el formulario de movilización es válido y actualiza el estado del botón.
   * @method verificarEstadoDelBoton
   * @returns {void}
   */
  verificarEstadoDelBoton(): void {
    const DATOS = {
      dataParaMovilizacion: false,
    };
    if (this.formularioMovilizacion.valid) {
      DATOS.dataParaMovilizacion = true;
    }
    this.importacionDeAcuiculturaServices.actualizarFormaValida(DATOS);
  }

  /**
   * Establece los valores del formulario en el servicio correspondiente.
   * @method setValoresStore
   * @returns {void}
   */
  setValoresStore(): void {
    const VALOR = this.formularioMovilizacion.value;
    (this.importacionDeAcuiculturaServices.actualizarFormularioMovilizacion as (value: FormularioMovilizacion) => void)(
      VALOR
    );
  }

  /**
   * Método del ciclo de vida que se ejecuta cuando el componente es destruido.
   * Limpia los recursos suscritos y detiene las emisiones de datos.
   * @method ngOnDestroy
   * @returns {void}
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}