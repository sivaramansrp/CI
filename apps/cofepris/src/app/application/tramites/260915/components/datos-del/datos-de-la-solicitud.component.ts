import { ADUANA_DATA, CLASIFICACION_PRODUCTO_DATA, CLAVE_SCIAN_DATA, DESCRIPCION_SCIAN_DATA, ESPECIFICAR_DATA, ESTADO_DATA, ESTADO_FISICO_DATA, REGIMEN_AL_QUE_DATA, TIPO_PRODUCTO_DATA } from '../../constants/catalogs.enum';
import { Catalogo, InputFecha, InputRadioComponent, Notificacion, NotificacionesComponent, Pedimento, TablaSeleccion } from '@libs/shared/data-access-user/src';
import { ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ConsultaioQuery } from '@ng-mf/data-access-user';

import { CONFIGURACION_COLUMNAS_MERCANCIAS, CONFIGURACION_COLUMNAS_SOLI } from '../../constants/column-config.enum';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HACERLOS_RADIO_OPTIONS, OPCION_DE_BOTON_DE_RADIO, TEXTOS } from '../../constants/constantes.enum';

import { CrossList,MercanciaCrossList,MercanciasInfo } from '../../models/mercancia.model';
import { FilaData, FilaData2, ListaClave } from '../../models/fila-modal';
import { ReplaySubject, Subject, map, takeUntil } from 'rxjs';
import { Solicitud260915State, Solicitud260915Store } from '../../estados/tramites260915.store';
import { CommonModule } from '@angular/common';

import { CatalogoSelectComponent } from '@libs/shared/data-access-user/src';

import { CrosslistComponent } from '@libs/shared/data-access-user/src/tramites/components/crosslist/crosslist.component';

import { DatosEmpresaComponent } from '../datos-empresa/datos-empresa.component';
import { InputFechaComponent } from '@libs/shared/data-access-user/src/tramites/components/input-fecha/input-fecha.component';

import { InputCheckComponent } from '@libs/shared/data-access-user/src';
import { Modal } from 'bootstrap';
import { PermisoSanitarioDispositivosMedicosService } from '../../services/permiso-sanitario-dispositivos-medicos.service';
import { ReactiveFormsModule } from '@angular/forms';
import { Solicitud260915Query } from '../../estados/tramites260915.query';
import { TablaDinamicaComponent } from '@libs/shared/data-access-user/src';
import { TituloComponent } from '@libs/shared/data-access-user/src';

/**
 * Componente para gestionar los datos de la solicitud.
 */
