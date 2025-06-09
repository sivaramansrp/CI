import {
  CatalogoSelectComponent,
  InputFecha,
  InputFechaComponent,
  TituloComponent,
  ValidacionesFormularioService,
} from '@libs/shared/data-access-user/src';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FECHA_FINAL, FECHA_INICIAL, FECHA_PAGO } from '../model/registro.model';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ReplaySubject, Subject, map, of, takeUntil } from 'rxjs';
import {
  Solicitud31802State,
  Tramite31802Store,
} from '../state/Tramite31802.store';
import { CommonModule } from '@angular/common';
import { ConsultaioQuery } from '@libs/shared/data-access-user/src';
import { RegistroSolicitudService } from './../services/registro-solicitud-service.service';
import { Solicitud31802Enum } from '../constants/solicitud31802.enum';
import { Tramite31802Query } from '../state/Tramite31802.query';

/**
 * Componente que gestiona la solicitud del trámite 31803.
 * Contiene la lógica para inicializar el formulario, manejar eventos y comunicarse con el estado global.
 */
@Component({
  selector: 'app-solicitud',
  standalone: true,
  imports: [
    CommonModule,
    TituloComponent,
    InputFechaComponent,
    CatalogoSelectComponent,
    ReactiveFormsModule,
  ],
  providers: [RegistroSolicitudService],
  templateUrl: './Solicitud.component.html',
  styleUrl: './Solicitud.component.css',
})
export class SolicitudComponent implements OnInit, OnDestroy {
  /**
   * Observable para manejar la destrucción del componente.
   * Se utiliza para cancelar suscripciones activas.
   */
  public destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  /**
   * Estado actual de la solicitud.
   */
  public solicitudState!: Solicitud31802State;

  /**
   * Configuración para el campo de fecha inicial.
   */
  fechaInicialInput: InputFecha = FECHA_INICIAL;

  /**
   * Configuración para el campo de fecha final.
   */
  fechaFinalInput: InputFecha = FECHA_FINAL;

  /**
   * Configuración para el campo de fecha de pago.
   */
  fechaPagoInput: InputFecha = FECHA_PAGO;

  /**
   * Enumeración que contiene los textos utilizados en el componente.
   */
  solicitudEnum = Solicitud31802Enum;

  /**
   * Formulario reactivo para gestionar los datos de la solicitud.
   */
  registroForm!: FormGroup;


  esFormularioSoloLectura: boolean = false;


  private destroyNotifier$: Subject<void> = new Subject();
  /**
   * Notificador para cancelar suscripciones activas.
   * Se utiliza para evitar fugas de memoria al destruir el componente.
   */

