import { AfterViewInit, Component, EventEmitter, OnDestroy, Output, ViewChild } from '@angular/core';
import { DOMICILIO_FISCAL_PERSONA_MORAL_O_FISICA_NACIONAL, PERSONA_MORAL_NACIONAL, } from '@libs/shared/data-access-user/src/tramites/constantes/solicitante-constantes.enum';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DatosPasos, FormularioDinamico, ListaPasosWizard, PASOS, TIPO_PERSONA } from '@ng-mf/data-access-user';
import { ReplaySubject } from 'rxjs';
import { SolicitanteComponent, } from '@libs/shared/data-access-user/src';
import { Solicitud570102State } from '../../state/Tramite570102.store';


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
/**
 * Componente que representa el primer paso del trámite.
 * Este componente gestiona la lógica y la interfaz de usuario para capturar los datos iniciales del trámite.
 */
@Component({
  selector: 'app-paso-uno',
  templateUrl: './paso-uno.component.html',
  styles: ``,
})
export class PasoUnoComponent implements AfterViewInit, OnDestroy {
  /**
   * Evento que emite el índice del paso actual.
   */
  @Output() indiceNombre: EventEmitter<number> = new EventEmitter<number>();

  /**
   * Referencia al componente de solicitante.
   * Se utiliza para interactuar con el componente hijo y obtener datos del solicitante.
   */
  @ViewChild(SolicitanteComponent) solicitante!: SolicitanteComponent;

  /**
   * Tipo de persona seleccionada.
   * Representa el tipo de persona (moral o física) que realiza el trámite.
   */
  tipoPersona!: number;

  pasos: ListaPasosWizard[] = PASOS;

  /**
   * Observable para manejar la destrucción del componente.
   * Se utiliza para cancelar suscripciones activas y evitar fugas de memoria.
   */
  public destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  @Output() eventoDatosHijo: EventEmitter<number> = new EventEmitter<number>();

  indice: number = 1;


  datosPasos: DatosPasos = {
    nroPasos: this.pasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Guardar y firmar',
  };

  /**
   * Configuración del formulario dinámico para la persona.
   * Contiene los campos relacionados con los datos personales del solicitante.
   */
  persona: FormularioDinamico[] = [];

  /**
   * Configuración del formulario dinámico para el domicilio fiscal.
   * Contiene los campos relacionados con el domicilio fiscal del solicitante.
   */
  domicilioFiscal: FormularioDinamico[] = [];

  /**
   * Índice del paso actual.
   * Representa el número del paso en el asistente de pasos.
   */

  /**
   * Formulario reactivo que contiene los campos del paso uno del trámite.
   * Este formulario se utiliza para capturar y validar los datos ingresados por el usuario.
   */
  registroForm!: FormGroup;

  nombree!: number;

  /**
   * Estado global de la solicitud 570102.
   * Contiene los valores actuales del trámite, como renovación, homologación, y otros datos relevantes.
   */
  public solicitudState!: Solicitud570102State;

  /**
   * Constructor del componente PasoUnoComponent.
   * 
   * @param fb - Servicio FormBuilder utilizado para construir formularios reactivos.
   */
  constructor(public fb: FormBuilder) {
    // El constructor se utiliza para la inyección de dependencias.
  }

  /**
   * Método que se ejecuta después de que las vistas del componente han sido inicializadas.
   * Configura los formularios dinámicos y obtiene el tipo de persona.
   */
  ngAfterViewInit(): void {
    this.persona = PERSONA_MORAL_NACIONAL;
    this.domicilioFiscal = DOMICILIO_FISCAL_PERSONA_MORAL_O_FISICA_NACIONAL;
    this.solicitante.obtenerTipoPersona(TIPO_PERSONA.MORAL_NACIONAL);
  }

  /**
   * Selecciona una pestaña del asistente.
   * @param i Índice de la pestaña a seleccionar.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
    this.indiceNombre.emit(this.indice);
  }

  emitirCancelacion(data: number): void {
    this.nombree = data;
    this.eventoDatosHijo.emit(data);

  }
  getValorIndice(e: AccionBoton): void {

    if (e.valor > 0 && e.valor < 5) {
      this.indice = e.valor;
      if (e.accion === 'cont' && this.indice === 1) {
      }
    }
    this.nombree = 1;
  }
  /**
   * Método del ciclo de vida de Angular que se ejecuta al destruir el componente.
   * Cancela todas las suscripciones activas.
   */
  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}