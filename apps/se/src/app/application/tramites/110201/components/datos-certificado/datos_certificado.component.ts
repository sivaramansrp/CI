import {
  Catalogo,
  ConsultaioQuery,
  ConsultaioState,
  TituloComponent,
  ValidacionesFormularioService,
} from '@ng-mf/data-access-user';
import { CatalogoSelectComponent, CatalogosSelect } from '@libs/shared/data-access-user/src';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { OPTIONS_ENTIDAD_FEDERATIVA, OPTIONS_IDIOMA, OPTIONS_REPRESENTACION_FEDERAL } from '../../models/registro.model';
import { ReplaySubject, map, takeUntil } from 'rxjs';
import {
  Solicitud110201State,
  Tramite110201Store,
} from '../../state/Tramite110201.store';
import { CommonModule } from '@angular/common';
import { RegistroService } from '../../services/registro.service';
import { Tramite110201Query } from '../../state/Tramite110201.query';

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
     * Subject para destruir notificador.
     */
  consultaDatos!: ConsultaioState;
  /**
  * Indica si el formulario está en modo solo lectura.
  * Cuando es `true`, los campos del formulario no se pueden editar.
  */
  soloLectura: boolean = false;
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
  public solicitudState!: Solicitud110201State;

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
   * Notificador para destruir observables al destruir el componente.
   * Se utiliza para gestionar la cancelación de suscripciones activas y evitar fugas de memoria.
   */
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  /**
   * Opciones del catálogo de idiomas.
   * Contiene una lista de objetos del catálogo de idiomas obtenidos desde el servicio.
   */
  public optionsIdioma = OPTIONS_IDIOMA;

  /**
   * Opciones del catálogo de entidades federativas.
   * Contiene una lista de objetos del catálogo de entidades federativas obtenidos desde el servicio.
   */
  public optionsEntidad = OPTIONS_ENTIDAD_FEDERATIVA;


  /**
   * Opciones del catálogo de representaciones federales.
   * Contiene una lista de objetos del catálogo de representaciones federales obtenidos desde el servicio.
   */
  public optionsRepresentacion = OPTIONS_REPRESENTACION_FEDERAL;

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
    public store: Tramite110201Store,
    private query: Tramite110201Query,
    private validacionesService: ValidacionesFormularioService,
    private consultaioQuery: ConsultaioQuery
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
      .subscribe();
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
    this.registroService
      .getRegistroTomaMuestrasMercanciasData().pipe(
        takeUntil(this.destroyed$)
      )
      .subscribe((resp) => {
        if (resp) {
          this.registroService.actualizarEstadoFormulario(resp);
        }
      });

    this.getIdioma();
    this.getEntidad();
    this.getRepresentacion();
    this.inicializarEstadoFormulario();

    this.query.selectSolicitud$
      .pipe(
        takeUntil(this.destroyed$),
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
   * Obtiene el catálogo de idiomas desde el servicio.
   */
  getIdioma(): void {
    this.registroService
      .getIdioma().pipe(takeUntil(this.destroyed$))
      .subscribe((resp) => {
        this.optionsIdioma.catalogos = resp as Catalogo[];
      });
  }
  
  /**
   * Obtiene el catálogo de entidades desde el servicio.
   */
  getEntidad(): void {
    this.registroService
      .getEntidad().pipe(takeUntil(this.destroyed$))
      .subscribe((resp) => {
        this.optionsEntidad.catalogos = resp as Catalogo[];
      });
  }

  /**
   * Obtiene el catálogo de representaciones desde el servicio.
   */
  getRepresentacion(): void {
    this.registroService
      .getRepresentacion().pipe(takeUntil(this.destroyed$))
      .subscribe((resp): void => {
        this.optionsRepresentacion.catalogos = resp as Catalogo[];
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
    metodoNombre: keyof Tramite110201Store
  ): void {
    const VALOR = form.get(campo)?.value;
    (this.store[metodoNombre] as (value: unknown) => void)(VALOR);

    if (VALOR === 8 && metodoNombre === 'setEntidad' && this.entidadFederativaData === 'DURANGO'
    ) {
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
        observaciones: [{ value: this.solicitudState?.observaciones, disabled: this.soloLectura }, [Validators.required]],
        presica: [{ value: this.solicitudState?.presica, disabled: this.soloLectura }, [Validators.required]],
        presenta: [{ value: this.solicitudState?.presenta, disabled: this.soloLectura }, [Validators.required]],
        idioma: [{ value: this.solicitudState?.idioma, disabled: this.soloLectura }, [Validators.required]],
        entidad: [{ value: this.solicitudState?.entidad, disabled: this.soloLectura }, [Validators.required]],
        representacion: [{ value: this.solicitudState?.representacion, disabled: this.soloLectura }, [Validators.required]],
        casillaVerificacion: [{ value: this.solicitudState?.casillaVerificacion, disabled: this.soloLectura }, [Validators.requiredTrue]],
        justificacion: [{ value: this.solicitudState?.justificacion, disabled: this.soloLectura }, [Validators.required]],
      }),
    });
  }
  /**
   * Método que se ejecuta al destruir el componente.
   * Cancela todas las suscripciones activas.
   */
  ngOnDestroy(): void {

    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}
