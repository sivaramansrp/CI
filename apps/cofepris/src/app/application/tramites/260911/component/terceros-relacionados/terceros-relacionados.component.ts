/**
 * @fileoverview Define el componente TercerosRelacionadosComponent, 
 * encargado de gestionar y visualizar información de terceros relacionados,
 * específicamente fabricantes y destinatarios, en tablas dinámicas.
 * 
 * @module TercerosRelacionados
 * @requires @ng-mf/data-access-user
 * @requires @angular/core
 * @requires @angular/forms
 * @requires rxjs
 * @requires @angular/common
 */

import { AlertComponent, ConfiguracionColumna, TablaSeleccion } from '@ng-mf/data-access-user';
import { CapturarColumns, FABRICANTE_TABLE_COLUMNS } from '../../models/fabricante-datos.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { DESTINATARIO_TABLE_COLUMNS, DestinatarioCapturarColumns } from '../../models/destinatario-datos.model';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import {Subject, map, takeUntil } from 'rxjs';

import { TablaDinamicaComponent, TableComponent, TituloComponent } from '@ng-mf/data-access-user';

import { Tramite260911State } from '../../estados/tramite260911.store';

import { ConsultaioQuery } from '@ng-mf/data-access-user';

import { CommonModule } from '@angular/common';

import { TEXTOS } from '@libs/shared/data-access-user/src/tramites/constantes/octava-temporal.enum';
import { TercerosRelacionadosService } from '../../services/terceros-relacionados/terceros-relacionados.service';

/**
 * Componente para la gestión y visualización de terceros relacionados (fabricantes y destinatarios).
 * Renderiza tablas dinámicas con la información obtenida desde servicios y controla el modo de solo lectura.
 * Implementa la gestión de ciclo de vida para evitar fugas de memoria.
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
 * @implements {OnInit}
 * @implements {OnDestroy}
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
   * Estado actual de la solicitud proveniente del store.
   */
  public solicitudState!: Tramite260911State;

  /**
   * Indica si el formulario está en modo solo lectura.
   */
  esFormularioSoloLectura: boolean = false;

  /**
   * Constantes de texto utilizadas en el componente para mostrar etiquetas,
   * mensajes y títulos en la interfaz de usuario.
   */
  TEXTOS = TEXTOS;

  /**
   * Configuración para la selección de tablas.
   */
  TablaSeleccion = TablaSeleccion;

  /**
   * Almacena los datos de la tabla de fabricantes que se mostrarán en la interfaz.
   */
  fabricantedatosTabla!: CapturarColumns[];

  /**
   * Almacena los datos de la tabla de destinatarios que se mostrarán en la interfaz.
   */
  destinatarioDatosTabla!: DestinatarioCapturarColumns[];

  /**
   * Configuración para las columnas de la tabla de fabricantes.
   */
  fabricanteTableColumns: ConfiguracionColumna<CapturarColumns>[] = FABRICANTE_TABLE_COLUMNS;

  /**
   * Configuración para las columnas de la tabla de destinatarios.
   */
  destinatarioTableColumns: ConfiguracionColumna<DestinatarioCapturarColumns>[] = DESTINATARIO_TABLE_COLUMNS;

  /**
   * Subject utilizado para gestionar el ciclo de vida de las suscripciones
   * y evitar fugas de memoria. Se completa en el método ngOnDestroy.
   * @private
   */
  private destroyed$ = new Subject<void>();

  /**
   * Inicializa una nueva instancia del componente TercerosRelacionadosComponent.
   * Suscribe al estado de solo lectura y actualiza la bandera correspondiente.
   *
   * @param fb FormBuilder para crear formularios reactivos.
   * @param fabricanteService Servicio para obtener datos de terceros relacionados.
   * @param consultaioQuery Consulta de estado de solo lectura.
   */
  constructor(
    private fb: FormBuilder,
    private fabricanteService: TercerosRelacionadosService,
    public consultaioQuery: ConsultaioQuery,
  ) {
    this.consultaioQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyed$),
        map((seccionState) => {
          this.esFormularioSoloLectura = seccionState.readonly;
        })
      )
      .subscribe();
  }

  /**
   * Hook del ciclo de vida que inicializa el componente.
   * Obtiene datos para las tablas de fabricantes y destinatarios.
   */
  ngOnInit(): void {
    this.obtenerFabricanteTableIData();
    this.obtenerDestinatarioTableIData();
  }

  /**
   * Obtiene datos para la tabla de fabricantes desde el servicio.
   * Los datos recibidos se asignan a la propiedad fabricantedatosTabla.
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
   * Obtiene datos para la tabla de destinatarios desde el servicio.
   * Los datos recibidos se asignan a la propiedad destinatarioDatosTabla.
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
   * Hook del ciclo de vida que limpia las suscripciones para evitar fugas de memoria.
   * Se ejecuta justo antes de que Angular destruya el componente.
   * Emite un valor en el Subject destroyed$ y lo completa para finalizar todas las suscripciones.
   */
  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}