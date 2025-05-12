import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ContenedorDeDatosSolicitudComponent } from '../../components/contenedor-de-datos-solicitud/contenedor-de-datos-solicitud.component';
import { PagoDeDerechosComponent } from '../../components/pago-de-derechos/pago-de-derechos.component';
import { SolicitanteComponent } from '@ng-mf/data-access-user';
import { TercerosRelacionadosVistaComponent } from '../../components/terceros-relacionados-vista/terceros-relacionados-vista.component';

/**
 * PasoUnoComponent
 *
 * Este componente gestiona la primera etapa del flujo de la solicitud. Permite la selección de diferentes 
 * secciones o pasos dentro del formulario y muestra los componentes correspondientes en función de la sección seleccionada.
 */
@Component({
  selector: 'app-paso-uno',
  standalone: true,
  imports: [
    CommonModule,
    SolicitanteComponent,
    ContenedorDeDatosSolicitudComponent,
    TercerosRelacionadosVistaComponent,
    PagoDeDerechosComponent,
  ],
  templateUrl: './paso-uno.component.html',
  styleUrl: './paso-uno.component.scss',
})
export class PasoUnoComponent {
  /**
   * Indica el índice de la pestaña (o sección) seleccionada en el formulario.
   * Este valor controla qué sección se debe mostrar al usuario en la vista.
   */
  indice: number = 1;

  /**
   * Método para seleccionar la pestaña o sección en el formulario.
   * 
   * Este método asigna el valor del índice de la pestaña seleccionada al atributo `indice` de la clase,
   * lo que cambia la vista a la sección correspondiente.
   * 
   * @param {number} i - El índice de la pestaña que se desea seleccionar.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }
}
