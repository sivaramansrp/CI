
import { AlertComponent, ConfiguracionColumna, ConsultaioQuery, ConsultaioState, Notificacion, NotificacionesComponent, Pedimento, TablaDinamicaComponent, TablaSeleccion } from '@ng-mf/data-access-user';
import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Solicitante110101State, Tramite110101Store } from '../../estados/tramites/solicitante110101.store';
import { Subject, map, takeUntil } from 'rxjs';
import { Catalogo } from '@libs/shared/data-access-user/src';
import { CatalogoSelectComponent } from '@libs/shared/data-access-user/src/tramites/components/catalogo-select/catalogo-select.component';
import { CatalogosTramiteService } from '../../services/catalogo.service';
import { CodigoRespuesta } from '../../../../core/enum/se-core-enum';
import { CommonModule } from '@angular/common';
import { MENSAJE_ALERTA_TRATADOS } from '@ng-mf/data-access-user';
import { PantallasSvcService } from '../../services/pantallas-svc.service';
import { RegistroDeSolicitudesTabla} from '../../models/panallas110101.model';
import { Solicitante110101Query } from '../../estados/queries/solicitante110101.query';
import { TituloComponent } from '@ng-mf/data-access-user';
import { TratadosTabla } from '../../models/panallas110101.model';
import tratadosTable from '@libs/shared/theme/assets/json/110101/tratados-table.json';

/**
 * Componente Tratados que se utiliza para mostrar y gestionar los tratados.
 * 
 * Este componente utiliza varios subcomponentes como TituloComponent, CommonModule,
 * TableComponent y AlertComponent para mostrar información y permitir al usuario seleccionar y agregar tratados.
 * 
 * @component
 */
@Component({
  selector: 'app-tratados',
  templateUrl: './tratados.component.html',
  styleUrl: './tratados.component.scss',
  standalone: true,
  imports: [
    TituloComponent,
    CommonModule,
    AlertComponent,
    CatalogoSelectComponent,
    ReactiveFormsModule,
    TablaDinamicaComponent,
    NotificacionesComponent
  ]
})
export class TratadosComponent implements OnInit, OnDestroy {
   /**
   * Notificación actual que se muestra en el componente.
   *
   * Esta propiedad almacena los datos de la notificación que se mostrará al usuario.
   * Se utiliza para configurar el tipo, categoría, mensaje y otros detalles de la notificación.
   */
  public nuevaNotificacion!: Notificacion ;
  /**
   * Evento que se emite para habilitar la pestaña siguiente en el flujo del trámite.
   * Se utiliza para notificar al componente padre que la pestaña puede ser activada,
   * generalmente después de agregar o modificar un tratado exitosamente.
   *
   * @event habilitarPestana
   * @type {EventEmitter<void>}
   */
  @Output() habilitarPestana = new EventEmitter<void>();

  /**
   * Array de filas seleccionadas en la tabla de tratados.
   * 
   * @property {RegistroDeSolicitudesTabla[]} selectedRows - Array que contiene las filas seleccionadas en la tabla.
   */
  selectedRows: RegistroDeSolicitudesTabla[] = [];
  /*
  * Indice de la fila seleccionada en la tabla de tratados.
  */
  selectedRowIndex: number | null = null;
/**
 * Indica si el componente está en modo de edición.
 * Cuando es `true`, permite editar los tratados seleccionados.
 */
  isEditMode: boolean = false;
  /**
   * Formulario reactivo para gestionar los tratados.
   * 
   * @property {FormGroup} formularioTratados - El formulario reactivo que contiene los campos para los tratados.
   */
  formularioTratados!: FormGroup;

  /**
  * **Subject utilizado para manejar la destrucción de suscripciones**
  * 
  * Este `Subject` se emite en `ngOnDestroy` para notificar y completar todas las
  * suscripciones activas, evitando posibles fugas de memoria en el componente.
  */
  private destroy$ = new Subject<void>();
  /**
   * Indica si el formulario está en modo solo lectura.
   * Cuando es `true`, los campos del formulario no se pueden editar.
   */
  public esFormularioSoloLectura: boolean = false;

