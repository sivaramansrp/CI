import { ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Catalogo, CatalogosSelect, ConfiguracionColumna, InputFecha, InputRadioComponent, Notificacion, NotificacionesComponent, Pedimento, TablaSeleccion } from '@libs/shared/data-access-user/src';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FilaData, FilaData2, ListaClave } from '../../models/fila-modal';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CatalogoSelectComponent } from '@libs/shared/data-access-user/src';
import { CrosslistComponent } from '../../../../../../../../../libs/shared/data-access-user/src/tramites/components/crosslist/crosslist.component';
import { FECHAINICIAL, FECHAFINAL } from '../../models/destinatario.model';
import { InputFechaComponent } from '../../../../../../../../../libs/shared/data-access-user/src/tramites/components/input-fecha/input-fecha.component';
import { map, ReplaySubject, takeUntil } from 'rxjs';
import { MercanciaCrossList, CrossList, CrossListLable } from '../../models/mercancia.model';
import { Modal } from 'bootstrap';
import { RadioOpcion } from '../../models/radio.model';
import { RegistrarSolicitudMcpService } from '../../services/registrar-solicitud-mcp.service';
import { RegistrarSolicitudMCPModule } from '../../registrar-solicitud-mcp.module';
import { Solicitud260702Query } from '../../estados/tramites260702.query';
import { Solicitud260702State, Solicitud260702Store } from '../../estados/tramites260702.store';
import { TablaDinamicaComponent } from '@libs/shared/data-access-user/src';
import { TEXTOS } from '../../constants/constantes.enum';
import { TituloComponent } from '@libs/shared/data-access-user/src';
import { InputCheckComponent } from '@libs/shared/data-access-user/src';


/**
 * Componente para gestionar los datos de la solicitud.
 */
@Component({
  selector: 'app-datos-de-la-solicitud',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,InputRadioComponent,TituloComponent,CatalogoSelectComponent,TablaDinamicaComponent,InputRadioComponent,InputFechaComponent,CrosslistComponent,InputCheckComponent,NotificacionesComponent],
  templateUrl: './datos-de-la-solicitud.component.html',
  styleUrls: ['./datos-de-la-solicitud.component.css'],
})
export class DatosdelasolicitudComponent implements OnInit,OnDestroy {
   /** Formulario principal para los datos de la solicitud */
   dataDeLaSolicitudForm!: FormGroup;

   /** Constantes de texto utilizadas en el componente */
   TEXTOS = TEXTOS;
 
   /** Estado actual de los datos de la solicitud */
   dataDeLaSolicitudState!: Solicitud260702State;
 
   /** Sujeto para manejar la destrucción de observables */
   private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
 
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
 public mercanciasConfiguracionTabla: FilaData2[] = [];

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
 edicióndeíndicedefila: number | null = null;

  /** Indica si el uso específico es colapsable */
  usoEspecifico = false;

  /** Configuración del crosslist para el uso específico */
  usoEspecificoCrossList: CrossList = {} as CrossList;

  /** Índice de la fila seleccionada */
  índiceFilaSeleccionada: number | null = null;

  /** Fecha inicial seleccionada */
  fechaInicialSeleccionada: string = '';

  /** Fecha final seleccionada */
  fechaFinalSeleccionada: string = '';
/** Opciones para el botón de radio */
opcionDeBotonDeRadio = [
  { label: 'Prórroga', value: 'prorroga' },
  { label: 'Modificación', value: 'modificacion' },
  { label: 'Modificación y prórroga', value: 'modificacion_prorroga' },
];

/** Configuración de datos del estado */
public estadoData: CatalogosSelect = {
  labelNombre: 'Estado',
  required: true,
  primerOpcion: 'Selecciona un medio de transporte',
  catalogos: [],
};
  /** Configuración de datos de clave SCIAN */
  public claveScianData: CatalogosSelect = {
    labelNombre: 'Cave S.C.I.A.N.*:',
    required: true,
    primerOpcion: 'Selecciona un medio de transporte',
    catalogos: [],
  };

