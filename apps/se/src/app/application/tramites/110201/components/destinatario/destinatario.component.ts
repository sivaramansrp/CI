import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import {
  Catalogo,
  ConsultaioQuery,
  ConsultaioState,
  TituloComponent,
  ValidacionesFormularioService,
} from '@ng-mf/data-access-user';
import { CatalogoSelectComponent, CatalogosSelect } from '@libs/shared/data-access-user/src';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { OPTIONS_NACION, OPTIONS_TRANSPORTE } from '../../models/registro.model';
import { ReplaySubject, map, takeUntil } from 'rxjs';
import {
  Solicitud110201State,
  Tramite110201Store,
} from '../../state/Tramite110201.store';
import { CommonModule } from '@angular/common';
import { RegistroService } from '../../services/registro.service';
import { Tooltip } from 'bootstrap';
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
export class DestinatarioComponent implements OnInit, OnDestroy, AfterViewInit {
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
   * Valor de país/bloque del certificado de origen para validación cruzada.
   */
  paisCertificadoOrigen: string | null = null;

  /**
   * Controla si hay error de país destino distinto.
   */
  paisNoCoincide: boolean = false;

  /**
   * Indica si el formulario está deshabilitado.
   */
  isDisabled: boolean = false;

  /**
   * Indica si el formulario está vacío.
   */
  estaVacio: boolean = false;

  /**
   * Opciones del catálogo de países de destino.
   * Contiene la configuración y lista de países disponibles para seleccionar como destino.
   */
  public nacionOptions = OPTIONS_NACION;

  /**
   * Opciones del catálogo de medios de transporte.
   * Contiene la configuración y lista de medios de transporte disponibles para la mercancía.
   */
  public transporteOptions = OPTIONS_TRANSPORTE;

  /**
   * Opciones del catálogo de transporte.
   * Contiene una lista de objetos del catálogo obtenidos desde el servicio.
   * Estas opciones se utilizan para poblar los selectores en el formulario.
   */
  option!: Catalogo[];

