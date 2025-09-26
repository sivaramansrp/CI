import {
  ADMINISTRAR_RESIDUOS,
  EstadoDatoSolicitud,
} from '../../models/datos-solicitud.model';
import {
  CatalogoSelectComponent,
  ConfiguracionColumna,
  InputRadioComponent,
  TablaDinamicaComponent,
  TablaSeleccion,
  TituloComponent,
} from '@libs/shared/data-access-user/src';
import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ConsultaioQuery, ConsultaioState } from '@ng-mf/data-access-user';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  RadioOpcion,
  SolicitudJson,
} from '@libs/shared/data-access-user/src/core/models/231003/solicitud.model';
import { Subject, map, takeUntil } from 'rxjs';
import { AvisoDeReciclajeServiceService } from '../../service/aviso-de-reciclaje-service.service';
import { CommonModule } from '@angular/common';
import { DatoSolicitudQuery } from '../../estados/queries/dato-solicitud.query';
import { DatoSolicitudStore } from '../../estados/tramites/dato-solicitud.store';
import { DatosResiduosPeligrososComponent } from '../datos-residuos-peligrosos/datos-residuos-peligrosos.component';
import { Modal } from 'bootstrap';
import { ResiduoPeligroso } from '../../../231002/models/aviso-catalogo.model';
import rawData from '@libs/shared/theme/assets/json/231003/solicitud.json';

/**
 * Constante que contiene las opciones de radio y demás datos del archivo JSON.
 * Se hace un cast del JSON importado al tipo `SolicitudJson`.
 */
const RADIO_OPCIONES = rawData as SolicitudJson;
/**
 * Componente que representa la sección de datos de la solicitud.
 */
@Component({
  selector: 'app-datos-solicitud',
  standalone: true,
  imports: [
    CommonModule,
    CatalogoSelectComponent,
    TituloComponent,
    ReactiveFormsModule,
    TablaDinamicaComponent,
    InputRadioComponent,
    DatosResiduosPeligrososComponent,
  ],
  templateUrl: './datos-solicitud.component.html',
  styleUrl: './datos-solicitud.component.scss',
})
export class DatosSolicitudComponent implements OnInit, OnDestroy {
  borrarHabilitado: boolean = false;
  residuoSeleccionado: Set<number> = new Set();
  /**
   * Referencia al elemento del DOM del modal para agregar mercancías.
   */
  @ViewChild('modalAgregarMercancias') modalElement!: ElementRef;
  /**
   * Formulario principal de solicitud.
   */
  solicitudForm!: FormGroup;

  /**
   * Formulario con datos de la empresa de reciclaje.
   */
  formularioEmpresaReciclaje!: FormGroup;

  /**
   * Formulario con información del lugar de reciclaje.
   */
  formularioLugarReciclaje!: FormGroup;

  /**
   * Formulario con información de la empresa transportista.
   */
  formularioEmpresaTransportista!: FormGroup;

  /**
   * Formulario con las precauciones de manejo.
   */
  formularioPrecaucionesManejo!: FormGroup;

  /**
   * Opciones de radio generales para el formulario.
   */
  radioOptions: RadioOpcion[] = RADIO_OPCIONES?.radioOptions;

  /**
   * Opciones de radio utilizadas en el formulario para etiquetar residuos.
   */
  public etiquetasForm = RADIO_OPCIONES;

  /**
   * Estado de la consulta actual, utilizado para controlar el modo de solo lectura y otros estados.
   */
  public consultaState!: ConsultaioState;

  /**
   * Subject utilizado para destruir las suscripciones y evitar fugas de memoria.
   */
  private destroy$: Subject<void> = new Subject<void>();

