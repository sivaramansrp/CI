
import { AlertComponent, ConfiguracionColumna, TablaDinamicaComponent, TablaSeleccion, TituloComponent } from '@libs/shared/data-access-user/src';
import { Exportador, MENSAJE_TABLA_OBLIGATORIA } from '@libs/shared/data-access-user/src/core/models/221602/mercancia.model';
import { Component } from '@angular/core';
import { Destinatario } from '@libs/shared/data-access-user/src/core/models/221602/mercancia.model';
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
  configuracionTabla: ConfiguracionColumna<Exportador>[] = [
    { encabezado: 'Nombre/denominación o razón social', clave: (item: Exportador) => item.nombre_denominacion_o_razon_social, orden: 1 },
    { encabezado: 'Teléfono', clave: (item: Exportador) => item.telefono, orden: 2 },
    { encabezado: 'Correo electrónico', clave: (item: Exportador) => item.correo_electronico, orden: 3 },
    { encabezado: 'Domicilio', clave: (item: Exportador) => item.domicilio, orden: 4 }
  ];

  /**
   * Lista de destinatarios obtenida desde un archivo JSON.
   * Cada destinatario contiene información como nombre, teléfono, correo electrónico y dirección.
   */
  destinatario: Destinatario[] = realizar.destinatario;

  /**
   * Configuración de las columnas de la tabla de destinatarios.
   * Define el encabezado, clave y el orden de las columnas para la tabla de destinatarios.
   */
  configuracionTablaDatos: ConfiguracionColumna<Destinatario>[] = [
    { encabezado: 'Nombre/denominación o razón social', clave: (item: Destinatario) => item.nombre_denominacion_o_razon_social, orden: 1 },
    { encabezado: 'Teléfono', clave: (item: Destinatario) => item.telefono, orden: 2 },
    { encabezado: 'Correo electrónico', clave: (item: Destinatario) => item.correo_electronico, orden: 3 },
    { encabezado: 'Calle', clave: (item: Destinatario) => item.calle, orden: 4 },
    { encabezado: 'Número exterior', clave: (item: Destinatario) => item.numero_exterior, orden: 5 },
    { encabezado: 'Número interior', clave: (item: Destinatario) => item.numero_interior, orden: 6 },
    { encabezado: 'País', clave: (item: Destinatario) => item.pais, orden: 7 },
    { encabezado: 'Colonia', clave: (item: Destinatario) => item.colonia, orden: 8 },
    { encabezado: 'Municipio o Alcaldía', clave: (item: Destinatario) => item.municipio_o_alcaldia, orden: 9 },
    { encabezado: 'Entidad Federativa', clave: (item: Destinatario) => item.entidad_federativa, orden: 10 },
    { encabezado: 'Código Postal', clave: (item: Destinatario) => item.codigo_postal, orden: 11 }
  ];
}
