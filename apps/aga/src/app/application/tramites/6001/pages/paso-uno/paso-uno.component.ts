import { Component, OnDestroy } from '@angular/core';
import { RegistroCuentasBancariasService } from '../../services/registro-cuentas-bancarias.service';
import { Subscription } from 'rxjs';

/**
 * PasoUnoComponent es responsable de manejar el primer paso del proceso.
 * Se suscribe al observable `componenteActual` de `RegistroCuentasBancariasService`
 * para actualizar el componente actual que se está mostrando.
 */
@Component({
  selector: 'app-paso-uno',
  templateUrl: './paso-uno.component.html',
})
export class PasoUnoComponent implements OnDestroy {

  /**
   * Una instancia de Subscription que se utiliza para manejar la suscripción a eventos.
   * Esta instancia se utiliza para manejar la suscripción a eventos y liberar recursos cuando el componente se destruye.
   * @type {Subscription}
   */
  private subscription: Subscription = new Subscription();

  /**
   * Representa el componente actual que se está mostrando.
   * Los valores posibles incluyen 'DatosGenerales'.
   */
  componenteActual: string = 'DatosGenerales';

  /**
   * Constructor de PasoUnoComponent.
   * 
   * @param _registroCuentasBancariasSvc - Servicio para gestionar registros de cuentas bancarias.
   * 
   * Este constructor se suscribe al observable `componenteActual` del 
   * `RegistroCuentasBancariasService` para actualizar la propiedad `componenteActual` 
   * cada vez que el componente actual cambia.
   */
  constructor(private _registroCuentasBancariasSvc: RegistroCuentasBancariasService,) {
    this.subscription.add(this._registroCuentasBancariasSvc.componenteActual.subscribe(component => {
      this.componenteActual = component;
    }));
  }

    /**
   * Maneja el evento para cancelar la firma.
   * Navega al componente anterior.
   */
    ngOnDestroy(): void {
      this.subscription.unsubscribe();
    } 
}
