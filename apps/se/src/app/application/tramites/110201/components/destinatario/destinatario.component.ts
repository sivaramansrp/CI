import {
  Catalogo,
  CatalogoSelectComponent,
  ConsultaioQuery,
  ConsultaioState,
  TituloComponent,
  ValidacionesFormularioService,
} from '@ng-mf/data-access-user';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { ReplaySubject, Subject, map, takeUntil } from 'rxjs';
import {
  Solicitud110201State,
  Tramite110201Store,
} from '../../state/Tramite110201.store';
import { CatalogosSelect } from '@libs/shared/data-access-user/src/core/models/shared/components.model';
import { CommonModule } from '@angular/common';
import { RegistroService } from '../../services/registro.service';
import { Tramite110201Query } from '../../state/Tramite110201.query';

/**
 * Componente que representa el formulario de destinatario en el trámite.
 */
@Component({
  selector: 'app-destinatario',
  standalone: true,
  imports: [
    CommonModule,
    TituloComponent,
    CatalogoSelectComponent,
    ReactiveFormsModule
  ],
  templateUrl: './destinatario.component.html',
  styleUrl: './destinatario.component.css',
})
export class DestinatarioComponent implements OnInit, OnDestroy {
  /**
     * Subject para destruir notificador.
     */
    consultaDatos!: ConsultaioState;
     /**
     * Indica si el formulario está en modo solo lectura.
     * Cuando es `true`, los campos del formulario no se pueden editar.
     */
    soloLectura: boolean = false;
  /**
   * Formulario reactivo para el destinatario.
   */
  registroForm!: FormGroup;

  /**
   * Catálogo de países de destino.
   */
  nacion!: CatalogosSelect;

  /**
   * Catálogo de medios de transporte.
   */
  transporte!: CatalogosSelect;

  /**
   * Estado actual de la solicitud.
   */
  public solicitudState!: Solicitud110201State;

  /**
   * Notificador para destruir observables al destruir el componente.
   */
  public destroyNotifier$: Subject<void> = new Subject();

  /**
   * Indica si el formulario está deshabilitado.
   */
  isDisabled: boolean = false;

  /**
   * Indica si el formulario está vacío.
   */
  estaVacio: boolean = false;
/**
 * Opciones del catálogo.
 * Contiene una lista de objetos del catálogo obtenidos desde el servicio.
 * Estas opciones se utilizan para poblar los selectores en el formulario.
 */
options!: Catalogo[];

option!: Catalogo[];

/**
 * Notificador para destruir observables al destruir el componente.
 * Se utiliza para gestionar la cancelación de suscripciones activas y evitar fugas de memoria.
 */
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  /**
   * Constructor del componente.
   * @param registroService Servicio para obtener datos de catálogos.
   * @param fb Constructor de formularios reactivos.
   * @param store Tienda para gestionar el estado del trámite.
   * @param query Consultas para obtener datos del estado del trámite.
   * @param validacionesService Servicio para validar formularios.
   */
  constructor(
    public registroService: RegistroService,
    public fb: FormBuilder,
    public store: Tramite110201Store,
    private query: Tramite110201Query,
    private validacionesService: ValidacionesFormularioService,
    private consultaioQuery: ConsultaioQuery
  ) {
    
  }

  /**
   * Valida el formulario del destinatario.
   * Marca todos los campos como tocados si el formulario es inválido.
   */
  validarDestinatarioFormulario(): void {
    if (this.registroForm.invalid) {
      this.registroForm.markAllAsTouched();
    }
  }

  /**
   * Maneja el evento de clic para deshabilitar el formulario.
   */
  onClick(): void {
    this.isDisabled = true;
  }

  /**
   * Método que se ejecuta al inicializar el componente.
   * Obtiene los catálogos de países de destino y medios de transporte.
   */
  ngOnInit(): void {
    this.registroService
      .getRegistroTomaMuestrasMercanciasData().pipe(
        takeUntil(this.destroyNotifier$)
      )
      .subscribe((resp) => {
        if (resp) {
          this.registroService.actualizarEstadoFormulario(resp);
        }
      });
    this.getPaisDestino();
    this.getTransporte();
    this.inicializarEstadoFormulario();

    this.query.selectSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.solicitudState = seccionState;
        })
      )
      .subscribe();
    this.donanteDomicilio();

  }
