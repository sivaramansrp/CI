import { ADUANA_DATA, CLASIFICACION_PRODUCTO_DATA, CLAVE_SCIAN_DATA, DESCRIPCION_SCIAN_DATA, ESPECIFICAR_DATA, ESTADO_DATA, ESTADO_FISICO_DATA, REGIMEN_AL_QUE_DATA, TIPO_PRODUCTO_DATA } from '../../constants/catalogs.enum';
import { Catalogo, CategoriaMensaje, InputFecha, InputRadioComponent, Notificacion, NotificacionesComponent, Pedimento, REGEX_CORREO_ELECTRONICO_EXPORTADOR, TablaSeleccion, TipoNotificacionEnum } from '@libs/shared/data-access-user/src';
import { ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ConsultaioQuery } from '@ng-mf/data-access-user';

import { CONFIGURACION_COLUMNAS_MERCANCIAS, CONFIGURACION_COLUMNAS_SOLI } from '../../constants/column-config.enum';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HACERLOS_RADIO_OPTIONS, NOTA, OPCION_DE_BOTON_DE_RADIO, TEXTOS } from '../../constants/constantes.enum';

import { CrossList,MercanciaCrossList,MercanciasInfo } from '../../models/mercancia.model';
import { FilaData, FilaData2, ListaClave } from '../../models/fila-modal';
import { ReplaySubject, map, takeUntil } from 'rxjs';
import { Solicitud260915State, Solicitud260915Store } from '../../estados/tramites260915.store';
import { CommonModule } from '@angular/common';

import { CatalogoSelectComponent } from '@libs/shared/data-access-user/src/tramites/components/catalogo-select/catalogo-select.component';

import { CrosslistComponent } from '@libs/shared/data-access-user/src/tramites/components/crosslist/crosslist.component';

import { DatosEmpresaComponent } from '../datos-empresa/datos-empresa.component';

import { InputCheckComponent } from '@libs/shared/data-access-user/src';
import { Modal } from 'bootstrap';
import { PermisoSanitarioDispositivosMedicosService } from '../../services/permiso-sanitario-dispositivos-medicos.service';
import { ReactiveFormsModule } from '@angular/forms';
import { Solicitud260915Query } from '../../estados/tramites260915.query';
import { TablaDinamicaComponent } from '@libs/shared/data-access-user/src';
import { TituloComponent } from '@libs/shared/data-access-user/src';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

/**
 * Componente para gestionar los datos de la solicitud.
 */
@Component({
  selector: 'app-datos-de-la-solicitud',
  standalone: true,
  imports: [CommonModule,
    ReactiveFormsModule,
    InputRadioComponent,
    TituloComponent,
    CatalogoSelectComponent,
    TablaDinamicaComponent,
    InputRadioComponent,
    CrosslistComponent,
    InputCheckComponent,
    NotificacionesComponent,
    DatosEmpresaComponent,
    TooltipModule],
  templateUrl: './datos-de-la-solicitud.component.html',
  styleUrls: ['./datos-de-la-solicitud.component.scss'],
})
export class DatosdelasolicitudComponent implements OnInit,OnDestroy {
 
/**
 * Indica qué tabla se está utilizando para eliminar datos.
 * Puede ser 'scian' para la tabla de SCIAN o 'mercancias' para la tabla de mercancías.
 */
eliminarTablaDatos: 'scian' | 'mercancias' = 'scian';

  /**
 * Referencia al componente CrosslistComponent.
 * @type {CrosslistComponent}
 */
@ViewChild(CrosslistComponent) crosslistComponent!: CrosslistComponent;


  /**
   * Almacena el rango de días seleccionados.
   * Utilizado para guardar los días seleccionados en el componente.
   */
  selectRangoDias: string[] = [];
  /**
   * Almacena el rango de días seleccionados para el campo de fecha de fabricación.
   * Utilizado para guardar los días seleccionados en el componente.
   */
  campoDeBotones = [
  {
    /**
     * Nombre del botón para agregar todos los elementos.
     */
    btnNombre: 'Agregar todos',
    /**
     * Clase CSS del botón.
     */
    class: 'btn-default',
    /**
     * Función para agregar todos los elementos.
     *
     */
    funcion: (): void => {
      if (this.crosslistComponent) {
        this.crosslistComponent.agregar('t');
      }
    },
  },
  {
    /**
     * Nombre del botón para agregar la selección actual.
     */
    btnNombre: 'Agregar selección',
    /**
     * Clase CSS del botón.
     */
    class: 'btn-primary',
    /**
     * Función para agregar la selección actual.
     * 
     */
    funcion: (): void => {
      if (this.crosslistComponent) {
        this.crosslistComponent.agregar('');
      }
    },
  },
  {
    /**
     * Nombre del botón para restar la selección actual.
     */
    btnNombre: 'Restar selección',
    /**
     * Clase CSS del botón.
     */
    class: 'btn-primary',
    /**
     * Función para restar la selección actual.
     *
     */

    funcion: (): void => {
      if (this.crosslistComponent) {
        this.crosslistComponent.quitar('');
      }
    },
  },
  {
    /**
     * Nombre del botón para restar todos los elementos.
     */
    btnNombre: 'Restar todos',
    /**
     * Clase CSS del botón.
     */
    class: 'btn-default',
    /**
     * Función para restar todos los elementos.
     * 
     */
    funcion: (): void => {
      if (this.crosslistComponent) {
        this.crosslistComponent.quitar('t');
      }
    },
  },
];
   /** Formulario principal para los datos de la solicitud */
   dataDeLaSolicitudForm!: FormGroup;

