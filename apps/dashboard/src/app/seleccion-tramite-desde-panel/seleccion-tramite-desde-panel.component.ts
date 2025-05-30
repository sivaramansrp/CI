import { AMBIENTES, OrigenPeticion, TramiteDetails, TramiteStore} from '@ng-mf/data-access-user';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TituloComponent } from "@ng-mf/data-access-user";
import tramiteDetailsData from '@libs/shared/theme/assets/json/tramiteList.json'

@Component({
  selector: 'seleccion-tramite-desde-panel',
  templateUrl: './seleccion-tramite-desde-panel.component.html',
  styleUrl: './seleccion-tramite-desde-panel.component.scss',
  imports: [TituloComponent,RouterModule, CommonModule],
  standalone: true
})
export class SeleccionTramiteDesdePanelComponent implements OnInit {

  /**
   * Variable para asingar el endpoint de la ruta
   */
  public ruta: string = '';

  /**
   * Un arreglo que contiene los detalles de varios "Trámites" (procedimientos o procesos).
   * Cada elemento en el arreglo es de tipo `TramiteDetails`.
   * Estos datos se utilizan para gestionar y mostrar información relacionada con diferentes trámites.
   */
  
  public tramiteData: TramiteDetails[] = [];

  constructor(
    private tramiteStore: TramiteStore,
  ) { }

  ngOnInit(): void {
    if (window.location.host.indexOf('localhost') !== -1) {
      this.ruta = AMBIENTES.LOCALHOST;
    } else {
      this.ruta = AMBIENTES.DESARROLLO
    }

    this.tramiteData = (tramiteDetailsData as TramiteDetails[]).sort((a, b) => {
      if (a.tramite < b.tramite) {
        return -1;
      }
      if (a.tramite > b.tramite) {
        return 1;
      }
      return 0;
    });
  }

  public configuraOrigenPeticion(): void {
    console.log(' origen ');
    this.tramiteStore.establecerOrigenPeticion(OrigenPeticion.NUEVA);
  }
}
   