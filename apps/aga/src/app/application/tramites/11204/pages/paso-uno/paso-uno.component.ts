import { AfterViewInit, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ContenedorComponent } from '../../components/contenedor/contenedor.component';
import { DOMICILIO_FISCAL_PERSONA_MORAL_O_FISICA_NACIONAL } from '@libs/shared/data-access-user/src/tramites/constantes/solicitante-constantes.enum';
import { BtnContinuarComponent, DatosPasos, FormularioDinamico, ListaPasosWizard, PASOS, SolicitanteComponent, WizardComponent } from '@ng-mf/data-access-user';
import { Input } from '@angular/core';
import { PERSONA_MORAL_NACIONAL } from '@libs/shared/data-access-user/src/tramites/constantes/solicitante-constantes.enum';
// import { SolicitanteComponent } from '../../components/solicitante/solicitante.component';
import { ViewChild } from '@angular/core';

interface AccionBoton {
  accion: string;
  valor: number;
}

@Component({
  selector: 'paso-uno',
  templateUrl: './paso-uno.component.html',
  styleUrl: './paso-uno.component.scss',
  standalone: true,
  imports: [SolicitanteComponent, CommonModule, ContenedorComponent, BtnContinuarComponent]
})
export class PasoUnoComponent implements AfterViewInit {
  @ViewChild(SolicitanteComponent) solicitante!: SolicitanteComponent;
  tipoPersona!: number;
  persona: FormularioDinamico[] = [];
  domicilioFiscal: FormularioDinamico[] = [];
  indice: number = 1;
  @Output() continuarEvento = new EventEmitter<string>();
  validacion: boolean = false;
  pasos: ListaPasosWizard[] = PASOS;
  @Input() datosNroPedimento!: unknown;
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;
  datosPasos: DatosPasos = {
      nroPasos: this.pasos.length,
      indice: this.indice,
      txtBtnAnt: 'Anterior',
      txtBtnSig: 'Continuar',
    };
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
  continuar(): void {
    this.continuarEvento.emit('');
  }

  getValorIndice(e: AccionBoton) {
    if (e.valor > 0 && e.valor < 5) {
      this.indice = e.valor;
      if (e.accion === 'cont') {
        this.wizardComponent.siguiente();
      } else {
        this.wizardComponent.atras();
      }
    }
  }
}
