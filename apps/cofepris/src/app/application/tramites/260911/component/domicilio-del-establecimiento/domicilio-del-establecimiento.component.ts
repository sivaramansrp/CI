import { AlertComponent, InputCheckComponent, REGEX_SOLO_DIGITOS } from '@libs/shared/data-access-user/src';
import { Component, OnDestroy } from '@angular/core';
import { Subject, map, takeUntil } from 'rxjs';
import { Tramite260911State, Tramite260911Store } from '../../estados/tramite260911.store';
import { ALERT } from '../../enums/domicilio-del-establecimiento.enum';
import { Catalogo } from '@libs/shared/data-access-user/src';
import { CatalogoSelectComponent } from '@libs/shared/data-access-user/src';
import { CommonModule } from '@angular/common';
import { ConfiguracionColumna } from '@libs/shared/data-access-user/src';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { DomicilioDelEstablecimientoService } from '../../services/domicilio-del-establecimiento/domicilio-del-establecimiento.service';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { InputRadioComponent } from '@libs/shared/data-access-user/src';
import { MERCANCIAS_DATA } from '../../models/modificación-del-permiso-sanitario-de-importación-de-insumo.model';
import { MercanciasInfo } from '../../models/modificación-del-permiso-sanitario-de-importación-de-insumo.model';

import { NICO_TABLA } from '../../models/modificación-del-permiso-sanitario-de-importación-de-insumo.model';
import { NicoInfo } from '../../models/modificación-del-permiso-sanitario-de-importación-de-insumo.model';
import { OPCIONES_DE_BOTON_DE_RADIO } from '../../enums/domicilio-del-establecimiento.enum';

import { OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TablaDinamicaComponent } from '@libs/shared/data-access-user/src';
import { TablaSeleccion } from '@libs/shared/data-access-user/src';
import { TituloComponent } from '@libs/shared/data-access-user/src';
import { Tramite260911Query } from '../../estados/tramite260911.query';

import { Validators } from '@angular/forms';

/**
 * Componente para gestionar el domicilio del establecimiento.
 * Permite la visualización y edición de los datos del domicilio, así como la gestión de tablas y catálogos asociados.
 * Incluye lógica para modo solo lectura y edición, integración con el store y servicios para obtener datos.
 *
 * @selector app-domicilio-del-establecimiento
 * @standalone true
 * @imports [
 *   CommonModule,
 *   TituloComponent,
 *   ReactiveFormsModule,
 *   CatalogoSelectComponent,
 *   AlertComponent,
 *   TablaDinamicaComponent,
 *   InputRadioComponent,
 *   InputCheckComponent
 * ]
 * @templateUrl ./domicilio-del-establecimiento.component.html
 * @styleUrl ./domicilio-del-establecimiento.component.scss
 */
@Component({
  selector: 'app-domicilio-del-establecimiento',
  standalone: true,
  imports: [
    CommonModule,
    TituloComponent,
    ReactiveFormsModule,
    CatalogoSelectComponent,
    AlertComponent,
    TablaDinamicaComponent,
    InputRadioComponent,
    InputCheckComponent
  ],
  templateUrl: './domicilio-del-establecimiento.component.html',
  styleUrl: './domicilio-del-establecimiento.component.scss',
})
export class DomicilioDelEstablecimientoComponent implements OnInit, OnDestroy {

  /** Estado actual de la solicitud proveniente del store */
  public solicitudState!: Tramite260911State;

  /** Indica si el formulario está en modo solo lectura */
  esFormularioSoloLectura: boolean = false;

  /**
   * Formulario principal reactivo para los datos del domicilio.
   */
  form!: FormGroup;

  /**
   * Lista de estados obtenida del catálogo.
   */
  estado: Catalogo[] = [];

  /**
   * Textos de alerta utilizados en el componente.
   */
  TEXTOS = ALERT;

  /**
   * Clase CSS para el tipo de alerta.
   */
  class = 'alert-warning';

  /**
   * Configuración para la selección de filas en la tabla (checkbox).
   */
  tablaSeleccionCheckbox: TablaSeleccion = TablaSeleccion.CHECKBOX;

