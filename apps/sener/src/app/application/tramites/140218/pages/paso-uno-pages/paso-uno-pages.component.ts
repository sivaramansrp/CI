/**
 * Componente para la modificación de permisos de importación de tratamientos.
 */
import { AfterViewInit, Component, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { SolicitanteComponent } from '@libs/shared/data-access-user/src';

/**
 * Clase que representa el componente de modificación de permisos de importación de tratamientos.
 */
@Component({
  selector: 'app-paso-uno-pages',
  templateUrl: './paso-uno-pages.component.html',
})
/**
 * Componente que representa la primera sección de un formulario de modificación de permisos de importación.
 * Este componente incluye varios subcomponentes para recopilar información del solicitante, datos de la solicitud,
 * terceros relacionados, pagos de derechos y trámites asociados.
 * 
 * @export
 * @class PasoUnoPagesComponent
 */
export class PasoUnoPagesComponent {
  /**
     * Referencia al componente `SolicitanteComponent` para acceder a sus métodos y propiedades.
     */
    @ViewChild(SolicitanteComponent, { static: false })
    solicitante!: SolicitanteComponent;
    
    /**
     * Método para recopilar los valores de los formularios de todos los componentes hijos.
     * 
     * Este método organiza los datos en un objeto estructurado por secciones o pestañas.
     * 
     * @returns Un objeto que contiene los valores de los formularios de todas las secciones.
     */
   
    // collectFormValues(): {
    //   solicitante?: SolicitanteData;
    //   datosSolicitud?: CompleteForm[];
    //   tercerosRelacionados?: TercerosRelacionados[];
    //   pagoDeDerechos?: PagoDeDerechos[];
    //   tramitesAsociados?: Tramite[];
    // } {
    //   const ALL_FORM_VALUES: {
    //     solicitante?: SolicitanteData;
    //     datosSolicitud?: CompleteForm[];
    //     tercerosRelacionados?: TercerosRelacionados[];
    //     pagoDeDerechos?: PagoDeDerechos[];
    //     tramitesAsociados?: Tramite[];
    //   } = {
    //     solicitante: undefined,
    //     datosSolicitud: [],
    //     tercerosRelacionados: [],
    //     pagoDeDerechos: [],
    //     tramitesAsociados: [],
    //   };
  
    //   // Tab 1: SolicitanteComponent
    //   if (this.solicitante?.form) {
    //     ALL_FORM_VALUES.solicitante = this.solicitante.form.value as SolicitanteData;
    //   }
  
    //   // Tab 2: DatosDelSolicitudModificacionComponent
    //   if (this.datosSolicitudComponents?.length > 0) {
    //     this.datosSolicitudComponents.toArray().forEach((component) => {
    //       const CHILD_DATA: CompleteForm = {
    //         domicilioEstablecimiento: component.domicilioEstablecimiento?.value as DomicilioEstablecimiento,
    //         scianForm: component.scianForm?.value as ScianForm,
    //         solicitudEstablecimientoForm: component.solicitudEstablecimientoForm?.value as SolicitudEstablecimientoForm,
    //         formMercancias: component.formMercancias?.value as FormMercancias,
    //       };
         
    //       ALL_FORM_VALUES.datosSolicitud?.push(CHILD_DATA);
    //     });
    //   }
  
    //   // Tab 3: TercerosRelacionadosFabSeccionComponent
    //   if (this.tercerosRelacionadosComponents?.length > 0) {
    //     this.tercerosRelacionadosComponents.toArray().forEach((component) => {
    //       const CHILD_DATA: TercerosRelacionados = {
    //         facturador: component.agregarFacturadorFormGroup?.value as Facturador,
    //         fabricante: component.agregarFabricanteFormGroup?.value as Fabricante,
    //         destinatario: component.agregarDestinatarioFormGroup?.value as Destinatario,
    //         proveedor: component.agregarProveedorFormGroup?.value as Proveedor,
    //       };
    //       ALL_FORM_VALUES.tercerosRelacionados?.push(CHILD_DATA);
    //     });
    //   }
  
    //   // Tab 4: PagoDeDerechosEntradaComponent
    //   if (this.pagoDeDerechosEntradaComponent?.length > 0) {
    //     this.pagoDeDerechosEntradaComponent.toArray().forEach((component) => {
    //       if (component?.pagoDerechos) {
    //         ALL_FORM_VALUES.pagoDeDerechos?.push(component.pagoDerechos.value as PagoDeDerechos);
    //       }
    //     });
    //   }
  
    //   // Tab 5: TramitesAsociadosSeccionComponent
    //   if (this.tramitesAsociadosSeccionComponent?.length > 0) {
    //     this.tramitesAsociadosSeccionComponent.toArray().forEach((component) => {
    //       if (component.acuseTablaDatos) {
    //         ALL_FORM_VALUES.tramitesAsociados?.push(...component.acuseTablaDatos as Tramite[]);
    //       }
    //     });
    //   }
  
    //   return ALL_FORM_VALUES;
    // }
  
  
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
