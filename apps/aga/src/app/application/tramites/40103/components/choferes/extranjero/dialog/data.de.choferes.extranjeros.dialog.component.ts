import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { Catalogo, CategoriaMensaje, Notificacion, NotificacionesComponent, TipoNotificacionEnum } from '@ng-mf/data-access-user';
import { CatalogoSelectComponent, SharedModule, TituloComponent } from "@libs/shared/data-access-user/src";
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from "@angular/core";
import { Subject, firstValueFrom, takeUntil } from "rxjs";
import { REGEX_SOLO_DIGITOS, REGEX_SIN_DIGITOS } from '@libs/shared/data-access-user/src/tramites/constantes/regex.constants';
import { Chofer40103Service } from "../../../../estados/chofer40103.service";
import { ChoferesExtranjeros } from '../../../../models/registro-muestras-mercancias.model';
import { CommonModule } from "@angular/common";

/**
 * Componente para la gestión del diálogo de datos de choferes extranjeros en el trámite 40103.
 *
 * Este archivo contiene la definición del componente, sus propiedades, eventos y métodos principales
 * para la captura, edición y validación de datos de choferes extranjeros, así como la gestión de catálogos
 * y la interacción con servicios relacionados.
 *
 * - Permite la visualización y edición de datos de choferes extranjeros.
 * - Gestiona formularios reactivos y validaciones.
 * - Administra la apertura y cierre de modales.
 * - Emite eventos para agregar o cancelar la edición de choferes.
 * - Interactúa con servicios para obtener catálogos de países, estados, municipios y colonias.
 *
 * @component
 * @example
 * <app-choferes-datos-extranjeros-dialog
 *   [readonly]="true"
 *   [datosDeChofere]="chofer"
 *   (eventoAgregarModal)="onAgregar($event)"
 *   (cancelarEvent)="onCancelar()"
 * ></app-choferes-datos-extranjeros-dialog>
 */
@Component({
  selector: 'app-choferes-datos-extranjeros-dialog',
  templateUrl: './data.de.choferes.extranjeros.dialog.component.html',
  styleUrls: ['./data.de.choferes.extranjeros.dialog.component.scss'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    SharedModule,
    FormsModule,
    CatalogoSelectComponent,
    TituloComponent,
    NotificacionesComponent
  ],
})
export class DatosDeChoferesExtranjerosDialogComponent implements OnInit, OnDestroy {
  /**
   * Marcar para mostrar un error de solo dígitos cuando el usuario escribe caracteres que no son dígitos.
   */
  showDigitsOnlyError: boolean = false;

  /**
   * Indica si el formulario está en modo solo lectura.
   * @type {boolean}
   */
  @Input() readonly: boolean = false;

  /**
   * Datos del chofer nacional que se mostrarán o editarán en el formulario.
   * @type {ChoferesExtranjeros}
   */
  @Input({ required: true }) datosDeChofere!: ChoferesExtranjeros;

  /**
   * Formulario reactivo para los datos del chofer.
   * @type {FormGroup}
   */
  formChoferes!: FormGroup;

  /**
   * Permite solo dígitos en el campo numeroDelSeguroSocial.
   */
  enInputSoloDigitos(event: Event): void {
    const input = event.target as HTMLInputElement;
    const valorOriginal = input.value;
    const soloDigitos = valorOriginal.replace(REGEX_SIN_DIGITOS, '');
    this.showDigitsOnlyError = valorOriginal !== soloDigitos;
    input.value = soloDigitos;
    this.formChoferes.get('numeroDelSeguroSocial')?.setValue(soloDigitos, { emitEvent: false });
    if (!this.showDigitsOnlyError) {
      setTimeout(() => { this.showDigitsOnlyError = false; }, 1000);
    }
  }

  /**
   * Sujeto utilizado para gestionar la destrucción de suscripciones y evitar fugas de memoria.
   * @type {Subject<unknown>}
   */
  destroyed$: Subject<unknown> = new Subject<unknown>();

  /**
   * Indica si se debe mostrar la notificación.
   * @type {boolean}
   */
  showNotification: boolean = false;

  /**
   * Lista de países disponibles.
   * @type {Catalogo[]}
   */
  paisList: Catalogo[] = [];

  /**
   * Lista de estados disponibles.
   * @type {Catalogo[]}
   */
  estadoList: Catalogo[] = [];

  /**
   * Lista de municipios o alcaldías disponibles.
   * @type {Catalogo[]}
   */
  municipioList: Catalogo[] = [];

