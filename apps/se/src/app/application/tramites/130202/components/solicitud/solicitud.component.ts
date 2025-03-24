import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  ProductoOption,
  ProductoResponse,
} from '../../../../shared/constantes/vehiculos-adaptados.enum';

import { Subject, takeUntil } from 'rxjs';

import { Catalogo } from '@ng-mf/data-access-user';

import { HttpClient } from '@angular/common/http';
import { Tramite130202Query } from '../../estados/queries/tramite130202.query';
import { Tramite130202Store } from '../../estados/tramites/tramites130202.store';
import fractionValues from '@libs/shared/theme/assets/json/130202/fraccion_arancelaria.json';
import solicitudeSelectVal from '@libs/shared/theme/assets/json/130202/solicitud-select.json';
import unidadOptions from '@libs/shared/theme/assets/json/130202/unidad_da.json';

/**
 * @description Componente para gestionar la solicitud de mercancías.
 * Contiene formularios reactivos y opciones configurables relacionadas con el trámite.
 */
@Component({
  selector: 'app-solicitud',
  templateUrl: './solicitud.component.html',
  styleUrl: './solicitud.component.scss',
})
export class SolicitudComponent implements OnInit, OnDestroy {
  /**
   * @description Formulario reactivo para los datos del trámite.
   */
  formDelTramite!: FormGroup;

  /**
   * @description Formulario reactivo para los detalles de la mercancía.
   */
  mercanciaForm!: FormGroup;

  /**
   * @description Opciones para el campo "producto".
   */
  productoOptions: ProductoOption[] = [];
  /**
   * @description Catálogo con valores de fracción arancelaria.
   */
  fraccionCatalog: Catalogo[] = fractionValues;

  /**
   * @description Catálogo con opciones de unidad de medida.
   */
  unidadCatalog: Catalogo[] = unidadOptions;
  /**
   * @description Campos de entrada configurables para detalles adicionales.
   */
  detosInputFields = [
    {
      label: 'Régimen al que se destinará la mercancía',
      placeholder: 'Seleccione un documento',
      required: true,
      controlName: 'regimen',
    },
    {
      label: 'Clasificación del régimen',
      placeholder: 'Seleccione un documento',
      required: true,
      controlName: 'classification',
    },
  ];
  /**
   * @description Matriz de catálogos adicionales para el formulario.
   */
  catalogosArray: Catalogo[][] = solicitudeSelectVal;
  /**
   * @description Opciones de solicitud configurables.
   */
  solicitudeOptions: ProductoOption[] = [];

  /**
   * @description Sujeto para gestionar la destrucción de suscripciones.
   */
  private destroyed$ = new Subject<void>();

