import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ConsultaioQuery, ConsultaioState, FormularioDinamico } from '@ng-mf/data-access-user';
import { DOMICILIO_FISCAL_PERSONA_MORAL_O_FISICA_NACIONAL, PERSONA_MORAL_NACIONAL } from '@libs/shared/data-access-user/src/tramites/constantes/solicitante-constantes.enum';
import { Mercancias, PlantasTabla, ProductorIndirecto, SectorTabla } from '../../../../shared/models/complementaria.model';
import { ReplaySubject, map, takeUntil } from 'rxjs';
import { Bitacora } from '../../../../shared/models/bitacora.model';
import { CatalogosService } from '../../service/catalogos.service';

/**
 * Componente que representa el primer paso del trámite.
 * Este paso incluye la configuración inicial y la obtención de datos necesarios para el trámite.
 */
@Component({
  selector: 'app-paso-uno',
  templateUrl: './paso-uno.component.html',
  styles: ``,
  standalone: false,
})
export class PasoUnoComponent implements AfterViewInit, OnInit, OnDestroy {
  /**
   * Catálogo de entidades federativas.
   */
  entidadFederativa!: unknown;
  /**
   * Tipo de persona seleccionada (e.g., física o moral).
   */
  tipoPersona!: number;

  /**
   * Configuración del formulario dinámico para la persona.
   */
  persona: FormularioDinamico[] = [];

  /**
   * Configuración del formulario dinámico para el domicilio fiscal.
   */
  domicilioFiscal: FormularioDinamico[] = [];

  /**
   * Índice del paso actual en el asistente.
   */
  indice: number = 1;

  /**
   * ReplaySubject utilizado para gestionar la destrucción de observables.
   * Se emite un valor cuando el componente se destruye para cancelar las suscripciones activas.
   */
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
/**
     * Estado de la consulta, utilizado para manejar el estado de la aplicación.
     */
  public consultaState!: ConsultaioState;
  /**
   * Indica si los datos de respuesta están disponibles.
   * Se utiliza para determinar si se deben mostrar los datos del formulario o no.
   */
  public esDatosRespuesta: boolean = false;
  /**
   * Lista de datos para la tabla de plantas.
   */
  listaPlantasTabla: PlantasTabla[] = [];

  /**
   * Lista de datos para la tabla de sectores.
   */
  listaSectorTabla: SectorTabla[] = [];

  /**
   * Lista de datos para la tabla de mercancías.
   */
  listaTablaMercancia: Mercancias[] = [];

  /**
   * Lista de datos para la tabla de productores indirectos.
   */
  listaTablaProductor: ProductorIndirecto[] = [];

  /**
   * Lista de datos para la tabla de bitácoras.
   */
  listaTablaBitacora: Bitacora[] = [];

  /**
   * Constructor del componente.
   * @param catalogo Servicio para obtener datos de catálogos.
   */
  constructor(private catalogo: CatalogosService,private consultaQuery: ConsultaioQuery,) {
    // El constructor se utiliza para la inyección de dependencias.
  }

  /**
   * Método que se ejecuta al inicializar el componente.
   * Obtiene los datos necesarios para las tablas de plantas, sectores, mercancías y productores.
   */
  ngOnInit(): void {
    this.obtenerTablaPlantas();
    this.obtenerTablaSector();
    this.obtenerTablaMercancia();
    this.obtenerTablaProductor();

     this.consultaQuery.selectConsultaioState$.pipe(
      takeUntil(this.destroyed$),
      map((seccionState) => {
        this.consultaState = seccionState;
      })
    ).subscribe();
    if (this.consultaState.update) {
      this.guardarDatosFormularios();
    } else {
      this.esDatosRespuesta = true;
    }
  }
 /**
     * Carga datos desde un archivo JSON y actualiza el store con la información obtenida.
     * Luego reinicializa el formulario con los valores actualizados desde el store.
     */
  guardarDatosFormularios(): void {
    this.catalogo
      .getRegistroTomaMuestrasMercanciasData().pipe(
        takeUntil(this.destroyed$)
      )
      .subscribe((resp) => {
        if (resp) {
          this.esDatosRespuesta = true;
          this.catalogo.actualizarEstadoFormulario(resp);
        }
      });
  }
  /**
   * Método que se ejecuta después de que las vistas del componente han sido inicializadas.
   * Configura los formularios dinámicos y obtiene el tipo de persona.
   */
  ngAfterViewInit(): void {
    this.persona = PERSONA_MORAL_NACIONAL;
    this.domicilioFiscal = DOMICILIO_FISCAL_PERSONA_MORAL_O_FISICA_NACIONAL;
    // this.solicitante.obtenerTipoPersona(TIPO_PERSONA.MORAL_NACIONAL);
  }

  /**
   * Selecciona una pestaña del asistente.
   * @param i Índice de la pestaña a seleccionar.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }

  /**
   * Obtiene los datos de la tabla de plantas desde el servicio.
   */
  public obtenerTablaPlantas(): void {
    this.catalogo
      .obtenerTablaPlantas()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data) => {
        this.listaPlantasTabla = data;
      });
  }

  /**
   * Obtiene los datos de la tabla de sectores desde el servicio.
   */
  public obtenerTablaSector(): void {
    this.catalogo
      .obtenerTablaSector()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data) => {
        this.listaSectorTabla = data;
      });
  }

  /**
   * Obtiene los datos de la tabla de mercancías desde el servicio.
   */
  public obtenerTablaMercancia(): void {
    this.catalogo
      .obtenerTablaMercancia()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data) => {
        this.listaTablaMercancia = data;
      });
  }

  /**
   * Obtiene los datos de la tabla de productores indirectos desde el servicio.
   */
  public obtenerTablaProductor(): void {
    this.catalogo
      .obtenerTablaProductor()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data) => {
        this.listaTablaProductor = data;
      });
  }

  /**
   * Método de limpieza que se ejecuta cuando el componente se destruye.
   * Cancela las suscripciones activas para evitar fugas de memoria.
   */
  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}