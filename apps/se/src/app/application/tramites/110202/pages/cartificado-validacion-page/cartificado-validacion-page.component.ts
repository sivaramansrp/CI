import { AlertComponent, BtnContinuarComponent, PAGO_DE_DERECHOS, SeccionLibStore } from '@ng-mf/data-access-user';
import { Component, ViewChild } from '@angular/core';
import {DatosPasos, ListaPasosWizard, WizardComponent} from '@libs/shared/data-access-user/src';
import { Subject, takeUntil } from 'rxjs';
import { PASOS } from '../../constantes/modificacion.enum';
import { PasoDosComponent } from '../paso-dos/paso-dos.component';
import { PasoUnoComponent } from '../paso-uno/paso-uno.component';
import { Tramite110202Query } from '../../estados/tramite110202.query';
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

@Component({
  selector: 'app-cartificado-validacion-page',
  standalone: true,
  imports: [
    WizardComponent,
    BtnContinuarComponent,
    PasoUnoComponent,
    PasoDosComponent,AlertComponent
  ],
  templateUrl: './cartificado-validacion-page.component.html',
  styleUrl: './cartificado-validacion-page.component.scss'
})
export class CartificadoValidacionPageComponent {
  /**
   * Lista de pasos del asistente.
   * Contiene un arreglo con los pasos definidos en `PASOS` que será utilizado en el wizard.
   */
  pasos: ListaPasosWizard[] = PASOS;

  /**
   * Índice del paso actual.
   * Este valor se utiliza para determinar qué paso está activo en el wizard.
   * Inicialmente se establece en 1, que corresponde al primer paso.
   */
  /**
   * Notificador para destruir los observables y evitar posibles fugas de memoria.
   * @private
   * @type {Subject<void>}
   */
  destroyNotifier$: Subject<void> = new Subject();

  constructor(private seccionStore: SeccionLibStore, private tramiteQuery: Tramite110202Query,
  ) {
    this.tramiteQuery.FormaValida$.pipe(
      takeUntil(this.destroyNotifier$)
    ).subscribe((res) => {
      this.seccionStore.establecerSeccion([true]);
      this.seccionStore.establecerFormaValida([res]);
    });
  }
   /** 
   * Índice del paso actual del wizard.
   * Representa la pestaña activa principal.
   */
  indice: number = 1;
  /**
   * Controla si se debe mostrar la alerta en pantalla.
   * Se activa cuando el subíndice del child componente es 3.
   */
  mostrarAlerta: boolean = false;

  /**
   * Referencia al componente del asistente (wizard).
   * Se utiliza para interactuar con el wizard y controlar su flujo (pasar a siguiente paso, ir al anterior, etc.).
   */
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;

  /**
   * Datos de los pasos del asistente.
   * Incluye el número total de pasos, el índice del paso actual y los textos de los botones de navegación (Anterior, Continuar).
   */
  datosPasos: DatosPasos = {
    nroPasos: this.pasos.length, // Número total de pasos en el asistente
    indice: this.indice, // Índice del paso actual
    txtBtnAnt: 'Anterior', // Texto del botón "Anterior"
    txtBtnSig: 'Continuar', // Texto del botón "Continuar"
  };

  /**
   * Clase CSS utilizada para mostrar alertas informativas.
   * Esta clase se aplica a los mensajes de información que se muestran en el componente.
   */
  public infoAlert = 'alert-info';

  /**
   * Una constante que contiene el valor del objeto 'PAGO_DE_DERECHOS'.
   * Esta constante se usa para almacenar textos y valores relacionados con el pago de derechos.
   */
  TEXTOS = PAGO_DE_DERECHOS;

  /**
   * Selecciona una pestaña del asistente (wizard).
   * Este método actualiza el índice del paso seleccionado y, por lo tanto, cambia el paso que se está mostrando.
   * 
   * @param i Índice de la pestaña a seleccionar (paso).
   */
  seleccionaTab(i: number): void {
    // Actualiza el índice del paso seleccionado
    this.indice = i;
  }

  /**
   * Obtiene el valor del índice de la acción del botón.
   * Este método controla el cambio de paso en el wizard dependiendo de la acción del botón presionado.
   * 
   * Si la acción es 'cont', pasa al siguiente paso. Si la acción es 'atras', regresa al paso anterior.
   * 
   * @param e Acción del botón (cont o atras) y el valor asociado a la acción.
   */
  getValorIndice(e: AccionBoton): void {
    // Verifica si el valor de la acción está en el rango adecuado
    if (e.valor > 0 && e.valor < 5) {
      // Actualiza el índice del paso basado en el valor de la acción
      this.indice = e.valor;

      // Dependiendo de la acción, avanza o retrocede en el wizard
      if (e.accion === 'cont') {
        // Si la acción es 'cont', avanza al siguiente paso
        this.wizardComponent.siguiente();
      } else {
        // Si la acción es 'atras', retrocede al paso anterior
        this.wizardComponent.atras();
      }
    }
  }

}
