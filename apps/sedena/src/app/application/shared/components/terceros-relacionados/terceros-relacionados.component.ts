import { ActivatedRoute } from '@angular/router';
import { AlertComponent } from '@ng-mf/data-access-user';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DESTINO_FINAL_ENCABEZADO_DE_TABLA } from '../../models/terceros-relacionados.model';
import { DestinoFinal } from '../../models/terceros-relacionados.model';
import { Input } from '@angular/core';
import { PROVEEDOR_ENCABEZADO_DE_TABLA } from '../../models/terceros-relacionados.model';
import { Proveedor } from '../../models/terceros-relacionados.model';
import { Router } from '@angular/router';
import { TERCEROR_TEXTO_DE_ALERTA } from '../../models/terceros-relacionados.model';
import { TablaDinamicaComponent } from '@ng-mf/data-access-user';
import { TablaSeleccion } from '@ng-mf/data-access-user';

/**
 * @title Terceros Relacionados
 * @description Componente que muestra tablas dinámicas con información de destinatarios finales y proveedores relacionados al procedimiento.
 * @summary Visualización de terceros relacionados a través de tablas dinámicas y navegación entre rutas.
 */

@Component({
  selector: 'app-terceros-relacionados',
  standalone: true,
  imports: [CommonModule, TablaDinamicaComponent, AlertComponent],
  templateUrl: './terceros-relacionados.component.html',
  styleUrl: './terceros-relacionados.component.css',
})
export class TercerosRelacionadosComponent {
  /**
   * Texto que se muestra en la alerta del componente.
   * @property {string} tercerorTextoDeAlerta
   */
  public tercerorTextoDeAlerta = TERCEROR_TEXTO_DE_ALERTA;

  /**
   * Identificador del procedimiento relacionado.
   * @property {number} idProcedimiento
   */
  @Input() public idProcedimiento!: number;

  /**
   * Datos que alimentan la tabla de destinatarios finales.
   * @property {DestinoFinal[]} destinatarioFinalTablaDatos
   */
  @Input() destinatarioFinalTablaDatos: DestinoFinal[] = [];

  /**
   * Datos que alimentan la tabla de proveedores.
   * @property {Proveedor[]} proveedorTablaDatos
   */
  @Input() proveedorTablaDatos: Proveedor[] = [];

  /**
   * Configuración de la tabla de destinatarios finales.
   * @property {any} destinoFinalTablaConfiguracion
   */
  public destinoFinalTablaConfiguracion = {
    tipoSeleccionTabla: TablaSeleccion.CHECKBOX,
    configuracionTabla: DESTINO_FINAL_ENCABEZADO_DE_TABLA,
  };

  /**
   * Configuración de la tabla de proveedores.
   * @property {any} dproveedorTablaConfiguracion
   */
  public dproveedorTablaConfiguracion = {
    tipoSeleccionTabla: TablaSeleccion.CHECKBOX,
    configuracionTabla: PROVEEDOR_ENCABEZADO_DE_TABLA,
  };

  /**
   * Navega a una ruta relativa dentro del flujo actual.
   * @method irAAcciones
   * @param {string} accionesPath - Ruta relativa a la que se desea navegar.
   * @returns {void}
   */
  irAAcciones(accionesPath: string): void {
    this.router.navigate([accionesPath], {
      relativeTo: this.activatedRoute,
    });
  }

  /**
   * Constructor del componente.
   * @method constructor
   * @param {Router} router - Servicio de navegación.
   * @param {ActivatedRoute} activatedRoute - Ruta activa para navegación relativa.
   * @returns {void}
   */
  // eslint-disable-next-line no-empty-function
  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}
}
