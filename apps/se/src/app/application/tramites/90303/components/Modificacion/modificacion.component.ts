import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablaDinamicaComponent, TablaSeleccion, TituloComponent } from '@libs/shared/data-access-user/src';
import { LISTA_DE_SECTORS } from '../../constantes/constantes90303.enum';
import { ListaTabla } from '../../models/registro.model';
import { CatalogosService } from '../../service/catalogos.service';
import { ReplaySubject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-modificacion',
  standalone: true,
  imports: [CommonModule,TablaDinamicaComponent,TituloComponent],
  templateUrl: './modificacion.component.html',
  styleUrl: './modificacion.component.css',
})
export class ModificacionComponent implements OnInit,OnDestroy {
  TablaSeleccion = TablaSeleccion;
  public listaTabla = LISTA_DE_SECTORS;
  listaTablaDatos: ListaTabla[] = [];
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

constructor(private catalogo: CatalogosService){}
 
  ngOnInit(): void {
    this.obtenerTablaLista();
  }

  public obtenerTablaLista(): void {
    this.catalogo
      .obtenerTablaLista()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data) => {
        this.listaTablaDatos = data;
      });
  }
  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}
