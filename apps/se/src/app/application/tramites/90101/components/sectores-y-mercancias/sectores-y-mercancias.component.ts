/**
 * @component SectoresYMercanciasComponent
 * @description Este componente es responsable de manejar los sectores y mercancías.
 * Incluye la lógica para obtener y gestionar los datos de los sectores, así como los catálogos relacionados.
 * 
 * @import { Component, OnInit } from '@angular/core';
 * @import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
 * @import { PARATEXTO } from '../../../../shared/constantes/prosec/prosec.module';
 * @import { CatalogosSelect } from '../../../../core/models/shared/components.model';
 * @import { Catalogo } from '../../../../core/models/shared/catalogos.model';
 * @import { ProsecService } from '../../../../core/services/90101/prosec.module';
 * @import { SECTORCOLUMNS } from '../../../../shared/constantes/prosec/prosec.module';
 */

import { AlertComponent, Catalogo, CatalogoSelectComponent, ConsultaioQuery, TablaDinamicaComponent, TituloComponent } from '@ng-mf/data-access-user';
import { AutorizacionProsecStore, ProsecState } from '../../estados/autorizacion-prosec.store';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject, delay, map, takeUntil, tap } from 'rxjs';
import { AUtorizacionProsecQuery } from '../../queries/autorizacion-prosec.query';
import { CommonModule } from '@angular/common';
import { ConfiguracionColumna } from '@ng-mf/data-access-user';
import { FilaSectors } from '../../models/prosec.module';
import { HttpErrorResponse } from '@angular/common/http';
import { PARATEXTO } from '../../constantes/prosec.module';
import { ProsecService } from '../../services/prosec.service';
import { SeccionLibQuery } from '@ng-mf/data-access-user';
import { SeccionLibState } from '@ng-mf/data-access-user';
import { SeccionLibStore } from '@ng-mf/data-access-user';
import { TablaSeleccion } from '@ng-mf/data-access-user';



@Component({
  selector: 'app-sectores-y-mercancias',
  templateUrl: './sectores-y-mercancias.component.html',
  styleUrl: './sectores-y-mercancias.component.scss',
  standalone: true,
  imports: [ ReactiveFormsModule,AlertComponent, TablaDinamicaComponent, CatalogoSelectComponent, TituloComponent, CommonModule ]
})
export class SectoresYMercanciasComponent implements OnInit, OnDestroy {

  /**
   * @input
   * @description
   * Indica si el formulario debe estar deshabilitado. Cuando es `true`, los controles del formulario estarán inactivos y no permitirán la interacción del usuario.
   * @type {boolean}
   * @default false
   */
  @Input() formularioDeshabilitado: boolean = false;

  /**
   * @property {FormGroup} sectoresYMercancias - El grupo de formularios para capturar los datos de los sectores y mercancías.
   */
  sectoresYMercancias!: FormGroup;

  /**
   * @property {string} TEXTO - Constante de texto utilizada en el componente.
   */
  TEXTO: string = PARATEXTO;

  /**
   * @property {Catalogo[]} sector - Array de catálogos de sectores.
   */
  sector: Catalogo[] = [];

  /**
   * @property {typeof TablaSeleccion} TablaSeleccion - Referencia al componente de selección de tabla.
   * @description Referencia utilizada para manejar la selección de filas en la tabla dinámica de sectores y mercancías.
   */
  TablaSeleccion = TablaSeleccion;

  /**
   * @desc Arreglo que contiene las filas de sectores.
   * @type {FilaSectors[]}
   * @see FilaSectors
   *
   * @memberof SectoresYMercanciasComponent
   *
   * @compodoc
   * @description
   * [ES] Lista de sectores utilizada en el componente SectoresYMercancias.
   */
  sectors: FilaSectors[] = [];

