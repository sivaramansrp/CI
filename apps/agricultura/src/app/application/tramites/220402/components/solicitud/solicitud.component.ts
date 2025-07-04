import { CONFIGURATION_TABLA_GENERALES, CONFIGURATION_TABLA_MERCANCIA, MUNICIPIODE_OPCIONS, RADIO_OPCIONS } from '../../constantes/certificado-zoosanitario.enum';
import { CatalogoSelectComponent, ConfiguracionColumna, FECHA_FINAL, FECHA_INICIO, InputRadioComponent, Notificacion, NotificacionesComponent, REGEX_SOLO_DIGITOS, TablaDinamicaComponent, TablaSeleccion, TituloComponent } from '@libs/shared/data-access-user/src';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ConsultaioQuery, ConsultaioState, } from '@ng-mf/data-access-user';
import { DatosGenerales, TablaMercancia } from '../../models/pantallas-captura.model';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Solicitud220402State, Solicitud220402Store } from '../../estados/tramites/tramites220402.store';
import { Subject, map, takeUntil } from 'rxjs';
import { Catalogo } from '@ng-mf/data-access-user';
import { CommonModule } from '@angular/common';
import { InputFecha } from '@ng-mf/data-access-user';
import { MediodetransporteService } from '../../services/medio-de-transporte.service';
import { Modal } from 'bootstrap';
import { Solicitud220402Query } from '../../estados/queries/tramites220402.query';
import { ToastrService } from 'ngx-toastr';
import { ValidacionesFormularioService } from '@ng-mf/data-access-user';


/**
 * Componente para la vista de la solicitud de la sección de "220402".
 */

@Component({
  selector: 'solicitud',
  templateUrl: './solicitud.component.html',
  styleUrl: './solicitud.component.scss',
  standalone: true,
  imports: [
    CommonModule,
    NotificacionesComponent,
    FormsModule,
    ReactiveFormsModule,
    CatalogoSelectComponent,
    TituloComponent,
    TablaDinamicaComponent,
    InputRadioComponent
  ],
  providers: [ToastrService]
})

/**
 * Componente que representa la página de solicitud.
 */

export class SolicitudComponent implements OnInit, OnDestroy {

  /**
   * Estado de la solicitud.
   */
  public solicitudState!: Solicitud220402State;

  /**
   * Fecha inicio de entrada.
   */
  fechaInicioInput: InputFecha = FECHA_INICIO;
  /**
    * @property {string} diaMinimo
    * @description Representa el día mínimo permitido para la selección de fechas en el formulario.
    */
  diaMinimo!: string;
  /**
   * Fecha final de entrada.
   */
  fechaFinalInput: InputFecha = FECHA_FINAL;

  /**
   * Formulario principal de la solicitud.
   */
  FormSolicitud!: FormGroup;

  /**
   * Lista de catálogos de Seleccione una opción.
   */
  Opciones!: Catalogo[];

  /**
 * Datos Generales de la Mercancía Exhibición de mesa.
 */
  datosGeneralesArr: DatosGenerales[] = [];
  /**
 * Origen Exhibición de mesa.
 */
  origenArr: TablaMercancia[] = [];
  /**
   * @property {Subject<void>} destroyNotifier$
   * @description Subject utilizado para notificar y completar las suscripciones activas al destruir el componente, evitando fugas de memoria.
   */
  private destroyNotifier$: Subject<void> = new Subject();
  /**
   * @property {ConsultaioState} consultaDatos
   * @description Estado actual de la consulta, que contiene información relacionada con el trámite y el solicitante.
   */
  consultaDatos!: ConsultaioState;

  /**
   * @property {boolean} soloLectura
   * @description Indica si el formulario o los campos están en modo de solo lectura.
   * @default false
   */
  soloLectura: boolean = false;
  /**
   * Configuración de una nueva notificación.
   */
  public nuevaNotificacion!: Notificacion;
  /**
  * Opciones disponibles para el grupo de radio.
  */
  radioOpcions = RADIO_OPCIONS;
  /**
 * Configuración de las columnas de la tabla de datos generales.
 */
  configuracionTablaDatos: ConfiguracionColumna<DatosGenerales>[] = CONFIGURATION_TABLA_GENERALES;

