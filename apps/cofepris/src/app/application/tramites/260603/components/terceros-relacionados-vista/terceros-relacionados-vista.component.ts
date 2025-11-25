import { Component, Input, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Facturador } from '../../../../shared/models/terceros-relacionados.model';
import { Subject } from 'rxjs';
import { TercerosRelacionadosComponent } from '../../../../shared/components/shared2606/terceros-relacionados/terceros-relacionados.component';
import { TercerosRelacionadosFebService } from '../../../../shared/services/tereceros-relacionados-feb.service';


/**
 * @component TercerosRelacionadosVistaComponent
 * @description
 * Componente de solo lectura que muestra las tablas de terceros relacionados:
 * - Facturadores
 *
 * utilizando el componente `TercerosRelacionadosComponent`.
 *
 * @example
 * <app-terceros-relacionados-vista [formularioDeshabilitado]="true"></app-terceros-relacionados-vista>
 */
@Component({
  selector: 'app-terceros-relacionados-vista',
  standalone: true,
  imports: [CommonModule, TercerosRelacionadosComponent],
  templateUrl: './terceros-relacionados-vista.component.html',
  styleUrl: './terceros-relacionados-vista.component.css',
})
export class TercerosRelacionadosVistaComponent implements OnDestroy {
  /**
   * @input formularioDeshabilitado
   * @description Indica si el formulario se encuentra en modo deshabilitado (solo lectura).
   */
  @Input() formularioDeshabilitado: boolean = false;

  /**
   * Lista de facturadores mostrados en la tabla.
   */
  facturadorTablaDatos: Facturador[] = [];

  /**
   * @name idProcedimiento
   * @type {number}
   * @description Identificador numérico del procedimiento. Se utiliza para
   * referenciar el trámite/procedimiento en llamadas a servicios y rutas.
   */
  idProcedimiento: number = 260603;

  /**
   * Subject para gestionar la destrucción del componente y cancelar todas las suscripciones activas.
   * Previene fugas de memoria.
   * @private
   */
  private destroy$ = new Subject<void>();

/**
  * @name facturadorDatos
  * @type {Facturador[]}
  * @description Arreglo que almacena la información del facturador seleccionada
  * o modificada desde el componente hijo.  
  * Se actualiza mediante el método `facturadorEventoModificar`.
  */
  public facturadorDatos : Facturador[] = [];

  /**
   * Constructor que inyecta los servicios necesarios.
   *
   * @param tramiteStore - Store que maneja el estado del trámite.
   * @param tramiteQuery - Query que expone los datos reactivos desde el store.
   * @param tercerosService - Servicio que obtiene los datos de terceros desde el backend.
   */
  constructor(
    private tercerosService: TercerosRelacionadosFebService,
  ) {}

  /**
   * @name facturadorEventoModificar
   * @description Método encargado de actualizar los datos del facturador cuando
   * se emite un evento desde el componente hijo.  
   * Recibe un arreglo de objetos `Facturador` y actualiza la propiedad
   * `facturadorDatos` del componente.
   */
  facturadorEventoModificar(evento: Facturador[]): void{
    this.facturadorDatos = evento;
  }

   /**
   * Hook de destrucción del componente.
   * Emite y completa el subject `destroy$` para cancelar todas las suscripciones activas.
   */
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
