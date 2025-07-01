/* eslint-disable no-empty-function */
import { Component, OnDestroy, OnInit } from '@angular/core';

import { ConsultaioQuery, MENSAJEDEALERTA, TableBodyData, TituloComponent } from '@ng-mf/data-access-user';

import { TableComponent } from '@ng-mf/data-access-user';

// eslint-disable-next-line @nx/enforce-module-boundaries
import establecimientoTable from '../../../../../../../../../libs/shared/theme/assets/json/220401/establecimiento-table.json'

// eslint-disable-next-line @nx/enforce-module-boundaries
import destinatarioTable from '../../../../../../../../../libs/shared/theme/assets/json/220401/destinatario-table.json'

// eslint-disable-next-line @nx/enforce-module-boundaries
import importardorTable from '../../../../../../../../../libs/shared/theme/assets/json/220401/importador-table.json'

import { AlertComponent } from '@ng-mf/data-access-user';
import { CommonModule } from '@angular/common';

import { Subject,map,takeUntil } from 'rxjs';
import { AgregarDestinatoriaComponent } from '../agregar-destinatoria/agregar-destinatoria.component';
import { AgregarImportadorComponent } from '../agregar-importador/agregar-importador.component';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-terceros-relacionados',
  templateUrl: './terceros-relacionados.component.html',
  styleUrl: './terceros-relacionados.component.scss',
   standalone: true,
  imports: [TituloComponent,TableComponent,AlertComponent,AgregarDestinatoriaComponent,CommonModule,AgregarImportadorComponent,ModalComponent],
})
export class TercerosRelacionadosComponent implements OnInit, OnDestroy {


  public establecimientoHeaderData: string[] = [];
  public establecimientoBodyData: TableBodyData[] = [];
  public destinatarioHeaderData: string[] = [];
  public destinatarioBodyData: TableBodyData[] = [];
  public importadorHeaderData: string[] = [];
  public importadorBodyData: TableBodyData[] = [];
  public getEstablecimientoTableData = establecimientoTable;
  public getDestinatarioTableData = destinatarioTable;
  public getImportadorTableData = importardorTable;
  public TEXTOS = MENSAJEDEALERTA;
  public hasAgregar:boolean = false;
  public infoAlert = 'alert-info';
  public showTableDiv:boolean = true;
  public showAgregarDestinatario:boolean = false;
  public showAgregarImportador:boolean = false;
private destroyNotifier$: Subject<void> = new Subject();
esFormularioSoloLectura: boolean = false;
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor( private consultaioQuery: ConsultaioQuery,) {
       this.consultaioQuery.selectConsultaioState$
          .pipe(
            takeUntil(this.destroyNotifier$),
            map((seccionState) => {
              this.esFormularioSoloLectura = seccionState.readonly;
              
              
            })
          )
          .subscribe()
  }

  ngOnInit(): void {
    this.getEstablecimiento();
    this.getDestinatario();
    this.getImportador();
  }

  /**
   * @description getEstablecimiento se utiliza para establecer el establecimientoHeaderData de getEstablecimientoTableData
   */

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  public getEstablecimiento() {
    this.establecimientoHeaderData = this.getEstablecimientoTableData.tableHeader;
    this.establecimientoBodyData = this.getEstablecimientoTableData.tableBody;
  }

  /**
   * @description getDestinatario se utiliza para establecer el destinatarioHeaderData de getDestinatarioTableData
   */

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  public getDestinatario() {
    this.destinatarioHeaderData = this.getDestinatarioTableData.tableHeader;
    this.destinatarioBodyData = this.getDestinatarioTableData.tableBody;
  }

  /**
   * @description getImportador se utiliza para establecer el importadorHeaderData de getImportadorTableData
   */

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  public getImportador() {
    this.importadorHeaderData = this.getImportadorTableData.tableHeader;
    this.importadorBodyData = this.getImportadorTableData.tableBody;
  }

  /**
 * Alterna la visibilidad de la tabla y del formulario para agregar un destinatario.
 */
   toggleAgregarDestinatario():void {
    this.showTableDiv = !this.showTableDiv;
    this.showAgregarDestinatario = !this.showAgregarDestinatario;
  }

  /**
 * Alterna la visibilidad de la tabla y del formulario para agregar un importador.
 */
  toggleAgregarImportador():void {
    this.showTableDiv = !this.showTableDiv;
    this.showAgregarImportador = !this.showAgregarImportador;
  }

  /**
 * Cierra el formulario para agregar un destinatario y muestra la tabla.
 */
  cerrarAgregarDestinatario(): void {
    this.showAgregarDestinatario = false;
    this.showTableDiv = true;
  }

  /**
 * Cierra el formulario para agregar un importador y muestra la tabla.
 */
  cerrarAgregarImportador(): void {
    this.showAgregarImportador = false;
    this.showTableDiv = true;
  }

  /**
 * Limpia las suscripciones al destruir el componente para evitar fugas de memoria.
 */
    ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
