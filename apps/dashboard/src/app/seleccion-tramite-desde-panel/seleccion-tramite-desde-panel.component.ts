import { AMBIENTES } from '@ng-mf/data-access-user';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { TituloComponent } from "@ng-mf/data-access-user";

import { Subject, takeUntil } from 'rxjs';

import { Component, OnDestroy, OnInit } from '@angular/core';
/**
 * Represents the details of a "Tramite" (procedure or process).
 *
 * @interface TramiteDetails
 * @property {number} id - The unique identifier for the tramite.
 * @property {number} tramite - The specific tramite number or code.
 * @property {string} link - A hyperlink related to the tramite.
 * @property {string} department - The department responsible for the tramite.
 */
interface TramiteDetails {
  id: number;
  tramite: number;
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

  /**
   * Un arreglo que contiene los detalles de varios "Trámites" (procedimientos o procesos).
   * Cada elemento en el arreglo es de tipo `TramiteDetails`.
   * Estos datos se utilizan para gestionar y mostrar información relacionada con diferentes trámites.
   */
  
  public tramiteData: TramiteDetails[] = [];
  /**
   * Un Subject que emite un valor `void` para señalar la finalización de las suscripciones.
   * Se utiliza para gestionar y limpiar observables, evitando fugas de memoria.
   * Normalmente se completa en el hook de ciclo de vida `ngOnDestroy`.
   */
  private destroy$ = new Subject<void>();

  /**
   * Una instancia de HttpClient utilizada para realizar solicitudes HTTP.
   * Este servicio se utiliza típicamente para comunicarse con APIs de backend.
   */
  private http: HttpClient;
  
  constructor(http: HttpClient) {
    this.http = http;
  }

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
