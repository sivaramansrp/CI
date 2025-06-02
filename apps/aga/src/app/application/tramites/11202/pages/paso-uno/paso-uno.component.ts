import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { DOMICILIO_FISCAL_PERSONA_MORAL_O_FISICA_NACIONAL, FormularioDinamico, PERSONA_MORAL_NACIONAL, SolicitanteComponent } from '@ng-mf/data-access-user';

/**
 * Componente que representa el paso uno de un formulario.
 * Contiene información relacionada con el solicitante y su domicilio fiscal.
 */
@Component({
  selector: 'paso-uno',
  templateUrl: './paso-uno.component.html',
  styleUrl: './paso-uno.component.scss'
})
export class PasoUnoComponent implements AfterViewInit {

  /**
   * Referencia al componente hijo de tipo SolicitanteComponent.
   */
  @ViewChild(SolicitanteComponent)
  solicitante!: SolicitanteComponent;

  /**
   * Tipo de persona (física o moral).
   */
  tipoPersona!: number;

  /**
   * Información de la persona solicitante.
   */
  persona: FormularioDinamico[] = [];

  /**
   * Información del domicilio fiscal de la persona.
   */
  domicilioFiscal: FormularioDinamico[] = [];

  /**
   * Índice de la pestaña seleccionada.
   */
  indice: number = 1;

  /**
   * Bandera que indica si se ha realizado una validación.
   */
  validacion: boolean = false;

  /**
   * Datos recibidos como entrada relacionados al número de pedimento.
   */
  @Input()
  datosNroPedimento!: unknown;

  /**
   * Gancho del ciclo de vida de Angular que se ejecuta
   * después de que la vista del componente ha sido completamente inicializada.
   * Inicializa los datos de persona y domicilio fiscal.
   */
  ngAfterViewInit(): void {
    this.persona = PERSONA_MORAL_NACIONAL;
    this.domicilioFiscal = DOMICILIO_FISCAL_PERSONA_MORAL_O_FISICA_NACIONAL;
  }

  /**
   * Cambia la pestaña activa del formulario.
   * @param i Índice de la pestaña a seleccionar.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }
}