  /**
   * Notificador para destruir observables al destruir el componente.
   * Se utiliza para gestionar la cancelación de suscripciones activas y evitar fugas de memoria.
   */
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  /**
   * Indica si se ha intentado validar el formulario
   * Se usa para mostrar errores de validación aunque el campo no haya sido tocado
   */
  validationAttempted: boolean = false;

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
    private consultaioQuery: ConsultaioQuery,
    private elRef: ElementRef
  ) {
    this.consultaioQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyed$),
        map((seccionState) => {
          this.consultaDatos = seccionState;
          this.soloLectura = this.consultaDatos.readonly;
          this.inicializarEstadoFormulario();
        })
      )
      .subscribe()
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
        takeUntil(this.destroyed$)
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
        takeUntil(this.destroyed$),
        map((seccionState) => {
          this.solicitudState = seccionState;
          // Guardar el valor de país/bloque del certificado de origen para validación cruzada
          this.paisCertificadoOrigen = seccionState?.pais || null;
        })
      )
      .subscribe();
    this.donanteDomicilio();
  }

  /**
   * 
   * @returns boolean
   * Valida todos los formularios del componente `DestinatarioComponent`.
   * Si la referencia al componente no existe, retorna `true` (no hay formularios que validar).
   * @returns boolean
   */

  validarFormularios(): boolean {

    this.validationAttempted = true;

    if (this.registroForm.valid) {
      return true;
    }
    this.registroForm.markAllAsTouched();
    this.markAllControlsAsTouched(this.registroForm);

    this.validarDestinatarioFormulario();
    return false;
  }

  /**
   * Recursively marks all form controls as touched, including those in nested FormGroups
   * This is needed for custom components that implement ControlValueAccessor
   */
  private markAllControlsAsTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      if (control instanceof FormGroup) {
        this.markAllControlsAsTouched(control);
      } else {
        control?.markAsTouched();
        control?.updateValueAndValidity();
      }
    });
  }

  /**
   * Inicializa los tooltips después de que la vista se haya inicializado.
   * Utiliza Bootstrap para crear tooltips en los elementos con el atributo `data-bs-toggle="tooltip"`.
   * Este método se ejecuta una vez que la vista del componente ha sido completamente renderizada.
   */
  ngAfterViewInit(): void {
    const TOOLTIP_TRIGGER_LIST = this.elRef.nativeElement.querySelectorAll('[data-bs-toggle="tooltip"]');
    TOOLTIP_TRIGGER_LIST.forEach((tooltipTriggerEl: unknown) => {
      return new Tooltip(tooltipTriggerEl as Element);
    });
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
      .getPaisDestino()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((resp) => {
        this.nacionOptions.catalogos = resp as Catalogo[];
      });
  }

  /**
   * Obtiene el catálogo de medios de transporte desde el servicio.
   */
  getTransporte(): void {
    this.registroService
      .getTransporte().pipe(takeUntil(this.destroyed$))
      .subscribe((resp): void => {
        this.transporteOptions.catalogos = resp as Catalogo[];
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
    // Si el campo cambiado es 'nacion', comparar con paisCertificadoOrigen
    if (campo === 'nacion') {
      this.compararPaisDestino(VALOR);
    }
  }

  /**
  * @method validarFormulario
  * @description
  * Valida el formulario de certificado de origen utilizando el componente hijo `CertificadoDeOrigenComponent`.
  * Retorna `true` si el formulario es válido, de lo contrario retorna `false`.
  * Si el componente hijo no está disponible, retorna `false`.
  *
  * @returns {boolean} Indica si el formulario es válido.
  */
  validarFormulario(): boolean {
    let isValid = true;
    if (!this.validarFormularios()) {
      isValid = false;
    }
    return isValid;
  }


  /**
   * Compara el país destino con el país/bloque del certificado de origen.
   * Si no coinciden, activa el error.
   */
  compararPaisDestino(valorNacion: string): void {
    // Si paisCertificadoOrigen no está definido, no mostrar error
    if (!this.paisCertificadoOrigen) {
      this.paisNoCoincide = false;
      return;
    }
    this.paisNoCoincide = valorNacion !== this.paisCertificadoOrigen;
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
        nacion: [{ value: this.solicitudState?.nacion, disabled: this.soloLectura }, [Validators.required]],
        transporte: [{ value: this.solicitudState?.transporte, disabled: this.soloLectura }, [Validators.required]],
        nombre: [{ value: this.solicitudState?.nombre, disabled: this.soloLectura }],
        apellidoPrimer: [{ value: this.solicitudState?.apellidoPrimer, disabled: this.soloLectura }],
        apellidoSegundo: [{ value: this.solicitudState?.apellidoSegundo, disabled: this.soloLectura }],
        numeroFiscal: [{ value: this.solicitudState?.numeroFiscal, disabled: this.soloLectura }, [Validators.required]],
        razonSocial: [{ value: this.solicitudState?.razonSocial, disabled: this.soloLectura }],
        ciudad: [{ value: this.solicitudState?.ciudad, disabled: this.soloLectura }, [Validators.required]],
        calle: [{ value: this.solicitudState?.calle, disabled: this.soloLectura }, [Validators.required]],
        numeroLetra: [{ value: this.solicitudState?.numeroLetra, disabled: this.soloLectura }, [Validators.required]],
        lada: [{ value: this.solicitudState?.lada, disabled: this.soloLectura }],
        telefono: [{ value: this.solicitudState?.telefono, disabled: this.soloLectura }, [Validators.pattern(/^\d+$/)]],
        fax: [{ value: this.solicitudState?.fax, disabled: this.soloLectura }, [Validators.pattern(/^\d+$/)]],
        correoElectronico: [{ value: this.solicitudState?.correoElectronico, disabled: this.soloLectura }, [Validators.required, Validators.email]],
      }),
    });
  }

  /**
   * Método que permite solo números en un campo de entrada.
   * Filtra caracteres no numéricos y limita la longitud según el campo.
   * @param event El evento de entrada del campo.
   */
  onlyNumbers(event: any): void {
    const input = event.target;
    const value = input.value;
    const fieldName = input.getAttribute('formControlName');

    // Filtrar solo números
    const numericValue = value.replace(/[^0-9]/g, '');

    // Establecer límites según el campo
    let maxLength = 10; // por defecto para teléfono
    if (fieldName === 'fax') {
      maxLength = 20;
    }

    // Limitar la longitud
    const limitedValue = numericValue.slice(0, maxLength);

    // Actualizar el valor del campo
    if (value !== limitedValue) {
      input.value = limitedValue;
      // Actualizar el FormControl
      this.registroForm.get('validacionForm.' + fieldName)?.setValue(limitedValue);
    }
  }

  /**
   * Método que se ejecuta al destruir el componente.
   * Cancela todas las suscripciones activas.
   */
  ngOnDestroy(): void {

    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  // /**
  //  * Valida el formulario del destinatario.
  //  * Marca todos los campos como tocados si el formulario es inválido.
  //  * @returns `true` si el formulario es válido, de lo contrario `false`.
  //  */
  // validarFormularios(): boolean {
  //   if (this.registroForm.valid) {
  //     return true;
  //   }
  //   this.registroForm.markAllAsTouched();
  //   return false;
  // }
}
