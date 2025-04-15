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
      const ALL_FORM_VALUES: any = {};
    
      // Collect values for each tab
    
      if (this.solicitante?.form) {
       
        ALL_FORM_VALUES.solicitante = this.solicitante.form.value;
      } 
    
      if (this.datosSolicitudComponents?.length > 0) {
        this.datosSolicitudComponents.toArray().forEach((component, index) => {
          if (component?.domicilioEstablecimiento) {
          
            ALL_FORM_VALUES[`datosSolicitud_${index}`] = component.domicilioEstablecimiento.value;
          }
          if (component?.scianForm) {
           
            ALL_FORM_VALUES[`datosSolicitud_${index}_scian`] = component.scianForm.value;
          }
          if (component?.solicitudForm) {
            
            ALL_FORM_VALUES[`datosSolicitud_${index}_solicitud`] = component.solicitudForm.value;
          }
          if (component?.solicitudEstablecimientoForm) {
         
            ALL_FORM_VALUES[`datosSolicitud_${index}_solicitudEstablecimiento`] = component.solicitudEstablecimientoForm.value;
          }
          if (component?.formMercancias) {
          
            ALL_FORM_VALUES[`datosSolicitud_${index}_formMercancias`] = component.formMercancias.value;
          }
        });
      } 
    
      if (this.tercerosRelacionadosComponents?.length > 0) {
        this.tercerosRelacionadosComponents.toArray().forEach((component, index) => {
          if (component?.agregarFacturadorFormGroup) {
           
            ALL_FORM_VALUES[`tercerosRelacionados_${index}_facturador`] = component.agregarFacturadorFormGroup.value;
          }
          if (component?.agregarFabricanteFormGroup) {
           
            ALL_FORM_VALUES[`tercerosRelacionados_${index}_fabricante`] = component.agregarFabricanteFormGroup.value;
          }
          if (component?.agregarDestinatarioFormGroup) {
          
            ALL_FORM_VALUES[`tercerosRelacionados_${index}_destinatario`] = component.agregarDestinatarioFormGroup.value;
          }
          if (component?.agregarProveedorFormGroup) {
           
            ALL_FORM_VALUES[`tercerosRelacionados_${index}_proveedor`] = component.agregarProveedorFormGroup.value;
          }
        });
      }
    
      if (this.pagoDeDerechosEntradaComponent?.length > 0) {
        this.pagoDeDerechosEntradaComponent.toArray().forEach((component, index) => {
          if (component?.pagoDerechos) {
          
            ALL_FORM_VALUES[`pagoDeDerechos_${index}`] = component.pagoDerechos.value;
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
    
      // Delay fetching form values to ensure child components are rendered
      // setTimeout(() => {
      //   const formValues = this.collectFormValues();
      //   console.log('Form Values for Selected Tab:', formValues);
      // }, 0);
    }
}
