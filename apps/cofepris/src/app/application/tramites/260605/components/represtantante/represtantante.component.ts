/* eslint-disable sort-imports */
/* eslint-disable no-empty-function */
/* eslint-disable @nx/enforce-module-boundaries */
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Tramite260605Store, Solicitud260605State } from '../../../../estados/tramites/tramite260605.store';
import { Tramite260605Query } from '../../../../estados/queries/tramite260605.query';

import { Subject, Subscription } from 'rxjs';
import { takeUntil, map } from 'rxjs/operators';
import { AlertComponent } from 'libs/shared/data-access-user/src/tramites/components/alert/alert.component';
import {
  Aviso
} from 'libs/shared/data-access-user/src/tramites/constantes/servicios-extraordinarios.enum';
import { TituloComponent } from 'libs/shared/data-access-user/src/tramites/components/titulo/titulo.component';

@Component({
  selector: 'app-represtantante', // Selector del componente en la plantilla HTML
  templateUrl: './represtantante.component.html', // Ruta a la plantilla HTML
  styleUrl: './represtantante.component.scss', // Ruta al archivo de estilos SCSS
  standalone: true, // Define que el componente puede funcionar de forma independiente (sin módulo específico)
  imports: [CommonModule, TituloComponent,ReactiveFormsModule, FormsModule,AlertComponent], // Módulos y componentes necesarios
})
/**
 * Componente para gestionar el formulario reactivo de los datos del representante.
 * Implementa las interfaces OnInit y OnDestroy para manejar el ciclo de vida del componente.
 * 
 * @class
 * @implements {OnInit}
 * @implements {OnDestroy}
 */
export class ReprestantanteComponent implements OnInit, OnDestroy {
  /**
   * Formulario reactivo para los datos del representante.
   */
  represtantante!: FormGroup;

  public solicitudState!: Solicitud260605State;
  /**
   * Constantes importadas desde el archivo de enumeración para los mensajes de advertencia.
   *
   * @type {Aviso}
   */
  public ADVERTENCIA = Aviso;
  private destroyNotifier$: Subject<void> = new Subject();
  /**
   * Suscripción a los cambios en el formulario react
   */
  private subscription: Subscription = new Subscription();
  /**
   * Constructor del componente.
   * @param {FormBuilder} fb - Instancia de FormBuilder para la creación de formularios.
   * @param {Tramite260605Store} tramite260605Store - Store para gestionar el estado del trámite.
   * @param {Tramite260605Query} tramite260605Query - Query para obtener el estado del trámite.
   */
  constructor(
    private fb: FormBuilder,
    private tramite260605Store: Tramite260605Store,
    private tramite260605Query: Tramite260605Query
  ) {}


  ngOnInit(): void {
    this.subscription.add(
      this.tramite260605Query.selectSolicitud$
        .pipe(
          takeUntil(this.destroyNotifier$),
          map((seccionState) => {
            this.solicitudState = seccionState;
          })
        )
        .subscribe()
    );
    this.represtantante = this.fb.group({
      rfc: [this.solicitudState?.rfc, Validators.required],
      nombre: [this.solicitudState?.nombre, Validators.required],
      apellidoPaterno: [this.solicitudState?.apellidoPaterno, Validators.required],
      apellidoMaterno: [this.solicitudState?.apellidoMaterno, Validators.required],
    });
  }

  setValoresStore(
    form: FormGroup,
    campo: string,
    metodoNombre: keyof Tramite260605Store
  ): void {
    const VALOR = form.get(campo)?.value;
    (this.tramite260605Store[metodoNombre] as (value: any) => void)(VALOR);
  }

  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}