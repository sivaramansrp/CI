import { AfterViewInit, EventEmitter, OnInit, Output } from '@angular/core';
import {
  BtnContinuarComponent,
  ConsultaioQuery,
  ConsultaioState,
  DatosPasos,
  FormularioDinamico,
  ListaPasosWizard,
  PASOS,
  SolicitanteComponent,
  WizardComponent,
} from '@ng-mf/data-access-user';
import { AltaPlantaComponent } from '../../components/alta-planta/alta-planta.component';
import { BitacoraComponent } from '../../components/bitacora/bitacora.component';
import { CommonModule } from '@angular/common';
import { ComplementariaImmexComponent } from '../../components/complementaria-immex/complementaria-immex.component';
import { Component } from '@angular/core';
import { DOMICILIO_FISCAL_PERSONA_MORAL_O_FISICA_NACIONAL } from '@libs/shared/data-access-user/src/tramites/constantes/solicitante-constantes.enum';
import { Input } from '@angular/core';
import { ModificacionComponent } from '../../components/modificacion/modificacion.component';
import { PERSONA_MORAL_NACIONAL } from '@libs/shared/data-access-user/src/tramites/constantes/solicitante-constantes.enum';
import { ViewChild } from '@angular/core';
import { map, Subject, takeUntil } from 'rxjs';
import { Tramite80306Store } from '../../estados/tramite80306.store';
import { ImmerModificacionService } from '../../service/immer-modificacion.service';

/**
 * Interfaz que define la estructura de una acción de botón.
 */
interface AccionBoton {
  /**
   * La acción que se realizará.
   */
  accion: string;

  /**
   * El valor asociado a la acción.
   */
  valor: number;
}

@Component({
  selector: 'app-paso-uno',
  templateUrl: './paso-uno.component.html',
  styleUrl: './paso-uno.component.scss',
  standalone: true,
  imports: [
    SolicitanteComponent,
    CommonModule,
    ModificacionComponent,
    AltaPlantaComponent,
    BitacoraComponent,
    ComplementariaImmexComponent,
    BtnContinuarComponent,
  ],
})
export class PasoUnoComponent implements OnInit, AfterViewInit {
  /**
   * Lista de pasos del asistente.
   */
  pasos: ListaPasosWizard[] = PASOS;

  /**
   * Índice del paso actual.
   */
  indice: number = 1;

  /**
   * Datos de los pasos del asistente.
   */
  datosPasos: DatosPasos = {
    nroPasos: this.pasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };

  /**
   * @property {ConsultaioState} consultaDatos
   * @description Estado actual de la consulta, que contiene información relacionada con el trámite y el solicitante.
   */
  consultaDatos!: ConsultaioState;

  /**
   * Referencia al componente del asistente.
   */
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;

  /**
   * Referencia al componente `SolicitanteComponent`.
   *
   * Esta propiedad utiliza `@ViewChild` para obtener una referencia al componente `SolicitanteComponent`.
   */
  @ViewChild(SolicitanteComponent) solicitante!: SolicitanteComponent;

  /**
   * Tipo de persona.
   *
   * Esta propiedad almacena el tipo de persona como un número.
   */
  tipoPersona!: number;

  /**
   * Lista de formularios dinámicos para la persona.
   *
   * Esta propiedad contiene un array de objetos `FormularioDinamico` que representan los formularios dinámicos de la persona.
   */
  persona: FormularioDinamico[] = [];

  /**
   * Lista de formularios dinámicos para el domicilio fiscal.
   *
   * Esta propiedad contiene un array de objetos `FormularioDinamico` que representan los formularios dinámicos del domicilio fiscal.
   */
  domicilioFiscal: FormularioDinamico[] = [];

  /**
   * Evento de continuar.
   *
   * Esta propiedad utiliza `@Output` para emitir un evento `continuarEvento` con una cadena como valor.
   */
  @Output() continuarEvento = new EventEmitter<string>();

  /**
   * Indicador de validación.
   *
   * Esta propiedad indica si la validación es verdadera o falsa.
   */
  validacion: boolean = false;

  /**
   * Sujeto para notificar la destrucción del componente.
   */
  public destroyNotifier$: Subject<void> = new Subject();

  constructor(
    private immerModificacionService: ImmerModificacionService,
    private consultaioQuery: ConsultaioQuery,
    public tramite11204Store: Tramite80306Store
  ) {}

  ngOnInit(): void {
    this.consultaioQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.consultaDatos = seccionState;
        })
      )
      .subscribe();
  }

  /**
   * Datos del número de pedimento.
   *
   * Esta propiedad utiliza `@Input` para recibir datos del número de pedimento de tipo desconocido.
   */
  @Input() datosNroPedimento!: unknown;
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

  /**
   * Método para emitir un evento de continuar.
   *
   * Este método emite un evento `continuarEvento` con una cadena vacía como valor.
   * Se utiliza para indicar que se debe continuar al siguiente paso en el proceso.
   *
   * @example
   * // Llamar al método para emitir el evento de continuar
   * this.continuar();
   */
  continuar(): void {
    this.continuarEvento.emit('');
  }

  /**
   * Obtiene el valor del índice de la acción del botón.
   * @param e Acción del botón.
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
}
