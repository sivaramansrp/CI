import {
  BodyTablaRequerimiento,
  HeaderTablaRequerimientos,
} from '../../../../core/models/shared/consulta-generica.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { CONSULTA_REQUERIMIENTOS } from '../../../../core/enums/consulta-generica.enum';
import { CommonModule } from '@angular/common';
import { FolioQuery } from '../../../../core/queries/folio.query';
import { RequerimientosService } from '../../../../core/services/consultagenerica/requerimiento-service';
import { Router } from '@angular/router';

@Component({
  selector: 'lib-consultarequerimientos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './consulta-requerimientos.component.html',
  styleUrl: './consulta-requerimientos.component.scss',
})
export class ConsultarequerimientosComponent implements OnInit, OnDestroy {
  /**
   * Variable para almacenar el folio
   */
  public folio!: string;
  public unsubscribe$ = new Subject<void>();
  /**
   * Subject para notificar la destrucción del componente.
   */
  public destroyNotifier$: Subject<void> = new Subject();
  /**
   * Implementación para la tabla de documentos de requerimientos.
   *
   */
  readonly encabezadoTablaRequerimiento: HeaderTablaRequerimientos[] =
    CONSULTA_REQUERIMIENTOS.encabezadoTablaRequerimiento;
  /**
   * Variable para almacenar los documentos
   */
  datosTablaRequerimientos: BodyTablaRequerimiento[] = [];

  constructor(
    private router: Router,
    private folioQuery: FolioQuery,
    private requerimientoService: RequerimientosService
  ) {
    /**
       * Constructor por si lo requiremos en el futuro
       */
  }
  ngOnInit(): void {
    /**
     * Recuperar el folio desde el store
     */
    this.folioQuery.getFolio().subscribe((folio) => {
      this.folio = folio || '';
    });
    /**
     * Llamar al método para obtener los requerimientos al inicializar el componente
     */
    this.getRequerimientos();
  }

  /**
   * Abre una nueva pestaña con los detalles del requerimiento.
   *
   * @param {number} id - El id del requerimiento para visualizar el detalle.
   * @returns {void}
   */
  verDetalleRequerimiento(id: number): void {
    /**
     * Aquí puedes implementar la lógica para abrir el detalle en una nueva pestaña
     */
  }
  /**
   * Método para obtener los requerimientos desde el servicio.
   * unsubscribe$ - Subject para manejar la cancelación de suscripciones.
   * suscribe - Se suscribe al observable del servicio para obtener los datos.
   */
  getRequerimientos(): void {
    this.requerimientoService
      .getRequerimientos()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data) => {
        this.datosTablaRequerimientos = data;
      });
  }
  /**
   * Método `ngOnDestroy()`.
   * Este método se ejecuta cuando el componente se destruye y realiza las siguientes acciones:
   * - Desuscribe la suscripción a los cambios en el formulario reactivo.
   *
   * @memberof ConsultarequerimientosComponent
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
