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

import { FormBuilder, FormGroup } from '@angular/forms';
import { Component } from '@angular/core';
import { ConfiguracionColumna } from '@ng-mf/data-access-user';
import { FilaProductos } from '../../models/prosec.module';
import { ProsecService } from '../../services/prosec.service';
import { TablaSeleccion } from '@ng-mf/data-access-user';

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

  productorColumnsConfiguracion : ConfiguracionColumna<FilaProductos>[] = [
    { encabezado: 'Registro federal de contribuyentes', 
      clave: (fila) => fila.contribuyentes, 
      orden: 1 },
    {
      encabezado: 'Denominación o razón social',
      clave: (fila) => fila.razonSocial,
      orden: 2,
    },
    {
      encabezado: 'Correo',
      clave: (fila) => fila.Correo,
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


}