import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AMBIENTES } from '@ng-mf/data-access-user';
import { Subject, takeUntil } from 'rxjs';
import tramiteDetailsData from '@libs/shared/theme/assets/json/tramiteList.json'

/**
 * Representa los detalles de un "Trámite" (procedimiento o proceso).
 *
 * @interface TramiteDetails
 * @property {number} id - El identificador único para el trámite.
 * @property {number} tramite - El número o código específico del trámite.
 * @property {string} link - Un hipervínculo relacionado con el trámite.
 * @property {string} department - El departamento responsable del trámite.
 */
interface TramiteDetails {
  id: number;
  tramite: number;
  link: string;
  department: string;
}
@Component({
  selector: 'seleccion-tramite',
  templateUrl: './seleccion-tramite.component.html',
})
export class SeleccionTramiteComponent implements OnInit, OnDestroy {

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

    this.tramiteData = tramiteDetailsData.filter((v) => v.department === "aga") ;

  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.tramiteData = [];
  }
  
}
