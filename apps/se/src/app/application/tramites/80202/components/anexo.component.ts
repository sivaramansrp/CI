import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-anexo',
  templateUrl: './anexo.component.html',
  styleUrl: './anexo.component.scss',
})
export class AnexoComponent {
  fraccionForm!: FormGroup;
  fraccionArancelaria!: FormGroup;

  constructor(private readonly fb: FormBuilder) {
    this.initActionFormBuild();
  }

  ngOnInit() {}

  initActionFormBuild() {
    this.fraccionForm = this.fb.group({
      fraccionArancelaria: ['', Validators.required],
    });
    this.fraccionArancelaria = this.fb.group({
      fraccionArancelaria: ['', Validators.required],
      descripciondelproducto: [''],
    });
  }

  //add some sample columns to the table

  configuracionColumnasSensibles = [
    { encabezado: 'No', clave: (ele: any) => ele.no, orden: 1 },
    {
      encabezado: 'Fracción arancelaria',
      clave: (ele: any) => ele.fraccionArancelaria,
      orden: 2,
    },
    { encabezado: ' UMT_', clave: (ele: any) => ele.umt, orden: 3 },
    {
      encabezado: ' Descripción de la TIGIE',
      clave: (ele: any) => ele.descripcion,
      orden: 4,
    },
    {
      encabezado: 'Cantidad anual',
      clave: (ele: any) => ele.CantidadAnual,
      orden: 5,
    },
    {
      encabezado: 'Capacidad instalada por periodo #',
      clave: (ele: any) => ele.CapacidadInstaladaPorPeriodo,
      orden: 6,
    },
    {
      encabezado: ' Cantidad por periodo #',
      clave: (ele: any) => ele.encabezado,
      orden: 7,
    },
  ];
  configuracionColumnas = [
    { encabezado: 'No.', clave: (ele: any) => ele.no, orden: 1 },
    {
      encabezado: 'Fracción de importación',
      clave: (ele: any) => ele.fracciondeImportacion,
      orden: 2,
    },
    {
      encabezado: ' Fracción de exportación',
      clave: (ele: any) => ele.fracciondeExportacion,
      orden: 3,
    },
    {
      encabezado: 'UMT ',
      clave: (ele: any) => ele.umt,
      orden: 4,
    },
    {
      encabezado: 'Descripción comercial del producto de exportación',
      clave: (ele: any) => ele.descripcionComercial,
      orden: 5,
    },
    {
      encabezado: 'Descripción de la',
      clave: (ele: any) => ele.descripcion,
      orden: 6,
    },
  ];
  //add one row sample data for above columns
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
  //generate for configuracionColumnas

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
