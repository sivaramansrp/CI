import { AMBIENTES } from '@ng-mf/data-access-user';
import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { TituloComponent } from "@ng-mf/data-access-user";
import { map, Subject, takeUntil } from 'rxjs';

interface TramiteDetails {
  id: number;
  tramite: number;
  url: string;
  link: string;
  department: string;
}

@Component({
  selector: 'seleccion-tramite-desde-panel',
  templateUrl: './seleccion-tramite-desde-panel.component.html',
  styleUrl: './seleccion-tramite-desde-panel.component.scss',
  imports: [TituloComponent,RouterModule, CommonModule],
  standalone: true
})
export class SeleccionTramiteDesdePanelComponent implements OnInit, OnDestroy {

  /**
   * Variable para asingar el endpoint de la ruta
   */
  public ruta: string = '';
  public tramiteData: TramiteDetails[] = [];
  private destroy$ = new Subject<void>();
  
  constructor(private http: HttpClient) {  }

  ngOnInit(): void {
    if (window.location.host.indexOf('localhost') !== -1) {
      this.ruta = AMBIENTES.LOCALHOST;
    } else {
      this.ruta = AMBIENTES.DESARROLLO
    }

    this.http.get<TramiteDetails[]>('../../assets/tramiteList.json')
    .pipe(takeUntil(this.destroy$))
    .subscribe((data) => {
      this.tramiteData = data;
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.tramiteData = [];
  }
  
}
