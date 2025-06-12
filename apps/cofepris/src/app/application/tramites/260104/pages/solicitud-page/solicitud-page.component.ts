import { AVISO, AccionBoton, DatosPasos, ListaPasosWizard, PASOS, WizardComponent } from '@libs/shared/data-access-user/src';
import { Component, ViewChild } from '@angular/core';
import { CompleteForm } from '@libs/shared/data-access-user/src/core/models/260104/domicilo.model';
import { PermisoSanitarioProductosService } from '../../services/permiso-sanitario-productos.service';

/**
 * Componente que representa la página principal de la solicitud en el trámite 260104.
 * Este componente gestiona la navegación entre los pasos del wizard y la recopilación de datos del formulario.
 */
@Component({
  selector: 'app-solicitud-page',
  templateUrl: './solicitud-page.component.html',
})
export class SolicitudPageComponent {
  /**
   * Lista de pasos del wizard.
   * Utiliza la configuración predefinida en el objeto `PASOS`.
   */
  pasos: ListaPasosWizard[] = PASOS;

  /**
   * Constante de alerta utilizada en el componente.
   * @type {typeof ALERTA_COM}
   */
  alerta = AVISO;

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
   * Objeto que almacena los datos recopilados del formulario.
   * Contiene los datos de la solicitud en formato `CompleteForm[]`.
   */
  payload: {
    datosSolicitud?: CompleteForm[];
  } = {};

  /**
   * Constructor del componente.
   * Inicializa los servicios necesarios para la funcionalidad del componente.
   * @param service - Servicio para gestionar los datos de permisos sanitarios.
   */
  constructor(public service: PermisoSanitarioProductosService) {
    // Constructor vacío, no requiere inicialización adicional.
  }

  /**
   * Cambia el índice actual del paso basado en la acción seleccionada.
   * Navega al paso siguiente o anterior utilizando el componente Wizard.
   * @param e - Objeto de tipo `AccionBoton` que contiene la acción ('cont' o 'atras') y el índice al que navegar.
   */
  getValorIndice(e: AccionBoton): void {
    this.payload = this.service.collectFormValues(); // Recopila los valores del formulario.
    if (this.payload) {
       // Muestra el payload en la consola.
    } else {
       // Muestra un error si el payload no está inicializado.
    }
    if (e.valor > 0 && e.valor < 5) {
      this.indice = e.valor; // Actualiza el índice activo.
      if (e.accion === 'cont') {
        this.wizardComponent.siguiente(); // Navega al paso siguiente.
      } else {
        this.wizardComponent.atras(); // Regresa al paso anterior.
      }
    }
  }
}
