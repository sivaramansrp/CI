import { Catalogo, CatalogoSelectComponent, SeccionLibQuery, SeccionLibState, SeccionLibStore, TituloComponent } from '@libs/shared/data-access-user/src';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable, Subject, delay, map, takeUntil, tap } from 'rxjs';
import { CertificadosOrigenGridService } from '../../services/certificadosOrigenGrid.service';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { Tramite110204Query } from '../../estados/tramite110204.query';
import { Tramite110204Store } from '../../estados/tramite110204.store';

/**
 * Componente que maneja los datos del certificado.
 * Se encarga de la carga de información, el manejo de formularios y la interacción con el store.
 */
@Component({
  selector: 'app-datos-certificado',
  imports: [TituloComponent, ReactiveFormsModule, CatalogoSelectComponent, CommonModule],
  templateUrl: './datos-certificado.component.html',
  styleUrl: './datos-certificado.component.scss',
  standalone: true
})
export class DatosCertificadoComponent implements OnInit, OnDestroy {

  /**
   * @input
   * @desc Indica si el formulario debe estar deshabilitado.
   * @type {boolean}
   * @default false
   * @compodoc
   */
  @Input() formularioDeshabilitado: boolean = false;
  
  /**
   * Formulario reactivo que contiene los datos del certificado.
   * Utilizado para la validación y gestión de los datos en el formulario.
   */
  formDatosCertificado!: FormGroup;

  /**
   * Subject utilizado para gestionar el ciclo de vida del componente y cancelar las suscripciones.
   */
  destroyNotifier$: Subject<void> = new Subject();

  /**
   * Observable que contiene la lista de idiomas disponibles.
   */
  idioma$!: Observable<Catalogo[]>;

  /**
   * Observable que contiene la lista de entidades federativas disponibles.
   */
  entidadFederativas$!: Observable<Catalogo[]>;

  /**
   * Observable que contiene la lista de representaciones federales disponibles.
   */
  representacionFederal$!: Observable<Catalogo[]>;

    /**
     * Estado de la sección, gestionado mediante el store.
     * @type {SeccionLibState}
     */
    private seccion!: SeccionLibState
    ;

    /**
   * @descripcion
   * Indica si el formulario se encuentra en modo solo lectura.
   * Cuando es verdadero, los controles del formulario estarán deshabilitados.
   */
  esFormularioSoloLectura: boolean = false;
  
  /**
   * @private
   * @desc Bandera para evitar bucles infinitos al actualizar el formulario.
   * Se utiliza para distinguir entre actualizaciones programáticas y del usuario.
   */
  private actualizandoFormulario = false;

  /**
   * @constructor
   * @desc
   * Constructor del componente `DatosCertificadoComponent`.
   * 
   * Inicializa el formulario reactivo con sus controles y validaciones, suscribe el estado del formulario y de la sección
   * para mantener los datos sincronizados, y asigna los observables de los catálogos requeridos.
   * 
   * @param fb - Servicio para la creación de formularios reactivos.
   * @param store - Store para la gestión del estado del trámite 110204.
   * @param tramiteQuery - Query para consultar el estado del trámite 110204.
   * @param certificadoService - Servicio para la gestión de certificados de origen.
   * @param toastr - Servicio para mostrar notificaciones al usuario.
   * @param seccionQuery - Query para consultar el estado de la sección.
   * @param seccionStore - Store para la gestión del estado de la sección.
   */
  constructor(
    private fb: FormBuilder, public store: Tramite110204Store,
    public tramiteQuery: Tramite110204Query,
    public certificadoService: CertificadosOrigenGridService,
    private toastr: ToastrService,
      private seccionQuery: SeccionLibQuery,
      private seccionStore: SeccionLibStore
  ) {

    /**
     * Inicialización del formulario reactivo con los controles y validaciones correspondientes.
     */
    this.formDatosCertificado = this.fb.group({
      observacionesDates: [''],
      idiomaDates: ['', [Validators.required, Validators.min(0)]],
      EntidadFederativaDates: ['', [Validators.required, Validators.min(0)]],
      representacionFederalDates: ['', [Validators.required, Validators.min(0)]],
    });

    /**
     * Suscripción al estado del formulario para actualizar los valores del formulario al obtener datos.
     */
    this.tramiteQuery.formDatosCertificado$.pipe(
      takeUntil(this.destroyNotifier$)
    ).subscribe(estado => {
      if (!this.actualizandoFormulario && estado) {
        this.actualizandoFormulario = true;
        this.formDatosCertificado.patchValue(estado);
        this.actualizandoFormulario = false;
      }
    });
       /**
         * Suscripción al estado de la sección para obtener y actualizar el estado.
         */
        this.seccionQuery.selectSeccionState$
          .pipe(
            takeUntil(this.destroyNotifier$),
            map((seccionState) => {
              this.seccion = seccionState;
            })
          )
          .subscribe();

    /**
     * Asignación de los observables que contienen los catálogos de datos a los que se puede suscribir el componente.
     */
    this.idioma$ = this.tramiteQuery.selectIdioma$;
    this.entidadFederativas$ = this.tramiteQuery.selectEntidadFederativa$;
    this.representacionFederal$ = this.tramiteQuery.selectrepresentacionFederal$;
  }

  /**
   * Getter para acceder al control del formulario, utilizado para la validación.
   * @returns FormControl del formulario.
   */
  get formularioControl(): FormControl {
    return this.formDatosCertificado.get('') as FormControl;
  }

