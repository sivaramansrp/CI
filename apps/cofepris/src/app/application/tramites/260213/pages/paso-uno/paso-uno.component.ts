import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConsultaioQuery, ConsultaioState, SolicitanteComponent } from '@ng-mf/data-access-user';
import { Observable, Subject, map, takeUntil } from 'rxjs';
import { Tramite260213State, Tramite260213Store } from '../../estados/tramite260213Store.store';
import { CommonModule } from '@angular/common';
import { ContenedorDeDatosSolicitudComponent } from '../../components/contenedor-de-datos-solicitud/contenedor-de-datos-solicitud.component';
import { PagoDeDerechosContenedoraComponent } from '../../components/pago-de-derechos-contenedora/pago-de-derechos-contenedora/pago-de-derechos-contenedora.component';
import { PermisoSanitarioMedicosUsoPersonalService } from '../../services/permiso-sanitario-medicos-uso-personal.service';
import { TercerosRelacionadosVistaComponent } from '../../components/terceros-relacionados-vista/terceros-relacionados-vista.component';
import { Tramite260213Query } from '../../estados/tramite260213Query.query';

@Component({
  selector: 'app-paso-uno',
  standalone: true,
  imports: [
    CommonModule,
    SolicitanteComponent,
    ContenedorDeDatosSolicitudComponent,
    TercerosRelacionadosVistaComponent,
    PagoDeDerechosContenedoraComponent,
  ],
  templateUrl: './paso-uno.component.html',
  styleUrl: './paso-uno.component.css',
})
export class PasoUnoComponent implements OnDestroy, OnInit {
  /**
   * Índice que representa la posición actual o seleccionada.
   * Puede ser un número o indefinido si no se ha establecido.
   *
   * @type {number | undefined}
   */
  indice: number | undefined = 1;

  /**
   * Notificador utilizado para gestionar la destrucción de suscripciones en el componente.
   * Se emite un valor cuando el componente se destruye, permitiendo cancelar observables y evitar fugas de memoria.
   * 
   * @private
   */
  private destroyNotifier$: Subject<void> = new Subject();
  
  /**
   * Esta variable se utiliza para almacenar el índice del subtítulo.
   */
  public consultaState!: ConsultaioState;

  /** Datos de respuesta del servidor utilizados para actualizar el formulario. */
  public esDatosRespuesta: boolean = false;
  
  /**
   * Subject utilizado para notificar la destrucción del componente y evitar fugas de memoria.
   * @type {Subject<void>}
   */
  public formularioDeshabilitado: boolean = false;

  /**
   * Constructor de la clase PasoUnoComponent.
   * 
   * @param Tramite260213Query - Servicio para consultar el estado del trámite 260213.
   * @param Tramite260213Store - Almacén para gestionar el estado del trámite 260213.
   * @param consultaQuery - Servicio para consultar el estado de la sección de consulta.
   * 
   * Al inicializar el componente, se suscribe al observable `selectConsultaioState$` para actualizar el estado local
   * (`consultaState`) y la propiedad `formularioDeshabilitado` según el estado de solo lectura (`readonly`) de la sección.
   */
  constructor(
    private Tramite260213Query: Tramite260213Query,
    private Tramite260213Store: Tramite260213Store,
    private consultaQuery: ConsultaioQuery,
    private permisoSanitarioMedicosUsoPersonalService: PermisoSanitarioMedicosUsoPersonalService
  ) {
    this.consultaQuery.selectConsultaioState$.pipe(takeUntil(this.destroyNotifier$),
      map((seccionState) => {
        this.consultaState = seccionState;
        this.formularioDeshabilitado = seccionState.readonly;
      })).subscribe();
    }

  ngOnInit(): void {
    if (this.consultaState && this.consultaState.procedureId === '260213' &&
      this.consultaState.update) {
      this.guardarDatosFormulario();
    } else {
      this.esDatosRespuesta = true;
    }
    this.Tramite260213Query.getTabSeleccionado$
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((tab) => {
        this.indice = tab;
      });
  }

  /**
 * Carga datos desde un archivo JSON y actualiza el store con la información obtenida.
 * Luego reinicializa el formulario con los valores actualizados desde el store.
 */
  guardarDatosFormulario(): void {
    this.getRegistroTomaMuestrasMercanciasData().pipe(
      takeUntil(this.destroyNotifier$)).subscribe((resp) => {
        if (resp) {
          this.esDatosRespuesta = true;
          this.actualizarEstadoFormulario(resp);
        }
      });
  }

  /**
 * Actualiza el estado del formulario con los datos proporcionados.
 * 
 * @param DATOS - Estado de la solicitud `Tramite260213State` con la información 
 *                del tipo de solicitud a actualizar en el store.
 */
actualizarEstadoFormulario(DATOS: Tramite260213State): void {
  this.Tramite260213Store.update((state) => ({
    ...state,
    ...DATOS
  }))

}

/**
* Obtiene los datos del registro de toma de muestras de mercancías desde un archivo JSON.
* 
* @returns Observable con los datos del estado de la solicitud `Solicitud230401State`,
*          cargados desde el archivo JSON especificado en la ruta de `assets`.
*/
getRegistroTomaMuestrasMercanciasData(): Observable<Tramite260213State> {
  return this.permisoSanitarioMedicosUsoPersonalService.getRegistroTomaMuestrasMercanciasData();
}

  /**
   * Selecciona una pestaña específica en el flujo del trámite.
   *
   * @param i - Índice de la pestaña que se desea seleccionar.
   * 
   * Llama al método `updateTabSeleccionado` del store para actualizar el estado de la pestaña seleccionada.
   */
  seleccionaTab(i: number): void {
    this.Tramite260213Store.updateTabSeleccionado(i);
  }

  /**
   * Método del ciclo de vida de Angular que se llama justo antes de que el componente sea destruido.
   *
   * Este método emite un valor a través del observable `destroyNotifier$` para notificar a los suscriptores
   * que el componente está siendo destruido, y luego completa el observable para liberar recursos.
   *
   * @returns {void} No retorna ningún valor.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