  /** Configuración de descripción del SCIAN */
  public descripcionDelScianData: CatalogosSelect = {
    labelNombre: 'Descripcion del S.C.I.A.N',
    required: true,
    primerOpcion: 'Selecciona un medio de transporte',
    catalogos: [],
  };
  /** Configuración de datos del régimen */
  public regimenalqueData: CatalogosSelect = {
    labelNombre: 'Régimen al que se destinarán la mercancías',
    required: true,
    primerOpcion: 'Selecciona un medio de transporte',
    catalogos: [],
  };

  /** Configuración de datos de la aduana */
  public aduanaData: CatalogosSelect = {
    labelNombre: 'Aduana',
    required: true,
    primerOpcion: 'Selecciona un medio de transporte',
    catalogos: [],
  };
/** 
 * Configuración para el campo de selección de clasificación del producto.
 */
  public delProducto: CatalogosSelect = {
    labelNombre: 'Clasificacion del producto*:',
    required: true,
    primerOpcion: 'Selecciona un medio de transporte',
    catalogos: [],
  };

  /** Configuración para especificar clasificación del producto */
  public especificarData: CatalogosSelect = {
    labelNombre: 'Especificar clasificación del producto:',
    required: true,
    primerOpcion: 'Selecciona un medio de transporte',
    catalogos: [],
  };

  /** 
 * Configuración para el campo de selección del tipo de producto.
 */
  public tipoProductoData: CatalogosSelect = {
    labelNombre: 'Tipo de producto*:',
    required: true,
    primerOpcion: 'Selecciona un medio de transporte',
    catalogos: [],
  };

  /** Tipo de selección para las mercancias */
  tipoSeleccionsoliMercancias: TablaSeleccion = TablaSeleccion.CHECKBOX;

  /** Datos de la tabla */
  tableData: FilaData[] = [];

  /** Conjunto de filas seleccionadas */
  filasSeleccionadas: Set<number> = new Set();

  /** Opciones para el botón de radio de hacerlos */
  hacerlosRadioOptions = [
    { label: 'No', value: 'no' },
    { label: 'Sí', value: 'si' },
  ];

  /** Fila seleccionada */
  selectedRow: any;

  constructor(private fb: FormBuilder, 
    private registrarsolicitudmcp: RegistrarSolicitudMcpService,
     private cdr: ChangeDetectorRef,
     private solicitud260702Store: Solicitud260702Store,
     private solicitud260702Query: Solicitud260702Query) {}

     /** Configuración de columnas para la tabla de solicitud */
  configuracionColumnasoli: ConfiguracionColumna<FilaData>[] = [
    {
      encabezado: 'Clave S.C.I.A.N.',
      clave: (fila) => fila.claveScianG.claveScian,
      orden: 1,
    },
    {
      encabezado: 'Description del S.C.I.A.N',
      clave: (fila) => fila.claveScianG.descripcionDelScian,
      orden: 2,
    },
]

