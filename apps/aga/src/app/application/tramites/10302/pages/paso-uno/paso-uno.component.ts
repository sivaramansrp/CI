import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DOMICILIO_FISCAL_PERSONA_MORAL_O_FISICA_NACIONAL, PERSONA_MORAL_NACIONAL } from '@libs/shared/data-access-user/src/tramites/constantes/solicitante-constantes.enum';
import { DatosTramiteComponent } from '../../components/datosTramite.component';
import { FormularioDinamico, SolicitanteComponent, TIPO_PERSONA } from '@ng-mf/data-access-user';

/**
 * Componente que representa el paso uno del trámite.
 */
@Component({
  selector: 'paso-uno',
  templateUrl: './paso-uno.component.html',
  standalone: true,
  imports: [SolicitanteComponent, DatosTramiteComponent, CommonModule, FormsModule, ReactiveFormsModule],
})
export class PasoUnoComponent implements AfterViewInit {
  /**
   * Referencia al componente de solicitante.
   */
  @ViewChild(SolicitanteComponent) solicitante!: SolicitanteComponent;

  /**
   * Tipo de persona.
   */
  tipoPersona!: number;

  /**
   * Datos del formulario dinámico de la persona.
   */
  persona: FormularioDinamico[] = [];

  /**
   * Datos del formulario dinámico del domicilio fiscal.
   */
  domicilioFiscal: FormularioDinamico[] = [];

  /**
   * Índice de la pestaña seleccionada.
   */
  indice: number = 1;

  constructor(private cdr: ChangeDetectorRef) {}

  /**
   * Método que se ejecuta después de que la vista ha sido inicializada.
   */
  ngAfterViewInit(): void {
    this.persona = PERSONA_MORAL_NACIONAL;
    this.domicilioFiscal = DOMICILIO_FISCAL_PERSONA_MORAL_O_FISICA_NACIONAL;
    this.solicitante.obtenerTipoPersona(TIPO_PERSONA.MORAL_NACIONAL);
    this.cdr.detectChanges();
  }

  /**
   * Selecciona la pestaña indicada por el índice.
   * @param i Índice de la pestaña a seleccionar.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }
}
