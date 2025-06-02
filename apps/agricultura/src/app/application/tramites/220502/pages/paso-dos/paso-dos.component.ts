import { Component, OnInit } from '@angular/core';
import { CATALOGOS_ID } from '@ng-mf/data-access-user';
import { Catalogo } from '@ng-mf/data-access-user';
import { CatalogosService } from '@ng-mf/data-access-user';
import { TEXTOS } from '@ng-mf/data-access-user';
/**
 * Componente para gestionar el paso dos del trámite.
 */
@Component({
  selector: 'app-paso-dos',
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
  ) { 
    // El constructor se utiliza para la inyección de dependencias.
  }

  /**
   * Método que se ejecuta al inicializar el componente.
   */
  ngOnInit(): void {
    this.getTiposDocumentos();

  }

  /**
   * Método para obtener los tipos de documentos.
   */
  getTiposDocumentos(): void {
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
  agregarDocumento(id: number): void {
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
  eliminar(i: number): void {
    this.documentosSeleccionados.splice(i, 1)
  }
}
