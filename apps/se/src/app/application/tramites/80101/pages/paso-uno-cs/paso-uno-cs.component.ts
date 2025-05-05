import { Component } from '@angular/core';
import { SECCIONES_TRAMITE_230401 } from '../../constantes/nuevo-programa.enum';
import { SeccionLibStore } from '@libs/shared/data-access-user/src/core/estados/seccion.store';

@Component({
  selector: 'app-paso-uno-cs',
  templateUrl: './paso-uno-cs.component.html',
})
export class PasoUnoCsComponent {

  /**
   * Índice utilizado para representar el número actual o posición en un flujo o proceso.
   * 
   * @type {number} - Valor inicializado en 1.
   */
  indice: number = 1;

  /**
   * Constructor de la clase PasoUnoCsComponent.
   * 
   * @param seccionStore - Inyección de dependencia del servicio `SeccionLibStore` 
   *                       utilizado para gestionar el estado de las secciones.
   * 
   * Este constructor inicializa el componente y llama al método `asignarSecciones` 
   * para configurar las secciones necesarias al cargar el componente.
   */
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
        const KEY = LLAVE_SECCION as keyof typeof PREDETERMINADO.PASO_1;
        SECCIONES.push(PREDETERMINADO.PASO_1[KEY]);
        FORMA_VALIDA.push(false);
      }
    }
    this.seccionStore.establecerSeccion(SECCIONES);
    this.seccionStore.establecerFormaValida(FORMA_VALIDA);
  }
}
