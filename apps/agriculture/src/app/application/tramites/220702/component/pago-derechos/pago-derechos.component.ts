import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputFecha, InputFechaComponent } from '@libs/shared/data-access-user/src';
import { Subject,map, takeUntil } from 'rxjs';
import { FitosanitarioService } from '../../service/fitosanitario.service';
import { InputRadioComponent } from '@libs/shared/data-access-user/src';
import {PagoDeDerechosResponseDos } from '../../modelos/acuicola.model';
import { TituloComponent } from '@libs/shared/data-access-user/src';
import { TramiteState } from '../../estados/tramite220702.store';
import { TramiteStore } from '../../estados/tramite220702.store';
import { TramiteStoreQuery } from '../../estados/tramite220702.query';


@Component({
  selector: 'app-pago-derechos',
  standalone: true,
  imports: [
    TituloComponent,
    ReactiveFormsModule,
    InputRadioComponent,
    InputFechaComponent,
  ],
  templateUrl: './pago-derechos.component.html',
 
})
export class PagoDerechosComponent implements OnInit, OnDestroy {

  /**
    * Formulario reactivo para gestionar los datos del pago de derechos.
    */
  pagosDerechosForm!: FormGroup;

  /**
   * Valor seleccionado del radio.
   */
  valorSeleccionado!: string|null;

  radioOpcions = [
    { label: 'Sí', value: 'sí' },
    { label: 'No', value: 'no' },
  ];

   /**
   * Cambia el valor seleccionado del radio.
   * @param value Valor seleccionado.
   */
   cambiarRadio(value: string | number):void {
    this.valorSeleccionado = value as string;
    this.tramiteStore.setExentoDePago(this.valorSeleccionado);
  }

  /**
 * @property {InputFecha} configuracionFechaFinVigencia
 * @description
 * Configuración del campo de fecha de fin de vigencia para el formulario de pago de derechos.
 * @type {InputFecha}
 */
  configuracionFechaFinVigencia: InputFecha = {
    labelNombre: 'Fecha de pago',
    required: false,
    habilitado: true,
  };
  /**
 * @method cambioFechaDePago
 * @description
 * Maneja los cambios en el campo de fecha de inicio.
 * @param {string} nuevo_valor - El nuevo valor de fecha seleccionado.
 * @returns {void}
 */
cambioFechaDePago(nuevo_valor: string): void {
  this.tramiteStore.setFechaDePago(nuevo_valor);
}

  tramiteState: TramiteState={} as TramiteState;

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
    private tramiteStoreQuery: TramiteStoreQuery,
    private tramiteStore: TramiteStore,
    
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
    this.tramiteStoreQuery.selectSolicitudTramite$.pipe(
      takeUntil(this.destroyNotifier$),
      map((datos: TramiteState) => {
        this.tramiteState = datos;
        this.pagosDerechosForm.patchValue({
          exentoDePago: datos.exentoDePago,

        });
      })
    )
      .subscribe();

  }

  /**
   * Inicializa el formulario reactivo con los controles necesarios.
   */
  iniciarFormulario(): void {
    this.pagosDerechosForm = this.fb.group({
      claveDeReferenciaDerechos: [{ value:this.tramiteState.claveDeReferenciaDerechos, disabled: true }, Validators.required],
      cadenaDependenciaDerechos: [{ value:this.tramiteState.cadenaDependenciaDerechos, disabled: true }, Validators.required],
      bancoDerechos: [{ value:this.tramiteState.bancoDerechos, disabled: true }, Validators.required],
      llaveDePagoDerechos: [{ value:this.tramiteState.llaveDePagoDerechos, disabled: true }, Validators.required],
      fechaDePago: [{ value:this.tramiteState.fechaDePago, disabled: true }, Validators.required],
      importeDePagoDerechos: [{ value:this.tramiteState.importeDePagoDerechos, disabled: true }, Validators.required],
      exentoDePago: [{ value:this.tramiteState.exentoDePago}, Validators.required],
      
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
        this.pagosDerechosForm.patchValue({
          claveDeReferenciaDerechos:data.data.claveDeReferencia,
          cadenaDependenciaDerechos:data.data.cadenaDependencia,
          bancoDerechos:data.data.banco,
          llaveDePagoDerechos:data.data.llaveDePago,
          fechaInicioDerechos:data.data.fechaInicio,
          importeDePagoDerechos:data.data.importeDePago,

        });
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
