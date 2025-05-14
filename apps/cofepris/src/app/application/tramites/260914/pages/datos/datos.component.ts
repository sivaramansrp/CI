import { CompleteForm, DatosSolicitudform, ManifiestosRepresentanteForm, PagoDeDerechos, ScianForm, SolicitanteData, Tramite } from '../../models/mod-permiso.model';
import { Component, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { DatosDeLaSolicitudModificacionComponent } from '../../../../shared/components/datos-de-la-solicitud-modificacion/datos-de-la-solicitud-modificacion.component';
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
export class DatosComponent {
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

}
