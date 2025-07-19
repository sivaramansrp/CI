
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { InputRadio, SolicitudRadioLista } from '../../models/solicitud.model';
import { InputRadioComponent } from '@libs/shared/data-access-user/src';
import { Subject, takeUntil } from 'rxjs';
import { SolicitudeService } from '../../services/solicitude.service';




@Component({
  selector: 'app-almacen-general',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,InputRadioComponent],
  templateUrl: './almacen-general.component.html',
  styleUrl: './almacen-general.component.scss',
})
export class AlmacenGeneralComponent implements OnDestroy ,OnInit {
    /** Sujeto que maneja la destrucción de suscripciones */
    private destroy$: Subject<void> = new Subject<void>();
  almacenGeneralForm : FormGroup = this.fb.group({
    // Aquí puedes definir los controles del formulario
  });
  /** Opciones de radio para la selección de valores */
  sinoOpcion: InputRadio = {} as InputRadio;
  constructor(private fb: FormBuilder, private solicitudService: SolicitudeService) {
   
   
  }
  ngOnInit(): void {
    this.conseguirOpcionDeRadio();
  }
    /**
     * Obtiene las opciones de radio desde el servicio de solicitud
     */
    conseguirOpcionDeRadio(): void {
      this.solicitudService
        .conseguirOpcionDeRadio()
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (respuesta: SolicitudRadioLista) => {
            this.sinoOpcion = respuesta.requisitos;
            // this.mutuo = respuesta.reconocimientoMutuo;
            // this.clasificacionInformacion = respuesta.clasificacionInformacion;
          },
        });
    }
     /**
   * Método llamado al destruir el componente, limpia las suscripciones
   */
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