   /**
   * Verifica si el formulario es válido.
   * @returns {boolean} Retorna true si el formulario es válido, de lo contrario false.
   */
   esFormValido(): boolean {
    // Recorre todos los controles del formulario para verificar si alguno es inválido.
    for (const NOMBRE_DEL_CONTROL in this.formDatosCertificado.controls) {
      if (Object.prototype.hasOwnProperty.call(this.formDatosCertificado.controls,
        NOMBRE_DEL_CONTROL)) {
        const CONTROL = this.formDatosCertificado.get(NOMBRE_DEL_CONTROL);
        if (CONTROL && CONTROL.enabled && CONTROL.invalid) {
          return false;
        }
      }
    }
    return true;
  }

    /**
     * Valida el formulario y actualiza el estado de la sección en el store.
     */
    validarFormulario(): void {
      this.formDatosCertificado.statusChanges
        .pipe(
          takeUntil(this.destroyNotifier$),
          delay(10),
          tap((_value) => {
            const SECCION: number = 2;
            const FORMAS_VALIDADAS = this.seccion.formaValida;
            const ES_VALIDO_EL_FORM = this.esFormValido();
  
            if (this.formDatosCertificado.valid || (ES_VALIDO_EL_FORM)) {
              FORMAS_VALIDADAS[SECCION] = true;
              this.seccionStore.establecerFormaValida(FORMAS_VALIDADAS);
            }
          })
        )
        .subscribe();
    }
  

  /**
   * Método de ciclo de vida de Angular, se ejecuta al inicializar el componente.
   * Se utiliza para cargar los datos y suscribirse a los cambios del formulario.
   */
  ngOnInit(): void {
    this.cargarIdioma();
    this.cargarEntidadFederativa();
    
    /**
     * Suscripción a los cambios de valor del formulario para enviar los datos al store.
    */
   this.formDatosCertificado.valueChanges.subscribe(value => {
    if (!this.actualizandoFormulario) {
      this.store.setFormDatosCertificado(value);
      this.validarFormulario();
    }
    });
    this.cargarRepresentacionFederal();

    if(this.formularioDeshabilitado){
      this.esFormularioSoloLectura = true;
      this.inicializarEstadoFormulario();
    }

  }
  
  /**
   * @method inicializarEstadoFormulario
   * @description Inicializa el estado del formulario de datos del certificado, habilitándolo o deshabilitándolo según si el formulario es de solo lectura.
   * @memberof DatosCertificadoComponent
   * @returns {void}
   */
  inicializarEstadoFormulario(): void {
    if (this.esFormularioSoloLectura) {
      this.formDatosCertificado.disable();
    }
    else {
      this.formDatosCertificado.enable();
    } 
  }

  /**
   * Método que selecciona un idioma y actualiza el estado en el store.
   * @param estado El estado del idioma seleccionado.
   */
  idiomaSeleccion(estado: Catalogo): void {
    this.store.setIdiomaDatos([estado]);
  }

  /**
   * Método que selecciona una entidad federativa y actualiza el estado en el store.
   * @param estado El estado de la entidad federativa seleccionada.
   */
  entidadFederativaSeleccion(estado: Catalogo): void {
    this.store.setEntidadFederativaDatos([estado]);
  }

  /**
   * Método que selecciona una representación federal y actualiza el estado en el store.
   * @param estado El estado de la representación federal seleccionada.
   */
  representacionFederalSeleccion(estado: Catalogo): void {
    this.store.setRepresentacionFederalDatos([estado]);
  }

  /**
   * Método para cargar la lista de idiomas desde el servicio.
   */
  cargarIdioma(): void {
    this.certificadoService
      .obtenerIdioma()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe(
        (data: Catalogo[]) => {
          this.store.setIdiomaDatos(data);
        },
        (error) => {
          console.error('Error al cargar los estados:', error);
        }
      );
  }

  /**
   * Método para cargar la lista de representaciones federales desde el servicio.
   */
  cargarRepresentacionFederal(): void {
    this.certificadoService
      .obtenerRepresentacionFederal()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe(
        (data: Catalogo[]) => {
          this.store.setRepresentacionFederalDatos(data);
        },
        (error) => {
          console.error('Error al cargar los estados:', error);
        }
      );
  }

  /**
   * Método para cargar la lista de entidades federativas desde el servicio.
   */
  cargarEntidadFederativa(): void {
    this.certificadoService
      .obtenerEntidadFederativa()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe(
        (data: Catalogo[]) => {
          this.store.setEntidadFederativaDatos(data);
        },
        (error) => {
          console.error('Error al cargar los estados:', error);
        }
      );
  }

   /**
   * @method validarFormularioDatos
   * @description
   * Valida el formulario de datos del certificado.
   * Retorna `true` si el formulario es válido, de lo contrario marca todos los controles como tocados y retorna `false`.
   * Se utiliza para mostrar los errores de validación en la interfaz cuando el formulario no cumple con los requisitos.
   *
   * @returns {boolean} Indica si el formulario de datos del certificado es válido.
   */
  validarFormularioDatos(): boolean {
    if (this.formDatosCertificado.valid) {
      return true;
    }
    this.formDatosCertificado.markAllAsTouched();
    return false
  }

  /**
   * Método de ciclo de vida de Angular, se ejecuta al destruir el componente.
   * Cancela todas las suscripciones para evitar fugas de memoria.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
