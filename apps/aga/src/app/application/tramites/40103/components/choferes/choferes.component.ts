/**
 * Componente principal para la gestión de choferes en el trámite 40103.
 *
 * Este archivo contiene el componente Angular que maneja la interfaz de usuario para la gestión
 * de choferes nacionales y extranjeros en el sistema de transportistas terrestres. Proporciona
 * funcionalidades para alta, modificación, retirada y notificaciones de choferes.
 *
 * El componente incluye:
 * - Gestión de pestañas para choferes nacionales y extranjeros
 * - Componentes especializados para diferentes operaciones de choferes
 * - Integración con enumeraciones y constantes del sistema
 * - Manejo del estado activo de las pestañas de navegación
 *
 * @author Sistema de Gestión de Trámites - Frontend Team
 * @version 1.0.0
 * @since 1.0.0
 * @module ChoferesComponent
 */

import {
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { CHOFERES_PAGE } from '../../enum/transportista-terrestre.enum';
import { ChofereAltaDeExtranjerosComponent } from './extranjero/alta-de-extranjeros/chofere.alta.de.extranjeros.component';
import { ChofereModificationDeChoferesComponent } from './extranjero/modification-de-choferes/chofere.modification.de.choferes.component';
import { ChofereNacionalComponent } from './chofere.nacional/chofere.nacional.component';
import { ChofereNacionalModificacionComponent } from './chofere.nacional/chofere.nacional.modificacion/chofere.nacional.modificacion.component';
import { ChofereNacionalNotificationComponent } from './chofere.nacional.nofitication/chofere.nacional.notification.component';
import { ChofereNacionalRetiradaComponent } from './chofere.nacional/chofere.nacional.retirada/chofere.nacional.retirada.component';
import { ChofereRetiradaDeChoferesComponent } from './extranjero/retirada-de-choferes/chofere.retirada.de.choferes.component';
import { CommonModule } from '@angular/common';
import {
  Component,
} from '@angular/core';
import { SharedModule } from '@ng-mf/data-access-user';
import { TEXTOS } from '../../enum/choferes.enum';
import { TituloComponent } from '@ng-mf/data-access-user';

/**
 * Componente Angular para la gestión integral de choferes en el trámite 40103.
 *
 * Este componente proporciona una interfaz de usuario completa para la administración
 * de choferes nacionales y extranjeros en el sistema de transportistas terrestres.
 * Incluye funcionalidades para registro, modificación, retirada y notificaciones
 * de conductores profesionales.
 *
 * Características principales:
 * - Sistema de pestañas para navegación entre tipos de choferes
 * - Integración con componentes especializados para cada operación
 * - Manejo de estado para la pestaña activa
 * - Acceso a constantes y enumeraciones del sistema
 *
 * @component
 * @selector app-choferes
 * @standalone true
 * 
 * @example
 * ```html
 * <app-choferes></app-choferes>
 * ```
 *
 * @since 1.0.0
 */
@Component({
  selector: 'app-choferes',
  templateUrl: './choferes.component.html',
  styleUrls: ['./choferes.component.scss'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    SharedModule,
    FormsModule,
    TituloComponent,
    ChofereNacionalComponent,
    ChofereAltaDeExtranjerosComponent,
    ChofereNacionalNotificationComponent,
    ChofereNacionalModificacionComponent,
    ChofereNacionalRetiradaComponent,
    ChofereRetiradaDeChoferesComponent,
    ChofereModificationDeChoferesComponent
  ],
})
export class ChoferesComponent {
  /**
   * Constante que contiene las configuraciones de páginas para choferes.
   * 
   * Proporciona acceso a las definiciones de páginas y configuraciones
   * relacionadas con la gestión de choferes en el sistema de transportistas terrestres.
   *
   * @constant {typeof CHOFERES_PAGE}
   * @readonly
   */
  CHOFERES_PAGE = CHOFERES_PAGE;

  /**
   * Constante que contiene los textos utilizados en la interfaz de choferes.
   * 
   * Incluye mensajes, etiquetas y textos descriptivos utilizados en los
   * componentes de gestión de choferes para mantener consistencia en la interfaz.
   *
   * @constant {typeof TEXTOS}
   * @readonly
   */
  TEXTOS = TEXTOS;

  /**
   * Pestaña activa en la interfaz de choferes.
   * 
   * Controla qué sección de la interfaz está visible actualmente.
   * Los valores posibles son:
   * - 'nacional': Para gestión de choferes nacionales
   * - 'extranjero': Para gestión de choferes extranjeros
   *
   * @property {string} activeTab
   * @default 'nacional'
   */
  activeTab: string = 'nacional';

  /**
   * Establece la pestaña activa en la interfaz de choferes.
   * 
   * Cambia la pestaña activa para mostrar la sección correspondiente
   * de gestión de choferes (nacional o extranjero). Actualiza el estado
   * del componente para reflejar la nueva selección en la interfaz de usuario.
   *
   * @method setActiveTab
   * @param {string} tab - La pestaña que se establecerá como activa.
   *                       Valores válidos: 'nacional', 'extranjero'
   * @returns {void}
   * 
   * @example
   * ```typescript
   * // Cambiar a la pestaña de choferes nacionales
   * this.setActiveTab('nacional');
   * 
   * // Cambiar a la pestaña de choferes extranjeros
   * this.setActiveTab('extranjero');
   * ```
   *
   * @since 1.0.0
   */
  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }
}
