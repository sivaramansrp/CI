import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable, Subject, map, merge, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';

import { AvisoSanitarioState, Tramite260601Store } from '../../../../estados/tramites/tramite260601.store';
import { BOTONS, CATALOGOS_ID, PANELS } from '../../constantes/aviso-enum';
import { Catalogo, CatalogoSelectComponent, CrosslistComponent } from '@libs/shared/data-access-user/src';
import { CrossList, MercanciaCrossList } from '../../models/aviso-model';
import { AvisoSanitarioService } from '../../services/aviso-sanitario.service';
import { Tramite260601Query } from '../../../../estados/queries/tramite260601.query';

/**
 * Componente para gestionar el mercancia datos.
 */
@Component({
  selector: 'app-datos-mercancia',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CatalogoSelectComponent,
    CrosslistComponent
  ],
  templateUrl: './datos-mercancia.component.html',
  styleUrl: './datos-mercancia.component.css',
})
export class DatosMercanciaComponent implements OnInit, OnDestroy {
  /**
   * Formulario principal para los datos de la mercancía.
   */
  agregarMercanciaForm!: FormGroup;

  /**
   * Catálogo de clasificación de productos.
   */
  productoClasificacion!: Catalogo[];

  /**
   * Catálogo de clasificación específica de productos.
   */
  especificoProductoClasificacion!: Catalogo[];

  /**
   * Catálogo de tipos de productos.
   */
  tipoProducto!: Catalogo[];

  /**
   * Catálogo de países de destino.
   */
  paisDestino!: Catalogo[];

  /**
   * Estado actual del aviso sanitario.
   */
  public avisoSanitarioState!: AvisoSanitarioState;

  /**
   * Paneles de la interfaz de usuario.
   */
  panels = PANELS;

  /**
   * Estado del panel colapsable.
   */
  colapsable: boolean = false;

  /**
   * Botones configurados para acciones en tablas, como agregar o restar elementos.
   */
  botones = BOTONS;

  /**
   * Datos de listas cruzadas específicas de uso.
   */
  usoEspecificoCrosslistDatos: CrossList = {} as CrossList;

  /**
   * Datos de listas cruzadas para país de origen.
   */
  paisOrigenCrosslistDatos: CrossList = {} as CrossList;

  /**
   * Datos de listas cruzadas para país de procedencia.
   */
  paisProcedencisCrosslistDatos: CrossList = {} as CrossList;

  /**
   * Lista de rangos de días seleccionarUsoEspecifico.
   */
  seleccionarUsoEspecifico: string[] = [];

  /**
   * Fechas seleccionadas para país de procedencia.
   */
  seleccionarPaisProcedencia: string[] = [];

  /**
   * Fechas seleccionadas para país de origen.
   */
  seleccionarPaisOrigen: string[] = [];

  /**
   * Lista de fechas usoEspecificoSeleccionadas.
   */
  usoEspecificoSeleccionadas: string[] = [];

  /**
   * Lista de datos de fechas usoEspecificoDatos.
   */
  usoEspecificoDatos: string[] = [];

  /**
   * Subject para destruir las suscripciones.
   */
  private destruirNotificador$: Subject<void> = new Subject();

  /**
   * Constructor del componente.
   * Inyecta servicios necesarios para la gestión del formulario, los catálogos, y el estado del trámite.
   * 
   * @param fb FormBuilder para construir y gestionar formularios reactivos.
   * @param avisoSanitarioService Servicio para interactuar con datos del aviso sanitario.
   * @param tramite260601Store Store para manejar el estado del trámite.
   * @param tramite260601Query Query para observar y consultar el estado del trámite.
   */
  constructor(
    private fb: FormBuilder,
    private avisoSanitarioService: AvisoSanitarioService,
    private tramite260601Store: Tramite260601Store,
    private tramite260601Query: Tramite260601Query
  ) {
    // El constructor se utiliza para la inyección de dependencias.
  }

