import { AVISO } from '@libs/shared/data-access-user/src';
import { Component } from '@angular/core';
import { DatosPasos } from '@libs/shared/data-access-user/src';
import { ERROR_ALERTA } from '@libs/shared/data-access-user/src/tramites/constantes/mensajes-error-formularios';
import { ListaPasosWizard } from '@libs/shared/data-access-user/src';
import { PASOS } from '@libs/shared/data-access-user/src';
import { PasoUnoComponent } from '../paso-uno/paso-uno.component';
import { Solicitud260910Query } from '../../estados/tramites260910.query';
import { Solicitud260910Store } from '../../estados/tramites260910.store';
import { ViewChild } from '@angular/core';
import { WizardComponent } from '@libs/shared/data-access-user/src';

/**
 * Interfaz para definir las acciones de los botones en el flujo del wizard.
 * @property accion - Define la acción a realizar, como avanzar ('cont') o retroceder.
 * @property valor - El índice o paso relacionado con la acción.
 */
interface AccionBoton {
  /**
   * Define la acción a realizar, como avanzar ('cont') o retroceder.
   */
  accion: string;
  /**
   * El índice o paso relacionado con la acción.
   */
  valor: number;
}

/**
 * Componente ImportacionProductosComponent.
 * Este componente gestiona el flujo de importación de productos mediante un wizard de múltiples pasos.
 */
@Component({
  selector: 'app-permiso-sanitario-solicitante',
  templateUrl: './permiso-sanitario-solicitante.component.html',
  styleUrls: ['./permiso-sanitario-solicitante.component.scss'],
})
/**
 * Componente permisoSanitarioSolicitante.
 * Este componente gestiona el flujo de importación de productos mediante un wizard de múltiples pasos.
 */
export class PermisoSanitarioSolicitanteComponent {
  /**
   * Lista de pasos del wizard.
   * Utiliza la configuración predefinida en el objeto `PASOS`.
   */
  pasos: ListaPasosWizard[] = PASOS;

  /**
   * Índice actual del paso activo en el wizard.
   * Valor predeterminado: 1.
   */
  public indice = 1;

  /**
   * Configuración de los datos necesarios para los pasos del wizard.
   * Incluye el número de pasos, el índice actual y los textos de los botones "Anterior" y "Continuar".
   */
  datosPasos: DatosPasos = {
    nroPasos: this.pasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };

  /**
   * Referencia al componente hijo `WizardComponent`.
   * Se utiliza para controlar la navegación entre los pasos del wizard.
   */
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;

  /**
   * Referencia al componente hijo `PasoUnoComponent`.
   * Se utiliza para acceder a las propiedades y métodos del primer paso del wizard.
   */
  @ViewChild(PasoUnoComponent) pasoUnoComponent!: PasoUnoComponent;

  /**
   *
   * Una cadena que representa la clase CSS para una alerta de información.
   * Esta clase se utiliza para aplicar estilo a los mensajes de información en el componente.
   */
  public infoAlert = 'alert-info';

  /**
   * Asigna el aviso de privacidad simplificado al atributo `TEXTOS`.
   */
  TEXTOS = AVISO;

  /**
   * Asigna el mensaje de error de alerta al atributo `ALERTA`.
   */
  ALERTA = ERROR_ALERTA;

  /**
   * Una cadena que representa la clase CSS para una alerta de error.
   */
  infoError = 'alert-danger';

  /**
   * Indica si el formulario es válido para proceder.
   */
  esValido: boolean = true;

  /**
   * Constructor del componente.
   * Inicializa los servicios necesarios para la funcionalidad del componente.
   * @param solicitud260910Store - Servicio para manejar el estado de la solicitud.
   * @param solicitud260910Query - Servicio para consultar el estado de la solicitud.
   */
  constructor(
    public solicitud260910Store: Solicitud260910Store,
    public solicitud260910Query: Solicitud260910Query
  ) {
    // Constructor vacío, no requiere inicialización adicional.
  }

  /**
   * Cambia el índice actual del paso basado en la acción seleccionada.
   * Navega al paso siguiente o anterior utilizando el componente Wizard.
   * @param e - Objeto de tipo `AccionBoton` que contiene la acción ('cont' o 'atras') y el índice al que navegar.
   */
  getValorIndice(e: AccionBoton): void {
    if (e.valor > 0 && e.valor < 5) {
      if (this.indice === 1) {
        const PAGO_DERECHOS_COMPONENT =
          this.pasoUnoComponent.pagoDerechosComponent;
        const SOLICITUD_DATOS_COMPONENT =
          this.pasoUnoComponent.solicitudDatosComponent;

        if (SOLICITUD_DATOS_COMPONENT?.solicitudForm.invalid) {
          this.datosPasos.indice = 1;
          SOLICITUD_DATOS_COMPONENT.solicitudForm.markAllAsTouched();
          if (PAGO_DERECHOS_COMPONENT?.pagoDeDerechosForm.invalid) {
            PAGO_DERECHOS_COMPONENT.esContinuarClicked = true;
            PAGO_DERECHOS_COMPONENT.pagoDeDerechosForm.markAllAsTouched();
          }
          this.esValido = false;
          return;
        } else if (PAGO_DERECHOS_COMPONENT?.pagoDeDerechosForm.invalid) {
          this.datosPasos.indice = 1;
          PAGO_DERECHOS_COMPONENT.esContinuarClicked = true;
          PAGO_DERECHOS_COMPONENT.pagoDeDerechosForm.markAllAsTouched();
          this.esValido = false;
          return;
        }
      }
    }

    this.indice = e.valor; // Actualiza el índice activo.
    if (e.accion === 'cont') {
      this.wizardComponent.siguiente(); // Navega al paso siguiente.
    } else {
      this.wizardComponent.atras(); // Regresa al paso anterior.
    }
  }
}