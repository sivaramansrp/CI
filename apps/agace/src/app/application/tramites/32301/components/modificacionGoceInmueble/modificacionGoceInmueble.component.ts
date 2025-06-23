import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  AlertComponent,
  Catalogo,
  CatalogoSelectComponent,
  ConsultaioQuery,
  InputRadioComponent,
  NotificacionesComponent,
  TableComponent,
  TituloComponent,
} from '@ng-mf/data-access-user';
import {
  CVE_TIPO_DOC_DATA,
  FRACCION_ARANCELARIA_DATA,
  MESSAGE_NAC,
  MODIFICACION_PARTES_HEADER,
  MOSTRAR_GRID_NUEVO_HEADER,
  RADIO_OPTIONS,
} from '../../enums/modificacionGoceInmueble.enum';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  ModificacionGoceInmueble,
  TableDataNgTable,
} from '../../models/avisomodify.model';
import {
  REGEX_POSTAL,
  REGEX_RFC,
} from '@libs/shared/data-access-user/src/tramites/constantes/regex.constants';
import { Subject, map, takeUntil } from 'rxjs';
import { AvisoModifyService } from '../../services/aviso-modify.service';
import { CommonModule } from '@angular/common';
import { Modal } from 'bootstrap';
import { Notificacion } from '@libs/shared/data-access-user/src';
import { Tramite32301Query } from '../../estados/tramite32301.query';
import { Tramite32301Store } from '../../estados/tramite32301.store';
interface TableData {
  tableHeader: string[];
  tableBody: TableBodyItem[];
}
interface TableBodyItem {
  tbodyData: string[];
}
@Component({
  selector: 'app-modificacion-goce-inmueble',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TituloComponent,
    InputRadioComponent,
    AlertComponent,
    TableComponent,
    CatalogoSelectComponent,
    NotificacionesComponent,
  ],
  templateUrl: './modificacionGoceInmueble.component.html',
})
export class ModificacionGoceInmuebleComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  /** Formulario reactivo para la modificación del goce de inmueble */
  modificacionGoceForm!: FormGroup;

  /** Opciones para los radios de selección: "Domicilio nuevo" o "Modificar domicilio" */
  radioOptions = RADIO_OPTIONS;

  /** Mensaje de información para la modificación de partes contratantes */
  messageNac = MESSAGE_NAC;

  /** Bandera para mostrar el grid de domicilios nuevos */
  mostrarGridNuevo: boolean = false;

  /** Bandera para mostrar el grid de domicilios modificados */
  mostrarGridModificado: boolean = false;

  /** Instancia del modal para el domicilio nuevo */
  modalDomiciliosInmuebleNuevoInstance!: Modal;

  /** Datos de la tabla de domicilios modificados */
  public gridDomiciliosModificados!: TableData;

  /** Encabezados y cuerpo de la tabla a mostrar en el grid modificado */
  public gridMostrarGridModificado:
    | { tableHeader: string[]; tableBody: string[] }
    | undefined;

  /** Encabezado de la tabla */
  tableHeader: string[] = [];

  /** Cuerpo de la tabla */
  tableBody: TableBodyItem[] = [];

  /** Encabezado para los domicilios modificados */
  gridDomiciliosModificadosHeader: string[] = [];

  /** Encabezado de la tabla de domicilios nuevos */
  mostrarGridNuevoHeader = MOSTRAR_GRID_NUEVO_HEADER;

  /** Encabezado de la tabla de partes modificadas */
  modificacionPartesHeader = MODIFICACION_PARTES_HEADER;

  /** Datos de las partes modificadas */
  modificacionPartesData: { tbodyData: string[] }[] = [{ tbodyData: [] }];

  /** Datos de la tabla de domicilios modificados */
  gridDomiciliosModificadosData: { tbodyData: string[] }[] = [
    { tbodyData: [] },
  ];

  /** Datos para mostrar en la tabla de domicilios nuevos */
  mostrarGridNuevoHeaderData: { tbodyData: string[] }[] = [{ tbodyData: [] }];

  /** Catálogo de entidades federativas */
  entidadFederativa!: Catalogo[];

  /** Datos de las fracciones arancelarias */
  fraccionArancelaria: Catalogo[] = FRACCION_ARANCELARIA_DATA;

  /** Datos de los tipos de documento */
  cveTipoDoc: Catalogo[] = CVE_TIPO_DOC_DATA;

  /** Referencia al modal de domicilio nuevo */
  @ViewChild('modalDomiciliosInmuebleNuevo', { static: false })
  modalDomiciliosInmuebleNuevo!: ElementRef;

  /** Formulario para manejar la dirección del inmueble */
  direccionGrid!: FormGroup;

  /** Lista de partes contratantes modificadas */
  modificacionPartes: Array<{ rfc: string; nombre: string; caracter: string }> =
    [];

  /** Sujeto para manejar la destrucción del componente */
  public destroy$: Subject<void> = new Subject<void>();

  /** Objeto que maneja el modelo de modificación del goce del inmueble */
  modificacionGoceInmueble!: ModificacionGoceInmueble;

  /**
   * Declaración de la variable modificarRecordNotificacion de tipo Notificacion.
   * Se utiliza para gestionar notificaciones relacionadas con la modificación de registros.
   */
  public modificarRecordNotificacion!: Notificacion;

  /**
   * Declaración de la variable modificarNotificacion de tipo Notificacion.
   * Se usa para manejar notificaciones generales sobre modificaciones dentro del sistema.
   */
  public modificarNotificacion!: Notificacion;
   /**
  * Indica si el formulario está en modo solo lectura.
  * Cuando es `true`, los campos del formulario no se pueden editar.
  */
  esFormularioSoloLectura: boolean = false; 
  constructor(
    private fb: FormBuilder,
    private AvisoModifyService: AvisoModifyService,
    private store: Tramite32301Store,
    private Tramite32301Query: Tramite32301Query,
    private consultaioQuery: ConsultaioQuery,
  ) {
     /**
     * Se suscribe al estado de `Consultaio` para obtener información actualizada del estado del formulario.
     *
     * - Asigna el valor de solo lectura (`readonly`) a la propiedad `esFormularioSoloLectura`.
     * - Llama a `inicializarEstadoFormulario()` para aplicar configuraciones basadas en el estado recibido.
     * - La suscripción se cancela automáticamente cuando `destroy$` emite un valor (para evitar fugas de memoria).
     */
    this.consultaioQuery.selectConsultaioState$
    .pipe(
      takeUntil(this.destroy$),
      map((seccionState)=>{
        this.esFormularioSoloLectura = seccionState.readonly; 
        this.inicializarEstadoFormulario();
      })
    )
    .subscribe()
    // Inicializa el formulario si es necesario
    this.getGridDomiciliosModificados(); // Obtiene los domicilios modificados al iniciar el componente
  }

 /**
 * Método del ciclo de vida de Angular que se ejecuta al inicializar el componente.
 * 
 * Llama al método `inicializarEstadoFormulario()` para configurar el estado inicial
 * del formulario al momento de cargar el componente.
 */
