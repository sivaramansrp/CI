import { Component, OnDestroy, OnInit } from '@angular/core';
import { Mercancias, PlantasTabla, ProductorIndirecto, SectorTabla } from '../../../../shared/models/complementaria.model';
import { ReplaySubject, takeUntil } from 'rxjs';
import { Bitacora } from '../../../../shared/models/bitacora.model';
import { BitacoraTablaComponent } from '../../../../shared/components/bitacora/bitacora.component';
import { CatalogosService } from '../../service/catalogos.service';
import { CommonModule } from '@angular/common';
import { PlantasComponent } from '../../../../shared/components/plantas/plantas.component';
import { ProducirMercanciasComponent } from '../../../../shared/components/producir-mercancias/producir-mercancias.component';
import { ProductorIndirectoComponent } from '../../../../shared/components/productor-indirecto/productor-indirecto.component';
import { SectorComponent } from '../../../../shared/components/sector/sector.component';
import { TablaSeleccion } from '@libs/shared/data-access-user/src';

/**
 * Componente para gestionar y mostrar la tabla de bitácoras.
 * Este componente también incluye tablas relacionadas con plantas, sectores,
 * mercancías y productores indirectos.
 */
@Component({
  selector: 'app-bitacora',
  standalone: true,
  imports: [CommonModule, BitacoraTablaComponent, PlantasComponent, SectorComponent, ProducirMercanciasComponent, ProductorIndirectoComponent],
  templateUrl: './bitacora.component.html',
  styleUrl: './bitacora.component.css',
})
export class BitacoraComponent implements OnInit, OnDestroy {
  /**
   * ReplaySubject utilizado para gestionar la destrucción de observables.
   * Se emite un valor cuando el componente se destruye para cancelar las suscripciones activas.
   */
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

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
   * @param catalogo Servicio utilizado para obtener los datos de las tablas.
   */
  constructor(private catalogo: CatalogosService) {}

  /**
   * Método del ciclo de vida que se ejecuta al inicializar el componente.
   * Llama a los métodos para obtener los datos de las tablas.
   */
  ngOnInit(): void {
    this.obtenerTablaBitacora();
    this.obtenerTablaPlantas();
    this.obtenerTablaSector();
    this.obtenerTablaMercancia();
    this.obtenerTablaProductor();
  }

  /**
   * Obtiene los datos de la tabla de bitácoras desde el servicio.
   */
  public obtenerTablaBitacora(): void {
    this.catalogo
      .obtenerTablaBitacora()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data) => {
        this.listaTablaBitacora = data;
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
   * Método del ciclo de vida que se ejecuta al destruir el componente.
   * Emite un valor en `destroyed$` para cancelar las suscripciones activas.
   */
  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}