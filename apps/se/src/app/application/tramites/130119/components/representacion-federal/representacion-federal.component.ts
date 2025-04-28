/**
 * Componente Angular que gestiona la selección de la representación federal.
 * Permite al usuario seleccionar un estado y su correspondiente representación federal.
 * Utiliza formularios reactivos y se integra con un servicio para obtener los datos necesarios.
 * Además, gestiona el estado del trámite utilizando un store y una query.
 */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { CatalogoSelectComponent, TituloComponent } from '@ng-mf/data-access-user';
import { Catalogo } from '@ng-mf/data-access-user';
import { DatosDeLaSolicitudService } from '../../services/datos-de-la-solicitud/datos-de-la-solicitud.service';
import { Tramite130119Query } from '../../estados/queries/tramite130119.query';
import { Tramite130119Store } from '../../estados/store/tramite130119.store';
/**
 * Componente RepresentacionFederalComponent.
 */
@Component({
  selector: 'app-representacion-federal',
  standalone: true,
  imports: [CommonModule, TituloComponent, CatalogoSelectComponent, ReactiveFormsModule],
  templateUrl: './representacion-federal.component.html',
  styleUrl: './representacion-federal.component.scss',
})
export class RepresentacionFederalComponent implements OnInit, OnDestroy {

  /**
   * FormGroup que define la estructura del formulario de representación federal.
   * Incluye campos para el estado y la representación federal, ambos requeridos.
   */
  formularioRepresentacionFederalForm: FormGroup;

  /**
   * Arreglo de catálogos que contiene las opciones para el estado.
   * Se obtiene del servicio DatosDeLaSolicitudService.
   */
  opcionesEstado: Catalogo[] = [];

  /**
   * Arreglo de catálogos que contiene las opciones para la representación federal.
   * Se obtiene del servicio DatosDeLaSolicitudService.
   */
  opcionesRepresentacionFederal: Catalogo[] = [];

  /**
   * Subject utilizado para gestionar la desuscripción de observables al destruir el componente.
   */
  private destroyed$ = new Subject<void>();

  /**
   * Constructor del componente.
   * @param fb Servicio para la creación de formularios reactivos.
   * @param service Servicio para obtener datos de la solicitud (estados y representaciones federales).
   * @param tramite130119Store Store que gestiona el estado del trámite 130119.
   * @param tramite130119Query Query para consultar el estado del trámite 130119.
   */
  constructor(private fb: FormBuilder, private service: DatosDeLaSolicitudService, private tramite130119Store: Tramite130119Store, private tramite130119Query: Tramite130119Query) {
    this.formularioRepresentacionFederalForm = this.fb.group({
      estado: ['', Validators.required],
      representacionFederal: ['', Validators.required],
    });
  }

  /**
   * Método del ciclo de vida que se ejecuta al inicializar el componente.
   * Carga las opciones de estado y representación federal, y obtiene los valores del store.
   */
  ngOnInit(): void {
    this.cargarEstado();
    this.cargarRepresentacionFederal();
    this.getValoresStore();
  }

  /**
   * Carga las opciones de estado desde el servicio y las asigna a estadoOptions.
   */
  cargarEstado(): void {
    this.service.getEstado().pipe(
      takeUntil(this.destroyed$)
    ).subscribe(
      (data) => {
        this.opcionesEstado = data;
      }
    );
  }

  /**
   * Carga las opciones de representación federal desde el servicio y las asigna a representacionFederalOptions.
   */
  cargarRepresentacionFederal(): void {
    this.service.getRepresentacionfederal().pipe(
      takeUntil(this.destroyed$)
    ).subscribe(
      (data) => {
        this.opcionesRepresentacionFederal = data;
      }
    );
  }

  /**
   * Establece los valores del formulario en el store del trámite.
   * @param form FormGroup que contiene los valores a establecer.
   * @param campo Nombre del campo del formulario.
   * @param metodoNombre Nombre del método del store que se utilizará para establecer el valor.
   */
  setValoresStore(form: FormGroup, campo: string): void {
    const VALOR = form.get(campo)?.value;
    this.tramite130119Store.establecerDatos({[campo]: VALOR});
  }

  /**
   * Obtiene los valores del store del trámite y los asigna al formulario.
   */
  getValoresStore(): void {
    this.tramite130119Query.selectTramite130119$
      .pipe(
        takeUntil(this.destroyed$),
        map((seccionState) => {
          this.formularioRepresentacionFederalForm.patchValue({
            estado: seccionState.estado,
            representacionFederal: seccionState.representacionFederal
          });
        })
      )
      .subscribe();
  }

  /**
   * Método del ciclo de vida que se ejecuta al destruir el componente.
   * Completa el Subject destroyed$ para desuscribir los observables.
   */
  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}