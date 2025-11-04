import {
  AVISO,
  DatosPasos,
  ListaPasosWizard,
  WizardComponent,
} from '@libs/shared/data-access-user/src';
import { Component, ViewChild } from '@angular/core';
import { ERROR_FORMA_ALERT, EXPEDICION_CERTIFICADOS_FRONTERA } from '../../constantes/expedicion-certificados-frontera.enum';
import { PasoUnoComponent } from '../paso-uno/paso-uno.component';

/**
 * Interfaz que representa la acción del botón dentro del wizard.
 */
interface AccionBoton {
  /** Acción que se va a ejecutar ('cont' para continuar o cualquier otro valor para retroceder). */
  accion: string;

  /** Valor del paso al que se desea mover. */
  valor: number;
}

/**
 * Componente principal que controla el flujo del wizard para la expedición
 * de certificados de frontera. Administra los pasos, el índice actual
 * y la navegación dentro del componente `WizardComponent`.
 */
@Component({
  selector: 'app-expedicion-certificados-frontera',
  templateUrl: './expedicion-certificados-frontera.component.html',
})
export class ExpedicionCertificadosFronteraComponent {

   /**
     * Contiene el mensaje de error que se muestra cuando la validación de formularios falla.
     */
    public formErrorAlert = ERROR_FORMA_ALERT;
  
    /**
     * Controla la visibilidad del mensaje de error cuando la validación de formularios falla.
     * }
     */
    esFormaValido: boolean = false;
  /**
   * Referencia al componente hijo `WizardComponent` para controlar la navegación entre pasos.
   */
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;

  /**
   * Referencia al componente paso uno para acceder a sus métodos de validación.
   */
  @ViewChild(PasoUnoComponent) pasoUnoComponent!: PasoUnoComponent;

  /**
   * Lista de pantallas que conforman los pasos del wizard.
   */
  pantallasPasos: ListaPasosWizard[] = EXPEDICION_CERTIFICADOS_FRONTERA;

  /**
   * Mensaje de aviso de privacidad que se muestra al usuario.
   */
  public avisoPrivacidadAlert: string = AVISO.Aviso;

  /**
   * Índice actual del paso activo en el wizard.
   */
  indice = 1;

  /**
   * Datos de configuración para los pasos del wizard (texto de botones, número total de pasos, etc.).
   */
  datosPasos: DatosPasos = {
    nroPasos: this.pantallasPasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };

  /**
   * Cambia el paso actual del wizard en función de la acción realizada (continuar o retroceder).
   * Valida el formulario antes de continuar al siguiente paso.
   * 
   * @param e Objeto que contiene la acción (`accion`) y el paso (`valor`) al que se desea mover.
   */
  getValorIndice(e: AccionBoton): void {
    if (e.valor > 0 && e.valor < 5) {
      
      // Si la acción es continuar, validar el formulario del paso actual
      if (e.accion === 'cont') {
        if (this.validarPasoActual()) {
          this.esFormaValido = false; // Ocultar mensaje de error
          this.indice = e.valor;
          this.wizardComponent.siguiente();
        } else {
          this.esFormaValido = true; // Mostrar mensaje de error
          // No continuar si la validación falla
        }
      } else {
        this.esFormaValido = false; // Ocultar mensaje de error al retroceder
        this.indice = e.valor;
        this.wizardComponent.atras();
      }
    }
  }

  /**
   * Valida el formulario del paso actual.
   * @returns true si el formulario es válido, false en caso contrario.
   */
  private validarPasoActual(): boolean {
    switch (this.indice) {
      case 1:
        // Validar paso 1 - usar el método que valida todo el formulario
        if (this.pasoUnoComponent) {
          return this.pasoUnoComponent.validarFormularioCompleto();
        }
        return false;
      
      case 2:
        // Validar paso 2 si es necesario
        return true;
      
      case 3:
        // Validar paso 3 si es necesario
        return true;
      
      default:
        return true;
    }
  }
}
