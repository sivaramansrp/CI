import { AfterViewInit, Component, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { SolicitanteComponent, TIPO_PERSONA } from '@libs/shared/data-access-user/src';
import { DatosDelSolicitudModificacionComponent } from '../../../../shared/components/datos-del-solicitud-modificacion/datos-del-solicitud-modificacion.component';
import { TercerosRelacionadosFabSeccionComponent } from '../../../../shared/components/terceros-relacionados-fab-seccion/terceros-relacionados-fab-seccion.component';
import { PagoDeDerechosEntradaComponent } from '../../../../shared/components/pago-de-derechos-entrada/pago-de-derechos-entrada.component';
import { TramitesAsociadosSeccionComponent } from '../../../../shared/components/tramites-asociados-seccion/tramites-asociados-seccion.component';

@Component({
  selector: 'app-paso-uno-pages',
  templateUrl: './paso-uno-pages.component.html',
})
export class PasoUnoPagesComponent implements AfterViewInit {
   
     /**
     * Referencia al componente SolicitanteComponent para acceder a sus métodos y propiedades.
     */
     @ViewChild(SolicitanteComponent ,{ static: false }) solicitante!: SolicitanteComponent;
     @ViewChildren(DatosDelSolicitudModificacionComponent) datosSolicitudComponents!: QueryList<DatosDelSolicitudModificacionComponent>;
     @ViewChildren(TercerosRelacionadosFabSeccionComponent) tercerosRelacionadosComponents!: QueryList<TercerosRelacionadosFabSeccionComponent>;
     @ViewChildren(PagoDeDerechosEntradaComponent) pagoDeDerechosEntradaComponent!: QueryList<PagoDeDerechosEntradaComponent>;
     @ViewChildren(TramitesAsociadosSeccionComponent) tramitesAsociadosSeccionComponent!: QueryList<TramitesAsociadosSeccionComponent>;
    
     payload: any = {}; // Object to store all form values
     /**
      * Se ejecuta después de que la vista ha sido inicializada.
      * Llama al método `obtenerTipoPersona` del componente SolicitanteComponent
      * para establecer el tipo de persona como MORAL_NACIONAL.
      */
     ngAfterViewInit(): void {
   
     // this.collectFormValues();
    }

    collectFormValues(): any {
      const ALL_FORM_VALUES: any = {
        solicitante: null,
        datosSolicitud: [],
        tercerosRelacionados: [],
        pagoDeDerechos: [],
        tramitesAsociados: [],
      };
    
      console.log('Starting to collect values from all tabs...');
    
      // Tab 1: SolicitanteComponent
      if (this.solicitante?.form) {
        console.log('Tab 1: Solicitante Form:', this.solicitante.form.value);
        ALL_FORM_VALUES.solicitante = this.solicitante.form.value;
      } else {
        console.log('Tab 1: SolicitanteComponent is not initialized or does not have a form.');
      }
    
      // Tab 2: DatosDelSolicitudModificacionComponent
      if (this.datosSolicitudComponents?.length > 0) {
        this.datosSolicitudComponents.toArray().forEach((component, index) => {
          const childData: any = {};
          if (component?.domicilioEstablecimiento) {
            childData.domicilioEstablecimiento = component.domicilioEstablecimiento.value;
          }
          if (component?.scianForm) {
            childData.scianForm = component.scianForm.value;
          }
          if (component?.solicitudForm) {
            childData.solicitudForm = component.solicitudForm.value;
          }
          if (component?.solicitudEstablecimientoForm) {
            childData.solicitudEstablecimientoForm = component.solicitudEstablecimientoForm.value;
          }
          if (component?.formMercancias) {
            childData.formMercancias = component.formMercancias.value;
          }
          ALL_FORM_VALUES.datosSolicitud.push(childData);
        });
      } else {
        console.log('Tab 2: DatosDelSolicitudModificacionComponent is not initialized or has no instances.');
      }
    
      // Tab 3: TercerosRelacionadosFabSeccionComponent
      if (this.tercerosRelacionadosComponents?.length > 0) {
        this.tercerosRelacionadosComponents.toArray().forEach((component, index) => {
          const childData: any = {};
          if (component?.agregarFacturadorFormGroup) {
            childData.facturador = component.agregarFacturadorFormGroup.value;
          }
          if (component?.agregarFabricanteFormGroup) {
            childData.fabricante = component.agregarFabricanteFormGroup.value;
          }
          if (component?.agregarDestinatarioFormGroup) {
            childData.destinatario = component.agregarDestinatarioFormGroup.value;
          }
          if (component?.agregarProveedorFormGroup) {
            childData.proveedor = component.agregarProveedorFormGroup.value;
          }
          ALL_FORM_VALUES.tercerosRelacionados.push(childData);
        });
      } else {
        console.log('Tab 3: TercerosRelacionadosFabSeccionComponent is not initialized or has no instances.');
      }
    
      // Tab 4: PagoDeDerechosEntradaComponent
      if (this.pagoDeDerechosEntradaComponent?.length > 0) {
        this.pagoDeDerechosEntradaComponent.toArray().forEach((component, index) => {
          if (component?.pagoDerechos) {
            ALL_FORM_VALUES.pagoDeDerechos.push(component.pagoDerechos.value);
          }
        });
      } else {
        console.log('Tab 4: PagoDeDerechosEntradaComponent is not initialized or has no instances.');
      }
    
      // Tab 5: TramitesAsociadosSeccionComponent
      if (this.tramitesAsociadosSeccionComponent?.length > 0) {
        this.tramitesAsociadosSeccionComponent.toArray().forEach((component, index) => {
          if (component.acuseTablaDatos) {
            console.log(`Tab 5: TramitesAsociadosSeccionComponent[${index}] Data:`, component.acuseTablaDatos);
            ALL_FORM_VALUES.tramitesAsociados.push(...component.acuseTablaDatos); // Collect data from all instances
          }
        });
      } else {
        console.log('Tab 5: TramitesAsociadosSeccionComponent is not initialized or has no instances.');
      }
    
      console.log('Collected All Form Values in Parent-Child Format:', ALL_FORM_VALUES);
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
    
      // Delay fetching form values to ensure child components are rendered
      // setTimeout(() => {
      //   const formValues = this.collectFormValues();
      //   console.log('Form Values for Selected Tab:', formValues);
      // }, 0);
    }
}
