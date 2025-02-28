import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component } from '@angular/core';

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
export class AnexoComponent {
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
   * Constructor del componente.
   * @param {FormBuilder} fb
   * @method constructor
   * @returns {void}
   */
  constructor(private readonly fb: FormBuilder) {
    this.initActionFormBuild();
  }

  /**
   * Inicializa el formulario de acción.
   * @method initActionFormBuild
   * @returns {void}
   */
  initActionFormBuild(): void {
    this.fraccionForm = this.fb.group({
      fraccionArancelaria: ['', Validators.required],
    });
    this.fraccionArancelaria = this.fb.group({
      fraccionArancelaria: ['', Validators.required],
      descripciondelproducto: [''],
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
      encabezado: 'Fracción arancelaria',
      clave: (ele: { fraccionArancelaria: string }): string =>
        ele.fraccionArancelaria,
      orden: 2,
    },
    {
      encabezado: ' UMT_',
      clave: (ele: { umt: string }): string => ele.umt,
      orden: 3,
    },
    {
      encabezado: ' Descripción de la TIGIE',
      clave: (ele: { descripcion: string }): string => ele.descripcion,
      orden: 4,
    },
    {
      encabezado: 'Cantidad anual',
      clave: (ele: { CantidadAnual: number }): number => ele.CantidadAnual,
      orden: 5,
    },
    {
      encabezado: 'Capacidad instalada por periodo #',
      clave: (ele: { CapacidadInstaladaPorPeriodo: number }): number =>
        ele.CapacidadInstaladaPorPeriodo,
      orden: 6,
    },
    {
      encabezado: ' Cantidad por periodo #',
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
