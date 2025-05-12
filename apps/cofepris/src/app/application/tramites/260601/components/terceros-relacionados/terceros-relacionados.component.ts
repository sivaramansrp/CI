import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlertComponent, TableComponent, TituloComponent } from '@libs/shared/data-access-user/src';
import { AgregarFabricanteComponent } from '../agregar-fabricante/agregar-fabricante.component';
import { AgregarProveedorComponent } from '../agregar-proveedor/agregar-proveedor.component';
import { AvisoSanitarioService } from '../../services/aviso-sanitario.service';
import { TERCEROR_TEXTO_DE_ALERTA } from '../../constantes/aviso-enum';
import fabricanteTable from '@libs/shared/theme/assets/json/260601/fabricante-table.json';
import proveedorTable from '@libs/shared/theme/assets/json/260601/proveedor-table.json';

/**
 * Componente para gestionar el terceros relacionados.
 */
@Component({
  selector: 'app-terceros-relacionados',
  standalone: true,
  imports: [
    CommonModule,
    TituloComponent,
    AlertComponent,
    TableComponent,
    AgregarProveedorComponent,
    AgregarFabricanteComponent
  ],
  providers: [AvisoSanitarioService],
  templateUrl: './terceros-relacionados.component.html',
  styleUrl: './terceros-relacionados.component.css',
})
/*eslint class-methods-use-this: ["error", { "exceptMethods": ["limpiarProveedor", "limpiarFabricante"] }] */
export class TercerosRelacionadosComponent implements OnInit {
  /**
   * Texto de alerta utilizado en el componente.
   */
  TEXTOS: string = TERCEROR_TEXTO_DE_ALERTA;

  /**
   * Cabeceras de la tabla de proveedores.
   */
  public proveedorHeaderData: string[] = [];

  /**
   * Cuerpo de datos de la tabla de proveedores.
   */
  public proveedorBodyData: unknown = null;

  /**
   * Cabeceras de la tabla de fabricantes.
   */
  public fabricanteHeaderData: string[] = [];

  /**
   * Cuerpo de datos de la tabla de fabricantes.
   */
  public fabricanteBodyData: unknown = null;

  /**
   * Datos de la tabla de fabricantes desde un archivo JSON.
   */
  public getFabricanteTableData = fabricanteTable;

  /**
   * Datos de la tabla de proveedores desde un archivo JSON.
   */
  public getProveedorTableData = proveedorTable;

  /**
   * Método de inicialización del componente.
   * Carga datos de proveedores y fabricantes en tablas.
   */
  ngOnInit(): void {
    this.obtenerProveedor();
    this.obtenerFabricante();
  }

  /**
   * Obtiene los datos de la tabla de proveedores.
   */
  public obtenerProveedor(): void {
    this.proveedorHeaderData = this.getProveedorTableData.tableHeader;
    this.proveedorBodyData = this.getProveedorTableData.tableBody;
  }

  /**
   * Obtiene los datos de la tabla de fabricantes.
   */
  public obtenerFabricante(): void {
    this.fabricanteHeaderData = this.getFabricanteTableData.tableHeader;
    this.fabricanteBodyData = this.getFabricanteTableData.tableBody;
  }

  /**
   * Limpia los datos de los proveedores seleccionados. 
   */
  limpiarProveedor(): void {
    // Implementar la lógica para limpiar proveedor.
  }

  /**
   * Limpia los datos de los fabricantes seleccionados.
   */
  limpiarFabricante(): void {
    // Implementar la lógica para limpiar fabricante.
  }
}