  /**
   * Configuración de columnas para la tabla NICO.
   */
  nicoTabla: ConfiguracionColumna<NicoInfo>[] = NICO_TABLA;

  /**
   * Datos cargados para la tabla NICO.
   */
  nicoTablaDatos: NicoInfo[] = [];

  /**
   * Formulario reactivo para los datos del domicilio.
   */
  domicilio!: FormGroup;

  /**
   * Configuración de columnas para la tabla de mercancías.
   */
  mercanciasTabla: ConfiguracionColumna<MercanciasInfo>[] = MERCANCIAS_DATA;

  /**
   * Datos cargados para la tabla de mercancías.
   */
  mercanciasTablaDatos: MercanciasInfo[] = [];

  /**
   * Manifiestos de alerta utilizados en el componente.
   */
  manifests = ALERT.MANIFESTS;

  /**
   * Opciones para el botón de radio.
   */
  opcionDeBotonDeRadio = OPCIONES_DE_BOTON_DE_RADIO;

  /**
   * Formulario reactivo para los datos del representante legal.
   */
  representanteLegal!: FormGroup;

  /**
   * Subject para controlar la destrucción de suscripciones y evitar fugas de memoria.
   * @private
   */
  private destroy$ = new Subject<void>();

  /**
   * Estado seleccionado del trámite 260911.
   */
  estadoSeleccionado!: Tramite260911State;

