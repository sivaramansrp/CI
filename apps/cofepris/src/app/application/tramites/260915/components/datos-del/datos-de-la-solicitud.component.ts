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

import { Solicitud260915Query } from '../../estados/tramites260915.query';
import { Solicitud260915State, Solicitud260915Store } from '../../estados/tramites260915.store';
import { TablaDinamicaComponent } from '@libs/shared/data-access-user/src';
import { TEXTOS } from '../../constants/constantes.enum';
import { TituloComponent } from '@libs/shared/data-access-user/src';
import { InputCheckComponent } from '@libs/shared/data-access-user/src';
import {
  ESTADO_DATA,
  CLAVE_SCIAN_DATA,
  DESCRIPCION_SCIAN_DATA,
  REGIMEN_AL_QUE_DATA,
  ADUANA_DATA,
  CLASIFICACION_PRODUCTO_DATA,
  ESPECIFICAR_DATA,
  TIPO_PRODUCTO_DATA,
  ESTADO_FISICO_DATA,
} from '../../constants/catalogs.enum';
import {
  CONFIGURACION_COLUMNAS_SOLI,
  CONFIGURACION_COLUMNAS_MERCANCIAS

} from '../../constants/column-config.enum';
import { PermisoSanitarioDispositivosMedicosService } from '../../services/permiso-sanitario-dispositivos-medicos.service';
import { DatosEmpresaComponent } from '../datos-empresa/datos-empresa.component';

/**
 * Componente para gestionar los datos de la solicitud.
 */
@Component({
  selector: 'app-datos-de-la-solicitud',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,InputRadioComponent,TituloComponent,CatalogoSelectComponent,TablaDinamicaComponent,InputRadioComponent,InputFechaComponent,CrosslistComponent,InputCheckComponent,NotificacionesComponent,DatosEmpresaComponent],
  templateUrl: './datos-de-la-solicitud.component.html',
  styleUrls: ['./datos-de-la-solicitud.component.css'],
})
export class DatosdelasolicitudComponent implements OnInit,OnDestroy {
   /** Formulario principal para los datos de la solicitud */
   dataDeLaSolicitudForm!: FormGroup;

   /** Constantes de texto utilizadas en el componente */
   TEXTOS = TEXTOS;
 
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

  mercanciasData: FilaData2[] = [];

  /** Conjunto de filas seleccionadas */
  filasSeleccionadas: Set<number> = new Set();

  /** Opciones para el botón de radio de hacerlos */
  hacerlosRadioOptions = [
    { label: 'No', value: 'no' },
    { label: 'Sí', value: 'si' },
  ];



  /** Fila seleccionada */
  selectedRow: any;

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

  public estadoFisicoData = ESTADO_FISICO_DATA;

  constructor(private fb: FormBuilder, 
    private permisosanitariodisposivos: PermisoSanitarioDispositivosMedicosService,
     private cdr: ChangeDetectorRef,
     private solicitud260915Store: Solicitud260915Store,
    private solicitud260915Query: Solicitud260915Query) {}

 /** Configuración de columnas para la tabla de solicitud */
 configuracionColumnasoli = CONFIGURACION_COLUMNAS_SOLI;

