import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablaDinamicaComponent, TablaSeleccion, TituloComponent } from '@libs/shared/data-access-user/src';
import { LISTA_DE_SECTORS } from '../../constantes/constantes90303.enum';
import { ListaTabla } from '../../models/registro.model';
import { CatalogosService } from '../../service/catalogos.service';
import { ReplaySubject, takeUntil } from 'rxjs';
import { PlantasComponent } from "../../../../shared/components/plantas/plantas.component";
import { SectorComponent } from "../../../../shared/components/sector/sector.component";
import { Mercancias, PlantasTabla, ProductorIndirecto, SectorTabla, } from '../../../../shared/models/complementaria.model';
import { ProducirMercanciasComponent } from '../../../../shared/components/producir-mercancias/producir-mercancias.component';
import { ProductorIndirectoComponent } from '../../../../shared/components/productor-indirecto/productor-indirecto.component';

@Component({
  selector: 'app-modificacion',
  standalone: true,
  imports: [CommonModule, TablaDinamicaComponent, TituloComponent, PlantasComponent, SectorComponent, ProducirMercanciasComponent, ProductorIndirectoComponent,],
  templateUrl: './modificacion.component.html',
  styleUrl: './modificacion.component.css',
})
export class ModificacionComponent implements OnInit, OnDestroy {
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  TablaSeleccion = TablaSeleccion;
  public listaTabla = LISTA_DE_SECTORS;
  listaTablaDatos: ListaTabla[] = [];
  listaPlantasTabla: PlantasTabla[] = [];
  listaSectorTabla: SectorTabla[] = [];
  listaTablaMercancia: Mercancias[] = [];
  listaTablaProductor: ProductorIndirecto[] = [];

  constructor(private catalogo: CatalogosService) { }

  ngOnInit(): void {
    this.obtenerTablaLista();
    this.obtenerTablaPlantas();
    this.obtenerTablaSector();
    this.obtenerTablaMercancia();
    this.obtenerTablaProductor();
  }

  public obtenerTablaLista(): void {
    this.catalogo
      .obtenerTablaLista()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data) => {
        this.listaTablaDatos = data;
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
