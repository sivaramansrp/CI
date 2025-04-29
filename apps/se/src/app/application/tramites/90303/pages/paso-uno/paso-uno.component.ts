import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {
  DOMICILIO_FISCAL_PERSONA_MORAL_O_FISICA_NACIONAL,
  PERSONA_MORAL_NACIONAL,
} from '@libs/shared/data-access-user/src/tramites/constantes/solicitante-constantes.enum';
import { FormularioDinamico, TablaSeleccion, TIPO_PERSONA } from '@ng-mf/data-access-user';
import {
  SharedModule,
  SolicitanteComponent,
} from '@libs/shared/data-access-user/src';
import { CatalogosService } from '../../service/catalogos.service';
import { ReplaySubject, takeUntil } from 'rxjs';
import { Mercancias, PlantasTabla, ProductorIndirecto, SectorTabla } from '../../../../shared/models/complementaria.model';
import { Bitacora } from '../../../../shared/models/bitacora.model';


/**
 * Componente que representa el primer paso del trámite.
 */
@Component({
  selector: 'app-paso-uno',
  templateUrl: './paso-uno.component.html',
  styles: ``,
  standalone: false,
})
export class PasoUnoComponent implements AfterViewInit, OnInit {
  /**
   * Catálogo de entidades federativas.
   */
  entidadFederativa!: any;

  /**
   * Constructor del componente.
   * @param registro Servicio para obtener datos de catálogos.
   */
  
  /**
   * Referencia al componente de solicitante.
   */
  @ViewChild(SolicitanteComponent) solicitante!: SolicitanteComponent;

  /**
   * Tipo de persona seleccionada.
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
   * Índice del paso actual.
   */
  indice: number = 1;

   private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  
    TablaSeleccion = TablaSeleccion;
    listaPlantasTabla: PlantasTabla[] = [];
    listaSectorTabla: SectorTabla[] = [];
    listaTablaMercancia: Mercancias[] = [];
    listaTablaProductor: ProductorIndirecto[] = [];
    listaTablaBitacora: Bitacora[] = [];
  
    constructor(private catalogo: CatalogosService) { 
      // El constructor se utiliza para la inyección de dependencias.
      }

  /**
   * Método que se ejecuta al inicializar el componente.
   * Obtiene el catálogo de entidades federativas y lo procesa.
   */
  ngOnInit(): void {
    this.obtenerTablaPlantas();
    this.obtenerTablaSector();
    this.obtenerTablaMercancia();
    this.obtenerTablaProductor();
  }

  /**
   * Método que se ejecuta después de que las vistas del componente han sido inicializadas.
   * Configura los formularios dinámicos y obtiene el tipo de persona.
   */
  ngAfterViewInit(): void {
    this.persona = PERSONA_MORAL_NACIONAL;
    this.domicilioFiscal = DOMICILIO_FISCAL_PERSONA_MORAL_O_FISICA_NACIONAL;
    this.solicitante.obtenerTipoPersona(TIPO_PERSONA.MORAL_NACIONAL);
  }

  /**
   * Selecciona una pestaña del asistente.
   * @param i Índice de la pestaña a seleccionar.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }

  public obtenerTablaPlantas(): void {
      this.catalogo
        .obtenerTablaPlantas()
        .pipe(takeUntil(this.destroyed$))
        .subscribe((data) => {
          this.listaPlantasTabla = data;
        });
    }
  
    public obtenerTablaSector(): void {
      this.catalogo
        .obtenerTablaSector()
        .pipe(takeUntil(this.destroyed$))
        .subscribe((data) => {
          this.listaSectorTabla = data;
        });
    }
  
    public obtenerTablaMercancia(): void {
      this.catalogo
        .obtenerTablaMercancia()
        .pipe(takeUntil(this.destroyed$))
        .subscribe((data) => {
          this.listaTablaMercancia = data;
        });
    }
  
    public obtenerTablaProductor(): void {
      this.catalogo
        .obtenerTablaProductor()
        .pipe(takeUntil(this.destroyed$))
        .subscribe((data) => {
          this.listaTablaProductor = data;
        });
    }
    ngOnDestroy(): void {
      this.destroyed$.next(true);
      this.destroyed$.complete();
    }
}
