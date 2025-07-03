import {
  AfterViewInit,
  Component,
  OnDestroy,
} from '@angular/core';
import {
  ConsultaioQuery,
  ConsultaioState,
  FormularioDinamico,
} from '@ng-mf/data-access-user';
import {
  DOMICILIO_FISCAL_PERSONA_MORAL_O_FISICA_NACIONAL,
  PERSONA_MORAL_NACIONAL,
} from '@libs/shared/data-access-user/src/tramites/constantes/solicitante-constantes.enum';
import { Subject} from 'rxjs';

/**
 * Componente que representa el primer paso del trámite.
 */
@Component({
  selector: 'app-paso-uno',
  templateUrl: './paso-uno.component.html',
  styles: ``,
 
})
export class PasoUnoComponent implements AfterViewInit, OnDestroy {
  /** Datos de respuesta del servidor utilizados para actualizar el formulario. */
  public esDatosRespuesta: boolean = false; // Indica si hay datos de respuesta del servidor

  private destroyNotifier$: Subject<void> = new Subject(); // Subject para manejar la destrucción de suscripciones
  public consultaState!: ConsultaioState; // Estado de la consulta
  public datosRespuesta: unknown; // Datos de respuesta del servidor
  /**
   * Constructor del componente PasoUnoComponent.
   * @param router Inyecta el servicio Router para la navegación.
   */
  constructor(
    private consultaQuery: ConsultaioQuery,    
  ) {}


  /**
   * Tipo de persona seleccionada.
   */
  tipoPersona!: number;

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
   * Método que se ejecuta después de que las vistas del componente han sido inicializadas.
   * Configura los formularios dinámicos y obtiene el tipo de persona.
   */
  ngAfterViewInit(): void {
    this.persona = PERSONA_MORAL_NACIONAL;
    this.domicilioFiscal = DOMICILIO_FISCAL_PERSONA_MORAL_O_FISICA_NACIONAL;
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
   *
   * Emite un valor y completa el subject `destroyNotifier$` para notificar a todas las suscripciones
   * que deben finalizarse, evitando así fugas de memoria.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
