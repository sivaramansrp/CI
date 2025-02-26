import { Catalogo, CatalogoSelectComponent, InputRadioComponent, TableComponent, TituloComponent } from '@ng-mf/data-access-user';

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-datos-empresa',
  standalone: true,
  imports: [CommonModule,
    CatalogoSelectComponent,
    TituloComponent,
    TableComponent,
    InputRadioComponent],
  templateUrl: './datos-empresa.component.html',
  styleUrl: './datos-empresa.component.scss',
})
export class DatosEmpresaComponent implements OnInit {

  public federalEstatal !: Catalogo[];

  valorSeleccionado: string = '';

  ngOnInit(): void {
    this.getFederalEstatal();
  }

  public getFederalEstatal(): void {
    this.federalEstatal = [
      { id: 1, descripcion: 'Estado' },
      { id: 2, descripcion: 'Representación federal' },
    ]
  }

  tableHeaderData = ["Calle", "Número exterior", "Número interior", "Código postal", "Colonia", "Municipio o alcaldia", "Estado"]
  tableBodyData = []

  radioBtn = [
    {
      "label": "Si",
      "value": "Si"
    },
    {
      "label": "No",
      "value": "No"
    }
  ]

  // eslint-disable-next-line class-methods-use-this, @typescript-eslint/explicit-function-return-type
  cambioDeValor(_e: unknown) {
    return _e
  }
}