  /**
   * Configuración del tipo de selección en la tabla (checkbox).
   */
  public checkbox = TablaSeleccion.CHECKBOX;

  /**
   * Formulario para gestionar los datos de los destinatarios.
   */
  destinatarioForm!: FormGroup;

  /**
   * Formulario para gestionar los datos generales de la mercancía.
   */
  generalesMercanciaForm!: FormGroup;

  /**
   * Referencia al modal para los datos generales de la mercancía.
   */
  @ViewChild('modalGeneralesMercancia') modalGeneralesMercancia!: ElementRef;

  /**
   * Referencia al botón para cerrar el modal de datos generales de la mercancía.
   */
  @ViewChild('closeGeneralesMercancia') public closeGeneralesMercancia!: ElementRef;

  /**
   * Configuración de las columnas de la tabla de mercancías.
   */
  configuracionTablaMercancia: ConfiguracionColumna<TablaMercancia>[] = CONFIGURATION_TABLA_MERCANCIA;

  /**
   * Lista de mercancías seleccionadas en la tabla.
   */
  seleccionarArr: TablaMercancia[] = [];

  /**
   * Opciones disponibles para los municipios.
   */
  municipiodeOpcions = MUNICIPIODE_OPCIONS;

  /**
   * Lista de datos generales seleccionados en la tabla.
   */
  seleccionarDatosGeneralesArr: DatosGenerales[] = [];
  /**
   * Constructor del componente.
   * @param fb FormBuilder para crear formularios.
   * @param validacionesService Servicio para validaciones de formularios.
   * @param tramite220402Store Almacén de estado para el trámite 220402.
   */
  constructor(
    public fb: FormBuilder,
    private validacionesService: ValidacionesFormularioService,
    private mediodetransporteService: MediodetransporteService,
    private solicitud220402Store: Solicitud220402Store,
    private solicitud220402Query: Solicitud220402Query,
    private consultaioQuery: ConsultaioQuery,
  ) { }

