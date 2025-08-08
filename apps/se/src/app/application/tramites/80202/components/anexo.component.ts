import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  ConsultaioQuery,
  SeccionLibQuery,
  SeccionLibState,
  SeccionLibStore,
  TablaDinamicaComponent,
  TablaSeleccion,
  TituloComponent,
  ValidacionesFormularioService,
} from '@ng-mf/data-access-user';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  ImmexAmpliacionSensiblesState,
  ImmexAmpliacionSensiblesStore,
} from '../estados/immex-ampliacion-sensibles.store';
import { delay, map, takeUntil, tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ImmexAmpliacionSensiblesQuery } from '../estados/immex-ampliacion-sensibles.query';
import { Subject } from 'rxjs';

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
    CommonModule,
    ReactiveFormsModule,
    TablaDinamicaComponent,
    TituloComponent
  ],
})
export class AnexoComponent implements OnInit, OnDestroy {
  /**
   * Representa la selección de entrada para el componente.
   * Este valor se utiliza para determinar el tipo de selección en la tabla dinámica.
   * Por defecto, está configurado como 1.
   */
  inputSelection = 0;

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
  esFormularioSoloLectura: boolean = false;

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
    private readonly consultaQuery: ConsultaioQuery
  ) {
    this.consultaQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.esFormularioSoloLectura = seccionState.readonly;
        })
      )
      .subscribe();
    this.inicializarEstadoFormulario();
  }

  /**
   * Método del ciclo de vida de Angular que se ejecuta cuando el componente se inicializa.
   * Inicializa el estado del formulario dependiendo si está en modo solo lectura.
   */
  ngOnInit(): void {
    this.inicializarEstadoFormulario();
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
            descripciondelproducto: [
              this.solicitudState.descripciondelproducto,
            ],
          });

          this.seccionStore.establecerFormaValida([false]);

          this.fraccionForm.statusChanges
            .pipe(
              takeUntil(this.destroyNotifier$),
              delay(10),
              tap(() => {
                const IS_VALID = this.fraccionForm.valid;
                this.seccionStore.establecerFormaValida([IS_VALID]);
                if (IS_VALID) {
                  this.seccionStore.establecerSeccion([true]);
                }
              })
            )
            .subscribe();
        })
      )
      .subscribe();
  }

  /**
   * Habilita o deshabilita el formulario dependiendo del modo de solo lectura.
   *
   * @returns {void}
   */
  guardarDatosFormulario(): void {
    this.initActionFormBuild();
    if (this.esFormularioSoloLectura) {
      this.fraccionForm.disable();
      this.fraccionArancelaria.disable();
    } else {
      this.fraccionForm.enable();
      this.fraccionArancelaria.enable();
    }
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
      this.guardarDatosFormulario();
    } else {
      this.initActionFormBuild();
    }
  }

  /**
   * Actualiza el estado del store con el valor de un campo específico del formulario.
   *
   * @param form - El formulario reactivo (FormGroup) que contiene el campo.
   * @param campo - El nombre del campo dentro del formulario cuyo valor se actualizará en el store.
   */
  setValoresStore(form: FormGroup | null, campo: string): void {
    if (!form) {
      return;
    }
    const CONTROL = form.get(campo);
    if (CONTROL && CONTROL.value !== null && CONTROL.value !== undefined) {
      this.immexAmpliacionSensiblesStore.actualizarEstado({
        [campo]: CONTROL.value,
      });
    }
  }

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
}
