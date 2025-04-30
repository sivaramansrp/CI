import { AccionBoton, BtnContinuarComponent, DatosPasos, ListaPasosWizard, Notificacion, NotificacionesComponent, PopUpView, SeccionLibStore, WizardComponent, WizardService } from '@ng-mf/data-access-user';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PasoDosComponent } from '../paso-dos/paso-dos.component';
import { PasoUnoComponent } from '../paso-uno/paso-uno.component';
import { ViewChild } from '@angular/core';

import { PASOS } from '../../constantes/concluir-relacion.enum';
import { SECCIONES_TRAMITE_420102 } from '../../models/tramite420102.enum';

@Component({
  selector: 'app-solicitante-page',
  standalone: true,
  imports: [CommonModule,
    WizardComponent,
    PasoUnoComponent,
    PasoDosComponent,
    BtnContinuarComponent,
    NotificacionesComponent
  ],
  templateUrl: './solicitante-page.component.html',
  styleUrl: './solicitante-page.component.scss',
})
export class SolicitantePageComponent {

  /**
   * Referencia al componente del asistente (wizard).
   * @type {WizardComponent}
   */
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;

  /**
   * Índice del paso actual en el asistente.
   * @type {number}
   */
  indice: number = 1;
  dummy!: AccionBoton ;


popUpView:PopUpView={
open:true,
index:1
  }
  /**
   * Lista de pasos del asistente.
   * @type {ListaPasosWizard[]}
   */
  pasos: ListaPasosWizard[] = PASOS;

  modalEmergente: boolean = false;

  continueTrigger: boolean = false;
  
  /**
   * Datos de los pasos del asistente.
   * @type {DatosPasos}
   */
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
  ) {
    this.asignarSecciones();
  }

  /**
   * Obtiene el valor del índice de la acción del botón.
   * 
   * Este método actualiza el índice del asistente y navega al siguiente o anterior paso
   * dependiendo de la acción del botón.
   * @param {AccionBoton} e - Acción del botón.
   * @returns {void}
   */
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


  private asignarSecciones(): void {
    const SECCIONES: boolean[] = [];
    const FORMA_VALIDA: boolean[] = [];
    const PREDETERMINADO = SECCIONES_TRAMITE_420102
    for (const LLAVE_SECCION in PREDETERMINADO.PASO_1) {
      if (Object.prototype.hasOwnProperty.call(PREDETERMINADO.PASO_1, LLAVE_SECCION)) {
        // @ts-expect-error - fix this
        SECCIONES.push(PREDETERMINADO.PASO_1[LLAVE_SECCION]);
        FORMA_VALIDA.push(false);
      }
    }
    this.seccionStore.establecerSeccion(SECCIONES);
    this.seccionStore.establecerFormaValida(FORMA_VALIDA);
    this.seccionStore.limpiarSeccion();
    
  }

  // getValorIndice22(e: AccionBoton): void {
  //   if (e.valor > 0 && e.valor < 5) {
  //     this.indice = e.valor;
  //     if (e.accion === 'cont') {
  //       if(e.valor === 2){
  //         this.modalEmergente = true;
  //         this.abrirAlertaSeleccionModal();
  //       }
  //       else{
  //         this.wizardComponent.siguiente();
  //       }
       
  //     } else {
  //       this.wizardComponent.atras();
  //     }
  //   }
  // }

  abrirAlertaSeleccionModal(): void {
    this.nuevaAlertaNotificacion = {
      tipoNotificacion: 'alert',
      categoria: 'danger',
      modo: 'action',
      titulo: 'Confirmar',
      mensaje: '¿Deseas terminar relación con el proveedor?',
      cerrar: false,
      tiempoDeEspera: 2000,
      txtBtnAceptar: 'Aceptar',
      txtBtnCancelar: 'Cancelar',
    }
  }

  openmodal(e:AccionBoton): void {
      this.dummy = e;
      this.modalEmergente = true;
      this.abrirAlertaSeleccionModal();
  }

  eliminarPedimento(borrar: boolean): void {
    if(borrar){
      this.modalEmergente = false;
      this.continueTrigger = true;

      const E = this.dummy;

      if (E.valor > 0 && E.valor < 5) {
        this.indice = E.valor;
        if (E.accion === 'cont') {

        this.continueTrigger = false;
          this.wizardComponent.siguiente();
        } else {

          this.continueTrigger = false;
          this.wizardComponent.atras();
        }
      }

    } else {
      this.modalEmergente = false;
      this.continueTrigger = false;
      this.wizardComponent.atras();

    }
  }
}
