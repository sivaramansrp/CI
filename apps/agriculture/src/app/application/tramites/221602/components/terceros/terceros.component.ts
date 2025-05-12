
import { AlertComponent, ConfiguracionColumna, TablaDinamicaComponent, TablaSeleccion, TituloComponent } from '@libs/shared/data-access-user/src';
import { Exportador, MENSAJE_TABLA_OBLIGATORIA } from '@libs/shared/data-access-user/src/core/models/221602/mercancia.model';
import { Component } from '@angular/core';

import { CONFIGURATION_TABLA_DESTINATARIO } from '@libs/shared/data-access-user/src/core/models/221602/mercancia.model';
import { Destinatario } from '@libs/shared/data-access-user/src/core/models/221602/mercancia.model';

import { CONFIGURATION_TABLA_DATOS } from '@libs/shared/data-access-user/src/core/models/221602/mercancia.model';
import realizar from '@libs/shared/theme/assets/json/221602/realizar.json';

/**
 * Componente encargado de gestionar la visualización y exportación de datos relacionados con los exportadores y destinatarios.
 * Este componente muestra dos tablas dinámicas: una para los exportadores y otra para los destinatarios. 
 * Además, permite la exportación de los datos a formatos adecuados.
 * 
 * Este componente también incluye la gestión de la visualización de mensajes obligatorios para las tablas.
 * 
 * @component
 * @example
 * <app-terceros></app-terceros>
 * 
 * @imports
 * - `TituloComponent`: Componente para mostrar el título en la interfaz.
 * - `TablaDinamicaComponent`: Componente para mostrar tablas dinámicas con la posibilidad de ordenar y filtrar.
 * - `AlertComponent`: Componente para mostrar alertas.
 * 
 */
@Component({
  selector: 'app-terceros',
  standalone: true,
  imports: [
    TituloComponent,
    TablaDinamicaComponent,
    AlertComponent
  ],
  templateUrl: './terceros.component.html',
  styleUrls: ['./terceros.component.scss']
})

/**
 * Componente encargado de gestionar los datos de exportadores y destinatarios dentro de una tabla dinámica.
 * También permite la exportación de los datos. 
 * 
 * @class
 * @example
 * <app-terceros></app-terceros>
 * 
 * @constructor
 * El componente no requiere de un constructor explícito para inicializar dependencias.
 * 
 * @property {string} TEXTOS - Mensaje a mostrar en la interfaz cuando una tabla es obligatoria.
 * @property {Exportador[]} exportador - Lista de exportadores que se obtiene desde un archivo JSON.
 * @property {Destinatario[]} destinatario - Lista de destinatarios que se obtiene desde un archivo JSON.
 * @property {TablaSeleccion} checkbox - Configuración para los checkboxes en las tablas.
 * @property {ConfiguracionColumna<Exportador>[]} configuracionTabla - Configuración de las columnas de la tabla de exportadores.
 * @property {ConfiguracionColumna<Destinatario>[]} configuracionTablaDatos - Configuración de las columnas de la tabla de destinatarios.
 * 
 */
export class TercerosComponent {

  /**
   * Mensaje que indica que la tabla es obligatoria.
   */
  TEXTOS: string = MENSAJE_TABLA_OBLIGATORIA;

  /**
   * Lista de exportadores obtenida desde un archivo JSON.
   * Cada exportador contiene información como nombre, teléfono, correo electrónico y domicilio.
   */
  exportador: Exportador[] = realizar.exportador

  /**
   * Configuración de las columnas de la tabla de exportadores.
   * Define el encabezado, clave y el orden de las columnas para la tabla de exportadores.
   */
  public checkbox = TablaSeleccion.CHECKBOX;
  configuracionTabla: ConfiguracionColumna<Exportador>[] =CONFIGURATION_TABLA_DATOS;

  /**
   * Lista de destinatarios obtenida desde un archivo JSON.
   * Cada destinatario contiene información como nombre, teléfono, correo electrónico y dirección.
   */
  destinatario: Destinatario[] = realizar.destinatario;

  /**
   * Configuración de las columnas de la tabla de destinatarios.
   * Define el encabezado, clave y el orden de las columnas para la tabla de destinatarios.
   */
  configuracionTablaDatos: ConfiguracionColumna<Destinatario>[] = CONFIGURATION_TABLA_DESTINATARIO ;
}
