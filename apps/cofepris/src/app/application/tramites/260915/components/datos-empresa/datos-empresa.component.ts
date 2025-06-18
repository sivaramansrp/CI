import { Component, OnDestroy } from '@angular/core';
import { ALERT } from '../../constants/constantes.enum';
import { AlertComponent } from '@libs/shared/data-access-user/src';
import { CommonModule } from '@angular/common';

import { ConsultaioQuery } from '@ng-mf/data-access-user';

import { Subject, map, takeUntil } from 'rxjs';

import { Solicitud260915State } from '../../estados/tramites260915.store';
import { TituloComponent } from '@libs/shared/data-access-user/src';

/**
 * Componente que representa los datos de la empresa en un proceso de múltiples pasos.
 * Permite mostrar información relevante de la empresa, controlar el estado de solo lectura
 * y gestionar la visualización colapsable del formulario.
 *
 * @selector app-datos-empresa
 * @standalone true
 * @imports [
 *   CommonModule,
 *   AlertComponent,
 *   TituloComponent
 * ]
 * @templateUrl ./datos-empresa.component.html
 * @styleUrl ./datos-empresa.component.scss
 */
@Component({
  selector: 'app-datos-empresa',
  standalone: true,
  imports: [
    CommonModule,
    AlertComponent,
    TituloComponent,
  ],
  templateUrl: './datos-empresa.component.html',
  styleUrls: ['./datos-empresa.component.scss'],
})
export class DatosEmpresaComponent implements OnDestroy {

  /**
   * Indica si el formulario está en modo solo lectura.
   * Se actualiza automáticamente según el estado de la consulta.
   */
  esFormularioSoloLectura: boolean = false;

  /**
   * Estado actual de los datos de la solicitud.
   * Se utiliza para almacenar y manipular la información de la solicitud 260915.
   */
  dataDeLaSolicitudState!: Solicitud260915State;

  /**
   * Subject utilizado para gestionar el ciclo de vida de las suscripciones
   * y evitar fugas de memoria. Se completa en el método ngOnDestroy.
   * @private
   */
  private destroyed$ = new Subject<void>();

  /**
   * Indica si el formulario es colapsable.
   * Permite mostrar u ocultar el contenido del formulario.
   */
  colapsable: boolean = true;

  /**
   * Textos de alerta utilizados en el componente.
   */
  TEXTOS = ALERT;

  /**
   * Constructor del componente.
   * Inicializa la suscripción al estado de consulta para actualizar el modo de solo lectura.
   *
   * @param consultaioQuery Servicio para consultar el estado de la solicitud.
   */
  constructor(
    public consultaioQuery: ConsultaioQuery,
  ) {
    this.consultaioQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyed$),
        map((seccionState) => {
          this.esFormularioSoloLectura = seccionState.readonly;
        })
      )
      .subscribe();
  }

  /**
   * Método para mostrar u ocultar el formulario colapsable.
   * Cambia el estado de la propiedad `colapsable`.
   *
   * @returns {void}
   */
  mostrar_colapsable(): void {
    this.colapsable = !this.colapsable;
  }

  /**
   * Hook del ciclo de vida que limpia las suscripciones para evitar fugas de memoria.
   * Se ejecuta justo antes de que Angular destruya el componente. Emite un valor en el Subject
   * destroyed$ y lo completa para finalizar todas las suscripciones vinculadas mediante takeUntil.
   *
   * @returns {void}
   * @public
   * @implements OnDestroy
   */
  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

}