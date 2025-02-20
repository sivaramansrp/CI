import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CatalogoSelectComponent } from '../../../../shared/components/catalogo-select/catalogo-select.component';
import { TableComponent } from '../../../../shared/components/table/table.component';
import { TituloComponent } from '../../../../shared/components/titulo/titulo.component';
import { ServiciosPantallaService } from '../../../../core/services/31601/servicios-pantalla.service';
import { tipos } from '../../../../core/models/31601/servicios-pantallas.model';
import { map } from 'rxjs';
import { Catalogo } from '../../../../core/models/shared/catalogos.model';
import { CATALOGOS_ID } from '../../../../shared/constantes/constantes';

/**
 * Componente `RequisitosComponent`.
 * Este componente es responsable de manejar la interfaz de requisitos en la aplicación.
 * Permite al usuario seleccionar diferentes opciones de un catálogo y mostrar tablas con los requisitos relacionados.
 * 
 * El componente utiliza varios subcomponentes, incluyendo:
 * - `CatalogoSelectComponent`: Para seleccionar un elemento desde un catálogo.
 * - `TableComponent`: Para mostrar los datos en una tabla.
 * - `TituloComponent`: Para mostrar un título en la interfaz.
 * 
 * Además, utiliza el servicio `ServiciosPantallaService` para obtener los datos necesarios de los requisitos.
 * 
 * @component RequisitosComponent
 * @selector app-requisitos
 * @templateUrl './requisitos.component.html'
 * @styleUrl './requisitos.component.scss'
 * @imports [
 *   HttpClientModule,
 *   FormsModule,
 *   CommonModule,
 *   TituloComponent,
 *   TableComponent,
 *   CatalogoSelectComponent
 * ]
 */

@Component({
  selector: 'app-requisitos',  // Selector para usar este componente en plantillas HTML
  templateUrl: './requisitos.component.html',  // Ruta a la plantilla HTML
  styleUrl: './requisitos.component.scss',  // Ruta al archivo de estilos SCSS
  standalone: true,  // Define que el componente puede funcionar de forma independiente (sin módulo específico)
  imports: [
    HttpClientModule,  // Importación de módulo para realizar peticiones HTTP
    FormsModule,  // Importación de módulo para trabajar con formularios
    CommonModule,  // Módulo común de Angular para herramientas generales
    TituloComponent,  // Componente para mostrar el título
    TableComponent,  // Componente para mostrar tablas
    CatalogoSelectComponent,  // Componente para seleccionar de un catálogo
  ],
})
export class RequisitosComponent implements OnInit {
  /**
   * Array que contiene los tipos de documento cargados desde el JSON.
   */
  tipos: tipos[] = [];

  /**
   * Encabezado de la tabla de tipos de documento.
   */
  public tipoHeaderData: string[] = [];

  /**
   * Cuerpo de la tabla de tipos de documento (en este caso vacío, se llenará con la carga de datos).
   */
  public tipoBodyData: unknown = [];

  /**
   * Catálogo de tipos de documentos.
   */
  public tipocatlog: Catalogo[] = [];

  /**
   * Datos que definen la estructura de la tabla de tipos de documentos.
   */
  public tipoTableData = {
    "tableHeader": ["Tipo de Documento"], // Encabezados de la tabla
    "tableBody": []  // Cuerpo vacío que se llenará con la carga de los datos
  };

  /**
   * Controla la visibilidad del contenido adicional.
   */
  showContent = false;

  /**
   * Método que alterna la visibilidad del contenido.
   */
  toggleContent() {
    this.showContent = !this.showContent;
  }

  /**
   * Constructor del componente.
   * @param {HttpClient} http - Instancia del cliente HTTP para realizar peticiones.
   */
  constructor(public http: HttpClient,private pantallaSvc: ServiciosPantallaService) {}

  /**
   * Método que se ejecuta cuando el componente se inicializa.
   * Se encarga de cargar los tipos de documentos desde el archivo JSON.
   */
  ngOnInit(): void {
    this.loadTipos();  // Carga los tipos de documento al inicializar el componente
  }

/**
 * Método que realiza la carga de los tipos de documentos desde el archivo JSON.
 * El archivo JSON se encuentra en la ruta `assets/json/31601/tipo-di-document.json`.
 * Este método utiliza dos servicios del `pantallaSvc` para cargar los datos de tipos de documentos y los encabezados de la tabla.
 * 
 * El primer servicio carga los tipos de documentos y los asigna a la propiedad `tipos`.
 * El segundo servicio obtiene un catálogo de tipos de documentos específicos y lo asigna a la propiedad `tipocatlog`.
 * Además, asigna los encabezados de la tabla desde la propiedad `tipoTableData.tableHeader` a la propiedad `tipoHeaderData`.
 *
 * @method loadTipos
 * @returns {void} No devuelve ningún valor. Solo asigna los datos a las propiedades `tipos`, `tipocatlog`, y `tipoHeaderData`.
 */
loadTipos(): void {
  // Realiza la solicitud para obtener los tipos de documentos desde el servicio
  const tipos$ = this.pantallaSvc
    .getTiposCatalog() // Llama al servicio para obtener los tipos de documento
    .pipe(
      map((resp) => {
        // Asigna los tipos de documento obtenidos a la propiedad 'tipos'
        this.tipos = resp;
      })
    );
    
  // Suscribe al observable para que la asignación de los datos se ejecute
  tipos$.subscribe();

  // Asigna los encabezados de la tabla desde 'tipoTableData'
  this.tipoHeaderData = this.tipoTableData.tableHeader;

  // Realiza la solicitud para obtener el catálogo de tipos de documento
  const tiposcatalog$ = this.pantallaSvc
    .getTipoCatalog(CATALOGOS_ID.CAT_TIPO_DOCUMENTO) // Llama al servicio con el ID de catálogo para obtener los tipos
    .pipe(
      map((resp) => {
        // Asigna los datos del catálogo de tipos de documento a la propiedad 'tipocatlog'
        this.tipocatlog = resp.data;
      })
    );
  
  // Suscribe al observable para que la asignación de los datos se ejecute
  tiposcatalog$.subscribe();
}

}
