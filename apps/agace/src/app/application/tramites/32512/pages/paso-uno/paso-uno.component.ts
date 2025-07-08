import { AvisoComponent } from '../../components/aviso/aviso.component';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { OnDestroy } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SolicitanteComponent } from '@libs/shared/data-access-user/src';
import { Subject } from 'rxjs';
import { ViewChild } from '@angular/core';

/**
 * Componente que representa el primer paso de un trámite.
 * Maneja la visualización y activación de diferentes secciones (tabs) según el tipo de endoso.
 */
@Component({
  selector: 'app-paso-uno',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SolicitanteComponent,
    AvisoComponent,
  ],
  templateUrl: './paso-uno.component.html',
  styleUrls: ['./paso-uno.component.scss'],
})
export class PasoUnoComponent implements OnDestroy {
  /**
   * Notificador para destruir las suscripciones y evitar fugas de memoria.
   * Este `Subject` se utiliza para cancelar las suscripciones activas cuando
   * el componente se destruye.
   */
  destroyNotifier$: Subject<void> = new Subject();

  /** Datos de respuesta del servidor utilizados para actualizar el formulario. */
  public esDatosRespuesta: boolean = false;

  @ViewChild(AvisoComponent) avisoComponent!: AvisoComponent;

  /**
   * Constructor del componente.
   */
  constructor() {
    //Constructor del componente.
  }

  /**
   * Índice utilizado para identificar la pestaña activa dentro del paso.
   * @type {number}
   */
  indice: number = 1;

  /**
   * Determina si la pestaña de modificación de denominación o razón social debe estar habilitada.
   * @type {boolean}
   */
  isEnableModificacionTab: boolean = false;

  /**
   * Cambia la pestaña activa según el índice proporcionado.
   * @param i - El índice de la pestaña que se desea activar.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }

  /**
   * Maneja el cambio de tipo de endoso y habilita o deshabilita la pestaña de modificación
   * dependiendo del valor seleccionado.
   *
   * @param evento - El tipo de endoso seleccionado (puede ser string o número).
   */
  tipoDeEndosoChanges(evento: string | number): void {
    if (evento === 3) {
      this.isEnableModificacionTab = true;
    } else {
      this.isEnableModificacionTab = false;
    }
  }

  /**
   * Método que se ejecuta al destruir el componente.
   * Este método emite un valor al `destroyNotifier$` y lo completa para cancelar
   * todas las suscripciones activas y evitar fugas de memoria.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
