/**
 * Componente que representa la interfaz de una cortina a la italiana.
 * Permite la navegación entre diferentes pestañas mediante un índice.
 */
import { Component } from '@angular/core';
/**
 * Componente que representa la interfaz de una cortina a la italiana.
 * Permite la navegación entre diferentes pestañas mediante un índice.
 */
@Component({
  selector: 'app-datos',
  templateUrl: './datos.component.html',
})
export class DatosComponent {  
  /**
  * Índice actual de la pestaña seleccionada.
  */
 indice: number = 1;

 /**
  * Número total de pestañas disponibles.
  */
 totalPestanas: number = 5;

 /**
  * Indica si la pestaña seleccionada es la primera.
  */
 get esPrimeraPestana(): boolean {
   return this.indice === 1;
 }

 /**
  * Indica si la pestaña seleccionada es la última.
  */
 get esUltimaPestana(): boolean {
   return this.indice === this.totalPestanas;
 }

 /**
  * Cambia la pestaña activa según el índice proporcionado.
  * @param i Número de la pestaña a seleccionar.
  */
 seleccionaTab(i: number): void {
   if (i >= 1 && i <= this.totalPestanas) {
     this.indice = i;
   }
 }

 /**
  * Avanza a la siguiente pestaña si no es la última.
  */
 avanzarTab(): void {
   if (!this.esUltimaPestana) {
     this.indice++;
   }
 }

 /**
  * Retrocede a la pestaña anterior si no es la primera.
  */
 retrocederTab(): void {
   if (!this.esPrimeraPestana) {
     this.indice--;
   }
 }

 /**
  * Reinicia la selección de pestañas al valor inicial.
  */
 resetTabs(): void {
   this.indice = 1;
 }
}