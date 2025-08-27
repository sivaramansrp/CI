import {
  AlertComponent,
  Catalogo,
  TablaDinamicaComponent,
  TituloComponent,
} from '@ng-mf/data-access-user';
import {
  AutorizacionProsecStore,
  ProsecState,
} from '../../estados/autorizacion-prosec.store';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Subject, delay, map, takeUntil, tap } from 'rxjs';
import { TEXTO, MODALIDAD } from '../../constantes/prosec.module';
import { AUtorizacionProsecQuery } from '../../queries/autorizacion-prosec.query';
import { CatalogoSelectComponent } from '@libs/shared/data-access-user/src/tramites/components/catalogo-select/catalogo-select.component';
import { CommonModule } from '@angular/common';
import { ConfiguracionColumna } from '@ng-mf/data-access-user';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { FilaPlantas } from '../../models/prosec.module';
import { HttpErrorResponse } from '@angular/common/http';
import { ProsecService } from '../../services/prosec.service';
import { SeccionLibQuery } from '@ng-mf/data-access-user';
import { SeccionLibState } from '@ng-mf/data-access-user';
import { SeccionLibStore } from '@ng-mf/data-access-user';
import { TablaSeleccion } from '@ng-mf/data-access-user';

@Component({
  selector: 'app-domicilios-de-plantas',
  templateUrl: './domicilios-de-plantas.component.html',
  styleUrls: ['./domicilios-de-plantas.component.scss'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    TituloComponent,
    AlertComponent,
    TablaDinamicaComponent,
    CatalogoSelectComponent,
    CommonModule,
  ],
})
export class DomiciliosDePlantasComponent implements OnInit, OnDestroy {
  /**
   * @property {FormGroup} forma - El grupo de formularios para capturar los datos de las plantas.
   */
  forma!: FormGroup;

  /**
   * @property {string} TEXTO - Constante de texto utilizada en el componente.
   */
  TEXTO: string = TEXTO;

  /**
   * @property {Catalogo[]} estadoSeleccionar - Array de catálogos de estados.
   */
  estadoSeleccionar: Catalogo[] = [];

    /** Bandera de solo lectura (puedes adaptarla si tienes lógica para esto) */
  public esFormularioSoloLectura: boolean = false;

   
  /** Lista de empleados seleccionados en la tabla */
  public seleccionarProsecDisponiblesLista: FilaPlantas[] = [] as FilaPlantas[];

   /**
   * Bandera para determinar si el formulario es de actualización.
   * Inicialmente establecido en `false`.
   *
   * @description Esta bandera se utiliza para controlar la lógica de actualización del formulario.
   */
  private esFormularioActualizacion: boolean = false;

  /**
   * @property {Catalogo[]} RepresentacionFederal - Array de catálogos de representación federal.
   */
  RepresentacionFederal: Catalogo[] = [];

    /**
     * Una propiedad pública que representa el estado de la solicitud de sectores y mercancías.
     * Esta propiedad se utiliza para almacenar el estado actual de la solicitud.
     * @type {SolicitudSectoresYMercanciasState}
     */
    public solicitudState!: ProsecState;

  /**
   * @property {Catalogo[]} ActividadProductiva - Array de catálogos de actividad productiva.
   */
  ActividadProductiva: Catalogo[] = [];

  plantasDatos: FilaPlantas[] = [];
  /** Datos de las plantas obtenidos del servicio */
  plantasDatosPROSEC: FilaPlantas[] = [];

  TablaSeleccion = TablaSeleccion;

  private destroyNotifier$: Subject<void> = new Subject();

  private domiciliosState!: ProsecState;

  private seccionState!: SeccionLibState;

