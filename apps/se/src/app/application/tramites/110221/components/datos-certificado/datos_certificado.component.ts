import {
  CatalogoSelectComponent,
  CatalogosSelect,
  TituloComponent,
  ValidacionesFormularioService,
} from '@ng-mf/data-access-user';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Subject, Subscription, map, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RegistroService } from '../../services/registro.service';
import { Solicitud110221State, Tramite110221Store } from '../../state/Tramite110221.store';
import { Tramite110221Query } from '../../state/Tramite110221.query';

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
   * Lista de suscripciones activas.
   */
  private subscriptions: Subscription[] = [];

  /**
   * Suscripción para obtener el catálogo de idiomas.
   */
  getIdiomaSubscripcion!: Subscription;

  /**
   * Suscripción para obtener el catálogo de entidades.
   */
  getEntidadSubscripcion!: Subscription;

  /**
   * Suscripción para obtener el catálogo de representaciones.
   */
  getRepresentacionSubscripcion!: Subscription;

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
  @Input() entidadFederativaData: any;

  /**
   * Indica si se requiere justificación.
   */
  isJustificacion: boolean = false;

  /**
   * Descripciones de las entidades federativas.
   */
  entidadDescripcion: unknown[] = [];

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
    private store: Tramite110221Store,
    private query: Tramite110221Query,
    private validacionesService: ValidacionesFormularioService
  ) {
    // El constructor se utiliza para la inyección de dependencias.
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

    this.subscriptions.push(
      this.query.selectIdioma$.subscribe((idioma) => {
        this.idioma = {
          labelNombre: 'Idioma',
          required: true,
          primerOpcion: 'Selecciona un valor',
          catalogos: idioma ?? [],
        };
      })
    );

    this.subscriptions.push(
      this.query.selectEntidad$.subscribe((entidad) => {
        this.entidad = {
          labelNombre: 'Entidad federativa',
          required: true,
          primerOpcion: 'Selecciona un valor',
          catalogos: entidad ?? [],
        };
        this.entidadDescripcion = this.entidad.catalogos;
        if (
          this.entidadDescripcion.includes('8') &&
          this.entidadFederativaData === 'DURANGO'
        ) {
          this.isJustificacion = true;
        } else {
          this.isJustificacion = false;
        }
      })
    );

    this.subscriptions.push(
      this.query.selectRepresentacion$.subscribe((representacion) => {
        this.representacion = {
          labelNombre: 'Representación federal',
          required: true,
          primerOpcion: 'Selecciona un valor',
          catalogos: representacion ?? [],
        };
      })
    );
  }

  /**
   * Obtiene el catálogo de idiomas desde el servicio.
   */
  getIdioma(): void {
    this.getIdiomaSubscripcion = this.registroService
      .getIdioma()
      .subscribe((resp) => {
        if (resp.code === 200) {
          const RESPONSE = resp.data;
          this.store.setIdioma(RESPONSE);
        }
      });
  }

  /**
   * Obtiene el catálogo de entidades desde el servicio.
   */
  getEntidad(): void {
    this.getEntidadSubscripcion = this.registroService
      .getEntidad()
      .subscribe((resp) => {
        if (resp.code === 200) {
          const RESPONSE = resp.data;
          this.store.setEntidad(RESPONSE);
        }
      });
  }

  /**
   * Obtiene el catálogo de representaciones desde el servicio.
   */
  getRepresentacion(): void {
    this.getRepresentacionSubscripcion = this.registroService
      .getRepresentacion()
      .subscribe((resp) => {
        if (resp.code === 200) {
          const RESPONSE = resp.data;
          this.store.setRepresentacion(RESPONSE);
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
        presica: [this.solicitudState?.presica, [Validators.required]],
        presenta: [this.solicitudState?.presenta, [Validators.required]],
        idioma: [this.solicitudState?.idioma, [Validators.required]],
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
  }

  /**
   * Método que se ejecuta al destruir el componente.
   * Cancela todas las suscripciones activas.
   */
  ngOnDestroy(): void {
    if (this.getIdiomaSubscripcion) {
      this.getIdiomaSubscripcion.unsubscribe();
    }
    if (this.getEntidadSubscripcion) {
      this.getEntidadSubscripcion.unsubscribe();
    }
    if (this.getRepresentacionSubscripcion) {
      this.getRepresentacionSubscripcion.unsubscribe();
    }
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
