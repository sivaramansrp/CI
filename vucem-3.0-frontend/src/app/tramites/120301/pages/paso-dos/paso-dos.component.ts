/**
 * @component PasoDosComponent
 * @description Este componente es responsable de manejar el segundo paso del trámite.
 * Incluye la lógica para obtener y gestionar los tipos de documentos y los documentos seleccionados.
 * 
 * @import { Component } from '@angular/core';
 * @import { Catalogo } from '../../../../core/models/shared/catalogos.model';
 * @import { TEXTOS } from '../../../../shared/constantes/servicios-extraordinarios.enum';
 * @import { ServiciosExtraordinariosService } from '../../../../core/services/5701/servicios-extraordinarios/servicios-extraordinarios.service';
 * @import { CATALOGOS_ID } from '../../../../shared/constantes/constantes';
 * @import { CatalogosService } from '../../../../core/services/shared/catalogos/catalogos.service';
 */

import { Component } from '@angular/core';
import { Catalogo } from '../../../../core/models/shared/catalogos.model';
import { TEXTOS } from '../../../../shared/constantes/servicios-extraordinarios.enum';
import { ServiciosExtraordinariosService } from '../../../../core/services/5701/servicios-extraordinarios/servicios-extraordinarios.service';
import { CATALOGOS_ID } from '../../../../shared/constantes/constantes';
import { CatalogosService } from '../../../../core/services/shared/catalogos/catalogos.service';

@Component({
  selector: 'paso-dos',
  templateUrl: './paso-dos.component.html',
  styleUrl: './paso-dos.component.scss',
})
export class PasoDosComponent {
  TEXTOS = TEXTOS;

  /**
   * @property {Array<Catalogo>} tiposDocumentos - Array de tipos de documentos disponibles.
   */
  tiposDocumentos: Array<Catalogo> = [];

  /**
   * @property {Array<Catalogo>} documentosSeleccionados - Array de documentos seleccionados.
   */
  documentosSeleccionados: Array<Catalogo> = [];

  constructor(
    private catalogosServices: CatalogosService,
  ) {}

  /**
   * @method ngOnInit
   * @description Inicializa el componente y obtiene los tipos de documentos.
   */
  ngOnInit() {
    this.getTiposDocumentos();
    this.documentosSeleccionados = [
      {
        id: 1,
        descripcion: 'Documentos que ampare el valor de la mercancía'
      },
      {
        id: 2,
        descripcion: 'Documentos del medio de transporte (Guías, BL o carta porte según corresponda)'
      }
    ];
  }

  /**
   * @method getTiposDocumentos
   * @description Obtiene los tipos de documentos desde el servicio de catálogos.
   */
  getTiposDocumentos() {
    this.catalogosServices.getCatalogo(CATALOGOS_ID.CAT_TIPO_DOCUMENTO).subscribe((resp) => {
      if (resp.length > 0) {
        this.tiposDocumentos = resp;
      }
    });
  }

  /**
   * @method agregarDocumento
   * @description Agrega un documento seleccionado al array de documentos seleccionados.
   * @param {number} id - El ID del documento a agregar.
   */
  agregarDocumento(id: number) {
    this.tiposDocumentos.forEach(el => {
      if (el.id === id) {
        this.documentosSeleccionados.push(el);
      }
    });
  }

  /**
   * @method eliminar
   * @description Elimina un documento del array de documentos seleccionados.
   * @param {number} i - El índice del documento a eliminar.
   */
  eliminar(i: number) {
    this.documentosSeleccionados.splice(i, 1);
  }
}