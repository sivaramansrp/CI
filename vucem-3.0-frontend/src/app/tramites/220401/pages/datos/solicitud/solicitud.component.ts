import { Component, OnInit } from '@angular/core';
import { ServiciosPantallasService } from '../../../../../core/services/220471/servicios-pantallas.service';
import { ReplaySubject, takeUntil } from 'rxjs';
import { PantallasFormData } from '../../../../../core/models/220401/servicios-pantallas.model';

@Component({
  selector: 'app-solicitud',
  templateUrl: './solicitud.component.html',
  standalone: true,
  styleUrl: './solicitud.component.scss'
})
export class SolicitudComponent implements OnInit {
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  public pantallasFormData!: PantallasFormData;

  constructor(private serviciosPantallasService: ServiciosPantallasService) {}
  public ngOnInit(): void {
    // Subscribe/ listener the form data
    this.serviciosPantallasService.pantallasFormObservable$
      .pipe(takeUntil(this.destroyed$))
      .subscribe((formData: PantallasFormData) => {
        this.pantallasFormData = formData;
        console.log('Form data', this.pantallasFormData);
      });
      // Set the form data
      this.pantallasFormData['solict'] = [];
      this.serviciosPantallasService.setPantallasFormDataSubject(this.pantallasFormData);
  }

  // Unsubscribe the subscription
  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}
