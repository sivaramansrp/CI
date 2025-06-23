import { ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';

import { Catalogo, InputFecha, InputRadioComponent, Notificacion, NotificacionesComponent, Pedimento, TablaSeleccion } from '@libs/shared/data-access-user/src';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { FilaData, FilaData2, ListaClave } from '../../models/fila-modal';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { CatalogoSelectComponent } from '@libs/shared/data-access-user/src';

import { CrosslistComponent } from '@libs/shared/data-access-user/src/tramites/components/crosslist/crosslist.component';

import { InputFechaComponent } from '@libs/shared/data-access-user/src/tramites/components/input-fecha/input-fecha.component';

import { ReplaySubject, map, takeUntil } from 'rxjs';

import { CrossList, MercanciaCrossList } from '../../models/mercancia.model';
import { Modal } from 'bootstrap';

import { RegistrarSolicitudMcpService } from '../../services/registrar-solicitud-mcp.service';

import { Solicitud260702Query } from '../../estados/tramites260702.query';

import { Solicitud260702State, Solicitud260702Store } from '../../estados/tramites260702.store';
import { TablaDinamicaComponent } from '@libs/shared/data-access-user/src';

import { TEXTOS } from '../../constants/constantes.enum';
import { TituloComponent } from '@libs/shared/data-access-user/src';

import { InputCheckComponent } from '@libs/shared/data-access-user/src';

import {
  ADUANA_DATA,
  CLASIFICACION_PRODUCTO_DATA,
  CLAVE_SCIAN_DATA,
  DESCRIPCION_SCIAN_DATA,
  ESPECIFICAR_DATA,
  ESTADO_DATA,
  REGIMEN_AL_QUE_DATA,
  TIPO_PRODUCTO_DATA,
} from '../../constants/catalogs.enum';

import {
  CONFIGURACION_COLUMNAS_LISTA_CLAVE,
  CONFIGURACION_COLUMNAS_MERCANCIAS,
  CONFIGURACION_COLUMNAS_SOLI,
} from '../../constants/column-config.enum';

/**
 * Componente para gestionar los datos de la solicitud.
 */
@Component({
  selector: 'app-datos-de-la-solicitud',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,InputRadioComponent,TituloComponent,CatalogoSelectComponent,TablaDinamicaComponent,InputRadioComponent,InputFechaComponent,CrosslistComponent,InputCheckComponent,NotificacionesComponent],
  templateUrl: './datos-de-la-solicitud.component.html',
  styleUrls: ['./datos-de-la-solicitud.component.scss'],
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
opcionDeBotonDeRadio = [
  { label: 'Prórroga', value: 'prorroga' },
  { label: 'Modificación', value: 'modificacion' },
  { label: 'Modificación y prórroga', value: 'modificacion_prorroga' },
];


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
  selectedRow: unknown;

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

  constructor(private fb: FormBuilder, 
    private registrarsolicitudmcp: RegistrarSolicitudMcpService,
     private cdr: ChangeDetectorRef,
     private solicitud260702Store: Solicitud260702Store,
     private solicitud260702Query: Solicitud260702Query) {}

 /** Configuración de columnas para la tabla de solicitud */
 configuracionColumnasoli = CONFIGURACION_COLUMNAS_SOLI;

 /** Configuración de columnas para la tabla de mercancias */
 mercanciasDatos = CONFIGURACION_COLUMNAS_MERCANCIAS;

 /** Configuración de columnas para la lista de claves */
 listaClave = CONFIGURACION_COLUMNAS_LISTA_CLAVE;


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
    
    this.createForm();
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
 * Método para crear el formulario principal de datos de la solicitud.
 * Inicializa un formulario reactivo con todos los campos necesarios y sus validaciones.
 */
createForm(): void {
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
    const MODAL = new Modal(MODAL_ELEMENT);
    MODAL.hide();
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
          const FIRST_ITEM = respuesta[0];
          this.paisOrigenCrossList = FIRST_ITEM.paisOrigenCrossList;
          this.paisProcedencisCrossList = FIRST_ITEM.paisProcedencisCrossList;
          this.usoEspecificoCrossList = FIRST_ITEM.usoEspecificoCrossList;
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
  getEstadosData():void {
    this.registrarsolicitudmcp.getEstadosData()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data: Catalogo[]) => {
        this.estadoData.catalogos = data as Catalogo[];
      });
  }
    /** Obtiene los datos de clave SCIAN */
  getClaveScianData():void {
    this.registrarsolicitudmcp.getClaveScianData()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data) => {
        this.claveScianData.catalogos = data as Catalogo[];
      });
  }

    /** Obtiene los datos de descripción del SCIAN */
  getClaveDescripcionDelData():void{
    this.registrarsolicitudmcp.getClaveDescripcionDelData()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data) => {
        this.descripcionDelScianData.catalogos = data as Catalogo[];
      });
  }

    /** Obtiene los datos del régimen */
  getRegimenalqueData():void{
    this.registrarsolicitudmcp.getRegimenalqueData()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data) => {
        this.regimenalqueData.catalogos = data as Catalogo[];
      });
  }

    /** Obtiene los datos de la aduana */
  getAduanaData():void{
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

  getMercanciasData():void{
    this.registrarsolicitudmcp.getMercanciasData()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data) => {
        this.mercanciasConfiguracionTabla = data as unknown as FilaData2[];
      });
  }
    /** Obtiene los datos de clasificación del producto */
  getClasificacionDelProductoData():void{
    this.registrarsolicitudmcp.getClasificacionDelProductoData()
    .pipe(takeUntil(this.destroyed$))
    .subscribe((data) => {
      this.delProducto.catalogos = data as Catalogo[];
    });
  }
    /** Obtiene los datos para especificar clasificación del producto */
  getEspificarData():void{
    this.registrarsolicitudmcp.getEspificarData()
    .pipe(takeUntil(this.destroyed$))
    .subscribe((data) => {
      this.especificarData.catalogos = data as Catalogo[];
    });
  }

    /** Obtiene los datos del tipo de producto */
  getTipoProductoData():void{
    this.registrarsolicitudmcp.getTipoProductoData()
    .pipe(takeUntil(this.destroyed$))
    .subscribe((data) => {
      this.tipoProductoData.catalogos = data as Catalogo[];
    });
  }

    /** Obtiene los datos de la lista de claves */

  getListaClaveData():void{
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

  onSubmit():void {
    const FORM_DATA = { ...this.clavaScianForm.value };
    FORM_DATA.claveScianG.claveScian = this.claveScianData.catalogos.find(
      (item: Catalogo) => String(item.id) === String(FORM_DATA.claveScianG.claveScian)
    )?.descripcion || 'Not Found';
  
    FORM_DATA.claveScianG.descripcionDelScian = this.descripcionDelScianData.catalogos.find(
      (item: Catalogo) => String(item.id) === String(FORM_DATA.claveScianG.descripcionDelScian)
    )?.descripcion || 'Not Found';
    this.tableData.push(FORM_DATA);
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
  onEliminar():void{
    if (!this.filasSeleccionadas || this.filasSeleccionadas.size === 0) {
      const MODAL_ELEMENT = document.getElementById('seleccionaRegistroModal');
      if (MODAL_ELEMENT) {
        const MODAL = new Modal(MODAL_ELEMENT);
        MODAL.show();
      }
    } else {
    const MODAL_ELEMENT = document.getElementById('confirmarEliminarModal');
    if (MODAL_ELEMENT) {
      const MODAL = new Modal(MODAL_ELEMENT);
      MODAL.show();
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
  onLimpiar():void {
    this.clavaScianForm.reset();
  }

/**
 * Muestra el formulario para agregar una nueva clave SCIAN.
 */  
onAgregar():void{
    this.showClavaScianForm = true; 
  }

  /**
 * Elimina las filas seleccionadas de la tabla.
 * Si no hay filas seleccionadas, muestra un mensaje de advertencia en la consola.
 */
  onDelete(): void {
    if (!this.filasSeleccionadas || this.filasSeleccionadas.size === 0) {
      console.warn('No rows selected for deletion.');
      return;
    }

    this.tableData = this.tableData.filter((row) => {
      const ROW_ID = row.id || (row.claveScianG && row.claveScianG.claveScian); 
      return !this.filasSeleccionadas.has(Number(ROW_ID));
    });
    this.filasSeleccionadas.clear();
  }
  
    /** Cancela la acción de agregar clave SCIAN */

  onCancelar():void {
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
 /**
 * Maneja el cambio en el campo "Clave de los lotes".
 * Actualiza el valor de la clave en la fila seleccionada de la tabla.
 * 
 * @param event Evento que contiene el valor ingresado en el campo.
 */
 onClaveDeLosLotesChange(event: Event): void {
  const TARGET = event.target as HTMLInputElement; // Cast EventTarget to HTMLInputElement

  if (TARGET && this.ediciondeindicedefila !== null) {
    const VALUE = TARGET.value;

    this.listaClaveTabla[this.ediciondeindicedefila] = {
      ...this.listaClaveTabla[this.ediciondeindicedefila],
      claveDeLosLotes: VALUE,
    };
  } else { /* empty */ }
}
   /** Maneja el cambio de la fecha de fabricación */

   onFechaDeFabricacionChange(value: string | null): void {
    this.dataDeLaSolicitudForm.get('fechaDeFabricacion')?.setValue(value);
    if ( value && this.ediciondeindicedefila !== null) {
      this.listaClaveTabla[this.ediciondeindicedefila] = {
        ...this.listaClaveTabla[this.ediciondeindicedefila],
        fechaDeFabricacion: value,
      };
    }
  }

  /** Maneja el cambio de la fecha de caducidad */

  onFechaDeCaducidadChange(value: string): void {
    this.dataDeLaSolicitudForm.get('fechaDeCaducidad')?.setValue(value);
    if (this.ediciondeindicedefila !== null) {
      this.listaClaveTabla[this.ediciondeindicedefila] = {
        ...this.listaClaveTabla[this.ediciondeindicedefila],
        fechaDeCaducidad: value,
      };
    }
  }
  /** Agrega una nueva fila a la lista de claves */

onAgregarListaClave(): void {
  
  const CLAVE_DE_LOS_LOTES = this.dataDeLaSolicitudForm.get('claveDeLosLotes')?.value;
  const FECHA_DE_FABRICACION = this.dataDeLaSolicitudForm.get('fechaDeFabricacion')?.value;
  const FECHA_DE_CADUCIDAD = this.dataDeLaSolicitudForm.get('fechaDeCaducidad')?.value;
 
  if (!CLAVE_DE_LOS_LOTES && FECHA_DE_FABRICACION && FECHA_DE_CADUCIDAD) {
    console.error('All fields are required to add a row.');
    return;
  }
  const NEW_ROW = {
    id: this.listaClaveTabla.length + 1, 
    claveDeLosLotes: CLAVE_DE_LOS_LOTES,
    fechaDeFabricacion: FECHA_DE_FABRICACION,
    fechaDeCaducidad: FECHA_DE_CADUCIDAD,
  };

  this.listaClaveTabla.push(NEW_ROW);
  this.dataDeLaSolicitudForm.reset();
}

  /** Modifica una fila seleccionada en la lista de claves */

onModificar(): void {

  if (this.filasSeleccionadas.size === 0) {
    return;
  }

  const INDICE_FILA_SELECCIONADA = Array.from(this.filasSeleccionadas)[0];
  const ROW_INDEX = this.listaClaveTabla.findIndex(
    (row) => Number(row.claveDeLosLotes) === INDICE_FILA_SELECCIONADA
  );

  if (ROW_INDEX === -1) {
    return;
  }

  this.ediciondeindicedefila = ROW_INDEX; // Set the index of the row being edited

  const SELECTED_ROW = this.listaClaveTabla[ROW_INDEX];

  this.dataDeLaSolicitudForm.patchValue({
    claveDeLosLotes: SELECTED_ROW.claveDeLosLotes || '',
    fechaDeFabricacion: SELECTED_ROW.fechaDeFabricacion || '',
    fechaDeCaducidad: SELECTED_ROW.fechaDeCaducidad || '',
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
  (this.solicitud260702Store[metodoNombre] as (value: unknown) => void)(VALOR);
}


  /** Destrucción del componente */
  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}