   /** Constantes de texto utilizadas en el componente */
   TEXTOS = TEXTOS;

     /** Indica si el formulario está en modo solo lectura */
  esFormularioSoloLectura: boolean = false;

   /** Estado actual de los datos de la solicitud */
   dataDeLaSolicitudState!: Solicitud260915State;
 
   /** Sujeto para manejar la destrucción de observables */
   private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
   /**
   * Indica si el formulario es colapsable.
   * Permite mostrar u ocultar el contenido del formulario.
   */
  colapsable = false;
 
   /** Formulario para la clave SCIAN */
   clavaScianForm!: FormGroup;
 
   /** Indica si se muestra el formulario de clave SCIAN */
   public showClavaScianForm: boolean = false;
 /** Habilita o deshabilita el estado */
 habilitarEstado: boolean = true;

 /** Selección de mercancias */
 hercelosSeleccionados!: string;

 /** Datos seleccionados de mercancias */
 selectedMercanciasDatos: FilaData2[] = [];

 /** Configuración de la tabla de mercancias */
 public mercanciasConfiguracionTabla: MercanciasInfo[] = [];

 /** Lista de claves para la tabla */
 public listaClaveTabla: ListaClave[] = [];

 /** Indica si el país de origen es colapsable */
 paisOrigen = false;
  /** Configuración del crosslist para el país de origen */
  paisOrigenCrossList: CrossList = {} as CrossList;

  /** Configuración del crosslist para el país de procedencia */
  paisProcedencisCrossList: CrossList = {} as CrossList;

  /** Indica si el país de procedencia es colapsable */
  paisProcedencisColapsable = false;

  /** Referencia al modal de alerta */
  @ViewChild('modalAlerta') modalElement!: ElementRef;

  @ViewChild('agreagarClaveScian') agreagarClaveScianElemento!: ElementRef;

/** 
 * Configuración para la notificación actual.
 */
  public nuevaNotificacion: Notificacion | null = null;

  /** 
 * Índice del elemento que se desea eliminar.
 */
  elementoParaEliminar!: number;

  /** 
 * Lista de pedimentos asociados a la solicitud.
 */
  pedimentos: Array<Pedimento> = [];

 /** Configuración para el campo de fecha de fabricación */
 fechaFabricacionDatos: InputFecha = {
  labelNombre: 'Fecha de fabricación',
  required: false,
  habilitado: true,
};
  /**
   * Configuración para el campo de fecha de caducidad.
   * Incluye nombre de etiqueta, estado de requerido y habilitación.
   */
  fechaCaducidad: InputFecha = {
    labelNombre: 'Fecha de Caducidad',
    required: false,
    habilitado: true,
  };
 /** Índice de la fila en edición */
 ediciondeindicedefila: number | null = null;

  /** Indica si el uso específico es colapsable */
  usoEspecifico = false;

  /** Configuración del crosslist para el uso específico */
  usoEspecificoCrossList: CrossList = {} as CrossList;

  /** Índice de la fila seleccionada */
  indiceFilaSeleccionada: number | null = null;

  /** Fecha inicial seleccionada */
  fechaInicialSeleccionada: string = '';

  /** Fecha final seleccionada */
  fechaFinalSeleccionada: string = '';
  
/** Opciones para el botón de radio */
opcionDeBotonDeRadio = OPCION_DE_BOTON_DE_RADIO;


  /** Tipo de selección para las mercancias */
  tipoSeleccionsoliMercancias: TablaSeleccion = TablaSeleccion.CHECKBOX;

  /** Datos de la tabla */
  tableData: FilaData[] = [];

 /** Datos de las mercancías. */
mercanciasData: MercanciasInfo[] = [];

  /** Conjunto de filas seleccionadas */
  filasSeleccionadas: Set<number> = new Set();

  /** Opciones para el botón de radio de hacerlos */
  hacerlosRadioOptions = HACERLOS_RADIO_OPTIONS;

  /** Fila seleccionada */
  SELECTED_ROW: unknown;

  /** Configuración de datos del estado */
  public estadoData = ESTADO_DATA;

  /** Configuración de datos de clave SCIAN */
  public claveScianData = CLAVE_SCIAN_DATA;

  /** Configuración de descripción del SCIAN */
  public descripcionDelScianData = DESCRIPCION_SCIAN_DATA;

  /** Configuración de datos del régimen */
  public regimenalqueData = REGIMEN_AL_QUE_DATA;

  /** Configuración de datos de la aduana */
  public aduanaData = ADUANA_DATA;

  /** Configuración para el campo de selección de clasificación del producto */
  public delProducto = CLASIFICACION_PRODUCTO_DATA;

  /** Configuración para especificar clasificación del producto */
  public especificarData = ESPECIFICAR_DATA;

  /** Configuración para el campo de selección del tipo de producto */
  public tipoProductoData = TIPO_PRODUCTO_DATA;

/** 
 * Datos de configuración para el estado físico de la mercancía.
 */
public estadoFisicoData = ESTADO_FISICO_DATA;

/**
   * Mensaje que indica un requisito obligatorio para acceder a la nota.
   */
  REQUISITO_OBLIGATORIO = NOTA.REQUISITO_OBLIGATORIO_PARA_ACCEDER_NOTA;
  /**
   * Mensaje que indica que se debe capturar información obligatoria.
   */
  DEBE_CAPTURAR = NOTA.DEBE_CAPTURAR;

/**
   * Indica si el diálogo de notificación está habilitado.
   */
  public esHabilitarElDialogo: boolean = false;
  
