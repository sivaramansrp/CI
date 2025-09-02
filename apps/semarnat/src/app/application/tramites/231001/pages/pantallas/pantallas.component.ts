/**
 * pantallas.component.ts
 * Componente que representa la página de pantallas.
 * 18 de febrero de 2025
 */

import {AdministrarResiduosComponent} from '../../components/administrar-residuos/administrar-residuos.component';
import { Component } from '@angular/core';
import {DatosDelGeneradorDeResiduosComponent} from '../../components/datos-del-generador-de-residuos/datos-del-generador-de-residuos.component';
import { ViewChild } from '@angular/core';
/**
 * Decorador que define un componente de Angular.
 * 
 * 
 * app-pantallas - El selector CSS que identifica este componente en una plantilla.
 * ./pantallas.component.html - La URL de la plantilla HTML del componente.
 * La URL de la hoja de estilos del componente.
 */
@Component({
  selector: 'app-pantallas',
  templateUrl: './pantallas.component.html',
  styles: ``,
})
export class PantallasComponent {
  // Aquí se pueden agregar propiedades y métodos para el componente.

 /**
   * Referencia al componente `solicitudComponent`.
   */
 @ViewChild('AdministrarResiduosComponent', { static: false }) solicitudComponent: AdministrarResiduosComponent | undefined;

  @ViewChild('DatosDelGeneradorDeResiduosComponent', { static: false }) datosComponent: DatosDelGeneradorDeResiduosComponent | undefined;
}