  /** Configuración de columnas para la tabla de mercancias */
mercanciasDatos : ConfiguracionColumna<FilaData2>[] = [
  {
    encabezado: 'Clasificación del producto',
    clave: (fila) => fila.clasificaionProductos,
    orden: 1,
  },
  {
    encabezado: 'Especificar Clasificación del producto',
    clave: (fila) => fila.especificarProducto,
    orden: 2,
  },
  {
    encabezado: 'Denominación específico del producto',
    clave: (fila) => fila.nombreProductoEspecifico,
    orden: 3,
  },
  {
    encabezado: 'Marca',
    clave: (fila) => fila.marca,
    orden: 4,
  },
  {
    encabezado: 'Tipo de producto',
    clave: (fila) => fila.tipoProducto,
    orden: 5,
  },
  {
    encabezado: 'Fracción arancelaria',
    clave: (fila) => fila.fraccionArancelaria,
    orden: 6,
  },
  {
    encabezado: 'Descripción de la fracción arancelaria',
    clave: (fila) => fila.descripcionFraccionArancelaria,
    orden: 7,
  },
  {
    encabezado: 'Unidad de medida de comercialización (UMC)',
    clave: (fila) => fila.umc,
    orden: 8,
  },
  {
    encabezado: 'Cantidad UMC',
    clave: (fila) => fila.cantidadUMC,
    orden: 9,
  },
  {
    encabezado: 'Unidad de medida de tarifa (UMT)',
    clave: (fila) => fila.umt,
    orden: 10,
  },
  {
    encabezado: 'Cantidad UMT',
    clave: (fila) => fila.cantidadUMT,
    orden: 11,
  },
  {
    encabezado: 'País de origen',
    clave: (fila) => fila.paisDeOrigen,
    orden: 12,
  },
  {
    encabezado: 'País de procedencia',
    clave: (fila) => fila.paisDeProcedencia,
    orden: 13,
  },
  
  {
    encabezado: 'Uso específico',
    clave: (fila) => fila.usoEspecifico,
    orden: 14,
  },
];
  /** Configuración de columnas para la lista de claves */

public listaClave: ConfiguracionColumna<ListaClave>[] = [
  {
    encabezado: 'Clave de los lotes',
    clave: (fila) => fila.claveDeLosLotes,
    orden: 1,
  },
  {
    encabezado: 'Fecha de fabricación',
    clave: (fila) => fila.fechaDeFabricacion,
    orden: 2,
  },
  {
    encabezado: 'Fecha de caducidad',
    clave: (fila) => fila.fechaDeCaducidad,
    orden: 3,
  },
];

/** Inicialización del componente */
  ngOnInit(): void {
   this.solicitud260702Query.selectSolicitud$
        .pipe(
          takeUntil(this.destroyed$),
          map((seccionState) => {
            this.dataDeLaSolicitudState = seccionState;
          })
        )
        .subscribe();
    this.dataDeLaSolicitudForm = this.fb.group({
      claveDeLosLotes: [this.dataDeLaSolicitudState?.claveDeLosLotes, Validators.required],
      fechaDeFabricacion: [this.dataDeLaSolicitudState?.fechaDeFabricacion,Validators.required],
      fechaDeCaducidad: [this.dataDeLaSolicitudState?.fechaDeCaducidad,Validators.required],
      descripcionFraccionArancelaria: [this.dataDeLaSolicitudState?.descripcionFraccionArancelaria, Validators.required],
        cantidadUMT:[this.dataDeLaSolicitudState?.cantidadUMT, Validators.required],
        umt:[this.dataDeLaSolicitudState?.descripcionFraccionArancelaria, Validators.required],
        cantidadUMC:[this.dataDeLaSolicitudState?.cantidadUMC, Validators.required],
        umc:[this.dataDeLaSolicitudState?.umc, Validators.required],
        tipoProducto: [this.dataDeLaSolicitudState?.tipoProducto, Validators.required],
        clasificaionProductos: [this.dataDeLaSolicitudState?.clasificaionProductos, Validators.required], 
        especificarProducto: [this.dataDeLaSolicitudState?.especificarProducto, Validators.required],
        nombreProductoEspecifico: [this.dataDeLaSolicitudState?.nombreProductoEspecifico, Validators.required],
        marca:[this.dataDeLaSolicitudState?.marca, Validators.required],
        fraccionArancelaria:[this.dataDeLaSolicitudState?.fraccionArancelaria, Validators.required],
      datosDelTramiteRealizar: this.fb.group({
        justification: [this.dataDeLaSolicitudState?.justification, Validators.required],
        denominacion: [this.dataDeLaSolicitudState?.denominacion, Validators.required],
        correoElectronico: [this.dataDeLaSolicitudState?.correoElectronico, Validators.required],
        codigopostal: [this.dataDeLaSolicitudState?.codigopostal, Validators.required],
        estado: [this.dataDeLaSolicitudState?.estado, Validators.required],
        municipoyalcaldia: [this.dataDeLaSolicitudState?.municipoyalcaldia, Validators.required],
        localidad: [this.dataDeLaSolicitudState?.localidad, Validators.required],
        colonia: [this.dataDeLaSolicitudState?.colonia, Validators.required],
        calle: [this.dataDeLaSolicitudState?.calle, Validators.required],
        lada: [this.dataDeLaSolicitudState?.lada, Validators.required],
        telefono: [this.dataDeLaSolicitudState?.telefono, Validators.required],
        avisoDeFuncionamiento: [this.dataDeLaSolicitudState?.avisoDeFuncionamiento, Validators.required],
        licenciaSanitaria: [this.dataDeLaSolicitudState?.licenciaSanitaria, Validators.required],
        regimenalque: [this.dataDeLaSolicitudState?.regimenalque, Validators.required],
        aduana: [this.dataDeLaSolicitudState?.aduana, Validators.required],
        rfc: [this.dataDeLaSolicitudState?.rfc, Validators.required],
        legalRazonSocial: [this.dataDeLaSolicitudState?.legalRazonSocial, Validators.required],
        apellidoPaterno: [this.dataDeLaSolicitudState?.apellidoPaterno, Validators.required],
        apellidoMaterno: [this.dataDeLaSolicitudState?.apellidoMaterno,Validators.required],
      }),
     
    });
    
    this.getEstadosData();
    this.getClaveScianData();
    this.createclaveScianForm();
    this.getClaveDescripcionDelData();
    this.getRegimenalqueData();
    this.getAduanaData();
    this. getMercanciasData();
    this.getEspificarData();
    this.getClasificacionDelProductoData();
    this.getTipoProductoData();
    this.getListaClaveData();
    this.getMercanciaCrosslistData();
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
  const modalElement = document.getElementById('modalAgregarMercancia');
  if (modalElement) {
    const modal = new Modal(modalElement);
    modal.hide();
    this.clearNotificacion(); // Limpia la notificación cuando el modal se cierra programáticamente
  }
}

/**
 * Método para eliminar un pedimento de la lista.
 * @param borrar Indica si se debe proceder con la eliminación del pedimento.
 */
eliminarPedimento(borrar: boolean): void {
  if (borrar) {
    this.pedimentos.splice(this.elementoParaEliminar, 1);
    this.nuevaNotificacion = null; // Limpia la notificación
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
abrirModal(i: number = 0, isSeleccionarEstablecimiento: boolean = false): void {
  if (isSeleccionarEstablecimiento) {
    // Condición específica para "Seleccionar establecimiento"
    this.nuevaNotificacion = {
      tipoNotificacion: 'alert',
      categoria: 'danger',
      modo: 'action',
      titulo: '',
      mensaje: 'Por el momento no hay comunicación con el Sistema de COFEPRIS, favor de capturar su establecimiento.',
      cerrar: false,
      tiempoDeEspera: 2000,
      txtBtnAceptar: 'Aceptar',
      txtBtnCancelar: 'Cancelar',
    };
  } else if (!this.filasSeleccionadas || this.filasSeleccionadas.size === 0) {
    // No hay filas seleccionadas
    this.nuevaNotificacion = {
      tipoNotificacion: 'alert',
      categoria: 'danger',
      modo: 'action',
      titulo: '',
      mensaje: 'Selecciona un registro',
      cerrar: false,
      tiempoDeEspera: 2000,
      txtBtnAceptar: 'Aceptar',
      txtBtnCancelar: 'Cancelar',
    };
  } else {
    // Hay filas seleccionadas
    this.nuevaNotificacion = {
      tipoNotificacion: 'alert',
      categoria: 'warning',
      modo: 'action',
      titulo: '',
      mensaje: '¿Estás seguro que deseas eliminar los registros marcados?',
      cerrar: false,
      tiempoDeEspera: 2000,
      txtBtnAceptar: 'Aceptar',
      txtBtnCancelar: 'Cancelar',
    };
  }

  this.elementoParaEliminar = i;
}
  
 /**
 * Método para crear el formulario de clave SCIAN.
 * Inicializa un formulario reactivo con los campos `claveScian` y `descripcionDelScian`,
 * ambos marcados como requeridos.
 */
createclaveScianForm(): void {
  this.clavaScianForm = this.fb.group({
    claveScianG: this.fb.group({
      claveScian: ['', Validators.required],
      descripcionDelScian: ['', Validators.required]
    }),
  });
}

  /**
 * Método para obtener los datos del crosslist de mercancías.
 * Realiza una solicitud al servicio `registrarsolicitudmcp` para obtener los datos
 * y actualiza las propiedades `paisOrigenCrossList`, `paisProcedencisCrossList` y `usoEspecificoCrossList`.
 * En caso de error, muestra un mensaje en la consola.
 */
getMercanciaCrosslistData(): void {
  this.registrarsolicitudmcp
    .getMercanciaCrosslistData()
    .pipe(takeUntil(this.destroyed$))
    .subscribe({
      next: (respuesta: MercanciaCrossList[]) => {
        if (respuesta.length > 0) {
          const firstItem = respuesta[0];
          this.paisOrigenCrossList = firstItem.paisOrigenCrossList;
          this.paisProcedencisCrossList = firstItem.paisProcedencisCrossList;
          this.usoEspecificoCrossList = firstItem.usoEspecificoCrossList;
        } else { /* vacío */ }
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
* Método para alternar el estado colapsable del uso específico.
* Cambia el valor de `usoEspecifico` entre verdadero y falso.
*/
usoEspecificoColapsable(): void {
  this.usoEspecifico = !this.usoEspecifico;
}

   /** Obtiene los datos de los estados */
  getEstadosData() {
    this.registrarsolicitudmcp.getEstadosData()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data: Catalogo[]) => {
        this.estadoData.catalogos = data as Catalogo[];
      });
  }
    /** Obtiene los datos de clave SCIAN */
  getClaveScianData() {
    this.registrarsolicitudmcp.getClaveScianData()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data) => {
        this.claveScianData.catalogos = data as Catalogo[];
      });
  }

    /** Obtiene los datos de descripción del SCIAN */
  getClaveDescripcionDelData(){
    this.registrarsolicitudmcp.getClaveDescripcionDelData()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data) => {
        this.descripcionDelScianData.catalogos = data as Catalogo[];
      });
  }