  /**
   * Notificación que se muestra al usuario.
   */

  /** Constructor del componente 
   * @param consultaioQuery Consulta de estado de solo lectura.*/

  constructor(private fb: FormBuilder, 
    private permisosanitariodisposivos: PermisoSanitarioDispositivosMedicosService,
     private cdr: ChangeDetectorRef,
     private solicitud260915Store: Solicitud260915Store,
    private solicitud260915Query: Solicitud260915Query,
    public consultaioQuery: ConsultaioQuery,
  ) {
    this.consultaioQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyed$),
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
      this.createForm();
      this.createclaveScianForm();
   
  }
    
  }

  /**
   * Crea el formulario y, si está en modo solo lectura, lo deshabilita.
   * De lo contrario, lo habilita para edición.
   */
  guardarDatosFormulario(): void {
    this.createForm();
    this.createclaveScianForm();
    if (this.esFormularioSoloLectura) {
      this.dataDeLaSolicitudForm.disable();
      this.clavaScianForm.disable();
      this.datosDelTramiteRealizar.disable();
    } else {
      this.dataDeLaSolicitudForm.enable();
      this.clavaScianForm.enable();
      this.datosDelTramiteRealizar.enable();
      
      
    }
  }


 /** Configuración de columnas para la tabla de solicitud */
 configuracionColumnasoli = CONFIGURACION_COLUMNAS_SOLI;

 /** Configuración de columnas para la tabla de mercancias */
 mercanciasDatos = CONFIGURACION_COLUMNAS_MERCANCIAS;

/** Inicialización del componente */
  ngOnInit(): void {
    this.inicializarEstadoFormulario();
    this.getEstadosData();
    this.getClaveScianData();
    this.getClaveDescripcionDelData();
    this.getRegimenalqueData();
    this.getAduanaData();
    this.getEspificarData();
    this.getClasificacionDelProductoData();
    this.getTipoProductoData();
    this.getMercanciaCrosslistData();
    this.createclaveScianForm();
    this.getEstadoFisicoData();
    this.getMercanciasDatosData();
  }

 /**
 * Método para crear el formulario de clave SCIAN.
 * Inicializa un formulario reactivo con los campos `claveScian` y `descripcionDelScian`,
 * ambos marcados como requeridos.
 */
  createclaveScianForm(): void {
    this.solicitud260915Query.selectSolicitud260915$
      .pipe(
        takeUntil(this.destroyed$),
        map((seccionState) => {
          this.dataDeLaSolicitudState = seccionState;
        })
      )
      .subscribe();
    this.clavaScianForm = this.fb.group({
      claveScianG: this.fb.group({
        claveScian: ['', Validators.required],
        descripcionDelScian: [{ value: '', disabled: true }, Validators.required]
      }),
    });
   
  }

  /** Configuración del formulario con validaciones para los campos del trámite. */