 /** Configuración de columnas para la tabla de mercancias */
 mercanciasDatos = CONFIGURACION_COLUMNAS_MERCANCIAS;

/** Inicialización del componente */
  ngOnInit(): void {
   this.solicitud260915Query.selectSolicitud$
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
    this.getClaveDescripcionDelData();
    this.getRegimenalqueData();
    this.getAduanaData();
    this.getEspificarData();
    this.getClasificacionDelProductoData();
    this.getTipoProductoData();
    this.getMercanciaCrosslistData();
    this.createclaveScianForm();
    this.getEstadoFisicoData();
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
createForm(){
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
      avisoDeFuncionamiento: [this.dataDeLaSolicitudState?.avisoDeFuncionamiento || false, Validators.required],
      licenciaSanitaria: [
        { value: this.dataDeLaSolicitudState?.licenciaSanitaria || '', disabled: !this.dataDeLaSolicitudState?.avisoDeFuncionamiento },
        Validators.required,
      ],
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
    // Filter out the selected rows
    this.tableData = this.tableData.filter((row) => {
      const rowId = row.id || (row.claveScianG && row.claveScianG.claveScian);
      return !this.filasSeleccionadas.has(Number(rowId));
    });

    // Clear the selection and notification
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
 abrirModal(i: number = 0): void {
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
    this.permisosanitariodisposivos.getEstadosData()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data: Catalogo[]) => {
        this.estadoData.catalogos = data as Catalogo[];
      });
  }
    /** Obtiene los datos de clave SCIAN */
  getClaveScianData() {
    this.permisosanitariodisposivos.getClaveScianData()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data) => {
        this.claveScianData.catalogos = data as Catalogo[];
      });
  }

    /** Obtiene los datos de descripción del SCIAN */
  getClaveDescripcionDelData(){
    this.permisosanitariodisposivos.getClaveDescripcionDelData()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data) => {
        this.descripcionDelScianData.catalogos = data as Catalogo[];
      });
  }

    /** Obtiene los datos del régimen */
  getRegimenalqueData(){
    this.permisosanitariodisposivos.getRegimenalqueData()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data) => {
        this.regimenalqueData.catalogos = data as Catalogo[];
      });
  }

    /** Obtiene los datos de la aduana */
  getAduanaData(){
    this.permisosanitariodisposivos.getAduanaData()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data) => {
        this.aduanaData.catalogos = data as Catalogo[];
      });
  }
  getEstadoFisicoData(){
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
  getClasificacionDelProductoData(){
    this.permisosanitariodisposivos.getClasificacionDelProductoData()
    .pipe(takeUntil(this.destroyed$))
    .subscribe((data) => {
      this.delProducto.catalogos = data as Catalogo[];
    });
  }
    /** Obtiene los datos para especificar clasificación del producto */
  getEspificarData(){
    this.permisosanitariodisposivos.getEspificarData()
    .pipe(takeUntil(this.destroyed$))
    .subscribe((data) => {
      this.especificarData.catalogos = data as Catalogo[];
    });
  }

    /** Obtiene los datos del tipo de producto */
  getTipoProductoData(){
    this.permisosanitariodisposivos.getTipoProductoData()
    .pipe(takeUntil(this.destroyed$))
    .subscribe((data) => {
      this.tipoProductoData.catalogos = data as Catalogo[];
    });
  }


  /** Muestra el modal de selección de establecimiento */

  seleccionarEstablecimiento(): void {
    this.abrirModal();
  }

    /** Limpia el formulario de clave SCIAN */
  onLimpiar() {
    this.clavaScianForm.reset();
  }

/**
 * Muestra el formulario para agregar una nueva clave SCIAN.
 */  
onAgregar(){
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
 

    /** Maneja la selección de filas */
    onfilasSeleccionadas(filasSeleccionadas: FilaData[] | FilaData2[]): void {
      console.log('onfilasSeleccionadas triggered with:', filasSeleccionadas);
    
      if (filasSeleccionadas.length > 0 && 'id' in filasSeleccionadas[0]) {
        this.filasSeleccionadas = new Set(filasSeleccionadas.map((row) => Number(row.id)));
      } else if (filasSeleccionadas.length > 0 && 'claveScianG' in filasSeleccionadas[0] && 'claveScian' in filasSeleccionadas[0].claveScianG) {
        this.filasSeleccionadas = new Set((filasSeleccionadas as FilaData[]).map((row) => Number(row.claveScianG.claveScian)));
      } else {
        this.filasSeleccionadas.clear();
      }
    
      console.log('Updated selected rows set:', Array.from(this.filasSeleccionadas));
    }

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

  /** Obtiene el formulario de datos del trámite a realizar */

get datosDelTramiteRealizar(): FormGroup {
  return this.dataDeLaSolicitudForm.get('datosDelTramiteRealizar') as FormGroup;
}

toggleLicenciaSanitaria(): void {
  const avisoDeFuncionamiento = this.dataDeLaSolicitudForm.get('datosDelTramiteRealizar.avisoDeFuncionamiento')?.value;
  const licenciaSanitariaControl = this.dataDeLaSolicitudForm.get('datosDelTramiteRealizar.licenciaSanitaria');
  
  if (avisoDeFuncionamiento) {
    licenciaSanitariaControl?.disable();
  } else {
    licenciaSanitariaControl?.enable();
  }
}
onSave() {
    const formData = { ...this.dataDeLaSolicitudForm.value };
    formData.tipoProducto = this.tipoProductoData.catalogos.find(
      (item: Catalogo) => String(item.id) === String(formData.tipoProducto)
    )?.descripcion || formData.tipoProducto;
  
    formData.clasificaionProductos = this.delProducto.catalogos.find(
      (item: Catalogo) => String(item.id) === String(formData.clasificaionProductos)
    )?.descripcion || formData.clasificaionProductos;
  
    formData.especificarProducto = this.especificarData.catalogos.find(
      (item: Catalogo) => String(item.id) === String(formData.especificarProducto)
    )?.descripcion || formData.especificarProducto;
  
    formData.estadoFisico = this.estadoFisicoData.catalogos.find(
      (item: Catalogo) => String(item.id) === String(formData.estadoFisico)
    )?.descripcion || formData.estadoFisico;
  
    
    // Add the extracted data to the tableData2 array
    this.mercanciasData.push(formData);

    // Reset the form
    this.dataDeLaSolicitudForm.reset();
  
}
onDeleted(){
  // if (!this.filasSeleccionadas || this.filasSeleccionadas.size === 0) {
  //   console.warn('No rows selected for deletion.');
  //   return;
  // }

  console.log('Rows selected for deletion:', Array.from(this.filasSeleccionadas));
  console.log('Data before deletion:', this.mercanciasData);

  this.mercanciasData = this.mercanciasData.filter((row) => {
    const rowId = row.id; // Assuming each row in mercanciasData has a unique 'id'
    return !this.filasSeleccionadas.has(Number(rowId));
  });

  // Clear the selection
  this.filasSeleccionadas.clear();
}

setValoresStore(
  form: FormGroup,
  campo: string,
  metodoNombre: keyof Solicitud260915Store
): void {
  const VALOR = form.get(campo)?.value;
  (this.solicitud260915Store[metodoNombre] as (value: any) => void)(VALOR);
}


  /** Destrucción del componente */
  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}
