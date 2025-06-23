import { AfterViewInit } from '@angular/core';
import { AlertComponent } from '@ng-mf/data-access-user';
import { BtnContinuarComponent } from '@ng-mf/data-access-user';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DOMICILIO_FISCAL_PERSONA_MORAL_O_FISICA_NACIONAL } from '@libs/shared/data-access-user/src/tramites/constantes/solicitante-constantes.enum';
import { FormularioDinamico } from '@ng-mf/data-access-user';
import { PERSONA_MORAL_NACIONAL } from '@libs/shared/data-access-user/src/tramites/constantes/solicitante-constantes.enum';
import { SolicitanteComponent } from '@ng-mf/data-access-user';
import { SolicitudComponent } from '../../components/solicitud/solicitud.component';
import { TituloComponent } from '@ng-mf/data-access-user';
import { ViewChild } from '@angular/core';

/**
 * Componente que representa la funcionalidad de la paso uno 32201.
 */
@Component({
  selector: 'paso-uno',
  templateUrl: './paso-uno.component.html',
  styleUrls: ['./paso-uno.component.scss'],
  standalone: true,
  imports: [
    SolicitanteComponent,
    CommonModule,
    BtnContinuarComponent,
    TituloComponent,
    AlertComponent,
    SolicitudComponent,
  ],
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
