import { AdicionFraccionComponent } from '../../components/adicionFraccion/adicionFraccion.component';
import { AdicionProcesosComponent } from '../../components/adicionProcesos/adicionProcesos.component';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FusionOEscisionComponent } from '../../components/fusionOEscision/fusionOEscision.component';
import { ModificacionGoceInmuebleComponent } from '../../components/modificacionGoceInmueble/modificacionGoceInmueble.component';
import { ModificacionSociosComponent } from '../../components/modificacionSocios/modificacionSocios.component';
import { ProveedorExtranjeroComponent } from '../../components/proveedorExtranjero/proveedorExtranjero.component';
import { SolicitanteComponent } from '@ng-mf/data-access-user';
import { TipoDeAvisoComponent } from '../../components/tipoDeAviso/tipoDeAviso.component';

/**
 * Interfaz que define las propiedades relacionadas con los tipos de aviso que se seleccionan en el formulario
 * */
export interface TipoDevAviso {
  foreignClientsSuppliers: boolean; // Indica si se selecciona el tipo 'Clientes/proveedores extranjeros'
  nationalSuppliers: boolean; // Indica si se selecciona el tipo 'Proveedores nacionales'
  modificationsMembers: boolean; // Indica si se selecciona 'Modificaciones de miembros'
  changesToLegalDocuments: boolean; // Indica si se seleccionan 'Cambios a documentos legales'
  mergerOrSplitNotice: boolean; // Indica si se selecciona 'Aviso de fusión o escisión'
  additionFractions: boolean; // Indica si se selecciona 'Adición de fracciones'
}

@Component({
  selector: 'app-paso-uno', // Selector del componente para el paso 1
  standalone: true, // El componente es autónomo y no depende de otros módulos
  imports: [
    CommonModule,
    SolicitanteComponent,
    TipoDeAvisoComponent,
    ProveedorExtranjeroComponent,
    ModificacionSociosComponent,
    ModificacionGoceInmuebleComponent,
    FusionOEscisionComponent,
    AdicionFraccionComponent,
    AdicionProcesosComponent,
  ], // Importación de los componentes utilizados
  templateUrl: './PasoUno.component.html', // Ruta al archivo HTML
})
export class PasoUnoComponent {
  indice: number = 1; // Índice que determina qué sección está activa en el paso

  // Objeto que almacena los valores seleccionados para los tipos de aviso
  datosInputCheck: TipoDevAviso = {
    foreignClientsSuppliers: false,
    nationalSuppliers: false,
    modificationsMembers: false,
    changesToLegalDocuments: false,
    mergerOrSplitNotice: false,
    additionFractions: false,
  };

  /**
   * Método que selecciona la pestaña activa basada en el índice proporcionado.
   * @param i El índice de la pestaña a seleccionar.
   */
  seleccionaTab(i: number): void {
    this.indice = i; // Actualiza el índice para cambiar la pestaña activa
  }

  /**
   * Método que actualiza los valores de 'datosInputCheck' cuando se seleccionan diferentes opciones en el formulario.
   * @param event Los valores seleccionados por el usuario para los tipos de aviso.
   */
  getValoreEnable(event: TipoDevAviso): void {
    this.datosInputCheck = event; // Actualiza los valores con la selección actual
  }
}
