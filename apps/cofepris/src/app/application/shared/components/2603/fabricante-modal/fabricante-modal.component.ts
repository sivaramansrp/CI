import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Catalogo, CatalogoSelectComponent, Fabricante, InputRadioComponent, REGEX_CURP, REGEX_PATRON_ALFANUMERICO, REGEX_POSTAL, REGEX_RFC, REGEX_SOLO_NUMEROS, REGEX_TELEFONO_OPCIONAL, ValidacionesFormularioService } from '@libs/shared/data-access-user/src';
import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Solicitud2603State, Tramite2603Store } from '../../../estados/stores/2603/tramite2603.store';
import { Subject, map, takeUntil } from 'rxjs';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { CertificadosLicenciasPermisosService } from '../../../services/shared2603/certificados-licencias-permisos.service';
import { CommonModule } from '@angular/common';
import { ConsultaioQuery } from '@ng-mf/data-access-user';

import { Otros2603, RadioOpcion } from '@libs/shared/data-access-user/src/core/models/shared2603/certificados-licencias-permisos.model';
import { TituloComponent } from '@libs/shared/data-access-user/src/tramites/components/titulo/titulo.component';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { Tramite2603Query } from '../../../estados/queries/2603/tramite2603.query';
import terecerosNacionalidos from '@libs/shared/theme/assets/json/2603/terceros-nacionalidad.json';
import tipoPersona from '@libs/shared/theme/assets/json/2603/tipo-persona.json';
/**
 * FabricanteModalComponent es responsable de manejar el primer paso del proceso.
 * para actualizar el componente actual que se está mostrando.
 */
@Component({
  selector: 'app-fabricante-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InputRadioComponent, TituloComponent, TooltipModule, CatalogoSelectComponent],
  templateUrl: './fabricante-modal.component.html',
  styleUrl: './fabricante-modal.component.scss',
})
export class FabricanteModalComponent implements OnInit, OnDestroy {

  @Output() guardarFabricante = new EventEmitter<Record<string, unknown>>();

  /**
   * Título del componente modal.
   */
  titulo: string;

  /**
   * Datos existentes para prellenar el formulario en modo modificación.
   */
  datosExistentes?: Fabricante | Otros2603;

  /**
   * Indica si el modal está en modo modificación.
   */
  esModificacion?: boolean;

  /**
   * Catálogo de países disponibles para selección.
   * Se espera que esta propiedad sea un arreglo de objetos `Catalogo`.
   */
  public paisCatalogo!: Catalogo[];
  /**
   * Formulario reactivo para gestionar y validar los datos de terceros relacionados.
   */
  public tercerosRelacionadosForm!: FormGroup;
  /**
   * Estado de la Solicitud 2603.
   * Contiene los datos y la gestión del estado para la solicitud actual.
   */
  public solicitudState!: Solicitud2603State;
  /**
   * Notificador para destruir los observables al finalizar.
   */
  private notificadorDestruir$: Subject<void> = new Subject();

  /**
   * Indica si el formulario está en modo solo lectura.
   * Cuando es `true`, los campos del formulario no se pueden editar.
   */
  esSoloLecturaFormulario: boolean = false;

  /** Opciones de nacionalidad para terceros, obtenidas del catálogo correspondiente. */
  public opcionesNacionalidadTerceros: RadioOpcion[] = Array.isArray(terecerosNacionalidos) ? terecerosNacionalidos as RadioOpcion[] : [];

  /** Opciones de tipo de persona, obtenidas del catálogo correspondiente. */
  public opcionesTipoPersona: RadioOpcion[] = Array.isArray(tipoPersona) ? tipoPersona as RadioOpcion[] : [];

