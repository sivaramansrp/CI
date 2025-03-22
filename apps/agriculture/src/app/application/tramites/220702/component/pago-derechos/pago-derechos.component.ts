import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { FitosanitarioService } from '../../service/fitosanitario.service';
import {PagoDeDerechosResponseDos } from '../../modelos/acuicola.model';
import { TituloComponent } from '@libs/shared/data-access-user/src';

@Component({
  selector: 'app-pago-derechos',
  standalone: true,
  imports: [
    TituloComponent,
    ReactiveFormsModule
  ],
  templateUrl: './pago-derechos.component.html',
 
})
export class PagoDerechosComponent implements OnInit, OnDestroy {

  /**
    * Formulario reactivo para gestionar los datos del pago de derechos.
    */
  pagosDerechosForm!: FormGroup;

  /**
   * Subject utilizado para gestionar la destrucción de suscripciones.
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * Constructor del componente.
   * 
   * @param fb Servicio de FormBuilder para crear formularios reactivos.
   * @param fitosanitarioService Servicio para interactuar con la lógica de negocio relacionada con la acuicultura.
   */
  constructor(
    private readonly fb: FormBuilder,
    private readonly fitosanitarioService: FitosanitarioService,
    
  ) {
    // No se necesita lógica de inicialización adicional.
   }

  /**
   * Método que se ejecuta al inicializar el componente.
   * Inicializa el formulario y carga los datos del pago de derechos.
   */
  ngOnInit(): void {
    this.iniciarFormulario();
    this.pagoDeCargarDatos();
  }

  /**
   * Inicializa el formulario reactivo con los controles necesarios.
   */
  iniciarFormulario(): void {
    this.pagosDerechosForm = this.fb.group({
      claveDeReferencia: [{ value: '', disabled: true }, Validators.required],
      cadenaDependencia: [{ value: '', disabled: true }, Validators.required],
      banco: [{ value: '', disabled: true }, Validators.required],
      llaveDePago: [{ value: '', disabled: true }, Validators.required],
      fechaInicio: [{ value: '', disabled: true }, Validators.required],
      importeDePago: [{ value: '', disabled: true }, Validators.required],
      exentoDePago: [{ value: '0'}, Validators.required],
      
    });
  }

  /**
   * Carga los datos del pago de derechos desde el servicio.
   */
  pagoDeCargarDatos(): void {
    this.fitosanitarioService
      .pagoDeCargarDatos()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((data: PagoDeDerechosResponseDos) => {
        this.pagosDerechosForm.patchValue(data.data);
      })
  }

  /**
   * Método que se ejecuta al destruir el componente.
   * Se encarga de liberar las suscripciones para evitar fugas de memoria.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.unsubscribe();
  }
}
