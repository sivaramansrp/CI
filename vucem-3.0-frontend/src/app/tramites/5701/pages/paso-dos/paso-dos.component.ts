import { Component } from '@angular/core';
import { Catalogo } from '../../../../core/models/5701/catalogos.model';
import { TEXTOS } from '../../../../shared/constantes/servicios-extraordinarios.enum';
import { ServiciosExtraordinariosService } from '../../../../core/services/5701/servicios-extraordinarios/servicios-extraordinarios.service';

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
    this.getTiposSolicitud();
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

  getTiposSolicitud() {
    this.sExtraordinarios.getCatalogos('cat-tipo-documento.json').subscribe((resp) => {
      if (resp.code === 200) {
        this.tiposDocumentos = resp.data
      }
    })
  }

  agregarDocumento(id: number) {
    console.log(id);

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