  /**
   * Lista de colonias disponibles.
   * @type {Catalogo[]}
   */
  coloniaList: Catalogo[] = [];

  /**
   * Evento emitido al cancelar el modal.
   * @type {EventEmitter<void>}
   */
  @Output() cancelarEvent = new EventEmitter<void>();

  /**
   * Evento emitido al agregar o editar un chofer extranjero.
   * @type {EventEmitter<ChoferesExtranjeros>}
   */
  @Output() eventoAgregarModal = new EventEmitter<ChoferesExtranjeros>();

  /**
   * Alerta de notificación para mostrar mensajes al usuario.
   * @type {Notificacion}
   */
  public alertaNotificacion!: Notificacion;

  // ======================= MÉTODOS =======================

  /**
   * Constructor de la clase.
   * 
   * @param fb Instancia de FormBuilder para la creación y gestión de formularios reactivos.
   * @param chofer40103Service Servicio específico para operaciones relacionadas con choferes en el trámite 40103.
   */
  constructor(private fb: FormBuilder,
    private chofer40103Service: Chofer40103Service,
  ) {
  }

  /**
   * Método del ciclo de vida de Angular que se ejecuta al inicializar el componente.
   * Inicializa el formulario y carga las listas de catálogos necesarias.
   * @returns {Promise<void>}
   */
  async ngOnInit(): Promise<void> {
    this.formChoferes = this.fb.group({
      numero: [{ value: this.datosDeChofere?.numero, disabled: this.readonly }, this.readonly ? [] : [Validators.required, Validators.maxLength(10)]],
      primerApellido: [{ value: this.datosDeChofere?.primerApellido, disabled: this.readonly }, this.readonly ? [] : [Validators.required, Validators.maxLength(50)]],
      segundoApellido: [{ value: this.datosDeChofere?.segundoApellido, disabled: this.readonly }],

      // Sin validadores para campos siempre deshabilitados
      nacionalidad: [{ value: this.datosDeChofere?.nacionalidad, disabled: true }], 
      numeroDeGafete: [{ value: this.datosDeChofere?.numeroDeGafete, disabled: true }],
      vigenciaGafete: [{ value: this.datosDeChofere?.vigenciaGafete, disabled: true }],

      numeroDelSeguroSocial: [{ value: this.datosDeChofere?.numeroDelSeguroSocial, disabled: this.readonly }, this.readonly ? [] : [Validators.required, Validators.maxLength(11), Validators.pattern(REGEX_SOLO_DIGITOS)]],
      numberDeIdeFiscal: [{ value: this.datosDeChofere?.numberDeIdeFiscal, disabled: this.readonly }, this.readonly ? [] : [Validators.required, Validators.maxLength(13)]],

      // Sin validadores para campos siempre deshabilitados
      pais: [{ value: this.datosDeChofere?.pais, disabled: true }],
      codigoPostal: [{ value: this.datosDeChofere?.codigoPostal, disabled: this.readonly }, this.readonly ? [] : [Validators.required, Validators.maxLength(5), Validators.pattern(/^\d{5}$/)]],
      estado: [{ value: this.datosDeChofere?.estado, disabled: this.readonly }, this.readonly ? [] : [Validators.required]],

      calle: [{ value: this.datosDeChofere?.calle, disabled: this.readonly }, this.readonly ? [] : [Validators.required, Validators.maxLength(100)]],
      numeroExterior: [{ value: this.datosDeChofere?.numeroExterior, disabled: this.readonly }, this.readonly ? [] : [Validators.required, Validators.maxLength(10)]],
      numeroInterior: [{ value: this.datosDeChofere?.numeroInterior, disabled: this.readonly }, this.readonly ? [] : [Validators.maxLength(10)]],

      paisDeResidencia: [{ value: this.datosDeChofere?.paisDeResidencia, disabled: this.readonly }, this.readonly ? [] : [Validators.required]],
      ciudad: [{ value: this.datosDeChofere?.ciudad, disabled: this.readonly }, this.readonly ? [] : [Validators.required, Validators.maxLength(50)]],

      correoElectronico: [{ value: this.datosDeChofere?.correoElectronico, disabled: this.readonly }, this.readonly ? [] : [Validators.required, Validators.email]],
      telefono: [{ value: this.datosDeChofere?.telefono, disabled: this.readonly }, this.readonly ? [] : [Validators.required, Validators.pattern(REGEX_SOLO_DIGITOS)]],
    });

    await this.obtenerListaPaises();
    await this.actualizarListasDatos(this.datosDeChofere);

  }