  /**
   * Método que se ejecuta al inicializar el componente.
   * 
   * Este método realiza las siguientes acciones:
   * 1. Inicializa los catálogos necesarios para el formulario.
   * 
   * @returns {void}
   */
  ngOnInit(): void {
    this.inicializaCatalogos();
    this.solicitud220402Query.selectSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.solicitudState = seccionState;
        })
      )
      .subscribe();
    this.consultaioQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.consultaDatos = seccionState;
          this.soloLectura = this.consultaDatos.readonly;
          this.inicializarEstadoFormulario();
        })
      )
      .subscribe();
    this.datosGeneralesArr = this.solicitudState?.datosGeneralesArr || [];
    // Inicializar el formulario principal
    this.crearFormSolicitud();
    this.crearFormGeneralesMercancia();

  }

  /**
* Obtiene el grupo de formulario 'datosDelTramiteRealizar' del formulario principal 'FormSolicitud'.
*
* @returns {FormGroup} El grupo de formulario 'datosDelTramiteRealizar'.
*/
  get datosDelTramiteRealizar(): FormGroup {
    return this.FormSolicitud.get('datosDelTramiteRealizar') as FormGroup;
  }

  /**
 * Obtiene el grupo de formulario 'datosMercancia' del formulario principal 'FormSolicitud'.
 *
 * @returns {FormGroup} El grupo de formulario 'datosMercancia'.
 */
  get datosMercancia(): FormGroup {
    return this.FormSolicitud.get('datosMercancia') as FormGroup;
  }

  /**
* Obtiene el grupo de formulario 'datosGenerales' del formulario principal 'FormSolicitud'.
*
* @returns {FormGroup} El grupo de formulario 'datosGenerales'.
*/
  get datosGenerales(): FormGroup {
    return this.generalesMercanciaForm.get('datosGenerales') as FormGroup;
  }


  /**
* Obtiene el grupo de formulario 'numeroDescDeLosEmpaques' del formulario principal 'FormSolicitud'.
*
* @returns {FormGroup} El grupo de formulario 'numeroDescDeLosEmpaques'.
*/
  get numeroDescDeLosEmpaques(): FormGroup {
    return this.generalesMercanciaForm.get('numeroDescDeLosEmpaques') as FormGroup;
  }

  /**
* Obtiene el grupo de formulario 'unidadDeVerificacion' del formulario principal 'FormSolicitud'.
*
* @returns {FormGroup} El grupo de formulario 'unidadDeVerificacion'.
*/
  get unidadDeVerificacion(): FormGroup {
    return this.FormSolicitud.get('unidadDeVerificacion') as FormGroup;
  }

  /**
  * Obtiene el grupo de formulario 'unidadExpedidoraFitosanitario' del formulario principal 'FormSolicitud'.
  *
  * @returns {FormGroup} El grupo de formulario 'unidadExpedidoraFitosanitario'.
  */
  get unidadExpedidoraFitosanitario(): FormGroup {
    return this.FormSolicitud.get('unidadExpedidoraFitosanitario') as FormGroup;
  }
  /**
   * Verifica si un campo específico en un formulario es válido.
   *
   * @param {FormGroup} form - El formulario que contiene el campo a validar.
   * @param {string} field - El nombre del campo a validar.
   * @returns {boolean} - Retorna `true` si el campo es válido, de lo contrario `false`.
   */
  isValid(form: FormGroup, field: string): boolean {
    return this.validacionesService.isValid(form, field) || false;
  }

  /**
     * Inicializa los catálogos necesarios para el formulario.
     */
  public inicializaCatalogos(): void {
    this.mediodetransporteService
      .getMedioDeTransporte()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((data: Catalogo[]): void => {
        this.Opciones = data;
      });
  }

  /**
   * Crea el formulario de solicitud.
   * @return {void} No retorna ningún valor.
   */
  crearFormSolicitud(): void {
    this.FormSolicitud = this.fb.group({
      datosDelTramiteRealizar: this.fb.group({
        tipoDeCertificado: [this.solicitudState?.tipoDeCertificado, [Validators.required]],
        seccionAduanera: [this.solicitudState?.seccionAduanera, [Validators.required]],
        puntoDestino: [this.solicitudState?.puntoDestino, [Validators.required]],
        paisDeDestino: [this.solicitudState?.paisDeDestino, [Validators.required]],
        paisDeProcedencia: [this.solicitudState?.paisDeProcedencia, [Validators.required]]
      }),
      datosMercancia: this.fb.group({
        rangoDeFechas: [this.solicitudState?.rangoDeFechas],
        fechaInicio: [
          this.solicitudState?.fechaInicio,
          [Validators.required, ValidacionesFormularioService.validaFechaNoHoy],
        ],
        fechaFinal: [
          this.solicitudState?.fechaFinal,
          [Validators.required, ValidacionesFormularioService.validaFechaNoHoy],
        ]
      }),
      unidadDeVerificacion: this.fb.group({
        unidadDeVerificar: [this.solicitudState?.unidadDeVerificar, [Validators.required]],
        terceroEspecialista: [this.solicitudState?.terceroEspecialista, [Validators.required]]
      }),
      unidadExpedidoraFitosanitario: this.fb.group({
        entidadFederative: [this.solicitudState?.entidadFederative, [Validators.required]],
        fitosanitario: [this.solicitudState?.fitosanitario, [Validators.required]]
      })
    });
    this.inicializarEstadoFormulario();
  }
  /**
   * Crea el formulario para gestionar los datos generales de la mercancía.
   * 
   * Este formulario incluye los siguientes grupos de controles:
   * - `datosGenerales`: Contiene campos como nombre común, nombre científico, descripción del producto,
   *   fracción arancelaria, cantidades, unidades de medida, país de origen, entre otros.
   * - `numeroDescDeLosEmpaques`: Contiene campos para el número y la descripción de los empaques.
   * 
   * Los campos incluyen validaciones como requeridos, patrones específicos y longitudes máximas.
   */
  crearFormGeneralesMercancia(): void {
    this.generalesMercanciaForm = this.fb.group({
      datosGenerales: this.fb.group({
        nombreComun: [this.solicitudState?.nombreComun, [Validators.required]],
        nombreCientifico: [this.solicitudState?.nombreCientifico, [Validators.required]],
        descripcionProducto: [this.solicitudState?.descripcionProducto, [Validators.required]],
        fraccionArancelaria: [this.solicitudState?.fraccionArancelaria, [Validators.pattern(REGEX_SOLO_DIGITOS), Validators.minLength(8)]],
        descdelaFraccion: [{ value: this.solicitudState?.descdelaFraccion, disabled: true }, []],
        cantidadUMT: [{ value: this.solicitudState?.cantidadUMT, disabled: true }, []],
        UMT: [{ value: this.solicitudState?.UMT, disabled: true }, []],
        cantidadUMC: [this.solicitudState?.cantidadUMC, [Validators.required, Validators.maxLength(15), Validators.pattern(REGEX_SOLO_DIGITOS), Validators.max(999999999999.99)]],
        UMC: [this.solicitudState?.UMC, [Validators.required]],
        paisdeOrigen: [this.solicitudState?.paisdeOrigen, [Validators.required]],
        entidadFederativadeOrigen: [this.solicitudState?.entidadFederativadeOrigen, []],
        municipiodeOrigen: [this.solicitudState?.municipiodeOrigen, []],
        marcasDistintivas: [this.solicitudState?.marcasDistintivas, []],
        USO: [this.solicitudState?.USO, [Validators.required]]
      }),
      numeroDescDeLosEmpaques: this.fb.group({
        numero: [this.solicitudState?.numero, [Validators.required, Validators.pattern(REGEX_SOLO_DIGITOS)]],
        empaques: [this.solicitudState?.empaques, [Validators.required]]
      })
    });
  }
  /**
   * @method inicializarEstadoFormulario
   * @description Configura el estado del formulario `FormSolicitud` según el modo de solo lectura.
   * 
   * Si la propiedad `soloLectura` es verdadera, deshabilita todos los controles del formulario.
   * En caso contrario, habilita los controles del formulario.
   * 
   * @returns {void}
   */
  inicializarEstadoFormulario(): void {
    if (this.soloLectura) {
      this.FormSolicitud?.disable();
    } else {
      this.FormSolicitud?.enable();
    }
  }
  /**
   * Método para cambiar la fecha incio.
   * @param nuevo_valor Nuevo valor de la fecha incio.
   */
  cambioFechaInicio(nuevo_valor: string): void {
    this.datosMercancia.get('fechaInicio')?.setValue(nuevo_valor);
    this.datosMercancia.get('fechaInicio')?.markAsUntouched();
  }

  /**
   * Método para cambiar la fecha final.
   * @param nuevo_valor Nuevo valor de la fecha final.
   */
  cambioFechaFinal(nuevo_valor: string): void {
    this.datosMercancia.get('fechaFinal')?.setValue(nuevo_valor);
    this.datosMercancia.get('fechaFinal')?.markAsUntouched();
  }

  /**
   * Método para eliminar una mercancía de la lista.
   * @param {number} i - Índice de la mercancía a eliminar.
   * @returns {void}
   */
  mercanciaBorrar(i: number): void {
    this.datosGeneralesArr.splice(i, 1);
  }


  /**
   * @method municipioAgregar
   * @description Este método actualiza las propiedades `federativaOrigen` y `origenArr` 
   * basándose en los valores obtenidos de los controles del formulario `datosGenerales`.
   * 
   * - `federativaOrigen` se establece con el valor del control `entidadFederativadeOrigen` 
   *   o 'NA' si el control no tiene valor.
   * - `origenArr` se establece con el valor del control `municipiodeOrigen` 
   *   o un arreglo vacío si el control no tiene valor.
   */
  municipioAgregar(): void {
    if (this.datosGenerales.get('entidadFederativadeOrigen')?.value && this.datosGenerales.get('municipiodeOrigen')?.value) {
      const OPCIONES: string = this.Opciones.find(opt => opt.id.toString() === this.datosGenerales.get('entidadFederativadeOrigen')?.value)?.descripcion || '';
      this.origenArr = [{
        id: 1,
        federativaOrigen: OPCIONES,
        origen: this.datosGenerales.get('municipiodeOrigen')?.value
      }]
    }
  }
  /**
   * Selecciona los datos de mercancías desde el evento.
   * 
   * Este método actualiza la lista de mercancías seleccionadas en la tabla.
   * 
   * @param {TablaMercancia[]} evento - Lista de mercancías seleccionadas.
   */
  seleccionarDatos(evento: TablaMercancia[]): void {
    this.seleccionarArr = evento;
  }
  /**
   * Selecciona los datos generales desde el evento.
   * 
   * Este método actualiza la lista de datos generales seleccionados en la tabla.
   * 
   * @param {DatosGenerales[]} evento - Lista de datos generales seleccionados.
   */
  seleccionarTabla(evento: DatosGenerales[]): void {
    this.seleccionarDatosGeneralesArr = evento;
  }

  /**
   * Método para eliminar un municipio del arreglo `origenArr`.
   * 
   * Este método obtiene el valor del control `municipiodeOrigen` del formulario `datosGenerales`
   * y filtra el arreglo `origenArr` para eliminar cualquier elemento que coincida con dicho valor.
   * 
   * @returns {void}
   */
  municipioEliminar(): void {
    if (!this.seleccionarArr.length) {
      this.origenArr = [];
    } else {
      this.origenArr = this.origenArr.filter(el => !this.seleccionarArr.some(seleccionada => seleccionada.id === el.id));
    }
  }
  /**
   * Elimina los datos generales seleccionados de la lista.
   * 
   * Este método filtra la lista `datosGeneralesArr` para eliminar los elementos que coincidan
   * con los datos seleccionados en `seleccionarDatosGeneralesArr`.
   */
  eliminar(): void {
    this.datosGeneralesArr = this.datosGeneralesArr.filter(el => !this.seleccionarDatosGeneralesArr.some(seleccionada => seleccionada.id === el.id));
  }
  /**
   * Modifica los datos generales seleccionados en el formulario.
   * 
   * Este método verifica si hay datos seleccionados en `seleccionarDatosGeneralesArr`, y si es así:
   * - Llama al método `agregar` para abrir el modal.
   * - Obtiene el primer elemento seleccionado y busca las descripciones correspondientes en las opciones disponibles.
   * - Actualiza los valores del formulario `generalesMercanciaForm` con los datos seleccionados.
   */
  modificar(): void {
    if (this.seleccionarDatosGeneralesArr.length) {
      this.agregar();
      const VALOR = this.seleccionarDatosGeneralesArr[0];
      const UMC = this.Opciones.find(opt => opt.descripcion === VALOR.UMC)?.id || '';
      const PAISDEORIGEN = this.Opciones.find(opt => opt.descripcion === VALOR.paisdeOrigen)?.id || '';
      const NOMBRECOMUN = this.Opciones.find(opt => opt.descripcion === VALOR.nombreComun)?.id || '';
      const NOMBRECIENTIFICO = this.Opciones.find(opt => opt.descripcion === VALOR.nombreCientifico)?.id || '';
      const USO = this.Opciones.find(opt => opt.descripcion === VALOR.USO)?.id || '';
      const EMPAQUES = this.Opciones.find(opt => opt.descripcion === VALOR.empaques)?.id || '';
      this.generalesMercanciaForm.patchValue({
        datosGenerales: {
          nombreComun: NOMBRECOMUN,
          nombreCientifico: NOMBRECIENTIFICO,
          descripcionProducto: VALOR.descripcionProducto,
          fraccionArancelaria: VALOR.fraccionArancelaria,
          descdelaFraccion: VALOR.descdelaFraccion,
          cantidadUMT: VALOR.cantidadUMT,
          UMT: VALOR.UMT,
          cantidadUMC: VALOR.cantidadUMC,
          UMC: UMC,
          paisdeOrigen: PAISDEORIGEN,
          marcasDistintivas: VALOR.marcasDistintivas,
          USO: USO
        },
        numeroDescDeLosEmpaques: {
          numero: VALOR.numero,
          empaques: EMPAQUES
        }
      });
    }
  }

  /**
   * Establece los valores en el store de tramite5701.
   *
   * @param {FormGroup} form - El formulario del cual se obtiene el valor.
   * @param {string} campo - El nombre del campo del formulario cuyo valor se va a obtener.
   * @param {string} metodoNombre - El nombre del método en el store que se va a invocar con el valor del campo.
   * @returns {void}
   */
  setValoresStore(form: FormGroup, campo: string, metodoNombre: keyof Solicitud220402Store): void {
    const VALOR = form.get(campo)?.value;
    (this.solicitud220402Store[metodoNombre] as (value: unknown) => void)(VALOR);
  }
  /**
   * @method changeFechaFinal
   * @description Actualiza la validez del formulario y establece la fecha final en el store.
   */
  changeFechaFinal(): void {
    this.datosMercancia.updateValueAndValidity();
    this.setValoresStore(this.datosMercancia, 'fechaFinal', 'setFechaFinal');
  }

  /**
   * Verifica si hay un error de intervalo de fecha en los datos del servicio.
   * @returns {boolean} - `true` si hay un error de intervalo de fecha y el campo ha sido tocado, de lo contrario `false`.
   */
  intervaloFechaError(): boolean {
    return (
      this.datosMercancia.hasError('invalidIntervalo') &&
      this.datosMercancia.touched
    );
  }
  /**
   * Maneja el cambio de tipo de certificado.
   * 
   * Este método muestra un modal de confirmación al usuario, indicando que al cambiar el tipo de certificado
   * se eliminarán las mercancías registradas. Solicita confirmación para proceder con el cambio.
   */
  tipoDeCertificadoCambio(): void {
    if (!this.solicitudState?.tipoDeCertificado) {
      this.setValoresStore(this.datosDelTramiteRealizar, 'tipoDeCertificado', 'setTipoDeCertificado');
    } else {
      this.abrirModal(
        'Aceptar',
        'Cancelar',
        'Al cambiar de tipo certificado se eliminarán las mercancías registradas ¿Estás seguro de cambiar de certificado?'
      );
    }
  }

  /**
   * Abre un modal con los parámetros proporcionados.
   * 
   * Este método configura y muestra un modal con el mensaje, botones y configuración especificados.
   * 
   * @param {string} txtBtnAceptar - Texto del botón de aceptación.
   * @param {string} txtBtnCancelar - Texto del botón de cancelación.
   * @param {string} mensaje - Mensaje que se mostrará en el modal.
   */
  public abrirModal(txtBtnAceptar = '', txtBtnCancelar = '', mensaje = ''): void {
    this.nuevaNotificacion = {
      tipoNotificacion: 'alert',
      categoria: 'danger',
      modo: 'action',
      titulo: '',
      mensaje: mensaje,
      tamanioModal: 'modal-lg',
      cerrar: false,
      tiempoDeEspera: 2000,
      txtBtnAceptar: txtBtnAceptar,
      txtBtnCancelar: txtBtnCancelar,
    };
  }

  /**
   * Maneja la confirmación del modal.
   * 
   * Este método realiza acciones dependiendo de la respuesta del usuario en el modal de confirmación.
   * Si el usuario no acepta, se limpia el valor del tipo de certificado en el formulario.
   * 
   * @param {boolean} aceptar - Indica si el usuario aceptó la acción en el modal.
   */
  confirmacionModal(aceptar: boolean): void {
    if (!aceptar) {
      this.FormSolicitud.get('datosDelTramiteRealizar.tipoDeCertificado')?.setValue(this.solicitudState?.tipoDeCertificado);
    } else {
      this.setValoresStore(this.datosDelTramiteRealizar, 'tipoDeCertificado', 'setTipoDeCertificado');
    }
  }
  /**
   * Muestra el modal para agregar datos generales de la mercancía.
   * 
   * Este método utiliza el modal `modalGeneralesMercancia` para mostrar el formulario
   * de datos generales de la mercancía.
   */
  agregar(): void {
    if (this.modalGeneralesMercancia) {
      const MODAL_INSTANCE = new Modal(this.modalGeneralesMercancia.nativeElement);
      MODAL_INSTANCE.show();
    }
  }
  /**
   * Agrega los datos generales de la mercancía al arreglo `datosGeneralesArr`.
   * 
   * Este método valida el formulario `generalesMercanciaForm` y, si es válido:
   * - Obtiene los valores del formulario.
   * - Busca las descripciones correspondientes en las opciones disponibles.
   * - Agrega los datos al arreglo `datosGeneralesArr`.
   * - Cierra el modal de datos generales de la mercancía.
   */
  agregarModel(): void {
    this.generalesMercanciaForm.markAllAsTouched();
    if (this.generalesMercanciaForm.valid) {
      const VALOR = this.generalesMercanciaForm.getRawValue();
      const UMC: string = this.Opciones.find(opt => opt.id.toString() === VALOR.datosGenerales.UMC)?.descripcion || '';
      const PAISDEORIGEN: string = this.Opciones.find(opt => opt.id.toString() === VALOR.datosGenerales.paisdeOrigen)?.descripcion || '';
      const NOMBRECOMUN: string = this.Opciones.find(opt => opt.id.toString() === VALOR.datosGenerales.nombreComun)?.descripcion || '';
      const NOMBRECIENTIFICO: string = this.Opciones.find(opt => opt.id.toString() === VALOR.datosGenerales.nombreCientifico)?.descripcion || '';
      const USO: string = this.Opciones.find(opt => opt.id.toString() === VALOR.datosGenerales.USO)?.descripcion || '';
      const EMPAQUES: string = this.Opciones.find(opt => opt.id.toString() === VALOR.numeroDescDeLosEmpaques.empaques)?.descripcion || '';
      this.datosGeneralesArr = [...this.datosGeneralesArr, {
        id: this.datosGeneralesArr.length + 1,
        fraccionArancelaria: VALOR.datosGenerales.fraccionArancelaria,
        descdelaFraccion: VALOR.datosGenerales.descdelaFraccion,
        cantidadUMT: VALOR.datosGenerales.cantidadUMT,
        UMT: VALOR.datosGenerales.UMT,
        cantidadUMC: VALOR.datosGenerales.cantidadUMC,
        UMC: UMC,
        descripcionProducto: VALOR.datosGenerales.descripcionProducto,
        nombreComun: NOMBRECOMUN,
        nombreCientifico: NOMBRECIENTIFICO,
        USO: USO,
        paisdeOrigen: PAISDEORIGEN,
        marcasDistintivas: VALOR.datosGenerales.marcasDistintivas,
        numero: VALOR.numeroDescDeLosEmpaques.numero,
        empaques: EMPAQUES,
      }];
      this.closeGeneralesMercancia.nativeElement.click();
      this.limpiar();
    }
  }
  /**
   * Limpia el formulario de datos generales de la mercancía.
   * 
   * Este método reinicia el formulario `generalesMercanciaForm` y vacía el arreglo `origenArr`.
   */
  limpiar(): void {
    this.generalesMercanciaForm.reset();
    this.origenArr = [];
  }
  /**
   * Actualiza los valores de la fracción arancelaria en el formulario.
   * 
   * Este método verifica si el campo `fraccionArancelaria` es válido y, si es así:
   * - Establece valores predeterminados para `descdelaFraccion` y `UMT`.
   * - Si no es válido, limpia los valores de estos campos.
   */
  fraccionArancelariaActualizar(): void {
    if (this.datosGenerales.get('fraccionArancelaria')?.valid) {
      this.datosGenerales.get('descdelaFraccion')?.setValue('Aguacates (paltas)');
      this.datosGenerales.get('UMT')?.setValue('Kilogramo');
    } else {
      this.datosGenerales.get('descdelaFraccion')?.setValue('');
      this.datosGenerales.get('UMT')?.setValue('');
    }
  }
  /**
   * Este método se utiliza para destruir la suscripción.
   * @returns destroyNotifier$
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }

}
