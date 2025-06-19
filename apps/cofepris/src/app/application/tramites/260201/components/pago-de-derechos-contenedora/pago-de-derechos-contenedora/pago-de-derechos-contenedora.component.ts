import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ID_PROCEDIMIENTO } from '../../../constants/psicotropicos-poretorno.enum';
import { PagoDeDerechosComponent } from '../../../../../shared/components/pago-de-derechos/pago-de-derechos.component';
import { PagoDerechosFormState } from '../../../../../shared/models/terceros-relacionados.model';
import { Tramite260201Store } from '../../../estados/tramite260201Store.store';
import { ConsultaioQuery } from '@libs/shared/data-access-user/src';
import { Observable, map } from 'rxjs';

/**
 * @component PagoDeDerechosContenedoraComponent
 * @description Componente contenedor que utiliza el componente `PagoDeDerechosComponent`
 * para gestionar la funcionalidad relacionada con el pago de derechos.
 * Este componente interactúa con el estado del trámite a través del store `Tramite260201Store`.
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
  * Observable que indica si el formulario está en modo solo lectura.
  * Cuando es `true`, el formulario no permite modificaciones por parte del usuario.
  *
  * @type {Observable<boolean>}
  */
  esFormularioSoloLectura!: Observable<boolean>;

  /**
   * @property {PagoDerechosFormState} pagoDerechos
   * @description Estado actual del formulario de pago de derechos, obtenido del store del trámite.
   */
  public pagoDerechos: PagoDerechosFormState;

  /**
   * @property {string} idProcedimiento
   * @description Identificador del procedimiento.
   */
  public readonly idProcedimiento = ID_PROCEDIMIENTO;

  /**
   * @constructor
   * @description Inyecta el store `Tramite260201Store` para gestionar el estado del trámite.
   * Inicializa la propiedad `pagoDerechos` con el valor actual del store.
   * @param tramiteStore - Store que administra el estado del trámite 260201.
   */
  constructor(public tramiteStore: Tramite260201Store,  private consultaQuery: ConsultaioQuery ) {
    this.pagoDerechos = this.tramiteStore.getValue().pagoDerechos;
     this.esFormularioSoloLectura = this.consultaQuery.selectConsultaioState$
       .pipe(
         map((seccionState) => {
           if(!seccionState.create && seccionState.procedureId === '260201') {
             return seccionState.readonly;
           } 
           return false;
         })
       );
  }

  /**
   * @method updatePagoDerechos
   * @description Actualiza los datos del formulario de pago de derechos en el store del trámite.
   * @param {PagoDerechosFormState} event - Estado actualizado del formulario de pago de derechos.
   * @returns {void} No retorna ningún valor.
   */
  updatePagoDerechos(event: PagoDerechosFormState): void {
    this.tramiteStore.updatePagoDerechos(event);
  }
}
