import { Component, ViewChild } from '@angular/core';
import { BtnContinuarComponent, DatosPasos, WizardComponent } from "@ng-mf/data-access-user";
import { ListaPasosWizard } from '../../models/permiso-de-retiro.model';
import { PASOS } from '../../constants/permiso-importacion-modification.enum';
import { PasoCuatroComponent } from "../paso-cuatro/paso-cuatro.component";
import { PasoDosComponent } from "../paso-dos/paso-dos.component";
import { PasoTresComponent } from "../paso-tres/paso-tres.component";
import { PasoUnoComponent } from "../paso-uno/paso-uno.component";

interface AccionBoton {
  accion: string;
  valor: number;
}
@Component({
  selector: 'app-permiso-de-retiro',
  templateUrl: './permiso-de-retiro.component.html',
  styleUrl: './permiso-de-retiro.component.scss',
  imports: [WizardComponent, BtnContinuarComponent, PasoUnoComponent, PasoDosComponent, PasoTresComponent, PasoCuatroComponent],
  standalone: true,
})
export class PermisoDeRetiroComponent {

  indice = 1;
  pasos: ListaPasosWizard[] = PASOS;
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;
  datosPasos: DatosPasos = {
    nroPasos: this.pasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };

  getValorIndice(e: AccionBoton): void {
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