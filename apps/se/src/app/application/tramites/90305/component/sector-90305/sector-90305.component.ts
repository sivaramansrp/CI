/**
 * compo doc
 * @component Sector90305Component
 * @description
 * Este componente muestra la información de los sectores registrados en el trámite 90305.
 * Utiliza una tabla dinámica para visualizar la información de los sectores.
 */
import { CommonModule } from '@angular/common';

import { Component, OnInit } from '@angular/core';

import { TituloComponent } from '@ng-mf/data-access-user';

import { ConfiguracionColumna } from '@ng-mf/data-access-user';
import { SECTOR_MODEL } from '@ng-mf/data-access-user';
import { TablaSeleccion } from '@ng-mf/data-access-user';

import { ProsecModificacionServiceTsService } from '@ng-mf/data-access-user';

import { TablaDinamicaComponent } from '@ng-mf/data-access-user';

/**
 * compo doc
 * @selector app-sector-90305
 * @standalone true
 */
@Component({
  selector: 'app-sector-90305',
  standalone: true,
  imports: [CommonModule, TablaDinamicaComponent, TituloComponent],
  templateUrl: './sector-90305.component.html',
  styleUrl: './sector-90305.component.scss',
})
export class Sector90305Component implements OnInit {
  /** Enum para la selección de la tabla */
  TablaSeleccion = TablaSeleccion;
  
  /** Lista de sectores obtenidos del servicio */
  sectorData: SECTOR_MODEL[] = [];
  /*
  *constructor
  */
  constructor(private listaDomicilios: ProsecModificacionServiceTsService) {
    //constructor
  }
  
  /**
   * Método de inicialización del componente.
   * Carga la información de los sectores al iniciar.
   */
  ngOnInit():void {
    this.loadSector();
  }
  
  /** Configuración de la tabla de sectores */
  configuracionTabla: ConfiguracionColumna<SECTOR_MODEL>[] = [
    { encabezado: 'Lista de sectores', clave: (item: SECTOR_MODEL) => item.listaDeSectores, orden: 1 },
    { encabezado: 'Clave del sector', clave: (item: SECTOR_MODEL) => item.claveDelSector, orden: 2 },
    { encabezado: 'Estatus', clave: (item: SECTOR_MODEL) => item.eStatus, orden: 3 }
  ];
  
  /**
   * Método para obtener la lista de sectores desde el servicio.
   */
  loadSector() :void{
    this.listaDomicilios.getSector().subscribe((resp) => {
      this.sectorData = resp;
    });
  }
}
