import { Catalogo, CatalogoSelectComponent, InputRadioComponent, TableComponent, TituloComponent } from '@ng-mf/data-access-user';

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablaDinamicaComponent } from 'libs/shared/data-access-user/src/tramites/components/tabla-dinamica/tabla-dinamica.component';

import { ConfiguracionColumna } from 'libs/shared/data-access-user/src/core/models/shared/configuracion-columna.model';
import { TablaSeleccion } from 'libs/shared/data-access-user/src/core/enums/tabla-seleccion.enum';


@Component({
  selector: 'app-datos-empresa',
  standalone: true,
  imports: [CommonModule,
    CatalogoSelectComponent,
    TituloComponent,
    TableComponent,
    InputRadioComponent,
    TablaDinamicaComponent],
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

  tipoSeleccionTabla: TablaSeleccion=TablaSeleccion.CHECKBOX;

  configuracionTabla: ConfiguracionColumna<any>[] = [
    { encabezado: 'RFC', clave: (item: any) => item.RFC, orden: 1 },
    { encabezado: 'CURP', clave: (item: any) => item.CURP, orden: 2 },
    { encabezado: 'Nombre', clave: (item: any) => item.Nombre, orden: 3 },
    { encabezado: 'Apellido Paterno', clave: (item: any) => item.Apellido_paterno, orden: 4 },
    { encabezado: 'Apellido Materno', clave: (item: any) => item.Apellido_materno, orden: 5 }
  ]

  datos = [
    {
      "rfc": "MAHA790703QW5",
      "curp": "MAHA790703HGTTRR09 ",
      "nombre": "ARTURO",
      "apellidoPaterno": "MATA",
      "apellidoMaterno": "HERNANDEZ"
    },
    {
      "rfc": "LEQI8101311457",
      "curp": "LEQI810131HDGSXG05 ",
      "nombre": "IGNACIO EDUARDO",
      "apellidoPaterno": "LEOS",
      "apellidoMaterno": "QUINONES"
    },
    {
      "rfc": "MAVL621207C95",
      "curp": "MAVL621207HDGRLS06 ",
      "nombre": "LUIS AMBROSIO",
      "apellidoPaterno": "MARTINEZ",
      "apellidoMaterno": "VALENZUELA"
    }
  ]
}

