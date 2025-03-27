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

import { TableData, TipoMoModel } from '../../models/entrada-humana.models';


import { MANIFIESTOS_ALERT } from '../../constantes/permiso-maquila.enum';

import { TercerosService } from '../../services/terceros.service';
/**
 * Componente que gestiona los terceros relacionados.
 * Utiliza formularios reactivos y componentes personalizados para mostrar datos.
 */
@Component({
  selector: 'app-terceros-relacionados',
  standalone: true,
  templateUrl: './terceros-relacionados.component.html',
  styleUrls: ['./terceros-relacionados.component.scss'],
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

export class TercerosRelacionadosComponent implements OnInit {

  isDatosGeneralesVisible = false;
  fabricanteHeaderData: string[] = [];
  fabricanteRowData: TableData[] = [];
  TEXTO_DE_ALERTA: string = MANIFIESTOS_ALERT.DATOS_MANIFIESTOS;


  constructor(private fb: FormBuilder,
    private tercerosService: TercerosService) {
    // Constructor logic can be added here if needed
  }


  ngOnInit(): void {

    this.tercerosService.getInformacioDeTabla().subscribe((data) => {
      this.fabricanteHeaderData = data.columns
    });

  }

  abrirProcedencia(): void {
    this.isDatosGeneralesVisible = true;
  }

  cerrarProcedencia(): void {
    this.isDatosGeneralesVisible = false;
  }

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
