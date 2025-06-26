import { AccionBoton } from '@ng-mf/data-access-user';
import { Component } from '@angular/core';
import { DatosPasos } from '@ng-mf/data-access-user';
import { ListaPasosWizard } from '@ng-mf/data-access-user';
import { PASOS } from '@ng-mf/data-access-user';
import { TITULOMENSAJE } from '../../constants/solicitude-de-artificios-pirotecnicos.enum';
import { ViewChild } from '@angular/core';
import { WizardComponent } from '@ng-mf/data-access-user';

/**
 * Componente principal que contiene el flujo del trámite a través de un wizard dividido en pasos.
 * Administra la navegación entre pasos del trámite y organiza los componentes visuales del flujo.
 */
@Component({
  selector: 'app-solicitud-page',
  standalone: false,
  templateUrl: './solicitud-page.component.html',
  styleUrl: './solicitud-page.component.scss',
})
/**
 * Clase que representa la página de solicitud del trámite de artificios pirotécnicos.
 * Contiene la lógica para gestionar el wizard de pasos, incluyendo la navegación y el título mostrado.
 */
export class SolicitudPageComponent {
  /**
   * Título que se muestra en la parte superior del wizard.
   * Se actualiza dependiendo del paso seleccionado.
   */
  public tituloMensaje: string | null = TITULOMENSAJE;

  /**
   * Listado de pasos definidos para el wizard, incluyendo información y componentes asociados.
   */
  public pasos: ListaPasosWizard[] = PASOS;

  /**
   * Índice del paso actual en el wizard.
   */
  public indice: number = 1;

  /**
   * Referencia al componente `WizardComponent`, utilizada para invocar métodos de navegación interna como `siguiente()` y `atras()`.
   */
  @ViewChild(WizardComponent)
  public wizardComponent!: WizardComponent;

  /**
   * Configuración de la barra de navegación del wizard:
   * número de pasos, índice actual y textos de los botones.
   */
  public datosPasos: DatosPasos = {
    nroPasos: this.pasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };

  /**
   * Permite cambiar el paso actual de forma manual al hacer clic en las pestañas (tabs) del wizard.
   * Recibe el índice del paso seleccionado y lo asigna a la propiedad `indice`.
   * @param i índice del paso seleccionado
   */
  public seleccionaTab(i: number): void {
    this.indice = i;
  }

  /**
   * Controla la navegación del wizard en función de la acción recibida (`cont` o `atras`).
   * Actualiza el paso actual y el título mostrado, y llama a los métodos de navegación del `WizardComponent`.
   * @param e Objeto que contiene el índice del paso y la acción a realizar.
   */
  public getValorIndice(e: AccionBoton): void {
    if (e.valor > 0 && e.valor < 5) {
      this.indice = e.valor;
      this.tituloMensaje = SolicitudPageComponent.obtenerNombreDelTítulo(
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
   * Método estático que determina el título a mostrar de acuerdo al índice del paso actual.
   * Devuelve el título correspondiente según el valor recibido.
   * @param valor Índice del paso.
   * @returns Título correspondiente al paso.
   */
  public static obtenerNombreDelTítulo(valor: number): string {
    switch (valor) {
      case 1:
        return TITULOMENSAJE;
      case 2:
        return 'Anexar requisitos';
      case 3:
        return 'Firmar';
      default:
        return TITULOMENSAJE;
    }
  }
}