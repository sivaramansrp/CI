import {
  AnexoExportacion,
  AnexoImportacion
} from '../../models/complementaria.model';
import { Component, OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Anexo } from '../../../../shared/models/anexos.model';
import { AnexosComponent } from '../../../../shared/components/anexos/anexos.component';
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
  imports: [CommonModule, AnexosComponent],
  templateUrl: './anexo-uno-pestana.component.html',
  styleUrl: './anexo-uno-pestana.component.scss',
})
export class AnexoUnoPestanaComponent implements OnDestroy {
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
   * Arreglo que almacena los datos de importación relacionados con el anexo.
   * 
   * Este arreglo contiene objetos de tipo `AnexoImportacion` que representan
   * la información necesaria para gestionar los datos de importación en el
   * contexto del componente.
   */
  public anexoImportacionTablaDatos: AnexoImportacion[] = [];

  /**
   * Arreglo que almacena datos sensibles de tipo `Anexo`.
   * 
   * Este arreglo se utiliza para gestionar y mostrar información
   * sensible en la tabla de datos dentro del componente.
   */
  public sensiblesTablaDatos: Anexo[] = [];

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
