import { AfterViewInit } from '@angular/core';
import { Component } from '@angular/core';
import { DOMICILIO_FISCAL_PERSONA_MORAL_O_FISICA_NACIONAL } from '@libs/shared/data-access-user/src/tramites/constantes/solicitante-constantes.enum';
import { FormularioDinamico } from '@ng-mf/data-access-user';
import { PERSONA_MORAL_NACIONAL } from '@libs/shared/data-access-user/src/tramites/constantes/solicitante-constantes.enum';
import { SolicitanteComponent } from '@ng-mf/data-access-user';
import { TIPO_PERSONA } from '@ng-mf/data-access-user';
import { ViewChild } from '@angular/core';

/**
 * Componente correspondiente al paso uno del proceso.
 */
@Component({
  selector: 'paso-uno',
  templateUrl: './paso-uno.component.html',
  styleUrl: './paso-uno.component.scss'
})
/**
 * Componente correspondiente al paso uno del proceso.
 */
export class PasoUnoComponent implements AfterViewInit {
  /** Referencia al componente de solicitante */
  @ViewChild(SolicitanteComponent) solicitante!: SolicitanteComponent;

  /** Tipo de persona seleccionada */
  tipoPersona!: number;

  /** Información del formulario de persona */
  persona: FormularioDinamico[] = [];

  /** Información del formulario de domicilio fiscal */
  domicilioFiscal: FormularioDinamico[] = [];

  /** Índice de la pestaña seleccionada */
  indice: number = 1;

  /**
   * Método que se ejecuta después de que la vista ha sido inicializada.
   */
  ngAfterViewInit(): void {
    // Asigna los datos correspondientes a persona y domicilio fiscal
    this.persona = PERSONA_MORAL_NACIONAL;
    this.domicilioFiscal = DOMICILIO_FISCAL_PERSONA_MORAL_O_FISICA_NACIONAL;

    // Obtiene el tipo de persona seleccionado
    this.solicitante.obtenerTipoPersona(TIPO_PERSONA.MORAL_NACIONAL);
  }

  /**
   * Cambia el índice de la pestaña seleccionada.
   * @param i Índice de la nueva pestaña seleccionada.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }
}
