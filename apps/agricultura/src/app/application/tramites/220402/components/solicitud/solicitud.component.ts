import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConsultaioQuery, ConsultaioState, FECHA_FINAL, FECHA_INICIO, Notificacion } from '@ng-mf/data-access-user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Solicitud220402State, Solicitud220402Store } from '../../estados/tramites/tramites220402.store';
import { Subject, map, takeUntil } from 'rxjs';
import { Catalogo } from '@ng-mf/data-access-user';
import { DatosGenerales } from '../../models/pantallas-captura.model';
import { InputFecha } from '@ng-mf/data-access-user';
import { MediodetransporteService } from '../../services/medio-de-transporte.service';
import { RADIO_OPCIONS } from '../../constantes/certificado-zoosanitario.enum';
import { Solicitud220402Query } from '../../estados/queries/tramites220402.query';
import { ValidacionesFormularioService } from '@ng-mf/data-access-user';


/**
 * Componente para la vista de la solicitud de la sección de "220402".
 */

@Component({
  selector: 'solicitud',
  templateUrl: './solicitud.component.html',
  styleUrl: './solicitud.component.scss',
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
   * Indica si la persona mercancia es visible.
   */
  mercanciaCollapsable: boolean = true;

  /**
   * Lista de catálogos de Seleccione una opción.
   */
  options!: Catalogo[];

  /**
 * Datos Generales de la Mercancía Exhibición de mesa.
 */
  datosGeneralesArr: DatosGenerales[] = [];

  /**
 * Origen Exhibición de mesa.
 */
  origenArr: string[] = [];

  /**
   * federativa Origen Exhibición de mesa.
   */
  federativaOrigen: string = '';
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
   * Constructor del componente.
   * @param fb FormBuilder para crear formularios.
   * @param validacionesService Servicio para validaciones de formularios.
   * @param tramite220402Store Almacén de estado para el trámite 220402.
   */
  constructor(
    private fb: FormBuilder,
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
    return this.datosMercancia.get('datosGenerales') as FormGroup;
  }


  /**
* Obtiene el grupo de formulario 'numeroDescDeLosEmpaques' del formulario principal 'FormSolicitud'.
*
* @returns {FormGroup} El grupo de formulario 'numeroDescDeLosEmpaques'.
*/
  get numeroDescDeLosEmpaques(): FormGroup {
    return this.FormSolicitud.get('numeroDescDeLosEmpaques') as FormGroup;
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
  private inicializaCatalogos(): void {
    this.mediodetransporteService
      .getMedioDeTransporte()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((data: Catalogo[]): void => {
        this.options = data;
      });
  }

  /**
   * Crea el formulario de solicitud.
   * @return {void} No retorna ningún valor.
   */
  crearFormSolicitud(): void {
    this.FormSolicitud = this.fb.group({
      datosDelTramiteRealizar: this.fb.group({
        tipoDeCertificado: [this.solicitudState?.tipoDeCertificado, Validators.required],
        seccionAduanera: [this.solicitudState?.seccionAduanera, Validators.required],
        puntoDestino: [this.solicitudState?.puntoDestino, Validators.required],
        paisDeDestino: [this.solicitudState?.paisDeDestino, Validators.required],
        paisDeProcedencia: [this.solicitudState?.paisDeProcedencia, Validators.required]
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
        ],
        datosGenerales: this.fb.group({
          fraccionArancelaria: [this.solicitudState?.fraccionArancelaria, [Validators.required]],
          descdelaFraccion: [this.solicitudState?.descdelaFraccion, Validators.required],
          cantidadUMT: [this.solicitudState?.cantidadUMT, Validators.required],
          UMT: [this.solicitudState?.UMT, Validators.required],
          cantidadUMC: [this.solicitudState?.cantidadUMC, Validators.required],
          UMC: [this.solicitudState?.UMC, Validators.required],
          paisdeOrigen: [this.solicitudState?.paisdeOrigen, Validators.required],
          entidadFederativadeOrigen: [this.solicitudState?.entidadFederativadeOrigen, Validators.required],
          municipiodeOrigen: [this.solicitudState?.municipiodeOrigen, Validators.required],
          marcasDistintivas: [this.solicitudState?.marcasDistintivas, Validators.required],
          USO: [this.solicitudState?.USO, Validators.required]
        })
      }),
      numeroDescDeLosEmpaques: this.fb.group({
        numero: [this.solicitudState?.numero, [Validators.required]],
        empaques: [this.solicitudState?.empaques, [Validators.required]]
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
    this.federativaOrigen = this.datosGenerales.get('entidadFederativadeOrigen')?.value || 'NA';
    this.origenArr = this.datosGenerales.get('municipiodeOrigen')?.value || [];
    this.inicializarEstadoFormulario();
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
   * Método para mostrar los campos correspondientes a una mercancia.
   * @returns void
   */
  mercanciaColapsable(): void {
    this.mercanciaCollapsable = !this.mercanciaCollapsable;
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
   * Agrega los datos generales de la mercancía al arreglo `datosGeneralesArr`
   * y colapsa la sección de mercancía.
   *
   * @method mercanciaAgregar
   * @memberof SolicitudComponent
   */
  mercanciaAgregar(): void {
    this.datosGeneralesArr = [...this.datosGeneralesArr, this.datosMercancia.get('datosGenerales')?.value];
    this.mercanciaColapsable();
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
    this.federativaOrigen = this.datosGenerales.get('entidadFederativadeOrigen')?.value || 'NA';
    this.origenArr = this.datosGenerales.get('municipiodeOrigen')?.value || [];
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
    const MUNICIPIO_ORIGIN = this.datosGenerales.get('municipiodeOrigen')?.value;
    this.origenArr = this.origenArr.filter((item: string) => item.indexOf(MUNICIPIO_ORIGIN) === -1);
    this.datosGenerales.get('municipiodeOrigen')?.setValue(this.origenArr);
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
    if (this.FormSolicitud.get('datosDelTramiteRealizar.tipoDeCertificado')?.value === 'reexportacion') {
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
      this.FormSolicitud.get('datosDelTramiteRealizar.tipoDeCertificado')?.setValue('');
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
