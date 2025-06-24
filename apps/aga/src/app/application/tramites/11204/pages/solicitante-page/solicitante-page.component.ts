import { ANEXAR, CARGAR } from '../../enums/datos-tramite.enum';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DatosPasos } from '@ng-mf/data-access-user';
import { ListaPasosWizard } from '@ng-mf/data-access-user';
import { PASOS } from '@ng-mf/data-access-user';
import { WizardComponent } from '@ng-mf/data-access-user';

/**
 * Interfaz que representa una AccionBoton.
 * Utilizamos esta interfaz para definir la estructura de los datos de una AccionBoton.
 */
interface AccionBoton {
  accion: string;
  valor: number;
}

@Component({
  selector: 'app-solicitante-page',
  templateUrl: './solicitante-page.component.html',
  styleUrl: './solicitante-page.component.scss',
})
export class SolicitantePageComponent implements OnInit {
  /**
   * Arreglo que contiene los pasos del wizard.
   */
  pasos: Array<ListaPasosWizard> = PASOS;

  /**
   * Índice de la pestaña actual.
   */
  indice: number = 1;

  /**
   * Referencia al componente Wizard.
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
   * Método de inicialización del componente.
   * Se ejecuta al inicializar el componente y actualiza el título del segundo paso.
   */
  ngOnInit(): void {
    this.pasos = PASOS;
    this.pasos = this.pasos.map((paso) => {
      if (paso.indice === 2 && paso.titulo === ANEXAR.label) {
        return { ...paso, titulo: CARGAR.label };
      }
      return paso;
    });
  }

  /**
   * Selecciona una pestaña.
   * @param i El índice de la pestaña a seleccionar.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }

  /**
   * Obtiene el valor del índice y navega en el wizard.
   * @param e El evento de acción del botón.
   */
  getValorIndice(e: AccionBoton): void {
    if (e.valor > 0 && e.valor < 6) {
      this.indice = e.valor;
      this.datosPasos.indice = this.indice;
      if (e.accion === 'cont') {
        this.wizardComponent.siguiente();
      } else {
        this.wizardComponent.atras();
      }
    }
  }

  /**
   * Emite el evento continuar.
   */
  continuar(): void {
    this.getValorIndice({ accion: 'cont', valor: this.indice + 1 });
  }
}
