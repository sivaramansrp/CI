import { AccionBoton, BtnContinuarComponent, DatosPasos, ListaPasosWizard, Notificacion, SeccionLibStore, VistaEmergente, WizardComponent, WizardService } from '@ng-mf/data-access-user';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PASOS } from '../../constantes/concluir-relacion.enum';
import { PasoDosComponent } from '../paso-dos/paso-dos.component';
import { PasoUnoComponent } from '../paso-uno/paso-uno.component';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-solicitante-page',
  standalone: true,
  imports: [CommonModule,
    WizardComponent,
    PasoUnoComponent,
    PasoDosComponent,
    BtnContinuarComponent,
  ],
  templateUrl: './solicitante-page.component.html',
  styleUrl: './solicitante-page.component.scss',
})
export class SolicitantePageComponent {

  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;

  indice: number = 1;

  vistaEmergente: VistaEmergente = {
    abierto: true,
    indice: 1
  }

  pasos: ListaPasosWizard[] = PASOS;

  continueTrigger: boolean = false;
  
  datosPasos: DatosPasos = {
    nroPasos: this.pasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };

  public nuevaAlertaNotificacion: Notificacion = {
    tipoNotificacion: 'alert',
    categoria: 'danger',
    modo: 'action',
    titulo: 'Confirmar',
    mensaje: '¿Deseas terminar relación con el proveedor?',
    cerrar: false,
    tiempoDeEspera: 2000,
    txtBtnAceptar: 'Aceptar',
    txtBtnCancelar: 'Cancelar',
  };  

  constructor(private readonly seccionStore: SeccionLibStore,
    private readonly wizardService: WizardService,
  ) {}

  getValorIndice(e: AccionBoton):void {
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
