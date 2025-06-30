import {
  AnexoExportacion,
  AnexoImportacion,
  Sensible,
} from '../../models/complementaria.model';
import {
  CONFIGURACION_ANEXO_EXPORTACION,
  CONFIGURACION_ANEXO_IMPORTACION,
  CONFIGURACION_SENSIBLES,
} from '../../constants/complementaria.enum';
import { Component, OnDestroy } from '@angular/core';
import {
  ConfiguracionColumna,
  TablaDinamicaComponent,
  TablaSeleccion,
  TituloComponent,
} from '@libs/shared/data-access-user/src';
import { Subject, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ModificacionProgramaImmexBajaSubmanufactureraService } from '../../services/modificacion-programa-immex-baja-submanufacturera.service';
import { Tramite80303Query } from '../../estados/tramite80303Query.query';

/**
 * Componente Angular que representa la pestaña "Anexo Uno" dentro de la aplicación.
 * 
 * Este componente es autónomo y utiliza módulos comunes de Angular, así como componentes personalizados
 * como `TituloComponent` y `TablaDinamicaComponent`. Su propósito principal es gestionar y mostrar
 * información relacionada con los anexos de exportación, importación y datos sensibles en tablas dinámicas.
 * 
 * Propiedades principales:
 * - `tablaSeleccion`: Define el tipo de selección de la tabla.
 * - `configuracionAnexoExportacionTabla`: Configuración de columnas para la tabla de exportación de anexos.
 * - `anexoExportacionTablaDatos`: Datos de exportación relacionados con el anexo.
 * - `anexoExportacionTablaSeleccionada`: Elementos seleccionados en la tabla de exportación.
 * - `configuracionAnexoImportacionTabla`: Configuración de columnas para la tabla de importación de anexos.
 * - `anexoImportacionTablaDatos`: Datos de importación relacionados con el anexo.
 * - `anexoImportacionTablaSeleccionada`: Elementos seleccionados en la tabla de importación.
 * - `configuracionSensiblesTabla`: Configuración de columnas para la tabla de datos sensibles.
 * - `sensiblesTablaDatos`: Datos sensibles relacionados con el anexo.
 * - `sensiblesTablaSeleccionada`: Elementos seleccionados en la tabla de datos sensibles.
 * 
 * Funcionalidades principales:
 * - Obtención de datos desde URLs específicas utilizando el servicio `ModificacionProgramaImmexBajaSubmanufactureraService`.
 * - Gestión de estados del trámite mediante el servicio `Tramite80303Query`.
 * - Limpieza de suscripciones activas al destruir el componente para evitar fugas de memoria.
 * 
 * Decorador `@Component`:
 * - `selector`: Define el nombre del selector del componente.
 * - `standalone`: Indica que el componente es autónomo.
 * - `imports`: Lista de módulos y componentes importados.
 * - `templateUrl`: Ruta del archivo HTML que define la plantilla del componente.
 * - `styleUrl`: Ruta del archivo SCSS que define los estilos del componente.
 */
@Component({
  selector: 'app-anexo-uno-pestana',
  standalone: true,
  imports: [CommonModule, TituloComponent, TablaDinamicaComponent],
  templateUrl: './anexo-uno-pestana.component.html',
  styleUrl: './anexo-uno-pestana.component.scss',
})
export class AnexoUnoPestanaComponent implements OnDestroy {
  /**
   * Tipo de selección de la tabla.
   * @property {TablaSeleccion} tablaSeleccion
   */
  public tablaSeleccion: TablaSeleccion = TablaSeleccion.UNDEFINED;

  /**
   * Configuración de la tabla de exportación de anexos.
   * 
   * Esta propiedad define la configuración de las columnas para la tabla
   * de exportación de anexos, utilizando el tipo genérico `ConfiguracionColumna`
   * con el modelo de datos `AnexoExportacion`. La configuración se inicializa
   * con los valores definidos en `CONFIGURACION_ANEXO_EXPORTACION`.
   */
  public configuracionAnexoExportacionTabla: ConfiguracionColumna<AnexoExportacion>[] =
    CONFIGURACION_ANEXO_EXPORTACION;

  /**
   * Arreglo que almacena los datos de exportación relacionados con el anexo.
   * 
   * Este arreglo contiene objetos de tipo `AnexoExportacion` que representan
   * la información necesaria para la exportación en el contexto del anexo.
   * 
   * @type {AnexoExportacion[]}
   */
  public anexoExportacionTablaDatos: AnexoExportacion[] = [];

  /**
   * Arreglo que almacena los elementos seleccionados de tipo AnexoExportacion.
   * 
   * Este arreglo se utiliza para gestionar los datos seleccionados en la tabla
   * de exportación dentro del componente. Cada elemento del arreglo representa
   * un anexo de exportación seleccionado por el usuario.
   */
  public anexoExportacionTablaSeleccionada: AnexoExportacion[] = [];

