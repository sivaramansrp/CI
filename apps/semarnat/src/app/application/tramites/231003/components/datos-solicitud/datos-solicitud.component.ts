import { Catalogo, CatalogoSelectComponent, InputRadioComponent, TableComponent, TituloComponent } from '@libs/shared/data-access-user/src';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RadioOpcion, SolicitudJson } from '@libs/shared/data-access-user/src/core/models/231003/solicitud.model';
import { Subject, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { DatosResiduosPeligrososComponent } from '../datos-residuos-peligrosos/datos-residuos-peligrosos.component';
import { FormularioReciclajeQuery } from '../../estados/queries/dato-solicitud.query';
import { FormularioReciclajeStore } from '../../estados/tramites/dato-solicitud.store';
import { Modal } from 'bootstrap';
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
  imports: [CommonModule,
    CatalogoSelectComponent,
    TituloComponent,
    ReactiveFormsModule, TableComponent, InputRadioComponent, DatosResiduosPeligrososComponent],
  templateUrl: './datos-solicitud.component.html',
  styleUrl: './datos-solicitud.component.css',
})
export class DatosSolicitudComponent implements OnInit, OnDestroy {

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
   * Catálogo de aduanas disponibles para selección.
   */
  aduanas!: Catalogo[];


  /** 
  * Opciones de radio generales para el formulario.
  */
  radioOptions: RadioOpcion[] = RADIO_OPCIONES?.radioOptions;

  /** 
   * Subject para manejar la destrucción de suscripciones.
   */
  private destruir$ = new Subject<void>();

  /** 
   * Opciones para indicar si se requiere empresa de servicio de reciclaje.
   */
  requiereEmpresaServicioReciclaje: RadioOpcion[] = RADIO_OPCIONES?.requiereEmpresaServicioReciclaje;

  /** 
   * Opciones para indicar si el reciclaje se realiza en las propias instalaciones.
   */
  reciclajeEnInstalaciones: RadioOpcion[] = RADIO_OPCIONES?.reciclajeEnInstalaciones;

  /** 
   * Encabezados de la tabla de establecimiento.
   */
  public establecimientoHeaderData: string[] = [];

  /** 
   * Datos del cuerpo de la tabla de establecimiento.
   */
  public establecimientoBodyData: unknown = [];

  /**
   * Constructor del componente. Inyecta el FormBuilder, el store y el query de Akita.
   */
  constructor(
    public fb: FormBuilder,
    private formularioSolicitudStore: FormularioReciclajeStore,
    private formularioSolicitudQuery: FormularioReciclajeQuery
  ) {
    // Lógica del constructor si se necesita
  }


  ngOnInit(): void {
    /** 
     * Carga el catálogo de aduanas desde las opciones predefinidas.
     */
    this.aduanas = RADIO_OPCIONES?.Immex;

    /** 
     * Establece los encabezados de la tabla del establecimiento.
     */
    this.establecimientoHeaderData = RADIO_OPCIONES?.table[0]?.encabezadoDeTabla || [];

    /** 
     * Establece los datos del cuerpo de la tabla del establecimiento.
     */
    this.establecimientoBodyData = RADIO_OPCIONES?.table[0]?.cuerpoTabla || [];

    /** 
     * Inicializa las opciones del radio button para "requiere empresa de reciclaje".
     */
    this.requiereEmpresaServicioReciclaje = RADIO_OPCIONES?.requiereEmpresaServicioReciclaje;

    /** 
     * Inicializa las opciones del radio button para "reciclaje en instalaciones".
     */
    this.reciclajeEnInstalaciones = RADIO_OPCIONES?.reciclajeEnInstalaciones;

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
     * Suscribe a los cambios del radio "requiere empresa de reciclaje" para habilitar o deshabilitar campos.
     */
    this.suscribirCambioRequiereEmpresa();

    /** 
     * Suscribe a los cambios del radio "reciclaje en instalaciones" para habilitar o deshabilitar campos.
     */
    this.suscribirCambioReciclajeInstalaciones();

    /** 
     * Recupera valores almacenados en el store para rellenar los formularios.
     */
    this.recuperarValoresDesdeStore();

    /** 
     * Se suscribe a los cambios de todos los formularios para actualizar el estado en el store.
     */
    this.suscribirseACambiosDeFormulario();
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
      requiereEmpresa: ['Si', Validators.required],

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
      numeroAutorizacionSemarnat: ['', Validators.required]
    });
  }

  /** 
   * Inicializa el formulario de precauciones de manejo,
   * obligatorio para especificar medidas de seguridad o manejo especial del residuo.
   */
  private inicializarFormularioPrecaucionesManejo(): void {
    this.formularioPrecaucionesManejo = this.fb.group({
      /** Descripción de las precauciones de manejo del residuo */
      precaucionesManejo: ['', Validators.required]
    });
  }


/**
 * Se suscribe a los cambios del campo 'requiereEmpresa' en el formulario de empresa reciclaje.
 * Habilita o deshabilita los campos relacionados con los datos de la empresa
 * según si se requiere o no una empresa de reciclaje.
 */