  /**
   * @property {ConfiguracionColumna<FilaSectors>[]} sectorColumnsConfiguracion
   * @description
   * [ES] Configuración de las columnas para la tabla de sectores. Define los encabezados, claves y el orden de las columnas que se mostrarán en la tabla dinámica de sectores y mercancías.
   * 
   * @type {ConfiguracionColumna<FilaSectors>[]}
   * @memberof SectoresYMercanciasComponent
   * @compodoc
   */
  sectorColumnsConfiguracion: ConfiguracionColumna<FilaSectors>[] = [
    { encabezado: 'Lista de sectores', clave: (fila) => fila.sectorLista, orden: 1 },
    { encabezado: 'Clave del sector', clave: (fila) => fila.sectorClave, orden: 2 },
  ];

  /**
 * @descripcion
 * Subject utilizado como notificador para destruir suscripciones y evitar fugas de memoria.
 * Se utiliza junto con el operador `takeUntil` para cancelar las suscripciones al destruir el componente.
 * @private
 */
private destroyNotifier$: Subject<void> = new Subject();

/**
 * @descripcion
 * Estado actual de los sectores, obtenido del store de Prosec.
 * @private
 */
private sectoresState!: ProsecState

/**
 * @descripcion
 * Estado actual de la sección, obtenido del store de la sección.
 * @private
 */
private seccionState!: SeccionLibState

/**
 * @descripcion
 * Indica si el formulario se encuentra en modo solo lectura.
 * Cuando es verdadero, los controles del formulario estarán deshabilitados.
 */
esFormularioSoloLectura: boolean = false;


  /**
   * @constructor
   * @description
   * [ES] Constructor del componente SectoresYMercanciasComponent. Inyecta las dependencias necesarias para la gestión de formularios, servicios y estados.
   * 
   * @param fb - FormBuilder para la creación de formularios reactivos.
   * @param ProsecService - Servicio para obtener datos relacionados con sectores y mercancías.
   * @param AutorizacionProsecStore - Store para manejar el estado de autorización Prosec.
   * @param AUtorizacionProsecQuery - Query para consultar el estado de autorización Prosec.
   * @param seccionStore - Store para manejar el estado de la sección.
   * @param seccionQuery - Query para consultar el estado de la sección.
   * @param consultaQuery - Query para realizar consultas adicionales.
   */
  constructor(
    private readonly fb: FormBuilder, 
    private ProsecService: ProsecService, 
    private AutorizacionProsecStore: AutorizacionProsecStore,
    private AUtorizacionProsecQuery: AUtorizacionProsecQuery,
    private seccionStore: SeccionLibStore,
    private seccionQuery: SeccionLibQuery,
    private consultaQuery: ConsultaioQuery
  ) {}