  /**
   * Inicializa el componente y configura los catálogos, formularios y suscripciones.
   */
  ngOnInit(): void {
    this.inicializaCatalogos();

    this.tramite260601Query.selectSeccionState$
      .pipe(
        takeUntil(this.destruirNotificador$),
        map((seccionState) => {
          this.avisoSanitarioState = seccionState;
        })
      )
      .subscribe();

    // Inicializar el formulario principal
    this.crearFormulario();

    this.productoClasificacionSeleccion();
    this.especificoProductoClasificacionSeleccion();
    this.tipoProductoSeleccion();
    this.paisDestinoSeleccion();

    this.obtenerMercanciaCrosslist();

    this.agregarMercanciaForm.get('fraccionArancelaria')?.valueChanges
      .pipe(takeUntil(this.destruirNotificador$))
      .subscribe(() => {
        this.autocompletarDescripcion();
      });
  }

  /**
   * Crea y configura el formulario principal de datos de mercancía.
   */
  crearFormulario(): void {
    this.agregarMercanciaForm = this.fb.group({
      cveProductoClasificacion: [
        this.avisoSanitarioState?.cveProductoClasificacion,
        [Validators.required]
      ],
      cveEspecificoProductoClasifi: [
        this.avisoSanitarioState?.cveEspecificoProductoClasifi,
        [Validators.required]
      ],
      nombreProducto: [
        this.avisoSanitarioState?.nombreProducto,
        [Validators.required]
      ],
      marca: [
        this.avisoSanitarioState?.marca,
        [Validators.required]
      ],
      cveTipoProducto: [
        this.avisoSanitarioState?.cveTipoProducto,
        [Validators.required]
      ],
      fraccionArancelaria: [
        this.avisoSanitarioState?.fraccionArancelaria,
        [Validators.required]
      ],
      fraccionArancelariaDescripcion: [
        { value: this.avisoSanitarioState?.fraccionArancelariaDescripcion, disabled: true },
        [Validators.required]
      ],
      modelo: [
        this.avisoSanitarioState?.modelo,
        [Validators.required]
      ],
      productoDescripcion: [
        this.avisoSanitarioState?.productoDescripcion,
        [Validators.required]
      ],
      cvePaisDestino: [
        this.avisoSanitarioState?.cvePaisDestino,
        [Validators.required]
      ]
    })
  }

  /**
   * Inicializa los catálogos necesarios para el formulario.
   */
  private inicializaCatalogos(): void {
    const PRODUCTO_CLASIFICACION$: Observable<void> = this.avisoSanitarioService
      .getProductoClasificacion(CATALOGOS_ID.CAT_PRODUCTO_CLASIFICACION)
      .pipe(
        map((resp) => {
          this.productoClasificacion = resp.data;
        })
      );

    const ESPECIFICO_PRODUCTO_CLASIFICACION$: Observable<void> = this.avisoSanitarioService
      .getEspecificoProductoClasificacion(CATALOGOS_ID.CAT_ESPECIFICO_PRODUCTO_CLASIFICACION)
      .pipe(
        map((resp) => {
          this.especificoProductoClasificacion = resp.data;
        })
      );

    const TIPO_PRODUCTO$: Observable<void> = this.avisoSanitarioService
      .getTipoProducto(CATALOGOS_ID.CAT_TIPO_PRODUCTO)
      .pipe(
        map((resp) => {
          this.tipoProducto = resp.data;
        })
      );

    const PAIS_DESTINO$: Observable<void> = this.avisoSanitarioService
      .getPaisDestino(CATALOGOS_ID.CAT_PAIS_DESTINO)
      .pipe(
        map((resp) => {
          this.paisDestino = resp.data;
        })
      );

    merge(
      PRODUCTO_CLASIFICACION$,
      ESPECIFICO_PRODUCTO_CLASIFICACION$,
      TIPO_PRODUCTO$,
      PAIS_DESTINO$
    )
      .pipe(takeUntil(this.destruirNotificador$))
      .subscribe();
  }

  /**
   * Maneja la selección de la clasificación de productos.
   */
  productoClasificacionSeleccion(): void {
    const PRODUCTO_CLASIFICACION = this.agregarMercanciaForm.get('cveProductoClasificacion')?.value;
    this.tramite260601Store.setProductoClasificacion(PRODUCTO_CLASIFICACION);
  }

