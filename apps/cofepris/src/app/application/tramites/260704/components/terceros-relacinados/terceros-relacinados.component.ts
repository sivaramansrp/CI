import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TituloComponent } from '../../../../../../../../../libs/shared/data-access-user/src/tramites/components/titulo/titulo.component';
import { AlertComponent } from '../../../../../../../../../libs/shared/data-access-user/src/tramites/components/alert/alert.component';
import { AVISO_PRIVACIDAD } from '../../constantes/consulta.enum';
import { TablaDinamicaComponent } from '../../../../../../../../../libs/shared/data-access-user/src/tramites/components/tabla-dinamica/tabla-dinamica.component';
import {
  ConfiguracionColumna,
  TablaSeleccion,
} from '@libs/shared/data-access-user/src';
import { Destinatario, Fabricante } from '../../models/consulta.model';

@Component({
  selector: 'app-terceros-relacinados',
  standalone: true,
  imports: [
    CommonModule,
    TituloComponent,
    AlertComponent,
    TablaDinamicaComponent,
  ],
  templateUrl: './terceros-relacinados.component.html',
  styleUrl: './terceros-relacinados.component.css',
})
export class TercerosRelacinadosComponent implements OnInit, OnDestroy {
  AVISO_PRIVACIDAD = AVISO_PRIVACIDAD;
  TablaSeleccion = TablaSeleccion;
  selectedDestinatario: Fabricante[] = [];
  destinatarioDatos: Destinatario[] = [];
   fabricanteDatos: Fabricante[] = [];

  destinatarioConfiguracionTabla: ConfiguracionColumna<Destinatario>[] = [
    {
      encabezado: 'Nombre/denominación o razón social',
      clave: (item: Destinatario) => item.nombre,
      orden: 1,
    },
    {
      encabezado: 'R.F.C.',
      clave: (item: Destinatario) => item.rfc,
      orden: 2,
    },
    {
      encabezado: 'CURP',
      clave: (item: Destinatario) => item.curp,
      orden: 3,
    },
    {
      encabezado: 'Teléfono',
      clave: (item: Destinatario) => item.telefono,
      orden: 4,
    },
    {
      encabezado: 'Correo electrónico',
      clave: (item: Destinatario) => item.correoElectronico,
      orden: 5,
    },
    {
      encabezado: 'Calle',
      clave: (item: Destinatario) => item.calle,
      orden: 6,
    },
    {
      encabezado: 'Número exterior',
      clave: (item: Destinatario) => item.numeroExterior,
      orden: 7,
    },
    {
      encabezado: 'Número interior',
      clave: (item: Destinatario) => item.numeroInterior,
      orden: 8,
    },
    {
      encabezado: 'País',
      clave: (item: Destinatario) => item.pais,
      orden: 9,
    },
    {
      encabezado: 'Colonia',
      clave: (item: Destinatario) => item.colonia,
      orden: 10,
    },
    {
      encabezado: 'Municipio o alcaldía',
      clave: (item: Destinatario) => item.municipio,
      orden: 11,
    },
    {
      encabezado: 'Localidad',
      clave: (item: Destinatario) => item.localidad,
      orden: 12,
    },
    {
      encabezado: 'Estado',
      clave: (item: Destinatario) => item.estado,
      orden: 13,
    },
    {
      encabezado: 'Estado',
      clave: (item: Destinatario) => item.estado2,
      orden: 14,
    },
    {
      encabezado: 'Código postal',
      clave: (item: Destinatario) => item.codigo,
      orden: 15,
    },
  ];

  fabricanteConfiguracionTabla: ConfiguracionColumna<Fabricante>[] = [
    {
      encabezado: 'Nombre/denominación o razón social',
      clave: (item: Fabricante) => item.nombre,
      orden: 1,
    },
    {
      encabezado: 'R.F.C.',
      clave: (item: Fabricante) => item.rfc,
      orden: 2,
    },
    {
      encabezado: 'CURP',
      clave: (item: Fabricante) => item.curp,
      orden: 3,
    },
    {
      encabezado: 'Teléfono',
      clave: (item: Fabricante) => item.telefono,
      orden: 4,
    },
    {
      encabezado: 'Correo electrónico',
      clave: (item: Fabricante) => item.correoElectronico,
      orden: 5,
    },
    {
      encabezado: 'Calle',
      clave: (item: Fabricante) => item.calle,
      orden: 6,
    },
    {
      encabezado: 'Número exterior',
      clave: (item: Fabricante) => item.numeroExterior,
      orden: 7,
    },
    {
      encabezado: 'Número interior',
      clave: (item: Fabricante) => item.numeroInterior,
      orden: 8,
    },
    {
      encabezado: 'País',
      clave: (item: Fabricante) => item.pais,
      orden: 9,
    },
    {
      encabezado: 'Colonia',
      clave: (item: Fabricante) => item.colonia,
      orden: 10,
    },
    {
      encabezado: 'Municipio o alcaldía',
      clave: (item: Fabricante) => item.municipio,
      orden: 11,
    },
    {
      encabezado: 'Localidad',
      clave: (item: Fabricante) => item.localidad,
      orden: 12,
    },
    {
      encabezado: 'Estado',
      clave: (item: Fabricante) => item.estado,
      orden: 13,
    },
    {
      encabezado: 'Estado',
      clave: (item: Fabricante) => item.estado2,
      orden: 14,
    },
    {
      encabezado: 'Código postal',
      clave: (item: Fabricante) => item.codigo,
      orden: 15,
    },
  ];
  constructor() {}
 
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  getDestinatarioDatos(evento: Fabricante[]) {
    this.selectedDestinatario = evento;
  }
  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }
}
