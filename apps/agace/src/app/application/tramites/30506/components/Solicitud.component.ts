import {
  Catalogo,
  CatalogoSelectComponent,
  CatalogosSelect,
  ConsultaioState,
  InputFecha,
  InputFechaComponent,
  TituloComponent,
  ValidacionesFormularioService,
} from '@libs/shared/data-access-user/src';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FECHA_FINAL, FECHA_INICIAL, FECHA_PAGO } from '../models/registro.model';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ReplaySubject, map, takeUntil } from 'rxjs';
import { Solicitud30506State, Tramite30506Store } from '../state/Tramite30506.store';
import { CommonModule } from '@angular/common';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { RegistroService } from '../services/registro.service';
import { Solicitud30506Enum } from '../constantes/solicitud30506.enum';
import { Tramite30506Query } from '../state/Tramite30506.query';


/**
 * Componente que gestiona la solicitud del trámite 30506.
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
  providers: [],
  templateUrl: './Solicitud.component.html',
  styleUrl: './Solicitud.component.css',
})
export class SolicitudComponent implements OnInit, OnDestroy {

  /**
   * Estado actual de la solicitud.
   */
  public solicitudState!: Solicitud30506State;

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
  solicitudEnum = Solicitud30506Enum;

  /**
   * Formulario reactivo para gestionar los datos de la solicitud.
   */
  registroForm!: FormGroup;


  /**
    * Subject para destruir notificador.
    */
  consultaDatos!: ConsultaioState;

  /**
   * Indica si el formulario se encuentra en modo solo lectura.
   * Si es `true`, los controles del formulario estarán deshabilitados para evitar modificaciones.
   */
  esFormularioSoloLectura: boolean = false;

  /**
   * Subject utilizado para notificar y limpiar suscripciones activas al destruir el componente.
   * Se emite un valor y se completa en el método `ngOnDestroy` para evitar fugas de memoria.
   */
  public destroyNotifier$: ReplaySubject<boolean> = new ReplaySubject(1);

  /**
  * Configuración para el catálogo de bancos.
  */
  public bancoCatalogo: CatalogosSelect = {
    labelNombre: 'Banco',
    required: false,
    primerOpcion: 'Selecciona un valor',
    catalogos: [],
  };

  /**
   * Constructor del componente.
   * Se utiliza para la inyección de dependencias.
   *
   * @param registroService Servicio para obtener datos relacionados con la solicitud.
   * @param fb Constructor de formularios reactivos.
   * @param store Almacén global para gestionar el estado del trámite.
   * @param query Consulta para obtener el estado actual del trámite.
   * @param validacionesService Servicio para validar campos del formulario.
   */
  constructor(
    private consultaioQuery: ConsultaioQuery,
    private registroService: RegistroService,
    public fb: FormBuilder,
    private store: Tramite30506Store,
    private query: Tramite30506Query,
    private validacionesService: ValidacionesFormularioService
  ) {
    this.consultaioQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.consultaDatos = seccionState;
          this.esFormularioSoloLectura = this.consultaDatos.readonly;
        })
      )
      .subscribe()
  }

  /**
   * Método del ciclo de vida de Angular que se ejecuta al inicializar el componente.
   * Configura el formulario, obtiene datos iniciales y suscribe al estado global.
   */
  ngOnInit(): void {
    this.obtenerDatosBanco();
    this.query.selectSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.solicitudState = seccionState;
        })
      )
      .subscribe();
    this.donanteDomicilio()
  }

  /**
   * Determina el estado inicial del formulario según el modo de solo lectura.
   * 
   * Si el formulario está en modo solo lectura, llama a `guardarDatosDelFormulario()` para deshabilitar los campos.
   * Si no está en modo solo lectura, llama a `datosDeAvisoForm()` para aplicar la configuración correspondiente.
   */
  inicializarEstadoFormulario(): void {
    if (this.esFormularioSoloLectura) {
      this.guardarDatosDelFormulario();
    } else {
      this.datosDeAvisoForm();
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
   * Obtiene los datos del catálogo de bancos desde el servicio.
   */
  obtenerDatosBanco(): void {
    this.registroService
      .obtenerDatosBanco()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((resp): void => {
        this.bancoCatalogo.catalogos = resp as Catalogo[];
      });
  }

  /**
   * Maneja el envío del formulario.
   * Valida el formulario antes de realizar acciones adicionales.
   */
  enviarFormulario(): void {
    if (this.registroForm.valid) {
      // Aquí se implementará la lógica para manejar el envío del formulario.
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
    metodoNombre: keyof Tramite30506Store
  ): void {
    const VALOR = form.get(campo)?.value;
    (this.store[metodoNombre] as (value: unknown) => void)(VALOR);
  }

  /**
 * Habilita o deshabilita el formulario de acuerdo al modo de solo lectura.
 * 
 * Si el formulario está en modo solo lectura (`esFormularioSoloLectura` es `true`), 
 * deshabilita todos los campos del formulario para evitar modificaciones.
 * En caso contrario, habilita los campos para permitir la edición.
 */
  guardarDatosDelFormulario(): void {
    if (this.esFormularioSoloLectura) {
      this.registroForm.disable();
    } else {
      this.registroForm.enable();
    }
  }

  /**
   * Inicializa el formulario reactivo `registroForm` con los valores actuales del estado de la solicitud.
   * 
   * Crea el formulario con los campos requeridos y sus validaciones, utilizando los valores actuales de `solicitudState`.
   * Al finalizar, llama a `inicializarEstadoFormulario()` para aplicar la configuración de solo lectura si corresponde.
   */
  donanteDomicilio(): void {
    this.registroForm = this.fb.group({
      banco: [this.solicitudState?.banco, [Validators.required]],
      llave: [this.solicitudState?.llave, [Validators.required]],
      manifiesto1: [this.solicitudState?.manifiesto1, [Validators.required]],
      manifiesto2: [this.solicitudState?.manifiesto2, [Validators.required]],
      numeroOperacion: [this.solicitudState?.numeroOperacion, [Validators.required],],
      fechaPago: [this.solicitudState?.fechaPago, [Validators.required]],
      fechaInicio: [this.solicitudState?.fechaInicio, [Validators.required]],
      fechaFinal: [this.solicitudState?.fechaFinal, [Validators.required]],
    });
    this.inicializarEstadoFormulario();
  }

  /**
   * datosDeltrimiteForm los campos del formulario si es de solo lectura.
   * Si el formulario es de solo lectura, deshabilita los campos del formulario de importador/exportador.
   */

  datosDeAvisoForm(): void {
    if (this.esFormularioSoloLectura) {
      this.registroForm.get('banco')?.disable();
      this.registroForm.get('manifiesto1')?.disable();
      this.registroForm.get('manifiesto2')?.disable();
      this.registroForm.get('llave')?.disable();
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
    this.destroyNotifier$.next(true);
    this.destroyNotifier$.complete();
  }
}
