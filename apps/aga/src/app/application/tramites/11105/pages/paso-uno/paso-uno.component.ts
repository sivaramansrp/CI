
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { DOMICILIO_FISCAL_PERSONA_MORAL_O_FISICA_NACIONAL, PERSONA_MORAL_NACIONAL } from '@libs/shared/data-access-user/src/tramites/constantes/solicitante-constantes.enum';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DatosGeneralesDeLaSolicitudComponent } from '../../components/datos-generales-de-la-solicitud/datos-generales-de-la-solicitud.component';
import { DesistimientoComponent } from '../../components/desistimiento/desistimiento.component';
import { FormularioDinamico } from '@ng-mf/data-access-user';
import { SolicitanteComponent } from '@ng-mf/data-access-user';
import { TIPO_PERSONA } from '@ng-mf/data-access-user';

/**
 * Componente que representa el paso uno del trámite.
 */
@Component({
  standalone: true,
  selector: 'paso-uno',
  templateUrl: './paso-uno.component.html',
  imports:[SolicitanteComponent,CommonModule,DatosGeneralesDeLaSolicitudComponent, FormsModule, ReactiveFormsModule,DesistimientoComponent]
  
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

  /**
   * Método que se ejecuta después de que la vista ha sido inicializada.
   */
  ngAfterViewInit(): void {
    this.persona = PERSONA_MORAL_NACIONAL;
    this.domicilioFiscal = DOMICILIO_FISCAL_PERSONA_MORAL_O_FISICA_NACIONAL;
    this.solicitante.obtenerTipoPersona(TIPO_PERSONA.MORAL_NACIONAL);
  }

  /**
   * Selecciona la pestaña indicada por el índice.
   * @param i Índice de la pestaña a seleccionar.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }
}
