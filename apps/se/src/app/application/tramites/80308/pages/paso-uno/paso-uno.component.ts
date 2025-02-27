import { AfterViewInit, Component } from '@angular/core';
import { DOMICILIO_FISCAL_PERSONA_MORAL_O_FISICA_NACIONAL, PERSONA_MORAL_NACIONAL } from 'libs/shared/data-access-user/src/tramites/constantes/solicitante-constantes.enum';
import { SolicitanteComponent } from '@ng-mf/data-access-user';
import { AltaPlantaComponent } from "../../components/alta-planta/alta-planta.component";
import { BitacoraComponent } from "../../components/bitacora/bitacora.component";
import { CommonModule } from '@angular/common';
import { DatosModificacionesComponent } from "../../components/datos-modificaciones/datos-modificaciones.component";
import { FormularioDinamico } from 'libs/shared/data-access-user/src/core/models/shared/forms-model';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'paso-uno',
  templateUrl: './paso-uno.component.html',
  styleUrl: './paso-uno.component.scss',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SolicitanteComponent, BitacoraComponent, AltaPlantaComponent, DatosModificacionesComponent],
  host: { 'hostID': crypto.randomUUID().toString()}
})
export class PasoUnoComponent implements AfterViewInit {

  tipoPersona!: number;
  persona: FormularioDinamico[] = [];
  domicilioFiscal: FormularioDinamico[] = [];
  indice: number = 1;

  ngAfterViewInit(): void {

    this.persona = PERSONA_MORAL_NACIONAL;
    this.domicilioFiscal = DOMICILIO_FISCAL_PERSONA_MORAL_O_FISICA_NACIONAL;
  }

  seleccionaTab(i: number): void {
    this.indice = i;
  }

}
