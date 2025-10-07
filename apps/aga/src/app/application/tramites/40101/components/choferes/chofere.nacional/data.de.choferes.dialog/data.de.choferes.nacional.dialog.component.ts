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

import { Subject, firstValueFrom, map, takeUntil } from 'rxjs';

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

import { ApiResponseChofer, DatosDelChoferNacional } from '../../../../models/registro-muestras-mercancias.model';
import { Chofer40101Service } from '../../../../estado/chofer40101.service';
import { modificarTerrestreService } from '../../../services/modificacar-terrestre.service';


import { Chofer40101Store, Choferesnacionales40101State } from '../../../../estado/chofer40101.store';
import { Chofer40101Query } from '../../../../estado/chofer40101.query';
// ======================= FIN: NUEVA IMPLEMENTACIÓN CON AKITA =======================

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

  // ======================= INICIO: NUEVA IMPLEMENTACIÓN CON AKITA =======================
  /**
   * Estado del store de Akita para los choferes.
   */
  public choferesState!: Choferesnacionales40101State;
  // ======================= FIN: NUEVA IMPLEMENTACIÓN CON AKITA =======================


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
    private modificacarTerrestreService: modificarTerrestreService,
    // ======================= INICIO: NUEVA IMPLEMENTACIÓN CON AKITA =======================
    private chofer40101Store: Chofer40101Store,
    private chofer40101Query: Chofer40101Query
    // ======================= FIN: NUEVA IMPLEMENTACIÓN CON AKITA =======================
  ) {
    // Lógica para el constructor si es necesario.
  }

  /**
   * Método del ciclo de vida de Angular que se ejecuta al inicializar el componente.
   * Inicializa el formulario y carga las listas de catálogos necesarias.
   * @returns {Promise<void>}
   */
  async ngOnInit(): Promise<void> {
    this.chofer40101Query.selectSeccionState$
      .pipe(
        takeUntil(this.destroyed$),
        map((seccionState) => {
          this.choferesState = seccionState;
        })
      ).subscribe();

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
    // await this.updateListsData(this.datosDeChofere);

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
        this.formChoferes.controls['pais'].setValue("MEX");
        this.chofer40101Store.setPaisChn("MEX");
      }
      this.onPaisChange();
    } catch (error) {
      // Manejo de errores si es necesario
    }
  }

  /**
   * Maneja el cambio de país seleccionado, actualizando la lista de estados y reseteando los campos dependientes.
   * @returns {void}
   */
  onPaisChange(): void {
    const PAISID = this.formChoferes.get('pais')?.value;
    if (!PAISID) { return; }

    this.chofer40101Service.getEstadosPorPaisMex()
      .pipe(takeUntil(this.destroyed$))
      .subscribe(data => {
        this.estadoList = data || [];
        this.formChoferes.controls['estado'].reset();
        this.formChoferes.controls['municipioAlcaldia'].reset();
        this.formChoferes.controls['colonia'].reset();
        this.formChoferes.controls['estado'].setValue(this.estadoList.length > 0 ? this.estadoList[0].clave : '');
        this.chofer40101Store.setEstadoControl(String(this.estadoList.length > 0 ? this.estadoList[0].clave : ''));
        this.onEstadoChange()
      });
  }

  /**
   * Maneja el cambio de estado seleccionado, actualizando la lista de municipios y reseteando los campos dependientes.
   * @returns {void}
   */
  onEstadoChange(): void {
    const ESTADOID = this.formChoferes.get('estado')?.value;
    if (!ESTADOID) { return; }

    this.chofer40101Store.setEstadoControl(String(ESTADOID));

    this.chofer40101Service.getMunicipiosPorEstado(ESTADOID)
      .pipe(takeUntil(this.destroyed$))
      .subscribe(data => {
        this.municipioList = data || [];
        this.formChoferes.controls['colonia'].reset();
        this.formChoferes.controls['municipioAlcaldia'].setValue(this.municipioList.length > 0 ? String(this.municipioList[0].clave) : '');
        this.chofer40101Store.setMunicipioAlcaldia(String(this.municipioList.length > 0 ? this.municipioList[0].clave : ''));
        // this.chofer40101Store.setDelegacionCHN('');
        this.chofer40101Store.setColoniaCHN('');
      });
  }

  /**
   * Maneja el cambio de municipio seleccionado, actualizando la lista de colonias y reseteando el campo colonia.
   * @returns {void}
   */
  onMunicipioChange(): void {
    const MUNICIPIOID = this.formChoferes.get('municipioAlcaldia')?.value;
    if (!MUNICIPIOID) { return; }

    this.chofer40101Store.setDelegacionCHN(String(MUNICIPIOID));

    this.chofer40101Service.getColoniasPorMunicipio(MUNICIPIOID)
      .pipe(takeUntil(this.destroyed$))
      .subscribe(data => {
        this.coloniaList = data || [];
        this.formChoferes.controls['colonia'].reset();
        this.chofer40101Store.setColoniaCHN('');
      });
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
      paisDeResidencia: '',
      ciudad: '',
      localidad: '',
      codigoPostal: '',
      correoElectronico: '',
      telefono: ''
    });
    this.chofer40101Store.reset();
  }

  /**
  * Obtiene la lista de estados por país desde el servicio.
  * @param value País seleccionado.
  * @returns {Promise<Catalogo[]>}
  */
  private async fetchEstadosByPais(): Promise<Catalogo[]> {
    try {
      const DATA = await firstValueFrom(
        this.chofer40101Service
          .getEstadosPorPaisMex()
          .pipe(takeUntil(this.destroyed$))
      );
      this.estadoList = DATA || [];
    } catch (error) {
      console.error('Error al obtener estados por país:', error);
    }
    return this.estadoList;
  }

  /**
   * Actualiza las listas de estados, municipios y colonias según los datos del chofer.
   * @param data Datos del chofer nacional.
   * @returns {Promise<void>}
   */
  private async updateListsData(data: DatosDelChoferNacional): Promise<void> {

    const PAIS_OBJ = this.paisList.find(p => p.clave === data.pais);
    const PAIS_ID = PAIS_OBJ ? PAIS_OBJ.clave : '';
    // ESTADO
    const ESTADOS = await this.fetchEstadosByPais();
    const ESTADO_OBJ = ESTADOS.find(e => e.descripcion === data.estado);
    const ESTADO_ID = ESTADO_OBJ ? ESTADO_OBJ.clave : '';
    // MUNICIPIO
    let MUNICIPIO_ID = '';
    let COLONIA_ID = '';
    if (ESTADO_OBJ) {
      // La siguiente línea fue comentada porque fetchMunicipiosByEstado ya no existe.
      // const MUNICIPIOS = await this.fetchMunicipiosByEstado(ESTADO_OBJ);
      const MUNICIPIOS = await firstValueFrom(this.chofer40101Service.getMunicipiosPorEstado(ESTADO_OBJ.clave as string));
      this.municipioList = MUNICIPIOS || [];
      const MUNICIPIO_OBJ = MUNICIPIOS.find(m => m.descripcion === data.municipioAlcaldia);
      MUNICIPIO_ID = MUNICIPIO_OBJ ? String(MUNICIPIO_OBJ.id) : '';
      // COLONIA
      if (MUNICIPIO_OBJ) {
        // La siguiente línea fue comentada porque fetchColoniasByMunicipio ya no existe.
        // await this.fetchColoniasByMunicipio(MUNICIPIO_OBJ);
        const COLONIAS = await firstValueFrom(this.chofer40101Service.getColoniasPorMunicipio(MUNICIPIO_OBJ.id));
        this.coloniaList = COLONIAS || [];
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
   * Obtener datos para el conductor nacional usando CURP y RFC
   */
  ObtenerDatosConductorNacional(): void {
    const CURP_VALUE = this.formChoferes.get('curp')?.value;
    const RFC_VALUE = this.formChoferes.get('rfc')?.value;
    this.modificacarTerrestreService.buscarChoferNacional(CURP_VALUE, RFC_VALUE).subscribe((data: ApiResponseChofer) => {
      if (data && data.datos) {
        const DATOS = data.datos;
        this.completarFormularioConDatos(DATOS);
      }
    });
  }

  /**
   * Función auxiliar para completar el formulario con datos del chofer.
   * @param DATOS Datos de la respuesta de la API
   */
  private completarFormularioConDatos(DATOS: ApiResponseChofer['datos']): void {
    this.formChoferes.patchValue({
      curp: DATOS.curp || '',
      rfc: DATOS.rfc || '',
      nombre: DATOS.nombre || '',
      primerApellido: DATOS.primer_apellido || '',
      segundoApellido: DATOS.segundo_apellido || '',
      numeroDeGafete: DATOS.numero_de_gafete || '',
      vigenciaGafete: DATOS.vigencia_del_gafete || '',

      // domicilio
      calle: DATOS.domicilio?.calle || '',
      numeroExterior: DATOS.domicilio?.numero_exterior || '',
      numeroInterior: DATOS.domicilio?.numero_interior || '',
      estado: DATOS.domicilio?.estado || '',
      municipioAlcaldia: DATOS.domicilio?.municipio || '',
      colonia: DATOS.domicilio?.colonia || '',
      paisDeResidencia: DATOS.domicilio?.pais || '',
      ciudad: DATOS.domicilio?.localidad || '',
      localidad: DATOS.domicilio?.localidad || '',
      codigoPostal: DATOS.domicilio?.codigo_postal || '',
      telefono: DATOS.domicilio?.telefono || '',
      correoElectronico: DATOS.domicilio?.correo_electronico || '',
    });

    // ======================= INICIO: NUEVA IMPLEMENTACIÓN CON AKITA =======================
    // Actualizar el store con los datos encontrados.
    this.chofer40101Store.update(this.formChoferes.value);
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
    // ======================= INICIO: NUEVA IMPLEMENTACIÓN CON AKITA =======================
    // Al iniciar la edición, actualizar el store con los datos del registro.
    this.chofer40101Store.update(datos);
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

  /**
   * Establece un valor en el store de chofer40101 de forma genérica.
   * Este método se llama desde el HTML en el evento (change) de los campos del formulario.
   * @param {FormGroup} form - El formulario del cual se obtiene el valor.
   * @param {string} campo - El nombre del campo del formulario cuyo valor se va a obtener.
   * @param {string} metodoNombre - El nombre del método en el store que se va a invocar.
   */
  setValoresStore(form: FormGroup, campo: string, metodoNombre: keyof Chofer40101Store): void {
    const VALOR = form.get(campo)?.value;
    // La aserción de tipo es necesaria porque TypeScript no puede verificar dinámicamente
    // que `metodoNombre` corresponde a un método que acepta `VALOR`.
    (this.chofer40101Store[metodoNombre] as (value: unknown) => void)(VALOR);
  }
}