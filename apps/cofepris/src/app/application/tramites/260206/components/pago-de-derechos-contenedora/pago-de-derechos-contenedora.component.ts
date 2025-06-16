import { Subject, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { PagoDeDerechosComponent } from '../../../../shared/components/pago-de-derechos/pago-de-derechos.component';
import { PagoDerechosFormState } from '../../../../shared/models/terceros-relacionados.model';
import { Tramite260206Store } from '../../estados/stores/tramite260206Store.store';


@Component({
  selector: 'app-pago-de-derechos-contenedora',
  standalone: true,
  imports: [CommonModule, PagoDeDerechosComponent],
  templateUrl: './pago-de-derechos-contenedora.component.html',
  styleUrl: './pago-de-derechos-contenedora.component.scss',
})
export class PagoDeDerechosContenedoraComponent {
 
  /**
   * Notificador para destruir observables y evitar fugas de memoria.
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * Estado del formulario de pago de derechos.
   * 
   * Contiene la información y configuración relacionada con el formulario de pago.
   * 
   * @type {PagoDerechosFormState}
   */
  public pagoDerechos: PagoDerechosFormState;

  /**
   * que indica si el formulario está en modo solo lectura.
   * Cuando es `true`, el formulario no permite modificaciones por parte del usuario.
   *
   * @type {boolean}
   */
  esFormularioSoloLectura!: boolean;

  /**
   * Constructor de la clase que inicializa el estado de pago de derechos y suscribe el estado general del formulario.
   * 
   * @param {Tramite260206Store} tramiteStore - Almacén del estado del trámite 260206, del cual se obtiene el estado inicial del formulario de pago.
   * @param {ConsultaioQuery} consultaQuery - Consulta que proporciona el estado general del formulario.
   */
  constructor(public tramiteStore: Tramite260206Store, private consultaQuery: ConsultaioQuery){
   this.pagoDerechos = this.tramiteStore.getValue().pagoDerechos;
   this.consultaQuery.selectConsultaioState$
           .pipe(
             takeUntil(this.destroyNotifier$),
           )
           .subscribe((seccionState) => {
             if(!seccionState.create && seccionState.procedureId === '260206') {
               this.esFormularioSoloLectura = seccionState.readonly;
             } 
           });
  }
  
  /**
   * Actualiza la información de pago de derechos en el store del trámite.
   *
   * Este método toma un objeto `PagoDerechosFormState` que contiene los datos actualizados
   * del formulario de pago de derechos y llama al método `updatePagoDerechos` del `tramiteStore`
   * para persistir los cambios.
   *
   * @param event Un objeto `PagoDerechosFormState` con los datos actualizados del formulario de pago.
   * @returns void
   */
  updatePagoDerechos(event: PagoDerechosFormState): void{
    this.tramiteStore.updatePagoDerechos(event);
  }

}