    /**
     * Representa el estado actual del solicitante (Solicitante) para el trámite 110101.
     * Esta propiedad contiene toda la información relevante sobre los datos y el estado
     * del solicitante dentro del contexto del trámite.
     */
  public solicitudeState!: Solicitante110101State;
  /**
   * Catálogo de países disponibles para selección en el componente.
   */
  public paisCatalogo: Catalogo[] = [];
    /**
   * Catálogo de países disponibles para selección en el componente.
   */
  public tratadoCatalogo: Catalogo[] = [];
  /**
   * Catálogo de países disponibles para selección en el componente.
   */
  public origenCatalogo: Catalogo[] = [];

  public consultaState!: ConsultaioState;
    /**
     * Inicializa el TratadosComponent.
     * @param fb - Servicio FormBuilder utilizado para crear y gestionar formularios reactivos.
     * @param tramite110101Store - Servicio store para gestionar el estado del Trámite 110101.
     * @param solicitanteQuery - Servicio query para acceder al estado del solicitante.
     * @param consultaioQuery - Servicio query para acceder al estado de consultaio.
     * 
     * Se suscribe al observable `selectConsultaioState$` para actualizar la propiedad `esFormularioSoloLectura`
     * e inicializar el formulario de tratados cada vez que cambia el estado de consultaio. La suscripción se
     * cancela automáticamente cuando el componente es destruido.
     */
  constructor(private fb: FormBuilder,
    private tramite110101Store: Tramite110101Store,
    private solicitanteQuery: Solicitante110101Query,
    private consultaioQuery: ConsultaioQuery,
    private pantallaService: PantallasSvcService,
    private catalogosTramiteService: CatalogosTramiteService
  ) { 
    this.consultaioQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroy$),
        map((seccionState) => { 
          this.consultaState= seccionState;
          this.esFormularioSoloLectura = seccionState.readonly;
          this.inicializarFormularioTratados();
        })
      )
      .subscribe();
  }

  /**
   * Método que se ejecuta al inicializar el componente.
   * 
   * Llama al método `inicializarFormularioTratados` para configurar el formulario reactivo.
   * 
   * @method ngOnInit
   */
  ngOnInit(): void {
     this.getCatalogoPaisBloques();
    this.solicitanteQuery.selectSolicitante$.pipe(takeUntil(this.destroy$),map((seccionState) => {
        this.solicitudeState = seccionState;
    })).subscribe();
    this.inicializarFormularioTratados();
  }

  /**
   * Inicializa el formulario reactivo para los tratados.
   * 
   * Este método configura el formulario reactivo con los campos `pais`, `tratado` y `origen`,
   * todos ellos con validadores requeridos.
   * 
   * @method inicializarFormularioTratados
   */

  public inicializarFormularioTratados(): void {
    if (this.esFormularioSoloLectura) {
      this.guardarDatosFormulario();
    } else {
      this.inicializarFormulario();
    }
  }

    /**
     * Inicializa el formulario `formularioTratados` con valores predeterminados de `solicitudeState`.
     * El formulario incluye los siguientes controles requeridos: `pais`, `tratado` y `origen`.
     * Cada control se prellena con el valor correspondiente de `solicitudeState`.
     * @remarks
     * Este método debe llamarse para configurar el formulario antes de la interacción del usuario.
     */
  public inicializarFormulario(): void {
    this.formularioTratados = this.fb.group({
      pais: [this.solicitudeState?.pais, Validators.required],
      tratado: [this.solicitudeState?.tratado, Validators.required],
      origen: [this.solicitudeState?.origen, Validators.required]
    });
  }

  /**
   * Mensaje de alerta para tratados.
   * 
   * @property {string} alert - El mensaje de alerta que se mostrará en el componente.
   */

  alerta = MENSAJE_ALERTA_TRATADOS;

    /**
     * Obtiene los datos de los catálogos desde el servicio backend y actualiza las propiedades de catálogos del componente.
     * Este método se suscribe al observable `getCatalogoDatos` de `pantallaService`, procesa la respuesta de la API,
     * y asigna los datos resultantes a `paisCatalogo`, `tratadoCatalogo` y `origenCatalogo` respectivamente.
     * La suscripción se cancela automáticamente cuando el componente es destruido para evitar fugas de memoria.
     */
  public getCatalogoList(): void {
    this.pantallaService.getCatalogoDatos().pipe(takeUntil(this.destroy$)).subscribe((response) => {
      const API_RESPONSE = JSON.parse(JSON.stringify(response));
      this.paisCatalogo = API_RESPONSE.pais;
      this.tratadoCatalogo = API_RESPONSE.tratado;
      this.origenCatalogo = API_RESPONSE.origen;
    });
  }

  /**
   * @method getCatalogoPaisBloques
   * @description Obtiene el catálogo de países y bloques comerciales
   * 
   * Realiza una petición al servicio para recuperar el catálogo de países y bloques.
   * Si la respuesta es exitosa (código '00'), transforma los datos al formato requerido
   * y los asigna a la propiedad paisCatalogo.
   * 
   * @returns {void}
 */
  public getCatalogoPaisBloques(): void {
    this.catalogosTramiteService.getCatPaisBloques()
      .pipe(takeUntil(this.destroy$))
      .subscribe((response) => {
        if (response.codigo === CodigoRespuesta.EXITO) {
          // El backend manda "datos"
          const DATOS = response.datos || [];

          // Transformación a tu respuesta a response Catalogo
          this.paisCatalogo = DATOS.map((item, index) => ({
            id: index + 1,
            descripcion: item.descripcion,
            clave: item.clave,
            title: item.bloque,
          }));
        }
      });
  }

  /**
   * @method getCatalogoTratadoAcuerdo
   * @description Obtiene el catálogo de tratados y acuerdos por país
   * 
   * Realiza una petición al servicio para recuperar los tratados y acuerdos
   * específicos de un país. Si la respuesta es exitosa (código '00'), 
   * transforma los datos al formato requerido y los asigna a tratadoCatalogo.
   * 
   * @param {string} cvePais - Clave del país para filtrar los tratados
   * @returns {void}
 */
  public getCatalogoTratadoAcuerdo(cvePais: string): void {
    this.catalogosTramiteService.getCatTratadosAcuerdos(cvePais)
      .pipe(takeUntil(this.destroy$))
      .subscribe((response) => {
        if (response.codigo === CodigoRespuesta.EXITO) {
          // El backend manda "datos"
          const DATOS = response.datos || [];

          // Transformación a tu respuesta a response Catalogo
          this.tratadoCatalogo = DATOS.map((item, index) => ({
            id: index + 1,
            descripcion: item.descripcion,
            clave: item.clave,
          }));
        }
      });
  }

  /**
   * @method getCatalogoTratadoAcuerdoBloque
   * @description Obtiene el catálogo de tratados y acuerdos por bloque comercial
   * 
   * Realiza una petición al servicio para recuperar los tratados y acuerdos
   * específicos de un bloque comercial. Si la respuesta es exitosa (código '00'), 
   * transforma los datos al formato requerido y los asigna a tratadoCatalogo.
   * 
   * @param {string} cvePais - Clave del país para determinar el bloque comercial
   * @returns {void}
   */
  public getCatalogoTratadoAcuerdoBloque(cvePais: string): void {
    this.catalogosTramiteService.getCatTratadosAcuerdosBloque(cvePais)
      .pipe(takeUntil(this.destroy$))
      .subscribe((response) => {
        if (response.codigo === CodigoRespuesta.EXITO) {
          // El backend manda "datos"
          const DATOS = response.datos || [];

          // Transformación a tu respuesta a response Catalogo
          this.tratadoCatalogo = DATOS.map((item, index) => ({
            id: index + 1,
            descripcion: item.descripcion,
            clave: item.clave,
          }));
        }
      });
  }

  /**
   * @method getCatalogoCriterios
   * @description Obtiene el catálogo de criterios de origen por tratado o acuerdo
   * 
   * Realiza una petición al servicio para recuperar los criterios de origen
   * específicos de un tratado o acuerdo. Si la respuesta es exitosa (código '00'), 
   * transforma los datos al formato requerido y los asigna a origenCatalogo.
   * 
   * @param {string} idTratadoAcuerdo - Clave del tratado o acuerdo para filtrar los criterios
   * @returns {void}
   */
  public getCatalogoCriterios(idTratadoAcuerdo: string): void {
    this.catalogosTramiteService.getCatCriterios(idTratadoAcuerdo)
      .pipe(takeUntil(this.destroy$))
      .subscribe((response) => {
        if (response.codigo === CodigoRespuesta.EXITO) {
          // El backend manda "datos"
          const DATOS = response.datos || [];

          // Transformación a tu respuesta a response Catalogo
          this.origenCatalogo = DATOS.map((item, index) => ({
            id: index + 1,
            descripcion: item.descripcion,
            clave: item.clave,
          }));
        }
      });
  }

  /**
   * Encabezados comunes de la tabla de tratados.
   * 
   * @property {string[]} encabezadosComunesTabla - Array de cadenas de encabezados de tabla.
   */
  encabezadosComunesTabla = tratadosTable.tableHeader;

 

 /**
     * Un array de objetos `RegistroDeSolicitudesTabla` que representa los datos para la tabla de solicitudes.
     */
    public registroDeSolicitudesTablaDatos: RegistroDeSolicitudesTabla[] = [
       {
    pais: 'Mexico',
    tratado: 'T-MEC',
    origen: 'Nacional'
  }
    ];

  /**
   * Datos de la tabla de tratados.
   * Este array contiene objetos de tipo `TratadosTabla` que representan los datos de los
   */
    public tratadosTablaDatos: TratadosTabla[] = [
      {
        pais: 'Mexico',
        tratado: 'T-MEC',
        origen: 'Nacional',
        normaOrigen: 'Norma 1',
        requisitoEspecifico: 'Requisito 1',
        calificacionSistema: 'Calificación A',
        calificacionDictaminad: 'Dictaminado A',
        otrasInstancias: 'Instancia 1',
        procesoTransformacion: 'Proceso 1'
      }
    ];

