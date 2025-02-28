/**
 * compo doc
 * @component Sector90305Component
 * @description
 * Este componente muestra la información de los sectores registrados en el trámite 90305.
 * Utiliza una tabla dinámica para visualizar la información de los sectores.
 */

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablaDinamicaComponent } from 'libs/shared/data-access-user/src/tramites/components/tabla-dinamica/tabla-dinamica.component';
import { ConfiguracionColumna } from 'libs/shared/data-access-user/src/core/models/shared/configuracion-columna.model';
import { TablaSeleccion } from 'libs/shared/data-access-user/src/core/enums/tabla-seleccion.enum';
import { SECTOR_MODEL } from 'libs/shared/data-access-user/src/core/models/90305/prosec-modificacion.model';
import { TituloComponent } from '@ng-mf/data-access-user';
import { ProsecModificacionServiceTsService } from 'libs/shared/data-access-user/src/core/services/90305/prosec-modificacion.service.ts.service';

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
  constructor(private listaDomicilios: ProsecModificacionServiceTsService) {}
  
  /**
   * Método de inicialización del componente.
   * Carga la información de los sectores al iniciar.
   */
  ngOnInit() {
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
  loadSector() {
    this.listaDomicilios.getSector().subscribe((resp) => {
      this.sectorData = resp;
    });
  }
}
