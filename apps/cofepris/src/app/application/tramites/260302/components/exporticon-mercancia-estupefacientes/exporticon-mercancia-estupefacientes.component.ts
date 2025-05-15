import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  CROSLISTA_DE_FORMAS_FARMACEUTICAS,
  CROSLISTA_DE_PAISES,
} from '../../../../shared/constantes/datos-solicitud.enum';
import {
  Catalogo,
  CrossListLable,
  MercanciaFormEstupefacientes,
  TablaMercanciasDatos,
} from '../../../../shared/models/datos-solicitud.model';
import {
  CatalogoSelectComponent,
  CrosslistComponent,
  TablaSeleccion,
  TituloComponent,
} from '@libs/shared/data-access-user/src';
import { CommonModule, Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, first, takeUntil, tap } from 'rxjs';
import {
  Tramite260302State,
  Tramite260302Store,
} from '../../estados/tramite260302Store.store';
import { DatosSolicitudService } from '../../../../shared/services/datos-solicitud.service';
import { Tramite260302Query } from '../../estados/tramite260302Query.query';

/**
 * @component DatosMercanciaComponent
 * @description Componente encargado de capturar y emitir los datos de una mercancía.
 * Utiliza formularios reactivos y listas cruzadas para países de origen, procedencia y uso específico.
 */
