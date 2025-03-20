import { ADUANAS_DISPONIBLES } from '../../constantes/disponibles-constante.enum';
import { CargarDatosIniciales } from '@ng-mf/data-access-user';
import { Catalogo } from '@ng-mf/data-access-user';
import { Component } from '@angular/core';
import { DETALLE } from '../../constantes/disponibles-constante.enum';
import { DISPONSIBLE_ADUANA_CHECKBOXES } from '../../constantes/disponibles-constante.enum';
import { FormArray } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { MERCANCIAS } from '../../constantes/disponibles-constante.enum';
import { MediodetransporteService } from '../../services/medio-de-transporte.service';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { Solicitud } from '@ng-mf/data-access-user';
import { Solicitud230101Query } from '../../estados/queries/tramites230101.query';
import { Solicitud230101State } from '../../estados/tramites/tramites230101.store';
import { Solicitud230101Store } from '../../estados/tramites/tramites230101.store';
import { SolicitudPantallasService } from '../../services/solicitud-pantallas.service';
import { Subject } from 'rxjs';
import { TEXTOS } from '../../constantes/certificado-zoosanitario.enum';
import { ValidacionesFormularioService } from '@ng-mf/data-access-user';
import { Validators } from '@angular/forms';
import { map } from 'rxjs';
import { takeUntil } from 'rxjs';


/**
 * Componente para la vista de la solicitud de la sección de "230101".
 */

@Component({
  selector: 'solicitud',
  templateUrl: './solicitud.component.html',
  styleUrl: './solicitud.component.scss',
})

/**
 * Componente que representa la página de solicitud.
 */

export class SolicitudComponent implements OnInit, OnDestroy{

  private destroyNotifier$: Subject<void> = new Subject();
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  public disponsibleAduanaCheckboxes = DISPONSIBLE_ADUANA_CHECKBOXES;
  public TEXTOS = TEXTOS;
  public mercanicias = MERCANCIAS;
  public detalle = DETALLE

  /**
   * Estado de la solicitud.
   */
  public solicitudState!: Solicitud230101State;

  public crosListAduanas = ADUANAS_DISPONIBLES;

  // public crosListAduanas = TEST_CROSS_LIST;

  /**
 * Arreglo para almacenar el rango de días seleccionables.
 */
  selectRangoDias: string[] = this.crosListAduanas;
  /**
 * Arreglo para almacenar las fechas seleccionadas por el usuario.
 */
  // fechasSeleccionadas: string[] = [];
  /**
   * Arreglo para almacenar los datos relacionados con las fechas.
   */
  // fechasDatos: string[] = [];
  /**
 * Control de formulario para manejar una fecha individual.
 */
  fecha: FormControl = new FormControl('');

  /**
   * Control de formulario para manejar una fecha seleccionada por el usuario.
   */
  fechaSeleccionada: FormControl = new FormControl('');

  /**
   * Etiquetas para el componente CrossList que representan el país de procedencia.
   */
  public paisDeProcedenciaLabel = {
    tituluDeLaIzquierda: 'País de origen',
    derecha: 'País(es) seleccionados',
  };

  /**
   * Lista de catálogos de Seleccione una opción.
   */
  options!: Catalogo[];

  

  public aduanaLabel = {
    tituluDeLaIzquierda: 'País de procedencia',
    derecha: 'País(es) seleccionados',
  };

  public paisLabel = {
    tituluDeLaIzquierda: 'Paises disponibles',
    derecha: 'Paises seleccionados',
  };

  public destinoLabel = {
    tituluDeLaIzquierda: 'Entidades desponibles',
    derecha: 'Entidades seleccionados',
  };

