/**
 * Componente para la modificación de permisos de importación de tratamientos.
 */
import { Component, ViewChild } from '@angular/core';
import { Renuncia } from '../../models/renuncia-de-permiso.model';
import { RenunciaDeDerechosComponent } from '../../components/renuncia-de-derechos/renuncia-de-derechos.component';
import { SolicitanteComponent } from '@libs/shared/data-access-user/src';
import { SolicitanteData } from '../../models/renuncia-de-permiso.model';

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
     * Referencia al componente `RenunciaDeDerechosComponent` para acceder a sus métodos y propiedades.
     */
    @ViewChild(RenunciaDeDerechosComponent)
    renunciaDeDerechosComponent!: RenunciaDeDerechosComponent;
    
    /**
     * Método para recopilar los valores de los formularios de todos los componentes hijos.
     * 
     * Este método organiza los datos en un objeto estructurado por secciones o pestañas.
     * 
     * @returns Un objeto que contiene los valores de los formularios de todas las secciones.
     */
   
    collectFormValues(): {
      solicitante?: SolicitanteData;
      renuncia?: Renuncia;
    } {
      const ALL_FORM_VALUES: {
        solicitante?: SolicitanteData;
        renuncia?: Renuncia;
      } = {
        solicitante: undefined,
        renuncia: undefined
      };
  
      // Tab 1: SolicitanteComponent
      if (this.solicitante?.form) {
        ALL_FORM_VALUES.solicitante = this.solicitante.form.value as SolicitanteData;
      }
  
      // Tab 2: RenunciaDeDerechosComponent
      if (this.renunciaDeDerechosComponent?.renunciaDerechosForm) {
        ALL_FORM_VALUES.renuncia = this.renunciaDeDerechosComponent.renunciaDerechosForm.value as Renuncia
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