/**
   * Tipo de selección utilizado en la tabla, definido como casillas de verificación (checkbox).
   * @type {TablaSeleccion}
   */
  tipoSeleccionTabla = TablaSeleccion.CHECKBOX;

 /** Configuración de la tabla de sectores */
    public configuracionTabla: ConfiguracionColumna<RegistroDeSolicitudesTabla>[] = [
        { encabezado: 'Pais o bloque', clave: (item: RegistroDeSolicitudesTabla) => item.pais, orden: 1 },
        { encabezado: "Tratado o Acuerdo", clave: (item: RegistroDeSolicitudesTabla) => item.tratado, orden: 2 },
        { encabezado: "Criterio de origen", clave: (item: RegistroDeSolicitudesTabla) => item.origen, orden: 3 }
    ];

    public tablaSeleccionada: ConfiguracionColumna<TratadosTabla>[] = [
      { encabezado: 'Pais o bloque', clave: (item: TratadosTabla) => item.pais, orden: 1 },
      { encabezado: "Tratado o Acuerdo", clave: (item: TratadosTabla) => item.tratado, orden: 2 },
      { encabezado: "Criterio de origen", clave: (item: TratadosTabla) => item.origen, orden: 3 },
      { encabezado: "Norma de origen", clave: (item: TratadosTabla) => item.normaOrigen, orden: 4 },
      { encabezado: "Requisito especifico", clave: (item: TratadosTabla) => item.requisitoEspecifico, orden: 5 },
      { encabezado: "Calificación sistema", clave: (item: TratadosTabla) => item.calificacionSistema, orden: 6 },
      { encabezado: "Calificación dictaminado", clave: (item: TratadosTabla) => item.calificacionDictaminad, orden: 7 },
      { encabezado: "Otras instancias", clave: (item: TratadosTabla) => item.otrasInstancias, orden: 8 },
      { encabezado: "Proceso de transformación", clave: (item: TratadosTabla) => item.procesoTransformacion, orden: 9 } ];


    /**
   * Agrega un nuevo tratado a la tabla.
   * 
   * Este método verifica si el formulario es válido, y si lo es, agrega el nuevo tratado
   * al cuerpo de la tabla y reinicia el formulario.
   * 
   * @method agregarTratado
   */
 