  /**
   * Constructor del componente.
   *
   * @param fb FormBuilder para crear formularios reactivos.
   * @param httpServicios Servicio HTTP para realizar peticiones.
   * @param tramite260911Query Consulta de datos del trámite.
   * @param tramite260911Store Almacenamiento de datos del trámite.
   * @param domicilioDelEstablecimientoService Servicio para obtener datos relacionados con el domicilio.
   * @param consultaioQuery Consulta de estado de solo lectura.
   */
  constructor(
    private fb: FormBuilder,
    private httpServicios: HttpClient,
    private tramite260911Query: Tramite260911Query,
    private tramite260911Store: Tramite260911Store,
    private domicilioDelEstablecimientoService: DomicilioDelEstablecimientoService,
    public consultaioQuery: ConsultaioQuery,
  ) {
    this.consultaioQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroy$),
        map((seccionState) => {
          this.esFormularioSoloLectura = seccionState.readonly;
          this.inicializarEstadoFormulario();
        })
      )
      .subscribe();
  }

  /**
   * Inicializa el formulario dependiendo del modo (solo lectura o editable).
   * Si está en solo lectura, carga y bloquea el formulario.
   * Si no, crea un formulario editable.
   */
  inicializarEstadoFormulario(): void {
    if (this.esFormularioSoloLectura) {
      this.guardarDatosFormulario();
    } else {
      this.crearFormulario();
    }
  }

  /**
   * Crea el formulario y, si está en modo solo lectura, lo deshabilita.
   * De lo contrario, lo habilita para edición.
   */
  guardarDatosFormulario(): void {
    this.crearFormulario();
    if (this.esFormularioSoloLectura) {
      this.form.disable();
      this.domicilio.disable();
      this.representanteLegal.disable();
    } else {
      this.form.enable();
      this.domicilio.enable();
      this.representanteLegal.enable();
    }
  }

  /**
   * Método de inicialización del ciclo de vida del componente.
   * Inicializa el formulario y carga los datos necesarios para las tablas y catálogos.
   */
  ngOnInit(): void {

    this.inicializarEstadoFormulario();
    this.obtenerTablaDatos();
    this.obtenerEstadoList();
    this.obtenerMercanciasDatos();

    // Enable/disable licenciaSanitaria based on avisoCheckbox value
    this.domicilio?.get('avisoCheckbox')?.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((checked: boolean) => {
        const LICENCIA_SANITARIA_CONTROL = this.domicilio.get('licenciaSanitaria');
        if (checked) {
          LICENCIA_SANITARIA_CONTROL?.disable();
        } else {
          LICENCIA_SANITARIA_CONTROL?.enable();
        }
      });
  }

  /**
   * Método de destrucción del ciclo de vida del componente.
   * Libera recursos y cancela suscripciones.
   */
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Crea los formularios reactivos principales del componente usando los datos del store.
   * Incluye el formulario principal, el de domicilio y el de representante legal.
   */
  crearFormulario(): void {
    this.tramite260911Query.selectTramite260911$
      .pipe(
        takeUntil(this.destroy$),
        map((seccionState) => {
          this.solicitudState = seccionState;
        })
      )
      .subscribe();
    this.form = this.fb.group({
      codigoPostal: [this.solicitudState?.codigoPostal, [Validators.required, Validators.pattern(REGEX_SOLO_DIGITOS), Validators.maxLength(12)]],
      estado: [this.solicitudState?.estado],
      municipioOAlcaldia: [this.solicitudState?.municipioOAlcaldia, [Validators.required, Validators.maxLength(120)]],
      localidad: [this.solicitudState?.localidad, [Validators.maxLength(120)]],
      colonias: [this.solicitudState?.colonias, [Validators.maxLength(120)]],
      calle: [this.solicitudState?.calle, [Validators.required, Validators.maxLength(100)]],
      lada: [this.solicitudState?.lada, [Validators.pattern(REGEX_SOLO_DIGITOS), Validators.maxLength(5)]],
      telefono: [this.solicitudState.telefono, [Validators.required, Validators.pattern(REGEX_SOLO_DIGITOS), Validators.maxLength(30)]],
    });

    this.domicilio = this.fb.group({
      avisoCheckbox: [true],
      licenciaSanitaria: [{ value: this.solicitudState?.licenciaSanitaria, disabled: true }],
      regimen: [this.solicitudState?.regimen, [Validators.required]],
      aduanasEntradas: [this.solicitudState?.aduanasEntradas, [Validators.required]],
      importPermitNumberCNSNS: [{ value: this.solicitudState?.importPermitNumberCNSNS, disabled: false }],
      aifaCheckbox: [true],
      manifests: [true],
    });

    this.representanteLegal = this.fb.group({
      acuerdoPublico: [this.solicitudState?.acuerdoPublico],
      rfc: [this.solicitudState?.rfc, [Validators.required, Validators.maxLength(13)]],
      nombre: [{ value: this.solicitudState?.nombre, disabled: true }, [Validators.required]],
      apellidoPaterno: [{ value: this.solicitudState?.apellidoPaterno, disabled: true }, [Validators.required]],
      apellidoMaterno: [{ value: this.solicitudState?.apellidoMaterno, disabled: true }, [Validators.required]],
    });
  }

  /**
   * Obtiene los datos de la tabla NICO desde el servicio y los asigna a la propiedad correspondiente.
   */
  obtenerTablaDatos(): void {
    this.domicilioDelEstablecimientoService
      .obtenerTablaDatos()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.nicoTablaDatos = data?.data;
      });
  }

  /**
   * Obtiene la lista de estados desde el servicio y la asigna a la propiedad correspondiente.
   */
  obtenerEstadoList(): void {
    this.domicilioDelEstablecimientoService
      .obtenerEstadoList()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.estado = data?.data || [];
      });
  }

  /**
   * Obtiene los datos de mercancías desde el servicio y los asigna a la propiedad correspondiente.
   */
  obtenerMercanciasDatos(): void {
    this.domicilioDelEstablecimientoService
      .obtenerMercanciasDatos()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.mercanciasTablaDatos = data?.data || [];
      });
  }

  /**
   * Actualiza un valor específico en el store del trámite.
   *
   * @param FormGroup Formulario reactivo del cual se obtiene el valor.
   * @param control Nombre del control cuyo valor se actualizará en el store.
   */
  setValorStore(FormGroup: FormGroup, control: string): void {
    const VALOR = FormGroup.get(control)?.value;
    this.tramite260911Store.setTramite260911State({
      [control]: VALOR
    });
  }

  /**
   * Maneja el cambio del checkbox de manifests y lo marca como touched
   */
  onManifestsChange(): void {
    this.domicilio.get('manifests')?.markAsTouched();
    this.setValorStore(this.domicilio, 'manifests');
  }

  /**
   * Maneja el evento de input del campo codigoPostal para validar en tiempo real
   * @param event Evento de input del campo
   */
  onCodigoPostalInput(event: Event): void {
    const INPUT_ELEMENT = event.target as HTMLInputElement;
    const VALUE = INPUT_ELEMENT.value;
    const CONTROL = this.form.get('codigoPostal');
    
    if (CONTROL) {
      // Marcar como touched para mostrar errores
      CONTROL.markAsTouched();
      
      // Si el valor tiene exactamente 12 caracteres, forzar el error de maxlength
      if (VALUE && VALUE.length === 12) {
        CONTROL.setErrors({ ...CONTROL.errors, maxlength: { requiredLength: 12, actualLength: VALUE.length } });
      } else if (VALUE && VALUE.length < 12) {
        // Si tiene menos de 12 caracteres, remover el error de maxlength pero mantener otros errores
        const ERRORS = CONTROL.errors;
        if (ERRORS) {
          delete ERRORS['maxlength'];
          const HAS_OTHER_ERRORS = Object.keys(ERRORS).length > 0;
          CONTROL.setErrors(HAS_OTHER_ERRORS ? ERRORS : null);
        }
      }
    }
  }

    /**
     * Maneja el evento de input del campo colonias para validar en tiempo real
     * @param event Evento de input del campo
     */

    /**
     * Maneja el evento de input del campo municipioOAlcaldia para validar en tiempo real
     * @param event Evento de input del campo
     */
    onMunicipioOAlcaldiaInput(event: Event): void {
      const INPUT_ELEMENT = event.target as HTMLInputElement;
      const VALUE = INPUT_ELEMENT.value;
      const CONTROL = this.form.get('municipioOAlcaldia');
    
      if (CONTROL) {
        CONTROL.markAsTouched();
        if (VALUE && VALUE.length === 120) {
          CONTROL.setErrors({ ...CONTROL.errors, maxlength: { requiredLength: 120, actualLength: VALUE.length } });
        } else if (VALUE && VALUE.length < 120) {
          const ERRORS = CONTROL.errors;
          if (ERRORS) {
            delete ERRORS['maxlength'];
            const HAS_OTHER_ERRORS = Object.keys(ERRORS).length > 0;
            CONTROL.setErrors(HAS_OTHER_ERRORS ? ERRORS : null);
          }
        }
      }
    }
  /**
   * Maneja el evento de input del campo localidad para validar en tiempo real
   * @param event Evento de input del campo
   */
  onLocalidadInput(event: Event): void {
    const INPUT_ELEMENT = event.target as HTMLInputElement;
    const VALUE = INPUT_ELEMENT.value;
    const CONTROL = this.form.get('localidad');

      if (CONTROL) {
        CONTROL.markAsTouched();
        if (VALUE && VALUE.length === 120) {
          CONTROL.setErrors({ ...CONTROL.errors, maxlength: { requiredLength: 120, actualLength: VALUE.length } });
        } else if (VALUE && VALUE.length < 120) {
          const ERRORS = CONTROL.errors;
          if (ERRORS) {
            delete ERRORS['maxlength'];
            const HAS_OTHER_ERRORS = Object.keys(ERRORS).length > 0;
            CONTROL.setErrors(HAS_OTHER_ERRORS ? ERRORS : null);
          }
        }
      }
    }
    /**
     * Maneja el evento de input del campo colonias para validar en tiempo real
     * @param event Evento de input del campo
     */
    onColoniasInput(event: Event): void {
      const INPUT_ELEMENT = event.target as HTMLInputElement;
      const VALUE = INPUT_ELEMENT.value;
      const CONTROL = this.form.get('colonias');

      if (CONTROL) {
        CONTROL.markAsTouched();
        if (VALUE && VALUE.length === 120) {
          CONTROL.setErrors({ ...CONTROL.errors, maxlength: { requiredLength: 120, actualLength: VALUE.length } });
        } else if (VALUE && VALUE.length < 120) {
          const ERRORS = CONTROL.errors;
          if (ERRORS) {
            delete ERRORS['maxlength'];
            const HAS_OTHER_ERRORS = Object.keys(ERRORS).length > 0;
            CONTROL.setErrors(HAS_OTHER_ERRORS ? ERRORS : null);
          }
        }
      }
    }

    /**
     * Maneja el evento de input del campo calle para validar en tiempo real
     * @param event Evento de input del campo
     */
    onCalleInput(event: Event): void {
      const INPUT_ELEMENT = event.target as HTMLInputElement;
      const VALUE = INPUT_ELEMENT.value;
      const CONTROL = this.form.get('calle');

      if (CONTROL) {
        CONTROL.markAsTouched();
        if (VALUE && VALUE.length === 100) {
          CONTROL.setErrors({ ...CONTROL.errors, maxlength: { requiredLength: 100, actualLength: VALUE.length } });
        } else if (VALUE && VALUE.length < 100) {
          const ERRORS = CONTROL.errors;
          if (ERRORS) {
            delete ERRORS['maxlength'];
            const HAS_OTHER_ERRORS = Object.keys(ERRORS).length > 0;
            CONTROL.setErrors(HAS_OTHER_ERRORS ? ERRORS : null);
          }
        }
      }
    }
    /**
     * Maneja el evento de input del campo lada para validar en tiempo real
     * @param event Evento de input del campo
     */
    onLadaInput(event: Event): void {
      const INPUT_ELEMENT = event.target as HTMLInputElement;
      const VALUE = INPUT_ELEMENT.value;
      const CONTROL = this.form.get('lada');

      if (CONTROL) {
        CONTROL.markAsTouched();
        if (VALUE && VALUE.length === 5) {
          CONTROL.setErrors({ ...CONTROL.errors, maxlength: { requiredLength: 5, actualLength: VALUE.length } });
        } else if (VALUE && VALUE.length < 5) {
          const ERRORS = CONTROL.errors;
          if (ERRORS) {
            delete ERRORS['maxlength'];
            const HAS_OTHER_ERRORS = Object.keys(ERRORS).length > 0;
            CONTROL.setErrors(HAS_OTHER_ERRORS ? ERRORS : null);
          }
        }
      }
    }

    /**
     * Maneja el evento de input del campo telefono para validar en tiempo real
     * @param event Evento de input del campo
     */
    onTelefonoInput(event: Event): void {
      const INPUT_ELEMENT = event.target as HTMLInputElement;
      const VALUE = INPUT_ELEMENT.value;
      const CONTROL = this.form.get('telefono');

      if (CONTROL) {
        CONTROL.markAsTouched();
        if (VALUE && VALUE.length === 30) {
          CONTROL.setErrors({ ...CONTROL.errors, maxlength: { requiredLength: 30, actualLength: VALUE.length } });
        } else if (VALUE && VALUE.length < 30) {
          const ERRORS = CONTROL.errors;
          if (ERRORS) {
            delete ERRORS['maxlength'];
            const HAS_OTHER_ERRORS = Object.keys(ERRORS).length > 0;
            CONTROL.setErrors(HAS_OTHER_ERRORS ? ERRORS : null);
          }
        }
      }
    }

    /**
     * Maneja el evento de input del campo RFC para validar en tiempo real
     * @param event Evento de input del campo
     */
    onRfcInput(event: Event): void {
      const INPUT_ELEMENT = event.target as HTMLInputElement;
      const VALUE = INPUT_ELEMENT.value;
      const CONTROL = this.representanteLegal.get('rfc');

      if (CONTROL) {
        CONTROL.markAsTouched();
        if (VALUE && VALUE.length === 13) {
          CONTROL.setErrors({ ...CONTROL.errors, maxlength: { requiredLength: 13, actualLength: VALUE.length } });
        } else if (VALUE && VALUE.length < 13) {
          const ERRORS = CONTROL.errors;
          if (ERRORS) {
            delete ERRORS['maxlength'];
            const HAS_OTHER_ERRORS = Object.keys(ERRORS).length > 0;
            CONTROL.setErrors(HAS_OTHER_ERRORS ? ERRORS : null);
          }
        }
      }
    }

}