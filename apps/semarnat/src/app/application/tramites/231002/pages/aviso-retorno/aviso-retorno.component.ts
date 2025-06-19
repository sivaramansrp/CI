import { AccionBoton, DatosPasos, ListaPasosWizard, WizardComponent } from '@libs/shared/data-access-user/src';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ConsultaioQuery, ConsultaioState } from '@ng-mf/data-access-user';
import { PAGO_DE_DERECHOS, PASOS } from '../../constantes/aviso-retorno.enum';
import { map, takeUntil } from 'rxjs';
import { MercanciasDesmontadasOSinMontarService } from '../../services/mercancias-desmontadas-o-sin-montar.service';
import { Subject } from 'rxjs';

/**
 * Componente que gestiona el proceso de aviso de retorno mediante un sistema de pasos (wizard).
 * Controla la navegación entre diferentes pasos del proceso y maneja la lógica relacionada con:
 * - Consulta de estados
 * - Carga inicial de datos
 * - Navegación entre pasos
 * - Gestión de suscripciones
 */
@Component({
  selector: 'app-aviso-retorno',
  templateUrl: './aviso-retorno.component.html',
})
export class AvisoRetornoComponent implements OnInit, OnDestroy {
  /**
   * Lista de pasos configurados para el wizard.
   * @type {ListaPasosWizard[]}
   */
  pasos: ListaPasosWizard[] = PASOS;

  /**
   * Referencia al componente wizard para controlar la navegación entre pasos.
   * @type {WizardComponent}
   */
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;

  /**
   * Clase CSS para estilizar alertas informativas.
   * @type {string}
   */
  public infoAlert = 'alert-info';

  /**
   * Textos estáticos relacionados con el pago de derechos.
   * @type {typeof PAGO_DE_DERECHOS}
   */
  TEXTOS = PAGO_DE_DERECHOS;

  /**
   * Índice del paso actual en el wizard.
   * @type {number}
   */
  indice: number = 1;

  /**
   * Subject para gestionar la destrucción de suscripciones.
   * @type {Subject<void>}
   */
  private destroy$ = new Subject<void>();

  /**
   * Estado actual de la consulta (lectura/edición).
   * @type {ConsultaioState}
   */
  public consultaState!: ConsultaioState;

  /**
   * Datos de configuración para el componente de pasos.
   * @type {DatosPasos}
   */
  datosPasos: DatosPasos = {
    nroPasos: this.pasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar'
  };

  /**
   * Constructor para inyección de dependencias.
   * @param consultaQuery Query para estado de consulta
   * @param mercanciasDesmontadasOSinMontarService Servicio para operaciones de mercancías
   */
  constructor(
    private consultaQuery: ConsultaioQuery,
    private mercanciasDesmontadasOSinMontarService: MercanciasDesmontadasOSinMontarService
  ) { }

  /**
   * Inicialización del componente:
   * - Configura suscripción al estado de consulta
   * - Carga datos iniciales si es necesario
   */
  ngOnInit(): void {
    this.configurarSuscripcionEstadoConsulta();
  }

  /**
   * Configura la suscripción al estado de consulta:
   * - Actualiza el estado local
   * - Carga datos si está en modo actualización
   */
  private configurarSuscripcionEstadoConsulta(): void {
    this.consultaQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroy$),
        map((seccionState) => {
          this.consultaState = seccionState;
          if (seccionState.update) {
            this.guardarDatosFormulario();
          }
        })
      )
      .subscribe();
  }

  /**
   * Obtiene y guarda los datos iniciales del formulario desde el servicio.
   */
  guardarDatosFormulario(): void {
    this.mercanciasDesmontadasOSinMontarService
      .obtenerDatosSolicitudInicial()
      .pipe(takeUntil(this.destroy$))
      .subscribe((resp) => {
        if (resp) {
          this.mercanciasDesmontadasOSinMontarService.actualizarEstadoFormulario(resp);
        }
      });
  }

  /**
   * Maneja la navegación entre pasos del wizard.
   * @param e Objeto con información de la acción del botón
   */
  public getValorIndice(e: AccionBoton): void {
    if (e.valor > 0 && e.valor < 5) {
      this.indice = e.valor;
      this.actualizarNavegacionWizard(e.accion);
    }
  }

  /**
   * Ejecuta la acción de navegación en el wizard según el botón presionado.
   * @param accion Tipo de acción ('cont' para continuar, otros para retroceder)
   */
  private actualizarNavegacionWizard(accion: string): void {
    if (accion === 'cont') {
      this.wizardComponent?.siguiente();
    } else {
      this.wizardComponent?.atras();
    }
  }

  /**
   * Limpieza al destruir el componente:
   * - Completa el subject de destrucción
   * - Cancela suscripciones activas
   */
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
