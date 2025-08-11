import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlertComponent, TableComponent, TituloComponent } from '@libs/shared/data-access-user/src';
import { Fabricante, Proveedor } from '../../../../shared/models/terceros-relacionados.model';
import { Subject, map, takeUntil } from 'rxjs';
import { AgregarFabricanteSanitarioComponent } from '../agregar-fabricante-sanitario/agregar-fabricante-sanitario.component';
import { AvisoSanitarioService } from '../../services/aviso-sanitario.service';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { TERCEROR_TEXTO_DE_ALERTA } from '../../constantes/aviso-enum';
import { TercerosRelacionadosProveederComponent } from '../../../../shared/components/terceros-relacionados-proveeder/terceros-relacionados-proveeder.component';
import { Tramite260601Query } from '../../../../estados/queries/tramite260601.query';
import { Tramite260601Store } from '../../../../estados/tramites/tramite260601.store';
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
    AgregarFabricanteSanitarioComponent,
    TercerosRelacionadosProveederComponent
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
   * @property {boolean} habilitarProveedor
   * @description
   * Indica si la opción para agregar proveedores está habilitada en el formulario.
   */
  habilitarProveedor: boolean = true;
  
  /**
   * @property {boolean} habilitarFabricante
   * @description
   * Indica si la opción para agregar fabricantes está habilitada en el formulario.
   */
  habilitarFabricante: boolean = true;
  
  /**
   * Datos de la tabla de fabricantes desde un archivo JSON.
   */
  public getFabricanteTableData = fabricanteTable;

  /**
   * Datos de la tabla de proveedores desde un archivo JSON.
   */
  public getProveedorTableData = proveedorTable;

  /**
   * @property {Proveedor[]} proveedorTablaDatos
   * @description
   * Arreglo que contiene los datos de los proveedores relacionados con el trámite.
   */
  proveedorTablaDatos: Proveedor[] = [];

  /**
   * @property {Fabricante[]} fabricanteTablaDatos
   * @description
   * Arreglo que contiene los datos de los fabricantes relacionados con el trámite.
   */
  fabricanteTablaDatos: Fabricante[] = [];

  /**
   * Indica si el formulario está en modo solo lectura.
   * Cuando es `true`, los campos del formulario no se pueden editar.
   */
  esFormularioSoloLectura: boolean = false;

  private destruirNotificador$: Subject<void> = new Subject();

  constructor( private consultaioQuery: ConsultaioQuery,
    public tramiteQuery: Tramite260601Query,
    public tramiteStore: Tramite260601Store,
   ){}

  /**
   * Método de inicialización del componente.
   * Carga datos de proveedores y fabricantes en tablas.
   */
  ngOnInit(): void {

    this.tramiteQuery.getProveedorTablaDatos$
      .pipe(takeUntil(this.destruirNotificador$))
      .subscribe((data) => {
        this.proveedorTablaDatos = data;
      });

    this.tramiteQuery.getFabricanteTablaDatos$
      .pipe(takeUntil(this.destruirNotificador$))
      .subscribe((data) => {
        this.fabricanteTablaDatos = data;
      });

    this.consultaioQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destruirNotificador$),
        map((seccionState) => {
          this.esFormularioSoloLectura = seccionState.readonly;
        })
      )
      .subscribe();
  }

    /**
   * @method addProveedores
   * @description
   * Agrega nuevos proveedores al estado global del trámite utilizando el store.
   * Llama al método `updateProveedorTablaDatos` del store para concatenar los nuevos proveedores al arreglo existente.
   * @param {Proveedor[]} newProveedores - Arreglo de proveedores a agregar.
   * @returns {void}
   */
  addProveedores(newProveedores: Proveedor[]): void {
    this.tramiteStore.updateProveedorTablaDatos(newProveedores);
  }

  /**
   * @method addFabricantes
   * @description
   * Agrega nuevos fabricantes al estado global del trámite utilizando el store.
   * Llama al método `updateFabricanteTablaDatos` del store para concatenar los nuevos fabricantes al arreglo existente.
   * @param {Fabricante[]} newFabricantes - Arreglo de fabricantes a agregar.
   * @returns {void}
   */
  addFabricantes(newFabricantes: Fabricante[]): void {
    this.tramiteStore.updateFabricanteTablaDatos(newFabricantes);
  }
}
