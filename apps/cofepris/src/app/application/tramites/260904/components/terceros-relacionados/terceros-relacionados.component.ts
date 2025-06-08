/**
 * @fileoverview Este archivo define el componente TercerosRelacionadosComponent,
 * que gestiona y visualiza información de terceros relacionados, específicamente
 * fabricantes y destinatarios, en un formato de tablas dinámicas.
 *
 * @module TercerosRelacionados
 * @requires @ng-mf/data-access-user
 * @requires @angular/core
 * @requires @angular/forms
 * @requires rxjs
 * @requires @angular/common
 */
 
import { AlertComponent, ConfiguracionColumna, TablaSeleccion } from '@ng-mf/data-access-user';
import { CapturarColumns, FABRICANTE_TABLE_COLUMNS } from '../../modelos/fabricante-datos.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConsultaioQuery,
  ConsultaioStore,} from "@ng-mf/data-access-user";
import { DESTINATARIO_TABLE_COLUMNS, DestinatarioCapturarColumns } from '../../modelos/destinatario-datos.model';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Subject ,map, takeUntil } from 'rxjs';
import { TablaDinamicaComponent, TableComponent, TituloComponent } from '@ng-mf/data-access-user';
import { CommonModule } from '@angular/common';
 
import { TEXTOS } from '@libs/shared/data-access-user/src/tramites/constantes/octava-temporal.enum';
import { TercerosRelacionadosService } from '../../services/terceros-relacionados/terceros-relacionados.service';
 
