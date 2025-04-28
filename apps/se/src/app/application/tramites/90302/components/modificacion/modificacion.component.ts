/**
 * @fileoverview
 * El `AmpliacionAnexoComponent` es un componente de Angular diseñado para gestionar la funcionalidad del módulo "Ampliación de Servicios".
 * Maneja formularios reactivos, catálogos, y la interacción con el estado para la gestión de datos relacionados con fracciones arancelarias,
 * importaciones y servicios IMMEX.
 * 
 * @module AmpliacionAnexoComponent
 * @description
 * Este componente proporciona funcionalidad para la ampliación de servicios, incluyendo la inicialización de formularios, 
 * la obtención de datos y la interacción con el estado para la gestión de fracciones arancelarias e importaciones.
 */

import {
  FormBuilder,
  FormGroup,
} from '@angular/forms';

import {
  TEXTOS_90302
} from "../../constantes/modificacion.constants";

import { OnDestroy, OnInit } from '@angular/core';
import { AmpliacionServiciosQuery } from '../../estados/tramite90302.query';
import { AmpliacionServiciosService } from '../../services/ampliacion-servicios.service';
import { ApiResponse } from "../../models/datos-info.model";

import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { Tramite90302Store } from '../../estados/tramite90302.store';
import { takeUntil} from 'rxjs/operators';


@Component({
  selector: 'app-modificacion',
  templateUrl: './modificacion.component.html',
  styleUrl: './modificacion.component.scss',
})
export class ModificacionComponent implements OnInit, OnDestroy {
  /**
   * Formulario reactivo para la información de registro.
   * @property {FormGroup} formularioInfoRegistro
   */
  formularioInfoRegistro!: FormGroup;


  /**
   * Textos constantes para el componente.
   * @property {any} TEXTOS
   */
  TEXTOS = TEXTOS_90302;

  /**
   * Notificador para gestionar la destrucción o desuscripción de observables.
   * @property {Subject<void>} destroyNotifier$
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * Constructor del componente.
   * @constructor
   * @param {FormBuilder} fb - Servicio para la creación de formularios.
   * @param {AmpliacionServiciosService} ampliacionServiciosService - Servicio para obtener datos de ampliación de servicios.
   * @param {HttpClient} httpServicios - Servicio HTTP para realizar peticiones.
   */

  constructor(
    private fb: FormBuilder,
    private ampliacionServiciosService: AmpliacionServiciosService,
    private ampliacionServiciosQuery: AmpliacionServiciosQuery, 
    private tramite90302Store: Tramite90302Store,
  ) {
  }

  /**
   * Método de inicialización del componente.
   * @method ngOnInit
   */
  ngOnInit():void {
    this.getDatos();
   this.inicializarFormularioInfoRegistro();
   this.inicializarFormularioDesdeAlmacen();
  }
  
  /**
   * Obtiene los datos del servicio y actualiza el estado del formulario.
   * @method getDatos
   */
  getDatos(): void {
    
    this.ampliacionServiciosService.getDatos().pipe(takeUntil(this.destroyNotifier$)).subscribe((respuesta) => {
       const RESPONSE = respuesta as unknown as ApiResponse;
      if (RESPONSE) {
        this.tramite90302Store.setInfoRegistro(RESPONSE.data.infoServicios);
      }
    })
  
  } 
  
  /**
   * Inicializa el formulario de información de registro.
   * @method inicializarFormularioInfoRegistro
   */
  
  inicializarFormularioInfoRegistro(): void {
    this.formularioInfoRegistro = this.fb.group({
      rfc: [{ value: '', disabled: true }],
      representacionFederal: [{ value: '', disabled: true }],
      tipoModificacion: [{ value: '', disabled: true }],
      modificacionPrograma: [{ value: '', disabled: true }],
    });
  }

  inicializarFormularioDesdeAlmacen():void{
    this.ampliacionServiciosQuery.selectInfoRegistro$.pipe(takeUntil(this.destroyNotifier$)).subscribe((infoRegistro) => {
      this.formularioInfoRegistro.patchValue({
        rfc: infoRegistro.rfc,
        representacionFederal: infoRegistro.representacionFederal,
        tipoModificacion: infoRegistro.tipoModificacion,
        modificacionPrograma: infoRegistro.modificacionPrograma,
      });
    });
  }

 

  /**
   * Método del ciclo de vida de Angular que se ejecuta al destruir el componente.
   * Limpia las suscripciones.
   * @method ngOnDestroy
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
  
}