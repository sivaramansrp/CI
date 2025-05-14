import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { ModificacionDenominacionRazonSocial } from '../../models/solicitud.model';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Solicitud31301Query } from '../../estados/solicitud31301.query';
import { Solicitud31301State } from '../../estados/solicitud31301.store';
import { Solicitud31301Store } from '../../estados/solicitud31301.store';
import { SolicitudService } from '../../services/solicitud.service';
import { Subject } from 'rxjs';
import { TituloComponent } from '@libs/shared/data-access-user/src';
import { Validators } from '@angular/forms';
import { map } from 'rxjs';
import { takeUntil } from 'rxjs';

/**
 * Componente que muestra la modificación de denominación o razón social.
 * Utiliza un formulario reactivo y sincroniza el estado con el store.
 */
@Component({
  selector: 'app-modificacion-de-denominacion-o-razors-social',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TituloComponent],
  providers: [SolicitudService],
  templateUrl: './modificacion-de-denominacion-o-razors-social.component.html',
  styleUrl: './modificacion-de-denominacion-o-razors-social.component.scss',
})
/**
 * Componente que muestra la modificación de denominación o razón social.
 * Utiliza un formulario reactivo y sincroniza el estado con el store.
 */
export class ModificacionDeDenominacionORazorsSocialComponent
  implements OnInit, OnDestroy
{
  /** Formulario reactivo para mostrar la información de la razón social */
  registroPolizaEndosoForm!: FormGroup;

  /** Subject usado para limpiar las suscripciones al destruir el componente */
  private destroy$: Subject<void> = new Subject<void>();

  /** Estado actual relacionado con la solicitud */
  solicitud31301State: Solicitud31301State = {} as Solicitud31301State;

  /**
   * Constructor que inyecta servicios y realiza la carga inicial
   * de la modificación de razón social desde el backend.
   *
   * @param fb FormBuilder para crear el formulario
   * @param solicitudService Servicio para obtener la información desde el backend
   * @param solicitud31301Store Store donde se actualiza el estado de la solicitud
   * @param solicitud31301Query Query para observar cambios del estado
   */
  constructor(
    private fb: FormBuilder,
    private solicitudService: SolicitudService,
    public solicitud31301Store: Solicitud31301Store,
    public solicitud31301Query: Solicitud31301Query
  ) {
    this.conseguirModificacionDenominacionRazonSocial();
  }

  /**
   * Hook del ciclo de vida Angular que inicializa el formulario
   * y suscribe al estado de la solicitud para actualizar valores.
   */
  ngOnInit(): void {
    this.registroPolizaEndosoForm = this.fb.group({
      razonSocialAnterior: [
        { value: this.solicitud31301State.razonSocialAnterior, disabled: true },
        [Validators.maxLength(250)],
      ],
      razonSocialActual: [
        { value: this.solicitud31301State.razonSocialActual, disabled: true },
        [Validators.maxLength(250)],
      ],
    });

    this.solicitud31301Query.selectSolicitud$
      .pipe(
        takeUntil(this.destroy$),
        map((respuesta: Solicitud31301State) => {
          this.solicitud31301State = respuesta;
          this.registroPolizaEndosoForm.patchValue({
            razonSocialAnterior: respuesta.razonSocialAnterior,
            razonSocialActual: respuesta.razonSocialActual,
          });
        })
      )
      .subscribe();
  }

  /**
   * Método que consulta la información de la modificación
   * de denominación o razón social desde el backend y
   * actualiza el estado global (store).
   */
  conseguirModificacionDenominacionRazonSocial(): void {
    this.solicitudService
      .conseguirModificacionDenominacionRazonSocial()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (respuesta: ModificacionDenominacionRazonSocial) => {
          this.solicitud31301Store.actualizarRazonSocialActual(
            respuesta.razonSocialActual
          );
          this.solicitud31301Store.actualizarRazonSocialAnterior(
            respuesta.razonSocialAnterior
          );
        },
      });
  }

  /**
   * Hook del ciclo de vida Angular que se ejecuta al destruir el componente.
   * Se utiliza para liberar recursos y cancelar suscripciones activas.
   */
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