    /**
   * @method ngOnInit
   * @description
   * Método del ciclo de vida de Angular que se ejecuta al inicializar el componente.
   * Realiza las siguientes acciones:
   * - Se suscribe al estado de la sección y actualiza la propiedad `seccionState` con los datos recibidos.
   * - Se suscribe al estado de autorización PROSEC y actualiza la propiedad `sectoresState`.
   * - Inicializa el formulario reactivo llamando a `initActionFormBuild()`.
   * - Obtiene la lista de sectores desde el servicio llamando a `obtenserListaEstado()`.
   * - Recupera los datos de los sectores llamando a `recuperarDatos()`.
   * - Establece el formulario como no válido por defecto en el store de la sección.
   * - Se suscribe a los cambios de estado del formulario (`statusChanges`) y, si el formulario es válido, actualiza el store y llama a la validación global del formulario.
   * - Si el formulario está deshabilitado (`formularioDeshabilitado`), inicializa el estado del formulario en modo solo lectura.
   * 
   * @returns {void}
   */
  ngOnInit(): void {
    this.seccionQuery.selectSeccionState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.seccionState = seccionState;
        })
      )
      .subscribe();
    this.AUtorizacionProsecQuery.selectProsec$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((state) => {
          this.sectoresState = state as ProsecState;
        })
      )
      .subscribe();
    this.initActionFormBuild();
    this.obtenserListaEstado();
    this.recuperarDatos();

    this.seccionStore.establecerFormaValida([false]);

    this.sectoresYMercancias.statusChanges
      .pipe(
        takeUntil(this.destroyNotifier$),
        delay(10),
        tap((_value) => {
          if (this.sectoresYMercancias.valid) {
            this.AutorizacionProsecStore.setSectoresFromValida(true);
            this.ProsecService.formValida();
          }
        })
      )
      .subscribe();

    if (this.formularioDeshabilitado) {
      this.inicializarEstadoFormulario();
    }
  }

  /**
   * @method inicializarEstadoFormulario
   * @description
   * Inicializa el estado del formulario de sectores y mercancías según el modo de solo lectura.
   * Si el formulario está en modo solo lectura (`esFormularioSoloLectura` es `true`), deshabilita todos los controles del formulario.
   * En caso contrario, habilita los controles para permitir la edición por parte del usuario.
   * 
   * @returns {void}
   */
  inicializarEstadoFormulario(): void {
    if (this.esFormularioSoloLectura) {
      this.sectoresYMercancias.disable();
    }
    else {
      this.sectoresYMercancias.enable();
    } 
  }
  
  /**
   * @method initActionFormBuild
   * @description
   * Inicializa el formulario reactivo `sectoresYMercancias` con los valores actuales del estado de sectores.
   * Define los controles del formulario para el sector (obligatorio) y la fracción arancelaria.
   * Este método se utiliza para construir la estructura del formulario al cargar el componente o al actualizar el estado.
   * 
   * @returns {void}
   */
  initActionFormBuild(): void {
    this.sectoresYMercancias = this.fb.group({
      sector: [
        this.sectoresState.Sector,
        Validators.required
      ],
      Fraccion_arancelaria: [
        this.sectoresState.Fraccion_arancelaria
      ]
    })
  }

    /**
     * @method setValoresStore
     * @description
     * Actualiza el valor de un campo específico en el store `AutorizacionProsecStore` utilizando el método proporcionado.
     * 
     * @param form El formulario reactivo (`FormGroup`) del cual se obtiene el valor.
     * @param campo El nombre del campo dentro del formulario cuyo valor se va a extraer.
     * @param metodoNombre El nombre del método del store `AutorizacionProsecStore` que se invocará para actualizar el valor.
     * 
     * @returns void
     * 
     * @compodoc
     * Este método facilita la sincronización entre los valores del formulario y el store, permitiendo una actualización dinámica y reutilizable.
     */
    setValoresStore(
      form: FormGroup,
      campo: string,
      metodoNombre: keyof AutorizacionProsecStore
    ): void {
      const VALOR = form.get(campo)?.value as unknown;
      (this.AutorizacionProsecStore[metodoNombre] as (value: unknown) => void) (
        VALOR
      );
    }

  /**
   * @method obtenserListaEstado
   * @description Obtiene la lista de sectores desde el servicio.
   */
  obtenserListaEstado(): void {
    this.ProsecService.obtenerMenuDesplegable('sector.json').subscribe({
      next: (data) => {
        this.sector = data as Catalogo[];
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error al obtener los datos:', error);
        this.sector = [];
      }
    });
  }

  /**
   * @method recuperarDatos
   * @description
   * Recupera los datos de los sectores desde el servicio llamando al método `obtenerTablaDatos` con el archivo `sectorDatos.json`.
   * Si la respuesta es un arreglo, actualiza la propiedad `sectors` con los datos obtenidos.
   * 
   * @returns {void}
   */
  recuperarDatos(): void {
    this.ProsecService.obtenerTablaDatos('sectorDatos.json').subscribe(
      (response) => {
        if (response && Array.isArray(response)) {
          this.sectors = response as FilaSectors[];
        }
      }
    );
  }

/**
 * @method sectorSeleccion
 * @descripcion
 * Actualiza el estado del store con el sector seleccionado.
 * @param Sector - Objeto de tipo `Catalogo` que representa el sector seleccionado.
 */
sectorSeleccion(Sector: Catalogo): void {
  this.AutorizacionProsecStore.setActividadProductiva([Sector]);
}

/**
 * @method ngOnDestroy
 * @descripcion
 * Método del ciclo de vida que se ejecuta al destruir el componente.
 * Notifica y completa el Subject para cancelar todas las suscripciones activas y evitar fugas de memoria.
 */
ngOnDestroy(): void {
  this.destroyNotifier$.next();
  this.destroyNotifier$.complete();
}
}