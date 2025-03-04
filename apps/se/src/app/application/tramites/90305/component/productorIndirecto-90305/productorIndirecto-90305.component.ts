/**
 * compo doc
 * @component ProductorIndirecto90305Component
 * @description
 * Este componente muestra la información de los productores indirectos registrados en el trámite 90305.
 * Utiliza una tabla dinámica para visualizar la información.
 */
import { CommonModule } from '@angular/common';

import { Component, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

import { TituloComponent } from '@ng-mf/data-access-user';

import { ConfiguracionColumna } from '@ng-mf/data-access-user';
import { PRODUCTOR_INDIRECTO } from '@ng-mf/data-access-user';
import { TablaSeleccion } from '@ng-mf/data-access-user';

import { ProsecModificacionServiceTsService } from '@ng-mf/data-access-user';

import { TablaDinamicaComponent } from '@ng-mf/data-access-user';

/**
 * compo doc
 * 
 * @selector app-productor-indirecto-90305
 * @standalone true
 */
@Component({
  selector: 'app-productor-indirecto-90305',
  standalone: true,
  imports: [CommonModule, TituloComponent, TablaDinamicaComponent,ReactiveFormsModule],
  templateUrl: './productorIndirecto-90305.component.html',
  styleUrl: './productorIndirecto-90305.component.scss',
})
export class ProductorIndirecto90305Component implements OnInit{
  productorIndForm!: FormGroup;
  /** Enum para la selección de la tabla */
  TablaSeleccion = TablaSeleccion;
  
  /** Lista de productores indirectos obtenidos del servicio */
  productoIndData: PRODUCTOR_INDIRECTO[] = [];

  constructor(private listaDomicilios: ProsecModificacionServiceTsService) {
    //constructor
  }

  /**
   * Carga la información de los productores indirectos al inicializar el componente.
   */
  ngOnInit(): void {
    this.loadProductoIndirecto();
  }

  /**
   * Método para obtener la lista de productores indirectos desde el servicio.
   */
  loadProductoIndirecto():void {
    this.listaDomicilios.getProductoIndirecto().subscribe((resp) => {
      this.productoIndData = resp;
    });
  }

  /**
   * Configuración de la tabla de productores indirectos
   */
  configuracionTabla: ConfiguracionColumna<PRODUCTOR_INDIRECTO>[] = [
    { encabezado: 'Registro federal de contribuyentes', clave: (item: PRODUCTOR_INDIRECTO) => item.registroFederal, orden: 1 },
    { encabezado: 'Denominación o razón social', clave: (item: PRODUCTOR_INDIRECTO) => item.denominacion, orden: 2 },
    { encabezado: 'Correo', clave: (item: PRODUCTOR_INDIRECTO) => item.correo, orden: 3 },
    { encabezado: 'Estatus', clave: (item: PRODUCTOR_INDIRECTO) => item.eStatus, orden: 4 }
  ];
}