  /**
   * Obtiene la lista de países emisores desde el servicio `chofer40103Service` y la asigna a la propiedad `paisList`.
   *
   * @returns {Promise<void>}
   */
  async obtenerListaPaises(): Promise<void> {
    try {
      const DATOS = await firstValueFrom(
        this.chofer40103Service
          .getPaisEmisor()
          .pipe(takeUntil(this.destroyed$))
      );
      this.paisList = DATOS || [];
      if (this.paisList.length > 0) {
        this.alCambiarPais(this.paisList[0]);
      }
    } catch (error) {
      // Manejo de errores si es necesario
    }
  }

  /**
   * Maneja el cambio de país seleccionado, actualizando la lista de estados y reiniciando los campos dependientes.
   * @param value País seleccionado.
   * @returns {void}
   */
  alCambiarPais(value: Catalogo): void {
    this.obtenerEstadosPorPais(value);
    // Solo reiniciar controles que existan realmente en el formulario
    if (this.formChoferes.controls['estado']) {
      this.formChoferes.controls['estado'].reset();
    }
  }

  /**
   * Obtiene la lista de estados por país desde el servicio.
   * @param value País seleccionado.
   * @returns {Promise<Catalogo[]>}
   */
  private async obtenerEstadosPorPais(value: Catalogo): Promise<Catalogo[]> {
    try {
      const DATOS = await firstValueFrom(
        this.chofer40103Service
          .getEstadosPorPais(value.id)
          .pipe(takeUntil(this.destroyed$))
      );
      this.estadoList = DATOS || [];
    } catch (error) {
      // Manejo de errores si es necesario
    }
    return this.estadoList;
  }

  /**
   * Maneja el cambio de estado seleccionado, actualizando la lista de municipios y reseteando los campos dependientes.
   * @param value Estado seleccionado.
   * @returns {void}
   */
  onEstadoChange(value: Catalogo): void {
    this.fetchMunicipiosByEstado(value);
    // Note: municipioAlcaldia and colonia controls don't exist in current form
    // Restablecer solo si se agregan al formulario en el futuro
  }

  /**
   * Obtiene la lista de municipios por estado desde el servicio.
   * @param value Estado seleccionado.
   * @returns {Promise<Catalogo[]>}
   */
  private async fetchMunicipiosByEstado(value: Catalogo): Promise<Catalogo[]> {
    try {
      const DATA = await firstValueFrom(
        this.chofer40103Service
          .getMunicipiosPorEstado(value.id)
          .pipe(takeUntil(this.destroyed$))
      );
      this.municipioList = DATA || [];
    } catch (error) {
      // Manejo de errores si es necesario
    }
    return this.municipioList;

  }

  /**
   * Maneja el cambio de municipio seleccionado, actualizando la lista de colonias y reseteando el campo colonia.
   * @param value Municipio seleccionado.
   * @returns {void}
   */
  onMunicipioChange(value: Catalogo): void {
    this.fetchColoniasByMunicipio(value);
    // Nota: el control de colonia no existe en el formulario actual
    // Restablecer solo si se agrega al formulario en el futuro
  }

  /**
   * Obtiene la lista de colonias por municipio desde el servicio.
   * @param value Municipio seleccionado.
   * @returns {Promise<Catalogo[]>}
   */
  private async fetchColoniasByMunicipio(value: Catalogo): Promise<Catalogo[]> {
    try {
      const DATA = await firstValueFrom(
        this.chofer40103Service
          .getColoniasPorMunicipio(value.id)
          .pipe(takeUntil(this.destroyed$))
      );
      this.coloniaList = DATA || [];
    } catch (error) {
      // Manejo de errores si es necesario
    }
    return this.coloniaList;
  }

  /**
   * Obtiene los controles de formulario del formulario choferes.
   */
  get getFormValues(): { [key: string]: AbstractControl } {
    return this.formChoferes.controls;
  }

  /**
   * Cierra el modal de choferes y emite el evento de cancelación.
   * @returns {void}
   */
  cerrarModal(): void {
    this.alertaNotificacion = undefined as any;
    this.showDigitsOnlyError = false;
    this.showNotification = false;
    
    if (this.formChoferes) {
      this.formChoferes.markAsUntouched();
      this.formChoferes.markAsPristine();
    }
    
    this.cancelarEvent.emit();
  }

