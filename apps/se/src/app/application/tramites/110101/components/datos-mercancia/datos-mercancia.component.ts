import { ALIANZA_JUEGOS_SURTIDOS, COSTO_NETO_VALOR_FOB, CatalogoSelectComponent, CategoriaMensaje, ConfiguracionColumna, ConsultaioQuery, ConsultaioState, ELVALORALERTA, InputRadioComponent, Notificacion, NotificacionesComponent, REGEX_SOLO_NUMEROS,TIPO_METODO, TIPO_METODO_PANAMA, TablaDinamicaComponent, TablaSeleccion, TablePaginationComponent} from '@ng-mf/data-access-user';
import { Catalogo } from '@libs/shared/data-access-user/src';
import { CatalogosTramiteService } from '../../services/catalogo.service';
import { CodigoRespuesta } from '../../../../core/enum/se-core-enum';

import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DATOS_MERCANCIA_MODAL_FORM, ENVASES_TABLA, INSUMOS_TABLA, MODAL_TABLA } from '../constante110101.enum';
import { DatosMercanciaModalTabla, EnvasesTabla, InsumosTabla } from '../../models/panallas110101.model';
import { DatosMercanciaService } from '../../services/datos-mercancia.service';

import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InsumoTratadosRequest } from '../../models/request/validar-insumo-request.model';

import { INTRODUZCA_NUMERO, REQUERIDO } from '@libs/shared/data-access-user/src/tramites/constantes/mensajes-error-formularios';
import { Solicitante110101State, Tramite110101Store } from '../../estados/tramites/solicitante110101.store';
import { Subject,fromEvent,map, takeUntil, tap } from 'rxjs';
import { AlertComponent } from '@ng-mf/data-access-user';
import { CommonModule } from '@angular/common';
import { FormasDinamicasComponent } from '@libs/shared/data-access-user/src/tramites/components/formas-dinamicas/formas-dinamicas/formas-dinamicas.component';
import { FraccionValidarRequest } from '../../models/request/validar-fraccion-request.model';
import { FraccionValidarResponse } from '../../models/response/validar-fraccion-response.model';
import { MercanciaSolicitudService } from '../../services/mercancia-solicitud.service';
import { Modal } from 'bootstrap';
import { Solicitante110101Query } from '../../estados/queries/solicitante110101.query';
import { TituloComponent } from '@ng-mf/data-access-user';
import { ValidacionesFormularioService } from '@ng-mf/data-access-user';
import mercancia from '@libs/shared/theme/assets/json/110101/mercancia.json'

import { CampoEvaluar, EvaluarMercanciaResponse } from '../../models/response/mercancia-response.model';
import { MensajePantallaService } from '../../services/validaciones-tabs.service';



/**
* Este componente se utiliza para mostrar la forma del datosdelamercancia. - 110101
* @param formMercancia: Forma del formMercancia
* @returns Validaciones del formulario
*/
@Component({
  selector: 'app-datos-mercancia',
  templateUrl: './datos-mercancia.component.html',
  styleUrl: './datos-mercancia.component.scss',
  standalone: true,
  imports: [TituloComponent, CommonModule,CatalogoSelectComponent, AlertComponent, ReactiveFormsModule, TablaDinamicaComponent, TablePaginationComponent, FormasDinamicasComponent, NotificacionesComponent, InputRadioComponent]
})
export class DatosMercanciaComponent implements OnInit, OnDestroy, AfterViewInit {

   mostrarCostoNeto = false;
    /**
     * Catálogo de países disponibles para selección en el componente.
     */
    public paisOrigen: Catalogo[] = [];
    /**
   * @property {boolean} mostrarTabla - Indica si se debe mostrar la tabla.
   * Controla la visibilidad de la tabla disponibles en la interfaz.
   * Se utiliza para alternar la visibilidad de la tabla según el estado de la aplicación.
   */
  mostrarTabla = true;

  /**
     * Notificación actual que se muestra en el componente.
     *
     * Esta propiedad almacena los datos de la notificación que se mostrará al usuario.
     * Se utiliza para configurar el tipo, categoría, mensaje y otros detalles de la notificación.
     */
  public nuevaNotificacion!: Notificacion ;
  /**
   * Referencia al elemento modal para agregar mercancías.
   */
  @ViewChild('modalAgregar', { static: false }) modalElement!: ElementRef;

   /**
   * Referencia al elemento del modal para gestionar archivos.
   *
   * Se utiliza para abrir o cerrar el modal de archivos.
   */
  @ViewChild('modalArchivo') modalArchivo!: ElementRef;

  /**
   * Referencia al elemento del modal para gestionar archivos.
   *
   * Se utiliza para abrir o cerrar el modal de archivos.
   */
  @ViewChild('modalConfirmacion') modalConfirmacion!: ElementRef;

  /**
   * Formulario para gestionar los archivos adjuntos.
   *
   * Permite capturar y validar los datos relacionados con los archivos adjuntos.
   */
  public formularioArchivo: FormGroup = new FormGroup({
    archivo: new FormControl('', [Validators.required]),
  });
  /**
     * Tipo de selección utilizado en la tabla, definido como casillas de verificación (checkbox).
     * @type {TablaSeleccion}
     */
  public tipoSeleccionTabla = TablaSeleccion.CHECKBOX;

  /** Configuración de la tabla de sectores */
  public configuracionTablaInsumos: ConfiguracionColumna<InsumosTabla>[] = INSUMOS_TABLA;

  /** Configuración de la tabla de sectores */
  public configuracionTablaEnvases: ConfiguracionColumna<EnvasesTabla>[] = ENVASES_TABLA;

  /** Configuración de la tabla de sectores */
  public configuracionTabla: ConfiguracionColumna<DatosMercanciaModalTabla>[] = MODAL_TABLA;

  /**
   * @property listaSeleccionadasInsumos
   * @type {InsumosTabla[]}
   * @private
   * @description
   * Arreglo privado que almacena las filas seleccionadas en la tabla de pago de derechos.
   * Se utiliza para realizar operaciones como la eliminación de registros seleccionados por el usuario.
   */
  private listaSeleccionadasInsumos: InsumosTabla[] = [];

  /**
   * @property listaSeleccionadasEnvases
   * @type {EnvasesTabla[]}
   * @private
   * @description
   * Arreglo privado que almacena las filas seleccionadas en la tabla de pago de derechos.
   * Se utiliza para realizar operaciones como la eliminación de registros seleccionados por el usuario.
   */
  private listaSeleccionadasEnvases: EnvasesTabla[] = [];

  /** Un array de objetos `insumosTablaDatos` que representa los datos para la tabla de solicitudes.*/
  public insumosTablaDatos: InsumosTabla[] = [];

  /** Un array de objetos `envasesTablaDatos` que representa los datos para la tabla de solicitudes.*/
  public envasesTablaDatos: EnvasesTabla[] = [];

  /** Un array de objetos `tablaDatos` que representa los datos para la tabla de solicitudes.*/
  public tablaDatos: DatosMercanciaModalTabla[] = [];

  /** Almacena las filas seleccionadas de la tabla */
  public filasSeleccionadas: DatosMercanciaModalTabla[] = [];

  /** Indica si se debe mostrar el campo RFC en el formulario modal */
  mostrarRFC = false;

  /**
   * Configuración de los campos que se muestran en el modal para agregar o editar datos de mercancía.
   * Esta propiedad utiliza la constante `DATOS_MERCANCIA_MODAL_FORM` para definir la estructura y validaciones de los campos del formulario modal.
   *
   * @type {any[]}
   * @public
   * @memberof DatosMercanciaComponent
   * @example
   * <ng-container *ngFor="let campo of modalFormaDatos"> ... </ng-container>
   */
  public modalFormaDatos = DATOS_MERCANCIA_MODAL_FORM;
  /**
   * compo doc
   * @type {FormGroup}
   * @memberof DatosMercanciaComponent
   * @description
   * Este es un formulario reactivo de Angular representado por un FormGroup.
   * Se utiliza para manejar y validar los datos del formulario en el componente.
   */
  public forma: FormGroup = new FormGroup({
    ninoFormGroup: new FormGroup({
    pais: new FormControl("", Validators.required),
    rfc: new FormControl(null,Validators.required),
    fabricante: new FormControl(null),
  })
  });

  /**
  * compo doc
  * @getter ninoFormGroup
  * @description
  * Este getter devuelve el grupo de formularios anidado llamado `ninoFormGroup` 
  * dentro del formulario reactivo principal `forma`. 
  * Se utiliza para acceder y manipular los controles y valores específicos de este grupo de formularios.
  * 
  * @returns {FormGroup} El grupo de formularios `ninoFormGroup` como un objeto de tipo `FormGroup`.
  * 
  * @example
  * const grupo = this.ninoFormGroup;
  * grupo.get('campo').setValue('nuevo valor');
  */

get ninoFormGroup(): FormGroup {
  return this.forma.get('ninoFormGroup') as FormGroup;
}

