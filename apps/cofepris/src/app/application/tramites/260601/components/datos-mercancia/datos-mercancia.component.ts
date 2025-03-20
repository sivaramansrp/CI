import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrossListLable } from '@ng-mf/data-access-user';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Catalogo, CatalogoSelectComponent, CrosslistComponent } from '@libs/shared/data-access-user/src';
import { AvisoSanitarioState, Tramite260601Store } from '../../estados/tramites/tramite260601.store';
import { Tramite260601Query } from '../../estados/queries/tramite260601.query';
import { map, merge, Observable, Subject, takeUntil } from 'rxjs';
import { CATALOGOS_ID, CONTINUAR, CROSLISTA_DE_USO_ESPECIFICO, PANELS } from '../../constantes/aviso-enum';
import { AvisoSanitarioService } from '../../services/aviso-sanitario.service';
import { PaisDeOrigenComponent } from '../pais-de-origen/pais-de-origen.component';
import { PaisDeProcedenciaComponent } from '../pais-de-procedencia/pais-de-procedencia.component';

@Component({
  selector: 'app-datos-mercancia',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CatalogoSelectComponent,
    PaisDeOrigenComponent,
    PaisDeProcedenciaComponent,
    CrosslistComponent
  ],
  templateUrl: './datos-mercancia.component.html',
  styleUrl: './datos-mercancia.component.css',
})
export class DatosMercanciaComponent implements OnInit {
  agregarMercanciaForm!: FormGroup;
  productoClasificacion!: Catalogo[];
  especificoProductoClasificacion!: Catalogo[];
  tipoProducto!: Catalogo[];
  paisDestino!: Catalogo[];

  public avisoSanitarioState!: AvisoSanitarioState;

  /**
   * Paneles de la interfaz de usuario.
   */
  panels = PANELS;

  colapsable: boolean = false;

  /**
   * Botones de acción disponibles para gestionar las listas de fechas.
   */
  usoEspecificoBotons = [
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

  public usoEspecificoLabel: CrossListLable = {
    tituluDeLaIzquierda: 'Uso específico:',
    derecha: 'Uso específico seleccionada*:',
  };

  public crosListaDeUsoEspecifico = CROSLISTA_DE_USO_ESPECIFICO;

  /**
   * Lista de rangos de días seleccionarUsoEspecifico.
   */
  seleccionarUsoEspecifico: string[] = this.crosListaDeUsoEspecifico;

  /**
   * Lista de fechas usoEspecificoSeleccionadas.
   */
  usoEspecificoSeleccionadas: string[] = [];

  /**
   * Lista de datos de fechas usoEspecificoDatos.
   */
  usoEspecificoDatos: string[] = [];

  /**
   * Control de formulario para la usoEspecificoFecha.
   */
  usoEspecificoFecha: FormControl = new FormControl('');

  /**
   * Control de formulario para la fecha usoEspecificoFechaSeleccionada.
   */
  usoEspecificoFechaSeleccionada: FormControl = new FormControl('');

  /**
   * Subject para destruir las suscripciones.
   */
  private destruirNotificador$: Subject<void> = new Subject();

  constructor(
    private fb: FormBuilder,
    private avisoSanitarioService: AvisoSanitarioService,
    private tramite260601Store: Tramite260601Store,
    private tramite260601Query: Tramite260601Query
  ) {
    // El constructor se utiliza para la inyección de dependencias.
  }

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
  }

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

  productoClasificacionSeleccion(): void {
    const PRODUCTO_CLASIFICACION = this.agregarMercanciaForm.get('cveProductoClasificacion')?.value;
    this.tramite260601Store.setProductoClasificacion(PRODUCTO_CLASIFICACION);
  }

  especificoProductoClasificacionSeleccion(): void {
    const ESPECIFICO_PRODUCTO_CLASIFICACION = this.agregarMercanciaForm.get('cveEspecificoProductoClasifi')?.value;
    this.tramite260601Store.setEspecificoProductoClasificacion(ESPECIFICO_PRODUCTO_CLASIFICACION);
  }

  tipoProductoSeleccion(): void {
    const TIPO_PRODUCTO = this.agregarMercanciaForm.get('cveTipoProducto')?.value;
    this.tramite260601Store.setTipoProducto(TIPO_PRODUCTO);
  }

  paisDestinoSeleccion(): void {
    const PAIS_DESTINO = this.agregarMercanciaForm.get('cvePaisDestino')?.value;
    this.tramite260601Store.setTipoProducto(PAIS_DESTINO);
  }

