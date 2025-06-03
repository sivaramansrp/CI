import { AccionBoton, DatosPasos, ListaPasosWizard, WizardComponent } from '@libs/shared/data-access-user/src';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ConsultaioQuery, ConsultaioState } from '@ng-mf/data-access-user';
import { Subject, map, takeUntil } from 'rxjs';
import { ALERTA_COM } from '@libs/shared/data-access-user/src/tramites/constantes/110208/certificado.enum';
import { PASOS } from "@libs/shared/data-access-user/src/core/enums/110208/modificacion.enum";
import { Solocitud110208Service } from '../../services/service110208.service';

/**
 * Componente para la página de solicitud.
 * Este componente gestiona el flujo de un asistente (wizard) para completar los pasos de un trámite.
 */
@Component({
  selector: 'app-solicitud-page',
  templateUrl: './solicitud-page.component.html',
})
export class SolicitudPageComponent implements OnInit, OnDestroy{
  /**
   * Índice actual del paso en el asistente.
   * @type {number}
   */
  indice: number = 1;

  /**
   * Constructor del componente. Se inyectan servicios y queries necesarios para el flujo de datos.
   * @param consultaQuery Consulta a los datos del store.
   * @param solocitud110208Service Servicio para carga y actualización de datos del formulario.
   */
  constructor(
    private consultaQuery: ConsultaioQuery,
    private solocitud110208Service: Solocitud110208Service,
  ) {}

  /**
   * Constante de alerta utilizada en el componente.
   * @type {typeof ALERTA_COM}
   */
  alerta = ALERTA_COM;

  /**
   * Indica si ya se cargaron los datos de respuesta para mostrar en el formulario.
   */
  public esDatosRespuesta: boolean = false;

  /**
   * Observable para gestionar la destrucción del componente y evitar fugas de memoria.
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * Estado actual de la consulta obtenido desde el store.
   */
  public consultaState!: ConsultaioState;

  /**
   * Referencia al componente del asistente (wizard).
   * Se utiliza para interactuar con el wizard y controlar su flujo (pasar al siguiente paso, ir al anterior, etc.).
   * @type {WizardComponent}
   */
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;

  /**
   * Lista de pasos del asistente.
   * Contiene un arreglo con los pasos definidos en `PASOS` que será utilizado en el wizard.
   * @type {ListaPasosWizard[]}
   */
  pasos: ListaPasosWizard[] = PASOS;

  /**
   * Datos de los pasos del asistente.
   * Incluye el número total de pasos, el índice del paso actual y los textos de los botones de navegación (Anterior, Continuar).
   * @type {DatosPasos}
   */
  datosPasos: DatosPasos = {
    /**
     * Número total de pasos en el asistente.
     */
    nroPasos: this.pasos.length,
    /**
     * Índice del paso actual.
     */
    indice: this.indice,
    /**
     * Texto del botón "Anterior".
     */
    txtBtnAnt: 'Anterior',
    /**
     * Texto del botón "Continuar".
     */
    txtBtnSig: 'Continuar',
  };

  /**
   * Hook de inicialización del componente. Verifica el estado de actualización del store
   * y carga datos en caso necesario.
   */
  ngOnInit(): void {
    this.consultaQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.consultaState = seccionState;
        })
      )
      .subscribe();

    if (this.consultaState.update) {
      this.guardarDatosFormulario();
    } else {
      this.esDatosRespuesta = true;
    }
  }

  /**
   * Carga los datos del formulario desde un archivo JSON externo y los actualiza en el store.
   * También establece la bandera de datos cargados en verdadero.
   */
  guardarDatosFormulario(): void {
    this.solocitud110208Service
      .getRegistroTomaMuestrasMercanciasData()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((resp) => {
        if (resp) {
          this.esDatosRespuesta = true;
          this.solocitud110208Service.actualizarEstadoFormulario(resp);
        }
      });
  }

  /**
   * Obtiene el valor del índice de la acción del botón.
   * Este método controla el cambio de paso en el wizard dependiendo de la acción del botón presionado.
   * 
   * Si la acción es 'cont', pasa al siguiente paso. Si la acción es 'atras', regresa al paso anterior.
   * 
   * @param {AccionBoton} e Acción del botón (cont o atras) y el valor asociado a la acción.
   * @returns {void}
   */
  getValorIndice(e: AccionBoton): void {
    // Verifica si el valor de la acción está en el rango adecuado
    if (e.valor > 0 && e.valor < 5) {
      // Actualiza el índice del paso basado en el valor de la acción
      this.indice = e.valor;

      // Dependiendo de la acción, avanza o retrocede en el wizard
      if (e.accion === 'cont') {
        // Si la acción es 'cont', avanza al siguiente paso
        this.wizardComponent.siguiente();
      } else {
        // Si la acción es 'atras', retrocede al paso anterior
        this.wizardComponent.atras();
      }
    }
  }
  /**
   * Hook de destrucción del componente. Limpia las suscripciones activas para evitar fugas de memoria.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}