  /**
   * Restablece el formulario de choferes a sus valores predeterminados.
   * 
   * Este método reinicia todos los campos del formulario `formChoferes` con valores vacíos o por defecto,
   * permitiendo limpiar el formulario para una nueva entrada de datos.
   */
  restablecerFormulario(): void {
    this.formChoferes.reset({
      numero: '',
      primerApellido: '',
      segundoApellido: '',
      nacionalidad: '',
      numeroDeGafete: '',
      vigenciaGafete: '',
      numeroDelSeguroSocial: '',
      numberDeIdeFiscal: '',
      pais: '',
      codigoPostal: '',
      estado: '',
      calle: '',
      numeroExterior: '',
      numeroInterior: '',
      paisDeResidencia: '',
      ciudad: '',
      correoElectronico: '',
      telefono: ''
    });
    
    this.showDigitsOnlyError = false;
    
    this.formChoferes.markAsPristine();
    this.formChoferes.markAsUntouched();
  }

  /**
   * Maneja la entrada en el campo número y busca automáticamente el chofer si la longitud es suficiente.
   * @returns {void}
   */
  alIngresarNumero(): void {
    const VALOR_NUMERO = this.formChoferes.get('numero')?.value;
    if (VALOR_NUMERO && VALOR_NUMERO.length >= 3) {
      this.buscarChoferExtranjero(VALOR_NUMERO);
    }
  }

  /**
   * Busca información de un chofer extranjero utilizando su número y actualiza el formulario.
   * @param numero Número del chofer extranjero.
   * @returns {Promise<void>}
   */
  async buscarChoferExtranjero(numero: string): Promise<void> {
    if (!numero) {
      this.alertaNotificacion = {
        tipoNotificacion: TipoNotificacionEnum.ALERTA,
        categoria: CategoriaMensaje.INFORMACION,
        modo: 'action',
        titulo: 'Alert',
        mensaje: 'Favor de ingresar número de identificación',
        cerrar: true,
        txtBtnAceptar: 'Aceptar',
        txtBtnCancelar: '',
      };
      this.showNotification = true;
      return;
    }

    try {
      const response = await firstValueFrom(
        this.chofer40103Service
          .obtenerTablaDatos<ChoferesExtranjeros>('mock-data-choferes-extranjero.json')
          .pipe(takeUntil(this.destroyed$))
      );

      if (!response || response.length === 0) {
        this.alertaNotificacion = {
          tipoNotificacion: TipoNotificacionEnum.ALERTA,
          categoria: CategoriaMensaje.INFORMACION,
          modo: 'action',
          titulo: 'Alert',
          mensaje: 'No se encontró información para el número proporcionado.',
          cerrar: true,
          txtBtnAceptar: 'Aceptar',
          txtBtnCancelar: '',
        };
        this.showNotification = true;
        return;
      }
      
      const choferData = response[0];
      
      await this.actualizarListasDatos(choferData);
      
      this.formChoferes.patchValue(choferData);
    } catch (error) {
      this.alertaNotificacion = {
        tipoNotificacion: TipoNotificacionEnum.ALERTA,
        categoria: CategoriaMensaje.INFORMACION,
        modo: 'action',
        titulo: 'Error',
        mensaje: 'Error al buscar la información del chofer.',
        cerrar: true,
        txtBtnAceptar: 'Aceptar',
        txtBtnCancelar: '',
      };
      this.showNotification = true;
    }
  }

  /**
   * Actualiza las listas de estados, municipios y colonias según los datos del chofer.
   * @param data Datos del chofer extranjero.
   * @returns {Promise<void>}
   */
  private async actualizarListasDatos(data: ChoferesExtranjeros): Promise<void> {
    if (!data || this.paisList.length === 0) {
      return;
    }

    const paisFound = this.paisList.find((p: Catalogo) => p.descripcion === data.pais);
    if (paisFound) {
      data.pais = paisFound.id.toString();
      
      await this.obtenerEstadosPorPais(paisFound);
    }

    if (data.estado && this.estadoList.length > 0) {
      const estadoFound = this.estadoList.find((e: Catalogo) => e.descripcion === data.estado);
      if (estadoFound) {
        data.estado = estadoFound.id.toString();
      }
    }

    if (data.paisDeResidencia) {
      const paisResidenciaFound = this.paisList.find((p: Catalogo) => p.descripcion === data.paisDeResidencia);
      if (paisResidenciaFound) {
        data.paisDeResidencia = paisResidenciaFound.id.toString();
      }
    }

    if (data.nacionalidad) {
      const nacionalidadFound = this.paisList.find((p: Catalogo) => p.descripcion === data.nacionalidad);
      if (nacionalidadFound) {
        data.nacionalidad = nacionalidadFound.id.toString();
      }
    }

    this.formChoferes.patchValue({
      pais: data.pais,
      estado: data.estado,
      paisDeResidencia: data.paisDeResidencia,
      nacionalidad: data.nacionalidad
    });
  }

