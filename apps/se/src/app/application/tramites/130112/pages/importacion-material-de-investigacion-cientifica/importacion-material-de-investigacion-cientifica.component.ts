import { AVISO, DatosPasos, ListaPasosWizard, WizardComponent } from '@libs/shared/data-access-user/src';
import { Component, ViewChild } from '@angular/core';
import { AccionBoton } from '../../enums/accion-botton.enum';
import { PASOS_IMPORTACION } from '../../constants/importacion-material-de-investigacion-cientifica-pasos.enum';
import { PasoUnoComponent } from '../paso-uno/paso-uno.component';


/**
 * Constante que representa el índice del primer paso en el proceso de wizard.
 */
const PASO_UNO = 1;

/**
 * @descripcion
 * Componente que representa la página principal del trámite de importación de material de investigación científica.
 * Este componente gestiona la lógica del asistente (wizard) para navegar entre los pasos del trámite.
 *
 * @selector app-importacion-material-de-investigacion-cientifica
 * @templateUrl ./importacion-material-de-investigacion-cientifica.component.html
 */
@Component({
  selector: 'app-importacion-material-de-investigacion-cientifica',
  templateUrl: './importacion-material-de-investigacion-cientifica.component.html',
})
export class ImportacionMaterialDeInvestigacionCientificaComponent {
     /**
   * @property {object} TEXTOS - Contiene constantes relacionadas con aviso y firma.
   * Se utiliza para manejar textos estáticos en la aplicación.
   */
    public TEXTOS = {
    AVISO,
  };
  /**
   * @descripcion
   * Lista de pasos del asistente para el trámite.
   * @type {ListaPasosWizard[]}
   */
  pasosSolicitar: ListaPasosWizard[] = PASOS_IMPORTACION;

  /**
   * Indica si el formulario actual es válido.
   */
  esFormaValido: boolean = true;


  /**
   * Referencia al componente del primer paso para validar formularios.
   */
  @ViewChild(PasoUnoComponent) pasoUno!: PasoUnoComponent;

  /**
   * @descripcion
   * Índice del paso actual en el asistente.
   * @type {number}
   */
  indice: number = 1;

  /**
   * @descripcion
   * Índice de la pestaña seleccionada actualmente.
   * @type {number}
   */
  tabIndex: number = 1;

  /**
   * @descripcion
   * Referencia al componente del asistente (wizard).
   * @type {WizardComponent}
   */
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;

  /**
   * @descripcion
   * Datos de configuración del asistente, como el número de pasos y los textos de los botones.
   * @type {DatosPasos}
   */
  datosPasos: DatosPasos = {
    nroPasos: this.pasosSolicitar.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };

  /**
   * Contiene el mensaje de error que se muestra cuando la validación de formularios falla.
   */
  public formErrorAlert = `<div class="d-flex justify-content-center text-center">
  <div>
    <div class="col-md-12">
      <strong>¡Error de registro!</strong> Faltan campos por capturar.
    </div>
  </div>
  </div>
`;

  /**
   * @descripcion
   * Cambia el índice del paso actual en el asistente según la acción del botón.
   * Si la acción es "cont" (continuar), avanza al siguiente paso.
   * Si la acción es diferente, retrocede al paso anterior.
   *
   * @param {AccionBoton} e - Objeto que contiene la acción y el valor del índice.
   */
  getValorIndice(e: AccionBoton): void {
    if (this.indice === PASO_UNO) { // PASO_UNO = 1
      // PASO CRÍTICO DE VALIDACIÓN
      const FORM_VALIDO = this.pasoUno?.validarTodosLosFormularios();
      this.esFormaValido = FORM_VALIDO;
      
      if (!FORM_VALIDO) {
        // ESTADO DE ERROR: Actualizar datosPasos y hacer scroll hacia arriba
        this.datosPasos.indice = this.indice;
        setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 0);
        return; // DETIENE EL PROCESAMIENTO POSTERIOR
      }
      
      // Si es válido, proceder al siguiente paso
      if (e.valor > 0 && e.valor < 4) {
        this.indice = e.valor;
        this.actualizarDatosPasos();
        if (e.accion === 'cont') {
          this.wizardComponent.siguiente();
        } else {
          this.wizardComponent.atras();
        }
      }
    } else {
      if (e.valor > 0 && e.valor < 4) {
        this.indice = e.valor;
        this.actualizarDatosPasos();
        if (e.accion === 'cont') {
          this.wizardComponent.siguiente();
        } else {
          this.wizardComponent.atras();
        }
      }
    }
  }

  /**
   * Actualiza los datos del componente de pasos con el índice actual y el número total de pasos.
   */
  actualizarDatosPasos(): void {
    this.datosPasos = {
      nroPasos: this.pasosSolicitar.length,
      indice: this.indice,
      txtBtnAnt: 'Anterior',
      txtBtnSig: 'Continuar',
    };
  }
}