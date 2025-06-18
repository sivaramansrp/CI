import { AfterViewInit, Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CROSLISTA_DE_PAISES } from '../../constants/datos-solicitud.enum';
import { Catalogo } from '@ng-mf/data-access-user';
import { CatalogoSelectComponent } from '@ng-mf/data-access-user';
import { CommonModule } from '@angular/common';
import { CrossListLable } from '@ng-mf/data-access-user';
import { CrosslistComponent } from '@ng-mf/data-access-user';
import { DatosSolicitudService } from '../../services/datos-solicitud.service';
import { EventEmitter } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Location } from '@angular/common';
import { MercanciaDetalle } from '../../models/datos-del-tramite.model';
import { NO_VISIBILIDAD_UMC } from '../../constants/datos-del-tramilte.enum';
import { OnInit } from '@angular/core';
import { Output } from '@angular/core';
import { PUEDE_MOSTRAR_LA_LISTA_CRUZADA_FOR_MERCANCIA } from '../../constants/datos-del-tramilte.enum';
import { REGEX_NUMEROS } from '@ng-mf/data-access-user';
import { REGEX_SOLO_DIGITOS } from '@libs/shared/data-access-user/src';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { TituloComponent } from '@ng-mf/data-access-user';
import { Validators } from '@angular/forms';
import { takeUntil } from 'rxjs';
/**
 * @title Datos de la Mercancía
 * @description Componente que permite capturar y emitir la información relacionada con una mercancía específica.
 * @summary Componente para gestionar los datos de la mercancía, incluyendo fracción arancelaria, país de origen, valores y unidades.
 */

@Component({
  selector: 'app-datos-mercancia',
  standalone: true,
  imports: [
    CommonModule,
    TituloComponent,
    CatalogoSelectComponent,
    ReactiveFormsModule,
    CrosslistComponent,
  ],
  templateUrl: './datos-mercancia.component.html',
  styleUrl: './datos-mercancia.component.scss',
})
export class DatosMercanciaComponent implements OnInit, AfterViewInit {
  /**
   * Observable para controlar el ciclo de vida de las suscripciones.
   * @property {Subject<void>} unsubscribe$
   */
  private unsubscribe$ = new Subject<void>();

  /**
   * Lista de mercancías registradas.
   * @property {MercanciaDetalle[]} datosMercancias
   */
  datosMercancias: MercanciaDetalle[] = [];

  /**
   * Evento que emite la lista de mercancías cuando se actualiza.
   * @event updateMercanciaDetalle
   */
  @Output() updateMercanciaDetalle = new EventEmitter<MercanciaDetalle[]>();

  /**
   * @property {number} idProcedimiento
   * Identificador único del procedimiento asociado a la solicitud.
   * Este valor es recibido como un input desde el componente padre.
   *
   * @decorador @Input
   */
  @Input() public idProcedimiento!: number;

  /**
   * Datos de la mercancía que se reciben desde el componente padre para ser editados o visualizados.
   * Puede ser un objeto de tipo `MercanciaDetalle`, `null` o `undefined`.
   *
   * @type {MercanciaDetalle | null | undefined}
   * @memberof DatosMercanciaComponent
   * @input
   */
  @Input() formaDatos!: MercanciaDetalle | null | undefined;

  /**
   * @input
   * Indica si el formulario debe mostrarse en modo solo lectura.
   * Cuando es `true`, los campos del formulario no serán editables.
   *
   * @type {boolean}
   */
  @Input() esFormularioSoloLectura: boolean = false;

  /**
   * Evento que se emite cuando se actualiza una mercancía existente en la lista.
   * Envía un arreglo de objetos `MercanciaDetalle` al componente padre.
   *
   * @type {EventEmitter<MercanciaDetalle[]>}
   * @memberof DatosMercanciaComponent
   * @output
   */
  @Output() actualizaExistenteEnDatosMercancias = new EventEmitter<
    MercanciaDetalle[]
  >();

  /**
   * Evento que se emite cuando el usuario cancela la operación.
   * Envía un valor booleano al componente padre para indicar la acción de cancelación.
   *
   * @type {EventEmitter<boolean>}
   * @memberof DatosMercanciaComponent
   * @output
   */
  @Output() cancelarEventListener = new EventEmitter<boolean>();

  /**
   * Indica si se puede mostrar la lista cruzada.
   * Esta propiedad controla la visibilidad de la lista cruzada
   * en el componente de datos de mercancía.
   */
  public puedeMostrarLaListaCruzada = false;

  /**
   * Formulario reactivo para capturar los datos de la mercancía.
   * @property {FormGroup} datosMercancia
   */
  datosMercancia!: FormGroup;

  /**
   * Catálogo de fracciones arancelarias.
   * @property {Catalogo[]} fraccionesCatalogo
   */
  fraccionesCatalogo: Catalogo[] = [];

