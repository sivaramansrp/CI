import { AccionBoton, DatosPasos, ListaPasosWizard, WizardComponent } from '@libs/shared/data-access-user/src';
import { Component, ViewChild } from '@angular/core';
import { PERMISO_MAQUILA } from '../../constantes/enmienda-permiso-sanitario.enum';
/**
 * Componente para la modificación del permiso de laboratorio.
 */
@Component({
  selector: 'app-modificacion-permiso-lab',
  templateUrl: './modificacion-permiso-lab.component.html',
})
export class ModificacionPermisoLabComponent {
    /**
     * Referencia al componente del asistente (wizard) para controlar sus acciones.
     */
    @ViewChild(WizardComponent) wizardComponent!: WizardComponent;
    /**
       * Esta variable se utiliza para almacenar la lista de pasos.
       */
    pantallasPasos: ListaPasosWizard[] = PERMISO_MAQUILA;
  
    /**
     * Esta variable se utiliza para almacenar el índice del paso.
     */
    indice = 1;
  
  
    /**
     * @propiedades
     * - `nroPasos`: Número total de pasos basado en la longitud de `pantallasPasos`.
     * - `indice`: Índice actual del paso.
     * - `txtBtnAnt`: Texto que se muestra en el botón para retroceder al paso anterior.
     * - `txtBtnSig`: Texto que se muestra en el botón para avanzar al siguiente paso.
     *
     * @descripción
     * Objeto que contiene la configuración y estado de los pasos en el flujo de la aplicación.
     */
    datosPasos: DatosPasos = {
      nroPasos: this.pantallasPasos.length,
      indice: this.indice,
      txtBtnAnt: 'Anterior',
      txtBtnSig: 'Continuar',
    };
    /**
     * @descripción
     * Método para actualizar el índice del paso actual basado en la acción y el valor proporcionados.
     *
     * @param e - Objeto de tipo `AccionBoton` que contiene la acción a realizar y el valor asociado.
     * 
     * @detalles
     * - Si el valor está entre 1 y 4 (exclusivo), actualiza el índice.
     * - Si la acción es 'cont', avanza al siguiente paso.
     * - Si la acción no es 'cont', retrocede al paso anterior.
     */
    getValorIndice(e: AccionBoton): void {
      if (e.valor > 0 && e.valor < 5) {
        this.indice = e.valor;
        if (e.accion === 'cont') {
          this.wizardComponent.siguiente();
        } else {
          this.wizardComponent.atras();
        }
      }
    }
}
