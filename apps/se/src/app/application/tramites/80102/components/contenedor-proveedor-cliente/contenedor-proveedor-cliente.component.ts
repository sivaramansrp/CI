import { AnexoImportacionEncabezado, AnexoUnoEncabezado, ProveedorClienteTabla } from '../../../../shared/models/nuevo-programa-industrial.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ProveedorClienteComponent } from '../../../../shared/components/proveedor-cliente/proveedor-cliente.component';
import { Tramite80102Query } from '../../estados/tramite80102.query';

@Component({
  selector: 'app-contenedor-proveedor-cliente',
  standalone: true,
  imports: [CommonModule,ProveedorClienteComponent],
  templateUrl: './contenedor-proveedor-cliente.component.html',
  styleUrl: './contenedor-proveedor-cliente.component.scss',
})
export class ContenedorProveedorClienteComponent implements OnDestroy, OnInit {
  fraccionTablaDatos!:AnexoUnoEncabezado | AnexoImportacionEncabezado;
  datosDelProveedor:ProveedorClienteTabla[]=[];

  /**
   * Notificador utilizado para manejar la destrucción o desuscripción de observables.
   * Se usa comúnmente para limpiar suscripciones cuando el componente es destruido.
   *
   * @property {Subject<void>} destroyNotifier$
   */
  private destroyNotifier$: Subject<void> = new Subject();

  constructor( private query: Tramite80102Query ) {
    //constructor vacío
  }

  ngOnInit():void{
      this.query.selectDatosParaNavegar$
          .pipe(takeUntil(this.destroyNotifier$))
          .subscribe((datosParaNavegar) => {
           this.fraccionTablaDatos=datosParaNavegar;
          });
  }
  

  public datosActualizadosProveedorCliente($event:ProveedorClienteTabla[]):void{
    this.datosDelProveedor = $event;
    //Datos del proveedor
  }

    /**
     * Método del ciclo de vida de Angular que se ejecuta al destruir el componente.
     * Limpia las suscripciones y actualiza los BehaviorSubject para ocultar las tablas.
     * @method ngOnDestroy
     */
    ngOnDestroy(): void {
      this.destroyNotifier$.next();
      this.destroyNotifier$.complete();
    }

}
