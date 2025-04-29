import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {
  TablaDinamicaComponent,
  TablaSeleccion,
  TituloComponent,
} from '@ng-mf/data-access-user';
import { EMPRESA_SUBMANUFACTURERA_ENCABEZADO_DE_TABLA } from '../../models/modificacion-programa-immex-baja-submanufacturera.model';

@Component({
  selector: 'app-modificacion',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TituloComponent,
    TablaDinamicaComponent,
  ],
  templateUrl: './modificacion.component.html',
  styleUrl: './modificacion.component.css',
})
export class ModificacionComponent {
  modificacionForm!: FormGroup;
  submanufacturerasTablaConfiguracion = {
    tipoSeleccionTabla: TablaSeleccion.BUTTON,
    configuracionTabla: EMPRESA_SUBMANUFACTURERA_ENCABEZADO_DE_TABLA,
  };

  //estatus: string;
  // rfc: string;
  // razonSocial: string;
  // calle: string;
  // numeroInterior: string;
  // numeroExterior: string;
  // codigoPostal: string;
  // localidad: string;
  // municipioAlcaldia: string;
  // entidadFederativa: string;
  // pais: string;
  // telefono: string;
  // fax: string;
  // correoElectronico: string;
  submanufacturerasTablaDatos = [
    {
      estatus: 'Activo',
      rfc: 'AAL0409235E6',
      razonSocial: 'AEROPUERTO INTERNACIONAL DE CULIACAN S.A. DE C.V.',
      calle: 'AVENIDA EJERCITO MEXICANO',
      numeroInterior: 'S/N',
      numeroExterior: 'S/N',
      codigoPostal: '80000',
      localidad: 'CULIACAN',
      municipioAlcaldia: 'CULIACAN',
      entidadFederativa: 'SINALOA',
      pais: 'MEXICO',
      telefono: '667 716 00 00',
      fax: '667 716 00 00',
      correoElectronico: '',
    },
  ];
  constructor(private fb: FormBuilder) {
    this.crearFormaulario();
  }

  crearFormaulario(): void {
    this.modificacionForm = this.fb.group({
      rfc: [{ value: 'AAL0409235E6', disabled: true }],
      representacionFederal: [{ value: 'CULIACAN', disabled: true }],
      tipoModificacion: [{ value: 'Baja', disabled: true }],
      modificacionPrograma: [
        { value: 'Empresa submanufacturera', disabled: true },
      ],
    });
  }
}
