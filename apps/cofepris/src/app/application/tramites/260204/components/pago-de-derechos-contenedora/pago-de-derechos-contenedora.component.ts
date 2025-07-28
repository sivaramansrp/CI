import { Observable, map } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ConsultaioQuery } from '@libs/shared/data-access-user/src';
import { PagoDeDerechosComponent } from '../../../../shared/components/pago-de-derechos/pago-de-derechos.component';
import { PagoDerechosFormState } from '../../../../shared/models/terceros-relacionados.model';
import { Tramite260204Store } from '../../estados/stores/tramite260204Store.store';

/**
 * Decorador `@Component` que define el componente `PagoDeDerechosContenedoraComponent`.
 * 
 * Este componente es responsable de encapsular la lógica y la presentación del formulario
 * de pago de derechos, proporcionando una interfaz para interactuar con el estado del trámite
 * y determinar si el formulario está en modo solo lectura.
 * 
 * Propiedades del decorador:
 * 
 * - `selector`: Define el nombre del selector que se utiliza para instanciar este componente
 *   en una plantilla HTML. En este caso, el selector es `app-pago-de-derechos-contenedora`.
 * 
 * - `standalone`: Indica que este componente es independiente y no requiere ser declarado
 *   dentro de un módulo Angular. Esto permite que sea utilizado directamente en cualquier
 *   parte de la aplicación.
 * 
 * - `imports`: Lista de módulos y componentes que este componente necesita para funcionar.
 *   Incluye `CommonModule` para funcionalidades comunes de Angular y `PagoDeDerechosComponent`
 *   como un componente hijo que se utiliza dentro de este componente.
 * 
 * - `templateUrl`: Ruta al archivo HTML que define la estructura y el diseño del componente.
 *   En este caso, el archivo es `./pago-de-derechos-contenedora.component.html`.
 * 
 * - `styleUrl`: Ruta al archivo SCSS que contiene los estilos específicos para este componente.
 *   En este caso, el archivo es `./pago-de-derechos-contenedora.component.scss`.
 */
@Component({
  selector: 'app-pago-de-derechos-contenedora',
  standalone: true,
  imports: [CommonModule, PagoDeDerechosComponent],
  templateUrl: './pago-de-derechos-contenedora.component.html',
  styleUrl: './pago-de-derechos-contenedora.component.scss',
})
export class PagoDeDerechosContenedoraComponent {
  /**
   * Representa el estado actual del formulario de pago de derechos.
   * Contiene los valores y configuraciones asociados al formulario.
   *
   * @type {PagoDerechosFormState}
   */
  public pagoDerechos: PagoDerechosFormState;

  /**
  * Observable que indica si el formulario está en modo solo lectura.
  * Cuando es `true`, el formulario no permite modificaciones por parte del usuario.
  *
  * @type {Observable<boolean>}
  */
  esFormularioSoloLectura!: Observable<boolean>;

  /**
   * Constructor de la clase que inicializa el estado del trámite y determina si el formulario es de solo lectura.
   * 
   * @param {Tramite260204Store} tramiteStore - Store que contiene el estado del trámite 260204.
   * @param {ConsultaioQuery} consultaQuery - Query para obtener el estado de la sección de consulta.
   */
  constructor(public tramiteStore: Tramite260204Store,
         private consultaQuery: ConsultaioQuery 
  ){
   this.pagoDerechos = this.tramiteStore.getValue().pagoDerechos;
   this.esFormularioSoloLectura = this.consultaQuery.selectConsultaioState$
       .pipe(
         map((seccionState) => {
           if(!seccionState.create && seccionState.procedureId === '260204') {
             return seccionState.readonly;
           } 
           return false;
         })
       );
  }

  /**
   * Actualiza la información de pago de derechos en el store del trámite.
   *
   * Este método toma un objeto `PagoDerechosFormState` que contiene los datos actualizados
   * del formulario de pago de derechos y llama al método `updatePagoDerechos` del `tramiteStore`
   * para persistir los cambios.
   *
   * @param event Un objeto `PagoDerechosFormState` con los datos actualizados del formulario de pago.
   * @returns void.
   *
   * @example
   * ```typescript
   * const pagoActualizado: PagoDerechosFormState = {
   * // ... datos del formulario
   * };
   * this.updatePagoDerechos(pagoActualizado);
   * ```
   */
  updatePagoDerechos(event: PagoDerechosFormState): void{
    this.tramiteStore.updatePagoDerechos(event);
  }

}
