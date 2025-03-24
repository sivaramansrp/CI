import { AlertComponent, ConfiguracionColumna, TablaSeleccion } from '@ng-mf/data-access-user';
import { CapturarColumns, FABRICANTE_TABLE_COLUMNS } from '../../modelos/fabricante-datos.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { DESTINATARIO_TABLE_COLUMNS, DestinatarioCapturarColumns } from '../../modelos/destinatario-datos.model';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { TablaDinamicaComponent, TableComponent, TituloComponent } from '@ng-mf/data-access-user';
import { CommonModule } from '@angular/common';

import { TEXTOS } from '../../enums/terceros-relacionados.enum';
import { TercerosRelacionadosService } from '../../services/terceros-relacionados.service';


/**
 * @component
 * @name TercerosRelacionadosComponent
 * @description Este componente gestiona y muestra datos relacionados con "terceros relacionados",
 * incluyendo fabricantes y destinatarios. Utiliza tablas dinámicas para renderizar los datos.
 * 
 * @selector app-terceros-relacionados
 * @standalone true
 * @templateUrl ./terceros-relacionados.component.html
 * @styleUrl ./terceros-relacionados.component.scss
 * @providers [TercerosRelacionadosService]
 * @imports [CommonModule, TituloComponent, ReactiveFormsModule, AlertComponent, TablaDinamicaComponent, TableComponent]
 */
@Component({
  selector: 'app-terceros-relacionados',
  standalone: true,
  imports: [CommonModule, TituloComponent, ReactiveFormsModule, AlertComponent, TablaDinamicaComponent, TableComponent],
  providers: [TercerosRelacionadosService],
  templateUrl: './terceros-relacionados.component.html',
  styleUrl: './terceros-relacionados.component.scss',
})
export class TercerosRelacionadosComponent implements OnInit, OnDestroy {
 
  /**
   * @property {typeof TEXTOS} TEXTOS - Contiene constantes de texto utilizadas en el componente.
   */
  TEXTOS = TEXTOS;
 
  /**
   * @property {typeof TablaSeleccion} TablaSeleccion - Configuración para la selección de tablas.
   */
  TablaSeleccion = TablaSeleccion;
 
  /**
   * @property {CapturarColumns[]} fabricantedatosTabla - Almacena los datos de la tabla de fabricantes.
   */
  fabricantedatosTabla!: CapturarColumns[];
 
  /**
   * @property {DestinatarioCapturarColumns[]} destinatarioDatosTabla - Almacena los datos de la tabla de destinatarios.
   */
  destinatarioDatosTabla!: DestinatarioCapturarColumns[];
 
  /**
   * @property {Subject<void>} destroyed$ - Se utiliza para gestionar el ciclo de vida de las suscripciones y evitar fugas de memoria.
   */
  private destroyed$ = new Subject<void>();
 
  /**
   * @constructor
   * @param {FormBuilder} fb - FormBuilder para crear formularios reactivos.
   * @param {TercerosRelacionadosService} fabricanteService - Servicio para obtener datos relacionados con "terceros relacionados".
   */
  constructor(private fb: FormBuilder, private fabricanteService: TercerosRelacionadosService) {
    //
  }
 
  /**
   * @method ngOnInit
   * @description Hook del ciclo de vida que inicializa el componente. Obtiene datos para las tablas de fabricantes y destinatarios.
   */
  ngOnInit(): void {
    this.obtenerFabricanteTableIData();
    this.obtenerDestinatarioTableIData();
  }
 
  /**
   * @method obtenerFabricanteTableIData
   * @description Obtiene datos para la tabla de fabricantes desde el servicio.
   */
  obtenerFabricanteTableIData(): void {
    this.fabricanteService.obtenerInformaciónDeTablaDeFabricantes().pipe(
      takeUntil(this.destroyed$)
    ).subscribe(
      (data: CapturarColumns[]) => {
        this.fabricantedatosTabla = data;
      }
    );
  }
 
  /**
   * @method obtenerDestinatarioTableIData
   * @description Obtiene datos para la tabla de destinatarios desde el servicio.
   */
  obtenerDestinatarioTableIData(): void {
    this.fabricanteService.obtenerInformaciónDeTablaDeDestinatraios().pipe(
      takeUntil(this.destroyed$)
    ).subscribe(
      (data: DestinatarioCapturarColumns[]) => {
        this.destinatarioDatosTabla = data;
      }
    );
  }
  fabricanteTableColumns: ConfiguracionColumna<CapturarColumns>[] = FABRICANTE_TABLE_COLUMNS;
  /**
   * @property {ConfiguracionColumna<CapturarColumns>[]} fabricanteTableColumns
   
   *  - Configuración para las columnas de la tabla de fabricantes.
  */
 
  /**
   * @property {ConfiguracionColumna<DestinatarioCapturarColumns>[]} destinatarioTableColumns - Configuración para las columnas de la tabla de destinatarios.
   */
  destinatarioTableColumns: ConfiguracionColumna<DestinatarioCapturarColumns>[] = DESTINATARIO_TABLE_COLUMNS;
  /**
   * @method ngOnDestroy
   * @description Hook del ciclo de vida que limpia las suscripciones para evitar fugas de memoria.
   */
  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}