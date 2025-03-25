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
import { MANIFIESTOS_ALERT, TERCEROS_RELACIONADOS_TABLE_HEADER_DATA} from '../../../tramites/260402/constantes/permiso-maquila.enum';

import {
  TableData,
} from '../../../tramites/260402/models/permiso-maquila.models'
import { ModalComponent } from '../modal/modal.component';
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
    ModalComponent
  ],
})


export class TercerosRelacionadosComponent implements OnInit {

fabricanteHeaderData = TERCEROS_RELACIONADOS_TABLE_HEADER_DATA;

fabricanteRowData:TableData[]=[];

TEXTO_DE_ALERTA: string = MANIFIESTOS_ALERT.DATOS_MANIFIESTOS;

isShownAgregar = false

constructor(){}

ngOnInit(): void {
  
}

clickAgregar():void{
  this.isShownAgregar = !this.isShownAgregar
}
}
