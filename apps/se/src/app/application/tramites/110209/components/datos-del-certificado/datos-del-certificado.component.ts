/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Este componente maneja el formulario de datos del certificado.
 */

import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject, map, takeUntil } from 'rxjs';
import { CONFIGURACION_MERCANCIAS } from '../../constantes/certificado-sgp.enum';
import { MercanciasService } from '../../services/mercancias/mercancias.service';
import { TablaDinamicaComponent } from '@ng-mf/data-access-user';
import { TablaSeleccion } from '@libs/shared/data-access-user/src/core/enums/tabla-seleccion.enum';
import { TituloComponent } from "@ng-mf/data-access-user";
import { Tramite110209Query } from '../../estados/queries/tramite110209.query';
import { Tramite110209Store } from '../../estados/stores/tramite110209.store';

@Component({
  selector: 'app-datos-del-certificado',
  standalone: true,
  imports: [CommonModule, TituloComponent, ReactiveFormsModule, TablaDinamicaComponent],
  templateUrl: './datos-del-certificado.component.html',
  styleUrl: './datos-del-certificado.component.scss',
})
export class DatosDelCertificadoComponent implements OnInit, OnDestroy {

  /**
   * Formulario para los datos del certificado.
   * @type {FormGroup}
   */
  datosDelCertificadoForm!: FormGroup;

  /**
   * Selección de la tabla inicializada como RADIO.
   * @type {TablaSeleccion}
   */
  seleccionTabla: TablaSeleccion = TablaSeleccion.RADIO;

  /**
   * Datos que se mostrarán en la tabla.
   * @type {any}
   */
  datosTabla!: any;

  /**
   * Subject que emite un evento cuando el componente es destruido,
   * permitiendo la desuscripción de observables.
   * @type {Subject<void>}
   */
  private destroyed$ = new Subject<void>();

  /**
   * Configuración de la tabla que se utilizará en el componente.
   * @type {any}
   */
  configuracionTabla = CONFIGURACION_MERCANCIAS;

  /**
   * Constructor del componente.
   * Servicio para la creación de formularios reactivos y para obtener datos de mercancías.
   * @param {FormBuilder} fb - Servicio para la creación de formularios reactivos.
   * @param {MercanciasService} service - Servicio para obtener datos de mercancías.
   * @param {Tramite110209Store} tramite110209Store - Servicio para manejar el estado del trámite.
   * @param {Tramite110209Query} tramite110209Query - Servicio para consultar el estado del trámite.
   */
  constructor(private fb: FormBuilder, private service: MercanciasService, private tramite110209Store: Tramite110209Store, private tramite110209Query: Tramite110209Query) {
    this.datosDelCertificadoForm = this.fb.group({
      observaciones: ['',Validators.pattern(/^(?!\s)(.*\S)?$/)]
    });
  }

  /**
   * Hook del ciclo de vida que se llama después de que las propiedades enlazadas a datos de una directiva se inicializan.
   * Obtiene las mercancías y los valores del store.
   */
  ngOnInit(): void {
    this.getMercancias();
    this.getValoresStore();
  }

  /**
   * Obtiene las mercancías desde el servicio.
   */
  getMercancias(): void {
    this.service.getMercancias().pipe(
      takeUntil(this.destroyed$)
    ).subscribe(
      (data: string[]) => {
        this.datosTabla = data;
      }
    );
  }

  /**
   * Establece los valores en el store.
   * @param {FormGroup} form - El formulario del cual se obtienen los valores.
   * @param {string} campo - El nombre del campo del formulario.
   * @param {keyof Tramite110209Store} metodoNombre - El nombre del método del store.
   */
  setValoresStore(form: FormGroup, campo: string, metodoNombre: keyof Tramite110209Store): void {
    if(form.get(campo)?.valid){
    const VALOR = form.get(campo)?.value;
    (this.tramite110209Store[metodoNombre] as (value: unknown) => void)(VALOR);
    }
  }

  /**
   * Obtiene los valores del store y los asigna al formulario.
   */
  getValoresStore(): void {
    this.tramite110209Query.selectTramite110102$
      .pipe(
        takeUntil(this.destroyed$),
        map((seccionState) => {
          this.datosDelCertificadoForm.patchValue({
            observaciones: seccionState.observaciones
          });
        })
      )
      .subscribe();
  }

  /**
   * Hook del ciclo de vida que se llama cuando la directiva se destruye.
   * Completa el subject destroyed$ para desuscribirse de todos los observables.
   */
  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}