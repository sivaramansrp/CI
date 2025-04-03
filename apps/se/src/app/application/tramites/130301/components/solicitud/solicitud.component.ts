import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TituloComponent } from '@libs/shared/data-access-user/src';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SolicitudProrrogaService } from '../../services/solicitudProrroga/solicitud-prorroga.service';
import { Subject, takeUntil } from 'rxjs';
import { SolicitudForma } from '@libs/shared/data-access-user/src/core/models/130301/solicitud-prorroga.model'

@Component({
  selector: 'app-solicitud',
  standalone: true,
  imports: [
    CommonModule,
    TituloComponent,
    ReactiveFormsModule
  ],
  templateUrl: './solicitud.component.html',
  styleUrl: './solicitud.component.css',
})
export class SolicitudComponent implements OnInit,OnDestroy {

  solicitudForm!:FormGroup;

  /**
   * Notificador para destruir observables activos y evitar pérdidas de memoria.
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * Datos del formulario de mercancías.
   */
  solicitudFormDatos:SolicitudForma[] = []

  constructor(
    private fb: FormBuilder,
    private service: SolicitudProrrogaService,
  ) {}

  ngOnInit(): void {
    this.obtenerFormDatos()
    this.solicitudForm = this.fb.group({
      folio:[{value:'',disabled:true}],
      fechaInicio:[{value:'',disabled:true}],
      estatusSolicitud:[{value:'',disabled:true}],
      folioResolucion:[{value:'',disabled:true}]
    })
  }

  /**
   * Obtiene los datos del formulario de mercancías.
   */
  obtenerFormDatos(): void {
    this.service
      .obtenerFormDatos()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((data) => {
        this.solicitudFormDatos = data?.data;
        this.solicitudForm.patchValue({
          folio: this.solicitudFormDatos[0].folio,
          fechaInicio: this.solicitudFormDatos[0].fechaInicio,
          estatusSolicitud: this.solicitudFormDatos[0].estatusSolicitud,
          folioResolucion: this.solicitudFormDatos[0].folioResolucion
        });
      });
  }

  /**
   * Método que se ejecuta al destruir el componente.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