  /**
   * Almacena la configuración de la tabla para el tipo de dato "Administrar".
   * Utiliza la configuración de columnas predefinida de `ADMINISTRAR_RESIDUOS`.
   */
  public configuracionTabla: ConfiguracionColumna<ResiduoPeligroso>[] =
    ADMINISTRAR_RESIDUOS;
  /**
   * Arreglo que contiene la lista de objetos `Administrar` que representan los registros de gestión de residuos
   * asociados a la solicitud actual.
   */
  public administrarResiduos: ResiduoPeligroso[] = [];
  /**
   * Especifica el modo de selección de la tabla como selección por casilla de verificación (checkbox).
   */
  public tablaSeleccionCheckbox: TablaSeleccion = TablaSeleccion.CHECKBOX;
  /**
   * Indica si actualmente hay una fila seleccionada en la tabla.
   * Se utiliza para controlar el comportamiento de la interfaz según el estado de selección de la fila de la tabla.
   */
  public tieneTablaRowSeleccionado: boolean = false;
  /**
   * Constructor del componente. Inyecta el FormBuilder, el store y el query de Akita.
   */
  constructor(
    public fb: FormBuilder,
    private datoSolicitudStore: DatoSolicitudStore,
    private datoSolicitudQuery: DatoSolicitudQuery,
    private consultaQuery: ConsultaioQuery,
    private avisoDeReciclajeSvc: AvisoDeReciclajeServiceService
  ) {
    // Lógica del constructor si se necesita
  }