  /**
   * Limpia todos los campos del formulario de choferes.
   * @returns {void}
   */
  limpiarFormulario(): void {
    this.formChoferes.reset();
  }

  /**
   * Guarda los datos editados del chofer extranjero si el formulario es válido, emite el evento y cierra el modal.
   * Si el formulario es inválido, muestra una notificación de alerta.
   * @returns {void}
   */
  guardarFilaEditada(): void {
    if (!this.formChoferes) {
      return;
    }
    
    this.formChoferes.markAllAsTouched();
    this.formChoferes.updateValueAndValidity();

    // Obtener todos los valores del formulario incluyendo controles deshabilitados
    const datosFormulario = this.formChoferes.getRawValue() as ChoferesExtranjeros;
    
    // Validar solo campos habilitados
    const camposInvalidos: string[] = [];
    
    Object.keys(this.formChoferes.controls).forEach(clave => {
      const control = this.formChoferes.get(clave);
      
      // Omitir validación para controles deshabilitados
      if (control?.disabled) {
        return;
      }
      
      // Verificar si el control habilitado es inválido
      if (control?.invalid) {
        // Para campos requeridos, verificar si tienen valor
        if (control.hasError('required')) {
          camposInvalidos.push(clave);
        }
        // Para errores de patrón/formato
        else if (control.hasError('pattern') || control.hasError('email')) {
          camposInvalidos.push(clave);
        }
      }
    });

    // Verificar si el formulario es válido (sin campos habilitados inválidos)
    const esFormularioValido = camposInvalidos.length === 0;

    if (esFormularioValido) {
      const DATOS = { ...datosFormulario };
      
      // Conservar datos existentes para modificaciones, o usar datos del formulario para registros nuevos
      if (this.datosDeChofere && this.datosDeChofere.numero && this.datosDeChofere.numero.trim() !== '') {
        // Mantener el número original para modificaciones (clave primaria)
        DATOS.numero = this.datosDeChofere.numero;
      }
      
      // Convertir IDs de vuelta a descripciones para mostrar
      DATOS.pais = this.paisList.find((p: Catalogo) => p.id === Number(datosFormulario.pais))?.descripcion || '';
      DATOS.estado = this.estadoList.find((e: Catalogo) => e.id === Number(datosFormulario.estado))?.descripcion || '';
      DATOS.paisDeResidencia = this.paisList.find((p: Catalogo) => p.id === Number(datosFormulario.paisDeResidencia))?.descripcion || '';
      DATOS.nacionalidad = this.paisList.find((p: Catalogo) => p.id === Number(datosFormulario.nacionalidad))?.descripcion || '';

      // Emitir el evento con los datos guardados
      this.eventoAgregarModal.emit(DATOS);
    } else {
      this.mostrarNotificacionErrorValidacion(camposInvalidos);
    }
  }

  /**
   * Muestra una notificación de error de validación con los campos inválidos.
   * @param camposInvalidos Lista de campos que tienen errores de validación.
   * @returns {void}
   */
  private mostrarNotificacionErrorValidacion(camposInvalidos: string[]): void {
    this.alertaNotificacion = {
      tipoNotificacion: TipoNotificacionEnum.ALERTA,
      categoria: CategoriaMensaje.INFORMACION,
      modo: 'action',
      titulo: 'Formulario inválido',
      mensaje: `Por favor verifique los campos obligatorios`,
      cerrar: true,
      txtBtnAceptar: 'Aceptar',
      txtBtnCancelar: '',
    };
    this.showNotification = true;
  }

  /**
   * Verifica si el control del formulario es inválido y ha sido tocado.
   * @param nombreControl El nombre del control del formulario.
   * @returns {boolean | null} `true` si el control es inválido y tocado, `null` si no existe el control.
   */
  esInvalido(nombreControl: string): boolean | null {
    const CONTROL = this.formChoferes.get(nombreControl);
    return CONTROL ? CONTROL.invalid && CONTROL.touched : null;
  }

  /**
   * Método del ciclo de vida de Angular que se ejecuta al destruir el componente.
   * Libera recursos y completa el Subject destroyed$.
   * @returns {void}
   */
  ngOnDestroy(): void {
    this.destroyed$.next(1);
    this.destroyed$.complete();
  }

}