  /**
   * @description Constructor que inyecta dependencias necesarias.
   * @param fb Constructor para formularios reactivos.
   * @param http Cliente HTTP para solicitudes de datos.
   * @param tramite130202Store Almacén de estado del trámite.
   * @param tramite130202Query Consultas relacionadas con el trámite.
   */
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private tramite130202Store: Tramite130202Store,
    private tramite130202Query: Tramite130202Query
  ) {
    //constructor
  }
  /**
   * @description Ciclo de vida de Angular: inicializa formularios, suscripciones y opciones al cargar el componente.
   */
  ngOnInit(): void {
    this.initializeForms();
    this.setupFormSubscriptions();
    this.fetchOptions();
  }

  /**
   * @description Inicializa los formularios reactivos `formDelTramite` y `mercanciaForm`.
   */
  initializeForms(): void {
    this.formDelTramite = this.fb.group({
      solicitud: ['', Validators.required],
      regimen: ['', Validators.required],
      classification: ['', Validators.required],
    });

    this.mercanciaForm = this.fb.group({
      producto: ['Nuevo'],
      descripcion: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(500),
        ],
      ],
      fraccion: ['', Validators.required],
      cantidad: [
        '',
        [Validators.required, Validators.pattern(/^\d+$/), Validators.min(1)],
      ],
      valorFacturaUSD: [
        '',
        [
          Validators.required,
          Validators.pattern(/^\d+(\.\d{1,2})?$/),
          Validators.min(0.01),
        ],
      ],
      unidadMedida: ['', Validators.required],
    });
  }
  /**
   * @description Configura las suscripciones para actualizar formularios y almacenar estados.
   */
  setupFormSubscriptions(): void {
    this.tramite130202Query.solicitud$
      .pipe(takeUntil(this.destroyed$))
      .subscribe((solicitud) => {
        this.formDelTramite.patchValue({ solicitud }, { emitEvent: false });
      });

    this.tramite130202Query.regimen$
      .pipe(takeUntil(this.destroyed$))
      .subscribe((regimen) => {
        this.formDelTramite.patchValue({ regimen }, { emitEvent: false });
      });

    this.tramite130202Query.classification$
      .pipe(takeUntil(this.destroyed$))
      .subscribe((classification) => {
        this.formDelTramite.patchValue(
          { classification },
          { emitEvent: false }
        );
      });
    this.tramite130202Query.mercanciaState$
      .pipe(takeUntil(this.destroyed$))
      .subscribe((state) => {
        this.mercanciaForm.patchValue(
          {
            producto: state.producto,
            descripcion: state.descripcion,
            fraccion: state.fraccion,
            cantidad: state.cantidad,
            valorFacturaUSD: state.valorPartidaUSD
              ? state.valorPartidaUSD.toString()
              : '',
            unidadMedida: state.unidadMedida,
          },
          { emitEvent: false }
        );
      });

    this.formDelTramite.valueChanges
      .pipe(takeUntil(this.destroyed$))
      .subscribe((value) => {
        this.tramite130202Store.updateState({
          solicitud: value.solicitud,
          regimen: value.regimen,
          classification: value.classification,
        });
      });

    this.mercanciaForm.valueChanges
      .pipe(takeUntil(this.destroyed$))
      .subscribe((value) => {
        this.tramite130202Store.updateState({
          producto: value.producto,
          descripcion: value.descripcion,
          fraccion: value.fraccion,
          cantidad: value.cantidad,
          valorPartidaUSD: parseFloat(value.valorFacturaUSD) || 0,
          unidadMedida: value.unidadMedida,
        });
      });
  }

  /**
   * @description Solicita opciones configurables para los formularios desde archivos JSON.
   */
  fetchOptions(): void {
    this.http
      .get<ProductoResponse>('assets/json/130202/solicitude-options.json')
      .pipe(takeUntil(this.destroyed$))
      .subscribe({
        next: (data) => {
          this.solicitudeOptions = data.options;
          this.tramite130202Store.updateState({
            solicitud: data.options[0]?.value || '',
            defaultSelect: data.defaultSelect || 'Inicial',
          });
        },
      });

    this.http
      .get<ProductoResponse>('/assets/json/130202/producto-otions.json')
      .pipe(takeUntil(this.destroyed$))
      .subscribe({
        next: (data) => {
          this.productoOptions = data.options;
          this.tramite130202Store.updateState({
            producto: data.options[0]?.value || 'Nuevo',
            defaultProducto: data.options[0]?.value || 'Nuevo',
          });
        },
      });
  }

  /**
   * @description Actualiza el almacén con nuevos valores basados en eventos de formulario.
   * @param event Evento que incluye el formulario, el campo y el método a ejecutar.
   */
  setValoresStore(event: {
    form: FormGroup;
    campo: string;
    metodoNombre: string;
  }): void {
    const VALOR = event.form.get(event.campo)?.value;
    switch (event.metodoNombre) {
      case 'updateSolicitud':
        this.tramite130202Store.updateSolicitud(VALOR);
        break;
      case 'setregimen':
        this.tramite130202Store.setregimen(VALOR);
        break;
      case 'setclasificacion':
        this.tramite130202Store.setclasificacion(VALOR);
        break;

      case 'setProducto':
        this.tramite130202Store.setProducto(VALOR);
        break;
      case 'setDescripcion':
        this.tramite130202Store.setDescripcion(VALOR);
        break;
      case 'setCantidad':
        this.tramite130202Store.setCantidad(VALOR);
        break;
      case 'setValorPartidaUSD':
        this.tramite130202Store.setValorPartidaUSD(parseFloat(VALOR) || 0);
        break;
      case 'setUnidadMedida':
        this.tramite130202Store.setUnidadMedida(VALOR);
        break;
      default:
        console.error(
          `Método ${event.metodoNombre} no existe en Tramite130202Store`
        );
    }
  }

  /**
   * @description Ciclo de vida de Angular: limpia las suscripciones al destruir el componente.
   */
  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