  /**
   * Método del ciclo de vida que se llama después de que Angular ha inicializado todas las propiedades enlazadas a datos del componente.
   *
   * - Inicializa múltiples formularios relacionados con la solicitud, empresa de reciclaje, lugar de reciclaje, empresa transportista y precauciones de manejo.
   * - Recupera valores almacenados desde el store de gestión de estado para poblar los formularios.
   * - Se suscribe al estado de consulta y actualiza el estado local en consecuencia.
   * - Deshabilita los formularios si el estado de consulta está en modo solo lectura.
   * - Deshabilita controles específicos en el formulario de lugar de reciclaje según su valor.
   * - Invoca el método para obtener los datos de gestión de residuos.
   */
  ngOnInit(): void {
    /**
     * Inicializa el formulario principal de solicitud.
     */
    this.inicializarSolicitudForm();

    /**
     * Inicializa el formulario con los datos de la empresa de reciclaje.
     */
    this.inicializarFormularioEmpresaReciclaje();

    /**
     * Inicializa el formulario con los datos del lugar de reciclaje.
     */
    this.inicializarFormularioLugarReciclaje();

    /**
     * Inicializa el formulario con los datos de la empresa transportista.
     */
    this.inicializarFormularioEmpresaTransportista();

    /**
     * Inicializa el formulario de precauciones de manejo.
     */
    this.inicializarFormularioPrecaucionesManejo();

    /**
     * Recupera valores almacenados en el store para rellenar los formularios.
     */
    this.recuperarValoresDesdeStore();

    this.consultaQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroy$),
        map((seccionState) => {
          this.consultaState = seccionState;
        })
      )
      .subscribe();

    // Si el estado indica actualización, carga los datos del formulario.
    if (this.consultaState.readonly) {
      this.deshabilitarFormularios();
    }

    if (
      this.formularioLugarReciclaje.get('reciclajeInstalaciones')?.value ===
      'Si'
    ) {
      this.formularioLugarReciclaje.get('lugarReciclaje')?.disable();
      this.formularioLugarReciclaje
        .get('numeroAutorizacionEmpresaReciclaje')
        ?.disable();
    }
  }

  /**
   * Inicializa el formulario principal de solicitud con sus respectivos campos y validaciones.
   */
  private inicializarSolicitudForm(): void {
    this.solicitudForm = this.fb.group({
      /** Número de registro ambiental del residuo */
      numeroRegistroAmbiental: ['', Validators.required],

      /** Descripción genérica del residuo */
      descripcionGenerica1: ['', Validators.required],

      /** Número del programa IMMEX asociado */
      numeroProgramaImmex: ['', Validators.required],
    });
  }

  /**
   * Inicializa el formulario con los datos de la empresa de reciclaje,
   * incluyendo campos obligatorios y validaciones.
   */
  private inicializarFormularioEmpresaReciclaje(): void {
    this.formularioEmpresaReciclaje = this.fb.group({
      /** Indica si se requiere empresa de reciclaje (valor por defecto: "Si") */
      requiereEmpresa: ['', Validators.required],

      /** Nombre de la empresa recicladora */
      nombreEmpresa: ['', Validators.required],

      /** Nombre del representante legal */
      representanteLegal: ['', Validators.required],

      /** Teléfono de contacto de la empresa */
      telefono: ['', Validators.required],

      /** Correo electrónico con validación de formato */
      correoElectronico: ['', [Validators.required, Validators.email]],
    });
  }

  /**
   * Inicializa el formulario con los datos de la empresa transportista de residuos,
   * estableciendo validaciones requeridas para cada campo.
   */
  private inicializarFormularioEmpresaTransportista(): void {
    this.formularioEmpresaTransportista = this.fb.group({
      /** Nombre de la empresa que transporta los residuos */
      nombreEmpresaTransportistaResiduos: ['', Validators.required],

      /** Número de autorización otorgado por SEMARNAT */
      numeroAutorizacionSemarnat: ['', Validators.required],
    });
  }

  /**
   * Inicializa el formulario de precauciones de manejo,
   * obligatorio para especificar medidas de seguridad o manejo especial del residuo.
   */
  private inicializarFormularioPrecaucionesManejo(): void {
    this.formularioPrecaucionesManejo = this.fb.group({
      /** Descripción de las precauciones de manejo del residuo */
      precaucionesManejo: ['', Validators.required],
    });
  }

  /**
   * Habilita o deshabilita los campos del formulario de empresa de reciclaje
   * dependiendo del valor seleccionado en el campo "requiereEmpresa".
   *
   * @param valor Valor seleccionado, debe ser "Si" o "No".
   */
  onRequiereEmpresaChange(valor: string): void {
    const DEBE_HABILITAR: boolean = valor === 'Si';

    const CAMPOS_A_CONTROLAR: string[] = [
      'nombreEmpresa',
      'representanteLegal',
      'telefono',
      'correoElectronico',
    ];

    CAMPOS_A_CONTROLAR.forEach((campo: string): void => {
      const CONTROL_CAMPO = this.formularioEmpresaReciclaje.get(campo);
      if (CONTROL_CAMPO) {
        if (DEBE_HABILITAR) {
          CONTROL_CAMPO.enable();
        } else {
          CONTROL_CAMPO.disable();
        }
      }
    });
  }

  /**
   * Inicializa el formulario de lugar de reciclaje con sus respectivos campos y validaciones.
   *
   * Campos:
   * - reciclajeInstalaciones: Indica si el reciclaje se realiza en las instalaciones (valor por defecto: 'Si').
   * - lugarReciclaje: Campo obligatorio para especificar el lugar de reciclaje.
   * - numeroAutorizacionEmpresaReciclaje: Campo obligatorio para registrar el número de autorización de la empresa recicladora.
   */
  private inicializarFormularioLugarReciclaje(): void {
    this.formularioLugarReciclaje = this.fb.group({
      reciclajeInstalaciones: ['Si', Validators.required],
      lugarReciclaje: ['', Validators.required],
      numeroAutorizacionEmpresaReciclaje: ['', Validators.required],
    });
  }

  /**
   * Recupera los valores almacenados en el estado de Akita mediante el query
   * y los aplica a los formularios correspondientes sin emitir eventos.
   *
   * Esto permite repoblar los formularios cuando se recarga el componente
   * o se navega entre pantallas sin perder la información ingresada.
   */
  private recuperarValoresDesdeStore(): void {
    const ESTADO = this.datoSolicitudQuery.getValue();

    this.administrarResiduos = ESTADO.residuos ? [...ESTADO.residuos] : [];

    this.solicitudForm.patchValue(ESTADO.solicitudForm, { emitEvent: false });
    this.formularioEmpresaReciclaje.patchValue(ESTADO.empresaReciclaje, {
      emitEvent: false,
    });
    this.formularioLugarReciclaje.patchValue(ESTADO.lugarReciclaje, {
      emitEvent: false,
    });
    this.formularioEmpresaTransportista.patchValue(
      ESTADO.empresaTransportista,
      { emitEvent: false }
    );
    this.formularioPrecaucionesManejo.patchValue(ESTADO.precaucionesManejo, {
      emitEvent: false,
    });
  }

  /**
   * Actualiza un campo específico del formulario de solicitud en el store.
   *
   * @param campo - Nombre del campo del formulario de solicitud a actualizar.
   */
  actualizarCampoSolicitudForm(
    campo: keyof EstadoDatoSolicitud['solicitudForm']
  ): void {
    const VALOR = this.solicitudForm.get(campo)?.value;
    this.datoSolicitudStore.actualizarSolicitudForm({
      ...this.solicitudForm.getRawValue(),
      [campo]: VALOR,
    });
  }

  /**
   * Actualiza un campo específico del formulario de empresa de reciclaje en el store.
   * Si el campo actualizado es 'requiereEmpresa', se habilitan o deshabilitan dinámicamente
   * los campos relacionados según el valor seleccionado.
   *
   * @param campo - Nombre del campo del formulario de empresa reciclaje a actualizar.
   */
  actualizarCampoEmpresaReciclaje(
    campo: keyof EstadoDatoSolicitud['empresaReciclaje']
  ): void {
    const VALOR = this.formularioEmpresaReciclaje.get(campo)?.value;

    // Si el campo actualizado es 'requiereEmpresa', se evalúa si se deben habilitar o deshabilitar otros campos
    if (campo === 'requiereEmpresa') {
      const DEBE_HABILITAR = VALOR === 'Si';
      const CAMPOS = [
        'nombreEmpresa',
        'representanteLegal',
        'telefono',
        'correoElectronico',
      ];

      CAMPOS.forEach((campoExtra): void => {
        const CONTROL = this.formularioEmpresaReciclaje.get(campoExtra);
        if (CONTROL) {
          if (DEBE_HABILITAR) {
            CONTROL.enable();
          } else {
            CONTROL.disable();
          }
        }
      });
    }

    // Actualiza el estado del formulario de empresa reciclaje en el store
    this.datoSolicitudStore.actualizarEmpresaReciclaje({
      ...this.formularioEmpresaReciclaje.getRawValue(),
      [campo]: VALOR,
    });
  }

  /**
   * Actualiza un campo específico del formulario de lugar de reciclaje en el store.
   * Si el campo actualizado es 'reciclajeInstalaciones', se habilitan o deshabilitan dinámicamente
   * los campos adicionales dependiendo de si se seleccionó "Sí" o "No".
   *
   * @param campo - Nombre del campo del formulario de lugar de reciclaje a actualizar.
   */
  actualizarCampoLugarReciclaje(
    campo: keyof EstadoDatoSolicitud['lugarReciclaje']
  ): void {
    const VALOR = this.formularioLugarReciclaje.get(campo)?.value;

    // Si el campo actualizado es 'reciclajeInstalaciones', controla la habilitación de campos relacionados
    if (campo === 'reciclajeInstalaciones') {
      const DEBE_HABILITAR = VALOR === 'No';
      const CAMPOS_A_CONTROLAR = [
        'lugarReciclaje',
        'numeroAutorizacionEmpresaReciclaje',
      ];

      CAMPOS_A_CONTROLAR.forEach((campoExtra: string): void => {
        const CONTROL = this.formularioLugarReciclaje.get(campoExtra);
        if (CONTROL) {
          if (DEBE_HABILITAR) {
            CONTROL.enable();
          } else {
            CONTROL.disable();
          }
        }
      });
    }

    // Actualiza el estado del formulario de lugar de reciclaje en el store
    this.datoSolicitudStore.actualizarLugarReciclaje({
      ...this.formularioLugarReciclaje.getRawValue(),
      [campo]: VALOR,
    });
  }

  /**
   * Actualiza un campo específico del formulario de empresa transportista en el store.
   *
   * @param campo - Nombre del campo del formulario de empresa transportista a actualizar.
   */
  actualizarCampoEmpresaTransportista(
    campo: keyof EstadoDatoSolicitud['empresaTransportista']
  ): void {
    const VALOR = this.formularioEmpresaTransportista.get(campo)?.value;
    this.datoSolicitudStore.actualizarEmpresaTransportista({
      ...this.formularioEmpresaTransportista.getRawValue(),
      [campo]: VALOR,
    });
  }

  /**
   * Actualiza un campo específico del formulario de precauciones de manejo en el store.
   *
   * @param campo - Nombre del campo del formulario de precauciones de manejo a actualizar.
   */
  actualizarCampoPrecaucionesManejo(
    campo: keyof EstadoDatoSolicitud['precaucionesManejo']
  ): void {
    const VALOR = this.formularioPrecaucionesManejo.get(campo)?.value;
    this.datoSolicitudStore.actualizarPrecaucionesManejo({
      ...this.formularioPrecaucionesManejo.getRawValue(),
      [campo]: VALOR,
    });
  }

  /**
   * Muestra el modal para agregar una operación de importación.
   * Se utiliza el componente de Bootstrap Modal con una referencia al elemento del DOM.
   */
  agregarOperacionImp(): void {
    if (this.modalElement) {
      const MODAL_INSTANCE = new Modal(this.modalElement?.nativeElement);
      MODAL_INSTANCE.show();
    }
  }

  /**
   * Establece el estado de selección de la fila de la tabla.
   * Actualiza la propiedad `tieneTablaRowSeleccionado` según si hay filas seleccionadas.
   *
   * @param rowSeleccion - Un arreglo de objetos `Administrar` que representan las filas seleccionadas.
   */
  onFilasSeleccionadas(filasSeleccionadas: ResiduoPeligroso[]): void {
    // Limpiar selecciones previas
    this.residuoSeleccionado.clear();

    // Agregar nuevas selecciones
    filasSeleccionadas.forEach((materia) => {
      const INDEX = this.administrarResiduos.findIndex(
        (m) => m.id === materia.id
      );
      if (INDEX !== -1) {
        this.residuoSeleccionado.add(INDEX);
      }
    });

    // Actualizar estado del botón borrar
    this.borrarHabilitado = this.residuoSeleccionado.size > 0;
  }

  /**
   * Habilita o deshabilita todos los formularios según el estado de solo lectura.
   * Si el estado es de solo lectura, deshabilita todos los formularios para evitar edición.
   * Si el estado permite edición, habilita todos los formularios.
   */
  deshabilitarFormularios(): void {
    if (this.consultaState?.readonly) {
      // Deshabilita los formularios si el estado es solo lectura
      this.solicitudForm.disable();
      this.formularioEmpresaReciclaje.disable();
      this.formularioLugarReciclaje.disable();
      this.formularioEmpresaTransportista.disable();
      this.formularioPrecaucionesManejo.disable();
    } else {
      // Habilita los formularios si el estado permite edición
      this.solicitudForm.enable();
      this.formularioEmpresaReciclaje.enable();
      this.formularioLugarReciclaje.enable();
      this.formularioEmpresaTransportista.enable();
      this.formularioPrecaucionesManejo.enable();
    }
  }

  /**
   * Obtiene los datos del aviso de reciclaje desde el servicio y los asigna a `administrarResiduos`.
   *
   * Se suscribe al observable `obtenerAvisoDeReciclajeDatos` de `avisoDeReciclajeSvc`,
   * asegurando que la suscripción se limpie correctamente usando `takeUntil(this.destroy$)`.
   * La respuesta se copia profundamente antes de asignarla para evitar problemas de referencia.
   */
  public getAdministrarResiduos(): void {
    this.avisoDeReciclajeSvc
      .obtenerAvisoDeReciclajeDatos()
      .pipe(takeUntil(this.destroy$))
      .subscribe((response) => {
        const API_DATOS = JSON.parse(JSON.stringify(response));
        this.administrarResiduos = API_DATOS;
      });
  }

  borrarResiduo(): void {
    if (this.residuoSeleccionado.size === 0) {
      return;
    }

    // Convertir a array y ordenar de mayor a menor para eliminar correctamente
    const INDICES_A_ELIMINAR = Array.from(this.residuoSeleccionado).sort(
      (a, b) => b - a
    );

    INDICES_A_ELIMINAR.forEach((index) => {
      this.administrarResiduos.splice(index, 1);
    });

    // Limpiar selecciones y actualizar tabla
    this.residuoSeleccionado.clear();
    this.borrarHabilitado = false;
    this.administrarResiduos = [...this.administrarResiduos];
  }

  onResiduoAgregado(residuoData: ResiduoPeligroso): void {
    this.administrarResiduos = [...this.administrarResiduos, residuoData];
    this.datoSolicitudStore.actualizarResiduos(this.administrarResiduos);
  }

  /**
   * Método del ciclo de vida que se llama cuando el componente es destruido.
   * Emite un valor y completa el subject `destroy$` para limpiar suscripciones y evitar fugas de memoria.
   */
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