   /**
   * Constructor del componente.
   * @param fb FormBuilder para crear formularios.
   * @param solicitudService Servicio para gestionar las pantallas de solicitud.
   */
  constructor(
    private fb: FormBuilder,
    private solicitudService: SolicitudPantallasService,
    private solicitud230101Store: Solicitud230101Store,
    private solicitud230101Query: Solicitud230101Query,
    private mediodetransporteService: MediodetransporteService,
    private validacionesService: ValidacionesFormularioService
  ) {
    this.cargarDatosIniciales();
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
    this.solicitud230101Query.selectSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.solicitudState = seccionState;
        })
      )
      .subscribe();

    // Inicializar el formulario principal
    this.crearFormulario();
  }

  /**
     * Inicializa los catálogos necesarios para el formulario.
     */
  private inicializaCatalogos(): void {

    this.mediodetransporteService
      .getMedioDeTransporte()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data: Catalogo[]): void => {
        this.options = data as Catalogo[];
      });
  }

  /**
  * Formulario principal de la solicitud.
  */
  FormSolicitud!: FormGroup;

  /**
   * Historial de solicitudes.
   */
  hSolicitud: string[] = [];

  /**
   * Datos de las solicitudes.
   */
  dSolicitud: Solicitud[] = [];

  /**
  * Obtiene el grupo de formulario 'tipoRegimen' del formulario principal 'FormSolicitud'.
  *
  * @returns {FormGroup} El grupo de formulario 'tipoRegimen'.
  */
  get tipoRegimen(): FormGroup {
    return this.FormSolicitud.get('tipoRegimen') as FormGroup;
  }

  /**
  * Obtiene el grupo de formulario 'aduanaForm' del formulario principal 'FormSolicitud'.
  *
  * @returns {FormGroup} El grupo de formulario 'aduanaForm'.
  */
  get aduanaForm(): FormGroup {
    return this.FormSolicitud.get('aduanaForm') as FormGroup;
  }

  /**
  * Obtiene el grupo de formulario 'selectedOptions' del formulario principal 'FormSolicitud'.
  *
  * @returns {FormGroup} El grupo de formulario 'selectedOptions'.
  */
  get selectedOptions(): FormArray {
    return this.aduanaForm.get('selectedOptions') as FormArray;
  }

  /**
  * Obtiene el grupo de formulario 'fechasDatos' del formulario principal 'FormSolicitud'.
  *
  * @returns {FormGroup} El grupo de formulario 'fechasDatos'.
  */
  get fechasDatos(): FormArray {
    return this.aduanaForm.get('fechasDatos') as FormArray;
  }

  /**
  * Obtiene el grupo de formulario 'fechasSeleccionadas' del formulario principal 'FormSolicitud'.
  *
  * @returns {FormGroup} El grupo de formulario 'fechasSeleccionadas'.
  */
  get fechasSeleccionadas(): FormArray {
    return this.aduanaForm.get('fechasSeleccionadas') as FormArray;
  }

  /**
  * Obtiene el grupo de formulario 'mercanciaForm' del formulario principal 'FormSolicitud'.
  *
  * @returns {FormGroup} El grupo de formulario 'mercanciaForm'.
  */
  get mercanciaForm(): FormGroup {
    return this.FormSolicitud.get('mercanciaForm') as FormGroup;
  }

  /**
  * Obtiene el grupo de formulario 'detalleForm' del formulario principal 'FormSolicitud'.
  *
  * @returns {FormGroup} El grupo de formulario 'detalleForm'.
  */
  get detalleForm(): FormGroup {
    return this.FormSolicitud.get('detalleForm') as FormGroup;
  }

  /**
  * Obtiene el grupo de formulario 'manifiestosForm' del formulario principal 'FormSolicitud'.
  *
  * @returns {FormGroup} El grupo de formulario 'manifiestosForm'.
  */
  get manifiestosForm(): FormGroup {
    return this.FormSolicitud.get('manifiestosForm') as FormGroup;
  }

  /**
   * Método para crear el formulario de la solicitud.
   */
  crearFormulario(): void {
    this.FormSolicitud = this.fb.group({
      tipoRegimen: this.fb.group({
        clave: [this.solicitudState?.clave, Validators.required]
      }),
      aduanaForm: this.fb.group({
        tipoDeProducto: [this.solicitudState?.tipoDeProducto, Validators.required],
        paisDeProcedencia: [this.solicitudState?.paisDeProcedencia, Validators.required],
        selectedOptions: this.fb.array(this.solicitudState?.selectedOptions),
        clasificacionMercancias: [this.solicitudState?.clasificacionMercancias, Validators.required],
        fechasDatos: this.fb.array(this.solicitudState?.fechasDatos),
        fechasSeleccionadas: this.fb.array(this.solicitudState?.fechasSeleccionadas)
      }),
      mercanciaForm: this.fb.group({
        fraccionArancelaria: [this.solicitudState?.fraccionArancelaria, Validators.required],
        descFraccionArancelaria: [{ value: this.solicitudState?.descFraccionArancelaria, disabled: true }, Validators.required],
        cantidad: [this.solicitudState?.cantidad, Validators.required],
        cantidadLetra: [{ value: this.solicitudState?.cantidadLetra, disabled: true }]
      }),
      detalleForm: this.fb.group({
        genero: [this.solicitudState?.genero, Validators.required],
        especie: [this.solicitudState?.especie, Validators.required],
        nombreComun: [this.solicitudState?.nombreComun, Validators.required],
        descDelProducto:[this.solicitudState?.descDelProducto, Validators.required],
        unidadDeMedida: [this.solicitudState?.unidadDeMedida, Validators.required]
      }),
      manifiestosForm: this.fb.group({
        manifiestosYdesc: [this.solicitudState?.manifiestosYdesc, Validators.required]
      })
    });
  }

  onCheckboxChange(event: Event, index: number): void {
    const INPUT_ELEMENT = event.target as HTMLInputElement;
    this.selectedOptions.controls[index].setValue(INPUT_ELEMENT.checked);
    this.setValoresStore(this.aduanaForm, 'selectedOptions', 'setSelectedOptions');
  }



  /**
    * Método para buscar y cargar datos iniciales del servicio.
    */
  cargarDatosIniciales(): void {
    this.solicitudService.getData().subscribe({
      next: (data: CargarDatosIniciales) => {
        this.hSolicitud = data.hSolicitud;
        this.dSolicitud = data.dSolicitud;
      }
    });
  }

  /**
   * Establece los valores en el store de tramite5701.
   *
   * @param {FormGroup} form - El formulario del cual se obtiene el valor.
   * @param {string} campo - El nombre del campo del formulario cuyo valor se va a obtener.
   * @param {string} metodoNombre - El nombre del método en el store que se va a invocar con el valor del campo.
   * @returns {void}
   */
  setValoresStore(form: FormGroup, campo: string, metodoNombre: keyof Solicitud230101Store): void {
    const VALOR = form.get(campo)?.value;
    (this.solicitud230101Store[metodoNombre] as (value: string | number | boolean) => void)(VALOR);
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
   * Este método se utiliza para destruir la suscripción.
   * @returns destroyed$
   */
  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }

}
