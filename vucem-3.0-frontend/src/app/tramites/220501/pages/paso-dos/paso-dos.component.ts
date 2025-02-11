import { Component, OnInit } from '@angular/core';

import { CATALOGOS_ID } from '../../../../shared/constantes/constantes';
import { TEXTOS } from '../../../../shared/constantes/servicios-extraordinarios.enum';
import { Catalogo } from '../../../../core/models/shared/catalogos.model';
import { CatalogosService } from '../../../../core/services/shared/catalogos/catalogos.service';

/**
 * Componente para gestionar el paso dos del trámite.
 */
@Component({
  selector: 'paso-dos',
  templateUrl: './paso-dos.component.html',
  styleUrl: './paso-dos.component.scss',
})
export class PasoDosComponent implements OnInit {
  /**
 * Constantes de texto utilizadas en el componente.
 */
  TEXTOS = TEXTOS;

  /**
   * Lista de tipos de documentos.
   */
  tiposDocumentos: Catalogo[] = [];

  /**
   * Lista de documentos requeridos.
   */
  documentosSeleccionados: Catalogo[] = [
    {
      id: 1,
      descripcion: 'Documentos que ampare el valor de la mercancía'
    },
    {
      id: 2,
      descripcion: 'Documentos del medio de transporte (Guías, BL o carta porte según corresponda)'
    }
  ];

  /**
   * Constructor del componente.
   * @param catalogosServices Servicio para obtener los catálogos.
   */
  constructor(
    private catalogosServices: CatalogosService,
  ) { }

  /**
   * Método que se ejecuta al inicializar el componente.
   */
  ngOnInit() {
    this.getTiposDocumentos();

  }

  /**
   * Método para obtener los tipos de documentos.
   */
  getTiposDocumentos() {
    this.catalogosServices.getCatalogo(CATALOGOS_ID.CAT_TIPO_DOCUMENTO).subscribe((resp) => {
      if (resp.length > 0) {
        this.tiposDocumentos = resp;
      }
    })
  }

  /**
   * Método para agregar un documento a la lista de documentos requeridos.
   * @param id Identificador del documento a agregar.
   */
  agregarDocumento(id: number) {
    this.tiposDocumentos.forEach(el => {
      if (el.id === id) {
        this.documentosSeleccionados.push(el);
      }
    })
  }

  /**
 * Método para eliminar un documento de la lista de documentos seleccionados.
 * @param i Índice del documento a eliminar.
 */
  eliminar(i: number) {
    this.documentosSeleccionados.splice(i, 1)
  }
}