    /** Obtiene los datos del régimen */
  getRegimenalqueData(){
    this.registrarsolicitudmcp.getRegimenalqueData()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data) => {
        this.regimenalqueData.catalogos = data as Catalogo[];
      });
  }

    /** Obtiene los datos de la aduana */
  getAduanaData(){
    this.registrarsolicitudmcp.getAduanaData()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data) => {
        this.aduanaData.catalogos = data as Catalogo[];
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

    /** Obtiene los datos de mercancias */

  getMercanciasData(){
    this.registrarsolicitudmcp.getMercanciasData()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data) => {
        this.mercanciasConfiguracionTabla = data as unknown as FilaData2[];
      });
  }
    /** Obtiene los datos de clasificación del producto */
  getClasificacionDelProductoData(){
    this.registrarsolicitudmcp.getClasificacionDelProductoData()
    .pipe(takeUntil(this.destroyed$))
    .subscribe((data) => {
      this.delProducto.catalogos = data as Catalogo[];
    });
  }
    /** Obtiene los datos para especificar clasificación del producto */
  getEspificarData(){
    this.registrarsolicitudmcp.getEspificarData()
    .pipe(takeUntil(this.destroyed$))
    .subscribe((data) => {
      this.especificarData.catalogos = data as Catalogo[];
    });
  }

    /** Obtiene los datos del tipo de producto */
  getTipoProductoData(){
    this.registrarsolicitudmcp.getTipoProductoData()
    .pipe(takeUntil(this.destroyed$))
    .subscribe((data) => {
      this.tipoProductoData.catalogos = data as Catalogo[];
    });
  }

    /** Obtiene los datos de la lista de claves */

  getListaClaveData(){
    this.registrarsolicitudmcp.getListaClaveData()
    .pipe(takeUntil(this.destroyed$))
    .subscribe((data) => {
      this.listaClaveTabla = data as unknown as ListaClave[];
    });
  }

  /** Muestra el modal de selección de establecimiento */

  seleccionarEstablecimiento(): void {
    this.abrirModal(0, true);
  }
  
    /** Maneja el evento de envío del formulario */

  onSubmit() {
    const formData = { ...this.clavaScianForm.value };
    formData.claveScianG.claveScian = this.claveScianData.catalogos.find(
      (item: Catalogo) => String(item.id) === String(formData.claveScianG.claveScian)
    )?.descripcion || 'Not Found';
  
    formData.claveScianG.descripcionDelScian = this.descripcionDelScianData.catalogos.find(
      (item: Catalogo) => String(item.id) === String(formData.claveScianG.descripcionDelScian)
    )?.descripcion || 'Not Found';
    this.tableData.push(formData);
    this.showClavaScianForm = false;
      this.clavaScianForm.reset(); 
  }
  
    /** Maneja la selección de filas */
  onfilasSeleccionadas(filasSeleccionadas: FilaData[] | ListaClave[]): void {
    if (filasSeleccionadas.length > 0 && 'claveDeLosLotes' in filasSeleccionadas[0]) {
      this.filasSeleccionadas = new Set((filasSeleccionadas as ListaClave[]).map((row) => Number(row.claveDeLosLotes)));
    } else if (filasSeleccionadas.length > 0 && 'id' in filasSeleccionadas[0]) {
      this.filasSeleccionadas = new Set((filasSeleccionadas as FilaData[]).map((row) => Number(row.id)));
    } else if (filasSeleccionadas[0] && 'claveScianG' in filasSeleccionadas[0] && 'claveScian' in filasSeleccionadas[0].claveScianG) {   
      this.filasSeleccionadas = new Set((filasSeleccionadas as FilaData[]).map((row) => Number(row.claveScianG.claveScian)));
    }
    else {
      this.filasSeleccionadas.clear(); 
     }
    }
    /** Elimina las filas seleccionadas */
  onEliminar(){
    if (!this.filasSeleccionadas || this.filasSeleccionadas.size === 0) {
      const modalElement = document.getElementById('seleccionaRegistroModal');
      if (modalElement) {
        const modal = new Modal(modalElement);
        modal.show();
      }
    } else {
    const modalElement = document.getElementById('confirmarEliminarModal');
    if (modalElement) {
      const modal = new Modal(modalElement);
      modal.show();
    }
    }
    this.clavaScianForm.reset(); 
    this.abrirModal();
  }
  
    /** Confirma la eliminación de las filas seleccionadas */
  confirmarEliminar(): void {
    this.listaClaveTabla = this.listaClaveTabla.filter(
      (row) => !this.filasSeleccionadas.has(Number(row.claveDeLosLotes))
    );
      this.filasSeleccionadas.clear(); 
      this.dataDeLaSolicitudForm.reset();
     this.abrirModal();

  }
    /** Limpia el formulario de clave SCIAN */
  onLimpiar() {
    this.clavaScianForm.reset();
  }
    /** Muestra el formulario para agregar clave SCIAN */

  onAgregar(){
    this.showClavaScianForm = true; 
  }
  onDelete(): void {
    if (!this.filasSeleccionadas || this.filasSeleccionadas.size === 0) {
      console.warn('No rows selected for deletion.');
      return;
    }

    this.tableData = this.tableData.filter((row) => {
      const rowId = row.id || (row.claveScianG && row.claveScianG.claveScian); 
      return !this.filasSeleccionadas.has(Number(rowId));
    });
    this.filasSeleccionadas.clear();
  }
  
    /** Cancela la acción de agregar clave SCIAN */

  onCancelar() {
    this.showClavaScianForm = false; 
    this.clavaScianForm.reset(); 
  }
    /** Agrega una nueva mercancia a la tabla */

  agregarMercanciaGrid(): void {
    if (this.modalElement) {
     const MODAL_INSTANCE = new Modal(this.modalElement.nativeElement);
     MODAL_INSTANCE.show();
   }
 }
   /** Maneja el cambio de la fecha de fabricación */

 onFechaDeFabricacionChange(event: any): void {
  this.dataDeLaSolicitudForm.patchValue({ fechaDeFabricacion: event });
}

  /** Maneja el cambio de la fecha de caducidad */

