import { ChangeDetectorRef, Component, Input, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Subject, map, takeUntil } from 'rxjs';

import { ConsultaioQuery, ConsultaioState } from '@ng-mf/data-access-user';

import { ID_PROCEDIMIENTO, PERMISO_DEFINITIVO_TITULO } from '../../../../shared/constantes/shared2603/medicos-sin-registrar.enum';
import { TercerosRelacionadosComponent } from '../../../../shared/components/2603/terceros-relacionados/terceros-relacionados.component';
import { Tramite260302Query } from '../../estados/queries/tramite260302.query';
import { Tramite260302Store } from '../../estados/stores/tramite260302.store';

/**
 * TercerosRelacionadosContenedoraComponent es responsable de manejar el primer paso del proceso.
 * para actualizar el componente actual que se está mostrando.
 */
@Component({
  selector: 'app-terceros-relacionados-contenedora',
  standalone: true,
  imports: [CommonModule, TercerosRelacionadosComponent],
  providers: [Tramite260302Store, Tramite260302Query],
  templateUrl: './terceros-relacionados.contenedora.html',
  styleUrls: ['./terceros-relacionados.contenedora.scss'],
})
export class TercerosRelacionadosContenedoraComponent implements OnDestroy {
      /**
   * @property
   * @name permisoDefinitivoTitulo
   * @type {number}
   * @description Identificador único del procedimiento actual. Este valor se utiliza para asociar el componente con un trámite específico en el sistema.
   */
  permisoDefinitivoTitulo: number[] = PERMISO_DEFINITIVO_TITULO;

    /**
   * @property
   * @name idProcedimiento
   * @type {number}
   * @description Identificador único del procedimiento actual. Este valor se utiliza para asociar el componente con un trámite específico en el sistema.
   */
  idProcedimiento : number[] = ID_PROCEDIMIENTO;
  
  /**
   * @property destroyNotifier$
   * @description Subject utilizado para cancelar observables de manera ordenada
   * cuando el componente se destruye, evitando fugas de memoria.
   * @private
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * @property consultaState
   * @description
   * Estado actual de la consulta gestionado por el store `ConsultaioQuery`.
   */
  @Input() public consultaState!: ConsultaioState;

/**
   * @property {boolean} esFormularioSoloLectura
   * @description Bandera que determina si el formulario de pago de derechos debe
   * mostrarse en modo solo lectura. Cuando es `true`, todos los campos del formulario
   * se deshabilitan y no permiten edición. Este valor se actualiza automáticamente
   * basándose en el estado de consulta obtenido del `ConsultaioQuery`.
   * 
   * @type {boolean}
   * @default false
   * @access public
   * @readonly false
   * @example
   * ```typescript
   * // En el template
   * <app-pago-derechos [readonly]="esFormularioSoloLectura"></app-pago-derechos>
   * ```
   */
  public esFormularioSoloLectura: boolean = false;
  

  /**
   * Crea una instancia de TercerosRelacionadosContenedoraComponent.
   *
   * Inicializa la suscripción al estado de consulta mediante el store `ConsultaioQuery`.
   * Actualiza la bandera `esFormularioSoloLectura` y el estado `consultaState` cada vez que cambia el estado de consulta.
   *
   * @param consultaQuery Servicio para consultar el estado global de la consulta.
   * @param tramite260302Query Servicio para consultar el estado específico del trámite 260302.
   * @param tramite260302Store Store para gestionar el estado del trámite 260302.
   * @param cdr Servicio de Angular para detectar y aplicar cambios en el ciclo de vida del componente.
   *
   * La suscripción se cancela automáticamente al destruir el componente para evitar fugas de memoria.
   */
  constructor(
    private consultaQuery: ConsultaioQuery,
    private tramite260302Query: Tramite260302Query,
    private cdr: ChangeDetectorRef
  ) {
    this.consultaQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.esFormularioSoloLectura = seccionState.readonly;
          this.consultaState = seccionState;
          this.cdr.detectChanges();
        })
      )
      .subscribe();
  }

    /**
   * Método del ciclo de vida de Angular que se llama justo antes de que el componente sea destruido.
   */
    ngOnDestroy(): void {
      this.destroyNotifier$.next();
      this.destroyNotifier$.complete();
    }
}
