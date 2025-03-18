import { Catalogo } from '@ng-mf/data-access-user';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FECHA_FINAL, FECHA_INICIO } from '@ng-mf/data-access-user';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { InputFecha } from '@ng-mf/data-access-user';
import { map, ReplaySubject, Subject, takeUntil } from 'rxjs';
import { MediodetransporteService } from '../../services/medio-de-transporte.service';
import { Solicitud230101State, Solicitud230101Store } from '../../estados/tramites/tramites230101.store';
import { Solicitud230101Query } from '../../estados/queries/tramites230101.query';
import { ValidacionesFormularioService } from '@ng-mf/data-access-user';
import { Solicitud } from '@ng-mf/data-access-user';
import { SolicitudPantallasService } from '../../services/solicitud-pantallas.service';
import { CargarDatosIniciales } from '@ng-mf/data-access-user';
import { ADUANAS_DISPONIBLES, CONTINUAR, DISPONSIBLE_ADUANA_CHECKBOXES } from '../../constantes/disponibles-constante.enum';
import { TEXTOS } from '../../constantes/certificado-zoosanitario.enum';


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

export class SolicitudComponent {

  private destroyNotifier$: Subject<void> = new Subject();

  public disponsibleAduanaCheckboxes = DISPONSIBLE_ADUANA_CHECKBOXES;
  public TEXTOS = TEXTOS;

  /**
   * Estado de la solicitud.
   */
  public solicitudState!: Solicitud230101State;

  public crosListAduanas = ADUANAS_DISPONIBLES;
  /**
   * Lista de rangos de días seleccionarOrigenDelPais.
   */
  seleccionarAduanas: string[] = this.crosListAduanas;

  /**
   * Lista de fechas paisDeProcedenciaSeleccionadas.
   */
  aduanaSeleccionadas: string[] = [];

  /**
   * Lista de datos de fechas paisDeProcedenciaDatos.
   */
  aduanaDatos: string[] = [];

  /**crosListaDePaises
   * Control de formulario para la aduanaFecha.
   */
  aduanaFecha: FormControl = new FormControl('');

  /**
   * Control de formulario para la fecha aduanaFechaSeleccionada.
   */
  aduanaFechaSeleccionada: FormControl = new FormControl('');

  /**
   * Lista de catálogos de Seleccione una opción.
   */
  options!: Catalogo[];

  /**
   * Botones de acción disponibles para gestionar las listas de fechas.
   */
  aduanaBotons = [
    {
      btnNombre: 'Agregar todos',
      class: 'btn-primary',
      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
      funcion: () => this.agregar(''),
    },
    {
      btnNombre: 'Agregar selección',
      class: 'btn-default',
      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
      funcion: () => this.agregar(CONTINUAR),
    },
    {
      btnNombre: 'Restar selección',
      class: 'btn-danger',
      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
      funcion: () => this.quitar(''),
    },
    {
      btnNombre: 'Restar todos',
      class: 'btn-default',
      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
      funcion: () => this.quitar(CONTINUAR),
    },
  ];

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

  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

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
   * Agrega elementos a la lista de fechas según el tipo especificado.
   * @param {string} tipo - Tipo de acción a realizar.
   */

  agregar(tipo: string): void {
    if (tipo === CONTINUAR) {
      this.aduanaSeleccionadas = [...this.seleccionarAduanas];
      this.aduanaDatos = [];
    } else {
      const FECHAVALOR = this.aduanaFecha.value.map(Number);
      this.aduanaSeleccionadas.push(
        this.aduanaDatos[FECHAVALOR]
      );
      this.aduanaDatos.splice(FECHAVALOR, 1);
    }
  }

  /**
   * Elimina elementos de la lista de fechas según el tipo especificado.
   * @param {string} tipo - Tipo de acción a realizar.
   */
  quitar(tipo: string = ''): void {
    if (tipo === CONTINUAR) {
      this.aduanaDatos = [...this.aduanaSeleccionadas];
      this.aduanaSeleccionadas = [];
    } else {
      const FECHAVALOR =
        this.aduanaFechaSeleccionada.value.map(Number);
      this.aduanaDatos.push(
        this.aduanaSeleccionadas[FECHAVALOR]
      );
      this.aduanaSeleccionadas.splice(FECHAVALOR, 1);
    }
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
    // this.selectRangoDias = this.fechaService.obtenerDiasEntreFechas(
    //   formatoFechaInicial,
    //   formatoFechaFinal
    // );
  }

  /**
     * Inicializa los catálogos necesarios para el formulario.
     */
  private inicializaCatalogos(): void {

    this.mediodetransporteService
      .getMedioDeTransporte()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data: any): void => {
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
  * Obtiene el grupo de formulario 'tipoDeRegimen' del formulario principal 'FormSolicitud'.
  *
  * @returns {FormGroup} El grupo de formulario 'tipoDeRegimen'.
  */
  get tipoDeRegimen(): FormGroup {
    return this.FormSolicitud.get('tipoDeRegimen') as FormGroup;
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
  get selectedOptions(): any {
    return this.aduanaForm.get('selectedOptions') as FormArray;
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
   * Método para crear el formulario de la solicitud.
   */
  crearFormulario(): void {
    this.FormSolicitud = this.fb.group({
      tipoDeRegimen: this.fb.group({
        ambiental: [this.solicitudState?.ambiental, Validators.required]
      }),
      aduanaForm: this.fb.group({
        tipoDeProducto: [this.solicitudState?.tipoDeProducto, Validators.required],
        paisDeProcedencia: [this.solicitudState?.paisDeProcedencia, Validators.required],
        selectedOptions: this.fb.array(this.solicitudState?.selectedOptions),
        clasificacionMercancias: [this.solicitudState?.clasificacionMercancias, Validators.required]
      }),
      mercanciaForm: this.fb.group({
        fraccionArancelaria: [this.solicitudState?.fraccionArancelaria, Validators.required],
        descFraccionArancelaria: [this.solicitudState?.descFraccionArancelaria, Validators.required, { disabled: true }],
        cantidad: [this.solicitudState?.cantidad, Validators.required],
        cantidadLetra: [this.solicitudState?.cantidadLetra, { disabled: true }]
      }),
      detalleForm: this.fb.group({
        genero: [this.solicitudState?.genero, Validators.required],
        especie: [this.solicitudState?.especie, Validators.required],
        nombreComun: [this.solicitudState?.nombreComun, Validators.required]
      })
    });
  }

  onCheckboxChange(event: any, index: number) {
    this.selectedOptions.controls[index].setValue(event.target.checked);
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
    (this.solicitud230101Store[metodoNombre] as (value: any) => void)(VALOR);
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

}
