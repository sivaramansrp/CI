import { CatalogoSelectComponent, CategoriaMensaje, ConfiguracionColumna, ConsultaioQuery, ELVALORALERTA, Notificacion, NotificacionesComponent, REGEX_SOLO_NUMEROS, TablaDinamicaComponent, TablaSeleccion, TablePaginationComponent } from '@ng-mf/data-access-user';
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
import { Subject,debounceTime,distinctUntilChanged,fromEvent,map, takeUntil } from 'rxjs';
import { AlertComponent } from '@ng-mf/data-access-user';
import { CommonModule } from '@angular/common';
import { FormasDinamicasComponent } from '@libs/shared/data-access-user/src/tramites/components/formas-dinamicas/formas-dinamicas/formas-dinamicas.component';
import { FraccionValidarRequest } from '../../models/request/validar-fraccion-request.model';
import { FraccionValidarResponse } from '../../models/response/validar-fraccion-response.model';
import { Modal } from 'bootstrap';
import { Solicitante110101Query } from '../../estados/queries/solicitante110101.query';
import { TituloComponent } from '@ng-mf/data-access-user';
import { ValidacionesFormularioService } from '@ng-mf/data-access-user';
import mercancia from '@libs/shared/theme/assets/json/110101/mercancia.json'



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
  imports: [TituloComponent, CommonModule,CatalogoSelectComponent, AlertComponent, ReactiveFormsModule, TablaDinamicaComponent, TablePaginationComponent, FormasDinamicasComponent, NotificacionesComponent]
})
export class DatosMercanciaComponent implements OnInit, OnDestroy, AfterViewInit {

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
    pais: new FormControl(null, Validators.required),
    rfc: new FormControl(null,Validators.required),
    fabricante: new FormControl(null)
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
   * Una instancia de FormGroup que representa el formulario para Mercancia (bienes).
   * Este formulario se utiliza para capturar y validar los datos relacionados con Mercancia.
   */
  public formMercancia!: FormGroup;

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
  public modifcacion: boolean = true;
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
    private cd: ChangeDetectorRef,
  ) {
    this.consultaioQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroy$),
        map((seccionState) => {
          this.esFormularioSoloLectura = seccionState.readonly;
          this.createFormMercancia();
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
    this.createFormMercancia();

    if(this.solicitudeState.insumosTablaDatos.length){
      this.insumosTablaDatos = this.solicitudeState.insumosTablaDatos;
    }else if(this.solicitudeState.envasesTablaDatos.length){
      this.envasesTablaDatos = this.solicitudeState.envasesTablaDatos;
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
  }

  /**
   * Suscribe a los cambios en el campo `fraccionArancelaria` dentro del
   * FormGroup hijo `ninoFormGroup` y realiza la consulta arancelaria
   * correspondiente cuando el valor cambie. Se ejecuta después de que
   * la vista y sus hijos han sido inicializados.
   */
  ngAfterViewInit(): void {
    const FRACCIONCONTROL = this.ninoFormGroup.get('fraccionArancelaria');
    if (!FRACCIONCONTROL) {
      return;
    }
    FRACCIONCONTROL.valueChanges
      .pipe(
        debounceTime(600),
        distinctUntilChanged(),
        takeUntil(this.destroy$)
      )
      .subscribe(valor => {
        if (valor && valor.trim() !== '') {
          this.consultaArancelariaPartida(valor);
        }
      });
  }

  /**
    * Crea un grupo de formularios reactivos para "Mercancia" con los siguientes controles:
    * - nombreComercial: Un campo de texto obligatorio.
    * - nombreIngles: Un campo de texto obligatorio.
    * - fraccionArancelaria: Un campo de texto con una longitud máxima de 8 caracteres y un validador de patrones para valores numéricos.
    * - descripcion: Un campo de texto opcional.
    * - valorTransaccion: Un campo de texto con una longitud máxima de 20 caracteres.
    */
  public createFormMercancia(): void {
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
  public guardarDatosFormulario(): void {
    this.inicializarFormulario();
    if (this.esFormularioSoloLectura) {
      this.formMercancia.disable();
    } else if (!this.esFormularioSoloLectura) {
      this.formMercancia.enable();
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
      nombreComercial: [this.solicitudeState?.nombreComercial, Validators.required],
      nombreIngles: [this.solicitudeState?.nombreIngles, Validators.required],
      fraccionArancelaria: [this.solicitudeState?.fraccionArancelaria, [Validators.maxLength(8), Validators.pattern(REGEX_SOLO_NUMEROS)]],
      descripcion: [{value: this.solicitudeState?.descripcion, disabled: true}],
      valorTransaccion: [this.solicitudeState?.valorTransaccion, Validators.maxLength(20)],
      francofabrica:[this.solicitudeState?.francofabrica, Validators.maxLength(20)],
    });
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
    this.catalogoPais();
    if(this.modifcacion === true){
      this.limpiarDialogo();
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
   
    const PAIS_DESC = this.paisOrigen.find(item => item.id === Number(this.ninoFormGroup.get('pais')?.value)) || null;
    // Construcción base del payload
    const PAYLOAD: InsumoTratadosRequest = {
      insumo: {
        id_solicitud: null,
        nombre: DatosMercanciaComponent.datoNull(this.ninoFormGroup.get('nombreTecnico')?.value),
        desc_fabricante_productor: DatosMercanciaComponent.datoNull(this.ninoFormGroup.get('fabricante')?.value),
        desc_proveedor: DatosMercanciaComponent.datoNull(this.ninoFormGroup.get('proveedor')?.value),
        cve_fraccion: DatosMercanciaComponent.datoNull(this.ninoFormGroup.get('fraccionArancelaria')?.value),
        imp_valor: this.ninoFormGroup.get('valorDolares')?.value,
        ide_tipo_insumo: this.modal === 'Insumo' ? 'TIPIN.02' : 'TIPIN.01',
        //Aveces esta oculto 
        peso: this.solicitudeState.validacionFraccionArancelaria.peso_requerido,
        //Combo
        cve_pais: DatosMercanciaComponent.datoNull(PAIS_DESC?.clave),
        volumen: this.solicitudeState.validacionFraccionArancelaria.volumen_requerido,
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
                fraccionArancelaria:this.ninoFormGroup.get('fraccionArancelaria')?.value ?? '',
                valorEnDolares: this.ninoFormGroup.get('valorDolares')?.value ?? 0,
                paisDeOrigen: PAIS_DESC?.descripcion ?? '',
                //No se sabe de donde sale 
                peso: PAYLOAD.insumo.peso,
                volumen: PAYLOAD.insumo.volumen
              });
              this.tramite110101Store.clearInsumos();
              this.tramite110101Store.addInsumo(this.insumosTablaDatos);
              this.tramite110101Store.clearInsumosCriterios();
              this.tramite110101Store.addInsumoCriterios(this.filasSeleccionadas);
            }else{
              this.envasesTablaDatos.push({
                 nombreTecnico: this.ninoFormGroup.get('nombreTecnico')?.value ?? '',
                proveedor: this.ninoFormGroup.get('proveedor')?.value ?? '',
                fabricanteOProductor: this.ninoFormGroup.get('fabricante')?.value ?? '',
                rfc: this.ninoFormGroup.get('rfc')?.value ?? '',
                fraccionArancelaria:this.ninoFormGroup.get('fraccionArancelaria')?.value ?? '',
                valorEnDolares: this.ninoFormGroup.get('valorDolares')?.value ?? 0,
                paisDeOrigen: PAIS_DESC?.descripcion ?? '',
                //No se sabe de donde sale 
                peso: PAYLOAD.insumo.peso,
                volumen: PAYLOAD.insumo.volumen
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
        id_descripcion_alterna_ue: 0,
        id_descripcion_alterna_aelc: 0,
        id_descripcion_alterna_sgp: 0,
        id_descripcion_alterna_ace: 0,
        //mandar siempre false de momento
        requiere_juegos_o_surtidos: false,
        peso_es_requerido: false,
        volumen_es_requerido: false,

        //nuevos campos flujo alterno
        fraccion_naladi: '',
        fraccion_naladisa93: '',
        fraccion_naladisa96: '',
        fraccion_naladisa02: '',
        //ultimo tab
        tipo_proceso_mercancia: '',
        //Mismo campo difenre nombre dependiendo del caso
        valo_transaccional_fob: this.ninoFormGroup.get('fraccionArancelaria')?.value,
        costo_neto_ap: 0
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
        fraccionArancelaria: this.listaSeleccionadasInsumos?.[0]?.fraccionArancelaria,
        proveedor: this.listaSeleccionadasInsumos?.[0]?.proveedor,
        fabricanteProductor: this.listaSeleccionadasInsumos?.[0]?.fabricanteOProductor,
        valorDolares: this.listaSeleccionadasInsumos?.[0]?.valorEnDolares,
      })
    } else {
      if (!this.listaSeleccionadasEnvases.length) {
        const MODAL_INSTANCE = new Modal(this.modalConfirmacion.nativeElement);
        MODAL_INSTANCE.show();
        return;
      }
      this.ninoFormGroup.patchValue({
        nombreTecnico: this.listaSeleccionadasEnvases?.[0]?.nombreTecnico,
        fraccionArancelaria: this.listaSeleccionadasEnvases?.[0]?.fraccionArancelaria,
        proveedor: this.listaSeleccionadasEnvases?.[0]?.proveedor,
        fabricanteProductor: this.listaSeleccionadasEnvases?.[0]?.fabricanteOProductor,
        valorDolares: this.listaSeleccionadasEnvases?.[0]?.valorEnDolares,
      })
    }
    if (event) {
      this.modifcacion = false;
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