  /**
   * Catálogo de unidades de medida comercial (UMC).
   * @property {Catalogo[]} umcCatalogo
   */
  umcCatalogo: Catalogo[] = [];

  /**
   * Catálogo de tipos de moneda.
   * @property {Catalogo[]} monedaCatalogo
   */
  monedaCatalogo: Catalogo[] = [];

  /**
   * @description Indica la visibilidad del campo de Unidad de Medida y Cantidad (UMC).
   * @type {boolean}
   * @default false
   */
  public visibilidadCampoUMC = true;

  /**
   * Lista de países disponibles para seleccionar el país de origen.
   * @property {string[]} seleccionarOrigenDelPais
   */
  public seleccionarOrigenDelPais = CROSLISTA_DE_PAISES;

  /**
   * Etiquetas para el componente Crosslist de país de origen.
   * @property {CrossListLable} paisDeOriginLabel
   */
  public paisDeOriginLabel: CrossListLable = {
    tituluDeLaIzquierda: 'País de origen',
    derecha: 'País(es) seleccionado(s)',
  };

  /**
   * Países seleccionados como origen de la mercancía.
   * @property {string[]} seleccionadasPaisDeOriginDatos
   */
  public seleccionadasPaisDeOriginDatos: string[] = [];

  /**
   * Constructor del componente.
   * @method constructor
   * @param {FormBuilder} fb - Servicio para construir formularios reactivos.
   * @param {Router} router - Servicio para navegación.
   * @param {ActivatedRoute} activatedRoute - Ruta activa actual.
   * @param {Location} ubicaccion - Servicio para navegación hacia atrás.
   * @param {DatosSolicitudService} datosSolicitudService - Servicio para obtener catálogos relacionados con la mercancía.
   * @returns {void}
   */
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private ubicaccion: Location,
    private datosSolicitudService: DatosSolicitudService
  ) {}
  /**
   * Carga los catálogos necesarios para llenar los selectores del formulario.
   * @method cargarDatos
   * @returns {void}
   */
  cargarDatos(): void {
    this.datosSolicitudService
      .obtenerFraccionesCatalogo()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data) => {
        this.fraccionesCatalogo = data;
      });

    this.datosSolicitudService
      .obtenerUMCCatalogo()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data) => {
        this.umcCatalogo = data;
      });

    this.datosSolicitudService
      .obtenerMonedaCatalogo()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data) => {
        this.monedaCatalogo = data;
      });
  }

  /**
   * Navega hacia la ruta relativa proporcionada.
   * @method irAAcciones
   * @param {string} accionesPath - Ruta relativa hacia la vista de acciones.
   * @returns {void}
   */
  irAAcciones(accionesPath: string): void {
    this.router.navigate([accionesPath], {
      relativeTo: this.activatedRoute,
    });
  }

  /**
   * Maneja el cambio en la selección del país de origen.
   * @method paisDeOriginSeleccionadasChange
   * @param {string[]} events - Lista de países seleccionados.
   * @returns {void}
   */
  paisDeOriginSeleccionadasChange(events: string[]): void {
    this.seleccionadasPaisDeOriginDatos = events;
    this.datosMercancia.patchValue({
      paisDeOriginDatos: events,
    });
  }

  /**
   * Guarda los datos de la mercancía actual, los emite al componente padre y resetea el formulario.
   * @method guardar
   * @returns {void}
   */
  guardar(): void {
    if (this.datosMercancia.invalid) {
      this.datosMercancia.markAllAsTouched();
      return;
    }
    const DATOS_MERCANCIA: MercanciaDetalle = {
      fraccionArancelaria: this.datosMercancia.get('fraccionArancelaria')
        ?.value,
      descripcionFraccion: this.datosMercancia.get('descFraccion')?.value,
      unidadMedidaTarifa: this.datosMercancia.get('umt')?.value,
      umc: this.datosMercancia.get('umc')?.value,
      cantidadUMT: this.datosMercancia.get('cantidadUMT')?.value,
      valorComercial: this.datosMercancia.get('valorComercial')?.value,
      tipoMoneda: this.datosMercancia.get('tipoMoneda')?.value,
      descripcion: this.datosMercancia.get('descripcion')?.value,
      paisOrigen: this.seleccionadasPaisDeOriginDatos.join(','),
    };

    this.datosMercancias.push(DATOS_MERCANCIA);
    if (this.formaDatos) {
      if ('tableIndex' in this.formaDatos) {
        this.datosMercancias[0].tableIndex = (
          this.formaDatos as MercanciaDetalle
        ).tableIndex;
      }
      this.actualizaExistenteEnDatosMercancias.emit(this.datosMercancias);
    } else {
      this.updateMercanciaDetalle.emit(this.datosMercancias);
    }
    this.datosMercancia.reset();
  }

  /**
   * Inicializa el formulario reactivo con valores por defecto y validaciones.
   * @method ngOnInit
   * @returns {void}
   */
  ngOnInit(): void {
    this.crearFormaulario();
    this.cargarDatos();
    this.visibilidadCampoUMC = NO_VISIBILIDAD_UMC.includes(this.idProcedimiento)
      ? false
      : true;
    this.campoObligatorioChange();
    this.puedeMostrarLaListaCruzada =
      PUEDE_MOSTRAR_LA_LISTA_CRUZADA_FOR_MERCANCIA.includes(
        this.idProcedimiento
      );

    // Escuche los cambios en el campo fraccionArancelaria
    this.datosMercancia
      .get('fraccionArancelaria')
      ?.valueChanges.subscribe((value) => {
        if (value === '1') {
          this.datosMercancia
            .get('descFraccion')
            ?.setValue(
              'Azufre de cualquier clase, excepto el sublimado, el precipitado y el coloidal.'
            );
          this.datosMercancia.get('descFraccion')?.disable();
          this.datosMercancia.get('umt')?.setValue('Kilogramo');
          this.datosMercancia.get('umt')?.enable();
        } else if (value === '2') {
          this.datosMercancia
            .get('descFraccion')
            ?.setValue('Otra descripción para 25030003.');
          this.datosMercancia.get('descFraccion')?.disable();
          this.datosMercancia.get('umt')?.setValue('Tonelada');
          this.datosMercancia.get('umt')?.enable();
        } else {
          this.datosMercancia.get('descFraccion')?.setValue(null);
          this.datosMercancia.get('descFraccion')?.disable();
          this.datosMercancia.get('umt')?.setValue(null);
          this.datosMercancia.get('umt')?.disable();
        }
      });
    if (this.formaDatos) {
      this.datosMercancia.patchValue(this.formaDatos);
      this.datosMercancia.enable();
    }
  }
  /**
   * Inicializa el formulario reactivo con valores por defecto y validaciones.
   * @method ngAfterViewInit
   * @returns {void}
   */
  ngAfterViewInit(): void {
    if (this.esFormularioSoloLectura) {
      this.datosMercancia.disable();
    } else {
      this.datosMercancia.enable();
    }
  }

  /**
   * Crea el formulario reactivo `agregarDestinatarioFinal` utilizando `FormBuilder`.
   * Define los campos y sus validaciones.
   *
   */
  crearFormaulario(): void {
    this.datosMercancia = this.fb.group({
      descripcion: ['QAS', Validators.required],
      fraccionArancelaria: ['', { validators: Validators.required }],
      descFraccion: [
        {
          value: null,
          disabled: true,
        },
        { validators: Validators.required },
      ],
      cantidadUMT: [
        '',
        [Validators.required, Validators.pattern(REGEX_SOLO_DIGITOS)],
      ],
      umt: [{ value: null, disabled: true }, Validators.required],
      valorComercial: [null, Validators.required],
      umc: [null, Validators.required],
      tipoMoneda: [null, Validators.required],
      paisDeOriginDatos: [null],
    });
    this.cargarDatos();

    if (this.idProcedimiento === 240122) {
      this.datosMercancia.get('umc')?.disable();
    }
  }
  /**
   * Maneja el evento de entrada en el campo cantidadUMT, permitiendo solo números y limitando la longitud a 22 caracteres.
   *
   * @method onCantidadUMTInput
   * @param {Event} event - Evento de entrada del campo cantidadUMT.
   * @returns {void}
   */
  onCantidadUMTInput(event: Event): void {
    const INPUT = event.target as HTMLInputElement;
    INPUT.value = INPUT.value.replace(REGEX_NUMEROS, '').slice(0, 22);
    this.datosMercancia
      .get('cantidadUMT')
      ?.setValue(INPUT.value, { emitEvent: false });
  }
  /**
   * @method campoObligatorioChange
   * @description Cambia las validaciones de los campos del formulario según el valor de `campoObligatorioProveedor`.
   * Si `campoObligatorioProveedor` es verdadero, se eliminan las validaciones de la colonia y se agregan
   * validaciones requeridas para la calle y el número exterior. Si es falso, se realiza lo contrario.
   *
   * @returns {void} Este método no retorna ningún valor.
   */
  campoObligatorioChange(): void {
    const UMC = this.datosMercancia.get('umc');
    if (!this.visibilidadCampoUMC) {
      UMC?.clearValidators();
    } else {
      UMC?.setValidators([Validators.required]);
    }
    UMC?.updateValueAndValidity();
  }

  /**
   * Limpia todos los campos del formulario.
   * @method limpiarFormulario
   * @returns {void}
   */
  limpiarFormulario(): void {
    this.datosMercancia.reset();
  }

  /**
   * @method cancelar
   * @description Navega hacia la vista anterior utilizando el servicio de ubicación (`Location`).
   * @returns {void}
   */
  cancelar(): void {
    this.cancelarEventListener.emit(true);
    this.ubicaccion.back();
  }
}