agregarTratado(): void {
  if (this.formularioTratados.valid) {
   
    const PAIS_ID = this.formularioTratados.get('pais')?.value;
    const TRATADO_ID = this.formularioTratados.get('tratado')?.value;
    const ORIGEN_ID = this.formularioTratados.get('origen')?.value;

    
    const PAIS_DESC = this.paisCatalogo.find(item => item.id.toString() === PAIS_ID)?.descripcion || '';
    const TRATADO_DESC = this.tratadoCatalogo.find(item => item.id.toString() === TRATADO_ID)?.descripcion || '';
    const ORIGENDESC = this.origenCatalogo.find(item => item.id.toString() === ORIGEN_ID)?.descripcion || '';

    const ROW_DATA = {
      pais: PAIS_DESC,
      tratado: TRATADO_DESC,
      origen: ORIGENDESC
    };

   if (this.isEditMode && this.selectedRowIndex !== null && this.selectedRowIndex > -1) {
  
  const UPDATED_ROW = { ...this.registroDeSolicitudesTablaDatos[this.selectedRowIndex] };
  if (PAIS_DESC){ UPDATED_ROW.pais = PAIS_DESC}
  if (TRATADO_DESC) {UPDATED_ROW.tratado = TRATADO_DESC}
  if (ORIGENDESC) {UPDATED_ROW.origen = ORIGENDESC}
  this.registroDeSolicitudesTablaDatos[this.selectedRowIndex] = UPDATED_ROW;

  this.isEditMode = false;
  this.selectedRowIndex = null;
  this.selectedRows = [];
} else {
  
  this.registroDeSolicitudesTablaDatos.push(ROW_DATA);
}
    this.habilitarPestana.emit();
    this.formularioTratados.reset();
  }
}
/**
 * Modifica un tratado existente en la tabla.
 * Este método se activa cuando se selecciona una fila en la tabla.
 * Si hay una fila seleccionada, cambia el modo de edición a `true` y carga
 */
