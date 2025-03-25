import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfiguracionColumna } from '@ng-mf/data-access-user';
import { TablaDinamicaComponent } from '@ng-mf/data-access-user';
import { TituloComponent } from '@ng-mf/data-access-user';
import {
  Destinatario,
  DESTINATARIO_ENCABEZADO_DE_TABLA,
  Fabricante,
  FABRICANTE_ENCABEZADO_DE_TABLA,
  Facturador,
  FACTURADOR_ENCABEZADO_DE_TABLA,
  Proveedor,
  PROVEEDOR_ENCABEZADO_DE_TABLA,
} from '../../models/terceros-relacionados.model';
@Component({
  selector: 'app-terceros-relacionados',
  standalone: true,
  imports: [CommonModule, TituloComponent, TablaDinamicaComponent],
  templateUrl: './terceros-relacionados.component.html',
  styleUrl: './terceros-relacionados.component.css',
})
export class TercerosRelacionadosComponent {
  configuracionTablaFabricante: ConfiguracionColumna<Fabricante>[] =
    FABRICANTE_ENCABEZADO_DE_TABLA;
  configuracionTablaDestinatarioFinal: ConfiguracionColumna<Destinatario>[] =
    DESTINATARIO_ENCABEZADO_DE_TABLA;
  configuracionTablaProveedor: ConfiguracionColumna<Proveedor>[] =
    PROVEEDOR_ENCABEZADO_DE_TABLA;
  configuracionTablaFacturador: ConfiguracionColumna<Facturador>[] =
    FACTURADOR_ENCABEZADO_DE_TABLA;

  fabricanteTablaDatos = [];
  destinatarioFinalTablaDatos = [];
  proveedorTablaDatos = [];
  facturadorTablaDatos = [];
}
