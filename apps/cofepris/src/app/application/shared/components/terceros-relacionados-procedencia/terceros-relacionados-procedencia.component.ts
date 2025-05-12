/**
 * Importaciones necesarias para el funcionamiento del componente.
 */
import { AlertComponent, TableComponent } from '@ng-mf/data-access-user';
import { CommonModule } from '@angular/common';

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  CatalogoSelectComponent,
} from '@libs/shared/data-access-user/src';
import { DatosGeneralesComponent } from '../datos-generales/datos-generales.component';
import { TituloComponent } from '@libs/shared/data-access-user/src';

import { TableData, TipoMoModel } from '../../models/permiso-importacion-biologica.models';


import { MANIFIESTOS_ALERT } from '../../constantes/permiso-importacion-biologica.enum';

import { TercerosProcedenciaService } from '../../services/terceros-procedencia.service';

import { Subject, takeUntil } from 'rxjs';
/**
 * Componente que gestiona los terceros relacionados.
 * Utiliza formularios reactivos y componentes personalizados para mostrar datos.
 */
@Component({
  selector: 'app-terceros-relacionados-procedencia',
  standalone: true,
  templateUrl: './terceros-relacionados-procedencia.component.html',
  styleUrls: ['./terceros-relacionados-procedencia.component.scss'],
  imports: [
    CommonModule,
    TituloComponent,
    AlertComponent,
    FormsModule,
    TableComponent,
    ReactiveFormsModule,
    CatalogoSelectComponent,
    DatosGeneralesComponent
  ],
})

export class TercerosRelacionadosProcedenciaComponent implements OnInit {
    /** Subject para destruir el componente */
    private destroy$ = new Subject<void>();

  /**
   * Variable que controla la visibilidad del componente de datos generales.
   */
  isDatosGeneralesVisible = false;

  /**
   * @comdoc
   * Encabezados de la tabla para los fabricantes relacionados.
   * Este arreglo contiene los nombres de las columnas que se mostrarán en la tabla.
   */
  fabricanteHeaderData: string[] = [];
  /**
   * @comdoc
   * Datos de la tabla para los fabricantes relacionados.
   * Este arreglo contiene las filas de datos que se mostrarán en la tabla.
   */
  fabricanteRowData: TableData[] = [];
  /**
   * @descripcion Texto de alerta utilizado para mostrar mensajes relacionados con los manifiestos.
   * @tipo {string}
   */
  TEXTO_DE_ALERTA: string = MANIFIESTOS_ALERT.DATOS_MANIFIESTOS;

  /**
   * @constructor
   * @param {FormBuilder} fb - Servicio para construir y gestionar formularios reactivos.
   * @param {tercerosProcedenciaService} TercerosProcedenciaService - Servicio para manejar la lógica relacionada con terceros en el módulo 260402.
   * 
   * La lógica del constructor se puede agregar aquí si es necesario.
   */
  constructor(private fb: FormBuilder,
    private tercerosProcedenciaService: TercerosProcedenciaService) {
    //La lógica del constructor se puede agregar aquí si es necesario
  }

  /**
   * @override
   * @method ngOnInit
   * @description Este método se ejecuta al inicializar el componente. 
   * Realiza una suscripción al servicio `TercerosProcedenciaService` para obtener 
   * información de la tabla y asignar los datos de las columnas a la 
   * propiedad `fabricanteHeaderData`.
   */
  ngOnInit(): void {
    this.tercerosProcedenciaService.getInformacioDeTabla().pipe(takeUntil(this.destroy$)).subscribe((data) => {
      this.fabricanteHeaderData = data.columns
    });
  }

  /**
   * Abre la sección de "Procedencia" estableciendo la visibilidad de los datos generales.
   * Cambia el estado de `isDatosGeneralesVisible` a `true`.
   */
  abrirProcedencia(): void {
    this.isDatosGeneralesVisible = true;
  }

  /**
   * Abre la sección de procedencia estableciendo la visibilidad de los datos generales.
   * 
   * @remarks
   * Este método cambia el estado de `isDatosGeneralesVisible` a `true`, 
   * lo que indica que la sección de datos generales debe mostrarse.
   */
  cerrarProcedencia(): void {
    this.isDatosGeneralesVisible = false;
  }

  /**
   * Agrega una nueva fila a la tabla con los datos proporcionados.
   * 
   * @param data - Objeto de tipo `TipoMoModel` que contiene la información 
   *               necesaria para llenar la fila de la tabla.
   * 
   * Los campos del objeto `data` se asignan a las columnas de la tabla. 
   * Si algún campo está vacío o no está definido, se asigna el valor por defecto `'-'`.
   * 
   * Campos utilizados:
   * - `razonSocial`: Nombre o razón social.
   * - `rfc`: Registro Federal de Contribuyentes.
   * - `curp`: Clave Única de Registro de Población.
   * - `telefono`: Número de teléfono.
   * - `correoElectronico`: Dirección de correo electrónico.
   * - `calle`: Nombre de la calle.
   * - `numeroExterior`: Número exterior.
   * - `numeroInterior`: Número interior.
   * - `pais`: País.
   * - `colonia`: Colonia.
   * - `municipio`: Municipio o alcaldía.
   * - `localidad`: Localidad.
   * - `entidadFederativa`: Entidad federativa.
   * - `estado`: Estado o localidad.
   * - `codigoPostal`: Código postal.
   * - `coloniaEquivalente`: Colonia o equivalente.
   * 
   * Después de agregar la fila, se cierra el modal o procedimiento relacionado.
   */
  agregarTabla(data: TipoMoModel): void {
    const TABLE_ROW = {
      "Nombre/denominación o razón social": data.razonSocial || '-',
      "R.F.C": data.rfc || '-',
      "CURP": data.curp || '-',
      "Teléfono": data.telefono || '-',
      "Correo electrónico": data.correoElectronico || '-',
      "Calle": data.calle || '-',
      "Número exterior": data.numeroExterior || '-',
      "Número interior": data.numeroInterior || '-',
      "País": data.pais || '-',
      "Colonia": data.colonia || '-',
      "Municipio o alcaldía": data.municipio || '-',
      "Localidad": data.localidad || '-',
      "Entidad federativa": data.entidadFederativa || '-',
      "Estado/localidad": data.estado || '-',
      "Código postal": data.codigoPostal || '-',
      "Colonia o equivalente": data.coloniaEquivalente || '-',
    };
    this.fabricanteRowData.push({ tbodyData: Object.values(TABLE_ROW) });
    this.cerrarProcedencia();
  }


}
