import {
  BtnContinuarComponent,
  DatosPasos,
} from '@ng-mf/data-access-user';
import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaPasosWizard } from '@ng-mf/data-access-user';
import { PASOS } from '@ng-mf/data-access-user';
import { PasoTresComponent } from '../../../11105/pages/paso-tres/paso-tres.component';
import { PasoUnoComponent } from '../../../11105/pages/paso-uno/paso-uno.component';
import { ReactiveFormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { WizardComponent } from '@ng-mf/data-access-user';

/**
 * Interfaz para definir la estructura de una acción de botón.
 */
interface AccionBoton {
  /**
   * Acción a realizar (e.g., 'cont' para continuar, 'ant' para retroceder).
   */
  accion: string;

  /**
   * Valor del índice asociado a la acción.
   */
  valor: number;
}

/**
 * Componente para gestionar la página del solicitante.
 */
@Component({
  standalone: true,
  imports: [
    WizardComponent,
    CommonModule,
    BtnContinuarComponent,
    PasoTresComponent,
    PasoUnoComponent,
    ReactiveFormsModule,
  ],
  selector: 'app-solicitante-page',
  templateUrl: './solicitante-page.component.html',
  styleUrl: './solicitante-page.component.scss',
})
export class SolicitantePageComponent implements OnInit {
  /**
   * Lista de pasos del wizard.
   */
  pasos: Array<ListaPasosWizard> = PASOS.slice(0, 2);

  /**
   * Índice del paso actual.
   */
  indice: number = 1;

  /**
   * Notificador para destruir las suscripciones.
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * Referencia al componente del wizard.
   */
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;

  /**
   * Datos de los pasos del wizard.
   */
  datosPasos: DatosPasos = {
    nroPasos: this.pasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };

  /**
   * Constructor de la clase.
   */
  constructor() {
    // El constructor se utiliza para la inyección de dependencias.
  }

  /**
   * Método que se ejecuta al inicializar el componente.
   * Configura los pasos del wizard y ajusta el título de un paso específico si es necesario.
   */
  ngOnInit(): void {
    this.pasos = PASOS.slice(0, 2);
    this.pasos = this.pasos.map((paso) => {
      if (paso.indice === 2 && paso.titulo === 'Anexar necesarios') {
        return { ...paso, titulo: 'Firmar solicitud' };
      }
      return paso;
    });
  }

  /**
   * Selecciona una pestaña del wizard.
   * @param i - Índice de la pestaña a seleccionar.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }

  /**
   * Obtiene el valor del índice del evento de acción del botón.
   * Navega hacia adelante o hacia atrás en el wizard según la acción especificada.
   * @param e - Evento de acción del botón.
   */
  getValorIndice(e: AccionBoton): void {
    if (e.valor > 0 && e.valor < 6) {
      this.indice = e.valor;
      if (e.accion === 'cont') {
        this.wizardComponent.siguiente();
      } else {
        this.wizardComponent.atras();
      }
    }
  }
}