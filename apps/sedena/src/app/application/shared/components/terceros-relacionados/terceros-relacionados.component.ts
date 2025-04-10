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
