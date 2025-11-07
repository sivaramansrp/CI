import { AVISO, DatosPasos, Notificacion } from '@libs/shared/data-access-user/src';
import { Component, ViewChild } from '@angular/core';
import { AccionBoton } from '@libs/shared/data-access-user/src/core/models/140103/cancelacion.model';
import { ListaPasosWizard } from '@libs/shared/data-access-user/src';
import { OCTA_TEMPO } from '@libs/shared/data-access-user/src/core/services/130102/octava-temporal.enum';
import { WizardComponent } from '@libs/shared/data-access-user/src';
import { Solicitud130106State } from '../../../../estados/tramites/tramite130106.store';
import { MSG_REGISTRO_EXITOSO } from '../../constantes/desmantelar.enum';



@Component({
  selector: 'app-desmantelar',
  templateUrl: './desmantelar.component.html',
})

export class DesmantelarComponent {
  /**
 * @property {ListaPasosWizard[]} pantallasPasos - Array para almacenar los pasos del wizard.
 */
  pantallasPasos: ListaPasosWizard[] = OCTA_TEMPO;

  solicitudState!: Solicitud130106State;

  /**
   * Folio temporal de la solicitud.
   * Se utiliza para mostrar el folio en la notificación de éxito.
   */
  public alertaNotificacion!: Notificacion;
  /**
 * Identificador numérico de la solicitud actual.
 * Se inicializa en 0 y se actualiza cuando se captura una nueva solicitud.
 */
  idSolicitud: number = 0;
  /**
   * @property {number} indice - El índice actual del paso.
   */
  indice: number = 1;
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;

  /**
   * Mensaje relacionado con el aviso de privacidad simplificado.
   */
  public avisoPrivacidadAlert: string = AVISO.Aviso;

  /**
* Estado del tramite Folio
*/
  public folioTemporal: number = 0;

  datosPasos: DatosPasos = {
    nroPasos: this.pantallasPasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };

  /**
    * Actualiza la propiedad `indice` según el valor del objeto `AccionBoton` proporcionado.
    * Si la propiedad `valor` de `AccionBoton` está entre 1 y 4 (inclusive), establece `indice` en `valor`.
    * Dependiendo de la propiedad `accion` de `AccionBoton`, mueve el componente del asistente hacia adelante o hacia atrás.
    *
    * @param {AccionBoton} e - El objeto del botón de acción que contiene las propiedades `valor` y `accion`.
    * @returns {void}
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

  // getValorIndice(e: AccionBoton): void {
  //     this.esFormaValido = false;
  //     if (this.indice === 1 && e.accion === 'cont') {
  //       this.datosPasos.indice = 1;
  //       const ISVALID = this.validarTodosFormulariosPasoUno();
  //       if (!ISVALID) {
  //         this.esFormaValido = true;
  //         return;
  //       }
  //       this.obtenerDatosDelStore()
  //     }
  //     else if (e.valor > 0 && e.valor <= this.pasos.length) {
  //       this.pasoNavegarPor(e);
  //     }
  //   }
  /**
     * Navega a través de los pasos del asistente según la acción del botón.
     * @param e Objeto que contiene la acción y el valor del índice al que se desea navegar.
     */
  pasoNavegarPor(e: AccionBoton): void {
    this.indice = e.valor;
    this.datosPasos.indice = e.valor;
    if (e.valor > 0 && e.valor < 5) {
      if (e.accion === 'cont') {
        this.wizardComponent.siguiente();
        if (e.valor > 0 && e.valor < 5) {
          this.alertaNotificacion = {
            tipoNotificacion: 'banner',
            categoria: 'success',
            modo: 'action',
            titulo: '',
            mensaje: MSG_REGISTRO_EXITOSO(String(this.folioTemporal)),
            cerrar: true,
            txtBtnAceptar: '',
            txtBtnCancelar: '',
          };

        }
      } else {
        this.wizardComponent.atras();
      }
    }
  }
}