  /**
   * Una cadena que representa la clase CSS para una alerta de advertencia.
   * Esta clase se utiliza para aplicar estilo a los mensajes de advertencia en el componente.
   */
  public warningAlert = 'alert-warning';

  /**
   * Un objeto que contiene los textos de alerta.
   * Este objeto se utiliza para mostrar mensajes de alerta en el componente.
   */
  public TEXTOS = ELVALORALERTA;

  /**
   * Un objeto que contiene los textos de alerta.
   * Este objeto se utiliza para mostrar mensajes de alerta en el componente.
  */
  public TEXTO_ACUERDO_P_COSTO = COSTO_NETO_VALOR_FOB;

    /**
   * Un objeto que contiene los textos de alerta.
   * Este objeto se utiliza para mostrar mensajes de alerta en el componente.
  */
  public TEXTO_MOSTRAR_TIPO_METODO = TIPO_METODO;

 /**
   * Un objeto que contiene los textos de alerta.
   * Este objeto se utiliza para mostrar mensajes de alerta en el componente.
  */
  public TEXTO_MOSTRAR_TIPO_METODO_PANAMA = TIPO_METODO_PANAMA;
  /**
   * Una instancia de FormGroup que representa el formulario para Mercancia (bienes).
   * Este formulario se utiliza para capturar y validar los datos relacionados con Mercancia.
   */
  public formMercancia!: FormGroup;

  /**
   * Una instancia de FormGroup que representa el formulario para evaluar Mercancia (bienes).
   * Este formulario se utiliza para capturar y validar los datos relacionados con Mercancia.
   */
  public formEvaluarMercancia!: FormGroup;
  
  /**
   * **Subject para manejar la destrucción del componente**
   * 
   * Este `Subject` se utiliza para cancelar suscripciones y evitar 
   * fugas de memoria cuando el componente es destruido.
   * Se usa comúnmente en el operador `takeUntil` dentro de los observables.
   */
  private destroy$ = new Subject<void>();
  /**
   * Indica si el formulario está en modo solo lectura.
   * Cuando es `true`, los campos del formulario no se pueden editar.
   */
  public esFormularioSoloLectura: boolean = false;
/**
   * Indica si el formulario se va editar.
   */
  public modifcacion: boolean = false;
  /**
   * Una constante que contiene la cadena de mensaje requerida.
   * Este mensaje se utiliza para indicar que un campo es obligatorio.
   */
  public MENSAJE_REQUERIDO = REQUERIDO;

  /**
   * Una constante que contiene el mensaje de error para el campo de número.
   * Este mensaje se utiliza para indicar que un campo debe ser un número.
   */
  public NUMERO_REQUERIDO = INTRODUZCA_NUMERO;

  /**
   * Mensaje juegos y surtidos alianza.
   * Este mensaje se utiliza para indicar que un campo debe ser un número.
   */
  public ALIANZA_JUEGOS= ALIANZA_JUEGOS_SURTIDOS;
  /**
   * apiDatosDeRespuesta se utiliza para obtener datos del nombre de archivo JSON ficticio como mercancia.json
   */
  public apiDatosDeRespuesta = mercancia;
  /**
   * Representa el estado actual de la solicitud para el trámite 110101.
   * Esta propiedad contiene toda la información relevante sobre la solicitud del solicitante,
   * encapsulada en la interfaz `Solicitante110101State`.
   */
  public solicitudeState!: Solicitante110101State;

  /**
   * Título que se muestra en el modal para agregar mercancías.
   * Se actualiza dinámicamente según el tipo de mercancía seleccionada (insumos o envases).
   *
   * @type {string}
   * @default 'Insumo'
   * @example
   * this.modal = 'Insumos (materias primas, partes y piezas)';
   */
  public modal: string = 'Insumo';

  /**
   * Instancia del modal de Bootstrap utilizada para abrir y cerrar el diálogo de agregar o editar mercancías.
   * Se inicializa al abrir el modal y se utiliza para controlar su visibilidad desde el componente.
   *
   * @type {Modal}
   * @private
   * @memberof DatosMercanciaComponent
   * @example
   * this.modalInstance.show();
   * this.modalInstance.hide();
   */
  private modalInstance!: Modal;

  /**
   * Propiedad que mantiene el estado actual de la consulta dentro del componente.
   */
  public consultaState!: ConsultaioState;

  /**
   * Datos de la mercancía obtenidos del servicio de respuesta.
   */
  public mercanciaEvaluarData!: EvaluarMercanciaResponse;

  /** Indica si se debe mostrar el select de peso */
  public mostrarSelectPeso: boolean = false;

  /** Indica si se debe mostrar mensaje que faltan registros */
  public validacionInsumo: boolean = false;

  /** Catálogo de unidades de medida comercial */
  public unidadMedidaComercial: Catalogo[] = [];

  /**
   * Configuración de los campos a mostrar en el formulario de evaluación de mercancía.
   */
  camposEvaluar: CampoEvaluar[] = [
  { section: 'Datos de la mercancía' },

  { label: 'Nombre comercial de la mercancía', controlName: 'nombreComercialEvaluar', placeholder: 'Nombre comercial de la mercancía (igual que en la factura)', col: 12 },
  { label: 'Nombre en inglés', controlName: 'nombreInglesEvaluar', placeholder: 'Nombre en inglés', col: 6 },
  { label: 'Fracción arancelaria', controlName: 'fraccionArancelariaEvaluar', placeholder: 'Fracción arancelaria', col: 6 },
  { label: 'Nombre técnico', controlName: 'nombreTecnicoEvaluar', placeholder: 'Nombre técnico', col: 8 },
  { label: 'Precio franco fábrica', controlName: 'precioFrancoFabricaEvaluar', placeholder: 'Precio franco fábrica', col: 4 },
  { label: 'Valor transacción', controlName: 'valorTransaccionEvaluar', placeholder: 'Valor transacción', col: 4 },
  { label: 'Costo neto (en dólares)', controlName: 'costoNetoEvaluar', placeholder: 'Costo neto (en dólares)', col: 4 },
  { label: 'Costo neto AP', controlName: 'costoNetoAPEvaluar', placeholder: 'Costo neto AP', col: 4 },
  { label: 'Descripción juego', controlName: 'descripcionJuegoEvaluar', placeholder: 'Descripción juego', col: 4 },
  { label: 'Tipo Exportador', controlName: 'tipoExportadorEvaluar', placeholder: 'Tipo Exportador', col: 4 },
  { label: '¿Desea usar la opción del método de separación contable?', controlName: 'separacionContableEvaluar',
    type: 'radio', options: [{ label: 'Sí', value: true }, { label: 'No', value: false }], col: 12 },

  { section: 'Certificado Origen Titulo Mercancia A L A D I', sectionKey: 'aladi' },

  { label: 'Valor Transaccional (Base FOB)', controlName: 'valorTransaccionalFOBEvaluar', placeholder: 'Valor Transaccional (Base FOB)', col: 4 },
  { label: 'Clásificación NALADI', controlName: 'clasificacionNALADIEvaluar', placeholder: 'Clasificación NALADI', col: 4 },
  { label: 'Descripción NALADI', controlName: 'descripcionNALADIEvaluar', placeholder: 'Descripción NALADI', col: 8 },
  { label: 'Clasificación NALADISA 1993', controlName: 'clasificacionNALADISA1993Evaluar', placeholder: 'Clasificación NALADISA 1993', col: 4 },
  { label: 'Descripción NALADISA 1993', controlName: 'descripcionNALADISA1993Evaluar', placeholder: 'Descripción NALADISA 1993', col: 8 },
  { label: 'Clasificación NALADISA 1996', controlName: 'clasificacionNALADISA1996Evaluar', placeholder: 'Clasificación NALADISA 1996', col: 4},
  { label: 'Descripción NALADISA 1996', controlName: 'descripcionNALADISA1996Evaluar', placeholder: 'Descripción NALADISA 1996', col: 8 },
  { label: 'Clasificación NALADISA 2002', controlName: 'clasificacionNALADISA2002Evaluar', placeholder: 'Clasificación NALADISA 2002', col: 4},
  { label: 'Descripción NALADISA 2002', controlName: 'descripcionNALADISA2002Evaluar', placeholder: 'Descripción NALADISA 2002', col: 8 }
];

