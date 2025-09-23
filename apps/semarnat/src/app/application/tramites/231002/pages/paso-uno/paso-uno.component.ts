import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  ConsultaioQuery,
  ConsultaioState,
  SolicitanteComponent,
} from '@ng-mf/data-access-user';
import { map, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { DatosSolicitudComponent } from '../../components/datos-solicitud/datos-solicitud.component';
import { MercanciasDesmontadasOSinMontarService } from '../../services/mercancias-desmontadas-o-sin-montar.service';
import { Subject } from 'rxjs';

/**
 * Componente que representa la sección de solicitud de datos del solicitante.
 *
 * Este componente permite gestionar la información del solicitante en el formulario y
 * proporciona la funcionalidad de selección de pestañas dentro de la interfaz.
 *
 * - selector: Nombre que se utilizará en el HTML para referenciar este componente.
 * - templateUrl: Ruta del archivo HTML asociado al componente.
 */
@Component({
  selector: 'app-paso-uno',
  standalone: true,
  imports: [CommonModule, SolicitanteComponent, DatosSolicitudComponent],
  templateUrl: './paso-uno.component.html',
})
export class PasoUnoComponent implements OnInit, OnDestroy {
  /**
   * Índice de la pestaña seleccionada.
   *
   * Esta propiedad indica cuál de las pestañas del formulario está seleccionada en un
   * momento dado, permitiendo controlar la navegación entre las diferentes secciones.
   *
   * @type {number}
   */
  indice: number = 1;

  @ViewChild(DatosSolicitudComponent)
  datosSolicitudComponent!: DatosSolicitudComponent;

  /**
   * Selecciona una pestaña específica.
   *
   * Este método actualiza el valor de `indice` para seleccionar la pestaña correspondiente
   * y cambiar la vista dentro del formulario.
   *
   * @param {number} i - El índice de la pestaña a seleccionar.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }

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

  /** Datos de respuesta del servidor utilizados para actualizar el formulario. */
  public esDatosRespuesta: boolean = false;

  /**
   * Constructor para inyección de dependencias.
   * @param consultaQuery Query para estado de consulta
   * @param mercanciasDesmontadasOSinMontarService Servicio para operaciones de mercancías
   */
  constructor(
    private consultaQuery: ConsultaioQuery,
    private mercanciasDesmontadasOSinMontarService: MercanciasDesmontadasOSinMontarService
  ) {}

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
        })
      )
      .subscribe();
    if (this.consultaState?.update) {
      this.guardarDatosFormulario();
    } else {
      this.esDatosRespuesta = true;
    }
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
          this.esDatosRespuesta = true;
          this.mercanciasDesmontadasOSinMontarService.actualizarEstadoFormulario(
            resp
          );
        }
      });
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
