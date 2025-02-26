import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { OnChanges } from '@angular/core';
import { SimpleChanges } from '@angular/core';
import { HistorialInspeccionFisica, TableComponent, TituloComponent } from '@ng-mf/data-access-user';

/** Componente para gestionar el historial de inspección física */
@Component({
  selector: 'app-historial-inspeccion-fisica',
  standalone: true,
  imports: [TituloComponent, TableComponent],
  templateUrl: './historial-inspeccion-fisica.component.html',
  styleUrl: './historial-inspeccion-fisica.component.scss',
})
/** Componente para gestionar el historial de inspección física */
export class HistorialInspeccionFisicaComponent implements OnChanges {
  /** Matriz para contener etiquetas de encabezado para la tabla */
  @Input() tablaHeadData: string[] = [];

  /** Matriz para contener datos para cada fila de la tabla */
  @Input() tablaFilaDatos: HistorialInspeccionFisica[] = [];

  /** Matriz para contener datos para cada fila de la tabla */
  tableData = {
    tableBody: [],
    tableHeader: [],
  };

  /**
   * @description
   * ngOnChanges se utiliza para detectar cambios en la tabla de la componente
   * @param changes
   */
  ngOnChanges(changes: SimpleChanges): void {
    const tbodyKey = 'tablaHeadData';
    const tbodyData = 'tablaFilaDatos';
    if (changes[tbodyKey]?.currentValue) {
      this.tableData.tableHeader = changes[tbodyKey]?.currentValue;
    }
    if (changes[tbodyData]?.currentValue) {
      this.tableData.tableBody = changes[tbodyData]?.currentValue;
    }
  }
}
