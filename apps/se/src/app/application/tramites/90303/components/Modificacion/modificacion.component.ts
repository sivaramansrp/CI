import { AfterViewInit, Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablaDinamicaComponent, TablaSeleccion, TituloComponent } from '@ng-mf/data-access-user';
import { LISTA_DE_SECTORS, LISTA_DE_SECTORS_Baja } from '../../constantes/constantes90303.enum';
import { ListaTabla, ListaTablaBaja } from '../../models/registro.model';
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
export class ModificacionComponent implements OnInit, OnDestroy, AfterViewInit {
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  isBaja: boolean = true;

  TablaSeleccion = TablaSeleccion;
  public listaTabla = LISTA_DE_SECTORS;
  public listaTablaBaja = LISTA_DE_SECTORS_Baja;
  listaTablaDatos: ListaTabla[] = [];
  listaTablaDatosBaja: ListaTablaBaja[] = [];
  listaPlantasTabla: PlantasTabla[] = [];
  listaSectorTabla: SectorTabla[] = [];
  listaTablaMercancia: Mercancias[] = [];
  listaTablaProductor: ProductorIndirecto[] = [];
  findClose: any;

  constructor(private catalogo: CatalogosService, private renderer: Renderer2) { }
  ngAfterViewInit(): void {
    const container = document.getElementById('tablecontainer');

    if (container) {
      this.renderer.listen(container, 'click', (event: Event) => {
        const button = this.findClose(event.target as HTMLElement);
        if (button) {
          const buttonText = button.textContent?.trim().toUpperCase();
          if (buttonText === 'BAJA' || buttonText === 'Activar') {
            this.isBaja = buttonText === 'BAJA';
            button.textContent = this.isBaja ? 'Activar' : 'BAJA';
          }
        }
      });
    }
  }

  ngOnInit(): void {
    this.obtenerTablaLista();
    this.obtenerTablaPlantas();
    this.obtenerTablaSector();
    this.obtenerTablaMercancia();
    this.obtenerTablaProductor();
    this.obtenerTablaListaBaja();
  }

  public obtenerTablaLista(): void {
    this.catalogo
      .obtenerTablaLista()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data) => {
        this.listaTablaDatos = data;
      });
  }

  public obtenerTablaListaBaja(): void {
    this.catalogo
      .obtenerTablaListaBaja()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data) => {
        this.listaTablaDatosBaja = data;
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

  onFilaClic(event: Event) {
    const target = event.target as HTMLInputElement; // Obtener el checkbox desde el evento

    if (target.tagName === 'BUTTON' && target.textContent?.trim() === 'BAJA') {
      this.isBaja = false;
      target.textContent = 'Activar';
    }
    target.textContent = 'Activar';
  }
}


