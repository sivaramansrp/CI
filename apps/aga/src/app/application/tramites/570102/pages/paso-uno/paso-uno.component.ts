import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DOMICILIO_FISCAL_PERSONA_MORAL_O_FISICA_NACIONAL, PERSONA_MORAL_NACIONAL, } from '@libs/shared/data-access-user/src/tramites/constantes/solicitante-constantes.enum';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormularioDinamico, TIPO_PERSONA, ValidacionesFormularioService } from '@ng-mf/data-access-user';
import { ReplaySubject, map, takeUntil } from 'rxjs';
import { Solicitud570102State, Tramite570102Store } from '../../state/Tramite570102.store';
import { SolicitanteComponent, } from '@libs/shared/data-access-user/src';
import { Tramite570102Query } from '../../state/Tramite570102.query';

/**
 * Componente que representa el primer paso del trámite.
 */
@Component({
  selector: 'app-paso-uno',
  templateUrl: './paso-uno.component.html',
  styles: ``,
})
export class PasoUnoComponent implements AfterViewInit, OnDestroy {

  /**
  * Referencia al componente de solicitante.
  */
  @ViewChild(SolicitanteComponent) solicitante!: SolicitanteComponent;

  /**
   * Tipo de persona seleccionada.
   */
  tipoPersona!: number;
  /**
    * Observable para manejar la destrucción del componente.
    * Se utiliza para cancelar suscripciones activas.
    */
  public destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  /**
   * Configuración del formulario dinámico para la persona.
   */
  persona: FormularioDinamico[] = [];

  /**
   * Configuración del formulario dinámico para el domicilio fiscal.
   */
  domicilioFiscal: FormularioDinamico[] = [];

  /**
   * Índice del paso actual.
   */
  indice: number = 1;
  /**
 * Formulario reactivo que contiene los campos del paso uno del trámite.
 * Este formulario se utiliza para capturar y validar los datos ingresados por el usuario.
 */
  registroForm!: FormGroup;
  /**
 * Estado global de la solicitud 570102.
 * Contiene los valores actuales del trámite, como renovación, homologación, y otros datos relevantes.
 */
  public solicitudState!: Solicitud570102State;
/**
 * Constructor del componente PasoUnoComponent.
 * 
 * @param fb - Servicio FormBuilder utilizado para construir formularios reactivos.
 * @param store - Almacén de estado para gestionar y almacenar datos relacionados con el trámite 570102.
 * @param query - Consulta para obtener datos del estado global del trámite 570102.
 * @param validacionesService - Servicio para realizar validaciones personalizadas en los formularios.
 */
  constructor(
    public fb: FormBuilder,   
  ) {
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