onFechaDeCaducidadChange(event: any): void {
  this.dataDeLaSolicitudForm.patchValue({ fechaDeCaducidad: event });
}

  /** Agrega una nueva fila a la lista de claves */

onAgregarListaClave(): void {
  
  const claveDeLosLotes = this.dataDeLaSolicitudForm.get('claveDeLosLotes')?.value;
  const fechaDeFabricacion = this.dataDeLaSolicitudForm.get('fechaDeFabricacion')?.value;
  const fechaDeCaducidad = this.dataDeLaSolicitudForm.get('fechaDeCaducidad')?.value;
 
  if (!claveDeLosLotes && fechaDeFabricacion && fechaDeCaducidad) {
    console.error('All fields are required to add a row.');
    return;
  }
  const newRow = {
    id: this.listaClaveTabla.length + 1, 
    claveDeLosLotes,
    fechaDeFabricacion,
    fechaDeCaducidad,
  };

  this.listaClaveTabla.push(newRow);

  this.dataDeLaSolicitudForm.reset();
}

  /** Modifica una fila seleccionada en la lista de claves */

onModificar(): void {

  if (this.filasSeleccionadas.size === 0) {
    return;
  }

  const índiceFilaSeleccionada = Array.from(this.filasSeleccionadas)[0];
  const rowIndex = this.listaClaveTabla.findIndex(
    (row) => Number(row.claveDeLosLotes) === índiceFilaSeleccionada
  );

  if (rowIndex === -1) {
    return;
  }

  const selectedRow = this.listaClaveTabla[rowIndex];

  this.dataDeLaSolicitudForm.patchValue({
    claveDeLosLotes: selectedRow.claveDeLosLotes || '',
    fechaDeFabricacion: selectedRow.fechaDeFabricacion || '',
    fechaDeCaducidad: selectedRow.fechaDeCaducidad || '',
  });

  this.dataDeLaSolicitudForm.valueChanges.pipe(takeUntil(this.destroyed$)).subscribe((formData) => {
    this.listaClaveTabla[rowIndex] = {
      ...this.listaClaveTabla[rowIndex],
      claveDeLosLotes: formData.claveDeLosLotes,
      fechaDeFabricacion: formData.fechaDeFabricacion,
      fechaDeCaducidad: formData.fechaDeCaducidad,
    };
  });
  
}
  /** Obtiene el formulario de datos del trámite a realizar */

get datosDelTramiteRealizar(): FormGroup {
  return this.dataDeLaSolicitudForm.get('datosDelTramiteRealizar') as FormGroup;
}
  /** Establece valores en el store */

setValoresStore(
  form: FormGroup,
  campo: string,
  metodoNombre: keyof Solicitud260702Store
): void {
  const VALOR = form.get(campo)?.value;
  (this.solicitud260702Store[metodoNombre] as (value: any) => void)(VALOR);
}


  /** Destrucción del componente */
  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}
