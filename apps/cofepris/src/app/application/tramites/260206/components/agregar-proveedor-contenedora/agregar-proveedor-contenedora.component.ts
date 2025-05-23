import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, map, takeUntil } from 'rxjs';
import { Tramite260206State, Tramite260206Store } from '../../estados/stores/tramite260206Store.store';
import { AgregarProveedorComponent } from '../../../../shared/components/agregar-proveedor/agregar-proveedor.component';
import { CommonModule } from '@angular/common';
import { Proveedor } from '../../../../shared/models/terceros-relacionados.model';
import { Tramite260206Query } from '../../estados/queries/tramite260206Query.query';

@Component({
  selector: 'app-agregar-proveedor-contenedora',
  standalone: true,
  imports: [CommonModule, AgregarProveedorComponent],
  templateUrl: './agregar-proveedor-contenedora.component.html',
  styleUrl: './agregar-proveedor-contenedora.component.scss',
})
export class AgregarProveedorContenedoraComponent implements OnDestroy, OnInit {
    /**
        * @property {Subject<void>} destroyNotifier$
        * @description
        * Observable utilizado para notificar la destrucción del componente y liberar recursos.
        */
    private destroyNotifier$: Subject<void> = new Subject();

    /**
     * @property {Tramite260206State} tramiteState
     * Estado completo del trámite, que contiene información como la tabla de mercancías.
     */
    public tramiteState!: Tramite260206State;
 

    constructor(
        public tramiteStore: Tramite260206Store,
        public tramite260206Query: Tramite260206Query) {
    }

    /**
 * @method ngOnInit
 * @description Hook del ciclo de vida que se ejecuta al inicializar el componente.
 * Se suscribe al estado del trámite y guarda su valor localmente para uso posterior.
 */
    ngOnInit(): void {
        this.tramite260206Query.selectTramiteState$
            .pipe(
                takeUntil(this.destroyNotifier$),
                map((seccionState) => {
                    this.tramiteState = seccionState;
                })
            )
            .subscribe();
    }
    
    /**
     * Actualiza los datos de la tabla de proveedores en el almacén de trámites.
     *
     * @param event - Una lista de proveedores que se utilizará para actualizar los datos.
     */
    updateProveedorTablaDatos(event:Proveedor[]): void {  
        this.tramiteStore.updateProveedorTablaDatos(event);
    }

    /**
* @method ngOnDestroy
* @description
* Método del ciclo de vida de Angular que se llama antes de destruir el componente.
* Libera recursos y completa el observable `destroyNotifier$`.
*/
    ngOnDestroy(): void {
        this.destroyNotifier$.next();
        this.destroyNotifier$.complete();
    }
}
