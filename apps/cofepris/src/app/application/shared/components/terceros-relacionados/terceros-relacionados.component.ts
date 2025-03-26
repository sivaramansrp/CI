/**
 * Importaciones necesarias para el funcionamiento del componente.
 */
import { CommonModule } from '@angular/common';

import { Component, OnInit } from '@angular/core';

import { AlertComponent, TableComponent } from '@ng-mf/data-access-user';

import {
  CatalogoSelectComponent,
} from '@libs/shared/data-access-user/src';

import { TituloComponent } from '@libs/shared/data-access-user/src';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';



import { DatosGeneralesComponent } from '../datos-generales/datos-generales.component';
import { TableData } from '../../models/entrada-humana.models';
import { TERCEROS_RELACIONADOS_TABLE_HEADER_DATA } from '../../../tramites/260402/constantes/permiso-maquila.enum';
import { MANIFIESTOS_ALERT } from '../../constantes/permiso-maquila.enum';
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

fabricanteHeaderData = TERCEROS_RELACIONADOS_TABLE_HEADER_DATA;

fabricanteRowData:TableData[]=[];

TEXTO_DE_ALERTA: string = MANIFIESTOS_ALERT.DATOS_MANIFIESTOS;


constructor(){}


ngOnInit(): void{

}

isModalVisible = false;

openModal() {
  this.isModalVisible = true;
}

closeModal() {
  this.isModalVisible = false;
}

}
