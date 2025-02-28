/**
 * compo doc
 * @component ProductorIndirecto90305Component
 * @description
 * Este componente muestra la información de los productores indirectos registrados en el trámite 90305.
 * Utiliza una tabla dinámica para visualizar la información.
 */

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablaDinamicaComponent } from 'libs/shared/data-access-user/src/tramites/components/tabla-dinamica/tabla-dinamica.component';
import { TituloComponent } from '@ng-mf/data-access-user';
import { ConfiguracionColumna } from 'libs/shared/data-access-user/src/core/models/shared/configuracion-columna.model';
import { TablaSeleccion } from 'libs/shared/data-access-user/src/core/enums/tabla-seleccion.enum';
import { PRODUCTOR_INDIRECTO } from 'libs/shared/data-access-user/src/core/models/90305/prosec-modificacion.model';
import { ProsecModificacionServiceTsService } from 'libs/shared/data-access-user/src/core/services/90305/prosec-modificacion.service.ts.service';

/**
 * compo doc
 * 
 * @selector app-productor-indirecto-90305
 * @standalone true
 */
@Component({
  selector: 'app-productor-indirecto-90305',
  standalone: true,
  imports: [CommonModule, TituloComponent, TablaDinamicaComponent],
  templateUrl: './productorIndirecto-90305.component.html',
  styleUrl: './productorIndirecto-90305.component.scss',
})
export class ProductorIndirecto90305Component implements OnInit{
  /** Enum para la selección de la tabla */
  TablaSeleccion = TablaSeleccion;
  
  /** Lista de productores indirectos obtenidos del servicio */
  productoIndData: PRODUCTOR_INDIRECTO[] = [];

  constructor(private listaDomicilios: ProsecModificacionServiceTsService) {}

  /**
   * Carga la información de los productores indirectos al inicializar el componente.
   */
  ngOnInit(){
    this.loadProductoIndirecto();
  }

  /**
   * Método para obtener la lista de productores indirectos desde el servicio.
   */
  loadProductoIndirecto() {
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
