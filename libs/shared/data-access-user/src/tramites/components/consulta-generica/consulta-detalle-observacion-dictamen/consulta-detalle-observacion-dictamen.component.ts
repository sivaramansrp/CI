import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject } from 'rxjs';

@Component({
  selector: 'lib-detalle-observacion-dictamen',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './consulta-detalle-observacion-dictamen.component.html',
  styleUrl: './consulta-detalle-observacion-dictamen.component.scss',
})
export class ConsultaDetalleObservacionDictamenComponent implements OnInit, OnDestroy {
  /**
   * Formulario reactivo para la solicitud de observacion dictamen.
   * @type {FormGroup}
  */
  public observacionForm!: FormGroup;

  /**
   * Subject utilizado para manejar la cancelación de suscripciones.
   * @type {Subject<void>}
  */
  public unsubscribe$ = new Subject<void>();

 /**
  * Indica si el formulario está en modo solo lectura.
  * Cuando es `true`, los campos del formulario no se pueden editar.
 */
 esFormularioSoloLectura: boolean = true;

  /**
    * Constructor para la consulta de detalle observacion.
    * @param fb FormBuilder para crear formularios reactivos.
  */
  constructor(
    private fb: FormBuilder,
  ) {
    /** 
     * Formulario reactivo para detalle observacion.
     */
    this.observacionForm = this.fb.group({
      descripcion: ['', Validators.required],
    });
  }

  /**
    * Método del ciclo de vida de Angular que se ejecuta al inicializar el componente.
    * Configura los formularios reactivos,y inicia el formulario.
  */
  ngOnInit(): void {

    this.inicializarEstadoFormulario();
  }

  /**
   * Evalúa si se debe inicializar o cargar datos.
   * Además, obtiene la información del catálogo de mercancía.
  */
  inicializarEstadoFormulario(): void {
    if (this.esFormularioSoloLectura) {
      this.observacionForm.disable();
    } 
  }
  
  /**
   * Método del ciclo de vida de Angular que se ejecuta cuando el componente se destruye.
   * Cancela todas las suscripciones activas para evitar fugas de memoria.
   */
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
