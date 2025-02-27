import { AlertComponent, Catalogo, CatalogoSelectComponent, InputRadioComponent, TableComponent, TituloComponent } from '@ng-mf/data-access-user';

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
    AlertComponent,
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

  tipoSeleccionTabla: TablaSeleccion = TablaSeleccion.CHECKBOX;

  configuracionTabla: ConfiguracionColumna<any>[] = [
    { encabezado: 'RFC', clave: (item: any) => item.rfc, orden: 1 },
    { encabezado: 'CURP', clave: (item: any) => item.curp, orden: 2 },
    { encabezado: 'Nombre', clave: (item: any) => item.nombre, orden: 3 },
    { encabezado: 'Apellido Paterno', clave: (item: any) => item.apellidoPaterno, orden: 4 },
    { encabezado: 'Apellido Materno', clave: (item: any) => item.apellidoMaterno, orden: 5 }
  ]

  datos: any[] = [
    {
      "rfc": "NEBRASKA DE JESUS",
      "curp": " ",
      "nombre": "NEBRASKA DE JESUS",
      "apellidoPaterno": "DEMPWOLFF",
      "apellidoMaterno": "CHAIC"
    }
  ]

  tableHeader: ConfiguracionColumna<any>[] = [
    { encabezado: 'Calle', clave: (item: any) => item.calle, orden: 1 },
    { encabezado: 'Número exterior ', clave: (item: any) => item.númeroExterior, orden: 2 },
    { encabezado: 'Número interior ', clave: (item: any) => item.númeroInterior, orden: 3 },
    { encabezado: 'Código postal', clave: (item: any) => item.códigoPostal, orden: 4 },
    { encabezado: 'Colonia', clave: (item: any) => item.colonia, orden: 5 },
    { encabezado: 'Municipio o alcaldia', clave: (item: any) => item.municipioAlcaldia, orden: 6 },
    { encabezado: 'Estado', clave: (item: any) => item.estado, orden: 7 }
  ]


  tableData: any[] = [
    {
      "calle": "AV PARQUE INDUSTRIALAZTECAS",
      "númeroExterior": "1550 ",
      "númeroInterior": "",
      "códigoPostal": "32679",
      "colonia": "PARQUE INDUSTRIAL AZTECA",
      "municipioAlcaldia": "JUAREZ",
      "estado": "CHIHUAHUA"
    }
  ]

  tableHeaderExtranjeros: ConfiguracionColumna<any>[] = [
    { encabezado: 'TAX ID', clave: (item: any) => item.taxId, orden: 1 },
    { encabezado: 'Razón social', clave: (item: any) => item.razonSocial, orden: 2 },
    { encabezado: 'Nombre ', clave: (item: any) => item.nombre, orden: 3 },
    { encabezado: ' Apellido paterno', clave: (item: any) => item.apellidoPaterno, orden: 4 },
    { encabezado: 'Pais', clave: (item: any) => item.pais, orden: 5 },
    { encabezado: 'CP', clave: (item: any) => item.cp, orden: 6 },
    { encabezado: 'Estado', clave: (item: any) => item.estado, orden: 7 }
  ]

  tableDataExtranjeros: any[] = [
    {
      "taxId": "TKT852014",
      "razonSocial": "ssss",
      "nombre": "",
      "apellidoPaterno": "",
      "pais": "",
      "cp": "78503",
      "estado": "texas"
    },
    {
      "taxId": "PRUEBA",
      "razonSocial": "P",
      "nombre": "",
      "apellidoPaterno": "",
      "pais": "",
      "cp": "78503",
      "estado": "texas"
    },
    {
      "taxId": "F997498874C",
      "razonSocial": "lobitos",
      "nombre": "",
      "apellidoPaterno": "",
      "pais": "",
      "cp": "54543545 ",
      "estado": " madagascar"
    }
  ]
}

