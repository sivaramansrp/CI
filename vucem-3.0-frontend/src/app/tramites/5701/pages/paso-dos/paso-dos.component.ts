import { Component } from '@angular/core';
import { Catalogo } from '../../../../core/models/5701/catalogos.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TEXTOS } from '../../../../shared/constantes/servicios-extraordinarios.enum';
import { ServiciosExtraordinariosService } from '../../../../core/services/5701/servicios-extraordinarios/servicios-extraordinarios.service';

@Component({
  selector: 'paso-dos',
  templateUrl: './paso-dos.component.html',
  styleUrl: './paso-dos.component.scss',
})
export class PasoDosComponent {
  TEXTOS = TEXTOS;
  public FormDocumento: FormGroup = this.fb.group({
    documento: [0]
  })
  tiposDocumentos: Array<Catalogo> = [];
  documentosSeleccionados: Array<Catalogo> = [];

  constructor(
    private fb: FormBuilder,
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
    this.sExtraordinarios.getCatalogoTipoSolicitudes().subscribe((resp) => {
      if (resp.code === 200) {
        this.tiposDocumentos = resp.data
      }
    })
  }

  agregarDocumento() {
    const documentoID = parseInt(this.FormDocumento.get('documento')?.value);

    this.tiposDocumentos.forEach( el => {
      if (el.id === documentoID) {
        this.documentosSeleccionados.push(el);
      }
    })
  }

  eliminar(i: number) {
    this.documentosSeleccionados.splice(i, 1)
  }
}