/**
 * @component
 * @name TercerosRelacionadosComponent
 * @description Este componente gestiona y muestra datos relacionados con "terceros relacionados",
 * incluyendo fabricantes y destinatarios. Utiliza tablas dinámicas para renderizar los datos
 * y proporciona funcionalidades para visualizar información de fabricantes y destinatarios
 * dentro del flujo de la aplicación.
 *
 * El componente obtiene datos de fabricantes y destinatarios al inicializarse y los mantiene
 * disponibles para su visualización en las tablas correspondientes. Implementa correcta
 * gestión del ciclo de vida para prevenir fugas de memoria mediante la limpieza de suscripciones.
 *
 * @selector app-terceros-relacionados
 * @standalone true
 * @templateUrl ./terceros-relacionados.component.html
 * @styleUrl ./terceros-relacionados.component.scss
 * @providers [TercerosRelacionadosService]
 * @imports [
 *   CommonModule,
 *   TituloComponent,
 *   ReactiveFormsModule,
 *   AlertComponent,
 *   TablaDinamicaComponent,
 *   TableComponent
 * ]
 * @implements {OnInit} - Implementa la interfaz OnInit para inicializar datos al cargar el componente
 * @implements {OnDestroy} - Implementa la interfaz OnDestroy para limpiar suscripciones al destruir el componente
 * @example
 * <app-terceros-relacionados></app-terceros-relacionados>
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
   * @property {FormGroup} tercerosRelacionadosForm
   * @description Grupo de formulario reactivo para gestionar los controles del formulario
   * relacionados con terceros. Permite capturar y validar la información ingresada.
   * @public
   */
  tercerosRelacionadosForm!: FormGroup;
 
  /**
   * @property {typeof TEXTOS} TEXTOS
   * @description Constantes de texto utilizadas en el componente para mostrar etiquetas,
   * mensajes y títulos en la interfaz de usuario. Proporciona centralización de textos
   * para facilitar cambios y traducciones.
   * @public
   */
  TEXTOS = TEXTOS;
 
  /**
   * @property {typeof TablaSeleccion} TablaSeleccion
   * @description Configuración para la selección de tablas. Define los tipos de selección
   * disponibles y cómo se comporta la interacción de selección en las tablas dinámicas.
   * @public
   */
  TablaSeleccion = TablaSeleccion;
 
  /**
   * @property {CapturarColumns[]} fabricantedatosTabla
   * @description Almacena los datos de la tabla de fabricantes que se mostrarán en la
   * interfaz. Esta propiedad se inicializa con datos obtenidos del servicio.
   * @public
   */
  fabricantedatosTabla!: CapturarColumns[];
 
  /**
   * @property {DestinatarioCapturarColumns[]} destinatarioDatosTabla
   * @description Almacena los datos de la tabla de destinatarios que se mostrarán en la
   * interfaz. Esta propiedad se inicializa con datos obtenidos del servicio.
   * @public
   */
  destinatarioDatosTabla!: DestinatarioCapturarColumns[];
 
  /**
   * @property {ConfiguracionColumna<CapturarColumns>[]} fabricanteTableColumns
   * @description Configuración para las columnas de la tabla de fabricantes, incluyendo
   * títulos, anchos, visibilidad y formato de presentación de cada columna.
   * @public
   */
  fabricanteTableColumns: ConfiguracionColumna<CapturarColumns>[] = FABRICANTE_TABLE_COLUMNS;
 
  /**
   * @property {ConfiguracionColumna<DestinatarioCapturarColumns>[]} destinatarioTableColumns
   * @description Configuración para las columnas de la tabla de destinatarios, incluyendo
   * títulos, anchos, visibilidad y formato de presentación de cada columna.
   * @public
   */
  destinatarioTableColumns: ConfiguracionColumna<DestinatarioCapturarColumns>[] = DESTINATARIO_TABLE_COLUMNS;

  /**
   * Indica si el formulario está en modo solo lectura.
   * Cuando es `true`, los campos del formulario no se pueden editar.
   */
  esFormularioSoloLectura: boolean = false;
 
  /**
   * @property {Subject<void>} destroyed$
   * @description Subject utilizado para gestionar el ciclo de vida de las suscripciones
   * y evitar fugas de memoria. Se completa en el método ngOnDestroy.
   * @private
   */
  private destroyed$ = new Subject<void>();
 
  /**
   * @constructor
   * @description Inicializa una nueva instancia del componente TercerosRelacionadosComponent.
   *
   * @param {FormBuilder} fb - FormBuilder para crear formularios reactivos. Permite
   * construir y configurar estructuras de formularios dinámicas para la entrada de datos.
   *
   * @param {TercerosRelacionadosService} fabricanteService - Servicio para obtener datos
   * relacionados con terceros relacionados. Proporciona métodos para comunicarse con el
   * backend y obtener información de fabricantes y destinatarios.
   */
  constructor(private fb: FormBuilder, private fabricanteService: TercerosRelacionadosService, private consultaQuery: ConsultaioQuery
  ) {
    this.consultaQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyed$),
        map((seccionState) => {
          this.esFormularioSoloLectura = seccionState.readonly || true;
        })
      )
      .subscribe();
  }
  /**
   * @method ngOnInit
   * @description Hook del ciclo de vida que inicializa el componente. Se ejecuta una vez
   * después de que Angular ha inicializado todas las propiedades vinculadas a datos del
   * componente. Obtiene datos para las tablas de fabricantes y destinatarios.
   *
   * @returns {void}
   * @public
   * @implements OnInit
   */
  ngOnInit(): void {
    this.obtenerFabricanteTableIData();
    this.obtenerDestinatarioTableIData();
  }
 
  /**
   * @method obtenerFabricanteTableIData
   * @description Obtiene datos para la tabla de fabricantes desde el servicio mediante
   * una suscripción. Los datos recibidos se asignan a la propiedad fabricantedatosTabla
   * para su visualización en la interfaz.
   *
   * @returns {void}
   * @public
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
   * @description Obtiene datos para la tabla de destinatarios desde el servicio mediante
   * una suscripción. Los datos recibidos se asignan a la propiedad destinatarioDatosTabla
   * para su visualización en la interfaz.
   *
   * @returns {void}
   * @public
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
 
  /**
   * @method ngOnDestroy
   * @description Hook del ciclo de vida que limpia las suscripciones para evitar fugas de memoria.
   * Se ejecuta justo antes de que Angular destruya el componente. Emite un valor en el Subject
   * destroyed$ y lo completa para finalizar todas las suscripciones vinculadas mediante takeUntil.
   *
   * @returns {void}
   * @public
   * @implements OnDestroy
   */
  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}