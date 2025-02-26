import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { OnChanges } from '@angular/core';
import { SimpleChanges } from '@angular/core';
import { CarrosDeFerrocarril, TableComponent, TituloComponent } from '@ng-mf/data-access-user';

/** Componente para gestionar los datos de los carros de ferrocarril */
@Component({
  selector: 'app-carros-de-ferrocarril',
  standalone: true,
  imports:[TituloComponent, TableComponent],
  templateUrl: './carros-de-ferrocarril.component.html',
  styleUrl: './carros-de-ferrocarril.component.scss'
})
/** Componente para gestionar los datos de los carros de ferrocarril */
export class CarrosDeFerrocarrilComponent implements OnChanges {
   /** Matriz para contener datos para cada fila de la tabla */
  @Input() tablaFilaDatos: CarrosDeFerrocarril[] = [];

  /** Matriz para contener etiquetas de encabezado para la tabla */
  @Input() tablaHeadData: string[] = [];

  /** Matriz para contener datos para cada fila de la tabla */
  tableData = {
    tableBody: [],
    tableHeader: [],
  };

  /**
   *  ngOnChanges se utiliza para detectar cambios en la tabla de la componente 
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