createForm(): void{
    this.solicitud260915Query.selectSolicitud260915$
      .pipe(
        takeUntil(this.destroyed$),
        map((seccionState) => {
          this.dataDeLaSolicitudState = seccionState;
          if (this.esFormularioSoloLectura && seccionState.tableData) {
            this.tableData = [...seccionState.tableData];
          } else if (seccionState.tableData) {
            this.tableData = [...seccionState.tableData];
          }
        })
      )
      .subscribe();
  this.dataDeLaSolicitudForm = this.fb.group({
      descripcionFraccionArancelaria: [{value: this.dataDeLaSolicitudState?.descripcionFraccionArancelaria, disabled: true}],
      cantidadUMT:[this.dataDeLaSolicitudState?.cantidadUMT, Validators.required],
      umt:[{value: this.dataDeLaSolicitudState?.descripcionFraccionArancelaria, disabled: true}],
      cantidadUMC:[this.dataDeLaSolicitudState?.cantidadUMC, Validators.required],
      umc:[this.dataDeLaSolicitudState?.umc, Validators.required],
      tipoProducto: [this.dataDeLaSolicitudState?.tipoProducto, Validators.required],
      clasificaionProductos: [this.dataDeLaSolicitudState?.clasificaionProductos, Validators.required], 
      especificarProducto: [this.dataDeLaSolicitudState?.especificarProducto, Validators.required],
      nombreProductoEspecifico: [this.dataDeLaSolicitudState?.nombreProductoEspecifico, Validators.required],
      denominacionDistintiva:[this.dataDeLaSolicitudState?.denominacionDistintiva, Validators.required],
      denominacionNombre:[this.dataDeLaSolicitudState?.denominacionNombre, Validators.required],
      estadoFisico:[this.dataDeLaSolicitudState?.estadoFisico, Validators.required],
      presentacionFarmaceutica:[this.dataDeLaSolicitudState?.presentacionFarmaceutica, Validators.required],
      fraccionArancelaria:[this.dataDeLaSolicitudState?.fraccionArancelaria, Validators.required],
      
       datosMercanciaForm: this.fb.group({
        clasificaionProductos: [this.dataDeLaSolicitudState?.clasificaionProductos, Validators.required],
        especificarProducto: [this.dataDeLaSolicitudState?.especificarProducto, Validators.required],
        nombreProductoEspecifico: [this.dataDeLaSolicitudState?.nombreProductoEspecifico, Validators.required],
        denominacionDistintiva: [this.dataDeLaSolicitudState?.denominacionDistintiva, Validators.required],
        denominacionNombre: [this.dataDeLaSolicitudState?.denominacionNombre, Validators.required],
        tipoProducto: [this.dataDeLaSolicitudState?.tipoProducto, Validators.required],
        estadoFisico: [this.dataDeLaSolicitudState?.estadoFisico, Validators.required],
        fraccionArancelaria: [this.dataDeLaSolicitudState?.fraccionArancelaria, Validators.required],
        descripcionFraccionArancelaria: [{
          value: this.dataDeLaSolicitudState?.descripcionFraccionArancelaria, 
          disabled: true
        }, Validators.required],
        cantidadUMT: [this.dataDeLaSolicitudState?.cantidadUMT, Validators.required],
        umt: [{
          value: this.dataDeLaSolicitudState?.umt, 
          disabled: true
        }, Validators.required],
        cantidadUMC: [this.dataDeLaSolicitudState?.cantidadUMC, Validators.required],
        umc: [this.dataDeLaSolicitudState?.umc, Validators.required],
        presentacionFarmaceutica: [this.dataDeLaSolicitudState?.presentacionFarmaceutica, Validators.required]
      }),
      
      datosDelTramiteRealizar: this.fb.group({
      tipoOperacion:[this.dataDeLaSolicitudState?.tipoOperacion],
      justification: [
        { 
          value: this.dataDeLaSolicitudState?.justification, 
          disabled: true 
        }
      ],
      rfcdelResponsableSanitario:[this.dataDeLaSolicitudState?.rfcdelResponsableSanitario],
      denominacion: [this.dataDeLaSolicitudState?.denominacion, Validators.required],
      correoElectronico: [
      this.dataDeLaSolicitudState?.correoElectronico, 
        [
          Validators.required, 
          Validators.pattern(REGEX_CORREO_ELECTRONICO_EXPORTADOR)
        ]
      ],
      codigopostal: [this.dataDeLaSolicitudState?.codigopostal, Validators.required],
      estado: [this.dataDeLaSolicitudState?.estado, Validators.required],
      municipoyalcaldia: [this.dataDeLaSolicitudState?.municipoyalcaldia, Validators.required],
      localidad: [this.dataDeLaSolicitudState?.localidad, Validators.required],
      colonia: [this.dataDeLaSolicitudState?.colonia, Validators.required],
      calle: [this.dataDeLaSolicitudState?.calle, Validators.required],
      lada: [this.dataDeLaSolicitudState?.lada, Validators.required],
      telefono: [this.dataDeLaSolicitudState?.telefono, Validators.required],
      avisoDeFuncionamiento: [this.dataDeLaSolicitudState?.avisoDeFuncionamiento || false, Validators.required],
     
      licenciaSanitaria: [
        { value: this.dataDeLaSolicitudState?.licenciaSanitaria || '', disabled: !this.dataDeLaSolicitudState?.avisoDeFuncionamiento },
        Validators.required,
      ],
      regimenalque: [this.dataDeLaSolicitudState?.regimenalque, Validators.required],
      aduana: [this.dataDeLaSolicitudState?.aduana, Validators.required],
      maniFestos:[this.dataDeLaSolicitudState?.maniFestos, Validators.required],
      LosDatosNotifier: [this.dataDeLaSolicitudState?.LosDatosNotifier],
      rfc: [this.dataDeLaSolicitudState?.rfc, Validators.required],
      legalRazonSocial: [this.dataDeLaSolicitudState?.legalRazonSocial, Validators.required],
      apellidoPaterno: [this.dataDeLaSolicitudState?.apellidoPaterno, Validators.required],
      apellidoMaterno: [this.dataDeLaSolicitudState?.apellidoMaterno,Validators.required],
       
    }),
   
  });

   
}

/**
 * Método para limpiar la notificación actual.
 * Establece el valor de `nuevaNotificacion` a `null` para eliminar cualquier notificación activa.
 */
clearNotificacion(): void {
  this.nuevaNotificacion = null;
}

/**
 * Método para cerrar el modal de agregar mercancía.
 * Busca el elemento del modal en el DOM, lo oculta y limpia cualquier notificación activa.
 */
closeModal(): void {
  const MODAL_ELEMENT = document.getElementById('modalAgregarMercancia');
  if (MODAL_ELEMENT) {
    const MODAL_INSTANCE = new Modal(MODAL_ELEMENT);
    MODAL_INSTANCE.hide();
    this.clearNotificacion(); // Limpia la notificación cuando el modal se cierra programáticamente
  }
}

/**
 * Método actualizado para eliminar un pedimento/mercancía de la lista.
 * @param borrar Indica si se debe proceder con la eliminación.
 */
eliminarPedimento(borrar: boolean): void {
  
  if (borrar && this.filasSeleccionadas && this.filasSeleccionadas.size > 0) {
    const IDS_SELECCIONADOS = Array.from(this.filasSeleccionadas);
    
    if (this.eliminarTablaDatos === 'scian') {
      const ORIGINAL_TABLE_LENGTH = this.tableData.length;
      this.tableData = this.tableData.filter((row) => {
        const ROW_ID = row.id;
        const SHOULD_KEEP = !IDS_SELECCIONADOS.includes(ROW_ID);
        return SHOULD_KEEP;
      });
      
      
      this.solicitud260915Store.setTramite260915State({
        tableData: this.tableData
      });
      
    } else if (this.eliminarTablaDatos === 'mercancias') {
      const ORIGINAL_MERCANCIAS_LENGTH = this.mercanciasData.length;
      this.mercanciasData = this.mercanciasData.filter((row) => {
        const SHOULD_KEEP = !IDS_SELECCIONADOS.includes(row.id || 0);
        return SHOULD_KEEP;
      });
      
    }

    this.filasSeleccionadas.clear();
    
    this.cdr.detectChanges();
  }
  
  this.clearNotificacion();
}
/**
 * Maneja el evento de eliminar mercancías.
 * Verifica si hay filas seleccionadas antes de mostrar el modal de confirmación.
 */
