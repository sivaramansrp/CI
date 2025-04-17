/**
 * PasoUnoPagesComponent
 * 
 * Este componente representa la primera página del asistente de modificación de permisos sanitarios.
 */
import {
  AfterViewInit,
  Component,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import {
  SolicitanteComponent,
  TIPO_PERSONA,
} from '@libs/shared/data-access-user/src';
import { DatosDelSolicitudModificacionComponent } from '../../../../shared/components/datos-del-solicitud-modificacion/datos-del-solicitud-modificacion.component';
import { PagoDeDerechosEntradaComponent } from '../../../../shared/components/pago-de-derechos-entrada/pago-de-derechos-entrada.component';
import { TercerosRelacionadosFabSeccionComponent } from '../../../../shared/components/terceros-relacionados-fab-seccion/terceros-relacionados-fab-seccion.component';
import { TramitesAsociadosSeccionComponent } from '../../../../shared/components/tramites-asociados-seccion/tramites-asociados-seccion.component';
/*
  * @description
*/
@Component({
  selector: 'app-paso-uno-pages',
  templateUrl: './paso-uno-pages.component.html',
})
/**
 * `PasoUnoPagesComponent`
 * 
 * Este componente representa la primera página del asistente de modificación de permisos sanitarios.
 * Su propósito principal es recopilar y gestionar los datos de los formularios asociados a esta página,
 * organizados en diferentes secciones o pestañas.
 * 
 * Funcionalidades principales:
 * - Recopilar los valores de los formularios de los componentes hijos, como `SolicitanteComponent`,
 *   `DatosDelSolicitudModificacionComponent`, `TercerosRelacionadosFabSeccionComponent`,
 *   `PagoDeDerechosEntradaComponent` y `TramitesAsociadosSeccionComponent`.
 * - Proporcionar un método para consolidar todos los datos en un único objeto (`collectFormValues`).
 * - Gestionar el índice de la pestaña seleccionada en la interfaz.
 * 
 * Uso:
 * - Este componente se utiliza como parte del asistente (wizard) para la modificación de permisos sanitarios.
 * - Los datos recopilados se pueden enviar a un backend o utilizar para otras operaciones.
 * 
 * Ciclo de vida:
 * - Implementa el hook `AfterViewInit` para inicializar referencias a los componentes hijos después de que
 *   la vista haya sido renderizada.
 */
export class PasoUnoPagesComponent implements AfterViewInit {
  /**
   * Referencia al componente `SolicitanteComponent` para acceder a sus métodos y propiedades.
   */
  @ViewChild(SolicitanteComponent, { static: false })
  solicitante!: SolicitanteComponent;

  /**
   * Referencia a una lista de componentes `DatosDelSolicitudModificacionComponent`.
   * Se utiliza para recopilar los datos de las solicitudes de modificación.
   */
  @ViewChildren(DatosDelSolicitudModificacionComponent)
  datosSolicitudComponents!: QueryList<DatosDelSolicitudModificacionComponent>;

  /**
   * Referencia a una lista de componentes `TercerosRelacionadosFabSeccionComponent`.
   * Se utiliza para recopilar los datos de los terceros relacionados.
   */
  @ViewChildren(TercerosRelacionadosFabSeccionComponent)
  tercerosRelacionadosComponents!: QueryList<TercerosRelacionadosFabSeccionComponent>;

  /**
   * Referencia a una lista de componentes `PagoDeDerechosEntradaComponent`.
   * Se utiliza para recopilar los datos relacionados con los pagos de derechos de entrada.
   */
  @ViewChildren(PagoDeDerechosEntradaComponent)
  pagoDeDerechosEntradaComponent!: QueryList<PagoDeDerechosEntradaComponent>;

  /**
   * Referencia a una lista de componentes `TramitesAsociadosSeccionComponent`.
   * Se utiliza para recopilar los datos de los trámites asociados.
   */
  @ViewChildren(TramitesAsociadosSeccionComponent)
  tramitesAsociadosSeccionComponent!: QueryList<TramitesAsociadosSeccionComponent>;

  /**
   * Objeto para almacenar todos los valores recopilados de los formularios.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload: any = {};

  /**
   * Hook del ciclo de vida de Angular que se ejecuta después de que la vista ha sido inicializada.
   * 
   * Uso:
   * - Se utiliza para inicializar referencias a los componentes hijos.
   */
  ngAfterViewInit(): void {
    //afterViewInit
  
  }

  /**
   * Método para recopilar los valores de los formularios de todos los componentes hijos.
   * 
   * Este método organiza los datos en un objeto estructurado por secciones o pestañas.
   * 
   * @returns Un objeto que contiene los valores de los formularios de todas las secciones.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  collectFormValues(): any {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const ALL_FORM_VALUES: any = {
      solicitante: [],
      datosSolicitud: [],
      tercerosRelacionados: [],
      pagoDeDerechos: [],
      tramitesAsociados: [],
    };

    // Tab 1: SolicitanteComponent
    if (this.solicitante?.form) {
      ALL_FORM_VALUES.solicitante = this.solicitante.form.value;
    }

    // Tab 2: DatosDelSolicitudModificacionComponent
    if (this.datosSolicitudComponents?.length > 0) {
      this.datosSolicitudComponents.toArray().forEach((component) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const CHILD_DATA: any = {};
        if (component?.domicilioEstablecimiento) {
          CHILD_DATA.domicilioEstablecimiento =
            component.domicilioEstablecimiento.value;
        }
        if (component?.scianForm) {
          CHILD_DATA.scianForm = component.scianForm.value;
        }
        if (component?.solicitudForm) {
          CHILD_DATA.solicitudForm = component.solicitudForm.value;
        }
        if (component?.solicitudEstablecimientoForm) {
          CHILD_DATA.solicitudEstablecimientoForm =
            component.solicitudEstablecimientoForm.value;
        }
        if (component?.formMercancias) {
          CHILD_DATA.formMercancias = component.formMercancias.value;
        }
        ALL_FORM_VALUES.datosSolicitud.push(CHILD_DATA);
      });
    }

    // Tab 3: TercerosRelacionadosFabSeccionComponent
    if (this.tercerosRelacionadosComponents?.length > 0) {
      this.tercerosRelacionadosComponents
        .toArray()
        .forEach((component) => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const CHILD_DATA: any = {};
          if (component?.agregarFacturadorFormGroup) {
            CHILD_DATA.facturador = component.agregarFacturadorFormGroup.value;
          }
          if (component?.agregarFabricanteFormGroup) {
            CHILD_DATA.fabricante = component.agregarFabricanteFormGroup.value;
          }
          if (component?.agregarDestinatarioFormGroup) {
            CHILD_DATA.destinatario =
              component.agregarDestinatarioFormGroup.value;
          }
          if (component?.agregarProveedorFormGroup) {
            CHILD_DATA.proveedor = component.agregarProveedorFormGroup.value;
          }
          ALL_FORM_VALUES.tercerosRelacionados.push(CHILD_DATA);
        });
    }

    // Tab 4: PagoDeDerechosEntradaComponent
    if (this.pagoDeDerechosEntradaComponent?.length > 0) {
      this.pagoDeDerechosEntradaComponent
        .toArray()
        .forEach((component) => {
          if (component?.pagoDerechos) {
            ALL_FORM_VALUES.pagoDeDerechos.push(component.pagoDerechos.value);
          }
        });
    }

    // Tab 5: TramitesAsociadosSeccionComponent
    if (this.tramitesAsociadosSeccionComponent?.length > 0) {
      this.tramitesAsociadosSeccionComponent
        .toArray()
        .forEach((component) => {
          if (component.acuseTablaDatos) {
            ALL_FORM_VALUES.tramitesAsociados.push(
              ...component.acuseTablaDatos
            ); // Collect data from all instances
          }
        });
    }

    return ALL_FORM_VALUES;
  }

  /**
   * Índice actual del subtítulo seleccionado en la interfaz.
   */
  indice: number = 1;

  /**
   * Método para actualizar el índice del subtítulo seleccionado.
   *
   * @param i - Índice de la pestaña seleccionada.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }
}
