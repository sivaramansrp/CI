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
 * 
 * @selector app-datos-empresa
 * @standalone true
 * @imports [
 *   CommonModule,
 *   AlertComponent,
 *   InputRadioComponent,
 *   ReactiveFormsModule,
 *   TituloComponent
 * ]
 * @templateUrl ./datos-empresa.component.html
 * @styleUrl ./datos-empresa.component.scss
 */

/**
 * Componente que representa los datos de la empresa en un proceso de múltiples pasos.
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

     /** Indica si el formulario está en modo solo lectura */
  esFormularioSoloLectura: boolean = false;

     /** Estado actual de los datos de la solicitud */
     dataDeLaSolicitudState!: Solicitud260915State;

    /**
  * @property {Subject<void>} destroyed$
  * @description Subject utilizado para gestionar el ciclo de vida de las suscripciones
  * y evitar fugas de memoria. Se completa en el método ngOnDestroy.
  * @private
  */
 private destroyed$ = new Subject<void>();
  /**
   * Indica si el formulario es colapsable.
   */
  colapsable: boolean = true;

  /**
   * Textos de alerta.
   */
  TEXTOS = ALERT;

  constructor( public consultaioQuery: ConsultaioQuery,
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
   */
  mostrar_colapsable(): void {
    this.colapsable = !this.colapsable;
  }

   /**
  * @method ngOnDestroy
  * @description Hook del ciclo de vida que limpia las suscripciones para evitar fugas de memoria.
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