  /**
   * Maneja la selección de la clasificación específica de productos.
   */
  especificoProductoClasificacionSeleccion(): void {
    const ESPECIFICO_PRODUCTO_CLASIFICACION = this.agregarMercanciaForm.get('cveEspecificoProductoClasifi')?.value;
    this.tramite260601Store.setEspecificoProductoClasificacion(ESPECIFICO_PRODUCTO_CLASIFICACION);
  }

  /**
   * Maneja la selección del tipo de producto.
   */
  tipoProductoSeleccion(): void {
    const TIPO_PRODUCTO = this.agregarMercanciaForm.get('cveTipoProducto')?.value;
    this.tramite260601Store.setTipoProducto(TIPO_PRODUCTO);
  }

  /**
   * Maneja la selección del país de destino.
   */
  paisDestinoSeleccion(): void {
    const PAIS_DESTINO = this.agregarMercanciaForm.get('cvePaisDestino')?.value;
    this.tramite260601Store.setPaisDestino(PAIS_DESTINO);
  }

  /**
 * Muestra u oculta el panel colapsable.
 * 
 * @param index El índice del panel a mostrar u ocultar.
 * 
 * @returns {void}
 */
  mostrar_colapsable(index: number): void {
    const ES_ABIERTO_ACTUALMENTE = this.panels[index].isCollapsed;
    this.panels.forEach((panel, i) => {
      panel.isCollapsed = i === index ? !ES_ABIERTO_ACTUALMENTE : true;
    });
  }

  /**
   * Obtiene los datos de listas cruzadas para la mercancía.
   */
  obtenerMercanciaCrosslist(): void {
    this.avisoSanitarioService.obtenerMercanciaCrosslist()
      .pipe(takeUntil(this.destruirNotificador$))
      .subscribe({
        next: (respuesta: MercanciaCrossList) => {
          this.paisOrigenCrosslistDatos = respuesta.paisOrigenCrossList;
          this.paisProcedencisCrosslistDatos = respuesta.paisProcedencisCrossList;
          this.usoEspecificoCrosslistDatos = respuesta.usoEspecificoCrossList;
          this.seleccionarUsoEspecifico = respuesta.usoEspecificoCrossList.fechas;
          this.seleccionarPaisProcedencia = respuesta.paisProcedencisCrossList.fechas;
          this.seleccionarPaisOrigen = respuesta.paisOrigenCrossList.fechas;
        }
      });
  }

  /**
   * Alterna el estado del panel colapsable para uso específico.
   */
  mostrar_uso_especifico_colapsable(): void {
    this.colapsable = !this.colapsable;
  }

  /**
   * Autocompleta la descripción de la fracción arancelaria.
   */
  autocompletarDescripcion(): void {
    this.avisoSanitarioService.autocompletarDescripcion()
      .pipe(takeUntil(this.destruirNotificador$))
      .subscribe({
        next: (result) => {
          const FRACCION_DESCRIPCION = result.data[0].descripcion;
          this.agregarMercanciaForm.get('fraccionArancelariaDescripcion')?.setValue(FRACCION_DESCRIPCION);
          this.tramite260601Store.setFraccionArancelariaDescripcion(FRACCION_DESCRIPCION);
        }
      });
  }

  /**
  * Establece los valores en el store de tramite260601.
  *
  * @param {FormGroup} form - El formulario del cual se obtiene el valor.
  * @param {string} campo - El nombre del campo del formulario cuyo valor se va a obtener.
  * @param {string} metodoNombre - El nombre del método en el store que se va a invocar con el valor del campo.
  * @returns {void}
  */
  setValoresStore(form: FormGroup, campo: string, metodoNombre: keyof Tramite260601Store): void {
    const VALOR = form.get(campo)?.value;
    (this.tramite260601Store[metodoNombre] as (value: unknown) => void)(VALOR);
  }

  /**
   * Se ejecuta al destruir el componente.
   * Emite un valor y completa el subject `destruirNotificador$` para cancelar las suscripciones.
   */
  ngOnDestroy(): void {
    this.destruirNotificador$.next();
    this.destruirNotificador$.complete();
  }
}