modificarTratado(): void {
  if (this.selectedRows.length === 0 ||
    this.selectedRowIndex === null ||
    this.selectedRowIndex < 0) {
   this.abrirModal();
    return;
  }
  this.isEditMode = true;
  const SELECTED = this.registroDeSolicitudesTablaDatos[this.selectedRowIndex];

  const PAIS_ID = this.paisCatalogo.find(item => item.descripcion === SELECTED.pais)?.id ?? '';
  const TRATADO_ID = this.tratadoCatalogo.find(item => item.descripcion === SELECTED.tratado)?.id ?? '';
  const ORIGEN_ID = this.origenCatalogo.find(item => item.descripcion === SELECTED.origen)?.id ?? '';

  this.formularioTratados.patchValue({
    pais: PAIS_ID,
    tratado: TRATADO_ID,
    origen: ORIGEN_ID
  });
}
  /**
   * Carga datos desde un archivo JSON y actualiza el store con la información obtenida.
   * Luego reinicializa el formulario con los valores actualizados desde el store.
   */
  public guardarDatosFormulario(): void {
    this.inicializarFormulario();
    if (this.esFormularioSoloLectura) {
      this.formularioTratados.disable();
    } else if (!this.esFormularioSoloLectura) {
      this.formularioTratados.enable();
    }
  }

/**
 * Objeto que representa los datos de una fila en la tabla de registros de solicitudes.
 * 
 * @property {string} pais - Nombre del país asociado al registro.
 * @property {string} tratado - Nombre del tratado relacionado.
 * @property {string} origen - Origen del registro.
 */
talbleData: RegistroDeSolicitudesTabla = {
  pais:'',
  tratado: '',
  origen: ''
}
  