onEliminarMercancias(): void {
  this.eliminarTablaDatos = 'mercancias';
  
  if (!this.filasSeleccionadas || this.filasSeleccionadas.size === 0) {
    this.abrirModal(0, true, false);
  } else {
    this.abrirModal(0, false, false);
  }
}

 /**
 * Método para abrir un modal y configurar la notificación correspondiente.
 * Dependiendo de los parámetros, muestra un mensaje de alerta para seleccionar un establecimiento,
 * notifica que no hay registros seleccionados o confirma la eliminación de registros seleccionados.
 * 
 * @param i Índice del elemento que se desea eliminar (por defecto 0).
 * @param isSeleccionarEstablecimiento Indica si se debe mostrar el mensaje para seleccionar un establecimiento.
 */
 abrirModal(i: number = 0, isNoRowsSelected: boolean = false, isModificarSinSeleccion: boolean = false): void {
if (isNoRowsSelected) {
    this.nuevaNotificacion = {
      tipoNotificacion: 'alert',
      categoria: 'warning',
      modo: 'info',
      titulo: '',
      mensaje: 'Selecciona un registro.',
      cerrar: false,
      tiempoDeEspera: 0,
      txtBtnAceptar: 'Aceptar',
      txtBtnCancelar: '',
      tamanioModal: 'modal-sm',
    };
  } else if (isModificarSinSeleccion) {
    this.nuevaNotificacion = {
      tipoNotificacion: 'alert',
      categoria: 'warning',
      modo: 'info',
      titulo: '',
      mensaje: 'Selecciona sólo un registro para modificar.',
      cerrar: false,
      tiempoDeEspera: 0,
      txtBtnAceptar: 'Aceptar',
      txtBtnCancelar: '',
      tamanioModal: 'modal-sm',
    };
  }else if (this.filasSeleccionadas && this.filasSeleccionadas.size > 0) {
    this.nuevaNotificacion = {
      tipoNotificacion: 'alert',
      categoria: 'danger',
      modo: 'action',
      titulo: '',
      mensaje: '¿Estás seguro que deseas eliminar los registros marcados?',
      cerrar: false,
      tiempoDeEspera: 0,
      txtBtnAceptar: 'Aceptar',
      txtBtnCancelar: 'Cancelar',
    };
  }
  this.elementoParaEliminar = i;
}

  /**
 * Método para obtener los datos del crosslist de mercancías.
 * Realiza una solicitud al servicio `registrarsolicitudmcp` para obtener los datos
 * y actualiza las propiedades `paisOrigenCrossList`, `paisProcedencisCrossList` y `usoEspecificoCrossList`.
 * En caso de error, muestra un mensaje en la consola.
 */
getMercanciaCrosslistData(): void {
  this.permisosanitariodisposivos
    .getMercanciaCrosslistData()
    .pipe(takeUntil(this.destroyed$))
    .subscribe({
      next: (respuesta: MercanciaCrossList[]) => {
        if (respuesta.length > 0) {
          const FIRST_ITEM = respuesta[0];
          this.paisOrigenCrossList = FIRST_ITEM.paisOrigenCrossList;
          this.paisProcedencisCrossList = FIRST_ITEM.paisProcedencisCrossList;
          this.usoEspecificoCrossList = FIRST_ITEM.usoEspecificoCrossList;
        } 
      },
      error: (err) => {
        console.error('Error al obtener los datos de MercanciaCrosslist:', err);
      },
    });
}
  /**
 * Método para alternar el estado colapsable del país de origen.
 * Cambia el valor de `paisOrigen` entre verdadero y falso.
 */
paisOrigenColapsable(): void {
  this.paisOrigen = !this.paisOrigen;
}

/**
* Método para alternar el estado colapsable del país de procedencia.
* Cambia el valor de `paisProcedencisColapsable` entre verdadero y falso.
*/
paisProcedencis_colapsable(): void {
  this.paisProcedencisColapsable = !this.paisProcedencisColapsable;
}

/**
 * Alterna el estado de la propiedad `colapsable` entre verdadero y falso.
 * Cambia el estado del panel colapsable en la interfaz de usuario.
 */
paisDeColapsable(): void{
  this.paisProcedencisColapsable = !this.paisProcedencisColapsable;
}

