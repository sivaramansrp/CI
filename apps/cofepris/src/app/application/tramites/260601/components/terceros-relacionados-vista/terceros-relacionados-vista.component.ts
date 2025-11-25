import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Fabricante, Proveedor } from '../../../../shared/models/terceros-relacionados.model';
import { Subject, takeUntil } from 'rxjs';
import { AvisoSanitarioService } from '../../services/aviso-sanitario.service';
import { CommonModule } from '@angular/common';
import { IDPROCEDIMIENTO } from '../../constantes/aviso-enum';
import { TercerosRelacionadosComponent } from '../../../../shared/components/shared2606/terceros-relacionados/terceros-relacionados.component';
import { TercerosRelacionadosFebService } from '../../../../shared/services/tereceros-relacionados-feb.service';
import { Tramite260601Query } from '../../../../estados/queries/tramite260601.query';
import { Tramite260601Store } from '../../../../estados/tramites/tramite260601.store';

/**
 * @component TercerosRelacionadosVistaComponent
 * @description
 * Componente de solo lectura que muestra las tablas de terceros relacionados:
 * - Fabricantes
 * - Destinatarios finales
 * - Proveedores
 * - Facturadores
 *
 * Consume observables del `Tramite260101Query` para visualizar los datos en la vista
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
export class TercerosRelacionadosVistaComponent implements OnInit, OnDestroy {
  /**
   * @input formularioDeshabilitado
   * @description Indica si el formulario se encuentra en modo deshabilitado (solo lectura).
   */
  @Input() formularioDeshabilitado: boolean = false;

  /**
   * Lista de fabricantes mostrados en la tabla.
   */
  fabricanteTablaDatos: Fabricante[] = [];

  /**
   * Lista de proveedores mostrados en la tabla.
   */
  proveedorTablaDatos: Proveedor[] = [];

  /**
   * @name idProcedimiento
   * @type {number}
   * @description Identificador del procedimiento asignado al componente.  
   * Su valor proviene de la constante `IDPROCEDIMIENTO`, la cual centraliza  
   * el número de procedimiento para reutilizarlo en toda la aplicación.
   */
  idProcedimiento: number = IDPROCEDIMIENTO;

  /**
   * Subject para gestionar la destrucción del componente y cancelar todas las suscripciones activas.
   * Previene fugas de memoria.
   * @private
   */
  private destroy$ = new Subject<void>();

  /**
   * Constructor que inyecta los servicios necesarios.
   *
   * @param tramiteStore - Store que maneja el estado del trámite.
   * @param tramiteQuery - Query que expone los datos reactivos desde el store.
   * @param tercerosService - Servicio que obtiene los datos de terceros desde el backend.
   */
  constructor(
    private tramiteStore: Tramite260601Store,
    private tramiteQuery: Tramite260601Query,
    private tercerosService: TercerosRelacionadosFebService,
    private avisoSanitarioService: AvisoSanitarioService
  ) {}

  /**
   * Hook de inicialización del componente.
   * Se suscribe a los observables del store para obtener los datos iniciales.
   */
  ngOnInit(): void {
    this.tramiteQuery.getFabricanteTablaDatos$
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.fabricanteTablaDatos = data;
      });

    this.tramiteQuery.getProveedorTablaDatos$
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.proveedorTablaDatos = data;
      });
    this.cargarDatos();
  }

  /**
   * Método que carga los datos de terceros desde el backend
   * utilizando el servicio `tercerosService`.
   * Llama internamente a los métodos `add*` para actualizar el store.
   */
  cargarDatos(): void {
    this.avisoSanitarioService
      .getFabricanteTablaDatos()
      .pipe(takeUntil(this.destroy$))
      .subscribe((response: Fabricante[]) => {
        this.addFabricantes(response);
      });

    this.avisoSanitarioService
      .obtenerProveedorDatos()
      .pipe(takeUntil(this.destroy$))
      .subscribe((response: Proveedor[]) => {
        this.addProveedores(response);
      });
  }

  /**
   * Agrega una lista de fabricantes al store.
   * @param newFabricantes - Arreglo de objetos `Fabricante`.
   */
  addFabricantes(newFabricantes: Fabricante[]): void {
    this.tramiteStore.updateFabricanteTablaDatos(newFabricantes);
  }

  /**
   * Agrega una lista de proveedores al store.
   * @param newProveedores - Arreglo de objetos `Proveedor`.
   */
  addProveedores(newProveedores: Proveedor[]): void {
    this.tramiteStore.updateProveedorTablaDatos(newProveedores);
  }

  /**
   * Maneja el evento de modificación de fabricantes.
   * Actualiza el store con la nueva lista.
   * @param fabricante - Lista de objetos `Fabricante` modificados.
   */
  fabricanteEventoModificar(fabricante: Fabricante[]): void {
    this.tramiteStore.fabricanteTablaModificaDatos(fabricante);
  }

  /**
   * Maneja el evento de modificación de destinatarios.
   * Actualiza el store con la nueva lista.
   * @param destinatario - Lista de objetos `Destinatario` modificados.
   */
  proveedorTablaModificar(destinatario: Proveedor[]): void {
    this.tramiteStore.proveedorTablaModificaDatos(destinatario);
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
