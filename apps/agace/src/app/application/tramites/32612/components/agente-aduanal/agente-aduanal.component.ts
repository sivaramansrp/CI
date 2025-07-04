import { Component, OnDestroy, OnInit, QueryList, ViewChildren } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Catalogo, CatalogoSelectComponent, CrosslistComponent, TituloComponent } from '@libs/shared/data-access-user/src';
import { EsquemaDeCertificacionService } from '../../services/esquema-de-certificacion.service';
import { Subject, takeUntil } from 'rxjs';
import { CROSLISTA_ENTRADA } from '../../constants/croslista.enums';
import { SociedadesTablaComponent } from '../sociedades-tabla/sociedades-tabla.component';

@Component({
  selector: 'app-agente-aduanal',
  standalone: true,
  imports: [
    CommonModule,
    CatalogoSelectComponent,
    CrosslistComponent,
    TituloComponent,
    SociedadesTablaComponent
  ],
  templateUrl: './agente-aduanal.component.html',
  styleUrl: './agente-aduanal.component.scss',
})
export class AgenteAduanalComponent implements OnInit,OnDestroy {

  @ViewChildren(CrosslistComponent) crossList!: QueryList<CrosslistComponent>;
  private destroyNotifier$: Subject<void> = new Subject();
  public indiqueCatalogo: Catalogo[] = [];
  public seleccionarAduanasEntrada = CROSLISTA_ENTRADA;
  public seleccionadasAduanasEntradaDatos: string[] = [];
  public aduanasEntradaBotons = [
    {
      btnNombre: 'Agregar',
      class: 'btn-primary',
      funcion: (): void => this.crossList.toArray()[0].agregar(''),
    },
    {
      btnNombre: 'Agregar todos',
      class: 'btn-default',
      funcion: (): void => this.crossList.toArray()[0].agregar('t'),
    },
    {
      btnNombre: 'Eliminar',
      class: 'btn-danger',
      funcion: (): void => this.crossList.toArray()[0].quitar(''),
    },
    {
      btnNombre: 'Eliminar todas',
      class: 'btn-default',
      funcion: (): void => this.crossList.toArray()[0].quitar('t'),
    },
  ];



  constructor(
    private esquemaDeCertificacionSvc: EsquemaDeCertificacionService
  ) {

  }

  ngOnInit(): void {
    this.getIndiqueCatalogoDatos();
  }

  public getIndiqueCatalogoDatos(): void {
    this.esquemaDeCertificacionSvc.getIndiqueCatalogo().pipe(takeUntil(this.destroyNotifier$)).subscribe({
      next: (response) => {
        const API_RESPONSE = JSON.parse(JSON.stringify(response));
        this.indiqueCatalogo = API_RESPONSE.data;
      },
      error: (error) => {
        // Manejo de errores
      }
    });
  }
  

  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
