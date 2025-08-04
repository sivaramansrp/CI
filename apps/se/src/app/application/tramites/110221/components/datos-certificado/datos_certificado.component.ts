import { Catalogo, CatalogoSelectComponent, CatalogosSelect, ConsultaioQuery, ConsultaioState, TituloComponent, ValidacionesFormularioService } from '@ng-mf/data-access-user';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject, map, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RegistroService } from '../../services/registro.service';
import { Solicitud110221State } from '../../../../estados/tramites/Tramite110221.store';
import { Tramite110221Query } from '../../../../estados/queries/Tramite110221.query';
import { Tramite110221Store } from '../../../../estados/tramites/Tramite110221.store';

/**
 * Componente que representa el formulario de datos del certificado en el trámite.
 */
@Component({
  selector: 'app-datos-certificado',
  standalone: true,
  imports: [
    CatalogoSelectComponent,
    CommonModule,
    ReactiveFormsModule,
    TituloComponent,
  ],
  templateUrl: './datos_certificado.component.html',
  styleUrl: './datos_certificado.component.css',
})
export class DatosCertificadoComponent implements OnInit, OnDestroy {
  /**
   * Formulario reactivo para los datos del certificado.
   */
  registroForm!: FormGroup;

  /**
   * Catálogo de idiomas.
   */
  idioma!: CatalogosSelect;

  /**
   * Catálogo de entidades federativas.
   */
  entidad!: CatalogosSelect;

  /**
   * Catálogo de representaciones federales.
   */
  representacion!: CatalogosSelect;

  /**
   * Estado actual de la solicitud.
   */
  public solicitudState!: Solicitud110221State;

  /**
   * Notificador para destruir observables al destruir el componente.
   */
  public destroyNotifier$: Subject<void> = new Subject();

  /**
   * Datos de la entidad federativa proporcionados como entrada.
   */
  @Input() entidadFederativaData: unknown;

  /**
   * Indica si se requiere justificación.
   */
  isJustificacion: boolean = false;

  /**
   * Descripciones de las entidades federativas.
   */
  entidadDescripcion: unknown[] = [];

  /**
   * Opciones del catálogo de idiomas.
   * Contiene una lista de objetos del catálogo de idiomas obtenidos desde el servicio.
   */
  optionsIdioma!: Catalogo[];

  /**
   * Opciones del catálogo de entidades federativas.
   * Contiene una lista de objetos del catálogo de entidades federativas obtenidos desde el servicio.
   */
  optionsEntidad!: Catalogo[];

  /**
   * Opciones del catálogo de representaciones federales.
   * Contiene una lista de objetos del catálogo de representaciones federales obtenidos desde el servicio.
   */
  optionsRepresentacion!: Catalogo[];

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
    this.registroForm.markAllAsTouched();
  }

  /**
   * Método que se ejecuta al inicializar el componente.
   * Obtiene los catálogos de idiomas, entidades y representaciones.
   */
  ngOnInit(): void {
    this.getIdioma();
    this.getEntidad();
    this.getRepresentacion();

    this.query.selectSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.solicitudState = seccionState;
        })
      )
      .subscribe();
    this.donanteDomicilio();

    if (
      this.entidadDescripcion.includes('8') &&
      this.entidadFederativaData === 'DURANGO'
    ) {
      this.isJustificacion = true;
    } else {
      this.isJustificacion = false;
    }
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
   * Obtiene el catálogo de idiomas desde el servicio.
   */
  getIdioma(): void {
    this.registroService
      .getIdioma().pipe(takeUntil(this.destroyNotifier$))
      .subscribe((resp) => {
        if (resp.code === 200) {
          this.optionsIdioma = resp.data as Catalogo[];
        }
      });
  }

  /**
   * Obtiene el catálogo de entidades desde el servicio.
   */
  getEntidad(): void {
    this.registroService
      .getEntidad().pipe(takeUntil(this.destroyNotifier$))
      .subscribe((resp) => {
        if (resp.code === 200) {
          this.optionsEntidad = resp.data as Catalogo[];
        }
      });
  }

  /**
   * Obtiene el catálogo de representaciones desde el servicio.
   */
  getRepresentacion(): void {
    this.registroService
      .getRepresentacion().pipe(takeUntil(this.destroyNotifier$))
      .subscribe((resp) => {
        if (resp.code === 200) {
          this.optionsRepresentacion = resp.data as Catalogo[];
        }
      });
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
    metodoNombre: keyof Tramite110221Store
  ): void {
    const VALOR = form.get(campo)?.value;
    (this.store[metodoNombre] as (value: unknown) => void)(VALOR);

    if (VALOR === 8 && metodoNombre === 'setEntidad' && this.entidadFederativaData === 'DURANGO') {
      this.isJustificacion = true;
    } else {
      this.isJustificacion = false;
    }
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
        observaciones: [
          this.solicitudState?.observaciones,
          [Validators.required],
        ],
       
        entidad: [this.solicitudState?.entidad, [Validators.required]],
        representacion: [
          this.solicitudState?.representacion,
          [Validators.required],
        ],
        casillaVerificacion: [
          this.solicitudState?.casillaVerificacion,
          [Validators.requiredTrue],
        ],
        justificacion: [
          this.solicitudState?.justificacion,
          [Validators.required],
        ],
      }),
    });
    this.inicializarEstadoFormulario();
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

  /**
   * Método que se ejecuta al destruir el componente.
   * Cancela todas las suscripciones activas.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}