/**
   * Evalúa si se debe inicializar o cargar datos en el formulario.
   * Además, obtiene la información del catálogo de mercancía.
   */
  inicializarEstadoFormulario(): void {
    if (this.soloLectura) {
      this.guardarDatosFormulario();
    } else {
      this.donanteDomicilio();
    }
  }

  /**
   * Carga datos desde un archivo JSON y actualiza el store con la información obtenida.
   * Luego reinicializa el formulario con los valores actualizados desde el store.
   */
  guardarDatosFormulario(): void {
    this.donanteDomicilio();
    if (this.soloLectura) {
      this.registroForm.disable();
    } else {
      this.registroForm.enable();
    }
  }
  /**
   * Obtiene el catálogo de países de destino desde el servicio.
   */
  getPaisDestino(): void {
    this.registroService
      .getPaisDestino().pipe(takeUntil(this.destroyed$))
      .subscribe((resp) => {
       if (resp.code === 200) {
          this.options = resp.data as Catalogo[];
        }
      });
  }

  /**
   * Obtiene el catálogo de medios de transporte desde el servicio.
   */
  getTransporte(): void {
    this.registroService
      .getTransporte().pipe(takeUntil(this.destroyed$))
      .subscribe((resp) => {
        if (resp.code === 200) {
          this.option = resp.data as Catalogo[];
        }
      });
  }

  /**
   * Maneja el envío del formulario.
   */
  onSubmit(): void {
    if (this.registroForm.valid) {
      // Aquí se implementará la lógica para manejar el envío del formulario.
    }
  }

  /**
   * Verifica si un campo del formulario es válido.
   * @param form Formulario reactivo.
   * @param field Nombre del campo a validar.
   * @returns `true` si el campo es válido, de lo contrario `false`.
   */
  isValid(form: FormGroup, field: string): boolean {
    return this.validacionesService.isValid(form, field) || false;
  }

  /**
   * Establece valores en el estado de la tienda.
   * @param form Formulario reactivo.
   * @param campo Nombre del campo del formulario.
   * @param metodoNombre Método de la tienda para actualizar el estado.
   */
  setValoresStore(
    form: FormGroup,
    campo: string,
    metodoNombre: keyof Tramite110201Store
  ): void {
    const VALOR = form.get(campo)?.value;
    (this.store[metodoNombre] as (value: unknown) => void)(VALOR);
  }

  /**
   * Obtiene el formulario de validación.
   */
  get validacionForm(): FormGroup {
    return this.registroForm.get('validacionForm') as FormGroup;
  }

  /**
   * Configura el formulario reactivo con los valores iniciales del estado.
   */
  donanteDomicilio(): void {
    this.registroForm = this.fb.group({
      validacionForm: this.fb.group({
        nacion: [{value:this.solicitudState?.nacion, disabled: this.soloLectura}],
        transporte: [{value:this.solicitudState?.transporte, disabled: this.soloLectura}, [Validators.required]],
        nombre: [this.solicitudState?.nombre, [Validators.required]],
        apellidoPrimer: [
          this.solicitudState?.apellidoPrimer,
          [Validators.required],
        ],
        apellidoSegundo: [
          this.solicitudState?.apellidoSegundo,
          [Validators.required],
        ],
        numeroFiscal: [
          this.solicitudState?.numeroFiscal,
          [Validators.required],
        ],
        razonSocial: [this.solicitudState?.razonSocial, [Validators.required]],
        ciudad: [this.solicitudState?.ciudad, [Validators.required]],
        calle: [this.solicitudState?.calle, [Validators.required]],
        numeroLetra: [this.solicitudState?.numeroLetra, [Validators.required]],
        lada: [this.solicitudState?.lada, [Validators.required]],
        telefono: [
          this.solicitudState?.telefono,
          [Validators.required, Validators.pattern(/^\d+$/)],
        ],
        fax: [this.solicitudState?.fax, [Validators.pattern(/^\d+$/)]],
        correoElectronico: [
          this.solicitudState?.correoElectronico,
          [Validators.required, Validators.email],
        ],
      }),
    });
  }

  /**
   * Método que se ejecuta al destruir el componente.
   * Cancela todas las suscripciones activas.
   */
  ngOnDestroy(): void {
   
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
