/**
 * compo doc
 * @component ListaDomicilios90305Component
 * @description
 * Este componente muestra una lista de domicilios relacionados con Prosec.
 * Los datos se obtienen desde el servicio `ProsecModificacionServiceTsService`
 * y se presentan en una tabla dinámica.
 */

import { CommonModule } from '@angular/common';

import { Component, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

import {TablaDinamicaComponent, TablaSeleccion,TituloComponent} from '@ng-mf/data-access-user';

import { PROSEC_MODIFICATION_MODEL } from '@ng-mf/data-access-user';

import { ConfiguracionColumna } from '@ng-mf/data-access-user';

import { ProsecModificacionServiceTsService } from '@ng-mf/data-access-user';

/**
 * compo doc
 * @selector app-lista-domicilios-90305
 * @standalone true
 */
@Component({
  selector: 'app-lista-domicilios-90305',
  standalone: true,
  imports: [
    CommonModule,
    TituloComponent,
    ReactiveFormsModule,
    TablaDinamicaComponent,
  ],
  templateUrl: './lista-domicilios-90305.component.html',
  styleUrl: './lista-domicilios-90305.component.scss',
})
export class ListaDomicilios90305Component implements OnInit {
  listaDomiciliosForm! : FormGroup;
  /**
   * 
   * compo doc
   * @constructor
   * @param {ProsecModificacionServiceTsService} listaDomicilios - Servicio para obtener la lista de domicilios
   */
  constructor(private listaDomicilios: ProsecModificacionServiceTsService) {
    //constructor
  }

  /** Controla qué botón se muestra en la interfaz */
  showSecondButton = false;

  /** Alterna la visibilidad de los botones */
  toggleButtons() {
    this.showSecondButton = !this.showSecondButton;
  }

  /** Configuración de columnas para la tabla dinámica */
  configuracionTabla: ConfiguracionColumna<PROSEC_MODIFICATION_MODEL>[] = [
    { encabezado: 'Calle', clave: (item: PROSEC_MODIFICATION_MODEL) => item.calle, orden: 1 },
    { encabezado: 'Número exterior', clave: (item: PROSEC_MODIFICATION_MODEL) => item.numeroExterior, orden: 2 },
    { encabezado: 'Número interior', clave: (item: PROSEC_MODIFICATION_MODEL) => item.numeroInterior, orden: 3 },
    { encabezado: 'Código postal', clave: (item: PROSEC_MODIFICATION_MODEL) => item.codigoPostal, orden: 4 },
    { encabezado: 'Colonia', clave: (item: PROSEC_MODIFICATION_MODEL) => item.colonia, orden: 5 },
    { encabezado: 'Localidad', clave: (item: PROSEC_MODIFICATION_MODEL) => item.localidad, orden: 6 },
    { encabezado: 'Municipio o alcaldía', clave: (item: PROSEC_MODIFICATION_MODEL) => item.municipioOAlcaldia, orden: 7 },
    { encabezado: 'Entidad Federativa', clave: (item: PROSEC_MODIFICATION_MODEL) => item.entidadFederativa, orden: 8 },
    { encabezado: 'País', clave: (item: PROSEC_MODIFICATION_MODEL) => item.pais, orden: 9 },
    { encabezado: 'Teléfono', clave: (item: PROSEC_MODIFICATION_MODEL) => item.telefono, orden: 10 },
  ];

  /** Enum para la selección de tablas */
  TablaSeleccion = TablaSeleccion;

  /** Datos de domicilios obtenidos del servicio */
  personaparas: PROSEC_MODIFICATION_MODEL[] = [];

  /** Método del ciclo de vida de Angular - inicializa el componente y carga la lista de domicilios */
  ngOnInit() {
    this.loadDomicilios();
  }

  /**
   * Obtiene la lista de domicilios desde el servicio y la almacena en `personaparas`
   */
  loadDomicilios(): void {
    this.listaDomicilios.getListaDomicilios().subscribe((resp) => {
      this.personaparas = resp;
    });
  }
}
