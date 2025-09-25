import {
  AlertComponent,
  Catalogo,
  ConsultaioQuery,
  ConsultaioState,
  PAGO_DE_DERECHOS,
  TituloComponent,
  ValidacionesFormularioService,
} from '@ng-mf/data-access-user';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Subject, map, takeUntil } from 'rxjs';
import { Tramite110221State, Tramite110221Store } from '../../estados/tramite110221.store';
import { CatalogoSelectComponent } from '@libs/shared/data-access-user/src/tramites/components/catalogo-select/catalogo-select.component';
import { CommonModule } from '@angular/common';
import { Tramite110221Query } from '../../estados/tramite110221.query';
import { ValidarInicialmenteCertificadoService } from '../../services/validar-inicialmente-certificado.service';

/**
 * Componente que representa el formulario de destinatario en el trámite.
 */
@Component({
  selector: 'app-destinatario',
  standalone: true,
  imports: [
    AlertComponent,
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
   * Una cadena que representa la clase CSS para una alerta de información.
   * Esta clase se utiliza para aplicar estilo a los mensajes de información en el componente.
   */
  public infoAlert = 'alert-info';

  /**
   * Constante que contiene los textos para el pago de derechos.
   */
  TEXTOS = PAGO_DE_DERECHOS;

  /**
   * Formulario reactivo para el destinatario.
   */
  registroForm!: FormGroup;

  /**
   * Estado actual de la solicitud.
   */
  public solicitudState!: Tramite110221State;

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
  optionsPaisDestino!: Catalogo[];

  /**
   * Estado actual de la consulta, que contiene información relacionada con el trámite y el solicitante.
   */
  consultaDatos!: ConsultaioState;

  /**
   * Indica si el formulario o los campos están en modo de solo lectura.
   * @default false
   */
  soloLectura: boolean = false;
  /**
   * Catálogo de países de destino.
   * @type {Catalogo[]}
   */
  
  /**
   * Constructor del componente.
   * @param registroService Servicio para obtener datos de catálogos.
   * @param fb Constructor de formularios reactivos.
   * @param store Tienda para gestionar el estado del trámite.
   * @param query Consultas para obtener datos del estado del trámite.
   * @param validacionesService Servicio para validar formularios.
   * @param consultaioQuery Consulta para obtener datos del estado de consulta.
   */
  constructor(
    private ValidarInicialmenteCertificadoService: ValidarInicialmenteCertificadoService,
    public fb: FormBuilder,
    private store: Tramite110221Store,
    private query: Tramite110221Query,
    private validacionesService: ValidacionesFormularioService,
    private consultaioQuery: ConsultaioQuery
  ) {
    // El constructor se utiliza para la inyección de dependencias.
  }

  /**
   * Valida el formulario del destinatario.
   * Marca todos los campos como tocados si el formulario es inválido.
   */
  validarDestinatarioFormulario(): void {
     if (this.registroForm.invalid) {
    this.markAllControlsAsTouched(this.registroForm);
  }
  }

   markAllControlsAsTouched(formGroup: FormGroup): void {
  Object.keys(formGroup.controls).forEach((key) => {
    const CONTROL = formGroup.get(key);
    if (CONTROL instanceof FormGroup) {
      this.markAllControlsAsTouched(CONTROL);
    } else {
      CONTROL?.markAsTouched();
      CONTROL?.updateValueAndValidity();
    }
  });
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
    this.getPaisDestino();
    this.query.selectSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.solicitudState = seccionState;
          this.donanteDomicilio();
        })
      )
      .subscribe();
    
    this.consultaioQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.consultaDatos = seccionState;
          this.soloLectura = this.consultaDatos.readonly;
          this.inicializarEstadoFormulario();
        })
      )
      .subscribe();
  }

  /**
   * Obtiene el catálogo de países de destino desde el servicio.
   */
  getPaisDestino(): void {
    this.ValidarInicialmenteCertificadoService
      .getPaisDestino()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((resp) => {
        if (resp.code === 200) {
          this.optionsPaisDestino = resp.data as Catalogo[];
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
   * Maneja el cambio de país de destino en el formulario.
   * @param {Catalogo} event - El catálogo seleccionado.
   * @returns {void}
   */
  cambioPaisDestino(event: Catalogo): void {
    this.registroForm.patchValue({
      paisDestino: event.id,
    });
  }

/**
 * Configura el formulario reactivo con los valores iniciales del estado.
 */
donanteDomicilio(): void {
  this.registroForm = this.fb.group({
    destinatarioForm: this.createDestinatarioForm(),
    domicilioForm: this.createDomicilioForm(),
    representanteLegalForm: this.createRepresentanteLegalForm()
  });
  this.inicializarEstadoFormulario();
}

/**
 * Crea el formulario de destinatario.
 */
private createDestinatarioForm(): FormGroup {
  return this.fb.group({
    nombre: [this.solicitudState?.destinatarioForm.nombre || '', [Validators.required, Validators.maxLength(250)]],
    numeroFiscal: [this.solicitudState?.destinatarioForm.numeroFiscal || '', [Validators.required, Validators.maxLength(30)]],
  });
}

/**
 * Crea el formulario de domicilio.
 */
private createDomicilioForm(): FormGroup {
  return this.fb.group({
    calle: [this.solicitudState.domicilioForm.calle || '', [Validators.required, Validators.maxLength(90)]],
    numeroLetra: [this.solicitudState.domicilioForm.numeroLetra || '', [Validators.required, Validators.maxLength(30)]],
    paisDestino: [this.solicitudState.domicilioForm.paisDestino || '', Validators.required],
    ciudad: [this.solicitudState.domicilioForm.ciudad || '', [Validators.required, Validators.maxLength(50)]],
    correoElectronico: [this.solicitudState.domicilioForm.correoElectronico || '', [Validators.required, Validators.email, Validators.maxLength(70)]],
    lada: [this.solicitudState.domicilioForm.lada || '', [Validators.maxLength(5)]],
    telefono: [this.solicitudState.domicilioForm.telefono || '', [Validators.maxLength(20)]],
  });
}

/**
 * Crea el formulario de representante legal.
 */
private createRepresentanteLegalForm(): FormGroup {
  return this.fb.group({
    nombreRepresentante: [this.solicitudState?.representanteLegalForm.nombreRepresentante || '', Validators.required],
    lugar: [this.solicitudState?.representanteLegalForm.lugar || '', Validators.required],
    calle: [this.solicitudState?.representanteLegalForm.calle || '', Validators.required],
    numero: [this.solicitudState?.representanteLegalForm.numero || '', Validators.required],
    pais: [this.solicitudState?.representanteLegalForm.pais || '', Validators.required],
    ciudad: [this.solicitudState?.representanteLegalForm.ciudad || '', Validators.required],
    cargo: [this.solicitudState?.representanteLegalForm.cargo || '', Validators.required],
    empresa: [this.solicitudState?.representanteLegalForm.empresa || '', Validators.required],
    numeroRegistroFiscal: [this.solicitudState?.representanteLegalForm.numeroRegistroFiscal || '', Validators.required],
    lada: [this.solicitudState?.representanteLegalForm.lada || '', [Validators.pattern(/^[0-9]{1,5}$/)]],
    telefono: [this.solicitudState?.representanteLegalForm.telefono || '', [Validators.required, Validators.pattern(/^[0-9]{7,15}$/)]],
    fax: [this.solicitudState?.representanteLegalForm.fax || '', [Validators.required]],
    correoElectronico: [this.solicitudState?.representanteLegalForm.correoElectronico || '', [Validators.required, Validators.email]],
  });
}

  /**
   * Inicializa el estado del formulario (habilitado/deshabilitado) basado en el modo de solo lectura.
   */
  inicializarEstadoFormulario(): void {
    if (this.soloLectura) {
      this.registroForm?.disable();
    } else {
      this.registroForm?.enable();
    }
  }
setrepresentanteLegalForm():void{
  this.store.setRepresentanteLegalForm(this.registroForm.value.representanteLegalForm)
}
setdomicilioForm():void{
  this.store.setDomicilioForm(this.registroForm.value.domicilioForm)
}
setdestinatarioForm():void{
  this.store.setDestinatarioForm(this.registroForm.value.destinatarioForm)
}
  /**
   * Pasa el valor de un campo del formulario a la tienda para la gestión del estado.
   * @param form - El formulario reactivo.
   * @param campo - El nombre del campo en el formulario.
   */
  setValoresStore(form: FormGroup | null, campo: string): void {
    if (!form) {
      return;
    }
    const CONTROL = form.get(campo);
    if (CONTROL && CONTROL.value !== null && CONTROL.value !== undefined) {
      this.store.actualizarEstado({
        [campo]: CONTROL.value,
      });
    }
  }

  /**
   * Método que se ejecuta al destruir el componente.
   * Cancela todas las suscripciones activas.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
  /**
 * @method validatorCheck
 * @description Método que valida el estado del formulario.
 * Verifica si todos los formularios hijos son válidos.
 * @returns {boolean} - Retorna true si todos los formularios son válidos, de lo contrario false.
 */

  validatorCheck(): boolean {
    if (!this.registroForm) {
      return false;
    }
    const DESTINATARIO_FORM_VALID = this.registroForm.get('destinatarioForm')?.valid;
    const DOMICILIO_FORM_VALID = this.registroForm.get('domicilioForm')?.valid;
    const REPRESENTANTE_LEGAL_FORM_VALID = this.registroForm.get('representanteLegalForm')?.valid;

    if (DESTINATARIO_FORM_VALID && DOMICILIO_FORM_VALID && REPRESENTANTE_LEGAL_FORM_VALID) {
      return true;
    }
    this.registroForm.get('destinatarioForm')?.markAllAsTouched();
    this.registroForm.get('domicilioForm')?.markAllAsTouched();
    this.registroForm.get('representanteLegalForm')?.markAllAsTouched();
    return false;
  }
}