  plantaColumnsConfiguracion: ConfiguracionColumna<FilaPlantas>[] = [
    { encabezado: 'Calle', clave: (fila) => fila.calle, orden: 1 },
    {
      encabezado: 'Número exterior',
      clave: (fila) => fila.numeroExterior,
      orden: 2,
    },
    {
      encabezado: 'Número interior',
      clave: (fila) => fila.numeroInterior,
      orden: 3,
    },
    {
      encabezado: 'Código postal',
      clave: (fila) => fila.codigoPostal,
      orden: 4,
    },
    {
      encabezado: 'Colonia',
      clave: (fila) => fila.colonia,
      orden: 5,
    },
    {
      encabezado: 'Municipio o alcaldía',
      clave: (fila) => fila.municipioOAlcaldia,
      orden: 6,
    },
    {
      encabezado: 'País',
      clave: (fila) => fila.pais,
      orden: 7,
    },
    {
      encabezado: 'Registro',
      clave: (fila) => fila.registro,
      orden: 8,
    },
    {
      encabezado: 'Registro federal de contribuyentes',
      clave: (fila) => fila.registroFederalDeContribuyentes,
      orden: 9,
    },
    {
      encabezado: 'Razón social',
      clave: (fila) => fila.razonSocial,
      orden: 10,
    },
    {
      encabezado: 'Domicilio fiscal del solicitante',
      clave: (fila) => fila.domicilioFiscalDelSolicitante,
      orden: 11,
    },
  ];

  constructor(
    private readonly fb: FormBuilder,
    private prosecService: ProsecService,
    private autorizacionProsecStore: AutorizacionProsecStore,
    private autorizacionProsecQuery: AUtorizacionProsecQuery,
    private seccionStore: SeccionLibStore,
    private seccionQuery: SeccionLibQuery,
    private consultaioQuery: ConsultaioQuery
  ) {
      // Inicializa el formulario.
    this.consultaioQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.esFormularioSoloLectura = seccionState.readonly;
          this.esFormularioActualizacion = seccionState.update;
        })
      )
      .subscribe();
  }

  ngOnInit(): void {
    this.seccionQuery.selectSeccionState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.seccionState = seccionState;
        })
      )
      .subscribe();
    this.autorizacionProsecQuery.selectProsec$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((state) => {
          this.domiciliosState = state as ProsecState;
        })
      )
      .subscribe();
    this.initActionFormBuild();
    this.obtenerLista();

    this.forma.statusChanges
      .pipe(
        takeUntil(this.destroyNotifier$),
        delay(10),
        tap((_value) => {
          if (this.forma.valid) {
            this.autorizacionProsecStore.setFormaValida('1');
          }
        })
      )
      .subscribe();

    this.initActionFormBuild();
    this.inicializarEstadoFormulario();
  }

  /**
   * Evalúa si se debe inicializar o cargar datos en el formulario.
   * Además, obtiene la información del catálogo de estados.
   */
  inicializarEstadoFormulario(): void {
    if (this.esFormularioSoloLectura) {
      this.guardarDatosFormulario();
    } else {
      this.inicializarFormulario();
    }
  }

  /**
   * Carga datos y deshabilita el formulario si es solo lectura.
   */
  guardarDatosFormulario(): void {
    this.inicializarFormulario();
    if (this.esFormularioSoloLectura) {
      this.forma.disable();
    } else {
      this.forma.enable();
    }
  }

  /**
   * Inicializa el formulario reactivo para capturar el estado seleccionado.
   */
  inicializarFormulario(): void {
    this.autorizacionProsecQuery.selectProsec$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.solicitudState = seccionState;
        })
      )
      .subscribe();

    this.initActionFormBuild();
  }

  setValoresStore(
    form: FormGroup,
    campo: string,
    metodoNombre: keyof AutorizacionProsecStore
  ): void {
    // Cambiado el tipo "any" por "unknown" para cumplir con las reglas de TypeScript
    const VALOR = form.get(campo)?.value;
    (this.autorizacionProsecStore[metodoNombre] as (value: unknown) => void)(VALOR);
  }

  initActionFormBuild(): void {
    // Se asegura que el formulario se inicialice correctamente con las validaciones necesarias
    this.forma = this.fb.group({
      modalidad: [{value:this.domiciliosState.modalidad ? this.domiciliosState.modalidad : MODALIDAD, disabled: true}],
      Estado: [this.domiciliosState.Estado, Validators.required],
      RepresentacionFederal: [
        this.domiciliosState.RepresentacionFederal,
        Validators.required,
      ],
      ActividadProductiva: [
        this.domiciliosState.ActividadProductiva,
        Validators.required,
      ],
    });
  }

  

  /**
   * @method obtenserListaEstado
   * @description Obtiene la lista de estados desde el servicio.
   */
  obtenerListaEstado(): void {
    this.prosecService.obtenerMenuDesplegable('estado.json').subscribe({
      next: (data) => {
        this.estadoSeleccionar = data as Catalogo[];
      },
      error: () => {
        this.estadoSeleccionar = [];
      },
    });
  }

  /**
   * @method obtenserListaFederal
   * @description Obtiene la lista de representación federal desde el servicio.
   */
  obtenerListaFederal(): void {
    this.prosecService.obtenerMenuDesplegable('federal.json').subscribe({
      next: (data) => {
        this.RepresentacionFederal = data as Catalogo[];
      },
      error: () => {
        this.RepresentacionFederal = [];
      },
    });
  }

  /**
   * @method obtenserListaActividad
   * @description Obtiene la lista de actividad productiva desde el servicio.
   */
  obtenerListaActividad(): void {
    this.prosecService.obtenerMenuDesplegable(
      'actividad_productiva.json'
    ).subscribe({
      next: (data) => {
        this.ActividadProductiva = data as Catalogo[];
      },
      error: () => {
        this.ActividadProductiva = [];
      },
    });
  }

  /**
   * @method obtenserLista
   * @description Obtiene las listas de datos de estados, representación federal y actividad productiva.
   */
  obtenerLista(): void {
    this.obtenerListaEstado();
    this.obtenerListaFederal();
    this.obtenerListaActividad();
    if (this.esFormularioSoloLectura) {
      this.recuperarDatos();
    }
  }

  
    /** Guarda la selección de número de empleados hecha por el usuario.*/
  seleccionarProsecDisponibles(evento: FilaPlantas[]): void {
    this.seleccionarProsecDisponiblesLista = evento;
  }

  /**
 * Recupera los datos de las plantas desde el servicio.
 *
 * Este método realiza una petición al servicio `ProsecService` para obtener los datos de las plantas
 * desde el archivo `plantasDatos.json`. Si la respuesta contiene la propiedad `plantasDatos` y es un
 * arreglo, asigna esos datos a la propiedad `plantasDatos` del componente. En caso contrario, o si ocurre
 * un error en la petición, la propiedad `plantasDatos` se inicializa como un arreglo vacío.
 *
 * @returns {void}
 */
