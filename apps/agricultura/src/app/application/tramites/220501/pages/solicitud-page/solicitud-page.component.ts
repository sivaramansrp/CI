import { Component, OnInit, ViewChild } from '@angular/core';
import { DatosPasos, ListaPasosWizard, PASOS, SECCIONES_TRAMITE_5701, WizardComponent } from '@ng-mf/data-access-user';
import { SeccionState, SeccionStore } from '../../../../estados/seccion.store';
import { Subject, map, takeUntil } from 'rxjs';
import { ERROR_ALERTA } from '@libs/shared/data-access-user/src/tramites/constantes/mensajes-error-formularios';
import { PasoUnoComponent } from '../paso-uno/paso-uno.component';
import { SeccionQuery } from'../../../../estados/queries/seccion.query';
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

/**
 * Componente para gestionar la página de solicitud.
 */
@Component({
  templateUrl: './solicitud-page.component.html',
  styles: ``,
  standalone: false,
})
export class SolicitudPageComponent implements OnInit {
  /**
   * Lista de pasos del asistente.
   */
  pasos: ListaPasosWizard[] = PASOS;

  /**
   * Índice del paso actual.
   */
  indice: number = 1;

  /**
 * Estado de la sección actual.
 */
  public seccion!: SeccionState;

  /**
 * Sujeto para manejar la destrucción de suscripciones.
 */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
  * Referencia al componente del asistente.
  */
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;

  /**
   * Referencia al componente PasoUnoComponent
   */
  @ViewChild(PasoUnoComponent) pasoUnoComponent!: PasoUnoComponent;

  /**
   * Mensaje de error a mostrar.
   */
  esValido = true;

  /**
   * Una cadena que representa la clase CSS para una alerta de error.
   */
  infoError = 'alert-danger';

  /**
   * Asigna el mensaje de error a mostrar al atributo `ALERTA`.
   */
  ALERTA = ERROR_ALERTA;

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
   * Constructor del componente.
   * @param seccionStore Almacén de secciones.
   * @param seccionQuery Consulta de secciones.
   */
  constructor(
    private seccionQuery: SeccionQuery,
    private seccionStore: SeccionStore,
  ) {
    // El constructor se utiliza para la inyección de dependencias.
  }

  /**
   * Método que se ejecuta al inicializar el componente.
   */
  ngOnInit(): void {
    this.seccionQuery.selectSeccionState$.pipe(
      takeUntil(this.destroyNotifier$),
      map(seccionState => {
        this.seccion = seccionState;
      })
    ).subscribe();

    this.asignarSecciones();
  }

  /**
 * Método para seleccionar una pestaña.
 * @param i Índice de la pestaña a seleccionar.
 */
  seleccionaTab(i: number): void {
    this.indice = i;
  }

  /**
 * Método para obtener el valor del índice y navegar en el asistente.
 * @param e Acción del botón que contiene el valor del índice.
 */
  getValorIndice(e: AccionBoton): void {
    if (e.valor > 0 && e.valor < 5) {
      if (this.indice === 1) {
        const SOLICITUD = this.pasoUnoComponent?.solicitudComponent;
        this.esValido = SOLICITUD?.validarFormulario() ?? false;
      }

      if (!this.esValido) {
        this.datosPasos.indice = 1;
        return;
      }

      this.indice = e.valor;
      if (e.accion === 'cont') {
        this.wizardComponent.siguiente();
      } else {
        this.wizardComponent.atras();
      }
    }
  }

  /**
   * Método para asignar las secciones existentes al stored
   */
  private asignarSecciones(): void {
    const SECCIONES: boolean[] = [];
    const FORMAVALIDA: boolean[] = [];
    // eslint-disable-next-line guard-for-in
    for (const LLAVESECCION of Object.keys(SECCIONES_TRAMITE_5701.PASO_1) as Array<keyof typeof SECCIONES_TRAMITE_5701.PASO_1>) {
      
      SECCIONES.push(SECCIONES_TRAMITE_5701.PASO_1[LLAVESECCION]);
      FORMAVALIDA.push(false);
    }
    this.seccionStore.establecerSeccion(SECCIONES);
    this.seccionStore.establecerFormaValida(FORMAVALIDA);
  }
}
