/**
 * component Mercancias90305Component
 * @description
 * Este componente muestra una tabla dinámica con información sobre mercancías 
 * relacionadas con Prosec. Los datos se obtienen del servicio `ProsecModificacionServiceTsService`.
 */

import { CommonModule } from '@angular/common';

import { Component, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

import { TituloComponent } from '@ng-mf/data-access-user';

import { TablaSeleccion } from '@ng-mf/data-access-user';

import { MERCANCIAS_MODEL } from '@ng-mf/data-access-user';

import { ConfiguracionColumna } from '@ng-mf/data-access-user';

import { ProsecModificacionServiceTsService } from '@ng-mf/data-access-user';
import { TablaDinamicaComponent } from '@ng-mf/data-access-user';

/**
 * selector app-mercancias-90305
 * @standalone true
 */
@Component({
  selector: 'app-mercancias-90305',
  standalone: true,
  imports: [
    CommonModule,
    TituloComponent,
    ReactiveFormsModule,
    TablaDinamicaComponent,
  ],
  templateUrl: './mercancias-90305.component.html',
  styleUrl: './mercancias-90305.component.scss',
})
export class Mercancias90305Component implements OnInit {
  mercanciasForm!:FormGroup;
  /**
   * compo doc
   * @constructor
   * @param {ProsecModificacionServiceTsService} mercancias - Servicio para obtener la lista de mercancías
   */
  constructor(private mercancias: ProsecModificacionServiceTsService) {
    //constructor
  }

  /** Enum de selección de tabla */
  TablaSeleccion = TablaSeleccion;
  
  /** Lista de mercancías obtenidas del servicio */
  mercanciasProd: MERCANCIAS_MODEL[] = [];

  /**
   * Configuración de las columnas de la tabla dinámica
   * @type {ConfiguracionColumna<MERCANCIAS_MODEL>[]}
   */
  configuracionTabla: ConfiguracionColumna<MERCANCIAS_MODEL>[] = [
    {
      encabezado: 'Fracción arancelaria',
      clave: (item: MERCANCIAS_MODEL) => item.fraccionArancelaria,
      orden: 1,
    },
    {
      encabezado: 'Clave del sector',
      clave: (item: MERCANCIAS_MODEL) => item.claveDelSector,
      orden: 2,
    },
    {
      encabezado: 'Estatus',
      clave: (item: MERCANCIAS_MODEL) => item.eStatus,
      orden: 3,
    },
  ];

  /**
   * Método del ciclo de vida de Angular - inicializa el componente y carga las mercancías
   */
  ngOnInit() {
    this.loadMercancias();
  }

  /**
   * Obtiene la lista de mercancías del servicio y las almacena en `mercanciasProd`
   */
  loadMercancias(): void {
    this.mercancias.getMercancias().subscribe((resp) => {
      this.mercanciasProd = resp;
    });
  }
}