/**
 * Obtiene la descripción correspondiente a un valor seleccionado en un formulario
 * a partir de un arreglo de catálogo y la asigna a la propiedad correspondiente
 * en el objeto `talbleData`.
 *
 * @param arr - Arreglo de objetos de tipo `Catalogo` que contiene los datos del catálogo.
 * @param formControl - Nombre del control del formulario cuyo valor se utilizará para buscar la descripción.
 *
 * Asigna la descripción encontrada a la propiedad correspondiente de `talbleData` según el control:
 * - Si `formControl` es 'pais', asigna a `talbleData.pais`.
 * - Si `formControl` es 'tratado', asigna a `talbleData.tratado`.
 * - Si `formControl` es 'origen', asigna a `talbleData.origen`.
 */
 getLabelFromCatalogData(arr:Catalogo[],formControl:string): void {
  const ID = this.formularioTratados.get(formControl)?.value;
  const LABLE = arr.find(item => item.id.toString() === ID)?.descripcion;
  if(formControl === 'pais') {
    this.talbleData.pais = LABLE || '';
  }else if(formControl === 'tratado') {
    this.talbleData.tratado = LABLE || '';
}else if(formControl === 'origen') {
    this.talbleData.origen = LABLE || '';
  }
}

  /**
   * Establece el valor de un campo en el store de Tramite31601.
   * @param form - El grupo de formularios que contiene el campo.
   * @param campo - El nombre del campo cuyo valor se va a establecer.
   * @param metodoNombre - El nombre del método en el store que se utilizará para establecer el valor.
   */
  public setValoresStore(form: FormGroup, campo: string, metodoNombre: keyof Tramite110101Store): void {
    const VALOR = form.get(campo)?.value;
    (this.tramite110101Store[metodoNombre] as (value: unknown) => void)(VALOR);
  }


  /**
   * **Ciclo de vida: OnDestroy**
   * 
   * Este método se ejecuta cuando el componente se destruye. 
   * Se utiliza para limpiar las suscripciones y evitar fugas de memoria.
   * 
   * - Envía un valor a `destroy$` para notificar a los observables que deben completarse.
   * - Completa `destroy$` para liberar los recursos asociados.
   */
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

/**
 * 
 * @param selected - Array de registros seleccionados en la tabla.
 * Este método maneja el cambio de selección en la tabla de tratados.
 */
onSeleccionChange(selected: RegistroDeSolicitudesTabla[]) :void{
  if (selected && selected.length === 1) {
    this.selectedRows = [selected[0]];
    this.selectedRowIndex = this.registroDeSolicitudesTablaDatos.findIndex(
      row => row === selected[0]
    );
  
  } else {
    this.selectedRows = [];
    this.selectedRowIndex = null;
    this.formularioTratados.reset();
  }
}
/**
 * 
 * @returns boolean
 * Este método verifica si hay filas seleccionadas en la tabla de tratados.
 */
eliminarTratado(): void {
  if (this.selectedRows.length === 0) {
    this.abrirModal();
    return;
  }
  this.registroDeSolicitudesTablaDatos = this.registroDeSolicitudesTablaDatos.filter(
    row => !this.selectedRows.includes(row)
  );
  this.selectedRows = [];
}

  /**
   * Lista de pedimentos.
   *
   * Esta propiedad almacena un arreglo de objetos de tipo `Pedimento`, que representan
   * los pedimentos gestionados en el componente.
   */
  pedimentos: Array<Pedimento> = [];
   /**
   * Índice del elemento que se desea eliminar.
   *
   * Esta propiedad almacena el índice del elemento seleccionado para su eliminación
   * en la lista de pedimentos.
   */
  elementoParaEliminar!: number;
  /**
   * Abre el modal de confirmación para eliminar un pedimento.
   *
   * Este método configura los datos de la notificación que se mostrará en el modal
   * de confirmación. También almacena el índice del elemento que se desea eliminar.
   *
   * @param i - Índice del pedimento que se desea eliminar. Por defecto, es 0.
   */
  abrirModal(i: number = 0): void {
    this.nuevaNotificacion = {
    tipoNotificacion: 'alert',
    categoria: 'danger',
    modo: 'action',
    titulo: '',
    mensaje: 'Seleccione un pais/tratado/criterio',
    cerrar: false,
    tiempoDeEspera: 2000,
    txtBtnAceptar: 'Aceptar',
    txtBtnCancelar: '',
  };
    this.elementoParaEliminar = i;
  }
  /**
   *              
   * @param borrar
   * @description Elimina un pedimento de la lista si el parámetro `borrar` es `true`. 
   */
eliminarPedimento(borrar: boolean): void {
    if (borrar) {
      this.pedimentos.splice(this.elementoParaEliminar, 1);
    }
  }
}
