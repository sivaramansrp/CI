import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DatosPasos, Notificacion, PASOS, Pedimento, SeccionLibQuery, SeccionLibState, SeccionLibStore } from '@ng-mf/data-access-user';
import { ReplaySubject, map, takeUntil } from 'rxjs';
import { ListaPasosWizard } from '@ng-mf/data-access-user';
import { WizardComponent } from '@ng-mf/data-access-user';

/**
 * Interfaz que representa una acción de botón en el wizard.
 */
interface AccionBoton {
  /** Acción a realizar (e.g., 'cont' para continuar, 'atras' para retroceder). */
  accion: string;

  /** Valor asociado al índice del paso. */
  valor: number;
}

/**
 * Componente que representa la página de registro del trámite.
 * Gestiona la navegación entre los pasos del wizard y el estado de la sección.
 */
@Component({
  selector: 'app-registro-empresa',
  templateUrl: './registro-empresa.component.html',
  styleUrl: './registro-empresa.component.scss',
 
})
export class RegistroEmpresaComponent implements OnDestroy, OnInit {
  /** Lista de pasos del wizard. */
  pasos: Array<ListaPasosWizard> = PASOS;

  /** Índice del paso actual en el wizard. */
  indice: number = 1;

  /** Sujeto para manejar la destrucción de observables. */
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  /** Estado actual de la sección. */
  public seccion!: SeccionLibState;

  /** Referencia al componente del wizard. */
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;

  /** Datos de configuración para los pasos del wizard. */
  datosPasos: DatosPasos = {
    nroPasos: this.pasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };
  showAlert: boolean = false; // Control visibility of alert-danger
  mostrarModal: boolean | undefined;


  /**
   * Constructor del componente.
   * @param seccionQuery Servicio para consultar el estado de la sección.
   * @param seccionStore Servicio para gestionar el estado de la sección.
   */
  constructor(
    private seccionQuery: SeccionLibQuery,
    private seccionStore: SeccionLibStore
  ) {}

  /**
   * Método para seleccionar un paso específico en el wizard.
   * Actualiza el índice del paso seleccionado.
   * @param i Índice del paso a seleccionar.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }


  public nuevaNotificacion!: Notificacion;
  elementoParaEliminar!: number;
  pedimentos: Array<Pedimento> = [];

  
  /**
   * Método que se ejecuta al inicializar el componente.
   * Suscribe al estado de la sección y actualiza la propiedad `seccion`.
   */
  ngOnInit(): void {
    this.seccionQuery.selectSeccionState$
      .pipe(
        takeUntil(this.destroyed$),
        map((seccionState: SeccionLibState) => {
          this.seccion = seccionState;
        })
      )
      .subscribe();
  }
  eliminarPedimento(event: any): void {
    console.log('Event received:', event); // Debugging
    const borrar = typeof event === 'boolean' ? event : false; // Ensure it's a boolean
    if (borrar) {
      this.pedimentos.splice(this.elementoParaEliminar, 1);
    }
    
  }

  abrirModal(i: number = 0): void {
    console.log('abrirModal executed');

    this.nuevaNotificacion = {
      tipoNotificacion: 'alert',
      categoria: 'danger',
      modo: 'action',
      titulo: '',
      mensaje: 'La entidad federativa seleccionada no cuenta con sucursales asociadas a su RFC para tramitar el Registro como Empresa de la Frontera',
      cerrar: false,
      tiempoDeEspera: 2000,
      txtBtnAceptar: 'Aceptar',
      txtBtnCancelar: '',
    }
    this.mostrarModal = true; // Ensure the modal is shown

    this.elementoParaEliminar = i;
  }



  /**
   * Método para manejar el cambio de paso en el wizard.
   * Actualiza el índice del paso y navega al siguiente o anterior paso según la acción.
   * @param e Objeto que contiene la acción y el valor del paso.
   */
  getValorIndice(e: AccionBoton): void {
    if (e.valor > 0 && e.valor < 5) {
      if (e.accion === 'cont' && this.indice === 1 && e.valor === 2) {
        console.log('Navigation to step 2 is restricted.');
        this.showAlert = true; // Show the alert
        return; // Stop further execution
      }
  
      this.indice = e.valor;
  
      if (e.accion === 'cont') {
        this.wizardComponent.siguiente();
        this.showAlert = true; // Show the alert only on "Continuar"
        console.log('ShowAlert set to:', this.showAlert); // Debugging
      } else if (e.accion === 'atras') {
        this.wizardComponent.atras();
        this.showAlert = false; // Hide the alert on "Atras"
      }
    }
  }

  onAlertClick(){
    console.log("hi")
    this.nuevaNotificacion = {
      tipoNotificacion: 'alert',
      categoria: 'danger',
      modo: 'action',
      titulo: '',
      mensaje: 'La entidad federativa seleccionada no cuenta con sucursales asociadas a su RFC para tramitar el Registro como Empresa de la Frontera',
      cerrar: false,
      tiempoDeEspera: 2000,
      txtBtnAceptar: 'Aceptar',
      txtBtnCancelar: '',
    }
    this.mostrarModal = true; // Ensure the modal is shown

    console.log(this.nuevaNotificacion); // Debugging

  }

  /**
   * Método que se ejecuta al destruir el componente.
   * Completa el sujeto `destroyed$` para liberar recursos.
   */
  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}
