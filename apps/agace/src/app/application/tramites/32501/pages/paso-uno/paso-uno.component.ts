import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DatosSolicitudComponent } from '../../components/datos-solicitud/datos-solicitud.component';
import { FormularioDinamico } from '@ng-mf/data-access-user';
import { SolicitanteComponent } from '@ng-mf/data-access-user';
import { ViewChild } from '@angular/core';

/**
 * Componente correspondiente al paso uno del proceso.
 */
@Component({
  selector: 'paso-uno',
  standalone: true,
  imports: [CommonModule, SolicitanteComponent, DatosSolicitudComponent],
  templateUrl: './paso-uno.component.html',
  styleUrl: './paso-uno.component.scss',
})
/**
 * Componente correspondiente al paso uno del proceso.
 */
export class PasoUnoComponent {
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
   * Cambia el índice de la pestaña seleccionada.
   * @param i Índice de la nueva pestaña seleccionada.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }
}
