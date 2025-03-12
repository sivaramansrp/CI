import { Component } from '@angular/core';
import { SECCIONES_TRAMITE_230401 } from '../../enum/pantallas-constante.enum';
import { SeccionLibStore } from '@libs/shared/data-access-user/src/core/estados/seccion.store';

@Component({
  selector: 'app-paso-uno-cs',
  templateUrl: './paso-uno-cs.component.html',
})
export class PasoUnoCsComponent {
  indice: number = 1;

  constructor(private seccionStore: SeccionLibStore){
    this.asignarSecciones();
  }


  /**
   * Selecciona una pestaña específica.
   * @param i - El índice de la pestaña a seleccionar.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }

  /**
  * Método para asignar las secciones existentes al stored
  */
  private asignarSecciones(): void {
    const SECCIONES: boolean[] = [];
    const FORMA_VALIDA: boolean[] = [];
    const PREDETERMINADO = SECCIONES_TRAMITE_230401
    for (const LLAVE_SECCION in PREDETERMINADO.PASO_1) {
      if (Object.prototype.hasOwnProperty.call(PREDETERMINADO.PASO_1, LLAVE_SECCION)) {
        // @ts-expect-error - fix this
        SECCIONES.push(PREDETERMINADO.PASO_1[LLAVE_SECCION]);
        FORMA_VALIDA.push(false);
      }
    }
    this.seccionStore.establecerSeccion(SECCIONES);
    this.seccionStore.establecerFormaValida(FORMA_VALIDA);
  }
}
