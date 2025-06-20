import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { DOMICILIO_FISCAL_PERSONA_MORAL_O_FISICA_NACIONAL, FormularioDinamico, PERSONA_MORAL_NACIONAL, SolicitanteComponent, TIPO_PERSONA } from '@ng-mf/data-access-user';

/**
 * @descripcion
 * El componente `PasoUnoComponent` es responsable de gestionar la lógica y la interfaz
 * de usuario para el primer paso del trámite 110210.
 *
 * @selector app-paso-uno
 * @templateUrl ./paso-uno.component.html
 * @styleUrl ./paso-uno.component.scss
 */
@Component({
  selector: 'app-paso-uno',
  templateUrl: './paso-uno.component.html',
  styleUrl: './paso-uno.component.scss'
})
export class PasoUnoComponent implements AfterViewInit {
  /**
   * Referencia al componente `SolicitanteComponent` dentro de la vista.
   * @type {SolicitanteComponent}
   */
  @ViewChild(SolicitanteComponent) solicitante!: SolicitanteComponent;

  /**
   * Tipo de persona seleccionada.
   * @type {number}
   */
  tipoPersona!: number;

  /**
   * Configuración dinámica para los datos de la persona.
   * @type {FormularioDinamico[]}
   */
  persona: FormularioDinamico[] = [];

  /**
   * Configuración dinámica para el domicilio fiscal.
   * @type {FormularioDinamico[]}
   */
  domicilioFiscal: FormularioDinamico[] = [];

  /**
   * Índice de la pestaña seleccionada.
   * @type {number}
   */
  indice: number = 1;

  /**
   * @descripcion
   * Hook del ciclo de vida que se llama después de que la vista del componente ha sido inicializada.
   * Configura los datos iniciales para la persona y el domicilio fiscal.
   */
  ngAfterViewInit(): void {
    this.persona = PERSONA_MORAL_NACIONAL;
    this.domicilioFiscal = DOMICILIO_FISCAL_PERSONA_MORAL_O_FISICA_NACIONAL;
     if (this.solicitante?.obtenerTipoPersona) {
    this.solicitante.obtenerTipoPersona(TIPO_PERSONA.MORAL_NACIONAL);
  }
  }

  /**
   * @descripcion
   * Cambia el índice de la pestaña seleccionada.
   * @param {number} i - Índice de la pestaña a seleccionar.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }
}