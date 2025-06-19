import { BtnContinuarComponent,ConsultaioQuery,ConsultaioState,DatosPasos,FormularioDinamico,ListaPasosWizard,SolicitanteComponent,ValidacionesFormularioService,WizardComponent } from '@ng-mf/data-access-user';
import { Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Subject, map, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { DatosGeneralesDeLaSolicitudComponent } from '../../components/datos-generales-de-la-solicitud/datos-generales-de-la-solicitud.component';
import { DesistimientoComponent } from '../../components/desistimiento/desistimiento.component';
import { PASOS } from '@libs/shared/data-access-user/src/tramites/constantes/11105/pasos.enum';
import { RetiradaDeLaAutorizacionDeDonacionesService } from '../../services/retirad-de-la-autorizacion-de-donaciones.service';

interface AccionBoton {
  /**
   * Acción a realizar (e.g., 'cont' para continuar, 'ant' para retroceder).
   */
  accion: string;

  /**
   * Índice del paso al que se desea navegar.
   */
  valor: number;
}

/**
 * Componente que representa el paso uno del trámite.
 */
@Component({
  standalone: true,
  selector: 'paso-uno',
  templateUrl: './paso-uno.component.html',
  imports: [
    SolicitanteComponent,
    CommonModule,
    DatosGeneralesDeLaSolicitudComponent,
    FormsModule,
    ReactiveFormsModule,
    DesistimientoComponent,
    BtnContinuarComponent,
  ],
})
export class PasoUnoComponent implements OnInit, OnDestroy {

    /**
   * @property {ConsultaioState} consultaDatos
   * @description Estado actual de la consulta, que contiene información relacionada con el trámite y el solicitante.
   */
  consultaDatos!: ConsultaioState;

  /**
   * Indica si el formulario está en modo solo lectura.
   * Cuando es `true`, los campos del formulario no se pueden editar.
   */
  esDatosRespuesta: boolean = false;

  
  /**
   * Evento que se emite al continuar con el flujo del trámite.
   */
  @Output() continuarEvento = new EventEmitter<string>();

  /**
   * Referencia al componente de solicitante.
   */
  @ViewChild(SolicitanteComponent) solicitante!: SolicitanteComponent;

  /**
   * Tipo de persona (e.g., física o moral).
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
   * Índice de la pestaña seleccionada en el wizard.
   */
  indice: number = 1;

  /**
   * Lista de pasos del wizard.
   */
  pasos: ListaPasosWizard[] = PASOS;

  /**
   * Referencia al componente del wizard.
   */
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;

  /**
   * Datos de configuración para los pasos del wizard.
   */
  datosPasos: DatosPasos = {
    nroPasos: this.pasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };

  /**
   * Sujeto utilizado como notificador para la destrucción del componente.
   * Se emite un valor cuando el componente se destruye, permitiendo cancelar
   * suscripciones o liberar recursos asociados.
   */
  private destroyNotifier$: Subject<void> = new Subject();


  /**
   * Constructor del componente.
   *
   * @param {Tramite110217Store} store - Store para gestionar el estado del trámite.
   * @param {Tramite110217Query} tramiteQuery - Query para obtener el estado del trámite.
   */
  constructor(
    private retiradaDeLaAutorizacionDeDonacionesService: RetiradaDeLaAutorizacionDeDonacionesService,
    public formBuilder: FormBuilder,
    private validacionesService: ValidacionesFormularioService,
    private consultaioQuery: ConsultaioQuery
  ) {}


  /**
   * Método que se ejecuta al inicializar el componente.
   *
   * Este método suscribe al estado del trámite y establece la pestaña activa
   * según el estado almacenado.
   */
  ngOnInit(): void {
   

    this.consultaioQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.consultaDatos = seccionState;
        })
      )
      .subscribe();
   
    if (this.consultaDatos.update) {
      // this.fetchGetDatosConsulta();
    } else {
      this.esDatosRespuesta = true;
    }
    // this.indice = this.tramiteState.pestanaActiva;
  }

  /**
   * Selecciona la pestaña indicada por el índice.
   * @param i Índice de la pestaña a seleccionar.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }

  /**
   * Emite el evento para continuar con el flujo del trámite.
   */
  continuar(): void {
    this.continuarEvento.emit('');
  }

  /**
   * Cambia el índice del wizard según la acción recibida.
   * @param e Objeto que contiene la acción ('cont' o 'ant') y el índice del paso.
   */
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

    /**
   * Método que se ejecuta al destruir el componente.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}