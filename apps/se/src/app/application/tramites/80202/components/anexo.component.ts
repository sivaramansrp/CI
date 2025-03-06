import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TablaSeleccion } from '@ng-mf/data-access-user';

import {
  ImmexAmpliacionSensiblesState,
  ImmexAmpliacionSensiblesStore,
} from '../estados/immex-ampliacion-sensibles.store';
import { ImmexAmpliacionSensiblesQuery } from '../estados/immex-ampliacion-sensibles.query';
import { Subject } from 'rxjs';
import { map } from 'rxjs';
import { takeUntil } from 'rxjs';

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
})
export class AnexoComponent implements OnInit, OnDestroy {
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

  private destroyNotifier$: Subject<void> = new Subject();

  public solicitudState!: ImmexAmpliacionSensiblesState;

  /**
   * Constructor del componente.
   * @param {FormBuilder} fb
   * @method constructor
   * @returns {void}
   */
  constructor(
    private readonly fb: FormBuilder,
    private immexAmpliacionSensiblesStore: ImmexAmpliacionSensiblesStore,
    private immexAmplicationSensiblesQuery: ImmexAmpliacionSensiblesQuery
  ) {}
  ngOnInit(): void {
    this.immexAmplicationSensiblesQuery.selectSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((state) => {
          this.solicitudState = state as ImmexAmpliacionSensiblesState;
        })
      )
      .subscribe();
    this.initActionFormBuild();
  }
  setValoresStore(
    form: FormGroup,
    campo: string,
    metodoNombre: keyof ImmexAmpliacionSensiblesStore
  ): void {
    const VALOR = form.get(campo)?.value;
    console.log(VALOR);
    (this.immexAmpliacionSensiblesStore[metodoNombre] as (value: any) => void)(
      VALOR
    );
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

  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
