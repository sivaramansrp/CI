import {
  BtnContinuarComponent,
  DatosPasos,
  ListaPasosWizard,
  PASOS,
  WizardComponent,
} from '@ng-mf/data-access-user';
import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PasoTresComponent } from '../paso-tres/paso-tres.component';
import { PasoUnoComponent } from '../paso-uno/paso-uno.component';


/**
 * Interfaz que define la estructura de una acción de botón.
 */
interface AccionBoton {
  /**
   * La acción que se realizará.
   */
  accion: string;

  /**
   * El valor asociado a la acción.
   */
  valor: number;
}

/**
 * Componente que representa la página de solicitud.
 */
@Component({
  templateUrl: './solicitud-page.component.html',
  styles: ``,
  standalone: true,
  imports: [
    WizardComponent,
    BtnContinuarComponent,
    PasoUnoComponent,
    PasoTresComponent,
    CommonModule,
  ],
})
export class SolicitudPageComponent implements OnInit {
/**
   * Referencia al componente del asistente.
   */
@ViewChild(WizardComponent) wizardComponent!: WizardComponent;
 /**
   * Lista de pasos del asistente.
   */
 pasos: ListaPasosWizard[] = PASOS;
 /**
  * Índice del paso actual.
  */
 indice: number = 1;
/**
   * Número del paso actual.
   */
nombre: number = 1;

isNumeroDe!: boolean;

isNumeroDatos: boolean = false;

isNumeroPattern!: boolean;
 
  /**
   * Datos de los pasos del asistente.
   */
  datosPasos: DatosPasos = {
    nroPasos: this.pasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };
/**
   * Inicializa el componente.
   * Filtra y mapea los pasos del asistente para excluir y reorganizar pasos específicos.
   */
  ngOnInit(): void {
    this.pasos = this.pasos
      .filter((step) => step.indice !== 2)
      .map((step) => (step.indice === 3 ? { ...step, indice: 2 } : step));
  }
  
  /**
   * Selecciona una pestaña del asistente.
   * @param i Índice de la pestaña a seleccionar.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }

  /**
   * Obtiene el valor del índice de la acción del botón.
   * @param e Acción del botón.
   */
  getValorIndice(e: AccionBoton): void {
    this.alEventoHijo(this.nombre);

    if (e.valor > 0 && e.valor < 5) {
      this.indice = e.valor;
      if (e.accion === 'cont') {
        this.nombre = 1;
        this.wizardComponent.siguiente();
      } else {
        this.wizardComponent.atras();
      }
    }
  }
/**
   * Maneja el evento emitido por un componente hijo.
   * 
   * @param event Número del evento emitido.
   */
  alEventoHijo(event: number): void {
    this.nombre = event;
  }

  isNumeroDeCertificado(event: boolean) {
     this.isNumeroDe = event;
  }

  isNumeroDePattern(event: boolean) {
    this.isNumeroPattern = event;
  }

  getDatosCertificado(event:number){
    this.nombre = event;
    
  }

  isDatosNumero(event:boolean){
    this.isNumeroDatos = event;
    if(!this.isNumeroDatos){
       this.getValorIndice({
      accion: 'cont',
      valor: 2,})
    }
  }

}
