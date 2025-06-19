import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Subject } from 'rxjs';
import { delay } from 'rxjs';
import { map } from 'rxjs';
import { takeUntil } from 'rxjs';
import { tap } from 'rxjs';

import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { SeccionLibQuery } from '@ng-mf/data-access-user';
import { SeccionLibState } from '@ng-mf/data-access-user';
import { SeccionLibStore } from '@ng-mf/data-access-user';

import { CatalogoSelectComponent } from '@ng-mf/data-access-user';
import { CommonModule } from '@angular/common';
import { TablaSeleccion } from '@ng-mf/data-access-user';
import { ValidacionesFormularioService } from '@ng-mf/data-access-user';

import {
  ImmexAmpliacionSensiblesState,
  ImmexAmpliacionSensiblesStore,
} from '../estados/immex-ampliacion-sensibles.store';
import { ImmexAmpliacionSensiblesQuery } from '../estados/immex-ampliacion-sensibles.query';
import { ReactiveFormsModule } from '@angular/forms';
import { TablaDinamicaComponent } from '@ng-mf/data-access-user';
import { TituloComponent } from '@ng-mf/data-access-user';
/**
 * @title Anexo
 * @description Componente que permite visualizar el anexo de la solicitud
 * @summary Componente que permite visualizar el anexo de la solicitud
 *
 */
@Component({
  selector: 'app-anexo',
  templateUrl: './anexo.component.html',
  styleUrl: './anexo.component.scss',
  standalone: true,
  imports: [
    CatalogoSelectComponent,
    CommonModule,
    ReactiveFormsModule,
    TablaDinamicaComponent,
    TituloComponent,
  ]
})
export class AnexoComponent implements OnInit, OnDestroy, AfterViewInit {

  /**
   * Representa la selección de la tabla en el componente.
   * Utiliza la enumeración `TablaSeleccion` para definir el tipo de selección.
   * En este caso, está configurado como `RADIO`.
   */
  tabSelection: TablaSeleccion = TablaSeleccion.RADIO;
  /**
   * Grupo de formularios principal.
   * @property {FormGroup} forma
   */
  fraccionForm!: FormGroup;

  /**
   * Grupo de formularios principal.
   * @property {FormGroup} forma
   */
  fraccionArancelaria!: FormGroup;

  /**
   * Sujeto utilizado como notificador para la destrucción de componentes.
   * Este observable se utiliza para gestionar la limpieza de suscripciones
   * y evitar fugas de memoria al destruir el componente.
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * Representa el estado de la solicitud para la ampliación de sensibles en el contexto de IMMEX.
   * 
   * Esta propiedad almacena el estado actual de la solicitud, que incluye información
   * relevante para el proceso de ampliación de sensibles. Es utilizada para gestionar
   * y rastrear el estado de la solicitud dentro del componente.
   */
  public solicitudState!: ImmexAmpliacionSensiblesState;

  /**
   * Estado de la sección utilizado para gestionar el estado interno de la aplicación.
   * Este objeto contiene información relevante sobre la sección actual y su estado.
   * 
   * @private
   */
  private seccionState!: SeccionLibState;

  /**
   * Indica si el formulario debe mostrarse solo en modo de lectura.
   *
   * @type {boolean}
   * @memberof Anexo1Component
   */
  esFormularioSoloLectura:boolean=false;

