/**
 * compo doc
 * @component Plantas90305Component
 * @description
 * Este componente muestra la información de las plantas registradas en el trámite 90305.
 * Utiliza una tabla dinámica para visualizar la información y obtiene los datos desde un servicio.
 */

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablaDinamicaComponent } from 'libs/shared/data-access-user/src/tramites/components/tabla-dinamica/tabla-dinamica.component';
import { TituloComponent } from '@ng-mf/data-access-user';
import { ConfiguracionColumna } from 'libs/shared/data-access-user/src/core/models/shared/configuracion-columna.model';
import { TablaSeleccion } from 'libs/shared/data-access-user/src/core/enums/tabla-seleccion.enum';
import { PLANTAS } from 'libs/shared/data-access-user/src/core/models/90305/prosec-modificacion.model';
import { ProsecModificacionServiceTsService } from 'libs/shared/data-access-user/src/core/services/90305/prosec-modificacion.service.ts.service';

/**
 * compo doc
 * @selector app-plantas-90305
 * @standalone true
 */
@Component({
  selector: 'app-plantas-90305',
  standalone: true,
  imports: [CommonModule, TituloComponent, TablaDinamicaComponent],
  templateUrl: './plantas-90305.component.html',
  styleUrl: './plantas-90305.component.scss',
})
export class Plantas90305Component implements OnInit {
  /** Enum para la selección de la tabla */
  TablaSeleccion = TablaSeleccion;
  /** Lista de plantas obtenidas del servicio */
  personaparas: PLANTAS[] = [];
  
  /** Configuración de la tabla de plantas */
  configuracionTabla: ConfiguracionColumna<PLANTAS>[] = [
    { encabezado: 'Calle', clave: (item: PLANTAS) => item.calle, orden: 1 },
    { encabezado: 'Número exterior', clave: (item: PLANTAS) => item.numeroExterior, orden: 2 },
    { encabezado: 'Número interior', clave: (item: PLANTAS) => item.numeroInterior, orden: 3 },
    { encabezado: 'Código postal', clave: (item: PLANTAS) => item.codigoPostal, orden: 4 },
    { encabezado: 'Colonia', clave: (item: PLANTAS) => item.colonia, orden: 5 },
    { encabezado: 'Municipio o alcaldía', clave: (item: PLANTAS) => item.municipioOAlcaldia, orden: 6 },
    { encabezado: 'Entidad Federativa', clave: (item: PLANTAS) => item.entidadFederativa, orden: 7 },
    { encabezado: 'País', clave: (item: PLANTAS) => item.pais, orden: 8 },
    { encabezado: 'Teléfono', clave: (item: PLANTAS) => item.telefono, orden: 9 },
  ];
  
  /*
 constructor
  */

  constructor(private listaDomicilios: ProsecModificacionServiceTsService) {
    //construstor
  }
  
  /**
   * Método que se ejecuta al inicializar el componente y carga la información de las plantas.
   */
  ngOnInit() {
    this.loadPlantaComplementaria();
  }

  /**
   * Método para obtener la lista de plantas desde el servicio.
   */
  loadPlantaComplementaria(): void {
    this.listaDomicilios.getPlantaComplementaria().subscribe((resp) => {
      this.personaparas = resp;
    });
  }
}