/**
* Método para alternar el estado colapsable del uso específico.
* Cambia el valor de `usoEspecifico` entre verdadero y falso.
*/
usoEspecificoColapsable(): void {
  this.usoEspecifico = !this.usoEspecifico;
}

   /** Obtiene los datos de los estados */
  getEstadosData(): void {
    this.permisosanitariodisposivos.getEstadosData()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data: Catalogo[]) => {
        this.estadoData.catalogos = data as Catalogo[];
      });
  }
    /** Obtiene los datos de clave SCIAN */
  getClaveScianData(): void {
    this.permisosanitariodisposivos.getClaveScianData()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data) => {
        this.claveScianData.catalogos = data as Catalogo[];
      });
  }

    /** Obtiene los datos de descripción del SCIAN */
  getClaveDescripcionDelData(): void{
    this.permisosanitariodisposivos.getClaveDescripcionDelData()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data) => {
        this.descripcionDelScianData.catalogos = data as Catalogo[];
      });
  }

    /** Obtiene los datos del régimen */
  getRegimenalqueData(): void{
    this.permisosanitariodisposivos.getRegimenalqueData()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data) => {
        this.regimenalqueData.catalogos = data as Catalogo[];
      });
  }

    /** Obtiene los datos de la aduana */
  getAduanaData(): void{
    this.permisosanitariodisposivos.getAduanaData()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data) => {
        this.aduanaData.catalogos = data as Catalogo[];
      });
  }

  /** Obtiene los datos del estado físico desde el servicio y los asigna al catálogo correspondiente. */
  getEstadoFisicoData(): void{
    this.permisosanitariodisposivos.getEstadoFisicoData()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data) => {
        this.estadoFisicoData.catalogos = data as Catalogo[];
      });
  }

  /**
 * Método para habilitar el formulario de datos de la solicitud.
 * Cambia el estado de `habilitarEstado` a falso y habilita todos los campos del formulario.
 */
  aceptar(): void {
    this.dataDeLaSolicitudForm.enable();
    this.dataDeLaSolicitudForm.enable();
    this.habilitarEstado = false;
  }

    /** Obtiene los datos de clasificación del producto */
  getClasificacionDelProductoData(): void{
    this.permisosanitariodisposivos.getClasificacionDelProductoData()
    .pipe(takeUntil(this.destroyed$))
    .subscribe((data) => {
      this.delProducto.catalogos = data as Catalogo[];
    });
  }
    /** Obtiene los datos para especificar clasificación del producto */
  getEspificarData(): void{
    this.permisosanitariodisposivos.getEspificarData()
    .pipe(takeUntil(this.destroyed$))
    .subscribe((data) => {
      this.especificarData.catalogos = data as Catalogo[];
    });
  }

    /** Obtiene los datos del tipo de producto */
  getTipoProductoData(): void{
    this.permisosanitariodisposivos.getTipoProductoData()
    .pipe(takeUntil(this.destroyed$))
    .subscribe((data) => {
      this.tipoProductoData.catalogos = data as Catalogo[];
    });
  }

  /** Muestra el modal de selección de establecimiento */
  seleccionarEstablecimiento(): void {
    this.abrirModal(0,true);
  }

    /** Limpia el formulario de clave SCIAN */
  onLimpiar(): void {
    this.clavaScianForm.reset();
  }


  /**
 * Limpia todos los campos del formulario de datos de mercancía.
 * Restablece el formulario a su estado inicial con valores vacíos.
 */
onLimpiarDatosMercancia(): void {
   this.datosMercanciaForm.reset();
  
  this.indiceFilaSeleccionada = null;
  this.filasSeleccionadas.clear();
  
  this.paisOrigen = false;
  this.paisProcedencisColapsable = false;
  this.usoEspecifico = false;
  
  this.clearNotificacion();
  
  this.cdr.detectChanges();
}
/**
 * Muestra el formulario para agregar una nueva clave SCIAN.
 */  
onAgregar(): void{
    this.showClavaScianForm = true; 
    
  }

  /**
 * Elimina las filas seleccionadas de la tabla.
 * Si no hay filas seleccionadas, muestra un mensaje de advertencia en la consola.
 */
onDelete(): void {
  this.eliminarTablaDatos = 'scian';
  
  if (!this.filasSeleccionadas || this.filasSeleccionadas.size === 0) {
    this.abrirModal(0, true, false);
  } else {
    this.abrirModal(0, false, false);
  }
}
  
    /** Cancela la acción de agregar clave SCIAN */
  onCancelar(): void {
     const MODAL_INSTANCIA = Modal.getInstance(
      this.agreagarClaveScianElemento.nativeElement
    );
    if (MODAL_INSTANCIA) {
      MODAL_INSTANCIA.hide();
    }
    this.clavaScianForm.reset(); 
  }

  /** Agrega una nueva mercancia a la tabla */
  agregarMercanciaGrid(): void {
    if (this.modalElement) {
     const MODAL_INSTANCE = new Modal(this.modalElement.nativeElement);
     MODAL_INSTANCE.show();
   }
 }

  /** Maneja la selección de filas */
  onfilasSeleccionadas(filasSeleccionadas: FilaData[] | MercanciasInfo[]): void {
  
  if (filasSeleccionadas.length > 0) {
    if ('clasificaionProductos' in filasSeleccionadas[0]) {
      const IDS = (filasSeleccionadas as MercanciasInfo[]).map((row) => row.id);
      this.filasSeleccionadas = new Set(IDS);
    }
    else if ('claveScianG' in filasSeleccionadas[0]) {
      const IDS = (filasSeleccionadas as FilaData[]).map((row) => row.id); 
      this.filasSeleccionadas = new Set(IDS);
    }
  } else {
    this.filasSeleccionadas.clear();
  }
}
   /** Maneja el envío del formulario de clave SCIAN. 
 * Busca las descripciones correspondientes en los catálogos y las asigna al formulario.
 * Luego, agrega los datos a la tabla y reinicia el formulario.
 */ 