  /**
   * Constructor del componente.
   * @param {FormBuilder} fb
   * @method constructor
   * @returns {void}
   */
  constructor(
    private readonly fb: FormBuilder,
    private immexAmpliacionSensiblesStore: ImmexAmpliacionSensiblesStore,
    private immexAmplicationSensiblesQuery: ImmexAmpliacionSensiblesQuery,
    private validacionesService: ValidacionesFormularioService,
    private seccionStore: SeccionLibStore,
    private seccionQuery: SeccionLibQuery,
    private readonly consultaQuery: ConsultaioQuery,
  ) {}
  ngOnInit(): void {
    this.seccionQuery.selectSeccionState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.seccionState = seccionState;
        })
      )
      .subscribe();
    this.immexAmplicationSensiblesQuery.selectSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((state) => {
          this.solicitudState = state as ImmexAmpliacionSensiblesState;
        })
      )
      .subscribe();
    this.initActionFormBuild();

    this.seccionStore.establecerFormaValida([false]);

    this.fraccionForm.statusChanges
      .pipe(
        takeUntil(this.destroyNotifier$),
        delay(10),
        tap((_value) => {
          if (this.fraccionForm.valid) {
            this.seccionStore.establecerSeccion([true]);
            this.seccionStore.establecerFormaValida([true]);
          } else {
            this.seccionStore.establecerFormaValida([false]);
          }
        })
      )
      .subscribe();
  }
  setValoresStore(
    form: FormGroup,
    campo: string,
    metodoNombre: keyof ImmexAmpliacionSensiblesStore
  ): void {
    const VALOR = form.get(campo)?.value;
    (this.immexAmpliacionSensiblesStore[metodoNombre] as (value: string | number | boolean) => void)(
      VALOR
    );
  }

  /**
   * Verifica si un campo específico en un formulario es válido.
   *
   * @param form - El formulario reactivo (FormGroup) que contiene los campos a validar.
   * @param field - El nombre del campo dentro del formulario que se desea validar.
   * @returns `true` si el campo es válido, `false` en caso contrario o si no se puede determinar.
   */
  isValid(form: FormGroup, field: string): boolean {
    const IS_VALID = this.validacionesService.isValid(form, field);
    return IS_VALID !== null && IS_VALID !== undefined ? IS_VALID : false;
  }

  /**
   * Inicializa el formulario de acción.
   * @method initActionFormBuild
   * @returns {void}
   */
  initActionFormBuild(): void {
    this.fraccionForm = this.fb.group({
      fraccionArancelariaSensibles: [
        this.solicitudState.fraccionArancelariaSensibles,
        Validators.required,
      ],
    });
    this.fraccionArancelaria = this.fb.group({
      fraccionArancelaria: [
        this.solicitudState.fraccionArancelaria,
        Validators.required,
      ],
      descripciondelproducto: [this.solicitudState.descripciondelproducto],
    });
  }

  /**
   * Configuración de las columnas de la tabla.
   * @property {any[]} configuracionColumnas
   */
  configuracionColumnasSensibles = [
    {
      encabezado: 'No',
      clave: (ele: { no: number }): number => ele.no,
      orden: 1,
    },
    {
      encabezado: 'Fracción Arancelaria',
      clave: (ele: { fraccionArancelaria: string }): string =>
        ele.fraccionArancelaria,
      orden: 2,
    },
    {
      encabezado: 'Descripción',
      clave: (ele: { descripcion: string }): string => ele.descripcion,
      orden: 3,
    },
    {
      encabezado: 'Cantidad Anual',
      clave: (ele: { CantidadAnual: string }): string => ele.CantidadAnual,
      orden: 4,
    },
    {
      encabezado: 'Capacidad Instalada',
      clave: (ele: { CapacidadInstaladaPorPeriodo: string }): string =>
        ele.CapacidadInstaladaPorPeriodo,
      orden: 5,
    },
    {
      encabezado: 'UMT',
      clave: (ele: { umt: string }): string => ele.umt,
      orden: 6,
    },
    {
      encabezado: 'Encabezado',
      clave: (ele: { encabezado: string }): string => ele.encabezado,
      orden: 7,
    },
  ];
  /**
   * Configuración de las columnas de la tabla.
   * @property {any[]} configuracionColumnas
   */
  configuracionColumnas = [
    {
      encabezado: 'No.',
      clave: (ele: { no: number }): number => ele.no,
      orden: 1,
    },
    {
      encabezado: 'Fracción de importación',
      clave: (ele: { fracciondeImportacion: string }): string =>
        ele.fracciondeImportacion,
      orden: 2,
    },
    {
      encabezado: ' Fracción de exportación',
      clave: (ele: { fracciondeExportacion: string }): string =>
        ele.fracciondeExportacion,
      orden: 3,
    },
    {
      encabezado: 'UMT ',
      clave: (ele: { umt: string }): string => ele.umt,
      orden: 4,
    },
    {
      encabezado: 'Descripción comercial del producto de exportación',
      clave: (ele: { descripcionComercial: string }): string =>
        ele.descripcionComercial,
      orden: 5,
    },
    {
      encabezado: 'Descripción de la',
      clave: (ele: { descripcion: string }): string => ele.descripcion,
      orden: 6,
    },
  ];

  /**
   * Datos de la tabla.
   * @property {any[]} datos
   */
  datos = [
    {
      no: 1,
      fraccionArancelaria: '72024101',
      umt: 'Kilogram',
      descripcion: 'Con un contenido de carbono superior al 4% en peso.',
      CantidadAnual: '12',
      CapacidadInstaladaPorPeriodo: '2',
      encabezado: '2',
    },
  ];
  /**
   * Datos de la tabla.
   * @property {any[]} datos2
   */
  datos2 = [
    {
      no: 1,
      fracciondeImportacion: '72024101',
      fracciondeExportacion: '72024101',
      umt: 'Kilogram',
      descripcionComercial:
        'Con un contenido de carbono superior al 4% en peso.',
      descripcion: 'Con un contenido de carbono superior al 4% en peso.',
    },
  ];

  /**
   * Método del ciclo de vida de Angular que se ejecuta cuando el componente se destruye.
   * Este método emite un valor en el observable `destroyNotifier$` para notificar a los suscriptores
   * que deben limpiar recursos o cancelar suscripciones, y luego completa el observable.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }

  /**
 * @inheritdoc
 * @description
 * Método del ciclo de vida de Angular que se ejecuta después de que la vista del componente ha sido inicializada.
 * 
 * Suscribe al observable `selectConsultaioState$` para escuchar cambios en el estado de la consulta.
 * Si el estado indica que no se está creando y el `procedureId` es '80202', actualiza la propiedad `esFormularioSoloLectura`
 * según el valor de `readonly` en el estado. Luego, inicializa el estado del formulario llamando a `inicializarEstadoFormulario()`.
 * La suscripción se cancela automáticamente cuando se emite un valor en `destroyNotifier$` para evitar fugas de memoria.
 *
 */
ngAfterViewInit(): void {
 this.consultaQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          if(!seccionState.create && seccionState.procedureId === '80202') {
            this.esFormularioSoloLectura = seccionState.readonly;
          }
          this.inicializarEstadoFormulario();
        })
      ).subscribe();
}

 /**
     * @method inicializarEstadoFormulario
     * @description
     * Inicializa el estado del formulario dependiendo si está en modo solo lectura.
     * Si el formulario no existe, lo crea. Si el formulario debe ser solo de lectura,
     * lo deshabilita; de lo contrario, lo habilita.
     */
    inicializarEstadoFormulario(): void {
      if (this.esFormularioSoloLectura) {
        this.fraccionForm.disable();
      } else {
        this.fraccionForm.enable();
      }
    }

}
