import { AfterViewInit, ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { DOMICILIO_FISCAL_PERSONA_MORAL_O_FISICA_NACIONAL, PERSONA_MORAL_NACIONAL } from '@libs/shared/data-access-user/src/tramites/constantes/solicitante-constantes.enum';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormularioDinamico, SolicitanteComponent, TIPO_PERSONA } from '@ng-mf/data-access-user';
import { CommonModule } from '@angular/common';
import { ExencionImpuestosComponent } from '../../components/exencion-impuestos.component';

/**
 * Componente que representa el paso uno del trámite.
 * Este componente muestra los datos del solicitante y su domicilio fiscal,
 * permitiendo seleccionar entre diferentes pestañas según el tipo de información.
 */
@Component({
  selector: 'paso-uno',
  templateUrl: './paso-uno.component.html',
  standalone: true,
  imports: [SolicitanteComponent, ExencionImpuestosComponent, CommonModule, FormsModule, ReactiveFormsModule]
})
export class PasoUnoComponent implements AfterViewInit {
  /**
   * Referencia al componente de solicitante para interactuar con sus métodos.
   * @type {SolicitanteComponent}
   */
  @ViewChild(SolicitanteComponent) solicitante!: SolicitanteComponent;

  /**
   * Tipo de persona seleccionada para el trámite.
   * @type {number}
   */
  tipoPersona!: number;

  /**
   * Datos dinámicos del formulario correspondientes a la persona.
   * @type {FormularioDinamico[]}
   */
  persona: FormularioDinamico[] = [];

  /**
   * Datos dinámicos del formulario del domicilio fiscal.
   * @type {FormularioDinamico[]}
   */
  domicilioFiscal: FormularioDinamico[] = [];

  /**
   * Índice actual de la pestaña seleccionada.
   * @type {number}
   */
  indice: number = 1;

  /**
   * Constructor del componente.
   * @param cdr Servicio para detectar y aplicar cambios en la vista manualmente.
   */
  constructor(private cdr: ChangeDetectorRef) {}

  /**
   * Método que se ejecuta después de que la vista ha sido completamente inicializada.
   * Inicializa los formularios y obtiene el tipo de persona.
   */
  ngAfterViewInit(): void {
    this.persona = PERSONA_MORAL_NACIONAL;
    this.domicilioFiscal = DOMICILIO_FISCAL_PERSONA_MORAL_O_FISICA_NACIONAL;
    this.solicitante.obtenerTipoPersona(TIPO_PERSONA.MORAL_NACIONAL);
    this.cdr.detectChanges();
  }

  /**
   * Cambia la pestaña seleccionada mediante su índice.
   * @param i Índice de la pestaña a seleccionar.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }
}