  /** Variable para validar el formulario */
  validarFormulario: boolean = false;

  /**
 * constructor de la clase
 * Fetch the fetchtiposDocumentos datos
 * Crea el formulario
 * @param fb: constructor de formularios
 * @param validacionesService: Validaciones comunes del formulario.
 */
  constructor(private fb: FormBuilder,
    private validacionesService: ValidacionesFormularioService,
    private tramite110101Store: Tramite110101Store,
    private solicitanteQuery: Solicitante110101Query,
    private consultaioQuery: ConsultaioQuery,
    private datosMercanciaService: DatosMercanciaService,
    private catalogosTramiteService: CatalogosTramiteService,
    private mercanciaSolcitudService: MercanciaSolicitudService,
    private cd: ChangeDetectorRef,
    private mensajeService: MensajePantallaService
  ) {
    this.consultaioQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroy$),
        map((seccionState) => {
          this.esFormularioSoloLectura = seccionState.readonly;
          this.consultaState = seccionState;
        })
      )
      .subscribe();
  }

  /**
   * Método de ciclo de vida de Angular que se ejecuta al inicializar el componente.
   * Rellena el formulario con los datos de la API.
   */

  ngOnInit(): void {
    this.solicitanteQuery.selectSolicitante$.pipe(takeUntil(this.destroy$),map((seccionState) => {
        this.solicitudeState = seccionState;
      })).subscribe();
    this.inicializarFormulario();
    this.actualizarValidadores();
    this.formMercancia.get('valorMetodoRadioP')?.valueChanges
    .pipe(takeUntil(this.destroy$))
    .subscribe(() => this.actualizarValidadores());
    
    if (this.solicitudeState.insumosTablaDatos?.length || this.solicitudeState.envasesTablaDatos?.length) {
      this.insumosTablaDatos = this.solicitudeState.insumosTablaDatos;
      this.envasesTablaDatos = this.solicitudeState.envasesTablaDatos;
      this.catalogoPais();
    }

    
    const FRACCION = this.formMercancia.get('fraccionArancelaria');

    if (FRACCION) {
      const INPUT = document.getElementById('fraccionArancelaria');
      if (INPUT) {
        fromEvent(INPUT, 'blur')
          .pipe(takeUntil(this.destroy$))
          .subscribe(() => {
            this.validarFraccionArancelaria();
          });
      }
    }
    this.inicializarFormularioEvaluar();
    if(this.esFormularioSoloLectura === true){
      this.mercanciaEvaluar();
    }
    //Validar tabla aun que este valido formulario
    if(this.solicitudeState?.validacion_formularios?.validacion_tab_mercancia === true){
       if(this.solicitudeState.respuestaServiceConfiguracion.mostrar_insumos === true){
         if(this.solicitudeState.insumosTablaDatos.length === 0){
         this.mensajeService.mostrarMensaje(true);
         this.validacionInsumo = true;
       }
      }
    }
    //validacion para cuando de tab sin el boton de continuar
    if (this.solicitudeState?.validacion_formularios?.validacion_tab_mercancia === false) {
      this.formMercancia.markAllAsTouched();
      this.mensajeService.mostrarMensaje(true);
      if(this.solicitudeState.respuestaServiceConfiguracion.mostrar_insumos === true){
         if(this.solicitudeState.insumosTablaDatos.length === 0){
         this.mensajeService.mostrarMensaje(true);
         this.validacionInsumo = true;
       }
      }
      
    }

    // Inicializa la validación si aún no existe
    if (this.solicitudeState.validacion_formularios.validacion_tab_mercancia === null) {
      this.tramite110101Store.setValidacionFormulario('validacion_tab_mercancia', this.validarFormulario);
    }
    this.formMercancia.statusChanges
      .pipe(
        takeUntil(this.destroy$),
        tap((_value) => {
          this.validarFormulario = this.formMercancia.valid;
          this.tramite110101Store.setValidacionFormulario('validacion_tab_mercancia', this.validarFormulario);
        })
      )
      .subscribe();

    this.mensajeService.tocarFormulario$
    .pipe(takeUntil(this.destroy$))
    .subscribe(() => {
      this.formMercancia.markAllAsTouched();
      if(this.solicitudeState.respuestaServiceConfiguracion.mostrar_insumos === true){
        if(this.solicitudeState.insumosTablaDatos.length === 0){
        this.validacionInsumo = true;
       }
      }
    });
  }

  /**
   * Suscribe a los cambios en el campo `fraccionArancelaria` dentro del
   * FormGroup hijo `ninoFormGroup` y realiza la consulta arancelaria
   * correspondiente cuando el valor cambie. Se ejecuta después de que
   * la vista y sus hijos han sido inicializados.
   */
  ngAfterViewInit(): void {
    const FRACCIONCONTROL = this.ninoFormGroup.get('fraccionArancelariaModal');
    if (!FRACCIONCONTROL) {
      return;
    }
    const INPUTELEMENT = document.getElementById('fraccionArancelariaModal');
    if (INPUTELEMENT) {
      fromEvent(INPUTELEMENT, 'blur')
        .pipe(takeUntil(this.destroy$))
        .subscribe(() => {
          const VALOR = FRACCIONCONTROL.value;
          if (VALOR && VALOR.trim() !== '') {
            this.consultaArancelariaPartida(VALOR);
          }
        });
    }
  }


  /**
   * Inicializa el formulario reactivo `formMercancia` con los valores predeterminados de `solicitudeState`.
   * Configura los controles del formulario para nombre comercial, nombre en inglés, fracción arancelaria, descripción y valor de transacción,
   * aplicando los validadores apropiados como campos requeridos, longitud máxima y coincidencia de patrones.
   * El campo descripción se inicializa como deshabilitado.
   */
  public inicializarFormulario(): void {
    this.formMercancia = this.fb.group({
      valorMetodoRadioUruguayPanama:[this.solicitudeState?.valorMetodoRadioUruguayPanama],
      valorMetodoRadioPanama:[this.solicitudeState?.valorMetodoRadioPanama],
      valorMetodoRadioP:[this.solicitudeState?.valorMetodoRadioP],
      nombreComercial: [this.solicitudeState?.nombreComercial],
      nombreIngles: [this.solicitudeState?.nombreIngles],
      fraccionArancelaria: [this.solicitudeState?.fraccionArancelaria],
      descripcion: [{value: this.solicitudeState?.descripcion, disabled: true}],
      clasificacionNaladi: [this.solicitudeState?.clasificacionNaladi],
      clasificacionNaladi1993: [this.solicitudeState?.clasificacionNaladi1993],
      clasificacionNaladi1996: [this.solicitudeState?.clasificacionNaladi1996],
      clasificacionNaladi2002: [this.solicitudeState?.clasificacionNaladi2002],
      valorTransaccion: [this.solicitudeState?.valorTransaccion],
      unidadMedidaPeso: [this.solicitudeState?.unidadMedidaPeso],
      francofabrica:[this.solicitudeState?.francofabrica],
      costoNetoDolares:[this.solicitudeState?.costoNetoDolares],
      valorFobDolares:[this.solicitudeState?.valorFobDolares],
    });
  }

  /**
   * Actualiza dinámicamente los validadores del formulario basándose en la configuración del servicio.
   * Configura validadores requeridos para campos que deben mostrarse según las banderas de configuración,
   * y ajusta las validaciones para campos condicionales como FOB y Costo Neto basados en la selección del método.
   * Finalmente actualiza el estado de validación de todos los controles del formulario.
   */
  private actualizarValidadores(): void {
  const F = this.formMercancia;

  // -----------------------
  // Método de cálculo de valor
  // -----------------------
  if (this.solicitudeState.respuestaServiceConfiguracion.mostrar_tipo_metodo === true || this.solicitudeState.respuestaServiceConfiguracion.mostrar_tipo_metodo_panama_uruguay === true) {
    F.get('valorMetodoRadioUruguayPanama')?.setValidators([Validators.required]);
  } else {
    F.get('valorMetodoRadioUruguayPanama')?.clearValidators();
  }

  if (this.solicitudeState.respuestaServiceConfiguracion.mostrar_tipo_metodo_panama=== true ||
      this.solicitudeState.respuestaServiceConfiguracion.mostrar_tipo_metodo_panama_uruguay=== true) {
    F.get('valorMetodoRadioPanama')?.setValidators([Validators.required]);
  } else {
    F.get('valorMetodoRadioPanama')?.clearValidators();
  }


  // -----------------------
  // Campos de texto
  // -----------------------
  F.get('nombreComercial')?.setValidators([Validators.required]);

  if (this.solicitudeState.respuestaServiceConfiguracion.mostrar_nombre_ingles === true) {
    F.get('nombreIngles')?.setValidators([Validators.required]);
  } else {
    F.get('nombreIngles')?.clearValidators();
  }

  F.get('fraccionArancelaria')?.setValidators([
    Validators.maxLength(8),
    Validators.pattern(REGEX_SOLO_NUMEROS),
    Validators.required
  ]);

  // descripción siempre está deshabilitada, no requiere validación
  F.get('descripcion')?.clearValidators();

  // -----------------------
  // NALADI
  // -----------------------
  if (this.solicitudeState.respuestaServiceConfiguracion.mostrar_naladi === true) {
    F.get('clasificacionNaladi')?.setValidators([Validators.required]);
  } else {
    F.get('clasificacionNaladi')?.clearValidators();
  }

  if (this.solicitudeState.respuestaServiceConfiguracion.mostrar_naladisa_93 === true) {
    F.get('clasificacionNaladi1993')?.setValidators([Validators.required]);
  } else {
    F.get('clasificacionNaladi1993')?.clearValidators();
  }

  if (this.solicitudeState.respuestaServiceConfiguracion.mostrar_naladisa_96 === true) {
    F.get('clasificacionNaladi1996')?.setValidators([Validators.required]);
  } else {
    F.get('clasificacionNaladi1996')?.clearValidators();
  }

  if (this.solicitudeState.respuestaServiceConfiguracion.mostrar_naladisa_02 === true) {
    F.get('clasificacionNaladi2002')?.setValidators([Validators.required]);
  } else {
    F.get('clasificacionNaladi2002')?.clearValidators();
  }

  // -----------------------
  // Valor de transacción
  // -----------------------
  if (this.solicitudeState.respuestaServiceConfiguracion.mostrar_valor_transaccional_fob === true || F.get('valorMetodoRadioPanama')?.value === 'TIMET.VT' || F.get('valorMetodoRadioUruguayPanama')?.value === 'TIMET.VT') {
    F.get('valorTransaccion')?.setValidators([Validators.maxLength(20), Validators.required]);
  } else {
    F.get('valorTransaccion')?.clearValidators();
  }

  // -----------------------
  // Precio franco fábrica
  // -----------------------
  if (this.solicitudeState.respuestaServiceConfiguracion.mostrar_precio_franco_fabrica === true) {
    F.get('francofabrica')?.setValidators([Validators.maxLength(20), Validators.required]);
  } else {
    F.get('francofabrica')?.clearValidators();
  }

  // -----------------------
  // FOB / Costo Neto
  // -----------------------
  const VALORMETODOP = F.get('valorMetodoRadioP')?.value;

  if (VALORMETODOP === 'TIMET.FO' || this.solicitudeState.materiales_fungibles_ap === true) {
    // Activar validadores de FOB
    F.get('valorFobDolares')?.setValidators([Validators.maxLength(20), Validators.required]);

    // Desactivar y limpiar costo neto
    F.get('costoNetoDolares')?.clearValidators();
    F.get('costoNetoDolares')?.reset();
    F.get('costoNetoDolares')?.updateValueAndValidity({ emitEvent: true });

  } else if (VALORMETODOP === 'TIMET.CN' || F.get('valorMetodoRadioPanama')?.value === 'TIMET.CN' || F.get('valorMetodoRadioUruguayPanama')?.value === 'TIMET.CN' || this.solicitudeState.respuestaServiceConfiguracion.mostrar_costo_neto_fob === true) {
    // Activar validadores de Costo Neto
    F.get('costoNetoDolares')?.setValidators([Validators.maxLength(20), Validators.required]);

    // Desactivar y limpiar FOB
    F.get('valorFobDolares')?.clearValidators();
    F.get('valorFobDolares')?.reset();
    F.get('valorFobDolares')?.updateValueAndValidity({ emitEvent: true });

  } else {
    // Caso en que no aplica ninguno
    F.get('valorFobDolares')?.clearValidators();
    F.get('valorFobDolares')?.reset();
    F.get('costoNetoDolares')?.clearValidators();
    F.get('costoNetoDolares')?.reset();
    F.get('valorFobDolares')?.updateValueAndValidity({ emitEvent: true });
    F.get('costoNetoDolares')?.updateValueAndValidity({ emitEvent: true });
  }
  
  // -----------------------
  // Actualizar estado de todos los controles
  // -----------------------
  Object.values(F.controls).forEach(ctrl => ctrl.updateValueAndValidity({ onlySelf: true, emitEvent: false }));
}


  /**
   * @method inicializarFormularioEvaluar
   * @description
   * Inicializa el formulario reactivo `formEvaluarMercancia`, el cual se utiliza para
   * capturar y evaluar la información relacionada con una mercancía.  
   * Cada control representa un campo específico de la ficha técnica o clasificación del producto.
   */
  public inicializarFormularioEvaluar(): void {
    this.formEvaluarMercancia = this.fb.group({
      nombreComercialEvaluar: [{value: '', disabled: true}],
      nombreInglesEvaluar: [{value: '', disabled: true}],
      fraccionArancelariaEvaluar: [{value: '', disabled: true}],
      nombreTecnicoEvaluar: [{value: '', disabled: true}],
      precioFrancoFabricaEvaluar: [{value: '', disabled: true}],
      valorTransaccionEvaluar: [{value: '', disabled: true}],
      costoNetoEvaluar: [{value: '', disabled: true}],
      costoNetoAPEvaluar: [{value: '', disabled: true}],
      descripcionJuegoEvaluar: [{value: '', disabled: true}],
      tipoExportadorEvaluar: [{value: '', disabled: true}],
      separacionContableEvaluar: [{value: null, disabled: true}],
      valorTransaccionalFOBEvaluar: [{value: '', disabled: true}],
      clasificacionNALADIEvaluar: [{value: '', disabled: true}],
      descripcionNALADIEvaluar: [{value: '', disabled: true}],
      clasificacionNALADISA1993Evaluar: [{value: '', disabled: true}],
      descripcionNALADISA1993Evaluar: [{value: '', disabled: true}],
      clasificacionNALADISA1996Evaluar: [{value: '', disabled: true}],
      descripcionNALADISAEvaluar: [{value: '', disabled: true}],
      clasificacionNALADISA2002Evaluar: [{value: '', disabled: true}],
      descripcionNALADISA2002Evaluar: [{value: '', disabled: true}]
    });
  }


  /**
   * Establece el valor de un campo en el store de Tramite31601.
   * @param form - El grupo de formularios que contiene el campo.
   * @param campo - El nombre del campo cuyo valor se va a establecer.
   * @param metodoNombre - El nombre del método en el store que se utilizará para establecer el valor.
   */
  public setValoresStore(form: FormGroup, campo: string, metodoNombre: keyof Tramite110101Store): void {
    let VALOR = form.get(campo)?.value;
  
  // Para campos decimales, aplicar formato antes de guardar
  if (campo === 'valorFobDolares' || campo === 'costoNetoDolares' || 
      campo === 'valorTransaccion' || campo === 'francofabrica') {
    
    if (VALOR && typeof VALOR === 'string') {
      // Aplicar el mismo formato que en el HTML
      if (VALOR.includes('.')) {
        VALOR = VALOR.padEnd(VALOR.indexOf('.') + 5, '0');
      } else if (VALOR) {
        VALOR = VALOR + '.0000';
      }
    }
  }
  
  (this.tramite110101Store[metodoNombre] as (value: unknown) => void)(VALOR);
  }
  /**
   * @method listaDeFilaSeleccionadaInsumos
   * @description
   * Actualiza el arreglo de filas seleccionadas en la tabla de pago de derechos.
   * Este método se utiliza para almacenar las filas seleccionadas por el usuario,
   * permitiendo realizar operaciones como la eliminación de registros.
   *
   * @param {InsumosTabla[]} event - Arreglo de filas seleccionadas.
   */
  listaDeFilaSeleccionadaInsumos(event: InsumosTabla[]): void {
    this.listaSeleccionadasInsumos = [];
    this.listaSeleccionadasInsumos = event;
  }

  /**
   * @method listaDeFilaSeleccionadaEnvases
   * @description
   * Actualiza el arreglo de filas seleccionadas en la tabla de pago de derechos.
   * Este método se utiliza para almacenar las filas seleccionadas por el usuario,
   * permitiendo realizar operaciones como la eliminación de registros.
   *
   * @param {EnvasesTabla[]} event - Arreglo de filas seleccionadas.
   */
  listaDeFilaSeleccionadaEnvases(event: EnvasesTabla[]): void {
    this.listaSeleccionadasEnvases = [];
    this.listaSeleccionadasEnvases = event;
  }

  /**
   * Abre el modal para agregar mercancías.
   */
  abrirDialogo(event: string): void {
    this.mostrarRFC = false;
    this.ninoFormGroup.get('rfc')?.reset();
    if(this.modifcacion === false){
      this.limpiarDialogo();
      this.catalogoPais();
    }
      this.tablaDatos = (this.solicitudeState?.respuestaServicioDatosTabla ?? [])
        .filter(item => item.cve_grupo_criterio === 'OTROS')
        .map(item => ({
          id_criterio_tratado: item.id_criterio_tratado ?? undefined,
          id_bloque: item.id_bloque ?? null,
          id_tratado_acuerdo: item.id_tratado_acuerdo ?? undefined,
          cve_grupo_criterio: item.cve_grupo_criterio ?? undefined,
          nombre_pais_bloque: item.nombre_pais_bloque ?? '',
          tratado_nombre: item.tratado_nombre ?? '',
          cve_pais: item.cve_pais ?? null,
          mensaje_agregado: item.mensaje_agregado ?? null,
          cve_tratado_acuerdo: item.cve_tratado_acuerdo ?? null,
          cve_tratado_acuerdo_bloque: item.cve_tratado_acuerdo_bloque
      }));
    this.modal = event;
    if (this.modalElement) {
      this.modalInstance = new Modal(this.modalElement.nativeElement);
      this.modalInstance?.show();
    }
  }

  /**
   * Cierra el modal de agregar o editar mercancías.
   * Utiliza la instancia del modal de Bootstrap para ocultar el diálogo actualmente abierto.
   *
   * @example
   * this.cerrarDialogo();
   * // El modal se oculta.
   */
  cerrarDialogo(): void {
    this.modalInstance?.hide();
  }

  /**
   * Limpia y restablece todos los campos del formulario principal `forma` a su estado inicial.
   * Este método se utiliza para borrar los datos ingresados por el usuario y dejar el formulario listo para una nueva captura.
   *
   * @example
   * this.limpiarDialogo();
   * // El formulario se restablece a sus valores iniciales.
   */
  limpiarDialogo(): void {
    this.forma.reset();
  }
  
  /**
   * Agrega o actualiza un registro en la tabla de insumos o envases según el tipo de modal abierto.
   * Si el formulario es válido, busca si el elemento ya existe en la tabla (por nombre técnico).
   * Si existe, lo actualiza; si no, lo agrega como nuevo.
   * Para insumos, toma el valor de transacción desde el formulario principal.
   * Para envases, toma el valor en dólares desde el grupo de formulario de envases.
   * Al finalizar, cierra el diálogo. Si el formulario no es válido, marca todos los campos como tocados.
   *
   * @example
   * this.agregar();
   * // Agrega o actualiza el registro en la tabla correspondiente.
   */

  agregar(): void {
    if (!this.ninoFormGroup.valid) {
      this.ninoFormGroup.markAllAsTouched();
      return;
    }
    if (this.modal === 'Insumo') {
      this.validarInsumoOempaque('Insumo');
    } else {
      this.validarInsumoOempaque('Empaque');
    }
    this.cerrarDialogo();
  }

  /**
   * @method datoNull
   * @description Convierte cadenas vacías o valores `undefined` en `null` para uniformidad en el payload.
   * @param {string | null | undefined} value - Valor a evaluar.
   * @returns {string | null} `null` si el valor es vacío o undefined; en caso contrario regresa el valor original.
   */
  private static datoNull(value: string | null | undefined): string | null {
    return value === '' || value === undefined ? null : value;
  }
    

