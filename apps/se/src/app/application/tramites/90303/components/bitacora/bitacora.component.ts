import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablaDinamicaComponent, TablaSeleccion, TituloComponent } from '@libs/shared/data-access-user/src';
import { BitacoraTablaComponent } from '../../../../shared/components/bitacora/bitacora.component';
import { ProductorIndirectoComponent } from '../../../../shared/components/productor-indirecto/productor-indirecto.component';
import { ProducirMercanciasComponent } from '../../../../shared/components/producir-mercancias/producir-mercancias.component';
import { SectorComponent } from '../../../../shared/components/sector/sector.component';
import { PlantasComponent } from '../../../../shared/components/plantas/plantas.component';
import { CatalogosService } from '../../service/catalogos.service';
import { ReplaySubject, takeUntil } from 'rxjs';
import { Mercancias, PlantasTabla, ProductorIndirecto, SectorTabla } from '../../../../shared/models/complementaria.model';
import { Bitacora } from '../../../../shared/models/bitacora.model';
@Component({
  selector: 'app-bitacora',
  standalone: true,
  imports: [CommonModule, BitacoraTablaComponent, PlantasComponent, SectorComponent, ProducirMercanciasComponent, ProductorIndirectoComponent],
  templateUrl: './bitacora.component.html',
  styleUrl: './bitacora.component.css',
})
export class BitacoraComponent {
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  TablaSeleccion = TablaSeleccion;
  listaPlantasTabla: PlantasTabla[] = [];
  listaSectorTabla: SectorTabla[] = [];
  listaTablaMercancia: Mercancias[] = [];
  listaTablaProductor: ProductorIndirecto[] = [];
  listaTablaBitacora: Bitacora[] = [];

  constructor(private catalogo: CatalogosService) { }

  ngOnInit(): void {
    this.obtenerTablaBitacora();
    this.obtenerTablaPlantas();
    this.obtenerTablaSector();
    this.obtenerTablaMercancia();
    this.obtenerTablaProductor();
  }
  public obtenerTablaBitacora(): void {
    this.catalogo
      .obtenerTablaBitacora()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data) => {
        this.listaTablaBitacora = data;
      });
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
