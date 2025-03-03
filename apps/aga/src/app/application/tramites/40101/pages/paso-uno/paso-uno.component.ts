import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { SolicitanteComponent } from '../../../../shared/components/solicitante/solicitante.component';
import {
  DOMICILIO_FISCAL_PERSONA_MORAL_O_FISICA_NACIONAL,
  PERSONA_MORAL_NACIONAL,
} from '../../../../shared/constantes/solicitante-constantes.enum';
import { TIPO_PERSONA } from '../../../../shared/constantes/constantes';
import { FormularioDinamico } from '../../../../core/models/shared/forms-model';
import { DatosComponentePedimento } from '../../../../core/models/5701/servicios-extraordinarios.model';

@Component({
  selector: 'paso-uno',
  templateUrl: './paso-uno.component.html',
  styleUrl: './paso-uno.component.scss',
})
export class PasoUnoComponent implements AfterViewInit {
  @ViewChild(SolicitanteComponent) solicitante: SolicitanteComponent;

  tipoPersona!: number;
  persona: FormularioDinamico[] = [];
  domicilioFiscal: FormularioDinamico[] = [];
  indice: number = 1;
  validacion: boolean = false; // Or assign appropriate value
  // @Input() validacion!: boolean;
  @Input() datosNroPedimento!: any;

  ngAfterViewInit(): void {
    this.persona = PERSONA_MORAL_NACIONAL;
    this.domicilioFiscal = DOMICILIO_FISCAL_PERSONA_MORAL_O_FISICA_NACIONAL;
  }

  seleccionaTab(i: number): void {
    this.indice = i;
  }
}