  /**
 * Muestra u oculta el panel colapsable.
 * 
 * @param index El índice del panel a mostrar u ocultar.
 * 
 * @returns {void}
 */
  mostrar_colapsable(index: number): void {
    const IS_CURRENTLY_OPEN = this.panels[index].isCollapsed;
    this.panels.forEach((panel, i) => {
      panel.isCollapsed = i === index ? !IS_CURRENTLY_OPEN : true;
    });
  }

  mostrar_uso_especifico_colapsable(): void {
    this.colapsable = !this.colapsable;
  }

  agregar(tipo: string): void {
    if (tipo === CONTINUAR) {
      this.usoEspecificoSeleccionadas = [...this.seleccionarUsoEspecifico];
      this.usoEspecificoDatos = [];
    } else {
      const FECHAVALOR = this.usoEspecificoFecha.value?.map(Number);
      this.usoEspecificoSeleccionadas.push(
        this.usoEspecificoDatos[FECHAVALOR]
      );
      this.usoEspecificoDatos.splice(FECHAVALOR, 1);
    }
  }

  /**
   * Elimina elementos de la lista de fechas según el tipo especificado.
   * @param {string} tipo - Tipo de acción a realizar.
   */
  quitar(tipo: string = ''): void {
    if (tipo === CONTINUAR) {
      this.usoEspecificoDatos = [...this.usoEspecificoSeleccionadas];
      this.usoEspecificoSeleccionadas = [];
    } else {
      const FECHAVALOR =
        this.usoEspecificoFechaSeleccionada.value.map(Number);
      this.usoEspecificoDatos.push(
        this.usoEspecificoSeleccionadas[FECHAVALOR]
      );
      this.usoEspecificoSeleccionadas.splice(FECHAVALOR, 1);
    }
  }
  /**
   * Agrega elementos a la lista de fechas según el tipo especificado.
   * @param {string} tipo - Tipo de acción a realizar.
   */
  // agregarDos(tipo: string): void {
  //   if (tipo === CONTINUAR) {
  //     this.paisDelProductoSeleccionadas = [...this.listaPaisDelProducto];
  //     this.paisDelProductoDatos = [];
  //   } else {
  //     const FECHAVALOR = this.paisDelProductoFecha.value.map(Number);
  //     this.paisDelProductoSeleccionadas.push(
  //       this.paisDelProductoDatos[FECHAVALOR]
  //     );
  //     this.paisDelProductoDatos.splice(FECHAVALOR, 1);
  //   }
  // }

  /**
   * Elimina elementos de la lista de fechas según el tipo especificado.
   * @param {string} tipo - Tipo de acción a realizar.
   */
  // quitarDos(tipo: string = ''): void {
  //   if (tipo === CONTINUAR) {
  //     this.paisDelProductoDatos = [...this.paisDelProductoSeleccionadas];
  //     this.paisDelProductoSeleccionadas = [];
  //   } else {
  //     const FECHAVALOR =
  //       this.paisDeProcedenciaFechaSeleccionada.value.map(Number);
  //     this.paisDelProductoDatos.push(
  //       this.paisDelProductoSeleccionadas[FECHAVALOR]
  //     );
  //     this.paisDelProductoSeleccionadas.splice(FECHAVALOR, 1);
  //   }
  // }

  /**
   * Agrega elementos a la lista de fechas según el tipo especificado.
   * @param {string} tipo - Tipo de acción a realizar.
   */
  // agregarTres(tipo: string): void {
  //   if (tipo === CONTINUAR) {
  //     this.aduanasDeEntradaSeleccionadas = [...this.seleccionarUsoEspecifico];
  //     this.aduanasDeEntradaDatos = [];
  //   } else {
  //     const FECHAVALOR = this.aduanasDeEntradaFecha.value.map(Number);
  //     this.aduanasDeEntradaSeleccionadas.push(
  //       this.aduanasDeEntradaDatos[FECHAVALOR]
  //     );
  //     this.aduanasDeEntradaDatos.splice(FECHAVALOR, 1);
  //   }
  // }

  /**
   * Elimina elementos de la lista de fechas según el tipo especificado.
   * @param {string} tipo - Tipo de acción a realizar.
   */
  // quitarTres(tipo: string = ''): void {
  //   if (tipo === CONTINUAR) {
  //     this.aduanasDeEntradaDatos = [...this.aduanasDeEntradaSeleccionadas];
  //     this.aduanasDeEntradaSeleccionadas = [];
  //   } else {
  //     const FECHAVALOR =
  //       this.aduanasDeEntradaFechaSeleccionada.value.map(Number);
  //     this.aduanasDeEntradaDatos.push(
  //       this.aduanasDeEntradaSeleccionadas[FECHAVALOR]
  //     );
  //     this.aduanasDeEntradaSeleccionadas.splice(FECHAVALOR, 1);
  //   }
  // }

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
