import { Component, ViewChild } from '@angular/core';
import { AVISO } from '@libs/shared/data-access-user/src/tramites/constantes/aviso-privacidad.enum';
import { DatosPasos } from '@ng-mf/data-access-user';
import { FormGroup } from '@angular/forms';
import { ListaPasosWizard } from '@ng-mf/data-access-user';
import { PASOS } from '@ng-mf/data-access-user';
import { WizardComponent } from '@ng-mf/data-access-user';

/**
 * Interfaz que representa la acción de un botón.
 */
interface AccionBoton {
  /**
   * La acción que se va a realizar.
   */
  accion: string;
  /**
   * El valor asociado a la acción.
   */
  valor: number;
}

/**
 * Componente que representa los pasos de datos en un proceso de múltiples pasos.
 * Gestiona el flujo de un asistente (wizard) para el trámite de permiso sanitario,
 * incluyendo la navegación entre pasos, manejo de mensajes y datos asociados.
 */
@Component({
  /**
   * Selector del componente utilizado en el HTML.
   */
  selector: 'app-permiso-sanitary',
  /**
   * Ruta del archivo de plantilla HTML asociado al componente.
   */
  templateUrl: './permiso-sanitario.component.html',
})
export class PermisoSanitarioComponent {
  /**
   * Variable para almacenar mensajes de información o error.
   */
  message: string | undefined;

  /**
   * Maneja mensajes de error.
   * Asigna el mensaje de error a la variable `message` y lanza una excepción.
   * @param errorMessage El mensaje de error que se desea mostrar.
   */
  errorMessage(errorMessage: string): void {
    this.message = errorMessage;
    throw new Error('Method not implemented.');
  }

  /**
   * Método estático para manejar el evento de envío.
   * Actualmente no implementado.
   * @throws Error siempre que se llama, ya que no está implementado.
   */
  static onSubmit(): void {
    throw new Error('Method not implemented.');
  }

  /**
   * Formulario reactivo asociado al componente.
   */
  form: FormGroup | undefined;

  /**
   * Lista de pasos en el asistente.
   */
  pasos: ListaPasosWizard[] = PASOS;

  /**
   * Referencia al componente WizardComponent.
   */
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;

  /**
   * Variable utilizada para almacenar la lista de pasos.
   */
  pantallasPasos: ListaPasosWizard[] = PASOS;

  /**
   * Variable utilizada para almacenar el índice del paso actual.
   */
  indice: number = 1;

  /**
   * Datos para los pasos en el asistente, incluyendo número de pasos, índice y textos de botones.
   */
  datosPasos: DatosPasos = {
    nroPasos: this.pasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };

  /**
   * Contiene el aviso de privacidad y lo asigna al valor correspondiente.
   */
  AVISO_DE_PRIVACIDAD = AVISO.Aviso;

  /**
   * Actualiza el valor del índice según el evento del botón de acción.
   * Navega al siguiente o anterior paso en el asistente según la acción recibida.
   * @param e El evento del botón de acción que contiene la acción y el valor.
   */
  public getValorIndice(e: AccionBoton): void {
    if (e.valor > 0 && e.valor < 5) {
      this.indice = e.valor;
      if (e.accion === 'cont') {
        this.wizardComponent.siguiente();
      } else {
        this.wizardComponent.atras();
      }
    }
  }
}