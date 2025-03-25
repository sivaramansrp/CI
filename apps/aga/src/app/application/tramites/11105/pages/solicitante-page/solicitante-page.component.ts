import { Component, ViewChild } from '@angular/core';
import { DatosPasos } from '@ng-mf/data-access-user';
import { ListaPasosWizard } from '@ng-mf/data-access-user';
import { PASOS } from '@ng-mf/data-access-user';
import { Subject} from 'rxjs';
import { WizardComponent } from '@ng-mf/data-access-user';

/**
 * Interfaz para definir la estructura de una acción de botón.
 */
interface AccionBoton {
  accion: string;
  valor: number;
}

/**
 * Componente para gestionar la página del solicitante.
 */
@Component({
  selector: 'app-solicitante-page',
  templateUrl: './solicitante-page.component.html',
  styleUrl: './solicitante-page.component.scss',
})
export class SolicitantePageComponent {
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

  constructor() {}

  /**
   * Método que se ejecuta al inicializar el componente.
   */
  ngOnInit() {
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
   * @param e - Evento de acción del botón.
   */
  getValorIndice(e: AccionBoton) {
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
