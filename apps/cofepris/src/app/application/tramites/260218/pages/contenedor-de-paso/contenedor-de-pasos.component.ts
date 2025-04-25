import {
  AVISO,
  AccionBoton,
  DatosPasos,
  ListaPasosWizard,
} from '@ng-mf/data-access-user';
import { Component, ViewChild } from '@angular/core';
import { AlertComponent } from '@ng-mf/data-access-user';
import { BtnContinuarComponent } from '@ng-mf/data-access-user';
import { CommonModule } from '@angular/common';
import { PASOS } from '../../constants/pasos.enum';
import { PasoDosComponent } from '../paso-dos/paso-dos.component';
import { PasoTresComponent } from '../paso-tres/paso-tres.component';
import { PasoUnoComponent } from '../paso-uno/paso-uno.component';
import { WizardComponent } from '@ng-mf/data-access-user';

@Component({
  selector: 'app-contenedor-de-pasos',
  standalone: true,
  imports: [
    CommonModule,
    WizardComponent,
    PasoUnoComponent,
    PasoDosComponent,
    PasoTresComponent,
    BtnContinuarComponent,
    AlertComponent
],
  templateUrl: './contenedor-de-pasos.component.html',
  styleUrl: './contenedor-de-paso.component.scss',
})
export class ContenedorDePasosComponent {
  /**
     * @property {string | null} tituloMensaje
     * Título principal mostrado en la parte superior según el paso actual.
     */
    tituloMensaje: string | null =
      'Permiso sanitario de importación de dispositivos médicos destinados a pruebas de laboratorio.';
      TEXTOS: string = AVISO.Aviso;
      /**
       *
       * Una cadena que representa la clase CSS para una alerta de información.
       * Esta clase se utiliza para aplicar estilo a los mensajes de información en el componente.
       */
      public infoAlert = 'alert-info';
    

    /**
     * @property {ListaPasosWizard[]} pasos
     * Lista de pasos del wizard obtenidos desde una constante externa.
     */
    pasos: ListaPasosWizard[] = PASOS;
  
    /**
     * @property {number} indice
     * Índice actual del paso seleccionado (empieza en 1).
     */
    indice: number = 1;
  
    /**
     * @property {WizardComponent} wizardComponent
     * Referencia al componente Wizard para controlar navegación entre pasos.
     */
    @ViewChild(WizardComponent) wizardComponent!: WizardComponent;
  
    /**
     * @property {DatosPasos} datosPasos
     * Objeto de configuración utilizado por el componente wizard.
     */
    datosPasos: DatosPasos = {
      nroPasos: this.pasos.length,
      indice: this.indice,
      txtBtnAnt: 'Anterior',
      txtBtnSig: 'Continuar',
    };
  
    /**
     * @method seleccionaTab
     * @description Cambia el índice actual del wizard manualmente.
     * @param {number} i - Índice del paso al que se desea cambiar.
     */
    seleccionaTab(i: number): void {
      this.indice = i;
    }
  
    /**
     * @method getValorIndice
     * @description Controla la navegación del wizard según el botón presionado (anterior o continuar).
     * También actualiza el título correspondiente al paso actual.
     *
     * @param {AccionBoton} e - Objeto que contiene el valor y la acción del botón presionado.
     */
    getValorIndice(e: AccionBoton): void {
      if (e.valor > 0 && e.valor < 5) {
        this.indice = e.valor;
        this.tituloMensaje = ContenedorDePasosComponent.obtenerNombreDelTítulo(
          e.valor
        );
  
        if (e.accion === 'cont') {
          this.wizardComponent.siguiente();
        } else {
          this.wizardComponent.atras();
        }
      }
    }
  
    /**
     * @method obtenerNombreDelTítulo
     * @description Devuelve el título a mostrar según el número de paso.
     *
     * @param {number} valor - Índice del paso actual.
     * @returns {string} - Título correspondiente.
     */
    static obtenerNombreDelTítulo(valor: number): string {
      switch (valor) {
        case 1:
          return 'Permiso sanitario de importación de medicamentos con registro sanitario';
        case 2:
          return 'Anexar requisitos';
        case 3:
          return 'Firmar solicitud';
  
        default:
          return 'Permiso sanitario de importación de medicamentos con registro sanitario';
      }
    }
}
