import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { CANCELACION_PASOS } from '../../enum/cancelacion-servicios-extraordinarios.enum';
import { DatosPasos } from '@ng-mf/data-access-user';
import { ListaPasosWizard } from '@ng-mf/data-access-user';
import { Modal } from 'bootstrap';
import { PasoUnoComponent } from '../paso-uno/paso-uno.component';
import { WizardComponent } from '@ng-mf/data-access-user';

interface AccionBoton {
  accion: string;
  valor: number;
}

@Component({
  templateUrl: './cancelacion-extraordinarios-page.component.html',
  styles: ``,
})

export class CancelacionExtraordinariosPageComponent implements AfterViewInit {
  pasos: ListaPasosWizard[] = CANCELACION_PASOS;
  indice: number = 1;
  mostrarBotonParaModal:boolean = false;
  modal: string = 'modal';
  datosPasos: DatosPasos = {
    nroPasos: this.pasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Guardar y firmar',
  };
  accionBoton!: AccionBoton;

  @ViewChild('modalAddAgent') modalElement!: ElementRef;
  @ViewChild('closeModal') closeModal!: ElementRef;
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;
  @ViewChild(PasoUnoComponent) pasoUnoComponent!: PasoUnoComponent
  @ViewChild('modalConfirmarCancelarSolicitud', { static: false }) cancelarModal!: ElementRef;

  /**
   * @property {Modal} cancelarModalInstance
   *  Instancia del modal de Bootstrap.
   */
  cancelarModelInstance!: Modal;

  // Cambia la pestaña activa al índice proporcionado
  seleccionaTab(i: number): void {
    this.indice = i;
  }

  // Actualiza el índice en base al valor y ejecuta acciones de navegación
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

  // Cambia el estado del modal a "mostrar"
  abrirModal():void{
    if (this.cancelarModelInstance && this.pasoUnoComponent.isFormValid()) {
      this.cancelarModelInstance.show();
    }
  }

  // Cierra el modal haciendo clic en el botón de cierre
  crearerModal():void{
    if (this.cancelarModelInstance) {
      this.cancelarModelInstance.hide();
    }
  }

  // Realiza las acciones necesarias cuando se selecciona "Sí" en el modal
  encendidoSi():void{
    this.indice = 2;
    this.wizardComponent.siguiente();
    this.crearerModal();
    this.mostrarBotonParaModal = false;
  }

  // Cambia la visibilidad del botón del modal dependiendo del paso actual
  pestanaCambiado(event: number):void{
    this.mostrarBotonParaModal = event === 2 ? true : false;
  }

   /**
   * @method ngAfterViewInit
   *  Método del ciclo de vida de Angular. Inicializa el modal de Bootstrap.
   */
   ngAfterViewInit(): void {
    if (this.cancelarModal?.nativeElement) {
      this.cancelarModelInstance = new Modal(this.cancelarModal.nativeElement);
    }
  }
}