ngOnInit(): void {
  this.inicializarEstadoFormulario();
}


  /**
   * Evalúa si se debe inicializar o cargar datos en el formulario.  
   * Además, obtiene la información del catálogo de mercancía.
   */
  inicializarEstadoFormulario(): void {
    if (this.esFormularioSoloLectura) {
      this.guardarDatosFormulario();
    } else {
      this.inicializarFormulario();
    }  
  }

   /**
   * Carga datos desde un archivo JSON y actualiza el store con la información obtenida.
   * Luego reinicializa el formulario con los valores actualizados desde el store.
   */
  guardarDatosFormulario(): void {
      this.inicializarFormulario();
      if (this.esFormularioSoloLectura) {
        this.direccionGrid.disable();
        this.modificacionGoceForm.disable();
      } else if (!this.esFormularioSoloLectura) {
        this.direccionGrid.enable();
        this.modificacionGoceForm.enable();
      } else {
        // No se requiere ninguna acción en el formulario
      }
  }
  /**
   * Inicializa el formulario reactivo para capturar el valor de 'registro'.
   * Suscribe al estado almacenado en el store mediante el query `tramite301Query.selectSolicitud$`
   * y lo asigna a la variable local `solicitudState`. Luego, crea el formulario
   * con el valor inicial obtenido del store.
   */

  inicializarFormulario(): void {
 // Inicializa el formulario reactivo
    this.modificacionGoceForm = this.fb.group({
      ideGenerica2: ['', Validators.required], // Campo obligatorio para la selección de tipo de modificación
    });

    this.initializeForm(); // Inicializa el formulario para la dirección
    this.getEntidadFederativa(); // Obtiene el catálogo de entidades federativas
    this.getGridMostrarGridModificado(); // Obtiene los datos de la tabla de domicilios modificados
  }



  /** Método para obtener las entidades federativas del servicio */
  getEntidadFederativa(): void {
    this.AvisoModifyService.getEntidadFederativa()
      .pipe(takeUntil(this.destroy$))
      .subscribe((resp) => {
        this.entidadFederativa = Object.assign([], resp); // Asigna los datos al catálogo de entidades federativas
      });
  }

  /** Método para obtener los domicilios modificados del servicio */
  getGridDomiciliosModificados(): void {
    this.AvisoModifyService.getGridDomiciliosModificados()
      .pipe(takeUntil(this.destroy$))
      .subscribe((res: TableDataNgTable) => {
        this.gridDomiciliosModificadosHeader = res.tableHeader; // Asigna los encabezados de la tabla
        this.gridDomiciliosModificadosData = res.tableBody; // Asigna los datos de la tabla
      });
  }

  /** Método para obtener los datos de la tabla que se muestra para la modificación */
  getGridMostrarGridModificado(): void {
    this.AvisoModifyService.getGridMostrarGridModificado()
      .pipe(takeUntil(this.destroy$))
      .subscribe((resp: TableDataNgTable) => {
        this.mostrarGridNuevoHeader = resp.tableHeader; // Asigna los encabezados para los domicilios nuevos
        this.mostrarGridNuevoHeaderData = resp.tableBody; // Asigna los datos de la tabla para domicilios nuevos
      });
  }

  /** Inicializa las instancias de los modales después de que la vista está completamente cargada */
  ngAfterViewInit(): void {
    if (this.modalDomiciliosInmuebleNuevo?.nativeElement) {
      this.modalDomiciliosInmuebleNuevoInstance = new Modal(
        this.modalDomiciliosInmuebleNuevo.nativeElement
      );
    }
  }

  /** Método para inicializar el formulario de dirección */
  private initializeForm(): void {
    this.direccionGrid = this.fb.group({
      idAviInmueble: [''],
      direccion: ['', [Validators.required, Validators.maxLength(250)]],
      codigoPostal: [
        '',
        [
          Validators.required,
          Validators.maxLength(5),
          Validators.pattern(REGEX_POSTAL),
        ],
      ],
      cveEntidad: ['', Validators.required],
      cveMunicipio: ['', Validators.required],
      cveTipoDoc: ['', Validators.required],
      fechaInicioAnterior: ['', Validators.required],
      fechaFinAnterior: ['', Validators.required],
      fechaInicioActual: ['', Validators.required],
      fechaFinActual: ['', Validators.required],
      rfcPartesC: [
        '',
        [
          Validators.required,
          Validators.maxLength(13),
          Validators.pattern(REGEX_RFC),
        ],
      ],
      rfcPartesCons: [{ value: '', disabled: true }],
      nombrePartesCons: [{ value: '', disabled: true }],
      caracterDeCons: ['', [Validators.required, Validators.maxLength(30)]],
      observaciones: ['', [Validators.maxLength(500)]],
    });
  }

  /** Verifica el tipo de modificación seleccionada en el radio y muestra el modal correspondiente */
  verificaRadioTipoSem(ev: string | number): void {
    this.openModificarModel();
    if (ev === 'ModificarDomicilio') {

      this.openModificarModel();
      this.mostrarGridNuevo = false;
      this.mostrarGridModificado = true;
    } else if (ev === 'DomicilioNuevo') {
      
      this.mostrarGridNuevo = true;
      this.mostrarGridModificado = false;
    } else {
      this.mostrarGridNuevo = false;
      this.mostrarGridModificado = false;
    }
  }

  /** Abre el modal para agregar un domicilio nuevo */
  abrirModalDomiciliosNvo(): void {
    this.openModalDomiciliosInmuebleNuevoModel();
  }

  /** Carga los datos del RFC de las partes contratantes */
  cargarDatosRfcPartesC(): void {
    const RFC_PARTES_C = this.direccionGrid.get('rfcPartesC')?.value;
    this.direccionGrid.patchValue({
      rfcPartesCons: RFC_PARTES_C,
      nombrePartesCons: 'EuroFoods De Maxico Gonza',
    });
  }

  /** Limpia los campos relacionados con las partes contratantes */
  limpiaCamposParteC(): void {
    this.direccionGrid.patchValue({
      rfcPartesC: '',
      rfcPartesCons: '',
      nombrePartesCons: '',
      caracterDeCons: '',
    });
  }

  /** Agrega una nueva parte contratante a la lista */
  agregarParteC(): void {
    const NUEVO_PARTE = {
      rfc: this.direccionGrid.get('rfcPartesCons')?.value,
      nombre: this.direccionGrid.get('nombrePartesCons')?.value,
      caracter: this.direccionGrid.get('caracterDeCons')?.value,
    };
    if (NUEVO_PARTE.rfc && NUEVO_PARTE.nombre && NUEVO_PARTE.caracter) {
      this.modificacionPartes = [...Object.values(NUEVO_PARTE)];
      this.modificacionPartesData[0].tbodyData.push(
        ...Object.values(NUEVO_PARTE)
      );
      this.limpiaCamposParteC(); // Limpia los campos después de agregar la parte contratante
    } else {
      // Manejar posibles errores de validación, tal vez mostrar un mensaje de error
    }
  }

  /** Elimina la última parte contratante de la lista */
  eliminarParteC(): void {
    if (this.modificacionPartes.length > 0) {
      this.modificacionPartesData[0].tbodyData.pop();
    }
  }

  /** Método para establecer los valores en el store */
  setValoresStore(
    form: FormGroup,
    campo: string,
    metodoNombre: keyof Tramite32301Store
  ): void {
    const VALOR = form.get(campo)?.value;
    (this.store[metodoNombre] as (value: unknown) => void)(VALOR); // Llama al método correspondiente en el store
  }

  /** Método para obtener los valores del store y actualizar la vista */
  getValorStore(): void {
    this.Tramite32301Query.selectModificacionGoceInmueble$
      .pipe(takeUntil(this.destroy$))
      .subscribe((state) => {
        this.modificacionGoceInmueble =
          state as unknown as ModificacionGoceInmueble;
        const NEW_DATU = Object.values(this.modificacionGoceInmueble);
        const TBODY_DATA = { tbodyData: NEW_DATU.map(String) };
        this.mostrarGridNuevoHeaderData.push(TBODY_DATA);
      });
  }

  /** Guarda los datos del domicilio nuevo en el store */
  guardarDomInmuebleNvo(): void {
    this.store.setModificacionGoceInmueble(this.direccionGrid.value); // Guarda los datos en el store
    this.Tramite32301Query.select().pipe(takeUntil(this.destroy$)).subscribe();
    if (!this.direccionGrid.valid) {
      this.direccionGrid.markAllAsTouched(); // Marca todos los campos como tocados si no son válidos
    }
    this.closeModalDomiciliosInmuebleNuevoModel(); // Cierra el modal después de guardar
  }

  /** Cierra el modal del domicilio nuevo */
  cerrarDialogoDomInmuebleNvo(): void {
    this.closeModalDomiciliosInmuebleNuevoModel();
  }

  /** Abre el modal para modificar el domicilio */
  openModificarModel(): void {
    this.modificarNotificacion = {
      /**
       * Tipo de notificación: alerta.
       */
      tipoNotificacion: 'alert',

      /**
       * Categoría de la notificación: peligro (danger).
       */
      categoria: 'success',

      /**
       * Modo de la notificación: acción requerida.
       */
      modo: 'action',

      /**
       * Título de la notificación (actualmente vacío).
       */
      titulo: '',

      /**
       * Mensaje de la notificación, indicando que No es posible presentar Alta y Modificación de domicilios en elmismo aviso de manera simultánea. Se eliminará la informacióncapturada ¿Desea cambiar a la opción modificar domicilio?.
       */
      mensaje:
        'No es posible presentar Alta y Modificación de domicilios en elmismo aviso de manera simultánea. Se eliminará la informacióncapturada ¿Desea cambiar a la opción modificar domicilio?',

      /**
       * Indica si la notificación debe cerrarse automáticamente (false = no se cerrará).
       */
      cerrar: false,

      /**
       * Tiempo de espera antes de cerrar la notificación (2000 milisegundos).
       */
      tiempoDeEspera: 2000,

      /**
       * Texto del botón de aceptación en la notificación.
       */
      txtBtnAceptar: 'Aceptar',

      /**
       * Texto del botón de cancelación en la notificación (actualmente vacío).
       */
      txtBtnCancelar: '',
    };
  }

  /** Abre el modal de domicilio nuevo */
  openModalDomiciliosInmuebleNuevoModel(): void {
    if (this.modalDomiciliosInmuebleNuevoInstance) {
      this.modalDomiciliosInmuebleNuevoInstance.show();
    }
  }

  /** Cierra el modal de domicilio nuevo */
  closeModalDomiciliosInmuebleNuevoModel(): void {
    if (this.modalDomiciliosInmuebleNuevoInstance) {
      this.modalDomiciliosInmuebleNuevoInstance.hide(); // Oculta el modal
      this.getValorStore(); // Actualiza la vista con los valores del store
    }
  }

  /** Abre el modal para modificar el registro */
  openModificarRecordModel(): void {
    this.modificarRecordNotificacion = {
      /**
       * Tipo de notificación: alerta.
       */
      tipoNotificacion: 'alert',

      /**
       * Categoría de la notificación: peligro (danger).
       */
      categoria: 'success',

      /**
       * Modo de la notificación: acción requerida.
       */
      modo: 'action',

      /**
       * Título de la notificación (actualmente vacío).
       */
      titulo: '',

      /**
       * Mensaje de la notificación, indicando que Selecciona sólo un registro para modificar.
       */
      mensaje: 'Selecciona sólo un registro para modificar.',

      /**
       * Indica si la notificación debe cerrarse automáticamente (false = no se cerrará).
       */
      cerrar: false,

      /**
       * Tiempo de espera antes de cerrar la notificación (2000 milisegundos).
       */
      tiempoDeEspera: 2000,

      /**
       * Texto del botón de aceptación en la notificación.
       */
      txtBtnAceptar: 'Aceptar',

      /**
       * Texto del botón de cancelación en la notificación (actualmente vacío).
       */
      txtBtnCancelar: '',
    };
  }

  /** Maneja la destrucción del componente y la limpieza de observables */
  ngOnDestroy(): void {
    /** Envía una señal para destruir los observables */
    this.destroy$.next();

    /** Completa el Subject para evitar memory leaks */
    this.destroy$.complete();
  }
}
