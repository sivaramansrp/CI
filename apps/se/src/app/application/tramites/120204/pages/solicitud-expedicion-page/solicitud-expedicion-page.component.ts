import { Component, ViewChild, inject } from '@angular/core';
import { DatosPasos, WizardComponent, WizardService } from '@libs/shared/data-access-user/src';
import { AccionBoton } from '@libs/shared/data-access-user/src/core/models/140103/cancelacion.model';
import { ListaPasosWizard } from '@libs/shared/data-access-user/src';
import { PASOS } from '@libs/shared/data-access-user/src/tramites/constantes/303/pasos.enums';

import { ALERTA_COM, ERROR_FORMA_ALERT, REQUISITOS } from '../../constantes/expedicion-certificado.enum';

import { ExpedicionCertificadoService } from '../../services/expedicion-certificado.service';

/**
 * Componente para la página de solicitud de expedición.
 * Este componente gestiona el flujo de pasos en un asistente (wizard) 
 * y permite la navegación entre ellos.
 */
@Component({
  selector: 'app-solicitud-expedicion',
  templateUrl: './solicitud-expedicion-page.component.html',
})
export class SolicitudExpedicionPageComponent {

  /**
   * @property formErrorAlert
   * @description
   * Contiene el mensaje de alerta que se muestra cuando ocurre un error en el formulario.
   */
  public formErrorAlert = ERROR_FORMA_ALERT;

  /**
   * @property esFormaValido
   * @description
   * Indica si el formulario actual es válido. Se utiliza para habilitar o deshabilitar la navegación entre pasos en el wizard.
   */
  public esFormaValido!: boolean;

  /**
   * Constante que asigna el texto de alerta definido en `ALERTA_COM`.
   */
  TEXTOSR = ALERTA_COM;

  /**
   * Lista de pantallas o pasos del asistente.
   * Se inicializa con la entidad correspondiente.
   */
  pantallasPasos: ListaPasosWizard[] = PASOS;

  /**
   * Índice actual del paso en el asistente.
   * Por defecto, comienza en 1.
   */
  indice: number = 1;

  /**
   * Textos de requisitos utilizados en el componente.
   */
  public TEXTOS = REQUISITOS;

  /**
   * Referencia al componente del asistente (wizard).
   * Se utiliza para controlar la navegación entre pasos.
   */
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;

  /**
   * Servicio del wizard para gestionar la lógica y el estado del componente wizard.
   */
  wizardService = inject(WizardService);

  /**
   * Datos relacionados con los pasos del asistente.
   * Incluye el número total de pasos, el índice actual y los textos de los botones.
   */
  datosPasos: DatosPasos = {
    nroPasos: this.pantallasPasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };

  /**
   * Constructor del componente.
   */
  constructor(
    public servicioDeFormularioService: ExpedicionCertificadoService
  ) {}

  /**
   * @method verificarLaValidezDelFormulario
   * @description
   * Este método verifica la validez de los formularios dinámicos asociados a los pasos del wizard.
   * @returns {boolean} - Indica si todos los formularios son válidos.
   */
  verificarLaValidezDelFormulario(): boolean {
   
    return (
      (this.servicioDeFormularioService.isFormValid('datosForm') ?? false)
    );
  }

  /**
   * Método para actualizar el índice del paso actual en el asistente.
   * Permite avanzar o retroceder en función de la acción recibida.
   * 
   * @param e - Objeto de tipo `AccionBoton` que contiene el valor del índice y la acción a realizar.
   */
  getValorIndice(e: AccionBoton): void {
  
    this.esFormaValido = this.verificarLaValidezDelFormulario();
    
    if (e.valor > 0 && e.valor <= this.pantallasPasos.length) {
      if (e.accion === 'cont') {
        this.continuar(e);
      } else if (e.accion === 'ant') {
        this.indice = e.valor - 1;
        this.datosPasos.indice = e.valor - 1;
        this.wizardComponent.atras();
      } else if (!this.esFormaValido) {
        this.indice = e.valor;
        this.datosPasos.indice = e.valor;
      }
    }
  }

  /**
   * @method continuar
   * @description
   * Maneja la lógica para continuar al siguiente paso del wizard.
   */
  public continuar(e: AccionBoton): void {
    if (this.esFormaValido) {
      this.indice = e.valor + 1;
      this.datosPasos.indice = e.valor + 1;
      this.wizardService.cambio_indice(this.datosPasos.indice);
      this.wizardComponent.siguiente();
    }
    
  }
}
