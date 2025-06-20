import { AfterViewInit, Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { LISTA_DE_SECTORS, LISTA_DE_SECTORS_BAJA } from '../../constantes/constantes90303.enum';
import { ListaTabla, ListaTablaBaja } from '../../models/registro.model';
import { Mercancias, PlantasTabla, ProductorIndirecto, SectorTabla } from '../../../../shared/models/complementaria.model';
import { ReplaySubject, takeUntil } from 'rxjs';
import { TablaDinamicaComponent, TablaSeleccion, TituloComponent } from '@ng-mf/data-access-user';
import { CatalogosService } from '../../service/catalogos.service';
import { CommonModule } from '@angular/common';
import { PlantasComponent } from "../../../../shared/components/plantas/plantas.component";
import { ProducirMercanciasComponent } from '../../../../shared/components/producir-mercancias/producir-mercancias.component';
import { ProductorIndirectoComponent } from '../../../../shared/components/productor-indirecto/productor-indirecto.component';
import { SectorComponent } from "../../../../shared/components/sector/sector.component";

/**
 * Componente para gestionar la modificación de datos en el trámite 90303.
 * Este componente incluye tablas dinámicas para sectores, plantas, mercancías y productores indirectos.
 */
@Component({
  selector: 'app-modificacion',
  standalone: true,
  imports: [CommonModule, TablaDinamicaComponent, TituloComponent, PlantasComponent, SectorComponent, ProducirMercanciasComponent, ProductorIndirectoComponent],
  templateUrl: './modificacion.component.html',
  styleUrl: './modificacion.component.css',
})
export class ModificacionComponent implements OnInit, OnDestroy, AfterViewInit {
  /**
   * ReplaySubject utilizado para gestionar la destrucción de observables.
   * Se emite un valor cuando el componente se destruye para cancelar las suscripciones activas.
   */
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  /**
   * Indica si la tabla está en modo "Baja".
   */
  isBaja: boolean = true;

  /**
   * Enumeración que define las opciones de selección para las tablas dinámicas.
   */
  tablaSeleccion = TablaSeleccion;

  /**
   * Lista de datos para la tabla de sectores activos.
   */
  public listaTabla = LISTA_DE_SECTORS;

  /**
   * Lista de datos para la tabla de sectores en baja.
   */
  public listaTablaBaja = LISTA_DE_SECTORS_BAJA;

  /**
   * Datos de la tabla de sectores activos.
   */
  listaTablaDatos: ListaTabla[] = [];

  /**
   * Datos de la tabla de sectores en baja.
   */
  listaTablaDatosBaja: ListaTablaBaja[] = [];

  /**
   * Datos de la tabla de plantas.
   */
  listaPlantasTabla: PlantasTabla[] = [];

  /**
   * Datos de la tabla de sectores.
   */
  listaSectorTabla: SectorTabla[] = [];

  /**
   * Datos de la tabla de mercancías.
   */
  listaTablaMercancia: Mercancias[] = [];

  /**
   * Datos de la tabla de productores indirectos.
   */
  listaTablaProductor: ProductorIndirecto[] = [];

  /**
   * Referencia a una función para encontrar elementos cercanos en el DOM.
   */
  findClose!: (element: HTMLElement) => HTMLElement | null;

  /**
   * Constructor del componente.
   * @param catalogo Servicio utilizado para obtener los datos de las tablas.
   * @param renderer Servicio para manipular el DOM.
   */
  constructor(private catalogo: CatalogosService, private renderer: Renderer2) { }

  /**
   * Método del ciclo de vida que se ejecuta después de que la vista se ha inicializado.
   * Configura un listener para manejar clics en el contenedor de la tabla.
   */
  ngAfterViewInit(): void {
    const CONTAINER = document.getElementById('tablecontainer');

    if (CONTAINER) {
      this.renderer.listen(CONTAINER, 'click', (event: Event) => {
        const BUTTON = this.findClose(event.target as HTMLElement);
        if (BUTTON) {
          const BUTTON_TEXT = BUTTON.textContent?.trim().toUpperCase();
          if (BUTTON_TEXT === 'BAJA' || BUTTON_TEXT === 'ACTIVAR') {
            this.isBaja = BUTTON_TEXT === 'BAJA';
            BUTTON.textContent = this.isBaja ? 'Activar' : 'BAJA';
          }
        }
      });
    }
  }

  /**
   * Método del ciclo de vida que se ejecuta al inicializar el componente.
   * Llama a los métodos para obtener los datos de las tablas.
   */
  ngOnInit(): void {
    this.obtenerTablaLista();
    this.obtenerTablaPlantas();
    this.obtenerTablaSector();
    this.obtenerTablaMercancia();
    this.obtenerTablaProductor();
    this.obtenerTablaListaBaja();
  }

  /**
   * Obtiene los datos de la tabla de sectores activos desde el servicio.
   */
  public obtenerTablaLista(): void {
    this.catalogo
      .obtenerTablaLista()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data) => {
        this.listaTablaDatos = data;
      });
  }

  /**
   * Obtiene los datos de la tabla de sectores en baja desde el servicio.
   */
  public obtenerTablaListaBaja(): void {
    this.catalogo
      .obtenerTablaListaBaja()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data) => {
        this.listaTablaDatosBaja = data;
      });
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
   * Maneja el evento de clic en una fila de la tabla.
   * @param event Evento de clic.
   */
  onFilaClic(event: Event): void {
    const TARGET = event.target as HTMLInputElement;

    if (TARGET.tagName === 'BUTTON' && TARGET.textContent?.trim() === 'BAJA') {
      this.isBaja = false;
      TARGET.textContent = 'Activar';
    }
    TARGET.textContent = 'Activar';
  }

  /**
   * Método del ciclo de vida que se ejecuta al destruir el componente.
   * Emite un valor en `destroyed$` para cancelar las suscripciones activas.
   */
  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

}