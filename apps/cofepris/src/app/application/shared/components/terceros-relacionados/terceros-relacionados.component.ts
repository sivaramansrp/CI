import { CommonModule } from '@angular/common';

import { Component, Input } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { AlertComponent } from '@ng-mf/data-access-user';
import { ConfiguracionColumna } from '@ng-mf/data-access-user';
import { TablaDinamicaComponent } from '@ng-mf/data-access-user';
import { TablaSeleccion } from '@ng-mf/data-access-user';
import { TituloComponent } from '@ng-mf/data-access-user';

import { DESTINATARIO_ENCABEZADO_DE_TABLA } from '../../models/terceros-relacionados.model';
import { Destinatario } from '../../models/terceros-relacionados.model';
import { FABRICANTE_ENCABEZADO_DE_TABLA } from '../../models/terceros-relacionados.model';
import { FACTURADOR_ENCABEZADO_DE_TABLA } from '../../models/terceros-relacionados.model';
import { Fabricante } from '../../models/terceros-relacionados.model';
import { Facturador } from '../../models/terceros-relacionados.model';
import { MENSAJE_TABLA_OBLIGATORIA } from '../../models/terceros-relacionados.model';
import { PROVEEDOR_ENCABEZADO_DE_TABLA } from '../../models/terceros-relacionados.model';
import { Proveedor } from '../../models/terceros-relacionados.model';



/**
 * @component TercerosRelacionadosComponent
 * @description Componente que muestra las tablas dinámicas de terceros relacionados: fabricantes,
 * destinatarios finales, proveedores y facturadores. Permite visualizar los datos almacenados
 * en el store y navegar a las secciones correspondientes para su edición o creación.
 */
@Component({
  selector: 'app-terceros-relacionados',
  standalone: true,
  imports: [
    CommonModule,
    TituloComponent,
    TablaDinamicaComponent,
    AlertComponent,
  ],
  templateUrl: './terceros-relacionados.component.html',
  styleUrl: './terceros-relacionados.component.css',
})
export class TercerosRelacionadosComponent {
  /**
   * @property {string} infoAlert
   * Tipo de alerta visual mostrada en la interfaz.
   */
  public infoAlert = 'alert-info';

  /**
   * @property {string} MENSAJE_TABLA_OBLIGATORIA
   * Constante de mensaje para indicar que la tabla es obligatoria.
   */
  MENSAJE_TABLA_OBLIGATORIA = MENSAJE_TABLA_OBLIGATORIA;

  /**
   * @property {ConfiguracionColumna<Fabricante>[]} configuracionTablaFabricante
   * Configuración de columnas para la tabla de fabricantes.
   */
  configuracionTablaFabricante: ConfiguracionColumna<Fabricante>[] =
    FABRICANTE_ENCABEZADO_DE_TABLA;

  /**
   * @property {ConfiguracionColumna<Destinatario>[]} configuracionTablaDestinatarioFinal
   * Configuración de columnas para la tabla de destinatarios finales.
   */
  configuracionTablaDestinatarioFinal: ConfiguracionColumna<Destinatario>[] =
    DESTINATARIO_ENCABEZADO_DE_TABLA;

  /**
   * @property {ConfiguracionColumna<Proveedor>[]} configuracionTablaProveedor
   * Configuración de columnas para la tabla de proveedores.
   */
  configuracionTablaProveedor: ConfiguracionColumna<Proveedor>[] =
    PROVEEDOR_ENCABEZADO_DE_TABLA;

  /**
   * @property {ConfiguracionColumna<Facturador>[]} configuracionTablaFacturador
   * Configuración de columnas para la tabla de facturadores.
   */
  configuracionTablaFacturador: ConfiguracionColumna<Facturador>[] =
    FACTURADOR_ENCABEZADO_DE_TABLA;



  /**
   * @property {TablaSeleccion} tipoSeleccionTabla
   * Tipo de selección que utiliza la tabla dinámica (por ejemplo, checkbox).
   */
  tipoSeleccionTabla = TablaSeleccion.CHECKBOX;
  @Input() estaOculto!:boolean;
  /**
   * @constructor
   * Inyecta los servicios de router, rutas activas y store del trámite.
   *
   * @param router - Servicio de enrutamiento de Angular.
   * @param activatedRoute - Ruta activa actual.
   * @param tramiteStore - Store que administra los datos del trámite.
   * @param tramiteQuery - Servicio para consultar los datos del trámite.
   */
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {}

  /**
   * @property {Fabricante[]} fabricanteTablaDatos
   * Datos de la tabla de fabricantes.
   */
   @Input() fabricanteTablaDatos: Fabricante[]=[];

  /**
   * @property {Destinatario[]} destinatarioFinalTablaDatos
   * Datos de la tabla de destinatarios finales.
   */
  @Input() destinatarioFinalTablaDatos: Destinatario[]=[];

  /**
   * @property {Proveedor[]} proveedorTablaDatos
   * Datos de la tabla de proveedores.
   */
  @Input() proveedorTablaDatos: Proveedor[]=[];

  /**
   * @property {Facturador[]} facturadorTablaDatos
   * Datos de la tabla de facturadores.
   */
  @Input() facturadorTablaDatos: Facturador[]=[];

  /**
   * @method irAAcciones
   * @description Navega a la ruta relativa proporcionada desde el contexto actual.
   *
   * @param {string} accionesPath - Ruta relativa hacia la que se desea navegar.
   */
  irAAcciones(accionesPath: string): void {
    this.router.navigate([accionesPath], {
      relativeTo: this.activatedRoute,
    });
  }


}
