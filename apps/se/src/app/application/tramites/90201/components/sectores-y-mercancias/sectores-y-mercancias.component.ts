/* eslint-disable sort-imports */
/* eslint-disable @nx/enforce-module-boundaries */
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TituloComponent } from 'libs/shared/data-access-user/src/tramites/components/titulo/titulo.component';
import { CatalogoSelectComponent } from 'libs/shared/data-access-user/src/tramites/components/catalogo-select/catalogo-select.component';
import { Catalogo } from 'libs/shared/data-access-user/src/core/models/shared/catalogos.model';
import { ExpansionDeProductoresService } from 'libs/shared/data-access-user/src/core/services/90201/expansion-de-productores.service';
import { map, merge } from 'rxjs';
import { Sectoresy } from 'libs/shared/data-access-user/src/tramites/constantes/servicios-extraordinarios.enum';
import { AlertComponent } from 'libs/shared/data-access-user/src/tramites/components/alert/alert.component';
import { ConfiguracionColumna } from 'libs/shared/data-access-user/src/core/models/shared/configuracion-columna.model';
import sectoresTabla from 'libs/shared/theme/assets/json/90201/sectores-tabla.json';
import { SectoresTabla } from 'libs/shared/data-access-user/src/core/models/90201/expansion-de-productores.model';
import { TablaDinamicaComponent } from 'libs/shared/data-access-user/src/tramites/components/tabla-dinamica/tabla-dinamica.component';
import { TablaSeleccion } from 'libs/shared/data-access-user/src/core/enums/tabla-seleccion.enum';



@Component({
  selector: 'app-sectores-y-mercancias',
  standalone: true,
  imports: [CommonModule,
    TituloComponent,
    CatalogoSelectComponent,
    AlertComponent,
    TablaDinamicaComponent],
  templateUrl: './sectores-y-mercancias.component.html',
  styleUrl: './sectores-y-mercancias.component.scss',
})
export class SectoresYMercanciasComponent {

/**
 * Indica si un elemento está seleccionado.
 * 
 * @type {boolean}
 */
public seleccion: boolean = false;
/**
 * Un array de objetos Catalogo que representa el catálogo de sectores.
 * Este array está inicialmente vacío y puede ser poblado con elementos Catalogo.
 */
public sectorCatalogo: Catalogo[] = [];
/**
 * Una propiedad pública que contiene el contenido de texto para el componente Sectores y Mercancias.
 * El contenido se importa del módulo `Sectoresy`.
 */
public TEXTOS = Sectoresy;

/**
 * Configuración para las columnas de la tabla.
 * 
 * Este array define las columnas para una tabla, incluyendo el nombre del encabezado,
 * la clave para acceder a los datos en cada fila y el orden de las columnas.
 * 
 * @type {ConfiguracionColumna<any>[]}
 * 
 * @property {string} encabezado - El nombre del encabezado de la columna.
 * @property {Function} clave - Una función que toma un elemento y devuelve el valor para la columna.
 * @property {number} orden - El orden de la columna en la tabla.
 */
public configuracionTabla: ConfiguracionColumna<any>[] = [
  { encabezado: 'Lista de sectores', clave: (item: any) => item['Lista de sectores'], orden: 1 },
  { encabezado: 'Clave del sector', clave: (item: any) => item['Clave del sector'], orden: 2 }
];

/**
 * Un array de objetos `SectoresTabla` que representa los sectores.
 */
public sectores: SectoresTabla[] = sectoresTabla;
/**
 * Representa la selección de radio del enumerado TablaSeleccion.
 * Esta propiedad se utiliza para gestionar el estado de selección del botón de radio en el componente.
 */
public radio = TablaSeleccion.RADIO;

  /**
   * Construye una instancia de SectoresYMercanciasComponent.
   * 
   * @param _expansionDesvc - Servicio para manejar la expansión de productores.
   */
  constructor(private _expansionDesvc: ExpansionDeProductoresService) {

  }

  /**
   * Gancho de ciclo de vida que se llama después de que se inicializan las propiedades enlazadas a datos de una directiva.
   * Inicializa los catálogos llamando al método `inicializaCatalogos`.
   */
  ngOnInit(): void {
    this.inicializaCatalogos();
  }


  /**
   * Inicializa los datos del catálogo obteniendo el catálogo de sectores del servicio.
   * Los datos obtenidos se asignan a la propiedad `sectorCatalogo`.
   * 
   * Este método utiliza operadores de RxJS para manejar la obtención de datos asíncronos y
   * su transformación.
   * 
   * @private
   */
  private inicializaCatalogos(): void {
    const CATALOGO$ = this._expansionDesvc
      .getSectorCatalog()
      .pipe(
        map((resp) => {
          this.sectorCatalogo = resp.data;
      })
    );


    merge(
      CATALOGO$,
    ).subscribe();

  }

  /**
   * Establece la propiedad `seleccion` a `true`.
   * Este método se utiliza para indicar que se ha seleccionado un sector.
   */
  public sectorSeleccion() {
    this.seleccion = true;
  }
}