  /**
  * Constructor del componente.
  * Se utiliza para la inyección de dependencias.
  *
  * @param registroSolicitud Servicio para obtener datos relacionados con la solicitud.
  * @param fb Constructor de formularios reactivos.
  * @param store Almacén global para gestionar el estado del trámite.
  * @param query Consulta para obtener el estado actual del trámite.
  * @param validacionesService Servicio para validar campos del formulario.
  */
  constructor(
    private consultaioQuery: ConsultaioQuery,
    public fb: FormBuilder,
    public store: Tramite31802Store,
    private query: Tramite31802Query,
    public validacionesService: ValidacionesFormularioService
  ) {
    this.consultaioQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.esFormularioSoloLectura = seccionState.readonly;
          // Inicializa el formulario con los valores actuales del estado.
          this.datosDeAvisoForm()
        })
      )
      .subscribe()
  }

  /**
   * Método del ciclo de vida de Angular que se ejecuta al inicializar el componente.
   * Configura el formulario, obtiene datos iniciales y suscribe al estado global.
   */
  ngOnInit(): void {
    this.query.selectSolicitud$
      .pipe(
        takeUntil(this.destroyed$),
        map((seccionState) => {
          this.solicitudState = seccionState;
          this.donanteDomicilio()
        })
      )
      .subscribe();
    this.inicializarEstadoFormulario();
  }

  inicializarEstadoFormulario(): void {
    if (this.esFormularioSoloLectura) {
      this.guardarDatosDelFormulario();
    } else {
          this.datosDeAvisoForm()
    }
  }
  /**
   * Actualiza el campo de fecha de pago en el formulario y en el estado global.
   *
   * @param nuevo_fechaPago Nueva fecha de pago seleccionada.
   */
  cambioFechaPago(nuevo_fechaPago: string): void {
    this.registroForm.patchValue({
      fechaPago: nuevo_fechaPago,
    });
    this.setValoresStore(this.registroForm, 'fechaPago', 'setFechaPago');
  }

  /**
   * Maneja el envío del formulario.
   * Valida el formulario antes de realizar acciones adicionales.
   */
  enviarFormulario(): void {
    if (this.registroForm.valid) {
      // Aquí se implementará la lógica para manejar el envío del formulario.
    }else {
      this.validarDestinatarioFormulario();
    }
  }

  /**
   * Verifica si un campo del formulario es válido.
   *
   * @param form Formulario reactivo.
   * @param field Nombre del campo a validar.
   * @returns `true` si el campo es válido, de lo contrario `false`.
   */
  esValido(form: FormGroup, field: string): boolean {
    return this.validacionesService.isValid(form, field) || false;
  }

  /**
   * Marca todos los campos del formulario como tocados si es inválido.
   */
  validarDestinatarioFormulario(): void {
    if (this.registroForm.invalid) {
      this.registroForm.markAllAsTouched();
    }
  }


  guardarDatosDelFormulario(): void {
    if (this.esFormularioSoloLectura) {
      this.registroForm.disable();
    } else {
      this.registroForm.enable();
    }
  }

  /**
   * Actualiza un valor en el estado global utilizando el almacén.
   *
   * @param form Formulario reactivo.
   * @param campo Nombre del campo en el formulario.
   * @param metodoNombre Nombre del método en el almacén para actualizar el valor.
   */
  setValoresStore(
    form: FormGroup,
    campo: string,
    metodoNombre: keyof Tramite31802Store
  ): void {
    const VALOR = form.get(campo)?.value;
    (this.store[metodoNombre] as (value: unknown) => void)(VALOR);
  }

  /**
   * Inicializa el formulario con los valores actuales del estado.
   */
donanteDomicilio(): void {
  this.registroForm = this.fb.group({
    llave: [this.solicitudState?.llave, [Validators.required]],
    manifiesto1: [this.solicitudState?.manifiesto1, [Validators.required]],
    manifiesto2: [this.solicitudState?.manifiesto2, [Validators.required]],
    manifiesto3: [this.solicitudState?.manifiesto3, [Validators.required]],
    numeroOperacion: [this.solicitudState?.numeroOperacion, [Validators.required]],
    fechaPago: [this.solicitudState?.fechaPago, [Validators.required]],
    monedaNacional: [this.solicitudState?.monedaNacional, [Validators.required]],
  });

  // Solo deshabilita el formulario si es de solo lectura
  if (this.esFormularioSoloLectura) {
    this.registroForm.disable();
  }
}

  /**
 * datosDeltrimiteForm los campos del formulario si es de solo lectura.
 * Si el formulario es de solo lectura, deshabilita los campos del formulario de importador/exportador.
 */

  datosDeAvisoForm(): void {
    if (this.esFormularioSoloLectura) {
      this.registroForm.get('llave')?.disable();
      this.registroForm.get('manifiesto1')?.disable();
      this.registroForm.get('manifiesto2')?.disable();
      this.registroForm.get('manifiesto3')?.disable();
      this.registroForm.get('numeroOperacion')?.disable();
      this.registroForm.get('fechaPago')?.disable();
      this.registroForm.get('monedaNacional')?.disable();
    }
  }
  /**
   * Método del ciclo de vida de Angular que se ejecuta al destruir el componente.
   * Cancela todas las suscripciones activas.
   */
  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}
