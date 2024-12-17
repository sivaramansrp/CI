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

  tipos_documentos: Array<Catalogo> = [];
  documentos_seleccionados: Array<Catalogo> = [];

  constructor(
    private sExtraordinarios: ServiciosExtraordinariosService,
  ) {}

  ngOnInit() {
    this.getTiposSolicitud();
    this.documentos_seleccionados = [
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
        this.tipos_documentos = resp.data
      }
    })
  }

  agregarDocumento(id: number) {
    console.log(id);

    this.tipos_documentos.forEach( el => {
      if (el.id === id) {
        this.documentos_seleccionados.push(el);
      }
    })
  }

  eliminar(i: number) {
    this.documentos_seleccionados.splice(i, 1)
  }
}
