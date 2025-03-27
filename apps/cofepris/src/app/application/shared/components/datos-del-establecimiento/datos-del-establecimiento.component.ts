/* eslint-disable sort-imports */
/* eslint-disable @typescript-eslint/explicit-function-return-type */


import { CommonModule } from '@angular/common';


import { Component, ElementRef, OnInit, ViewChild, OnDestroy } from '@angular/core';


import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';


import { TituloComponent } from '@libs/shared/data-access-user/src';


import { Solicitud260603State, Tramite260603Store } from '../../../shared/estados/tramites260603.store';


import { Tramite260603Query } from '../../../shared/estados/tramites260603.query';


import { Subject, map, takeUntil } from 'rxjs';

/**
 * component DatosDelEstablecimientoComponent
 * description Componente para gestionar los datos del establecimiento.
 * Proporciona un formulario reactivo para capturar y validar información del establecimiento.
 */
@Component({
 
  selector: 'app-datos-del-establecimiento',

 
  standalone: true,

 
  imports: [CommonModule, ReactiveFormsModule, TituloComponent],

  
  templateUrl: './datos-del-establecimiento.component.html',

 
  styleUrl: './datos-del-establecimiento.component.scss',
})
export class DatosDelEstablecimientoComponent implements OnInit, OnDestroy {
  /**
   * property datosDelForm
   * description Formulario reactivo para capturar los datos del establecimiento.
   */
  datosDelForm!: FormGroup;

  /**
   * property modal
   * description Variable que controla la visibilidad del modal.
   */
  public modal: string = 'modal';

  /**
   * property closeModal
   * description Referencia al elemento de cierre del modal.
   */
  @ViewChild('closeModal') closeModal!: ElementRef;

  /**
   * property solicitudState
   * description Estado actual de la solicitud.
   */
  public solicitudState!: Solicitud260603State;

  /**
   * property destroyNotifier$
   * description Sujeto para manejar la destrucción de suscripciones.
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * constructor
   * param fb FormBuilder para crear formularios reactivos.
   * param tramite260603Store Almacén para gestionar el estado de los trámites.
   * param tramite260603Query Consulta para obtener datos del estado de los trámites.
   */
  constructor(
    private fb: FormBuilder, // Inyección de dependencia para crear formularios reactivos.
    private tramite260603Store: Tramite260603Store, // Inyección del almacén de trámites.
    private tramite260603Query: Tramite260603Query // Inyección de la consulta de trámites.
  ) {}

  /**
   * method ngOnInit
   * description Método de inicialización del componente.
   * Configura el formulario y suscribe al estado de la solicitud.
   */
  ngOnInit(): void {
    // Suscribe al estado de la solicitud y actualiza la propiedad solicitudState.
    this.tramite260603Query.selectSolicitud$
      .pipe(
        // Finaliza la suscripción cuando se destruye el componente.
        takeUntil(this.destroyNotifier$),

        // Mapea el estado de la sección al estado de la solicitud.
        map((seccionState) => {
          this.solicitudState = seccionState;
        })
      )
      .subscribe();

    // Configura el formulario reactivo con valores iniciales y validaciones.
    this.datosDelForm = this.fb.group({
      // Campo para la denominación del establecimiento, requerido.
      denominacion: [this.solicitudState?.denominacion, [Validators.required]],

      // Campo para el correo electrónico, requerido y con validación de formato.
      correoElectronico: [this.solicitudState?.correoElectronico, [Validators.required, Validators.email]],
    });
  }

  /**
   * method setValoresStore
   * description Establece valores en el almacén de trámites.
   * param form Formulario reactivo.
   * param campo Nombre del campo del formulario.
   * param metodoNombre Método del almacén a invocar.
   */
  setValoresStore(form: FormGroup, campo: string, metodoNombre: keyof Tramite260603Store): void {
    // Obtiene el valor del campo del formulario.
    const VALOR = form.get(campo)?.value;

    // Invoca el método correspondiente en el almacén con el valor obtenido.
    (this.tramite260603Store[metodoNombre] as (value: string | number) => void)(VALOR);
  }

  /**
   * method abrirModal
   * description Método que abre el modal y carga el formulario con los datos predefinidos del representante.
   */
  public abrirModal(): void {
    // Cambia el estado del modal a "show" para mostrarlo.
    this.modal = 'show';
  }

  /**
   * method ngOnDestroy
   * description Método para limpiar suscripciones al destruir el componente.
   */
  ngOnDestroy(): void {
    // Emite un valor para finalizar las suscripciones activas.
    this.destroyNotifier$.next();

    // Completa el sujeto para liberar recursos.
    this.destroyNotifier$.complete();
  }
}