onSubmit(): void {
  if (this.clavaScianForm.invalid) {
    this.clavaScianForm.markAllAsTouched();
    return;
  }

  const FORM_DATA = { ...this.clavaScianForm.value };
  
  const CLAVE_SCIAN_ITEM = this.claveScianData.catalogos.find(
    (item: Catalogo) => String(item.id) === String(FORM_DATA.claveScianG.claveScian)
  );

  const NEW_ID = this.tableData.length > 0 ? 
    Math.max(...this.tableData.map(item => item.id || 0)) + 1 : 1;

  const NEW_SCIAN_DATA = {
    id: NEW_ID, 
    claveScianG: {
      claveScian: CLAVE_SCIAN_ITEM?.descripcion || FORM_DATA.claveScianG.claveScian,
      descripcionDelScian: FORM_DATA.claveScianG.descripcionDelScian || 'Not Found'
    }
  };


  this.tableData = [...this.tableData, NEW_SCIAN_DATA];
  
  this.solicitud260915Store.setTramite260915State({
    tableData: this.tableData
  });

  this.clavaScianForm.reset();
  this.onCancelar(); 
}

  /** Obtiene el formulario de datos del trámite a realizar */

get datosDelTramiteRealizar(): FormGroup {
  return this.dataDeLaSolicitudForm.get('datosDelTramiteRealizar') as FormGroup;
}

get datosMercanciaForm(): FormGroup {
  return this.dataDeLaSolicitudForm.get('datosMercanciaForm') as FormGroup;
}
/** Alterna el estado del campo de licencia sanitaria en función del aviso de funcionamiento. 
 * Si el aviso de funcionamiento está activado, deshabilita el campo de licencia sanitaria. 
 * De lo contrario, lo habilita.
 */
toggleLicenciaSanitaria(): void {
  const AVISO_DE_FUNCIONAMIENTO = this.dataDeLaSolicitudForm.get('datosDelTramiteRealizar.avisoDeFuncionamiento')?.value;
  const LICENCIA_SANITARIA_CONTROL = this.dataDeLaSolicitudForm.get('datosDelTramiteRealizar.licenciaSanitaria');

  if (AVISO_DE_FUNCIONAMIENTO) {
    LICENCIA_SANITARIA_CONTROL?.disable();
  } else {
    LICENCIA_SANITARIA_CONTROL?.enable();
  }
}
/** Guarda los datos del formulario de la solicitud. */
onSave(): void {
    const FORM_DATA = { ...this.datosMercanciaForm.value };
    
    FORM_DATA.tipoProducto = this.tipoProductoData.catalogos.find(
      (item: Catalogo) => String(item.id) === String(FORM_DATA.tipoProducto)
    )?.descripcion || FORM_DATA.tipoProducto;
  
    FORM_DATA.clasificaionProductos = this.delProducto.catalogos.find(
      (item: Catalogo) => String(item.id) === String(FORM_DATA.clasificaionProductos)
    )?.descripcion || FORM_DATA.clasificaionProductos;
  
    FORM_DATA.especificarProducto = this.especificarData.catalogos.find(
      (item: Catalogo) => String(item.id) === String(FORM_DATA.especificarProducto)
    )?.descripcion || FORM_DATA.especificarProducto;
  
    FORM_DATA.estadoFisico = this.estadoFisicoData.catalogos.find(
      (item: Catalogo) => String(item.id) === String(FORM_DATA.estadoFisico)
    )?.descripcion || FORM_DATA.estadoFisico;

    if (this.indiceFilaSeleccionada !== null) {
      this.mercanciasData = [
        ...this.mercanciasData.slice(0, this.indiceFilaSeleccionada),
        { ...this.mercanciasData[this.indiceFilaSeleccionada], ...FORM_DATA },
        ...this.mercanciasData.slice(this.indiceFilaSeleccionada + 1)
      ];
      this.indiceFilaSeleccionada = null; 
    } else {
      const NEW_ID = this.mercanciasData.length > 0 ? 
        Math.max(...this.mercanciasData.map(item => item.id || 0)) + 1 : 1;
      
      this.mercanciasData = [...this.mercanciasData, {
        ...FORM_DATA,
        id: NEW_ID
      }];
    }
    
    this.datosMercanciaForm.reset();
    this.filasSeleccionadas.clear();
    
    this.cdr.detectChanges();
    this.closeModal();
}

/**
 * Maneja el evento de modificar mercancías.
 * Verifica que haya exactamente una fila seleccionada.
 */
onModificarMercancias(): void {
  if (!this.filasSeleccionadas || this.filasSeleccionadas.size === 0) {
    this.abrirModal(0,false, true);
  } else if (this.filasSeleccionadas.size > 1) {
    this.nuevaNotificacion = {
      tipoNotificacion: 'alert',
      categoria: 'warning',
      modo: 'action',
      titulo: '',
      mensaje: 'Debe seleccionar exactamente un registro para modificar.',
      cerrar: false,
      tiempoDeEspera: 0,
      txtBtnAceptar: 'Aceptar',
      txtBtnCancelar: '',
      tamanioModal: 'modal-sm',
    };
  } else {
    this.onModificar();
  }
}
/** Modifica una fila seleccionada de la tabla de mercancías. 
 * Verifica que solo haya una fila seleccionada. Si la fila existe, 
 * carga sus datos en el formulario y muestra el modal para editarla.
 */