  /**
   * Obtiene las opciones de tipo de persona filtradas según la nacionalidad seleccionada.
   * Si la nacionalidad es 'extranjero', se excluye la opción 'noContribuyente'.
   *
   * @returns {RadioOpcion[]} Un arreglo de opciones de tipo de persona filtradas.
   */
  get opcionesTipoPersonaFiltradas(): RadioOpcion[] {
    const NACIONALIDAD = this.tercerosRelacionadosForm?.get('tercerosNacionalidad')?.value;
    return NACIONALIDAD === 'extranjero'
      ? (this.opcionesTipoPersona ?? []).filter((option: RadioOpcion) => option.value !== 'noContribuyente')
      : (this.opcionesTipoPersona ?? []);
  }
  /**
   * Constructor del componente FabricanteModalComponent.
   *
   * @param bsModalRef Referencia a la instancia del modal de Bootstrap.
   * @param fb Instancia de FormBuilder utilizada para crear y gestionar formularios reactivos.
   * @param tramite2603Store Store para gestionar el estado del trámite 2603.
   * @param tramite2603Query Query para consultar el estado del trámite 2603.
   * @param consultaioQuery Query para consultar el estado de consulta IO.
   * @param validacionesService Servicio para validaciones de formulario.
   * @param certificadosLicenciasSvc Servicio para certificados, licencias y permisos.
   */
  constructor(
    public bsModalRef: BsModalRef,
    private fb: FormBuilder,
    private tramite2603Store: Tramite2603Store,
    private tramite2603Query: Tramite2603Query,
    private consultaioQuery: ConsultaioQuery,
    private validacionesService: ValidacionesFormularioService,
    private certificadosLicenciasSvc: CertificadosLicenciasPermisosService,
  ) {
    this.titulo = '';
    this.consultaioQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.notificadorDestruir$),
        map((seccionState) => {
          this.esSoloLecturaFormulario = seccionState.readonly;
          this.inicializarEstadoFormulario();
        })
      )
      .subscribe();
  }

  /**
   * Gancho del ciclo de vida que se llama después de que Angular ha inicializado todas las propiedades enlazadas a datos de una directiva.
   * Este método se utiliza para realizar la lógica de inicialización del componente.
   * En esta implementación, invoca el método `cerrarTercerosRelacionadosForm` para reiniciar o cerrar
   * el formulario relacionado con las asociaciones de terceros.
   */
  ngOnInit(): void {
    this.tramite2603Query.selectSolicitud$.pipe(
      takeUntil(this.notificadorDestruir$),
      map((estadoSeccion) => {
        this.solicitudState = estadoSeccion;
      })
    )
      .subscribe();
    this.obtenerDatosPais();
    if (this.titulo === 'Agregar otros') {
      this.cerrarFormularioTercerosRelacionados();
    } else {
      this.inicializarFormularioTercerosRelacionados();
    }
  }

  /**
     * Recupera los datos para la tabla de fabricantes realizando una llamada al servicio.
     * Se suscribe a la respuesta del método `getPaisDatos` del servicio,
     * crea una copia profunda de la respuesta y la asigna a la propiedad `paisDatos`.
     *
     * @returns {void}
     */
  public obtenerDatosPais(): void {
    this.certificadosLicenciasSvc.getPaisDatos()
      .pipe(
        takeUntil(this.notificadorDestruir$)
      ).subscribe((respuesta) => {
        this.paisCatalogo = respuesta;
      });
  }

  /**
   * Inicializa el formulario obteniendo el estado actual de la solicitud desde el store.
   * Se suscribe al observable selectSolicitud$ para actualizar la propiedad solicitudState
   * con los datos más recientes de la solicitud.
   */
  inicializarFormulario(): void {
    this.tramite2603Query.selectSolicitud$.pipe(
      takeUntil(this.notificadorDestruir$),
      map((estadoSeccion) => {
        this.solicitudState = estadoSeccion;
      })
    )
      .subscribe();
  }

  /**
   * Restablece el grupo de formulario `tercerosRelacionadosForm` con valores predeterminados vacíos.
   * Este método inicializa el formulario con controles para varios campos como
   * denominación social, RFC, CURP, detalles de dirección e información de contacto.
   * Cada control se establece con una cadena vacía como su valor predeterminado.
   *
   * @returns {void}
   */
  /**
   * Obtiene los valores iniciales para el formulario basándose en si es modificación o no.
   */
  private obtenerValoresIniciales(): Record<string, unknown> {
    const ES_AGREGAR_OTROS = this.titulo === 'Agregar otros';
    
    if (this.esModificacion && this.datosExistentes) {
      return this.obtenerValoresParaModificacion(ES_AGREGAR_OTROS);
    }
    
    return this.obtenerValoresParaCreacion(ES_AGREGAR_OTROS);
  }

  /**
   * Obtiene valores para modo modificación.
   */
  private obtenerValoresParaModificacion(esAgregarOtros: boolean): Record<string, unknown> {
    const DATOS = this.datosExistentes as Fabricante;
    const DATOS_OTROS = this.datosExistentes as Otros2603;
    
    return {
      terceroNombre: [DATOS_OTROS.tercero || '', Validators.required],
      tercerosNacionalidad: ['nacional'],
      tipoPersona: ['fisica', Validators.required],
      rfc: [DATOS.rfc || ''],
      curp: [DATOS.curp || '', []],
      razonSocial: [{ value: DATOS.nombre || '', disabled: true }, []],
      datosPersonalesNombre: [{ value: DATOS.nombre || '', disabled: true }, []],
      datosPersonalesPrimerApellido: [{ value: '', disabled: true }, []],
      datosPersonalesSegundoApellido: [{ value: '', disabled: true }, []],
      pais: [{ value: DATOS.pais || '', disabled: esAgregarOtros }, []],
      estado: [{ value: DATOS.estado || '', disabled: true }, []],
      municipio: [{ value: DATOS.municipio || '', disabled: true }, []],
      localidad: [{ value: DATOS.localidad || '', disabled: true }],
      codigoPostal: [{ value: DATOS.cp || '', disabled: true }, []],
      colonia: [{ value: DATOS.colonia || '', disabled: true }, []],
      calle: [{ value: DATOS.calle || '', disabled: true }, []],
      numeroExterior: [{ value: DATOS.numeroExterior || '', disabled: true }, []],
      numeroInterior: [{ value: DATOS.numeroInterior || '', disabled: true }],
      lada: [{ value: '', disabled: true }, []],
      telefono: [{ value: DATOS.telefono || '', disabled: true }, []],
      correoElectronico: [{ value: DATOS.correoElectronico || '', disabled: true }, []]
    };
  }

  /**
   * Obtiene valores para modo creación.
   */
  private obtenerValoresParaCreacion(esAgregarOtros: boolean): Record<string, unknown> {
    return {
      terceroNombre: [this.solicitudState.tercerosRelacionadosTerceroNombre, Validators.required],
      tercerosNacionalidad: [this.solicitudState.tercerosNacionalidad],
      tipoPersona: [this.solicitudState.tipoPersona, Validators.required],
      rfc: [this.solicitudState.tercerosRelacionadosRfc],
      curp: [this.solicitudState.tercerosRelacionadosCurp, []],
      razonSocial: [{ value: this.solicitudState.tercerosRelacionadosRazonSocial, disabled: true }, []],
      datosPersonalesNombre: [{ value: this.solicitudState.datosPersonalesNombre, disabled: true }, []],
      datosPersonalesPrimerApellido: [{ value: this.solicitudState.datosPersonalesPrimerApellido, disabled: true }, []],
      datosPersonalesSegundoApellido: [{ value: this.solicitudState.datosPersonalesSegundoApellido, disabled: true }, []],
      pais: [{ value: this.solicitudState.tercerosRelacionadosPais, disabled: esAgregarOtros }, []],
      estado: [{ value: this.solicitudState.tercerosRelacionadosEstado, disabled: true }, []],
      municipio: [{ value: this.solicitudState.tercerosRelacionadosMunicipio, disabled: true }, []],
      localidad: [{ value: this.solicitudState.tercerosRelacionadosLocalidad, disabled: true }],
      codigoPostal: [{ value: this.solicitudState.tercerosRelacionadosCodigoPostal, disabled: true }, []],
      colonia: [{ value: this.solicitudState.tercerosRelacionadosColonia, disabled: true }, []],
      calle: [{ value: this.solicitudState.tercerosRelacionadosCalle, disabled: true }, []],
      numeroExterior: [{ value: this.solicitudState.tercerosRelacionadosNumeroExterior, disabled: true }, []],
      numeroInterior: [{ value: this.solicitudState.tercerosRelacionadosNumeroInterior, disabled: true }],
      lada: [{ value: this.solicitudState.tercerosRelacionadosLada, disabled: true }, []],
      telefono: [{ value: this.solicitudState.tercerosRelacionadosTelefono, disabled: true }, []],
      correoElectronico: [{ value: this.solicitudState.tercerosRelacionadosCorreoElectronico, disabled: true }, []]
    };
  }

  public cerrarFormularioTercerosRelacionados(): void {
    const VALORES_INICIALES = this.obtenerValoresIniciales();
    this.tercerosRelacionadosForm = this.fb.group(VALORES_INICIALES);
    // Desactiva tipoPersona hasta seleccionar nacionalidad
  this.tercerosRelacionadosForm.get('tipoPersona')?.disable();

    this.tercerosRelacionadosForm.get('tercerosNacionalidad')?.valueChanges
      .pipe(takeUntil(this.notificadorDestruir$))
      .subscribe(() => this.actualizarCamposExtranjeroFisica());
    this.tercerosRelacionadosForm.get('tipoPersona')?.valueChanges
      .pipe(takeUntil(this.notificadorDestruir$))
      .subscribe(() => this.actualizarCamposExtranjeroFisica());

    // Activación/desactivación inicial
    this.actualizarCamposExtranjeroFisica();
    // Habilitar tipoPersona cuando se selecciona nacionalidad
    this.tercerosRelacionadosForm.get('tercerosNacionalidad')?.valueChanges
      .pipe(takeUntil(this.notificadorDestruir$))
      .subscribe(valor => {
        if (valor) {
          this.tercerosRelacionadosForm.get('tipoPersona')?.enable();
        } else {
          this.tercerosRelacionadosForm.get('tipoPersona')?.disable();
        }
      });
  }


  /**
   * Habilita o deshabilita los campos según la selección de nacionalidad y tipo de persona
   */
  private actualizarCamposExtranjeroFisica(): void {
    const NACIONALIDAD = this.tercerosRelacionadosForm.get('tercerosNacionalidad')?.value;
    const TIPO_PERSONA = this.tercerosRelacionadosForm.get('tipoPersona')?.value;
    const IS_EXTRANJERO_PERSONA = NACIONALIDAD === 'extranjero' && (TIPO_PERSONA === 'fisica' || TIPO_PERSONA === 'moral');
    const IS_AGREGAR_OTROS = this.titulo === 'Agregar otros';

    // Activar/desactivar RFC y CURP para nivel nacional
    if (NACIONALIDAD === 'nacional') {
      if (TIPO_PERSONA === 'fisica' || TIPO_PERSONA === 'moral') {
        this.tercerosRelacionadosForm.get('rfc')?.enable();
        // Establecer validadores requeridos para RFC en caso nacional
        this.tercerosRelacionadosForm.get('rfc')?.setValidators([Validators.required, Validators.maxLength(13), FabricanteModalComponent.validadorRFC]);
        this.tercerosRelacionadosForm.get('rfc')?.updateValueAndValidity();
        
        this.tercerosRelacionadosForm.get('curp')?.disable();
        this.tercerosRelacionadosForm.get('curp')?.clearValidators();
        this.tercerosRelacionadosForm.get('curp')?.updateValueAndValidity();
      } else if (TIPO_PERSONA === 'noContribuyente') {
        this.tercerosRelacionadosForm.get('rfc')?.disable();
        // Limpiar los validadores para el campo RFC deshabilitado para evitar errores de validación
        this.tercerosRelacionadosForm.get('rfc')?.clearValidators();
        this.tercerosRelacionadosForm.get('rfc')?.updateValueAndValidity();
        
        this.tercerosRelacionadosForm.get('curp')?.enable();
        // Establecer validadores requeridos para CURP en caso de no contribuyente
        this.tercerosRelacionadosForm.get('curp')?.setValidators([Validators.required, Validators.pattern(REGEX_CURP)]);
        this.tercerosRelacionadosForm.get('curp')?.updateValueAndValidity();
      } else {
        this.tercerosRelacionadosForm.get('rfc')?.disable();
        // Limpiar los validadores para el campo RFC deshabilitado para evitar errores de validación
        this.tercerosRelacionadosForm.get('rfc')?.clearValidators();
        this.tercerosRelacionadosForm.get('rfc')?.updateValueAndValidity();
        this.tercerosRelacionadosForm.get('curp')?.disable();
        // Limpiar los validadores para el campo CURP deshabilitado para evitar errores de validación
        this.tercerosRelacionadosForm.get('curp')?.clearValidators();
        this.tercerosRelacionadosForm.get('curp')?.updateValueAndValidity();
      }
      // Deshabilitar los campos de dirección y contacto para nacional
      const DISABLE_CONTROLS = [
        'razonSocial', 'datosPersonalesNombre', 'datosPersonalesPrimerApellido',
        'datosPersonalesSegundoApellido', 'estado', 'municipio', 'localidad', 'codigoPostal',
        'colonia', 'calle', 'numeroExterior', 'numeroInterior', 'lada', 'telefono', 'correoElectronico'
      ];
      DISABLE_CONTROLS.forEach(ctrl => {
        const CONTROL = this.tercerosRelacionadosForm.get(ctrl);
        if (CONTROL) {
          CONTROL.disable();
          // Limpiar los validadores para los campos deshabilitados que tienen validación requerida
          if (['datosPersonalesNombre', 'datosPersonalesPrimerApellido', 'municipio', 'localidad', 'colonia', 'calle', 'numeroExterior', 'codigoPostal'].includes(ctrl)) {
            CONTROL.clearValidators();
            CONTROL.updateValueAndValidity();
          }
        }
      });
      // Manejar el campo pais por separado: deshabilitarlo solo para 'Agregar otros''
      const PAIS_CONTROL = this.tercerosRelacionadosForm.get('pais');
      if (PAIS_CONTROL && IS_AGREGAR_OTROS) {
        PAIS_CONTROL.disable();
        // Limpiar validadores para el campo país deshabilitado
        PAIS_CONTROL.clearValidators();
        PAIS_CONTROL.updateValueAndValidity();
      } else if (PAIS_CONTROL) {
        PAIS_CONTROL.enable();
      }
      return;
    }

    // Habilitar todos los campos para persona extranjera
    if (IS_EXTRANJERO_PERSONA) {
      // Para extranjeros, RFC y CURP no son requeridos, así que los limpiamos y deshabilitamos
      this.tercerosRelacionadosForm.get('rfc')?.disable();
      this.tercerosRelacionadosForm.get('rfc')?.clearValidators();
      this.tercerosRelacionadosForm.get('rfc')?.updateValueAndValidity();
      
      this.tercerosRelacionadosForm.get('curp')?.disable();
      this.tercerosRelacionadosForm.get('curp')?.clearValidators();
      this.tercerosRelacionadosForm.get('curp')?.updateValueAndValidity();

      // Para "Agregar otros", habilitar campos de dirección y contacto
      if (IS_AGREGAR_OTROS) {
        const CONTROLS = [
          'razonSocial', 'datosPersonalesNombre', 'datosPersonalesPrimerApellido',
          'datosPersonalesSegundoApellido', 'pais', 'estado', 'municipio', 'localidad', 'codigoPostal',
          'colonia', 'calle', 'numeroExterior', 'numeroInterior', 'lada', 'telefono', 'correoElectronico'
        ];
        CONTROLS.forEach(ctrl => {
          const CONTROL = this.tercerosRelacionadosForm.get(ctrl);
          if (CONTROL) {
            CONTROL.enable();
            // Restaurar los validadores originales para los campos habilitados
            this.establecerValidadoresCampo(ctrl, CONTROL);
          }
        });
      } else {
        // Para otros tipos de modal con extranjeros, solo habilitar campos básicos
        const CONTROLS = ['pais'];
        CONTROLS.forEach(ctrl => {
          const CONTROL = this.tercerosRelacionadosForm.get(ctrl);
          if (CONTROL) {
            CONTROL.enable();
            this.establecerValidadoresCampo(ctrl, CONTROL);
          }
        });
      }
      return;
    }

    // De lo contrario, deshabilite todas excepto terceroNombre, tercerosNacionalidad, tipoPersona.
    const CONTROLS = [
      'rfc', 'curp', 'razonSocial', 'datosPersonalesNombre', 'datosPersonalesPrimerApellido',
      'datosPersonalesSegundoApellido', 'estado', 'municipio', 'localidad', 'codigoPostal',
      'colonia', 'calle', 'numeroExterior', 'numeroInterior', 'lada', 'telefono', 'correoElectronico'
    ];
    CONTROLS.forEach(ctrl => {
      const CONTROL = this.tercerosRelacionadosForm.get(ctrl);
      if (CONTROL) {
        CONTROL.disable();
        // Limpiar validadores para los campos deshabilitados para evitar errores de validación
        CONTROL.clearValidators();
        CONTROL.updateValueAndValidity();
      }
    });
    // Manejar el campo pais por separado: deshabilitarlo solo para 'Agregar otros'
    const PAIS_CONTROL = this.tercerosRelacionadosForm.get('pais');
    if (PAIS_CONTROL && IS_AGREGAR_OTROS) {
      PAIS_CONTROL.disable();
      // Limpiar validadores para el campo país deshabilitado
      PAIS_CONTROL.clearValidators();
      PAIS_CONTROL.updateValueAndValidity();
    } else if (PAIS_CONTROL) {
      PAIS_CONTROL.enable();
      // Restaurar el validador requerido para pais cuando esté habilitado
      PAIS_CONTROL.setValidators([Validators.required]);
      PAIS_CONTROL.updateValueAndValidity();
    }
  }

  /**
   * Establece los validadores apropiados para un campo basado en su nombre y contexto
   */
  private establecerValidadoresCampo(nombreCampo: string, control: AbstractControl): void {
    const NACIONALIDAD = this.tercerosRelacionadosForm.get('tercerosNacionalidad')?.value;
    const TIPO_PERSONA = this.tercerosRelacionadosForm.get('tipoPersona')?.value;
    const IS_EXTRANJERO = NACIONALIDAD === 'extranjero';
    
    // Limpiar validadores existentes
    control.clearValidators();
    
    // Aplicar validadores según el campo
    FabricanteModalComponent.aplicarValidadoresPorCampo(nombreCampo, control, IS_EXTRANJERO, TIPO_PERSONA);
    
    control.updateValueAndValidity();
  }

  /**
   * Aplica validadores específicos por campo
   */
  private static aplicarValidadoresPorCampo(nombreCampo: string, control: AbstractControl, isExtranjero: boolean, tipoPersona: string): void {
    switch (nombreCampo) {
      case 'rfc':
        control.setValidators([Validators.maxLength(13), FabricanteModalComponent.validadorRFC]);
        break;
      case 'curp':
        control.setValidators([Validators.pattern(REGEX_CURP)]);
        break;
      case 'datosPersonalesNombre':
      case 'datosPersonalesPrimerApellido':
        FabricanteModalComponent.establecerValidadoresNombreApellido(control, isExtranjero, tipoPersona);
        break;
      case 'razonSocial':
        FabricanteModalComponent.establecerValidadoresRazonSocial(control, isExtranjero, tipoPersona);
        break;
      case 'municipio':
        control.setValidators([Validators.required, Validators.pattern(REGEX_PATRON_ALFANUMERICO), Validators.maxLength(255)]);
        break;
      case 'localidad':
      case 'colonia':
        control.setValidators([Validators.required, Validators.pattern(REGEX_PATRON_ALFANUMERICO)]);
        break;
      case 'calle':
      case 'numeroExterior':
      case 'pais':
      case 'terceroNombre':
      case 'tipoPersona':
        control.setValidators([Validators.required]);
        break;
      case 'estado':
        control.setValidators([Validators.pattern(REGEX_PATRON_ALFANUMERICO), Validators.maxLength(255)]);
        break;
      case 'codigoPostal':
        control.setValidators([Validators.required, Validators.pattern(REGEX_POSTAL), Validators.maxLength(12)]);
        break;
      case 'datosPersonalesSegundoApellido':
        control.setValidators([Validators.pattern(REGEX_PATRON_ALFANUMERICO)]);
        break;
      case 'lada':
        control.setValidators([Validators.pattern(REGEX_SOLO_NUMEROS), Validators.maxLength(5)]);
        break;
      case 'telefono':
        control.setValidators([Validators.pattern(REGEX_TELEFONO_OPCIONAL), Validators.pattern(REGEX_PATRON_ALFANUMERICO), Validators.maxLength(30)]);
        break;
      case 'correoElectronico':
        control.setValidators([Validators.email, Validators.maxLength(254)]);
        break;
      default:
        break;
    }
  }

  /**
   * Establece validadores para campos de nombre y apellido
   */
  private static establecerValidadoresNombreApellido(control: AbstractControl, isExtranjero: boolean, tipoPersona: string): void {
    if (isExtranjero && tipoPersona === 'fisica') {
      control.setValidators([Validators.required, Validators.pattern(REGEX_PATRON_ALFANUMERICO)]);
    } else if (isExtranjero && tipoPersona === 'moral') {
      control.setValidators([Validators.pattern(REGEX_PATRON_ALFANUMERICO)]);
    } else {
      control.setValidators([Validators.required, Validators.pattern(REGEX_PATRON_ALFANUMERICO)]);
    }
  }

  /**
   * Establece validadores para razonSocial
   */
  private static establecerValidadoresRazonSocial(control: AbstractControl, isExtranjero: boolean, tipoPersona: string): void {
    if (isExtranjero && tipoPersona === 'moral') {
      control.setValidators([Validators.required, Validators.pattern(REGEX_PATRON_ALFANUMERICO)]);
    } else if (isExtranjero && tipoPersona === 'fisica') {
      control.setValidators([Validators.pattern(REGEX_PATRON_ALFANUMERICO)]);
    } else {
      control.setValidators([Validators.required, Validators.pattern(REGEX_PATRON_ALFANUMERICO)]);
    }
  }

  /**
   * Restablece el grupo de formulario `tercerosRelacionadosForm` con valores predeterminados vacíos.
   * Este método inicializa el formulario con controles para varios campos como
   * denominación social, RFC, CURP, detalles de dirección e información de contacto.
   * Cada control se establece con una cadena vacía como su valor predeterminado.
   *
   * @returns {void}
   */
  inicializarFormularioTercerosRelacionados(): void {
    this.tercerosRelacionadosForm = this.fb.group({
      denominacionSocial: [this.solicitudState.tercerosRelacionadosDenominacionSocial || '', [Validators.required, Validators.pattern(REGEX_PATRON_ALFANUMERICO)]],
      tercerosNacionalidad: [''],
      tipoPersona: [''],
      rfc: [''],
      curp: [''],
      razonSocial: [''],
      datosPersonalesNombre: ['', [Validators.pattern(REGEX_PATRON_ALFANUMERICO)]],
      datosPersonalesPrimerApellido: ['', [Validators.pattern(REGEX_PATRON_ALFANUMERICO)]],
      datosPersonalesSegundoApellido: ['', [Validators.pattern(REGEX_PATRON_ALFANUMERICO)]],
      pais: [{value: this.solicitudState.tercerosRelacionadosPais, disabled: false}, [Validators.required]],
      estado: [this.solicitudState.tercerosRelacionadosEstado || '', [Validators.pattern(REGEX_PATRON_ALFANUMERICO), Validators.maxLength(255)]],
      municipio: ['', [Validators.pattern(REGEX_PATRON_ALFANUMERICO), Validators.maxLength(255)]],
      localidad: [''],
      codigoPostal: [this.solicitudState.tercerosRelacionadosCodigoPostal || '', [Validators.pattern(REGEX_POSTAL), Validators.maxLength(12)]],
      colonia: ['', [Validators.pattern(REGEX_PATRON_ALFANUMERICO)]],
      calle: [this.solicitudState.tercerosRelacionadosCalle, Validators.required],
      numeroExterior: [this.solicitudState.tercerosRelacionadosNumeroExterior, Validators.required],
      numeroInterior: [this.solicitudState.tercerosRelacionadosNumeroInterior],
      lada: [this.solicitudState.tercerosRelacionadosLada, [Validators.pattern(REGEX_SOLO_NUMEROS), Validators.maxLength(5)]],
      telefono: [this.solicitudState.tercerosRelacionadosTelefono, [Validators.pattern(REGEX_TELEFONO_OPCIONAL), Validators.pattern(REGEX_PATRON_ALFANUMERICO), Validators.maxLength(30)]],
      correoElectronico: [this.solicitudState.tercerosRelacionadosCorreoElectronico || '', [Validators.email, Validators.maxLength(254)]],
    });
  }

  /**
     * Valida el RFC ingresado en el formulario.
     * Utiliza expresiones regulares para verificar si es un RFC válido.
     * 
     * @returns Un objeto de error si el RFC es inválido, o null si es válido.
     */
  static validadorRFC(control: AbstractControl): ValidationErrors | null {
    const VALUE = control.value;
    if (!VALUE) {
      return null;
    }
    const ES_VALIDO = REGEX_RFC.test(VALUE);
    return ES_VALIDO ? null : { rfcInvalido: true };
  }


  /**
   * Establece el valor de un campo en el store de Tramite31601.
   * @param form - El grupo de formularios que contiene el campo.
   * @param campo - El nombre del campo cuyo valor se va a establecer.
   * @param metodoNombre - El nombre del método en el store que se utilizará para establecer el valor.
   */
  public establecerValorStore(formulario: FormGroup, campo: string, nombreMetodo: keyof Tramite2603Store): void {
    const VALOR = formulario.get(campo)?.value;
    const METODO = this.tramite2603Store[nombreMetodo];
    if (typeof METODO === 'function') {
      (METODO as (this: Tramite2603Store, value: unknown) => void).call(this.tramite2603Store, VALOR);
    }
  }

  /**
 * Determina si se debe cargar un formulario nuevo o uno existente.  
 * Ejecuta la lógica correspondiente según el estado del componente.
 */
  inicializarEstadoFormulario(): void {
    if (this.esSoloLecturaFormulario) {
      this.guardarDatosFormulario();
    } else {
      this.inicializarFormulario();
    }
  }


  /**
   * Guarda los datos del formulario y ajusta el estado de solo lectura.
   * Si el formulario está en modo solo lectura, deshabilita todos los controles del formulario.
   * Si no, habilita los controles para permitir la edición.
   */
  guardarDatosFormulario(): void {
    this.inicializarFormulario();
    if (this.esSoloLecturaFormulario) {
      // Deshabilita el formulario si está en modo solo lectura
      this.tercerosRelacionadosForm.disable();
    } else {
      // Habilita el formulario para edición
      this.tercerosRelacionadosForm.enable();
    }
  }

  /**
   * Establece el valor de un campo en el store de Tramite31601.
   * @param form - El grupo de formularios que contiene el campo.
   * @param campo - El nombre del campo cuyo valor se va a establecer.
   * @param metodoNombre - El nombre del método en el store que se utilizará para establecer el valor.
   */
  eventoCambioValor(evento: string | number | Event, formulario: FormGroup, campo: string, nombreMetodo: keyof Tramite2603Store): void {
    let VALOR;
    if (evento instanceof Event && (evento.target instanceof HTMLInputElement || evento.target instanceof HTMLSelectElement || evento.target instanceof HTMLTextAreaElement)) {
      const INPUT = evento.target as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
      VALOR = INPUT.value;
    } else {
      VALOR = evento;
    }
    formulario.get(campo)?.setValue(VALOR);
    // Activar la lógica de actualización del campo cuando cambia la nacionalidad o el tipo de persona
    if ((campo === 'tercerosNacionalidad' || campo === 'tipoPersona') && formulario.get('tercerosNacionalidad')?.value && formulario.get('tipoPersona')?.value) {
      this.actualizarCamposExtranjeroFisica();
    }
    this.establecerValorStore(formulario, campo, nombreMetodo);
  }

  /** Busca y asigna datos simulados al formulario de terceros relacionados si el RFC es válido. */
  buscar(): void {
    if (this.tercerosRelacionadosForm.get('rfc')?.valid) {
      this.tercerosRelacionadosForm.patchValue({
        curp: 'MAVLT12345678',
        datosPersonalesNombre: 'EUROFOODS DE MEXICO',
        datosPersonalesPrimerApellido: 'GONZALEZ',
        datosPersonalesSegundoApellido: 'PINAL',
        pais: '1',
        estado: 'CDMX',
        municipio: 'CDMX',
        localidad: 'VICTORIA DE DURANGO',
        codigoPostal: '12345',
        colonia: 'CENTRO',
        calle: 'LIBERTAD',
        numeroExterior: 'S/N',
        numeroInterior: 'A',
        lada: '618',
        telefono: '1234567890',
        correoElectronico: 'info@eurofoods.com.mx',
        razonSocial: 'EUROFOODS DE MEXICO',
        denominacionSocial: 'EUROFOODS DE MEXICO'
      });
    }
  }


  /**
   * Limpia todos los campos del formulario de terceros relacionados, restableciéndolos a su estado inicial.
   *
   * @returns {void}
   */
  limpiar(): void {
    this.tercerosRelacionadosForm.reset();
  }

  /**
   * Guarda los datos del formulario de terceros relacionados si el formulario es válido.
   * Si es válido, emite los datos y cierra el modal; si no, marca todos los campos como tocados.
   *
   * @returns {void}
   */
  guardar(): void {
    this.tercerosRelacionadosForm.markAllAsTouched();
    if (this.tercerosRelacionadosForm.valid) {
      this.guardarFabricante.emit(this.tercerosRelacionadosForm.getRawValue());
      this.bsModalRef.hide();
    }
  }

  /**
  * compo doc
  * @method isValid
  * @description 
  * Verifica si un campo específico del formulario es válido.
  * @param field El nombre del campo que se desea validar.
  * @returns {boolean | null} Un valor booleano que indica si el campo es válido.
  */
  public esValido(formulario: FormGroup, campo: string): boolean | null {
  return this.validacionesService.isValid(formulario, campo);
  }

  /**
   * Método del ciclo de vida de Angular que se llama cuando el componente se destruye.
   * Este método completa el observable destroyNotifier$ para cancelar las suscripciones activas.
   */
  ngOnDestroy(): void {
  this.notificadorDestruir$.next();
  this.notificadorDestruir$.complete();
  }

}
