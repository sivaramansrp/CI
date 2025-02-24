import { Component } from '@angular/core';
import {
  Catalogo
} from '../../../../core/models/shared/catalogos.model';
import {
  InputFecha,
} from '../../../../core/models/shared/components.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidacionesFormularioService } from '../../../../core/services/shared/validaciones-formulario/validaciones-formulario.service';
import {
  FECHA_FINAL,
  FECHA_INICIO,
} from '../../../../shared/constantes/servicios-extraordinarios.enum';
import { MediodetransporteService } from '../../../../core/services/220402/mediodetransporte.service';

import { map, merge, takeUntil, ReplaySubject } from 'rxjs';

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
     * Fecha inicio de entrada.
     */
  fechaInicioInput: InputFecha = FECHA_INICIO;

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
  federativaOrigen: string;

  /**
   * Constructor del componente.
   * @param fb FormBuilder para crear formularios.
   * @param validacionesService Servicio para validaciones de formularios.
   */
  constructor(
    private fb: FormBuilder,
    private validacionesService: ValidacionesFormularioService,
    private mediodetransporteService: MediodetransporteService
  ) {
    // Inicializar el formulario principal
    this.crearFormSolicitud();
  }

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
    return this.validacionesService.isValid(form, field);
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
        tipoDeCertificado: ['', Validators.required],
        seccionAduanera: ['', Validators.required],
        puntoDestino: ['', Validators.required],
        paisDeDestino: ['', Validators.required],
        paisDeProcedencia: ['', Validators.required]
      }),
      datosMercancia: this.fb.group({
        rangoDeFechas: [''],
        fechaInicio: [{ value: '', disabled: true }, [Validators.required]],
        fechaFinal: [[{ value: '', disabled: true }, [Validators.required]]],
        datosGenerales: this.fb.group({
          fraccionArancelaria: ['', [Validators.required]],
          descdelaFraccion: ['', Validators.required],
          cantidadUMT: ['', Validators.required],
          UMT: ['', Validators.required],
          cantidadUMC: ['', Validators.required],
          UMC: ['', Validators.required],
          paisdeOrigen: ['', Validators.required],
          entidadFederativadeOrigen: ['', Validators.required],
          municipiodeOrigen: [[''], Validators.required],
          datosOrigen: this.fb.array([]),
          marcasDistintivas: ['', Validators.required],
          USO: ['', Validators.required]
        })
      }),
      numeroDescDeLosEmpaques: this.fb.group({
        numero: ['', [Validators.required]],
        empaques: ['', [Validators.required]]
      }),
      unidadDeVerificacion: this.fb.group({
        unidadDeVerify: ['', [Validators.required]],
        terceroEspecialista: ['', [Validators.required]]
      }),
      unidadExpedidoraFitosanitario: this.fb.group({
        entidadFederative: ['', [Validators.required]],
        terceroEspecialista: ['', [Validators.required]]
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
  mercancia_colapsable() {
    this.mercanciaCollapsable = !this.mercanciaCollapsable;
  }

  /**
   * Método para eliminar una mercancía de la lista.
   * @param {number} i - Índice de la mercancía a eliminar.
   * @returns {void}
   */
  mercancia_borrar(i: number): void {
    this.datosGeneralesArr.splice(i, 1);
  }

  /**
   * Adds a new item to the `datosGeneralesArr` array by retrieving the value from the `datosMercancia` form's `datosGenerales` control.
   * After adding the item, it collapses the `mercancia` section.
   *
   * @memberof SolicitudComponent
   */
  mercanciaAgregar() {
    this.datosGeneralesArr.push(this.datosMercancia.get('datosGenerales')?.value);
    this.mercancia_colapsable();
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
   * Este método se utiliza para destruir la suscripción.
   * @returns destroyed$
   */
  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

}
