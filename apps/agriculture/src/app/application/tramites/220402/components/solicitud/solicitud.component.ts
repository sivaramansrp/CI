import { Component } from '@angular/core';
import {
  Catalogo
} from 'libs/shared/data-access-user/src/core/models/shared/catalogos.model';
import {
  InputFecha,
} from 'libs/shared/data-access-user/src/core/models/shared/components.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidacionesFormularioService } from 'libs/shared/data-access-user/src/core/services/shared/validaciones-formulario/validaciones-formulario.service';
import {
  FECHA_FINAL,
  FECHA_INICIO,
} from 'libs/shared/data-access-user/src/tramites/constantes/servicios-extraordinarios.enum';
import { MediodetransporteService } from 'libs/shared/data-access-user/src/core/services/220402/medio-de-transporte.service';

import { map, merge, takeUntil, ReplaySubject, Subject } from 'rxjs';
import { Solicitud220402State, Solicitud220402Store } from '../../estados/tramites/solicitud220402.store';
import { Solicitud220402Query } from '../../estados/queries/solicitud220402.query';



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

export class SolicitudComponent {

  /**
   * Estado de la solicitud.
   */
  public solicitudState!: Solicitud220402State;

  /**
     * Fecha inicio de entrada.
     */
  fechaInicioInput: InputFecha = FECHA_INICIO;

  diaMinimo!: string;

  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

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
  mercanciaCollapsable: boolean = false;

  /**
   * Lista de catálogos de Seleccione una opción.
   */
  options!: Catalogo[];

  /**
 * Datos Generales de la Mercancía Exhibición de mesa.
 */
  datosGeneralesArr: any = [];

  /**
 * Origen Exhibición de mesa.
 */
  origenArr: any = [];

  /**
 * federativa Origen Exhibición de mesa.
 */
  federativaOrigen: string = '';

  private destroyNotifier$: Subject<void> = new Subject();

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
    private solicitud220402Query: Solicitud220402Query
  ) {}

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
            .pipe(takeUntil(this.destroyed$))
            .subscribe((data): void => {
              this.options = data as Catalogo[];
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
          [Validators.required, this.validacionesService.validaFechaNoHoy],
        ],
        fechaFinal: [
          this.solicitudState?.fechaFinal,
          [Validators.required, this.validacionesService.validaFechaNoHoy],
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
          municipiodeOrigen: [[this.solicitudState?.municipiodeOrigen], Validators.required],
          datosOrigen: this.fb.array(this.solicitudState?.datosOrigen),
          marcasDistintivas: [this.solicitudState?.marcasDistintivas, Validators.required],
          USO: [this.solicitudState?.USO, Validators.required]
        })
      }),
      numeroDescDeLosEmpaques: this.fb.group({
        numero: [this.solicitudState?.numero, [Validators.required]],
        empaques: [this.solicitudState?.empaques, [Validators.required]]
      }),
      unidadDeVerificacion: this.fb.group({
        unidadDeVerificar: ['', [Validators.required]],
        terceroEspecialista: ['', [Validators.required]]
      }),
      unidadExpedidoraFitosanitario: this.fb.group({
        entidadFederative: [this.solicitudState?.entidadFederative, [Validators.required]],
        terceroEspecialista: [this.solicitudState?.terceroEspecialista, [Validators.required]]
      })
    });
  }

  /**
   * Método para cambiar la fecha incio.
   * @param nuevo_valor Nuevo valor de la fecha incio.
   */
  cambioFechaInicio(nuevo_valor: string) {
    this.datosMercancia.get('fechaInicio')?.setValue(nuevo_valor);
    this.datosMercancia.get('fechaInicio')?.markAsUntouched();
  }

  /**
   * Método para cambiar la fecha final.
   * @param nuevo_valor Nuevo valor de la fecha final.
   */
  cambioFechaFinal(nuevo_valor: string) {
    this.datosMercancia.get('fechaFinal')?.setValue(nuevo_valor);
    this.datosMercancia.get('fechaFinal')?.markAsUntouched();
  }

  /**
   * Método para mostrar los campos correspondientes a una mercancia.
   * @returns void
   */
  mercanciaColapsable() {
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
  mercanciaAgregar() {
    this.datosGeneralesArr.push(this.datosMercancia.get('datosGenerales')?.value);
    this.mercanciaColapsable();
    this.setValoresStore(this.datosMercancia, 'datosMercancia', 'setDatosMercancia');
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
  municipioAgregar() {
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
  municipioEliminar() {
    const municipioOrigin = this.datosGenerales.get('municipiodeOrigen')?.value;
    this.origenArr = this.origenArr.filter((item: any) => item.indexOf(municipioOrigin) == -1);
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
    const valor = form.get(campo)?.value;
    (this.solicitud220402Store[metodoNombre] as (value: any) => void)(valor);
  }

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
   * Este método se utiliza para destruir la suscripción.
   * @returns destroyed$
   */
  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

}
