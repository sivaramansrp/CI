import { AlertComponent, Catalogo, CatalogoSelectComponent, PAGO_DE_DERECHOS, REGEX_SOLO_DIGITOS, TituloComponent, ValidacionesFormularioService } from '@ng-mf/data-access-user';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject, map, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RegistroService } from '../../services/registro.service';
import { Solicitud110223State } from '../../../../estados/tramites/Tramite110223.store';
import { Tramite110223Query } from '../../../../estados/queries/tramite110223.query';
import { Tramite110223Store } from '../../../../estados/tramites/Tramite110223.store';

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
    ReactiveFormsModule,
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
  public solicitudState!: Solicitud110223State;

  /**
   * Notificador para destruir observables al destruir el componente.
   */
  public destroyNotifier$: Subject<void> = new Subject();

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
   * Constructor del componente.
   * @param registroService Servicio para obtener datos de catálogos.
   * @param fb Constructor de formularios reactivos.
   * @param store Tienda para gestionar el estado del trámite.
   * @param query Consultas para obtener datos del estado del trámite.
   * @param validacionesService Servicio para validar formularios.
   */
  constructor(
    private registroService: RegistroService,
    public fb: FormBuilder,
    private store: Tramite110223Store,
    private query: Tramite110223Query,
    private validacionesService: ValidacionesFormularioService
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
        })
      )
      .subscribe();

    this.donanteDomicilio();
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
          this.options = resp.data as Catalogo[];
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
   * Establece valores en el estado de la tienda.
   * @param form Formulario reactivo.
   * @param campo Nombre del campo del formulario.
   * @param metodoNombre Método de la tienda para actualizar el estado.
   */
  setValoresStore(
    form: FormGroup,
    campo: string,
    metodoNombre: keyof Tramite110223Store
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
        nombre: [this.solicitudState?.nombre, [Validators.required]],
        numeroFiscal: [
          this.solicitudState?.numeroFiscal,
          [Validators.required],
        ],
        ciudad: [this.solicitudState?.ciudad, [Validators.required]],
        calle: [this.solicitudState?.calle, [Validators.required]],
        numeroLetra: [this.solicitudState?.numeroLetra, [Validators.required]],
        numeroDeRegistroFiscal: [
          this.solicitudState?.numeroDeRegistroFiscal,
          [Validators.required],
        ],
        telefono: [
          this.solicitudState?.telefono,
          [Validators.required, Validators.pattern(REGEX_SOLO_DIGITOS)],
        ],
        fax: [this.solicitudState?.fax, [Validators.pattern(REGEX_SOLO_DIGITOS)]],
        correoElectronico: [
          this.solicitudState?.correoElectronico,
          [Validators.required, Validators.email],
        ],
        nacion: [this.solicitudState?.nacion]
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
