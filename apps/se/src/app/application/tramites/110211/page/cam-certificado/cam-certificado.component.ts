/**
 * @component CamCertificadoComponent
 * @description
 * El componente `CamCertificadoComponent` es responsable de manejar el flujo de navegación
 * entre los distintos pasos del proceso CAM. Utiliza el componente `WizardComponent` para
 * controlar la transición entre pasos, y presenta un mensaje informativo asociado al proceso.
 */
import { AccionBoton, ListaPasoWizard } from '../../models/cam-certificado.module';
import { Component, ViewChild } from '@angular/core';
import { ERROR_FORMA_ALERT, PASOS, PRIVACY_NOTICE_CONTENT } from '../../constantes/cam-certificado.module';
import { DatosPasos } from '@ng-mf/data-access-user';
import { PasoUnoComponent } from '../paso-uno/paso-uno.component';
import { WizardComponent } from '@ng-mf/data-access-user';

@Component({
  selector: 'app-cam-certificado',
  templateUrl: './cam-certificado.component.html',
  styleUrl: './cam-certificado.component.scss',
})
export class CamCertificadoComponent {
  /**
   * @property {ListaPasoWizard[]} pasos
   * @description
   * Arreglo de pasos definidos para el flujo del wizard del trámite CAM.
   * Utilizado para determinar la cantidad de pasos y su contenido.
   */
  pasos: ListaPasoWizard[] = PASOS;

  /**
   * @property {string | null} tituloMensaje
   * @description
   * Mensaje principal o título que se muestra en el encabezado del formulario.
   */
  tituloMensaje: string | null = 'Zoosanitario para importación';

  /**
   * @property {WizardComponent} wizardComponent
   * @description
   * Referencia al componente hijo `WizardComponent` que gestiona la lógica de navegación.
   */
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;

    /**
 * Referencia al componente hijo `PasoUnoComponent` para acceder a sus métodos de validación de formularios.
 * const isValid = this.pasoUnoComponent.validateForms();
 * const formsValidity = this.pasoUnoComponent.getAllFormsValidity();
 */
  @ViewChild('pasoUnoRef') pasoUnoComponent!: PasoUnoComponent;

  /**
   * @property {number} indice
   * @description
   * Índice actual del paso activo en el wizard. Comienza en 1.
   */
  indice: number = 1;

  /**
   * @property {DatosPasos} datosPasos
   * @description
   * Contiene metainformación sobre el wizard, como el número de pasos,
   * el índice actual y los textos de los botones de navegación.
   */
  datosPasos: DatosPasos = {
    nroPasos: this.pasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };

    /**
   * Contiene el mensaje de error que se muestra cuando la validación de formularios falla.
   */
    public formErrorAlert = ERROR_FORMA_ALERT;

      /** Datos de respuesta del servidor utilizados para actualizar el formulario. */
  public esFormaValido: boolean = false;

  public PRIVACY_NOTICE_CONTENT:string=PRIVACY_NOTICE_CONTENT;

  /**
   * @method getValorIndice
   * @description
   * Método encargado de actualizar el paso actual (`indice`) y de navegar
   * hacia adelante o atrás en el wizard, según la acción especificada.
   *
   * @param {AccionBoton} e - Objeto que contiene el valor del paso destino y la acción ('cont' para continuar, otro para retroceder).
   *
   * @example
   * ```ts
   * getValorIndice({ valor: 2, accion: 'cont' });
   * ```
   */
    getValorIndice(e: AccionBoton): void {
    this.esFormaValido = false;

    // Validar formularios antes de continuar desde el paso uno
    if (this.indice === 1 && e.accion === 'cont') {
      const ISVALID = this.validarTodosFormulariosPasoUno();
      if (!ISVALID) {
        this.esFormaValido = true;
        return; // Detener ejecución si los formularios son inválidos
      }
    }
    // Calcular el nuevo índice basado en la acción
    let indiceActualizado = e.valor;
    if (e.accion === 'cont') {
      indiceActualizado = e.valor + 1;
    } else if (e.accion === 'ant') {
      indiceActualizado = e.valor - 1;
    }

    // Validar que el nuevo índice esté dentro de los límites permitidos
    if (indiceActualizado > 0 && indiceActualizado <= this.pasos.length) {

      // Actualizar el índice y datosPasos
      this.indice = indiceActualizado;
      this.datosPasos.indice = indiceActualizado;

      if (e.accion === 'cont') {
        this.wizardComponent.siguiente();
      } else if (e.accion === 'ant') {
        this.wizardComponent.atras();
      }
    }
  }

    /**
 * Valida todos los formularios del primer paso antes de permitir continuar al siguiente paso.
 */
  public validarTodosFormulariosPasoUno(): boolean {
    if(this.pasoUnoComponent){
    const ISFORM_VALID_TOUCHED = this.pasoUnoComponent.validarFormularios();
    if (ISFORM_VALID_TOUCHED) {
      return true;
    }
      return false;
  } 
    return false;
  }

}
