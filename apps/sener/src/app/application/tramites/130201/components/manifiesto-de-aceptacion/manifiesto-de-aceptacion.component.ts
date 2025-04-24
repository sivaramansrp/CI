/**
 * @componente
 * @nombre ManifiestoDeAceptacionComponent
 * @descripcion
 * Este componente representa el manifiesto de aceptación en el flujo de trámites dentro de la aplicación.
 * Es un componente autónomo que se encarga de mostrar información y alertas relacionadas con el proceso de aceptación de trámites.
 * Utiliza otros componentes y módulos compartidos para cumplir su función.
 *
 * @selector app-manifiesto-de-aceptacion
 * @autonomo true
 * @plantillaUrl ./manifiesto-de-aceptacion.component.html
 * @estiloUrl ./manifiesto-de-aceptacion.component.scss
 * @importaciones [CommonModule, TituloComponent, AlertComponent]
 *
 * @remarks
 * Este componente se utiliza en aplicaciones que gestionan flujos de trámites donde los usuarios deben aceptar ciertos términos o condiciones.
 * Está diseñado para ser reutilizable en diferentes contextos sin depender de un módulo específico.
 */
import { AlertComponent } from '@ng-mf/data-access-user';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MANIFIESTO_ACEPTACION_HTML } from '../../../../shared/constantes/manifesto-texto.enum';
import { TituloComponent } from '@ng-mf/data-access-user';
 
/**
 * @decorador
 * @descripcion
 * Define el metadato del componente, especificando el selector, la plantilla, el estilo y los módulos importados.
 * Estos metadatos permiten que Angular construya y maneje el componente correctamente dentro de la aplicación.
 */
@Component({
  /**
   * @selector
   * @descripcion
   * El selector es utilizado para referenciar este componente en otras plantillas dentro de la aplicación.
   * Al usar el selector `app-manifiesto-de-aceptacion`, el componente se incluirá en el DOM de la página donde se utilice.
   */
  selector: 'app-manifiesto-de-aceptacion',
 
  /**
   * @autonomo
   * @descripcion
   * El componente es autónomo, lo que significa que no depende de un módulo específico para ser utilizado.
   * Esto le permite ser utilizado de manera independiente en cualquier parte de la aplicación sin necesidad de ser parte de un módulo principal.
   */
  standalone: true,
 
  /**
   * @importaciones
   * @descripcion
   * Aquí se definen los módulos y componentes que este componente utiliza.
   * Se incluyen los siguientes:
   * - CommonModule: Importa directivas comunes de Angular como `ngIf`, `ngFor`, etc.
   * - TituloComponent: Un componente utilizado para mostrar títulos de sección dentro del flujo.
   * - AlertComponent: Un componente utilizado para mostrar alertas y notificaciones al usuario.
   */
  imports: [CommonModule, TituloComponent, AlertComponent],
 
  /**
   * @plantillaUrl
   * @descripcion
   * Define la ruta al archivo HTML que contiene la estructura visual del componente.
   * Este archivo es responsable de mostrar la interfaz de usuario del manifiesto de aceptación.
   */
  templateUrl: './manifiesto-de-aceptacion.component.html',
 
  /**
   * @estiloUrl
   * @descripcion
   * Define la ruta al archivo SCSS que contiene los estilos para el componente.
   * Los estilos definidos en este archivo se aplican al HTML del componente para darle su apariencia visual.
   */
  styleUrls: ['./manifiesto-de-aceptacion.component.scss'],
})
 
/**
 * @clase
 * @nombre ManifiestoDeAceptacionComponent
 * @descripcion
 * La clase `ManifiestoDeAceptacionComponent` es responsable de la lógica del componente de manifiesto de aceptación.
 * Este componente se utiliza dentro de un flujo de trámites donde el usuario debe aceptar ciertos términos o condiciones.
 * A través de este componente, se gestionan las interacciones del usuario con el manifiesto y las alertas relacionadas.
 */
export class ManifiestoDeAceptacionComponent {
  /**
 * @property
 * @name manifestoText
 * @description
 * Esta propiedad contiene el texto HTML del manifiesto de aceptación.
 * El contenido de esta propiedad se utiliza para mostrar el manifiesto en la interfaz de usuario.
 * El valor se obtiene de la constante `MANIFIESTO_ACEPTACION_HTML`, que está definida en el módulo compartido.
 * 
 * @type {string}
 * @default MANIFIESTO_ACEPTACION_HTML
 */
manifestoText = MANIFIESTO_ACEPTACION_HTML;
}
 
 
 