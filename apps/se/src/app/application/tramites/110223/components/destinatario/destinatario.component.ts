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
import { CatalogoSelectComponent } from '@libs/shared/data-access-user/src/tramites/components/catalogo-select/catalogo-select.component'; 
import { CommonModule } from '@angular/common';
import { RegistroService } from '../../services/registro.service';
import { Tramite110223Query } from '../../query/tramite110223.query';
import { Tramite110223Store } from '../../estados/Tramite110223.store';
import { TramiteState } from '../../estados/Tramite110223.store';

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
   * Clase CSS para una alerta de información.
   */
  public infoAlert = 'alert-info';

  /**
   * Constante que contiene los textos de pago de derechos.
   */
  TEXTOS = PAGO_DE_DERECHOS;

  /**
   * Formulario reactivo para el destinatario.
   */
  registroForm!: FormGroup;

  /**
   * Estado actual de la solicitud.
   */
  public solicitudState!: TramiteState;

  /**
   * Notificador para destruir observables al destruir el componente.
   */
  public destroyNotifier$: Subject<void> = new Subject();
    /**
   * Opciones del catálogo.
   * Contiene una lista de objetos del catálogo obtenidos desde el servicio.
   * Estas opciones se utilizan para poblar los selectores en el formulario.
   */
  optionsPaisDestino!: Catalogo[];

  /**
   * Indica si el formulario está deshabilitado.
   */
  isDisabled = false;

  /**
   * Indica si el formulario está vacío.
   */
  estaVacio = false;

  /**
   * Opciones del catálogo.
   */
  public options!: Catalogo[];
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
   * Constructor del componente.
   * @param registroService Servicio para obtener datos de catálogos.
   * @param fb Constructor de formularios reactivos.
   * @param store Tienda para gestionar el estado del trámite.
   * @param query Consultas para obtener datos del estado del trámite.
   * @param validacionesService Servicio para validar formularios.
   * @param consultaioQuery Consulta para obtener datos del estado de consulta.
   */
  constructor(
    private registroService: RegistroService,
    public fb: FormBuilder,
    private store: Tramite110223Store,
    private query: Tramite110223Query,
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
    this.registroForm.markAllAsTouched();
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
    this.getTransporte();

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
    this.registroService
      .getPaisDestino()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((resp) => {
        if (resp.code === 200) {
          this.optionsPaisDestino = resp.data as Catalogo[];
        }
      });
  }

  /**
   * Obtiene el catálogo de medios de transporte desde el servicio.
   */
  getTransporte(): void {
    this.registroService
      .getTransporte()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((resp) => {
        if (resp.code === 200) {
          this.options = resp.data as Catalogo[];
        }
      });
  }

  /**
   * Maneja el envío del formulario.
   */
  onSubmit(): void {
    if (this.registroForm.valid) {
      // Implementar lógica para manejar el envío del formulario.
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
      destinatarioForm : this.fb.group({
      nombre: [this.solicitudState?.destinatarioForm.nombre||'', [Validators.required, Validators.maxLength(250)]],
      numeroFiscal: [this.solicitudState?.destinatarioForm.numeroFiscal||'', [Validators.required, Validators.maxLength(30)]],
    }),
     domicilioForm : this.fb.group({
      calle: [this.solicitudState.domicilioForm.calle || '', [Validators.required, Validators.maxLength(90)]],
      numeroLetra: [this.solicitudState.domicilioForm.numeroLetra || '', [Validators.required, Validators.maxLength(30)]],
      paisDestino: [this.solicitudState.domicilioForm.paisDestino || '', Validators.required],
      ciudad: [this.solicitudState.domicilioForm.ciudad || '', [Validators.required, Validators.maxLength(50)]],
      correoElectronico: [this.solicitudState.domicilioForm.correoElectronico || '', [Validators.required, Validators.email, Validators.maxLength(70)]],
      lada: [this.solicitudState.domicilioForm.lada || '', [Validators.maxLength(5)]],
      telefono: [this.solicitudState.domicilioForm.telefono || '', [Validators.maxLength(20)]],
    }),
    representanteLegalForm : this.fb.group({
  lugar: [this.solicitudState?.representanteLegalForm.lugar || '', Validators.required],
  nombreRepresentante: [this.solicitudState?.representanteLegalForm.nombreRepresentante || '', Validators.required],
  empresa: [this.solicitudState?.representanteLegalForm.empresa || '', Validators.required],
  cargo: [this.solicitudState?.representanteLegalForm.cargo || '', Validators.required],
  lada: [this.solicitudState?.representanteLegalForm.lada || ''],
  telefono: [this.solicitudState?.representanteLegalForm.telefono || '', Validators.required],
  fax: [this.solicitudState?.representanteLegalForm.fax || '', Validators.required], 
  correoElectronico: [this.solicitudState?.representanteLegalForm.correoElectronico || '', [Validators.required, Validators.email]] 
})
 });
    this.inicializarEstadoFormulario();
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
   * Método que se ejecuta al destruir el componente.
   * Cancela todas las suscripciones activas.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
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