  /**
   * Configuración de la tabla para el anexo de importación.
   * 
   * Esta propiedad define la configuración de las columnas para la tabla
   * que muestra los datos relacionados con el anexo de importación. 
   * Utiliza una estructura de configuración predefinida para establecer 
   * las propiedades de las columnas.
   * 
   * @type {ConfiguracionColumna<AnexoImportacion>[]}
   */
  public configuracionAnexoImportacionTabla: ConfiguracionColumna<AnexoImportacion>[] =
    CONFIGURACION_ANEXO_IMPORTACION;

  /**
   * Arreglo que almacena los datos de importación relacionados con el anexo.
   * 
   * Este arreglo contiene objetos de tipo `AnexoImportacion` que representan
   * la información necesaria para gestionar los datos de importación en el
   * contexto del componente.
   */
  public anexoImportacionTablaDatos: AnexoImportacion[] = [];

  /**
   * Arreglo que almacena los elementos seleccionados de tipo AnexoImportacion.
   * Este arreglo se utiliza para gestionar los datos seleccionados en la tabla
   * dentro del componente AnexoUnoPestana.
   */
  public anexoImportacionTablaSeleccionada: AnexoImportacion[] = [];

  /**
   * Configuración de la tabla para elementos sensibles.
   * 
   * Esta propiedad define la configuración de las columnas para la tabla
   * que muestra los datos sensibles. Utiliza el tipo genérico `ConfiguracionColumna<Sensible>`
   * para garantizar que las columnas estén correctamente tipadas.
   * 
   * @type {ConfiguracionColumna<Sensible>[]} - Arreglo de configuraciones de columnas.
   * @see CONFIGURACION_SENSIBLES - Configuración predeterminada para las columnas sensibles.
   */
  public configuracionSensiblesTabla: ConfiguracionColumna<Sensible>[] =
    CONFIGURACION_SENSIBLES;

  /**
   * Arreglo que almacena datos sensibles de tipo `Sensible`.
   * 
   * Este arreglo se utiliza para gestionar y mostrar información
   * sensible en la tabla de datos dentro del componente.
   */
  public sensiblesTablaDatos: Sensible[] = [];

  /**
   * Arreglo que almacena los elementos sensibles seleccionados en la tabla.
   * 
   * Este arreglo se utiliza para gestionar y manipular los datos sensibles
   * seleccionados por el usuario en la interfaz de usuario. Cada elemento
   * del arreglo es de tipo `Sensible`.
   */
  public sensiblesTablaSeleccionada: Sensible[] = [];

  /**
   * Notificador utilizado para gestionar la destrucción de suscripciones en el componente.
   * Este Subject emite un valor cuando el componente se destruye, permitiendo cancelar
   * suscripciones activas y prevenir fugas de memoria.
   */
  private destroyNotifier$: Subject<void> = new Subject();
  
  /**
   * Constructor de la clase AnexoUnoPestanaComponent.
   * 
   * Este constructor inicializa el servicio `ModificacionProgramaImmexBajaSubmanufactureraService`
   * y realiza llamadas para obtener datos desde URLs específicas. Los datos obtenidos se asignan
   * a propiedades específicas dentro del componente.
   * 
   * @param modificacionProgramaImmexBajaSubmanufactureraService - Servicio utilizado para realizar
   * solicitudes HTTP y obtener datos relacionados con el programa IMMEX.
   * 
   * - `anexoExportacionTablaDatos`: Obtiene datos desde la URL `/80303/anexoExportacion.json`.
   * - `anexoImportacionTablaDatos`: Obtiene datos desde la URL `/80303/anexoImportacion.json`.
   * - `sensiblesTablaDatos`: Obtiene datos desde la URL `/80303/sensible.json`.
   */
  constructor(
    public modificacionProgramaImmexBajaSubmanufactureraService: ModificacionProgramaImmexBajaSubmanufactureraService,
    public tramite80303Querry: Tramite80303Query
  ) {
    this.modificacionProgramaImmexBajaSubmanufactureraService.obtenerRespuestaPorUrl(
      'anexoExportacionTablaDatos',
      '/80303/anexoExportacion.json'
    );
    this.modificacionProgramaImmexBajaSubmanufactureraService.obtenerRespuestaPorUrl(
      'anexoImportacionTablaDatos',
      '/80303/anexoImportacion.json'
    );
    this.modificacionProgramaImmexBajaSubmanufactureraService.obtenerRespuestaPorUrl(
      'sensiblesTablaDatos',
      '/80303/sensible.json'
    );

    this.tramite80303Querry.selectTramiteState$.pipe(takeUntil(this.destroyNotifier$)).subscribe(state => {
      this.anexoExportacionTablaDatos = state.anexoExportacionTablaDatos;
      this.anexoImportacionTablaDatos = state.anexoImportacionTablaDatos;
      this.sensiblesTablaDatos = state.sensiblesTablaDatos;
    });
  }

  /**
 * Método que se ejecuta cuando el componente es destruido.
 * Notifica a todos los observables que deben completarse y limpia las suscripciones.
 */
  ngOnDestroy(): void {
    this.destroyNotifier$.next(); // Notifica a todos los observables que deben completar.
    this.destroyNotifier$.unsubscribe(); // Cancela cualquier suscripción activa.
  }
}
