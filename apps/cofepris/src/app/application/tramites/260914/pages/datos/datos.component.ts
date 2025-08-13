import { CompleteForm, DatosSolicitudform, ManifiestosRepresentanteForm, PagoDeDerechos, ScianForm, SolicitanteData, Tramite } from '../../models/mod-permiso.model';
import { Component, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ConsultaioQuery, ConsultaioState } from '@ng-mf/data-access-user';
import { Subject,map,takeUntil } from 'rxjs';
import { DatosDeLaSolicitudModificacionComponent } from '../../../../shared/components/datos-de-la-solicitud-modificacion/datos-de-la-solicitud-modificacion.component';
import { EstablecimientoService } from '../../../../shared/services/establecimiento.service';
import { PagoDeDerechosEntradaComponent } from '../../../../shared/components/pago-de-derechos-entrada/pago-de-derechos-entrada.component';
import { SolicitanteComponent } from '@libs/shared/data-access-user/src';
import { TercerosRelacionadosFabricanteComponent } from '../../../.../../../shared/components/terceros-relacionados-fabricante/terceros-relacionados-fabricante.component';
import { TramitesAsociadosSeccionComponent } from '../../../../shared/components/tramites-asociados-seccion/tramites-asociados-seccion.component';

/**
 * @description
 * Componente principal para gestionar la selección de subtítulos en la página de datos.
 * Este componente permite cambiar entre diferentes secciones o pestañas
 * utilizando un índice que representa el subtítulo seleccionado.
 */
@Component({
  selector: 'app-datos',
  templateUrl: './datos.component.html',
})
export class DatosComponent implements OnInit, OnDestroy {
  /**
    * Referencia al componente `SolicitanteComponent` para acceder a sus métodos y propiedades.
    */
  @ViewChild(SolicitanteComponent, { static: false })
  solicitante!: SolicitanteComponent;

  /**
     * Referencia a una lista de componentes `DatosDelSolicitudModificacionComponent`.
     * Se utiliza para recopilar los datos de las solicitudes de modificación.
     */
  @ViewChildren(DatosDeLaSolicitudModificacionComponent)
  datosSolicitudComponents!: QueryList<DatosDeLaSolicitudModificacionComponent>;

  /**
 * Referencia a una lista de componentes `TercerosRelacionadosFabricanteComponent`.
 * Se utiliza para recopilar los datos de las solicitudes de modificación.
 */
  @ViewChildren(TercerosRelacionadosFabricanteComponent)
  tercerosRelacionadosComponents!: QueryList<TercerosRelacionadosFabricanteComponent>;

  /**
 * Referencia a una lista de componentes `PagoDeDerechosEntradaComponent`.
 * Se utiliza para recopilar los datos de las solicitudes de modificación.
 */
  @ViewChildren(PagoDeDerechosEntradaComponent)
  pagoDeDerechosComponents!: QueryList<PagoDeDerechosEntradaComponent>;

  /**
   * Referencia a una lista de componentes `TramitesAsociadosSeccionComponent`.
   * Se utiliza para recopilar los datos de las solicitudes de modificación.
   */
  @ViewChildren(TramitesAsociadosSeccionComponent)
  tramitesAsociadosComponents!: QueryList<TramitesAsociadosSeccionComponent>;

  /**
  * @description
  * Variable que almacena el índice del subtítulo seleccionado.
  * Por defecto, el índice inicial es `1`.
  */
  indice: number = 1;
/**
     * @property destroyNotifier$
     * @description
     * Subject utilizado para notificar la destrucción del componente y cancelar suscripciones activas.
     */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * @property consultaState
   * @description
   * Estado actual de la consulta, obtenido desde el store.
   */
  public consultaState!: ConsultaioState;

  /**
   * @property esDatosRespuesta
   * @description
   * Indica si se han recibido datos de respuesta del servidor para actualizar el formulario.
   */
  public esDatosRespuesta: boolean = false;
  public nuevaColumna = { encabezado: 'Colonia o equivalente', clave: 'coloniaEquivalente' };

  /**
   * @description
   * Método del ciclo de vida de Angular que se ejecuta al inicializar el componente.
   * Aquí se pueden realizar tareas de configuración inicial, como la obtención de datos necesarios.
   */
  constructor(
    private establecimientoService: EstablecimientoService,
    private consultaQuery: ConsultaioQuery,
  ) { }
  /**
    * @method ngOnInit
    * @description
    * Método del ciclo de vida de Angular que se ejecuta al inicializar el componente.
    * Suscribe al estado de la consulta y decide si se deben guardar los datos del formulario o mostrar los datos de respuesta.
    */
  ngOnInit(): void {
    this.consultaQuery.selectConsultaioState$.pipe(
      takeUntil(this.destroyNotifier$),
      map((seccionState) => {
        this.consultaState = seccionState;
        if (this.consultaState.update) {
          this.guardarDatosFormulario();
        } else {
          this.esDatosRespuesta = true;
        }
      })
    ).subscribe();

  }

