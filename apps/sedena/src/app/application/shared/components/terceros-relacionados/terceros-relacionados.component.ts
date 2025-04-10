import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AlertComponent,
  TablaDinamicaComponent,
  TablaSeleccion,
} from '@ng-mf/data-access-user';
import {
  DESTINO_FINAL_ENCABEZADO_DE_TABLA,
  DestinoFinal,
  Proveedor,
  PROVEEDOR_ENCABEZADO_DE_TABLA,
  TERCEROR_TEXTO_DE_ALERTA,
} from '../../models/terceros-relacionados.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-terceros-relacionados',
  standalone: true,
  imports: [CommonModule, TablaDinamicaComponent, AlertComponent],
  templateUrl: './terceros-relacionados.component.html',
  styleUrl: './terceros-relacionados.component.css',
})
export class TercerosRelacionadosComponent {
  public tercerorTextoDeAlerta = TERCEROR_TEXTO_DE_ALERTA;

  @Input() public idProcedimiento!: number;

  @Input() destinatarioFinalTablaDatos: DestinoFinal[] = [];

  /**
   * @property {Proveedor[]} proveedorTablaDatos
   * Datos de la tabla de proveedores.
   */
  @Input() proveedorTablaDatos: Proveedor[] = [];

  public destinoFinalTablaConfiguracion = {
    tipoSeleccionTabla: TablaSeleccion.CHECKBOX,
    configuracionTabla: DESTINO_FINAL_ENCABEZADO_DE_TABLA,
  };

  public dproveedorTablaConfiguracion = {
    tipoSeleccionTabla: TablaSeleccion.CHECKBOX,
    configuracionTabla: PROVEEDOR_ENCABEZADO_DE_TABLA,
  };
  irAAcciones(accionesPath: string): void {
    this.router.navigate([accionesPath], {
      relativeTo: this.activatedRoute,
    });
  }

  // eslint-disable-next-line no-empty-function
  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}
}
