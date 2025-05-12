import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { SolicitudForma } from '@libs/shared/data-access-user/src/core/models/130301/solicitud-prorroga.model';
import { SolicitudProrrogaService } from '../../services/solicitudProrroga/solicitud-prorroga.service';
import { TituloComponent } from '@libs/shared/data-access-user/src';

/**
 * Componente para gestionar la solicitud del trámite.
 */
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
export class SolicitudComponent implements OnInit, OnDestroy {
  /**
   * Formulario reactivo para la solicitud.
   */
  solicitudForm!: FormGroup;

  /**
   * Notificador para destruir observables activos y evitar pérdidas de memoria.
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * Datos del formulario de la solicitud obtenidos del servicio.
   */
  solicitudFormDatos: SolicitudForma[] = [];

  /**
   * Constructor del componente.
   * @param fb Constructor de formularios reactivos.
   * @param service Servicio para obtener los datos de la solicitud.
   */
  constructor(
    private fb: FormBuilder,
    private service: SolicitudProrrogaService,
  ) {}

  /**
   * Método de inicialización del componente.
   */
  ngOnInit(): void {
    this.obtenerFormDatos();
    this.crearFormulario();
  }
  /**
   * Crea y configura un formulario reactivo para gestionar la solicitud del trámite con campos deshabilitados.
   */
  crearFormulario():void{
    this.solicitudForm = this.fb.group({
      folio: [{ value: '', disabled: true }],
      fechaInicio: [{ value: '', disabled: true }],
      estatusSolicitud: [{ value: '', disabled: true }],
      folioResolucion: [{ value: '', disabled: true }]
    });
  }

  /**
   * Obtiene los datos del formulario de la solicitud desde el servicio.
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
   * Libera los recursos y destruye los observables activos.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}