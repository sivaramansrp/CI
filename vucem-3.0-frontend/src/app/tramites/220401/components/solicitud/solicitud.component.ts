import { Component, OnDestroy, OnInit } from '@angular/core';
import { ReplaySubject, takeUntil } from 'rxjs';

import { PantallasFormData } from '../../../../core/models/220401/servicios-pantallas.model';
import { ServiciosPantallasService } from '../../../../core/services/220471/servicios-pantallas.service';

/**
 * Este componente se utiliza para mostrar el formulario de solicitud.- 220401
 * pantallasFormData: Form data of the screens
 */
@Component({
  selector: 'app-solicitud',
  templateUrl: './solicitud.component.html',
  standalone: true,
  styleUrl: './solicitud.component.scss'
})

export class SolicitudComponent implements OnInit, OnDestroy {
  /**
   * Esta variable se utiliza para destruir la suscripción.
   */
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  /**
   * Esta variable se utiliza para crear los datos del formulario de las pantallas.
   */
  public pantallasFormData!: PantallasFormData;
  /**
   * constructor de la clase
   * @param serviciosPantallasService: Servicios de tienda de las pantallas.
   */
  constructor(private serviciosPantallasService: ServiciosPantallasService) {}
  /**
   * Este método se utiliza para inicializar los datos del formulario de las pantallas.
   * Suscríbete/escucha los datos del formulario
   * Establecer los datos del formulario
   * Darse de baja de la suscripción
   */
  public ngOnInit(): void {
    this.serviciosPantallasService.pantallasFormObservable$
      .pipe(takeUntil(this.destroyed$))
      .subscribe((formData: PantallasFormData) => {
        this.pantallasFormData = formData;
      });
      // Set the form data
      this.pantallasFormData['solict'] = [];
      this.serviciosPantallasService.setPantallasFormDataSubject(this.pantallasFormData);
  }

  /**
   * Este método se utiliza para destruir la suscripción. - 220401
   */
  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}
