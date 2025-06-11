import { Component, OnDestroy } from '@angular/core';
import { Subject, map, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { PagoDeDerechosComponent } from '../../../../shared/components/pago-de-derechos/pago-de-derechos.component';
import { PagoDerechosFormState } from '../../../../shared/models/terceros-relacionados.model';
import { Tramite260104Store } from '../../estados/stores/tramite260104.store';


/**
 * @component PagoDeDerechosContenedoraComponent
 * @selector app-pago-de-derechos-contenedora
 * @standalone true
 * @imports [CommonModule, PagoDeDerechosComponent]
 * @templateUrl ./pago-de-derechos-contenedora.component.html
 * @styleUrl ./pago-de-derechos-contenedora.component.scss
 * 
 * @description
 * Este componente es responsable de contener y gestionar el formulario de pago de derechos
 * para el trámite 260104. Se conecta con el estado global del trámite a través del servicio
 * `Tramite260104Store` para obtener y actualizar la información relacionada con el pago de derechos.
 * 
 * @class PagoDeDerechosContenedoraComponent
 * @public
 */
@Component({
  selector: 'app-pago-de-derechos-contenedora',
  standalone: true,
  imports: [CommonModule, PagoDeDerechosComponent],
  templateUrl: './pago-de-derechos-contenedora.component.html',
  styleUrl: './pago-de-derechos-contenedora.component.scss',
})



export class PagoDeDerechosContenedoraComponent implements OnDestroy {
 public pagoDerechos: PagoDerechosFormState;

 /**
   * Determina si el formulario debe estar en modo solo lectura.
   */
 public esFormularioSoloLectura: boolean = false;

 /**
    * Sujeto utilizado para manejar la destrucción de observables.
    */
   private destroyNotifier$: Subject<void> = new Subject();

  /**
   * Constructor de la clase PagoDeDerechosContenedoraComponent.
   * 
   * @param tramiteStore - Inyección del servicio `Tramite260104Store` que se utiliza para acceder 
   *                       y gestionar el estado relacionado con el trámite 260104.
   * 
   * Este constructor inicializa la propiedad `pagoDerechos` con el valor actual del estado 
   * almacenado en `Tramite260104Store`.
   */
  constructor(public tramiteStore: Tramite260104Store,
    private consultaioQuery: ConsultaioQuery,
  ){
   this.pagoDerechos = this.tramiteStore.getValue().pagoDerechos;
   this.consultaioQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.esFormularioSoloLectura = seccionState.readonly;
        })
      )
      .subscribe();
  }
  
 /**
 * @method updatePagoDerechos
 * @description
 * Actualiza el estado del pago de derechos en el store del trámite. Este método se utiliza para
 * reflejar los cambios realizados en el formulario de pago de derechos en el estado global.
 * 
 * @param {PagoDerechosFormState} event
 * Objeto que contiene el nuevo estado del formulario de pago de derechos.
 * 
 * @memberof PagoDeDerechosContenedoraComponent
 */
  updatePagoDerechos(event: PagoDerechosFormState): void{
    this.tramiteStore.updatePagoDerechos(event);
  }

  /**
 * Método que se ejecuta al destruir el componente.
 * Libera los recursos y completa los observables.
 */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }

}
