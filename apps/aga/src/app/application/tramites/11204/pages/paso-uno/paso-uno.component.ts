import { AfterViewInit, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BtnContinuarComponent, DatosPasos, FormularioDinamico, ListaPasosWizard, PASOS, SolicitanteComponent, WizardComponent } from '@ng-mf/data-access-user';
import { ContenedorComponent } from '../../components/contenedor/contenedor.component';
import { DOMICILIO_FISCAL_PERSONA_MORAL_O_FISICA_NACIONAL, PERSONA_MORAL_NACIONAL } from '@libs/shared/data-access-user/src/tramites/constantes/solicitante-constantes.enum';

/**
 * Interfaz que representa una AccionBoton.
 * Utilizamos esta interfaz para definir la estructura de los datos de una AccionBoton.
 */
interface AccionBoton {
  accion: string;
  valor: number;
}

@Component({
  selector: 'paso-uno',
  templateUrl: './paso-uno.component.html',
  styleUrls: ['./paso-uno.component.scss'],
  standalone: true,
  imports: [SolicitanteComponent, CommonModule, ContenedorComponent, BtnContinuarComponent]
})
export class PasoUnoComponent implements AfterViewInit {
  /**
   * Referencia al componente Solicitante.
   */
  @ViewChild(SolicitanteComponent) solicitante!: SolicitanteComponent;

  /**
   * Tipo de persona.
   */
  tipoPersona!: number;

  /**
   * Arreglo que contiene los datos del formulario dinámico de la persona.
   */
  persona: FormularioDinamico[] = [];

  /**
   * Arreglo que contiene los datos del formulario dinámico del domicilio fiscal.
   */
  domicilioFiscal: FormularioDinamico[] = [];

  /**
   * Índice de la pestaña actual.
   */
  indice: number = 1;

  /**
   * Evento de salida que emite cuando se hace clic en el botón continuar.
   */
  @Output() continuarEvento = new EventEmitter<string>();

  /**
   * Bandera de validación.
   */
  validacion: boolean = false;

  /**
   * Arreglo que contiene los pasos del wizard.
   */
  pasos: ListaPasosWizard[] = PASOS;

  /**
   * Datos del número de pedimento.
   */
  @Input() datosNroPedimento!: unknown;

  /**
   * Referencia al componente Wizard.
   */
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;

  /**
   * Datos de los pasos del wizard.
   */
  datosPasos: DatosPasos = {
    nroPasos: this.pasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };

  /**
   * Gancho de ciclo de vida angular que se llama después de que la vista del componente se haya inicializado por completo.
   */
  ngAfterViewInit(): void {
    this.persona = PERSONA_MORAL_NACIONAL;
    this.domicilioFiscal = DOMICILIO_FISCAL_PERSONA_MORAL_O_FISICA_NACIONAL;
  }

  /**
   * Selecciona una pestaña.
   * @param i El índice de la pestaña a seleccionar.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }

  /**
   * Emite el evento continuar.
   */
  continuar(): void {
    this.continuarEvento.emit('');
  }

  /**
   * Obtiene el valor del índice y navega en el wizard.
   * @param e El evento de acción del botón.
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