private suscribirCambioRequiereEmpresa(): void {
  /** Nombre del campo que controla si se requiere una empresa de reciclaje */
  const CAMPO_REQUIERE_EMPRESA: string = 'requiereEmpresa';

  /** Lista de campos que se deben habilitar o deshabilitar según el valor del campo principal */
  const CAMPOS_A_CONTROLAR: string[] = [
    'nombreEmpresa',
    'representanteLegal',
    'telefono',
    'correoElectronico'
  ];

  /** Control del campo 'requiereEmpresa' */
  const CONTROL_REQUIERE_EMPRESA: FormControl<string> =
    this.formularioEmpresaReciclaje.get(CAMPO_REQUIERE_EMPRESA) as FormControl<string>;

  CONTROL_REQUIERE_EMPRESA.valueChanges.subscribe((valor: string): void => {
    /** Determina si los campos deben estar habilitados */
    const DEBE_HABILITAR: boolean = valor === 'Si';

    /** Habilita o deshabilita los campos según el valor seleccionado */
    CAMPOS_A_CONTROLAR.forEach((CAMPO: string): void => {
      const CONTROL_CAMPO: FormControl<string> =
        this.formularioEmpresaReciclaje.get(CAMPO) as FormControl<string>;
      if (CONTROL_CAMPO) {
        if (DEBE_HABILITAR) {
          CONTROL_CAMPO.enable();
        } else {
          CONTROL_CAMPO.disable();
        }
      }
    });
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
 * Se suscribe a los cambios del campo "reciclajeInstalaciones" en el formulario de lugar de reciclaje.
 * 
 * Si el valor es 'Si', se habilitan los campos:
 * - lugarReciclaje
 * - numeroAutorizacionEmpresaReciclaje
 * 
 * Si el valor es diferente, se deshabilitan dichos campos.
 */
private suscribirCambioReciclajeInstalaciones(): void {
  const CAMPO_RADIO: string = 'reciclajeInstalaciones';
  const CAMPOS_A_CONTROLAR: string[] = [
    'lugarReciclaje',
    'numeroAutorizacionEmpresaReciclaje'
  ];

  this.formularioLugarReciclaje.get(CAMPO_RADIO)?.valueChanges.subscribe((valor: string): void => {
    const DEBE_HABILITAR: boolean = valor === 'Si';

    CAMPOS_A_CONTROLAR.forEach((campo: string): void => {
      const CONTROL_CAMPO: FormControl<string> = this.formularioLugarReciclaje.get(campo) as FormControl<string>;
      if (DEBE_HABILITAR) {
        CONTROL_CAMPO.enable();
      } else {
        CONTROL_CAMPO.disable();
      }
    });
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
  const ESTADO = this.formularioSolicitudQuery.getValue();

  this.solicitudForm.patchValue(ESTADO.solicitudForm, { emitEvent: false });
  this.formularioEmpresaReciclaje.patchValue(ESTADO.empresaReciclaje, { emitEvent: false });
  this.formularioLugarReciclaje.patchValue(ESTADO.lugarReciclaje, { emitEvent: false });
  this.formularioEmpresaTransportista.patchValue(ESTADO.empresaTransportista, { emitEvent: false });
  this.formularioPrecaucionesManejo.patchValue(ESTADO.precaucionesManejo, { emitEvent: false });
}


/**
 * Se suscribe a los cambios de valor en cada uno de los formularios,
 * y actualiza el estado correspondiente en el store de Akita.
 * 
 * Se utiliza `takeUntil(this.destruir$)` para evitar fugas de memoria 
 * y limpiar las suscripciones cuando el componente se destruye.
 */
private suscribirseACambiosDeFormulario(): void {
  // Actualiza el estado cuando cambian los valores del formulario principal de solicitud
  this.solicitudForm.valueChanges
    .pipe(takeUntil(this.destruir$))
    .subscribe(valor => this.formularioSolicitudStore.actualizarSolicitudForm(valor));

  // Actualiza el estado cuando cambian los valores del formulario de empresa recicladora
  this.formularioEmpresaReciclaje.valueChanges
    .pipe(takeUntil(this.destruir$))
    .subscribe(valor => this.formularioSolicitudStore.actualizarEmpresaReciclaje(valor));

  // Actualiza el estado cuando cambian los valores del formulario de lugar de reciclaje
  this.formularioLugarReciclaje.valueChanges
    .pipe(takeUntil(this.destruir$))
    .subscribe(valor => this.formularioSolicitudStore.actualizarLugarReciclaje(valor));

  // Actualiza el estado cuando cambian los valores del formulario de empresa transportista
  this.formularioEmpresaTransportista.valueChanges
    .pipe(takeUntil(this.destruir$))
    .subscribe(valor => this.formularioSolicitudStore.actualizarEmpresaTransportista(valor));

  // Actualiza el estado cuando cambian los valores del formulario de precauciones de manejo
  this.formularioPrecaucionesManejo.valueChanges
    .pipe(takeUntil(this.destruir$))
    .subscribe(valor => this.formularioSolicitudStore.actualizarPrecaucionesManejo(valor));
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
 * Método del ciclo de vida de Angular que se ejecuta al destruir el componente.
 * Se utiliza para completar el observable `destruir$` y evitar fugas de memoria.
 */
ngOnDestroy(): void {
  this.destruir$.next();
  this.destruir$.complete();
}

}
