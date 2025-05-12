import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DatosPasos, ListaPasosWizard, SECCIONES_TRAMITE_570101, SeccionLibQuery, SeccionLibState, SeccionLibStore, WizardComponent } from '@ng-mf/data-access-user';
import { Subject, map, takeUntil } from 'rxjs';
import { CANCELACION_PASOS } from '../../enum/cancelacion-servicios-extraordinarios.enum';
import { Modal } from 'bootstrap';
import { PasoUnoComponent } from '../paso-uno/paso-uno.component';

interface AccionBoton {
  accion: string;
  valor: number;
}

@Component({
  templateUrl: './cancelacion-extraordinarios-page.component.html',
  styles: ``,
})

export class CancelacionExtraordinariosPageComponent implements AfterViewInit,OnInit {
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
  public seccion!: SeccionLibState;
  private destroyNotifier$: Subject<void> = new Subject();

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

  constructor(
    private seccionQuery: SeccionLibQuery,
    private seccionStore: SeccionLibStore
  ) {
    // El constructor está intencionalmente vacío para la inyección de dependencias 
   }

  ngOnInit():void {
    this.seccionQuery.selectSeccionState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.seccion = seccionState;
        })
      )
      .subscribe();

    this.asignarSecciones();
  }

   /**
     * Método para asignar las secciones existentes al stored
     */
   private asignarSecciones(): void {
    const SECCIONES: boolean[] = Object.values(SECCIONES_TRAMITE_570101.PASO_1);
    const FORM_VALIDA: boolean[] = [];
    for (const LLAVE_SECCIONE in SECCIONES_TRAMITE_570101.PASO_1) {
      if(LLAVE_SECCIONE) {
        FORM_VALIDA.push(false);
      }
    }
    this.seccionStore.establecerSeccion(SECCIONES);
    this.seccionStore.establecerFormaValida(FORM_VALIDA);
  }

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
    if (this.isCancelarFormValid()) {
      this.cancelarModelInstance.show();
    }
  }

  public isCancelarFormValid():boolean {
    return this.cancelarModelInstance && this.pasoUnoComponent.isFormValid();
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