recuperarDatos(): void {
    this.prosecService.obtenerTablaDatos('plantasDatos.json').subscribe({
      next: (response) => {
        if (response && 'plantasDatos' in response && Array.isArray(response.plantasDatos)) {
          this.plantasDatos = response.plantasDatos;
          if (this.esFormularioSoloLectura) {
            this.plantasDatosPROSEC = [...this.plantasDatos];
          }
        } else {
          this.plantasDatos = [];
        }
      },
      error: (_error: HttpErrorResponse) => {
        this.plantasDatos = [];
      },
    });
  }
/**   * Método para mostrar los domicilios de las plantas.
   * Este método llama a la función `recuperarDatos` para obtener y mostrar los domicilios de las plantas.
   * @returns {void}
   */
  public mostrarDomicilios(): void {
    const VALOR_ESTADO = this.forma.get('Estado')?.value;
    if (VALOR_ESTADO) {
      this.recuperarDatos();
    }
  }

  /**
   * Método para agregar las plantas seleccionadas a la lista de plantas PROSEC.
   * Este método copia las plantas seleccionadas desde la lista `plantasDatos` a la lista `plantasDatosPROSEC`
   * y luego limpia la lista `plantasDatos`.
   * @returns {void}
   */
  public agregarPlantas(): void {
    this.plantasDatosPROSEC = [...this.plantasDatos];
    this.plantasDatos = [];
  }

  /**
   * Método para eliminar las plantas seleccionadas de la lista de plantas PROSEC.
   * Este método elimina las plantas que están en la lista `seleccionarProsecDisponiblesLista`
   * de la lista `plantasDatos` y luego limpia la lista `seleccionarProsecDisponiblesLista`.
   * @returns {void}
   */
  public eliminarPlantas(): void {
    if(this.seleccionarProsecDisponiblesLista.length > 0) {
      const plantasAEliminar = this.seleccionarProsecDisponiblesLista.map(planta => planta.registro);
      this.plantasDatos = this.plantasDatos.filter(planta => !plantasAEliminar.includes(planta.registro));
      this.seleccionarProsecDisponiblesLista = [];
    }
  }

  /**
   * Método del ciclo de vida de Angular que se ejecuta cuando el componente es destruido.
   *
   * Este método emite un valor y completa el Subject `destroyNotifier$` para cancelar todas las suscripciones
   * activas realizadas con `takeUntil(this.destroyNotifier$)`, evitando así posibles fugas de memoria.
   *
   * @returns {void}
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
