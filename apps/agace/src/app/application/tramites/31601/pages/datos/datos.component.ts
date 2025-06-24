import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ConsultaioQuery, ConsultaioState, SolicitanteComponent } from '@ng-mf/data-access-user';
import { Subject, map, takeUntil } from 'rxjs';
import { Solocitud31601Service } from '../../services/service31601.service';
import { TIPO_PERSONA } from '@libs/shared/data-access-user/src/tramites/constantes/constantes';
import { Tramite31601Query } from '../../../../estados/queries/tramite31601.query';

/**
 * Este componente se encarga de gestionar la visualización y carga de datos
 * del subtítulo correspondiente en el asistente del trámite 31601.
 * 
 * Contiene lógica para inicializar formularios reactivos con datos precargados desde
 * archivos JSON, establecer el tipo de persona solicitante y controlar el flujo de datos
 * según el estado de actualización de la solicitud.
 * 
 * @component
 * @example
 * <app-datos></app-datos>
 */
@Component({
  selector: 'app-datos',
  templateUrl: './datos.component.html',
})
export class DatosComponent implements OnInit, AfterViewInit, OnDestroy {
  /**
   * Referencia al componente de solicitante que se instancia dentro de la plantilla.
   */
  @ViewChild(SolicitanteComponent, { static: false }) solicitante!: SolicitanteComponent;

  /**
   * Constructor del componente. Se inyectan servicios y queries necesarios para el flujo de datos.
   * @param consultaQuery Consulta a los datos del store.
   * @param solocitud31601Service Servicio para carga y actualización de datos del formulario.
   */
  constructor(
    private consultaQuery: ConsultaioQuery,
    private solocitud31601Service: Solocitud31601Service,
    private tramite31601Query: Tramite31601Query
  ) {}

  /**
   * Índice del tab seleccionado actualmente en el subtítulo.
   */
  indice: number = 1;

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

  public isTabDisabled: boolean = true;

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

    this.tramite31601Query.selectSolicitud$
      .pipe(takeUntil(this.destroyNotifier$)) 
      .subscribe((solicitud) => {
        // Observa los cambios en los valores de régimen y actualiza isTabDisabled en consecuencia
        const { regimen_0: REGIMEN0, regimen_1: REGIMEN1, regimen_2: REGIMEN2, regimen_3: REGIMEN3 } = solicitud;
        this.isTabDisabled = !(REGIMEN0 || REGIMEN1 || REGIMEN2 || REGIMEN3);
      });

  }

  /**
   * Cambia el índice actual del tab seleccionado.
   * @param i Índice del tab a seleccionar.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }

  /**
   * Carga los datos del formulario desde un archivo JSON externo y los actualiza en el store.
   * También establece la bandera de datos cargados en verdadero.
   */
  guardarDatosFormulario(): void {
    this.solocitud31601Service
      .getRegistroTomaMuestrasMercanciasData()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((resp) => {
        if (resp) {
          this.esDatosRespuesta = true;
          this.solocitud31601Service.actualizarEstadoFormulario(resp);
        }
      });
  }

  /**
   * Hook que se ejecuta después de que la vista ha sido inicializada.
   * Se utiliza para establecer el tipo de persona del solicitante.
   */
  ngAfterViewInit(): void {
    if (this.solicitante) {
      this.solicitante.obtenerTipoPersona(TIPO_PERSONA.MORAL_NACIONAL);
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
