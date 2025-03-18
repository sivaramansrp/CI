/* eslint-disable @nx/enforce-module-boundaries */
import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import {
  DOMICILIO_FISCAL_PERSONA_MORAL_O_FISICA_NACIONAL,
  PERSONA_MORAL_NACIONAL,
} from 'libs/shared/data-access-user/src/tramites/constantes/solicitante-constantes.enum';
import {
  FormularioDinamico,
  SolicitanteComponent,
} from '@ng-mf/data-access-user';

@Component({
  selector: 'paso-uno',
  templateUrl: './paso-uno.component.html',
  styleUrl: './paso-uno.component.scss',
})
export class PasoUnoComponent implements AfterViewInit {
  @ViewChild(SolicitanteComponent) solicitante!: SolicitanteComponent;
  tipoPersona!: number;
  persona: FormularioDinamico[] = [];
  domicilioFiscal: FormularioDinamico[] = [];
  indice: number = 1;
  validacion: boolean = false;
  @Input() datosNroPedimento!: string;
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
}
