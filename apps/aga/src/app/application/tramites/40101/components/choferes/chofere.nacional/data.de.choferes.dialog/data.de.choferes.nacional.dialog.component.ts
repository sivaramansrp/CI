import { CommonModule } from '@angular/common';

import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  TemplateRef,
  ViewChild
} from '@angular/core';

import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

import { Subject, firstValueFrom, takeUntil } from 'rxjs';

import {
  Catalogo,
  CategoriaMensaje,
  Notificacion,
  NotificacionesComponent,
  TipoNotificacionEnum
} from '@ng-mf/data-access-user';
import {
  CatalogoSelectComponent,
  SharedModule,
  TituloComponent
} from '@libs/shared/data-access-user/src';
import {
  REGEX_CURP,
  REGEX_RFC,
  REGEX_SOLO_DIGITOS
} from '@libs/shared/data-access-user/src/tramites/constantes/regex.constants';

import { Chofer40101Service } from '../../../../estado/chofer40101.service';
import { DatosDelChoferNacional } from '../../../../models/registro-muestras-mercancias.model';

@Component({
  selector: 'app-choferes-datos',
  templateUrl: './data.de.choferes.nacional.dialog.component.html',
  styleUrls: ['./data.de.choferes.nacional.dialog.component.scss'],
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
export class DatosDeChoferesNacionalDialogComponent implements OnInit, OnDestroy {
  /**
   * Indica si el formulario está en modo edición.
   */
  isEditando: boolean = false;

  /**
   * Índice del registro que se está editando.
   */
  indiceEditando: number | null = null;

  /**
   * Indica si el formulario está en modo solo lectura.
   * @type {boolean}
   */
  @Input() readonly: boolean = false;

  /**
   * Datos del chofer nacional que se mostrarán o editarán en el formulario.
   * @type {DatosDelChoferNacional}
   */
  @Input({ required: true }) datosDeChofere!: DatosDelChoferNacional;

  /**
   * Formulario reactivo para los datos del chofer.
   * @type {FormGroup}
   */
  formChoferes!: FormGroup;

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
   * Referencia al template del modal de choferes.
   * @type {TemplateRef<unknown>}
   */
  @ViewChild('datosDeChoferesModal') datosDeChoferesModal!: TemplateRef<unknown>;

  /**
   * Referencia al modal de Bootstrap.
   * @type {BsModalRef | undefined}
   */
  modalRef?: BsModalRef;

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
  @Output() cancelEvent = new EventEmitter<void>();

  /**
   * Evento emitido al agregar o editar un chofer nacional.
   * @type {EventEmitter<DatosDelChoferNacional>}
   */
  @Output() addModalEvent = new EventEmitter<{ datos: DatosDelChoferNacional, indice?: number }>();

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
   * @param modalService Servicio para la gestión de modales (ventanas emergentes) utilizando BsModalService.
   * @param chofer40101Service Servicio específico para operaciones relacionadas con choferes en el trámite 40101.
   */
  constructor(private fb: FormBuilder,
    private modalService: BsModalService,
    private chofer40101Service: Chofer40101Service,
  ) {
     // Lógica para el constructor si es necesario.
  }

  /**
   * Método del ciclo de vida de Angular que se ejecuta al inicializar el componente.
   * Inicializa el formulario y carga las listas de catálogos necesarias.
   * @returns {Promise<void>}
   */
  async ngOnInit(): Promise<void> {



    this.formChoferes = this.fb.group({
      curp: [{ value: this.datosDeChofere?.curp, disabled: false }, [
        Validators.required,
        Validators.maxLength(18),
        Validators.pattern(REGEX_CURP),
      ]],
      rfc: [{ value: this.datosDeChofere?.rfc, disabled: false }, [Validators.required, Validators.pattern(REGEX_RFC)]],
      nombre: [{ value: this.datosDeChofere?.nombre, disabled: true }, Validators.required],
      primerApellido: [{ value: this.datosDeChofere?.primerApellido, disabled: true }, Validators.required],
      segundoApellido: [{ value: this.datosDeChofere?.segundoApellido, disabled: true }],
      numeroDeGafete: [{ value: this.datosDeChofere?.numeroDeGafete, disabled: true }, Validators.required],
      vigenciaGafete: [{ value: this.datosDeChofere?.vigenciaGafete, disabled: true }, Validators.required],
      calle: [{ value: this.datosDeChofere?.calle, disabled: this.readonly }, Validators.required],
      numeroExterior: [{ value: this.datosDeChofere?.numeroExterior, disabled: this.readonly }, Validators.required],
      numeroInterior: [{ value: this.datosDeChofere?.numeroInterior, disabled: this.readonly }],
      pais: [{ value: 1, disabled: true }],
      estado: [{ value: this.datosDeChofere?.estado, disabled: this.readonly }, Validators.required],
      municipioAlcaldia: [{ value: this.datosDeChofere?.municipioAlcaldia, disabled: this.readonly }, Validators.required],
      colonia: [{ value: this.datosDeChofere?.colonia, disabled: this.readonly }, Validators.required],
      paisDeResidencia: [{ value: this.datosDeChofere?.paisDeResidencia, disabled: this.readonly }, Validators.required],
      ciudad: [{ value: this.datosDeChofere?.ciudad, disabled: this.readonly }, Validators.required],
      localidad: [{ value: this.datosDeChofere?.localidad, disabled: this.readonly }, Validators.required],
      codigoPostal: [{ value: this.datosDeChofere?.codigoPostal, disabled: this.readonly }, Validators.required],
      correoElectronico: [{ value: this.datosDeChofere?.correoElectronico, disabled: this.readonly }, [Validators.required, Validators.email]],
      telefono: [{ value: this.datosDeChofere?.telefono, disabled: this.readonly }, [Validators.required, Validators.pattern(REGEX_SOLO_DIGITOS)]],
    }, { updateOn: 'change' });

    await this.paisListData();
    await this.updateListsData(this.datosDeChofere);

  }


  /**
   * Obtiene la lista de países emisores desde el servicio `chofer40101Service` y la asigna a la propiedad `paisList`.
   *
   * @returns {void}
   */
  async paisListData(): Promise<void> {
    try {
      const DATA = await firstValueFrom(
        this.chofer40101Service
          .getPaisEmisor()
          .pipe(takeUntil(this.destroyed$))
      );
      this.paisList = DATA || [];
      if (this.paisList.length > 0) {
        this.onPaisChange(this.paisList[0]);
      }
    } catch (error) {
      // Manejo de errores si es necesario
    }
  }

  /**
   * Maneja el cambio de país seleccionado, actualizando la lista de estados y reseteando los campos dependientes.
   * @param value País seleccionado.
   * @returns {void}
   */
  onPaisChange(value: Catalogo): void {
    this.fetchEstadosByPais(value);
    this.formChoferes.controls['estado'].reset();
    this.formChoferes.controls['municipioAlcaldia'].reset();
    this.formChoferes.controls['colonia'].reset();
  }

  /**
   * Obtiene la lista de estados por país desde el servicio.
   * @param value País seleccionado.
   * @returns {Promise<Catalogo[]>}
   */
  private async fetchEstadosByPais(value: Catalogo): Promise<Catalogo[]> {
    try {
      const DATA = await firstValueFrom(
        this.chofer40101Service
          .getEstadosPorPais(value.id)
          .pipe(takeUntil(this.destroyed$))
      );
      this.estadoList = DATA || [];
    } catch (error) {
      console.error('Error al obtener estados por país:', error);
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

    this.formChoferes.controls['municipioAlcaldia'].reset();
    this.formChoferes.controls['colonia'].reset();
  }

  /**
   * Obtiene la lista de municipios por estado desde el servicio.
   * @param value Estado seleccionado.
   * @returns {Promise<Catalogo[]>}
   */
  private async fetchMunicipiosByEstado(value: Catalogo): Promise<Catalogo[]> {
    try {
      const DATA = await firstValueFrom(
        this.chofer40101Service
          .getMunicipiosPorEstado(value.id)
          .pipe(takeUntil(this.destroyed$))
      );
      this.municipioList = DATA || [];
    } catch (error) {
      console.error('Error al obtener municipios por estado:', error);
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

    this.formChoferes.controls['colonia'].reset();
  }

  /**
   * Obtiene la lista de colonias por municipio desde el servicio.
   * @param value Municipio seleccionado.
   * @returns {Promise<Catalogo[]>}
   */
  private async fetchColoniasByMunicipio(value: Catalogo): Promise<Catalogo[]> {
    try {
      const DATA = await firstValueFrom(
        this.chofer40101Service
          .getColoniasPorMunicipio(value.id)
          .pipe(takeUntil(this.destroyed$))
      );
      this.coloniaList = DATA || [];
    } catch (error) {
      console.error('Error al obtener colonias por municipio:', error);
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
   * Abre el modal de choferes.
   * @returns {void}
   */
  abiertoModal(): void {
    this.modalRef = this.modalService.show(this.datosDeChoferesModal, { class: 'modal-xl' });
  }

  /**
   * Cierra el modal de choferes y emite el evento de cancelación.
   * @returns {void}
   */
  cerrarModal(): void {
    this.modalRef?.hide();
    this.cancelEvent.emit();
  }

  /**
   * Limpia el formulario de choferes a sus valores predeterminados.
   * 
   * Este método reinicia todos los campos del formulario `formChoferes` con valores vacíos o por defecto,
   * permitiendo limpiar el formulario para una nueva entrada de datos.
   */
  limpiarFormulario(): void {
    this.formChoferes.reset({
      curp: '',
      rfc: '',
      nombre: '',
      primerApellido: '',
      segundoApellido: '',
      numeroDeGafete: '',
      vigenciaGafete: '',
      calle: '',
      numeroExterior: '',
      numeroInterior: '',
      pais: 1,
      estado: '',
      municipioAlcaldia: '',
      colonia: '',
      paisDeResidencia: '1',
      ciudad: '',
      localidad: '',
      codigoPostal: '',
      correoElectronico: '',
      telefono: ''
    });
    
  }

  /**
   * Maneja la entrada en el campo CURP y busca automáticamente el chofer si la longitud es suficiente.
   * @returns {void}
   */
  onCurpInput(): void {
    const CURP_VALUE = this.formChoferes.get('curp')?.value;
    if (CURP_VALUE && CURP_VALUE.length >= 18) {
      this.buscarChoferNacional(CURP_VALUE);
    }
  }

  /**
   * Busca información de un chofer nacional utilizando su CURP y actualiza el formulario.
   * @param curp CURP del chofer nacional.
   * @returns {Promise<void>}
   */
  async buscarChoferNacional(curp: string): Promise<void> {
    if (!curp) {
      //this.showNotification = true;
      this.alertaNotificacion = {
        tipoNotificacion: TipoNotificacionEnum.ALERTA,
        categoria: CategoriaMensaje.INFORMACION,
        modo: 'action',
        titulo: 'Alert',
        mensaje: 'Favor de ingresar CURP o RFC',
        cerrar: true,
        txtBtnAceptar: 'Aceptar',
        txtBtnCancelar: '',
      };
      return;
    }

        await this.chofer40101Service
          .obtenerTablaDatos<DatosDelChoferNacional>('mock-data-choferes-nacionales.json')
          .pipe(takeUntil(this.destroyed$))
          .subscribe( (response) => {
            if(response?.length === 0) {
              this.alertaNotificacion = {
                tipoNotificacion: TipoNotificacionEnum.ALERTA,
                categoria: CategoriaMensaje.INFORMACION,
                modo: 'action',
                titulo: 'Alert',
                mensaje: 'No se encontró información para el CURP o RFC proporcionado.',
                cerrar: true,
                txtBtnAceptar: 'Aceptar',
                txtBtnCancelar: '',
              };
              return;
            }
            this.updateListsData(response[0]);
            // Rellenar el formulario
            this.formChoferes.patchValue(response[0]);
          });
  }

  /**
   * Actualiza las listas de estados, municipios y colonias según los datos del chofer.
   * @param data Datos del chofer nacional.
   * @returns {Promise<void>}
   */
  private async updateListsData(data: DatosDelChoferNacional): Promise<void> {

    const PAIS_OBJ = this.paisList.find(p => p.descripcion === data.pais);
    const PAIS_ID = PAIS_OBJ ? PAIS_OBJ.id : '';
    // ESTADO
    const ESTADOS = await this.fetchEstadosByPais(PAIS_OBJ || this.paisList[0]);
    const ESTADO_OBJ = ESTADOS.find(e => e.descripcion === data.estado);
    const ESTADO_ID = ESTADO_OBJ ? ESTADO_OBJ.id : '';
    // MUNICIPIO
    let MUNICIPIO_ID = '';
    let COLONIA_ID = '';
    if (ESTADO_OBJ) {
      const MUNICIPIOS = await this.fetchMunicipiosByEstado(ESTADO_OBJ);
      const MUNICIPIO_OBJ = MUNICIPIOS.find(m => m.descripcion === data.municipioAlcaldia);
      MUNICIPIO_ID = MUNICIPIO_OBJ ? String(MUNICIPIO_OBJ.id) : '';
      // COLONIA
      if (MUNICIPIO_OBJ) {
        await this.fetchColoniasByMunicipio(MUNICIPIO_OBJ);
        const COLONIA_OBJ = this.coloniaList.find(c => c.descripcion === data.colonia);
        COLONIA_ID = COLONIA_OBJ ? String(COLONIA_OBJ.id) : '';
      }
    }
    // PAIS DE RESIDENCIA
    const PAIS_RESIDENCIA_OBJ = this.paisList.find(p => p.descripcion === data.paisDeResidencia);
    const PAIS_RESIDENCIA_ID = PAIS_RESIDENCIA_OBJ ? PAIS_RESIDENCIA_OBJ.id : '';

    this.formChoferes.patchValue({
      pais: PAIS_ID,
      estado: ESTADO_ID,
      municipioAlcaldia: MUNICIPIO_ID,
      colonia: COLONIA_ID,
      paisDeResidencia: PAIS_RESIDENCIA_ID
    });
  }

  /**
   * Guarda los datos editados del chofer nacional si el formulario es válido, emite el evento y cierra el modal.
   * Si el formulario es inválido, muestra una notificación de alerta.
   * @returns {void}
   */
  submitted = false;

  guardarFilaEditada(): void {
    this.submitted = true;
    Object.values(this.formChoferes.controls).forEach(control => {
      control.markAsTouched({ onlySelf: true });
      control.updateValueAndValidity();
    });

    if (this.formChoferes.valid) {

      const DATOS = this.formChoferes.getRawValue() as DatosDelChoferNacional;
      // Convertir ID en descripciones para todos los campos seleccionados
      DATOS.pais = this.paisList.find(p => String(p.id) === String(DATOS.pais))?.descripcion || '';
      DATOS.estado = this.estadoList.find(e => String(e.id) === String(DATOS.estado))?.descripcion || '';
      DATOS.municipioAlcaldia = this.municipioList.find(m => String(m.id) === String(DATOS.municipioAlcaldia))?.descripcion || '';
      DATOS.colonia = this.coloniaList.find(c => String(c.id) === String(DATOS.colonia))?.descripcion || '';
      DATOS.paisDeResidencia = this.paisList.find(p => String(p.id) === String(DATOS.paisDeResidencia))?.descripcion || '';

      if (this.isEditando && this.indiceEditando !== null) {
        // Emitir datos y el índice para actualizar
        this.addModalEvent.emit({ datos: DATOS, indice: this.indiceEditando });
      } else {
        // Emitir datos para agregar nuevo
        this.addModalEvent.emit({ datos: DATOS });
      }
      this.isEditando = false;
      this.indiceEditando = null;
      this.cerrarModal();
    } else {
      this.alertaNotificacion = {
        tipoNotificacion: TipoNotificacionEnum.ALERTA,
        categoria: CategoriaMensaje.INFORMACION,
        modo: 'action',
        titulo: 'Alert',
        mensaje: 'Formulario inválido, por favor verifica los campos.',
        cerrar: true,
        txtBtnAceptar: 'Aceptar',
        txtBtnCancelar: '',
      };
    }
  }

  /**
   * Método para iniciar la edición de un registro.
   * @param datos Datos del chofer a editar
   * @param indice Índice del registro en la tabla
   */
  editarRegistro(datos: DatosDelChoferNacional, indice: number): void {
    this.isEditando = true;
    this.indiceEditando = indice;
    this.formChoferes.patchValue(datos);
  }

  /**
   * Verifica si el control del formulario es inválido y ha sido tocado.
   * @param controlName El nombre del control del formulario.
   * @returns {boolean | null} `true` si el control es inválido y tocado, `null` si no existe el control.
   */
  isInvalid(controlName: string): boolean | null {
    const CONTROL = this.formChoferes.get(controlName);
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