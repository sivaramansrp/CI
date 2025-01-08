import { Component } from '@angular/core';
import { Catalogo } from '../../../../core/models/5701/catalogos.model';
import { TEXTOS } from '../../../../shared/constantes/servicios-extraordinarios.enum';
import { ServiciosExtraordinariosService } from '../../../../core/services/5701/servicios-extraordinarios/servicios-extraordinarios.service';
import { CATALOGOS_ID } from '../../../../shared/constantes/constantes';

@Component({
  selector: 'paso-dos',
  templateUrl: './paso-dos.component.html',
  styleUrl: './paso-dos.component.scss',
})
export class PasoDosComponent {
  TEXTOS = TEXTOS;

  tiposDocumentos: Array<Catalogo> = [];
  documentosSeleccionados: Array<Catalogo> = [];

  constructor(
    private sExtraordinarios: ServiciosExtraordinariosService,
  ) {}

  ngOnInit() {
    this.getTiposDocumentos();
    this.documentosSeleccionados = [
      {
        id: 1,
        value: 'Documentos que ampare el valor de la mercancía'
      },
      {
        id: 2,
        value: 'Documentos del medio de transporte (Guías, BL o carta porte según corresponda)'
      }
    ]

  }

  getTiposDocumentos() {
    this.sExtraordinarios.getCatalogo(CATALOGOS_ID.CAT_TIPO_DOCUMENTO).subscribe((resp) => {
      if (resp.codigo === '200') {
        this.tiposDocumentos = JSON.parse(resp.data)
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