@Component({
  selector: 'app-exporticon-mercancia-estupefacientes',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TituloComponent,
    CatalogoSelectComponent,
    CrosslistComponent,
  ],
  templateUrl: './exporticon-mercancia-estupefacientes.component.html',
  styleUrl: './exporticon-mercancia-estupefacientes.component.scss',
  providers: [DatosSolicitudService],
})
export class ExporticonMercanciaEstupefacientesComponent
  implements OnInit, OnDestroy
{
  /**
   * @property {FormGroup} mercanciaForm
   * Formulario reactivo principal para capturar los datos de la mercancía.
   */
  public mercanciaForm!: FormGroup;

  /**
   * @property {MercanciaForm} MercanciaFormEstupefacientes
   * Input que recibe el estado inicial del formulario de mercancía.
   */
  public mercanciaFormState!: MercanciaFormEstupefacientes;

  /**
   * @property {MercanciaForm} MercanciaFormEstupefacientes
   * Input que recibe el estado inicial del formulario de mercancía.
   */
  public datoSeleccionado!: TablaMercanciasDatos;

  /**
   * @property {Catalogo[]} clasificacionProductoDatos
   * @description Catalog of product classifications used to populate the form.
   */
  public clasificacionProductoDatos!: Catalogo[];

  /**
   * @property {Catalogo[]} especificarClasificacionProductoDatos
   * @description Catalog of specific product classifications used to populate the form.
   */
  public especificarClasificacionProductoDatos!: Catalogo[];

  /**
   * @property {Catalogo[]} tipoProductoDatos
   * @description Catalog of product types used to populate the form.
   */
  public tipoProductoDatos!: Catalogo[];

  /**
   * @property {Catalogo[]} estadoFisicoDatos
   * @description Catalog of physical states used to populate the form.
   */
  public estadoFisicoDatos!: Catalogo[];

  /**
   * @property {Catalogo[]} cantidadUmcDatos
   * @description Catalog of commercial unit quantities used to populate the form.
   */
  public cantidadUmcDatos!: Catalogo[];

  /**
   * @property {boolean} formFormaceuticaColapsable
   * Controla la visibilidad del listado de forma farmacéutica.
   */
  public formFormaceuticaColapsable = false;

  /**
   * @property {boolean} usoEspesificoColapsable
   * Controla la visibilidad del listado de uso específico.
   */
  public usoEspesificoColapsable = false;

  /**
   * @property {CrossListLable} usoEspesificoLabel
   * Etiqueta personalizada para el componente de lista cruzada de uso específico.
   * Define los títulos para los elementos disponibles y seleccionados.
   */
  public usoEspesificoLabel: CrossListLable = {
    tituluDeLaIzquierda: 'Uso específico',
    derecha: 'Uso específico',
  };

  /**
   * @property {CrossListLable} formaFaramaceuticaLabel
   * Etiqueta personalizada para el componente de lista cruzada de forma farmacéutica.
   * Define los títulos para los elementos disponibles y seleccionados.
   */
  public formaFaramaceuticaLabel: CrossListLable = {
    tituluDeLaIzquierda: 'Forma farmacéutica',
    derecha: 'Forma farmacéutica',
  };

  /**
   * @property {string[]} seleccionadasFormaFormaceuticaDatos
   * Lista de países seleccionados como origen.
   */
  public seleccionadasFormaFormaceuticaDatos: string[] = [];

  /**
   * @property {string[]} seleccionadasUsoEspesificoDatos
   * Lista de usos específicos seleccionados.
   */
  public seleccionadasUsoEspesificoDatos: string[] = [];

  /**
   * @property {Catalogo[]} usoEspesificoDatos
   * Datos de usos específicos para lista cruzada.
   */
  public usoEspesificoDatos = CROSLISTA_DE_PAISES;

  /**
   * @property {Catalogo[]} seleccionarOrigenFormaFormaceutica
   * @description Lista cruzada de formas farmacéuticas.
   */
  public seleccionarOrigenFormaFormaceutica = CROSLISTA_DE_FORMAS_FARMACEUTICAS;

  /**
   * Tipo de selección de la tabla (en este caso, selección por checkbox).
   */
  tipoSeleccionTabla = TablaSeleccion.CHECKBOX;

  /**
   * @property {Catalogo[]} paisDeDestinoDatos
   * Datos de países para lista cruzada de país de destino.
   */
  public paisDeDestinoDatos: Catalogo[] = [];

  /**
   * @property {Subject<void>} destroyNotifier$
   * Subject utilizado para limpiar las suscripciones activas al destruir el componente.
   * @private
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * @property {Tramite260302State} tramiteState
   * Estado completo del trámite, que contiene información como la tabla de mercancías.
   */
  public tramiteState!: Tramite260302State;

  /**
   * @constructor
   * Inicializa el formulario de mercancía y carga catálogos desde archivos JSON.
   *
   * @param fb - FormBuilder para construir formularios reactivos.
   * @param datosSolicitudService - Servicio que carga catálogos desde assets.
   * @param ubicaccion - Servicio para manejar navegación (si es necesario).
   */
  constructor(
    private fb: FormBuilder,
    private datosSolicitudService: DatosSolicitudService,
    private tramite260302Query: Tramite260302Query,
    private tramite260302Store: Tramite260302Store,
    private ubicaccion: Location
  ) {
    this.datosSolicitudService.obtenerRespuestaPorUrl(
      this,
      'clasificacionProductoDatos',
      '/cofepris/mercanciaClasificacionProducto.json'
    );
    this.datosSolicitudService.obtenerRespuestaPorUrl(
      this,
      'especificarClasificacionProductoDatos',
      '/cofepris/especificarClasificacionProducto.json'
    );
    this.datosSolicitudService.obtenerRespuestaPorUrl(
      this,
      'tipoProductoDatos',
      '/cofepris/tipoProductoDatos.json'
    );
    this.datosSolicitudService.obtenerRespuestaPorUrl(
      this,
      'estadoFisicoDatos',
      '/cofepris/estadoFisicoDatos.json'
    );
    this.datosSolicitudService.obtenerRespuestaPorUrl(
      this,
      'cantidadUmcDatos',
      '/cofepris/cantidadUmcDatos.json'
    );
    this.datosSolicitudService.obtenerRespuestaPorUrl(
      this,
      'paisDeDestinoDatos',
      '/cofepris/paisDeDestinoDatos.json'
    );
    this.datosSolicitudService.obtenerRespuestaPorUrl(
      this,
      'paisDeProcedenciaDatos',
      '/cofepris/paisDeProcedenciaDatos.json'
    );
  }

  /**
   * @method ngOnInit
   * @description Hook de ciclo de vida que se ejecuta al inicializar el componente.
   * Llama al método `crearMercanciaForm` para construir el formulario.
   */
  ngOnInit(): void {
    this.tramite260302Query.selectTramiteState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        first(),
        tap((seccionState) => {
          this.tramiteState = seccionState;
          if (seccionState.seleccionadoTablaMercanciasDatos[0]) {
            this.datoSeleccionado =
              seccionState.seleccionadoTablaMercanciasDatos[0];
          }
          this.mercanciaFormState = this.tramiteState.mercanciaForm;
          this.crearMercanciaForm();
        })
      )
      .subscribe();
  }

  /**
   * @method crearMercanciaForm
   * @description Crea y configura el formulario reactivo para la gestión de mercancías estupefacientes.
   * Este formulario incluye validaciones requeridas para varios campos relacionados con la clasificación,
   * denominación, tipo, cantidad, origen y otros detalles específicos de la mercancía.
   *
   * @returns {void} No retorna ningún valor.
   *
   */
  crearMercanciaForm(): void {
    this.mercanciaForm = this.fb.group({
      clasificacionProducto: [
        this.obtenerValor('clasificacionProducto'),
        Validators.required,
      ],
      especificarClasificacionProducto: [
        this.obtenerValor('especificarClasificacionProducto'),
        Validators.required,
      ],
      denominacionCumonInternacional: [
        this.obtenerValor('denominacionCumonInternacional'),
        Validators.required,
      ],
      marcaComercialDenominacion: [
        this.obtenerValor('marcaComercialDenominacion'),
        Validators.required,
      ],
      tipoProducto: [this.obtenerValor('tipoProducto'), Validators.required],
      formaFarmaceutica: [
        this.obtenerValor('formaFarmaceutica'),
        Validators.required,
      ],
      estadoFisico: [this.obtenerValor('estadoFisico'), Validators.required],
      fraccionArancelaria: [
        this.obtenerValor('fraccionArancelaria'),
        Validators.required,
      ],
      descripcionFraccion: [
        this.obtenerValor('descripcionFraccion'),
        Validators.required,
      ],
      unidadMedidaTarifa: [
        this.obtenerValor('unidadMedidaTarifa'),
        Validators.required,
      ],
      cantidadUMT: [this.obtenerValor('cantidadUMT'), Validators.required],
      cantidadUMC: [this.obtenerValor('cantidadUMC'), Validators.required],
      unidadMedidaComercializacion: [
        this.obtenerValor('unidadMedidaComercializacion'),
        Validators.required,
      ],

      numeroCAS: [this.obtenerValor('numeroCAS')],
      cantidadDeLotes: [
        this.obtenerValor('cantidadDeLotes'),
        Validators.required,
      ],

      paisDeDestino: ['101', Validators.required],

      paisDeProcedencia: [
        this.obtenerValor('paisDeProcedencia'),
        Validators.required,
      ],

      presentacion: [this.obtenerValor('presentacion'), Validators.required],
      usoEspecifico: [this.obtenerValor('usoEspecifico')],
    });
  }

  /**
   * Valida si el campo de un formulario no contiene errores
   * @param {AbstractControl} control  : Control del formulario
   * @param {string} campo  : Nombre del campo a validar, si el control es un FormGroup
   * @returns {boolean | null} : Retorna true si el campo contiene errores y ha sido tocado, de lo contrario retorna false
   */
  // eslint-disable-next-line class-methods-use-this
  public isValid(control: AbstractControl, campo?: string): boolean | null {
    if (control instanceof FormGroup && campo) {
      return (
        control.controls[campo]?.errors && control.controls[campo]?.touched
      );
    }
    return control.errors && control.touched;
  }

  /**
   * Maneja el evento de cambio para las selecciones de forma farmacéutica.
   *
   * @param events - Un arreglo de cadenas que representa las selecciones actuales de forma farmacéutica.
   *
   * Este método actualiza la propiedad `seleccionadasFormaFormaceuticaDatos` con las selecciones proporcionadas
   * y actualiza el formulario `mercanciaForm` para reflejar los valores seleccionados en el campo `formaFarmaceutica`.
   */
  formaFarmaceuticaSeleccionadasChange(events: string[]): void {
    this.seleccionadasFormaFormaceuticaDatos = events;
    if (events.length > 0) {
      this.mercanciaForm.get('formaFarmaceutica')?.setValue(events[0]);
    }
  }

  /**
   * Maneja el evento de cambio para las selecciones de uso específico.
   *
   * @param events - Un arreglo de cadenas que representa las selecciones actuales de uso específico.
   *
   * Este método actualiza la propiedad `seleccionadasUsoEspesificoDatos` con las selecciones proporcionadas
   * y actualiza el formulario `mercanciaForm` para reflejar los valores seleccionados en el campo `usoEspecifico`.
   */
  usoEspesificoSeleccionadasChange(events: string[]): void {
    if (events.length > 0) {
      this.seleccionadasUsoEspesificoDatos = events;
      this.mercanciaForm.get('usoEspecifico')?.setValue(events[0]);
    }
  }

  /**
   * Alterna el estado colapsable de una sección específica basada en el orden proporcionado.
   *
   * @param orden - Número que indica la sección a modificar:
   *   - 1: Alterna el estado de `paisDeOriginColapsable`.
   *   - 2: Alterna el estado de `paisDeProcedenciaColapsable`.
   *   - 3: Alterna el estado de `usoEspesificoColapsable`.
   */
  mostrarColapsable(orden: number): void {
    if (orden === 1) {
      this.formFormaceuticaColapsable = !this.formFormaceuticaColapsable;
    } else if (orden === 2) {
      this.usoEspesificoColapsable = !this.usoEspesificoColapsable;
    }
  }

  /**
   * Agrega una nueva mercancía utilizando los datos del formulario actual
   * y emite un evento con la información de la mercancía seleccionada.
   * Luego, navega de regreso a la ubicación anterior.
   *
   * @returns {void} Este método no devuelve ningún valor.
   */
  agregarMercancia(): void {
    this.mercanciaSeleccionado(this.mercanciaForm.value);
    this.ubicaccion.back();
  }

  /**
   * Restablece el formulario de mercancía a su estado inicial.
   * Este método se utiliza para limpiar todos los campos del formulario,
   * eliminando cualquier dato ingresado previamente.
   */
  limpiarMercancia(): void {
    this.mercanciaForm.reset();
  }

  /**
   * Navega a la ubicación anterior en el historial de navegación.
   * Utiliza el servicio de ubicación para retroceder una página.
   */
  cancelar(): void {
    this.ubicaccion.back();
  }

  /**
   * @method mercanciaSeleccionado
   * @description Maneja la selección de una mercancía en la tabla de mercancías.
   * Actualiza el estado de la mercancía seleccionada y la configuración de datos de la tabla.
   *
   * @param {TablaMercanciasDatos} event - Objeto que contiene los datos de la mercancía seleccionada.
   *
   * @returns {void}
   */
  mercanciaSeleccionado(event: TablaMercanciasDatos): void {
    const SELECCIONADO_MERCANCIA = {
      clasificacionProducto: event.clasificacionProducto,
      especificarClasificacionProducto: event.especificarClasificacionProducto,
      denominacionCumonInternacional: event.denominacionCumonInternacional,
      marcaComercialDenominacion: event.marcaComercialDenominacion,
      cantidadDeLotes: event.cantidadDeLotes,
      kgPorLote: event.kgPorLote,
      numeroDePiezasAFabricar: event.numeroDePiezasAFabricar,
      descripcionNumeroDePiezas: event.descripcionNumeroDePiezas,
      formaFarmaceutica: event.formaFarmaceutica,
      estadoFisico: event.estadoFisico,
      fraccionArancelaria: event.fraccionArancelaria,
      descripcionFraccion: event.descripcionFraccion,
      unidadMedidaComercializacion: event.unidadMedidaComercializacion,
      cantidadUMC: event.cantidadUMC,
      unidadMedidaTarifa: event.unidadMedidaTarifa,
      cantidadUMT: event.cantidadUMT,
      presentacion: event.presentacion,
      numeroRegistroSanitario: event.numeroRegistroSanitario,
      paisOrigen: event.paisOrigen,
      paisProcedencia: event.paisProcedencia,
      tipoProducto: event.tipoProducto,
      usoEspecifico: event.usoEspecifico,
      numeroCAS: event.numeroCAS,
      paisDeDestino: event.paisDeDestino,
    };

    const INDICES = this.tramiteState.tablaMercanciasConfigDatos.findIndex(
      (idx) =>
        idx.clasificacionProducto ===
        SELECCIONADO_MERCANCIA.clasificacionProducto.toString()
    );

    let datosActivos = [];

    if (INDICES !== -1) {
      const TABLE_MERCANCIA_DATA = this.tramiteState.tablaMercanciasConfigDatos;
      TABLE_MERCANCIA_DATA.splice(INDICES, 1, SELECCIONADO_MERCANCIA);
      datosActivos = TABLE_MERCANCIA_DATA;
    } else {
      datosActivos = [
        ...this.tramiteState.tablaMercanciasConfigDatos,
        SELECCIONADO_MERCANCIA,
      ];
    }

    this.tramite260302Store.update((state) => ({
      ...state,
      seleccionadoTablaMercanciasDatos: [SELECCIONADO_MERCANCIA],
      tablaMercanciasConfigDatos: datosActivos,
    }));
  }

  /**
   * Obtiene el valor de un campo específico del formulario o de los datos seleccionados.
   * @param {keyof TablaMercanciasDatos | keyof MercanciaForm} field - Nombre del campo a obtener.
   * @returns {string | number | undefined | string[]} - Valor del campo especificado.
   */
  public obtenerValor(
    field: keyof TablaMercanciasDatos | keyof MercanciaFormEstupefacientes
  ): string | number | undefined | string[] {
    return (
      this.datoSeleccionado?.[field as keyof TablaMercanciasDatos] ??
      this.mercanciaFormState[field as keyof MercanciaFormEstupefacientes]
    );
  }

  /**
   * @method ngOnDestroy
   * @description Hook de destrucción del componente. Libera las suscripciones activas.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
