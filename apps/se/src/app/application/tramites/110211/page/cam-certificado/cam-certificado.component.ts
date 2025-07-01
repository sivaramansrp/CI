/**
 * @component CamCertificadoComponent
 * @description
 * El componente `CamCertificadoComponent` es responsable de manejar el flujo de navegación
 * entre los distintos pasos del proceso CAM. Utiliza el componente `WizardComponent` para
 * controlar la transición entre pasos, y presenta un mensaje informativo asociado al proceso.
 */
import { AccionBoton, ListaPasoWizard } from '../../models/cam-certificado.module';
import { Component, ViewChild } from '@angular/core';
import { DatosPasos } from '@ng-mf/data-access-user';
import { PASOS } from '../../constantes/cam-certificado.module';
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