/**
 * @method validarInsumoOempaque
 * @description
 * Valida un insumo o empaque según el tipo especificado, construyendo un payload con los datos del formulario
 * y realizando una petición al servicio correspondiente. Maneja la respuesta mostrando notificaciones
 * al usuario en caso de error.
 * 
 * @param { 'Insumo' | 'Empaque' } tipo - Tipo de validación a realizar: 'Insumo' o 'Empaque'
 * @returns {void}
 */
  validarInsumoOempaque(tipo: 'Insumo' | 'Empaque'): void {
   if(this.modifcacion === true){
    if (tipo === 'Insumo' && this.listaSeleccionadasInsumos.length > 0) {
    const SELECCIONADO = this.listaSeleccionadasInsumos[0];
    this.insumosTablaDatos = this.insumosTablaDatos.filter(
      item => item.nombreTecnico !== SELECCIONADO.nombreTecnico
           || item.proveedor !== SELECCIONADO.proveedor
           || item.fraccionArancelaria !== SELECCIONADO.fraccionArancelaria
    ); 
     } else if (tipo === 'Empaque' && this.listaSeleccionadasEnvases.length > 0) {
    const SELECCIONADO = this.listaSeleccionadasEnvases[0];
    this.envasesTablaDatos = this.envasesTablaDatos.filter(
      item => item.nombreTecnico !== SELECCIONADO.nombreTecnico
           || item.proveedor !== SELECCIONADO.proveedor
           || item.fraccionArancelaria !== SELECCIONADO.fraccionArancelaria
    );
  }
   }
    const PAIS_DESC = this.paisOrigen.find(item => item.clave === this.ninoFormGroup.get('pais')?.value);
    // Construcción base del payload
    const PAYLOAD: InsumoTratadosRequest = {
      insumo: {
        id_solicitud: null,
        nombre: DatosMercanciaComponent.datoNull(this.ninoFormGroup.get('nombreTecnico')?.value),
        desc_fabricante_productor: DatosMercanciaComponent.datoNull(this.ninoFormGroup.get('fabricante')?.value),
        desc_proveedor: DatosMercanciaComponent.datoNull(this.ninoFormGroup.get('proveedor')?.value),
        cve_fraccion: DatosMercanciaComponent.datoNull(this.ninoFormGroup.get('fraccionArancelariaModal')?.value),
        imp_valor: this.ninoFormGroup.get('valorDolares')?.value,
        ide_tipo_insumo: this.modal === 'Insumo' ? 'TIPIN.02' : 'TIPIN.01',
        //Aveces esta oculto 
        peso: Number(DatosMercanciaComponent.datoNull(this.ninoFormGroup.get('peso')?.value)),
        //Combo
        cve_pais: DatosMercanciaComponent.datoNull(PAIS_DESC?.clave),
        volumen: null,
        // Aveces sale
        rfc_fabricante_productor: DatosMercanciaComponent.datoNull(this.ninoFormGroup.get('rfc')?.value),
      
        tratados_originarios: this.filasSeleccionadas.map(fila => ({
          id_criterio_tratado: fila.id_criterio_tratado ?? 0, 
          id_solicitud: 0, 
          id_tratado_acuerdo: fila.id_tratado_acuerdo ?? 0,
          cve_tratado_acuerdo: fila.cve_tratado_acuerdo ?? '',
          clave_pais: fila.cve_pais ?? '',
          clave_bloque: fila.id_bloque !== null && fila.id_bloque !== undefined 
               ? fila.id_bloque.toString() 
               : null,
        })),
        fraccion_arancelaria_prevalidada: false
      },
      mercancia: {
        id_solicitud: null,
        peso_es_requerido: this.solicitudeState.validacionFraccionArancelaria.mercancia.peso_es_requerido,
        volumen_es_requerido: this.solicitudeState.validacionFraccionArancelaria.mercancia.volumen_es_requerido,
      },
      tratados_seleccionados_insumo: this.solicitudeState?.respuestaServicioDatosTabla.map(item => ({
        id_criterio_tratado: item.id_criterio_tratado,
        id_tratado_acuerdo: item.id_tratado_acuerdo,
        cve_tratado_acuerdo: item.cve_tratado_acuerdo ?? '',
        clave_pais: item.cve_pais ?? '',
        clave_bloque: item.id_bloque?.toString() ?? null,
        cve_grupo_criterio: item.cve_grupo_criterio
      }))
    };

    const PETICION = tipo === 'Insumo'
      ? this.datosMercanciaService.postValidarInsumo(PAYLOAD)
      : this.datosMercanciaService.postValidarEmpaque(PAYLOAD);
    PETICION
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          if (response.codigo === CodigoRespuesta.EXITO) {
            this.mostrarTabla = false;
            if (tipo === 'Insumo') {
               this.insumosTablaDatos.push({
                nombreTecnico: this.ninoFormGroup.get('nombreTecnico')?.value ?? '',
                proveedor: this.ninoFormGroup.get('proveedor')?.value ?? '',
                fabricanteOProductor: this.ninoFormGroup.get('fabricante')?.value ?? '',
                rfc: this.ninoFormGroup.get('rfc')?.value ?? '',
                fraccionArancelaria:this.ninoFormGroup.get('fraccionArancelariaModal')?.value ?? '',
                valorEnDolares: this.ninoFormGroup.get('valorDolares')?.value ?? 0,
                paisDeOrigen: PAIS_DESC?.descripcion ?? '',
                //No se sabe de donde sale 
                peso: PAYLOAD.insumo.peso,
                volumen: PAYLOAD.insumo.volumen,
                cvePais: PAIS_DESC?.clave
              });
              this.tramite110101Store.clearInsumos();
              this.tramite110101Store.addInsumo(this.insumosTablaDatos);
              this.tramite110101Store.clearInsumosCriterios();
              this.tramite110101Store.addInsumoCriterios(this.filasSeleccionadas);
              this.validacionInsumo = false;
              this.mensajeService.mostrarMensaje(false);
            }else{
              this.envasesTablaDatos.push({
                 nombreTecnico: this.ninoFormGroup.get('nombreTecnico')?.value ?? '',
                proveedor: this.ninoFormGroup.get('proveedor')?.value ?? '',
                fabricanteOProductor: this.ninoFormGroup.get('fabricante')?.value ?? '',
                rfc: this.ninoFormGroup.get('rfc')?.value ?? '',
                fraccionArancelaria:this.ninoFormGroup.get('fraccionArancelariaModal')?.value ?? '',
                valorEnDolares: this.ninoFormGroup.get('valorDolares')?.value ?? 0,
                paisDeOrigen: PAIS_DESC?.descripcion ?? '',
                //No se sabe de donde sale 
                peso: PAYLOAD.insumo.peso,
                volumen: PAYLOAD.insumo.volumen,
                cvePais: PAIS_DESC?.clave
              });
              this.tramite110101Store.clearEmpaques();
              this.tramite110101Store.addEmpaque(this.envasesTablaDatos);
              this.tramite110101Store.clearEmpaquesCriterios();
              this.tramite110101Store.addEmpaqueCriterios(this.filasSeleccionadas);
            }
           
           this.cd.detectChanges();
          this.mostrarTabla = true;
          this.ninoFormGroup.reset();
          } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            this.nuevaNotificacion = {
              tipoNotificacion: 'toastr',
              categoria: CategoriaMensaje.ERROR,
              modo: 'action',
              titulo: response.error || 'Error al validar.',
              mensaje: response.causa || response.mensaje || 'Error al validar.',
              cerrar: false,
              txtBtnAceptar: '',
              txtBtnCancelar: '',
            };
          }
          this.filasSeleccionadas = [];
        },
        error: (error) => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
          const MENSAJE = error?.error?.error || 'Error al validar.';
          this.nuevaNotificacion = {
            tipoNotificacion: 'toastr',
            categoria: CategoriaMensaje.ERROR,
            modo: 'action',
            titulo: '',
            mensaje: MENSAJE,
            cerrar: false,
            txtBtnAceptar: '',
            txtBtnCancelar: '',
          };
        }
      });
  }

  /**
   * @method catalogoPais
   * @description
   * Obtiene el catálogo de países activos desde el servicio y los transforma al formato requerido
   * por la aplicación. Maneja errores mostrando notificaciones al usuario.
   * 
   * @returns {void}
   */
  catalogoPais(): void {
    this.catalogosTramiteService.getCatPaises()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          if (response.codigo === CodigoRespuesta.EXITO) {
            
            const DATOS = response.datos || [];

          // Transformación a tu respuesta a response Catalogo
          this.paisOrigen = DATOS.map((item, index) => ({
            id: index + 1,
            descripcion: item.descripcion,
            clave: item.clave,
          }));
        }else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
          this.nuevaNotificacion = {
            tipoNotificacion: 'toastr',
            categoria: CategoriaMensaje.ERROR,
            modo: 'action',
            titulo: response?.error || 'Error paises activos.',
            mensaje: response?.causa || response?.mensaje || 'Error paises activos',
            cerrar: false,
            txtBtnAceptar: '',
            txtBtnCancelar: '',
          };
        }
      },
      error: (err) => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        const MENSAJE = err?.error?.error || 'Error paises activos.';
        this.nuevaNotificacion = {
          tipoNotificacion: 'toastr',
          categoria: 'error',
          modo: 'action',
          titulo: '',
          mensaje: MENSAJE,
          cerrar: false,
          txtBtnAceptar: '',
          txtBtnCancelar: '',
        }
      }
    });
  }


  /**
   * Maneja el cambio de selección en la tabla de tratados con criterios.
   * @param filaSeleccionadas - Array de registros seleccionados en la tabla.
   */
  onSeleccionChange(filaSeleccionadas: DatosMercanciaModalTabla[]) :void{
     this.filasSeleccionadas = [...filaSeleccionadas]; 
  }

  /**
   * @method validarFraccionArancelaria
   * @description Valida una fracción arancelaria mediante una petición POST al servicio correspondiente.
   * Construye un payload con la fracción arancelaria del formulario y datos predefinidos para la validación.
   * Si la respuesta es exitosa, actualiza la descripción en el formulario de mercancía.
   * En caso de error, muestra una notificación con el mensaje correspondiente y desplaza la vista al inicio de la página.
   * 
   * @returns {void}
 */
  validarFraccionArancelaria(): void {
    const PAYLOAD: FraccionValidarRequest = {
      clave_fraccion_arancelaria:  this.formMercancia.get('fraccionArancelaria')?.value,
      //Se manda en duro de momento
      tipo_fraccion_arancelaria: 'TIFR.TIGIE',
      mercancia: {
        //Todavia no se sabe 
        id_descripcion_alterna_ue: null,
        id_descripcion_alterna_aelc: null,
        id_descripcion_alterna_sgp: null,
        id_descripcion_alterna_ace: null,
        //mandar siempre false de momento
        requiere_juegos_o_surtidos: false,
        peso_es_requerido: false,
        volumen_es_requerido: false,

        //nuevos campos flujo alterno
        fraccion_naladi:  this.formMercancia.get('clasificacionNaladi')?.value,
        fraccion_naladisa93: this.formMercancia.get('clasificacionNaladi1993')?.value,
        fraccion_naladisa96: this.formMercancia.get('clasificacionNaladi1996')?.value,
        fraccion_naladisa02: this.formMercancia.get('clasificacionNaladi2002')?.value,
        //ultimo tab
        tipo_proceso_mercancia: '',
        //Mismo campo difenre nombre dependiendo del caso
        valo_transaccional_fob: this.ninoFormGroup.get('fraccionArancelariaModal')?.value,
        costo_neto_ap: null
      },
      tratados_seleccionados: this.solicitudeState?.respuestaServicioDatosTabla.map(item => ({
        cve_grupo_criterio: item.cve_grupo_criterio,
        id_bloque: item.id_bloque ?? 0,
        cve_tratado_acuerdo: item.cve_tratado_acuerdo ?? '',
        id_tratado_acuerdo: item.id_tratado_acuerdo,
        cve_pais: item.cve_pais ?? '',
        id_desc_alterna_fraccion: 0,
        // es lo mismo a tipo_proceso_mercancia
        ide_tipo_proceso_mercancia: ''
      }))
    };
    this.datosMercanciaService.postFracccionArancelariaValidar(PAYLOAD)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          if (response.codigo === CodigoRespuesta.EXITO) {
            this.formMercancia.patchValue({
              descripcion: response.datos?.descripcion || '' 
            })
            this.setValoresStore(this.formMercancia, 'descripcion', 'setDescripcion');
            if(response.datos?.has_errors === true){
              this.abrirModal(response.datos.error_message ?? '')
            }
            this.tramite110101Store.clearRespuestaServicioValidarFraccionArancelaria();
            this.tramite110101Store.setRespuestaServicioValidarFraccion(response.datos ?? {} as FraccionValidarResponse);
            this.tramite110101Store.setTabProceso(response.datos?.mercancia.proceso_es_requerido ?? false)

            const PASOREQURIDO = response.datos?.mercancia?.peso_es_requerido ?? false;
            this.mostrarSelectPeso = PASOREQURIDO;
            if(PASOREQURIDO){
              this.formMercancia.get('valorTransaccion')?.reset();
              this.formMercancia.get('valorTransaccion')?.clearValidators();
              this.formMercancia.get('valorTransaccion')?.updateValueAndValidity();

              this.obtenerUnidadMedidaComercial();
              this.agregarCampoPeso();
            }else {
              this.formMercancia.get('unidadMedidaPeso')?.reset();
              this.formMercancia.get('unidadMedidaPeso')?.clearValidators();
              this.formMercancia.get('unidadMedidaPeso')?.updateValueAndValidity();

              this.eliminarCampoPeso();
            }
          } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            this.nuevaNotificacion = {
              tipoNotificacion: 'toastr',
              categoria: CategoriaMensaje.ERROR,
              modo: 'action',
              titulo: response.error || 'Error en la validacion de la fracción arancelaria.',
              mensaje: response.causa || response.mensaje || 'Error en la validacion de la fracción arancelaria.',
              cerrar: false,
              txtBtnAceptar: '',
              txtBtnCancelar: '',
            };
          }
        },
        error: (error) => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
          const MENSAJE = error?.error?.error || 'Error en la validacion de la fracción arancelaria.';
          this.nuevaNotificacion = {
            tipoNotificacion: 'toastr',
            categoria: CategoriaMensaje.ERROR,
            modo: 'action',
            titulo: '',
            mensaje: MENSAJE,
            cerrar: false,
            txtBtnAceptar: '',
            txtBtnCancelar: '',
          };
        }
      });
  }

  /**
   * @method consultaArancelariaPartida
   * @description Consulta la fracción arancelaria de una partida específica. 
   * Utiliza el servicio `DatosMercanciaService` para realizar la consulta.
   * Si la respuesta es exitosa, actualiza los campos del formulario `ninoFormGroup` con los datos obtenidos.
   * En caso de error, muestra una notificación con el mensaje correspondiente.
   * 
   */
  consultaArancelariaPartida(valor: string): void {
    this.datosMercanciaService.getFraccionArancelariaPartida(valor)
    .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          if (response.codigo === CodigoRespuesta.EXITO) {
            this.ninoFormGroup.patchValue({
            capitulo: response.datos?.cve_capitulo_fraccion,
            descripcionCapitulo: response.datos?.nombre_capitulo,
            partida: response.datos?.cve_partida_fraccion,
            descripcionPartida: response.datos?.nombre_partida,
            subpartida: response.datos?.cve_subpartida_fraccion,
            descripcionSubpartida: response.datos?.nombre_subpartida,
            descripcionFraccionArancelaria: response.datos?.descripcion,
          })
        }else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
          this.nuevaNotificacion = {
            tipoNotificacion: 'toastr',
            categoria: CategoriaMensaje.ERROR,
            modo: 'action',
            titulo: response.error || 'Error en la consulta de la fracción arancelaria.',
            mensaje: response.causa || response.mensaje || 'Error en la consulta de la fracción arancelaria.',
            cerrar: false,
            txtBtnAceptar: '',
            txtBtnCancelar: '',
          };
        }
      },
      error: (error) => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        const MENSAJE = error?.error?.error || 'Error en la consulta de la fracción arancelaria.';
        this.nuevaNotificacion = {
          tipoNotificacion: 'toastr',
          categoria: CategoriaMensaje.ERROR,
          modo: 'action',
          titulo: '',
          mensaje: MENSAJE,
          cerrar: false,
          txtBtnAceptar: '',
          txtBtnCancelar: '',
        };
      }
    });
  }

  /**
   * Muestra el modal para cargar un archivo.
   *
   * Este método utiliza el modal de Bootstrap para mostrar el modal de carga de archivos.
   */
  cargaArchivo(): void {
    if (this.modalArchivo) {
      const MODAL_INSTANCE = new Modal(this.modalArchivo.nativeElement);
      MODAL_INSTANCE.show();
    }
  }

  /**
   * Verifica si un control de formulario es inválido, está tocado o ha sido modificado.
   * @param campo - El nombre del control de formulario a verificar.
   * @returns Verdadero si el control es inválido, de lo contrario, falso.
   */
  // eslint-disable-next-line class-methods-use-this
  public esInvalido(formgrupo: FormGroup, campo: string): boolean {
    const CONTROL = formgrupo.get(campo);
    return CONTROL ? CONTROL.invalid && (CONTROL.touched || CONTROL.dirty) : false;
  }
