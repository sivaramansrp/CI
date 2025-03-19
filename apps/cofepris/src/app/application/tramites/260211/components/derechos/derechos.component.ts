import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Catalogo, TituloComponent } from '@ng-mf/data-access-user';
import { ReactiveFormsModule } from '@angular/forms';
import { CatalogoSelectComponent } from '@ng-mf/data-access-user';
import { SanitarioService } from '../../services/sanitario.service';
import { map, Subject, takeUntil } from 'rxjs';
import { Solicitud260211State, } from '../../../../estados/tramites/sanitario260211.store';

import { Sanitario260211Store } from '../../../../estados/tramites/sanitario260211.store';

import { Permiso260211Query } from '../../../../estados/queries/permiso260211.query';



/**
 * @component
 * @name DerechosComponent
 * @description
 * Este componente es responsable de gestionar la funcionalidad relacionada con los derechos en el sistema.
 * Proporciona un formulario para capturar los datos de los derechos y carga una lista de datos relacionados.
 * 
 * @selector app-derechos
 * @standalone true
 * @imports
 * - CommonModule
 * - TituloComponent
 * - ReactiveFormsModule
 * - CatalogoSelectComponent
 * 
 * @templateUrl ./derechos.component.html
 * @styleUrl ./derechos.component.css
 */
@Component({
  selector: 'app-derechos',
  standalone: true,
  imports: [CommonModule, TituloComponent, ReactiveFormsModule, CatalogoSelectComponent],
  templateUrl: './derechos.component.html',
  styleUrls: ['./derechos.component.css'],
})
export class DerechosComponent implements OnInit, OnDestroy {
  /**
   * @property {FormGroup} derechosForm
   * @description Formulario reactivo para capturar los datos de los derechos.
   */
  derechosForm!: FormGroup;

  /**
   * @property {Subject<void>} destroyNotifier$
   * @description Sujeto utilizado para notificar la destrucción del componente.
   * @private
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * @property {Subject<void>} destroyed$
   * @description Sujeto utilizado para manejar la destrucción de observables.
   * @private
   */
  private destroyed$ = new Subject<void>();

  /**
   * @property {Catalogo[]} derechosList
   * @description Lista de datos relacionados con los derechos.
   */
  public derechosList!: Catalogo[];

  /**
   * @property {Solicitud260211State} solicitudState
   * @description Estado actual de la solicitud.
   */
  public solicitudState!: Solicitud260211State;

  /**
   * @constructor
   * @param {FormBuilder} fb - Constructor para formularios reactivos.
   * @param {SanitarioService} service - Servicio para manejar datos sanitarios.
   * @param {Sanitario260211Store} sanitario260211Store - Almacén de estado para la solicitud.
   * @param {Permiso260211Query} permiso260211Query - Consulta para obtener datos relacionados con permisos.
   */
  constructor(
    private fb: FormBuilder,
    private service: SanitarioService,
    private sanitario260211Store: Sanitario260211Store,
    private permiso260211Query: Permiso260211Query
  ) {}

  /**
   * @method ngOnInit
   * @description Método de inicialización del componente.
   */
  ngOnInit(): void {
    this.permiso260211Query.selectSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.solicitudState = seccionState;
        })
      )
      .subscribe();

    this.derechosForm = this.fb.group({
      referencia: [this.solicitudState?.referencia],
      Chandenadependencia: [this.solicitudState?.Chandenadependencia],
      Llave: [this.solicitudState?.Llave],
      benco: [this.solicitudState?.benco],
      deFetch: [this.solicitudState?.deFetch],
      importe: [this.solicitudState?.importe],
    });

    this.loadComboUnidadMedida();
  }

  /**
   * @method loadComboUnidadMedida
   * @description Carga la lista de datos relacionados con los derechos.
   */
  loadComboUnidadMedida(): void {
    this.service.getDatos()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data): void => {
        this.derechosList = data as Catalogo[];
      });
  }

  /**
   * @method setValoresStore
   * @description Actualiza el valor de un campo en el almacén de estado.
   * @param {FormGroup} form - El formulario reactivo.
   * @param {string} campo - El nombre del campo.
   * @param {keyof Sanitario260211Store} metodoNombre - El método del almacén a invocar.
   */
  setValoresStore(form: FormGroup, campo: string, metodoNombre: keyof Sanitario260211Store): void {
    const valor = form.get(campo)?.value;
    (this.sanitario260211Store[metodoNombre] as (value: any) => void)(valor);
  }

  /**
   * @method ngOnDestroy
   * @description Método de limpieza al destruir el componente.
   */
  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}