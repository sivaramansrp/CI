import {
  DESTINATARIO_ENCABEZADO_DE_TABLA,
  Destinatario,
  FABRICANTE_ENCABEZADO_DE_TABLA,
  FACTURADOR_ENCABEZADO_DE_TABLA,
  Fabricante,
  Facturador,
  PROVEEDOR_ENCABEZADO_DE_TABLA,
  Proveedor,
} from '../../models/terceros-relacionados.model';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ConfiguracionColumna } from '@ng-mf/data-access-user';
import { TablaDinamicaComponent } from '@ng-mf/data-access-user';
import { TituloComponent } from '@ng-mf/data-access-user';
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
