import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { InputRadio } from '../../models/solicitud.model';
import { InputRadioComponent } from '@libs/shared/data-access-user/src';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Solicitud32605Query } from '../../estados/solicitud32605.query';
import { Solicitud32605State } from '../../estados/solicitud32605.store';
import { Solicitud32605Store } from '../../estados/solicitud32605.store';
import { SolicitudRadioLista } from '../../models/solicitud.model';
import { SolicitudService } from '../../services/solicitud.service';
import { Subject } from 'rxjs';
import { map } from 'rxjs';
import { takeUntil } from 'rxjs';
/**
 * Componente que gestiona el formulario relacionado con la certificación CTPAT.
 * Utiliza radio buttons para capturar respuestas de sí/no relacionadas con la solicitud.
 */
@Component({
  selector: 'app-c-tpat',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InputRadioComponent],
  providers: [SolicitudService],
  templateUrl: './c-tpat.component.html',
  styleUrl: './c-tpat.component.scss',
})
/**
 * Componente que gestiona el formulario relacionado con la certificación CTPAT.
 * Utiliza radio buttons para capturar respuestas de sí/no relacionadas con la solicitud.
 */
export class CTPATComponent implements OnInit, OnDestroy {
  /** Formulario reactivo que contiene los campos de CTPAT identificados por sus IDs numéricos */
  ctpatForm!: FormGroup;

  /** Subject utilizado para cancelar las suscripciones activas al destruir el componente */
  private destroy$: Subject<void> = new Subject<void>();

  /** Objeto que contiene las opciones de respuesta tipo sí/no para los radio buttons */
  sinoOpcion: InputRadio = {} as InputRadio;

  /** Estado actual de la solicitud obtenido desde el store */
  solicitud32605State: Solicitud32605State = {} as Solicitud32605State;

  /**
   * Constructor del componente. Inyecta dependencias necesarias y carga las opciones del radio button.
   * @param fb - FormBuilder para crear el formulario reactivo.
   * @param solicitudService - Servicio que realiza operaciones sobre la solicitud.
   * @param solicitud32605Store - Store para actualizar el estado de la solicitud.
   * @param solicitud32605Query - Query para observar cambios en el estado de la solicitud.
   */
  constructor(
    public fb: FormBuilder,
    public solicitudService: SolicitudService,
    public solicitud32605Store: Solicitud32605Store,
    public solicitud32605Query: Solicitud32605Query
  ) {
    this.conseguirOpcionDeRadio();
  }

  /**
   * Inicializa el componente, crea el formulario y suscribe a los cambios en el estado de la solicitud.
   */
  ngOnInit(): void {
    this.ctpatForm = this.fb.group({
      '2089': [this.solicitud32605State[2089]],
      '2090': [this.solicitud32605State[2090]],
      '2091': [this.solicitud32605State[2091]],
    });

    this.solicitud32605Query.selectSolicitud$
      .pipe(
        takeUntil(this.destroy$),
        map((respuesta: Solicitud32605State) => {
          this.solicitud32605State = respuesta;
          this.ctpatForm.patchValue({
            '2089': this.solicitud32605State[2089],
            '2090': this.solicitud32605State[2090],
            '2091': this.solicitud32605State[2091],
          });
        })
      )
      .subscribe();
  }

  /**
   * Llama al servicio para obtener las opciones de tipo sí/no para los radio buttons.
   */
  conseguirOpcionDeRadio(): void {
    this.solicitudService
      .conseguirOpcionDeRadio()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (respuesta: SolicitudRadioLista) => {
          this.sinoOpcion = respuesta.requisitos;
        },
      });
  }

  /**
   * Actualiza el valor del campo con ID 2089 en el store.
   * @param evento - Valor seleccionado en el radio button.
   */
  actualizar2089(evento: number | string): void {
    this.solicitud32605Store.actualizar2089(evento);
  }

  /**
   * Actualiza el valor del campo con ID 2090 en el store.
   * @param evento - Valor seleccionado en el radio button.
   */
  actualizar2090(evento: number | string): void {
    this.solicitud32605Store.actualizar2090(evento);
  }

  /**
   * Actualiza el valor del campo con ID 2091 en el store.
   * @param evento - Valor seleccionado en el radio button.
   */
  actualizar2091(evento: number | string): void {
    this.solicitud32605Store.actualizar2091(evento);
  }

  /**
   * Cancela todas las suscripciones activas al destruir el componente.
   */
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