/**
   * Abre el formulario de edición para insumos o envases según el evento recibido.
   * Si no hay elementos seleccionados en la tabla correspondiente, muestra un modal de confirmación.
   * Si hay selección, llena el formulario `ninoFormGroup` con los datos del primer elemento seleccionado
   * y abre el diálogo de edición.
   *
   * @param {string} event - Indica si se va a modificar un "Insumo" o un "Envase".
   */
  modificar(event: string): void {
    this.modal = event;
    if (event === 'Insumo') {
      if (!this.listaSeleccionadasInsumos.length) {
        const MODAL_INSTANCE = new Modal(this.modalConfirmacion.nativeElement);
        MODAL_INSTANCE.show();
        return;
      }
      this.ninoFormGroup.patchValue({
        nombreTecnico: this.listaSeleccionadasInsumos?.[0]?.nombreTecnico,
        fraccionArancelariaModal: this.listaSeleccionadasInsumos?.[0]?.fraccionArancelaria,
        proveedor: this.listaSeleccionadasInsumos?.[0]?.proveedor,
        fabricanteProductor: this.listaSeleccionadasInsumos?.[0]?.fabricanteOProductor,
        valorDolares: this.listaSeleccionadasInsumos?.[0]?.valorEnDolares,
        pais: this.paisOrigen.find(p => p.descripcion === this.listaSeleccionadasInsumos[0].paisDeOrigen)?.clave ?? '',
        rfc: this.listaSeleccionadasInsumos?.[0]?.rfc,
        fabricante:this.listaSeleccionadasInsumos?.[0]?.fabricanteOProductor,
      })
    } else {
      if (!this.listaSeleccionadasEnvases.length) {
        const MODAL_INSTANCE = new Modal(this.modalConfirmacion.nativeElement);
        MODAL_INSTANCE.show();
        return;
      }
      this.ninoFormGroup.patchValue({
        nombreTecnico: this.listaSeleccionadasEnvases?.[0]?.nombreTecnico,
        fraccionArancelariaModal: this.listaSeleccionadasEnvases?.[0]?.fraccionArancelaria,
        proveedor: this.listaSeleccionadasEnvases?.[0]?.proveedor,
        fabricanteProductor: this.listaSeleccionadasEnvases?.[0]?.fabricanteOProductor,
        valorDolares: this.listaSeleccionadasEnvases?.[0]?.valorEnDolares,
        pais: this.paisOrigen.find(p => p.descripcion === this.listaSeleccionadasEnvases[0].paisDeOrigen)?.clave ?? '',
        rfc: this.listaSeleccionadasInsumos?.[0]?.rfc,
        fabricante:this.listaSeleccionadasInsumos?.[0]?.fabricanteOProductor,
      })
    }
    const VALOR = this.ninoFormGroup.get('fraccionArancelariaModal')?.value;
    if (VALOR) {
      this.consultaArancelariaPartida(VALOR);
    }
    if (event) {
      this.modifcacion = true;
      this.abrirDialogo(event);
    }
  }

  /**
   * Elimina los elementos seleccionados de la tabla de insumos o envases según el evento recibido.
   * Si no hay elementos seleccionados, muestra un modal de confirmación.
   * Si hay selección, elimina cada elemento seleccionado del arreglo correspondiente.
   *
   * @param {string} event - Indica si se va a eliminar un "Insumo" o un "Envase".
   */
  eliminar(event: string): void {
    this.modal = event;
    this.mostrarTabla = false;
    if (event === 'Insumo') {
      if (!this.listaSeleccionadasInsumos.length) {
        const MODAL_INSTANCE = new Modal(this.modalConfirmacion.nativeElement);
        MODAL_INSTANCE.show();
        return;
      }
      this.listaSeleccionadasInsumos.forEach((ele: InsumosTabla) => {
        const INDICE = this.insumosTablaDatos.findIndex((item: InsumosTabla) => item.nombreTecnico === ele.nombreTecnico);
        if (INDICE !== -1) {
          this.insumosTablaDatos.splice(INDICE, 1);
        }
      })
    } else {
      if (!this.listaSeleccionadasEnvases.length) {
        const MODAL_INSTANCE = new Modal(this.modalConfirmacion.nativeElement);
        MODAL_INSTANCE.show();
        return;
      }
      this.listaSeleccionadasEnvases.forEach((ele: EnvasesTabla) => {
        const INDICE = this.envasesTablaDatos.findIndex((item: EnvasesTabla) => item.nombreTecnico === ele.nombreTecnico);
        if (INDICE !== -1) {
          this.envasesTablaDatos.splice(INDICE, 1);
        }
      })
    }
    this.cd.detectChanges();
    this.mostrarTabla = true;
    this.ninoFormGroup.reset();
  }

  /**
   * Abre el modal para errores.
   *
   * Este método configura los datos de la notificación que se mostrará en el modal
   * de confirmación.
   *
   * @param mensaje - mensaje de alarta
   */
  abrirModal(mensaje: string): void {
    this.nuevaNotificacion = {
    tipoNotificacion: 'alert',
    categoria: 'danger',
    modo: 'action',
    titulo: '',
    mensaje: mensaje,
    cerrar: false,
    tiempoDeEspera: 2000,
    txtBtnAceptar: 'Aceptar',
    txtBtnCancelar: '',
  };
  }

  /**
   * @method mercanciaEvaluar
   * @description Consulta la mercancía asociada a la solicitud actual y maneja la respuesta del servidor.
   * @returns {void}
   */
  mercanciaEvaluar(): void {
    this.mercanciaSolcitudService.getMercanciaEvaluar(this.consultaState.id_solicitud)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          if (response.codigo === CodigoRespuesta.EXITO) {
            this.formEvaluarMercancia.patchValue({
              nombreComercialEvaluar: response.datos?.nombre_comercial,
              nombreInglesEvaluar: response.datos?.nombre_en_ingles,
              fraccionArancelariaEvaluar: response.datos?.cve_fraccion,
              nombreTecnicoEvaluar: response.datos?.nombre_tecnico,
              precioFrancoFabricaEvaluar: response.datos?.precio_franco_fabrica,
              valorTransaccionEvaluar: response.datos?.valor_transaccion,
              costoNetoEvaluar: response.datos?.costo_neto,
              costoNetoAPEvaluar: response.datos?.costo_neto_ap,
              descripcionJuegoEvaluar: response.datos?.descripcion_juego,
              tipoExportadorEvaluar: response.datos?.tipo_exportador,
              separacionContableEvaluar: response.datos?.separacion_contable,
              valorTransaccionalFOBEvaluar: response.datos?.valor_transaccion_fob,
              clasificaciónNALADIEvaluar: response.datos?.cve_fraccion_naladi,
              descripcionNALADIEvaluar: response.datos?.descripcion_naladi,
              clasificacionNALADISA1993Evaluar: response.datos?.cve_fraccion_naladisa_93,
              descripcionNALADISA1993Evaluar: response.datos?.descripcion_naladisa_93,
              clasificacionNALADISA1996Evaluar: response.datos?.cve_fraccion_naladisa_96,
              descripcionNALADISAEvaluar: response.datos?.descripcion_naladisa_96,
              clasificacionNALADISA2002Evaluar: response.datos?.cve_fraccion_naladisa_02,
              descripcionNALADISA2002Evaluar: response.datos?.descripcion_naladisa_02
            });
            this.mercanciaEvaluarData = response.datos ?? {} as EvaluarMercanciaResponse;
        }else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
          this.nuevaNotificacion = {
            tipoNotificacion: 'toastr',
            categoria: CategoriaMensaje.ERROR,
            modo: 'action',
            titulo: response?.error || 'Error en la consultar mercancia.',
            mensaje: response?.causa || response?.mensaje || 'Error en la consultar mercancia.',
            cerrar: false,
            txtBtnAceptar: '',
            txtBtnCancelar: '',
          };
        }
      },
      error: (err) => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        const MENSAJE = err?.error?.error || 'Error en la consultar mercancia.';
        this.nuevaNotificacion = {
          tipoNotificacion: 'toastr',
          categoria: 'error',
          modo: 'action',
          titulo: '',
          mensaje: MENSAJE,
          cerrar: false,
          txtBtnAceptar: '',
          txtBtnCancelar: '',
        }
      }
    });
  }

  /**
   * Determina si se debe mostrar una sección del formulario según su key y los datos disponibles.
   * @param sectionKey - Clave de la sección a evaluar (opcional).
   * @returns `true` si la sección debe mostrarse, `false` en caso contrario.
   */
  public shouldShowSection(sectionKey?: string): boolean {
  if (!sectionKey) {
    return true; 
  }
  if (!this.mercanciaEvaluarData) {
    return false;
  }
  if (sectionKey === 'aladi') {
    const VAL = (this.mercanciaEvaluarData as EvaluarMercanciaResponse).cve_fraccion_naladi;
    return VAL !== null && VAL !== undefined && VAL !== '';
  }
    return true;
  }

  /**
   * Maneja el cambio de país en el formulario.
   *  - Si el país seleccionado es 'MEX', establece `mostrarRFC` como verdadero.
   *  - Si el país seleccionado es diferente, establece `mostrarRFC` como falso.
   * Finalmente, actualiza las validaciones del campo RFC en el formulario.
   *  @param event - Evento de cambio del país.
   */
  onPaisChange(event: Event): void {
    const SELECT_ELEMENT = event.target as HTMLSelectElement;
    const VALOR = SELECT_ELEMENT.value;
    this.tramite110101Store.setUnidadMedidaPeso(VALOR);
    this.mostrarRFC = VALOR === 'MEX';
    this.actualizarValidacionRFC();
  }

  /**
   * Actualiza las validaciones del campo RFC en el formulario `ninoFormGroup`
   * según el valor de la variable `mostrarRFC`.
   * 
   * - Si `mostrarRFC` es verdadero, se establece la validación como requerida.
   * - Si `mostrarRFC` es falso, se eliminan todas las validaciones y se limpia el valor del campo.
   * 
   * Finalmente, se actualiza el estado de validez del control RFC.
   */
  private actualizarValidacionRFC(): void {
    const RFC_CONTROL = this.ninoFormGroup.get('rfc');

    if (this.mostrarRFC) {
      RFC_CONTROL?.setValidators([Validators.required]);
    } else {
      RFC_CONTROL?.clearValidators();
      RFC_CONTROL?.setValue('');
    }

    RFC_CONTROL?.updateValueAndValidity();
  }

  /**
   * @method obtenerUnidadMedidaComercial
   * @description
   * Obtiene la lista de unidades de medida comercial desde el servicio `DatosMercanciaService`.
   */
  obtenerUnidadMedidaComercial(): void {
    this.datosMercanciaService.getUnidadMedidaComercial()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          if (data.codigo === '00') {
            this.unidadMedidaComercial = data.datos || [];
          }
        },
        error: (error) => {
          console.error('Error al obtener los datos:', error);
          this.unidadMedidaComercial = [];
        }
      });
  }

  /**
   * Agrega el campo "Peso" al formulario modal si no existe.
   * También agrega el control correspondiente al FormGroup `ninoFormGroup` si no está presente.
   */
  private agregarCampoPeso(): void {
    const YA_EXISTE = this.modalFormaDatos.some(campo => campo.id === 'peso');
    if (!YA_EXISTE) {
      const INDICE_REFERENCIA = this.modalFormaDatos.findIndex(campo => campo.id === 'descripcionSubpartida');

      const NUEVOCAMPO = {
        id: 'peso',
        labelNombre: 'Peso',
        campo: 'peso',
        clase: 'col-md-6',
        tipoInput: 'text',
        desactivado: false,
        soloLectura: false,
        validadores: [{ tipo: 'required' }],
        marcadorDePosicion: '',
        valorPredeterminado: '',
        marginTop: 0,
      };

      if (INDICE_REFERENCIA !== -1) {
        this.modalFormaDatos.splice(INDICE_REFERENCIA + 1, 0, NUEVOCAMPO);
      } else {
        this.modalFormaDatos.push(NUEVOCAMPO);
      }

      this.modalFormaDatos = [...this.modalFormaDatos]; // refrescar Angular
    }

    if (!this.ninoFormGroup.get('peso')) {
      this.ninoFormGroup.addControl('peso', new FormControl('', Validators.required));
    }
  }

  /**
   * Elimina el campo "Peso" del formulario modal si existe.
   * También elimina el control correspondiente del FormGroup `ninoFormGroup` si está presente.
   */
  private eliminarCampoPeso(): void {
    const INDICE = this.modalFormaDatos.findIndex(campo => campo.id === 'peso');
    if (INDICE !== -1) {
      this.modalFormaDatos.splice(INDICE, 1);
      this.modalFormaDatos = [...this.modalFormaDatos];
    }

    if (this.ninoFormGroup.get('peso')) {
      this.ninoFormGroup.removeControl('peso');
  }
}

  /**
   * **Limpia los recursos y finaliza las suscripciones al destruir el componente**
   * 
   * - `this.destroy$.next();` emite un valor para notificar a los observables dependientes que deben completarse.
   * - `this.destroy$.complete();` finaliza el `Subject` para liberar memoria y evitar fugas de memoria.
   * - Este método se ejecuta automáticamente cuando el componente se destruye, asegurando una gestión eficiente de las suscripciones.
   */
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
