import { Component, ViewChild } from '@angular/core';
import { DatosPasos } from '@ng-mf/data-access-user';
import { ListaPasosWizard } from '@ng-mf/data-access-user';
import { PASOS } from '@libs/shared/data-access-user/src/tramites/constantes/11201/pasos.enums';
import { WizardComponent } from '@ng-mf/data-access-user';
import { ContenedorComponent } from '../../components/contenedor/contenedor.component';
interface AccionBoton {
  accion: string;
  valor: number;
}
@Component({
  selector: 'app-solicitante-page',
  templateUrl: './solicitante-page.component.html',
  styleUrl: './solicitante-page.component.scss',
})
export class SolicitantePageComponent {
  /**
   * Lista de pasos del wizard.
   *
   * Esta propiedad contiene un array de objetos `ListaPasosWizard` que representan los pasos del wizard.
   */
  pasos: Array<ListaPasosWizard> = PASOS;

  /**
   * Índice del paso actual en el wizard.
   *
   * Esta propiedad indica el índice del paso actual en el wizard, comenzando desde 1.
   */
  indice: number = 1;

  /**
   * Referencia al componente del wizard.
   *
   * Esta propiedad utiliza `@ViewChild` para obtener una referencia al componente `WizardComponent`.
   */
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;

  /**
   * Referencia al componente hijo ContenedorComponent.
   *
   * Esta propiedad utiliza el decorador `@ViewChild` para obtener una instancia del componente
   * ContenedorComponent identificado por el template reference variable 'contenedorRef'.
   * Permite acceder a las propiedades y métodos públicos del componente hijo desde este componente.
   */
  @ViewChild('contenedorRef') contenedorComponent!: ContenedorComponent;

  /**
   * Datos de los pasos del wizard.
   *
   * Esta propiedad contiene un objeto `DatosPasos` que almacena información sobre el número de pasos,
   * el índice actual, y los textos de los botones "Anterior" y "Continuar".
   */
  datosPasos: DatosPasos = {
    nroPasos: this.pasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };
  

  /**
   * Método para seleccionar una pestaña específica en el wizard.
   *
   * @param {number} i - El índice de la pestaña a seleccionar.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }
  /**
   * Método para obtener el valor del índice y actualizar el wizard.
   *
   * @param {AccionBoton} e - El objeto que contiene la acción y el valor del índice.
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
   * Método para continuar al siguiente paso en el wizard.
   */
  continuar(): void {
    this.getValorIndice({ accion: 'cont', valor: this.indice + 1 });
  }

  /**
   * Cancela la operación actual del formulario de solicitud.
   *
   * Si el formulario de solicitud (`solicitudForm`) existe en el componente contenedor,
   * restablece todos sus campos a los valores iniciales. Luego, establece el índice
   * de la página o paso actual a 1, lo que puede implicar regresar al primer paso
   * del proceso o formulario.
   */
  cancelar(): void {
    if (this.contenedorComponent.solicitudForm) {
      this.contenedorComponent.solicitudForm.reset();
    }
    this.indice = 1;
  }
}