onModificar(): void {
  if (!this.filasSeleccionadas || this.filasSeleccionadas.size !== 1) {
    return;
  }

  const SELECTED_ID = Array.from(this.filasSeleccionadas)[0];
  
  const SELECTED_ROW_INDEX = this.mercanciasData.findIndex((row) => {
    return row.id === SELECTED_ID;
  });

  if (SELECTED_ROW_INDEX === -1) {
    return;
  }

  this.indiceFilaSeleccionada = SELECTED_ROW_INDEX;
  const SELECTED_ROW = this.mercanciasData[SELECTED_ROW_INDEX];

  this.datosMercanciaForm.patchValue({
    clasificaionProductos: this.delProducto.catalogos.find(
      (item) => item.descripcion === SELECTED_ROW.clasificaionProductos
    )?.id || SELECTED_ROW.clasificaionProductos,
    especificarProducto: this.especificarData.catalogos.find(
      (item) => item.descripcion === SELECTED_ROW.especificarProducto
    )?.id || SELECTED_ROW.especificarProducto,
    nombreProductoEspecifico: SELECTED_ROW.nombreProductoEspecifico || '',
    denominacionDistintiva: SELECTED_ROW.denominacionDistintiva || '',
    denominacionNombre: SELECTED_ROW.denominacionNombre || '',
    tipoProducto: this.tipoProductoData.catalogos.find(
      (item) => item.descripcion === SELECTED_ROW.tipoProducto
    )?.id || SELECTED_ROW.tipoProducto,
    estadoFisico: this.estadoFisicoData.catalogos.find(
      (item) => item.descripcion === SELECTED_ROW.estadoFisico
    )?.id || SELECTED_ROW.estadoFisico,
    fraccionArancelaria: SELECTED_ROW.fraccionArancelaria || '',
    descripcionFraccionArancelaria: SELECTED_ROW.descripcionFraccionArancelaria || '',
    cantidadUMT: SELECTED_ROW.cantidadUMT || '',
    umt: SELECTED_ROW.umt || '',
    cantidadUMC: SELECTED_ROW.cantidadUMC || '',
    umc: SELECTED_ROW.umc || '',
    presentacionFarmaceutica: SELECTED_ROW.presentacionFarmaceutica || ''
  });

  const MODAL_ELEMENT = document.getElementById('modalAgregarMercancia');
  if (MODAL_ELEMENT) {
    const MODAL_INSTANCE = new Modal(MODAL_ELEMENT);
    MODAL_INSTANCE.show();
  } else {
    console.error('Modal element not found.');
  }
}
/**
 * Maneja el evento de cambio en el tipo de operación.
 * Si el tipo de operación es "modificación", habilita el campo de justificación.
 * En caso contrario, deshabilita el campo de justificación y lo limpia.
 */
changeEvent(): void{
  const TIPO_OPERACION = this.dataDeLaSolicitudForm.get('datosDelTramiteRealizar.tipoOperacion')?.value;
  const JUSTIFICACION_CONTROL = this.dataDeLaSolicitudForm.get('datosDelTramiteRealizar.justification'); 

  if (TIPO_OPERACION === '0' || TIPO_OPERACION === '1' || TIPO_OPERACION === '2') {
    JUSTIFICACION_CONTROL?.enable(); 
    JUSTIFICACION_CONTROL?.setValidators([Validators.required]);
  } else {
    JUSTIFICACION_CONTROL?.disable(); 
    JUSTIFICACION_CONTROL?.setValue(''); 
    JUSTIFICACION_CONTROL?.clearValidators();
  }
  JUSTIFICACION_CONTROL?.updateValueAndValidity();
}
/**
 * Obtiene los datos de las mercancías desde el servicio.
 * Realiza una solicitud al servicio `PermisoSanitarioDispositivosMedicosService`
 * y actualiza la propiedad `mercanciasData` con los datos obtenidos.
 */
getMercanciasDatosData(): void {
  this.permisosanitariodisposivos.getMercanciasDatosData()
        .pipe(takeUntil(this.destroyed$))
        .subscribe((data) => {
        this.mercanciasData = data as unknown as MercanciasInfo[];
        });
}

  /**
   * Actualiza un valor específico en el store del trámite.
   *
   * @param FormGroup Formulario reactivo del cual se obtiene el valor.
   * @param control Nombre del control cuyo valor se actualizará en el store.
   */
  setValoresStore(FormGroup: FormGroup, control: string): void {
    const VALOR = FormGroup.get(control)?.value;
    this.solicitud260915Store.setTramite260915State({
      [control]: VALOR
    });
  }

  /** Destrucción del componente */
  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
  get isCorreoElectronicoInvalid(): boolean {
  const CORREO_CONTROL = this.dataDeLaSolicitudForm.get('datosDelTramiteRealizar.correoElectronico');
  return Boolean(CORREO_CONTROL?.invalid && (CORREO_CONTROL?.touched || CORREO_CONTROL?.dirty));
  }
 
   /**
   * Abre el cuadro de diálogo modal para el registro de vehículos.
   */
  agregarClaveScian(): void {
    if (this.agreagarClaveScianElemento) {
      const MODAL_INSTANCIA = new Modal(
        this.agreagarClaveScianElemento?.nativeElement,
        { backdrop: false }
      );
      MODAL_INSTANCIA.show();
    }
  }

   /**
   * Envía los datos del formulario y muestra el modal de confirmación.
   * Si el formulario es inválido, marca todos los campos como tocados.
   */
  enviarDialogData(datos?:string): void {
    this.nuevaNotificacion = {
        tipoNotificacion: TipoNotificacionEnum.ALERTA,
        categoria: CategoriaMensaje.ALERTA,
        modo: 'modal',
        titulo: '',
        mensaje: datos ? datos : this.REQUISITO_OBLIGATORIO,
        cerrar: false,
        txtBtnAceptar: 'Aceptar',
        txtBtnCancelar: '',
        tamanioModal: 'modal-md',
      };
  }
    /**
   * Método para cerrar el modal de confirmación.
   * @returns {void}
   */
  cerrarModal(): void {
    this.esHabilitarElDialogo = false;
  }



}