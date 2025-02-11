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
  infoAlert = 'alert-info';
  tiposDocumentos: Catalogo[] = [];
  documentosSeleccionados: Catalogo[] = [];

  constructor(
    private catalogosServices: CatalogosService,
  ) {}

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
    ]

  }

  getTiposDocumentos() {
    this.catalogosServices.getCatalogo(CATALOGOS_ID.CAT_TIPO_DOCUMENTO).subscribe((resp) => {
      if (resp.length > 0) {
        this.tiposDocumentos = resp;
      }
    })
  }

  agregarDocumento(id: number) {
    this.tiposDocumentos.forEach( el => {
      if (el.id === id) {
        this.documentosSeleccionados.push(el);
      }
    })
  }

  eliminar(i: number) {
    this.documentosSeleccionados.splice(i, 1)
  }
}
