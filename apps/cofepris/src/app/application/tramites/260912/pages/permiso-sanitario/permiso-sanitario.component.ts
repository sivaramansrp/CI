import { Component, ViewChild } from '@angular/core';
import { AVISO } from '@libs/shared/data-access-user/src/tramites/constantes/aviso-privacidad.enum';
import { DatosPasos } from '@ng-mf/data-access-user';
import { ListaPasosWizard } from '@ng-mf/data-access-user';
import { PASOS } from '@ng-mf/data-access-user';
import { WizardComponent } from '@ng-mf/data-access-user';

/**
 * Interfaz que define la estructura de un botón de acción
 * @interface AccionBoton
 */
interface AccionBoton {
  /** Tipo de acción a realizar (ej: 'cont' para continuar, 'atras' para retroceder) */
  accion: string;
  /** Valor numérico que representa el índice del paso */
  valor: number;
}

/**
 * Componente principal para la gestión del trámite de Permiso Sanitario.
 * Maneja la navegación entre pasos mediante un wizard y controla el flujo
 * de información del usuario a través de múltiples pantallas.
 * 
 * @export
 * @class PermisoSanitarioComponent
 */
@Component({
  selector: 'app-permiso-sanitario',
  templateUrl: './permiso-sanitario.component.html',
})
export class PermisoSanitarioComponent {
  
  /**
   * Lista de pasos del wizard obtenida de la constante PASOS.
   * Contiene la configuración de todos los pasos disponibles en el proceso.
   * @type {ListaPasosWizard[]}
   * @memberof PermisoSanitarioComponent
   */
  pasos: ListaPasosWizard[] = PASOS;

  /**
   * Referencia al componente WizardComponent para poder acceder a sus métodos
   * de navegación (siguiente, atrás) desde el componente padre.
   * @type {WizardComponent}
   * @memberof PermisoSanitarioComponent
   */
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;

  /**
   * Copia de la lista de pasos utilizada para manejar las pantallas del wizard.
   * Permite manipular la visualización de pasos sin afectar la lista original.
   * @type {ListaPasosWizard[]}
   * @memberof PermisoSanitarioComponent
   */
  pantallasPasos: ListaPasosWizard[] = PASOS;

  /**
   * Índice actual del paso en el que se encuentra el usuario.
   * Valor por defecto: 1 (primer paso).
   * @type {number}
   * @memberof PermisoSanitarioComponent
   */
  indice: number = 1;

  /**
   * Configuración de datos para el componente wizard.
   * Contiene información sobre el número total de pasos, índice actual
   * y textos de los botones de navegación.
   * @type {DatosPasos}
   * @memberof PermisoSanitarioComponent
   */
  datosPasos: DatosPasos = {
    nroPasos: this.pasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };

  /**
   * Constante que contiene el texto del aviso de privacidad
   * obtenido del enum AVISO.
   * @type {string}
   * @memberof PermisoSanitarioComponent
   */
  AVISO_DE_PRIVACIDAD = AVISO.Aviso;

  /**
   * Maneja la navegación entre pasos del wizard basándose en la acción
   * del botón presionado por el usuario.
   * 
   * Valida que el valor del índice esté dentro del rango permitido (1-4)
   * y ejecuta la acción correspondiente en el componente wizard.
   * 
   * @public
   * @param {AccionBoton} e - Objeto que contiene la acción y el valor del paso
   * @param {string} e.accion - Tipo de acción ('cont' para continuar, otro valor para retroceder)
   * @param {number} e.valor - Índice del paso al cual navegar (debe estar entre 1 y 4)
   * @returns {void}
   * @memberof PermisoSanitarioComponent
   * 
   * @example
   * // Continuar al siguiente paso
   * this.getValorIndice({ accion: 'cont', valor: 2 });
   * 
   * @example
   * // Retroceder al paso anterior
   * this.getValorIndice({ accion: 'atras', valor: 1 });
   */
  public getValorIndice(e: AccionBoton): void {
    // Validar que el valor esté dentro del rango permitido
    if (e.valor > 0 && e.valor < 5) {
      // Actualizar el índice actual
      this.indice = e.valor;
      
      // Ejecutar la acción correspondiente en el wizard
      if (e.accion === 'cont') {
        // Navegar al siguiente paso
        this.wizardComponent.siguiente();
      } else {
        // Navegar al paso anterior
        this.wizardComponent.atras();
      }
    }
  }
}