@Component({
  selector: 'app-datos-de-la-solicitud',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,InputRadioComponent,TituloComponent,CatalogoSelectComponent,TablaDinamicaComponent,InputRadioComponent,InputFechaComponent,CrosslistComponent,InputCheckComponent,NotificacionesComponent,DatosEmpresaComponent],
  templateUrl: './datos-de-la-solicitud.component.html',
  styleUrls: ['./datos-de-la-solicitud.component.scss'],
})
export class DatosdelasolicitudComponent implements OnInit,OnDestroy {
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
        descripcionDelScian: ['', Validators.required]
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
        })
      )
      .subscribe();
  this.dataDeLaSolicitudForm = this.fb.group({
      descripcionFraccionArancelaria: [this.dataDeLaSolicitudState?.descripcionFraccionArancelaria, Validators.required],
      cantidadUMT:[this.dataDeLaSolicitudState?.cantidadUMT, Validators.required],
      umt:[this.dataDeLaSolicitudState?.descripcionFraccionArancelaria, Validators.required],
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
      
      
      datosDelTramiteRealizar: this.fb.group({
      tipoOperacion:[this.dataDeLaSolicitudState?.tipoOperacion],
      justification: [{ value: this.dataDeLaSolicitudState.justification || '', disabled: true }],
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
 * Método para eliminar un pedimento de la lista.
 * @param borrar Indica si se debe proceder con la eliminación del pedimento.
 */
eliminarPedimento(borrar: boolean): void {
  if (borrar) {
    // Filtrar las filas seleccionadas
    this.tableData = this.tableData.filter((row) => {
      const ROW_ID = row.id || (row.claveScianG && row.claveScianG.claveScian);
      return !this.filasSeleccionadas.has(Number(ROW_ID));
    });

    // Borrar la selección y la notificación
    this.filasSeleccionadas.clear();
    this.nuevaNotificacion = null;
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
 abrirModal(i: number = 0,isSeleccionarEstablecimiento: boolean = false): void {
  if(this.filasSeleccionadas && this.filasSeleccionadas.size > 0){
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
  }
} else if(isSeleccionarEstablecimiento){
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
    if (!this.filasSeleccionadas || this.filasSeleccionadas.size === 0) {
      console.warn('No rows selected for deletion.');
      return;
    }
    this.abrirModal();
  }
  
    /** Cancela la acción de agregar clave SCIAN */
  onCancelar(): void {
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

  /** Maneja la selección de filas */
    onfilasSeleccionadas(filasSeleccionadas: FilaData[] | MercanciasInfo[]): void {
      if (filasSeleccionadas.length > 0 && 'clasificaionProductos' in filasSeleccionadas[0]) {
        this.filasSeleccionadas = new Set((filasSeleccionadas as MercanciasInfo[]).map((row) => row.id));
       }
      else if (filasSeleccionadas.length > 0 && 'claveScianG' in filasSeleccionadas[0] && 'claveScian' in filasSeleccionadas[0].claveScianG) {
        this.filasSeleccionadas = new Set((filasSeleccionadas as FilaData[]).map((row) => Number(row.claveScianG.claveScian)));
      } else {
        this.filasSeleccionadas.clear();
      }
    }
    
   /** Maneja el envío del formulario de clave SCIAN. 
 * Busca las descripciones correspondientes en los catálogos y las asigna al formulario.
 * Luego, agrega los datos a la tabla y reinicia el formulario.
 */ 
  onSubmit(): void {
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

  /** Obtiene el formulario de datos del trámite a realizar */

get datosDelTramiteRealizar(): FormGroup {
  return this.dataDeLaSolicitudForm.get('datosDelTramiteRealizar') as FormGroup;
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
    const FORM_DATA = { ...this.dataDeLaSolicitudForm.value };
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
      this.mercanciasData[this.indiceFilaSeleccionada] = { ...this.mercanciasData[this.indiceFilaSeleccionada], ...FORM_DATA };
      this.indiceFilaSeleccionada = null; 
    } else {
      this.mercanciasData.push(FORM_DATA);
    }
    this.dataDeLaSolicitudForm.reset();
  
}
/** Modifica una fila seleccionada de la tabla de mercancías. 
 * Verifica que solo haya una fila seleccionada. Si la fila existe, 
 * carga sus datos en el formulario y muestra el modal para editarla.
 */
onModificar(): void {
  if (!this.filasSeleccionadas || this.filasSeleccionadas.size > 1) {
    return;
  }

  const SELECTED_ID = Array.from(this.filasSeleccionadas)[0];
  const SELECTED_ROW_INDEX = this.mercanciasData.findIndex((row) => row.id === SELECTED_ID);

  if (SELECTED_ROW_INDEX === -1) {
    return;
  }

  this.indiceFilaSeleccionada = SELECTED_ROW_INDEX;
  const SELECTED_ROW = this.mercanciasData[SELECTED_ROW_INDEX];

  // Parche los valores del formulario con la asignación correcta para los campos del catálogo
  this.dataDeLaSolicitudForm.patchValue({
    descripcionFraccionArancelaria: SELECTED_ROW.descripcionFraccion,
    cantidadUMT: SELECTED_ROW.cantidadUMT,
    umt: SELECTED_ROW.unidadUMT,
    cantidadUMC: SELECTED_ROW.cantidadUMC,
    umc: SELECTED_ROW.unidad,
    tipoProducto: this.tipoProductoData.catalogos.find(
      (item) => item.descripcion === SELECTED_ROW.tipoProducto
    )?.id || SELECTED_ROW.tipoProducto,
    clasificaionProductos: this.delProducto.catalogos.find(
      (item) => item.descripcion === SELECTED_ROW.clasificacion
    )?.id || SELECTED_ROW.clasificacion,
    especificarProducto: this.especificarData.catalogos.find(
      (item) => item.descripcion === SELECTED_ROW.especificar
    )?.id || SELECTED_ROW.especificar,
    nombreProductoEspecifico: SELECTED_ROW.denominacionEspecifica,
    denominacionDistintiva: SELECTED_ROW.denominacionDistintiva,
    denominacionNombre: SELECTED_ROW.denominacionComun,
    estadoFisico: this.estadoFisicoData.catalogos.find(
      (item) => item.descripcion === SELECTED_ROW.estadoFisico
    )?.id || SELECTED_ROW.estadoFisico,
    presentacionFarmaceutica: SELECTED_ROW.presentacion,
    fraccionArancelaria: SELECTED_ROW.fraccionArancelaria,
  });

  // mostrar el modal
  const MODAL_ELEMENT = document.getElementById('modalAgregarMercancia');
  if (MODAL_ELEMENT) {
    const MODAL_INSTANCE = new Modal(MODAL_ELEMENT);
    MODAL_INSTANCE.show();
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

      if (TIPO_OPERACION === 'modificacion') {
        JUSTIFICACION_CONTROL?.enable(); 
      } else {
        JUSTIFICACION_CONTROL?.disable(); 
        JUSTIFICACION_CONTROL?.setValue(''); 
      }
    
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
}