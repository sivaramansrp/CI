/**
 * Archivo de componente DatosComponent.
 */
import { Component, ViewChild } from '@angular/core';
import { DatosPasos, ListaPasosWizard, WizardComponent } from '@libs/shared/data-access-user/src';
import { AccionBoton } from '../../modelos/aviso-importacion-maquinas.model';
import { PASOS } from '../../constants/aviso-importacion-maquinas.enum';

/**
 * Componente DatosComponent.
 *
 * Este componente gestiona la selección de pestañas (tabs) y muestra contenido diferente
 * basado en el índice de la pestaña seleccionada.
 */
@Component({
  selector: 'app-datos',
  templateUrl: './datos.component.html',
  standalone: false, // Indica que este componente no es un componente independiente (standalone).
})
export class DatosComponent {

   /**
    * Referencia al componente WizardComponent.
    */
   @ViewChild(WizardComponent) wizardComponent!: WizardComponent;
 
   /**
    * Variable utilizada para almacenar la lista de pasos.
    */
   pantallasPasos: ListaPasosWizard[] = PASOS;
 
   /**
    * Variable utilizada para almacenar el índice del paso actual.
    */
   indice: number = 1;
 
   /**
    * Datos para los pasos en el asistente.
    */
   datosPasos: DatosPasos = {
     nroPasos: this.pantallasPasos.length,
     indice: this.indice,
     txtBtnAnt: 'Anterior',
     txtBtnSig: 'Continuar',
   };
 
   /**
    * Actualiza el valor del índice según el evento del botón de acción.
    * @param e El evento del botón de acción que contiene la acción y el valor.
    */
   public getValorIndice(e: AccionBoton): void {
     if (e.valor > 0 && e.valor < 5) {
       this.indice = e.valor;
       if (e.accion === 'cont') {
         this.wizardComponent.siguiente();
       } else {
         this.wizardComponent.atras();
       }
     }
   }
}
