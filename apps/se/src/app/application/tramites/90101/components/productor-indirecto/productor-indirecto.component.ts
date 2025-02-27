/**
 * @component ProductorIndirectoComponent
 * @description Este componente es responsable de manejar los datos del productor indirecto.
 * Incluye la lógica para obtener y gestionar los datos del productor, así como los catálogos relacionados.
 * 
 * @import { Component } from '@angular/core';
 * @import { FormBuilder, FormGroup } from '@angular/forms';
 * @import { PRODUCTORCOLUMNS } from 'libs/shared/data-access-user/src/tramites/constantes/prosec.module';
 * @import { ProsecService } from 'libs/shared/data-access-user/src/core/services/90101/prosec.module';
 */

import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProsecService } from 'libs/shared/data-access-user/src/core/services/90101/prosec.module';
import { TablaSeleccion } from 'libs/shared/data-access-user/src/core/enums/tabla-seleccion.enum';

@Component({
  selector: 'app-productor-indirecto',
  templateUrl: './productor-indirecto.component.html',
  styleUrl: './productor-indirecto.component.scss'
})
export class ProductorIndirectoComponent {

  /**
   * @property {FormGroup} productorIndirecto - El grupo de formularios para capturar los datos del productor indirecto.
   */
  productorIndirecto!: FormGroup;

  TablaSeleccion = TablaSeleccion;

  productorColumnsConfiguracion = [
    { encabezado: 'Registro federal de contribuyentes', clave: (ele: any) => ele.contribuyentes, orden: 1 },
    {
      encabezado: 'Denominación o razón social',
      clave: (ele: any) => ele.razonSocial,
      orden: 2,
    },
    {
      encabezado: 'Correo',
      clave: (ele: any) => ele.Correo,
      orden: 3,
    },
  ];

  productorDato = [
    {
      contribuyentes: 'TS0931210493',
      razonSocial: 'TRW SISTEMAS DE DIRECCIONESS DE AL DE CV',
      Correo: 'carlos.flores@trw'
    }
  ]

  constructor(private readonly fb: FormBuilder, private ProsecService: ProsecService) {
    this.productorIndirecto = this.fb.group({
      contribuyentes: [''],
    });
  }

  /**
   * @method ngOnInit
   * @description Inicializa el componente y obtiene los datos de los productores.
   */
  ngOnInit(): void {
    
  }

}