  /**
   * @method guardarDatosFormulario
   * @description
   * Método encargado de obtener los datos del formulario desde el servicio y actualizar el estado correspondiente.
   * Si se reciben datos, se actualiza el estado del formulario y se marca que hay datos de respuesta.
   */
  guardarDatosFormulario(): void {
    this.establecimientoService
      .obtenerSolicitudDatos().pipe(
        takeUntil(this.destroyNotifier$)
      )
      .subscribe((resp) => {
        if (resp) {
          this.esDatosRespuesta = true;
          this.establecimientoService.actualizarEstadoFormulario(resp);
        }
      });
  }

  /**
   * @description
   * Método que establece el índice del subtítulo seleccionado.
   * Este método se utiliza para cambiar entre diferentes subtítulos o pestañas.
   * @param i Índice del subtítulo que se desea seleccionar.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }

  /**
 * @description
 * Objeto que almacena los datos recopilados de los formularios en el componente.
 * Contiene información del solicitante, datos de la solicitud, pagos de derechos y trámites asociados.
 */

  cargaUtil: {
    solicitante?: SolicitanteData;
    datosSolicitud?: CompleteForm[];
    pagoDeDerechos?: PagoDeDerechos[];
    tramitesAsociados?: Tramite[];
  } = {};
  /**
* @description
* Método que recopila y devuelve todos los valores de los formularios presentes en el componente.
* Este método obtiene los datos del solicitante, los datos de la solicitud, los pagos de derechos
* y los trámites asociados, consolidándolos en un único objeto.
* 
* @returns Un objeto que contiene:
* - `solicitante`: Datos del formulario del solicitante.
* - `datosSolicitud`: Lista de datos de las solicitudes de modificación.
* - `pagoDeDerechos`: Lista de datos de los pagos de derechos.
* - `tramitesAsociados`: Lista de trámites asociados.
*/
  obtenerValoresFormulario(): {
    solicitante?: SolicitanteData;
    datosSolicitud?: CompleteForm[];
    pagoDeDerechos?: PagoDeDerechos[];
    tramitesAsociados?: Tramite[];
  } {
    const TODOS_VALORES_FORMULARIO: {
      solicitante?: SolicitanteData;
      datosSolicitud?: CompleteForm[];
      pagoDeDerechos?: PagoDeDerechos[];
      tramitesAsociados?: Tramite[];
    } = {
      solicitante: undefined,
      datosSolicitud: [],
      pagoDeDerechos: [],
      tramitesAsociados: [],
    };

    // Obtiene los datos del formulario del solicitante si está disponible
    if (this.solicitante?.form) {
      TODOS_VALORES_FORMULARIO.solicitante = this.solicitante.form.value as SolicitanteData;
    }

    // Recorre los componentes de datos de la solicitud y recopila sus valores
    if (this.datosSolicitudComponents?.length > 0) {
      this.datosSolicitudComponents.toArray().forEach((component) => {
        const CHILD_DATA: CompleteForm = {
          datosSolicitudform: component.datosSolicitudform?.value as DatosSolicitudform,
          manifiestosRepresentanteForm: component.manifiestosRepresentanteForm?.value as ManifiestosRepresentanteForm,
          scianForm: component.scianForm?.value as ScianForm,
        };
        TODOS_VALORES_FORMULARIO.datosSolicitud?.push(CHILD_DATA);
      });
    }

    // Recorre los componentes de pagos de derechos y recopila sus valores
    if (this.pagoDeDerechosComponents?.length > 0) {
      this.pagoDeDerechosComponents.toArray().forEach((component) => {
        if (component?.pagoDerechos) {
          TODOS_VALORES_FORMULARIO.pagoDeDerechos?.push(component.pagoDerechos.value as PagoDeDerechos);
        }
      });
    }

    // Recorre los componentes de trámites asociados y recopila sus valores 
    if (this.tramitesAsociadosComponents?.length > 0) {
      this.tramitesAsociadosComponents.toArray().forEach((component) => {
        if (component.acuseTablaDatos) {
          TODOS_VALORES_FORMULARIO.tramitesAsociados?.push(...component.acuseTablaDatos as Tramite[]);
        }
      });
    }

    return TODOS_VALORES_FORMULARIO;
  }

   /**
   * @method ngOnDestroy
   * @description
   * Método del ciclo de vida de Angular que se ejecuta al destruir el componente.
   * Notifica y completa el subject para cancelar todas las suscripciones activas y evitar fugas de memoria.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
