import { Component, Input } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ComplimentosComponent } from '../../../../shared/components/complimentos/complimentos.component';
import { DatosComplimentos } from '../../../../shared/models/complimentos.model';
import { SociaoAccionistas } from '../../../../shared/models/complimentos.model';
import { Tramite80101Query } from '../../estados/tramite80101.query';
import { Tramite80101Store } from '../../estados/tramite80101.store';

/**
 * Componente Angular para agregar cumplimientos en el trámite 80101.
 * Este componente permite gestionar los cumplimientos y accionistas asociados
 * a un trámite específico, proporcionando funcionalidades para agregar, eliminar
 * y modificar datos relacionados con los cumplimientos.
 *
 * @remarks
 * Este componente es autónomo y utiliza el módulo `CommonModule` y el componente `ComplimentosComponent`.
 */
@Component({
  selector: 'app-aggregar-complimentos',
  standalone: true,
  imports: [CommonModule, ComplimentosComponent],
  templateUrl: './aggregar-complimentos.component.html',
  styleUrl: './aggregar-complimentos.component.scss',
})
export class AggregarComplimentosComponent {
  /**
   * @property {boolean} formularioDeshabilitado - Indica si el formulario está deshabilitado.Add commentMore actions
   */
  @Input() formularioDeshabilitado: boolean = false;

  /**
   * Propiedad que almacena los datos relacionados con los cumplimientos.
   *
   * @type {DatosComplimentos}
   * @remarks
   * Esta propiedad se utiliza para gestionar y manipular la información
   * asociada a los cumplimientos dentro del componente.
   */
  datosComplimentos!: DatosComplimentos;
  /**
   * Sujeto utilizado como notificador para la destrucción de observables.
   * Este Subject emite un valor cuando el componente se destruye, permitiendo
   * cancelar suscripciones y evitar fugas de memoria.
   */
  private destroyNotifier$: Subject<void> = new Subject();
  /**
   * Observable que representa los datos de la tabla de complementos.
   *
   * @type {Observable<SociaoAccionistas[]>}
   * @description Este observable contiene una lista de objetos de tipo `SociaoAccionistas`,
   * que se utiliza para mostrar y gestionar los datos relacionados con los complementos
   * en la interfaz de usuario.
   */
  tablaDatosComplimentos$: Observable<SociaoAccionistas[]>;
  /**
   * Observable que representa los datos de la tabla de complementos extranjeros.
   *
   * @type {Observable<SociaoAccionistas[]>}
   * @description Este observable emite una lista de objetos de tipo `SociaoAccionistas`,
   * que contienen información relacionada con los complementos extranjeros.
   * Es utilizado para mostrar y gestionar los datos en la tabla correspondiente
   * dentro del componente.
   */
  tablaDatosComplimentosExtranjera$: Observable<SociaoAccionistas[]>;

  /**
   * Constructor de la clase `AggregarComplimentosComponent`.
   *
   * @param store - Instancia del estado `Tramite80101Store` utilizada para gestionar el estado de la aplicación.
   * @param tramiteQuery - Instancia de `Tramite80101Query` utilizada para realizar consultas relacionadas con los datos del trámite.
   *
   * Este constructor inicializa las propiedades observables `tablaDatosComplimentos$` y `tablaDatosComplimentosExtranjera$`
   * con los valores seleccionados desde `tramiteQuery`. Además, suscribe al observable `selectDatosComplimento$` para
   * actualizar la propiedad `datosComplimentos` con los datos emitidos, hasta que se complete el ciclo de vida del componente.
   */
  constructor(
    private store: Tramite80101Store,
    private tramiteQuery: Tramite80101Query
  ) {
    this.tablaDatosComplimentos$ =
      this.tramiteQuery.selectTablaDatosComplimentos$;
    this.tablaDatosComplimentosExtranjera$ =
      this.tramiteQuery.selectTablaDatosComplimentosExtranjera$;
    this.tramiteQuery.selectDatosComplimento$
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((datos) => {
        this.datosComplimentos = datos;
      });
  }

  /**
   * Modifica los datos de los cumplimientos y los almacena en el estado.
   *
   * @param complimentos - Objeto de tipo `DatosComplimentos` que contiene los datos de los cumplimientos a actualizar.
   * @returns void
   */
  modifierComplimentos(complimentos: DatosComplimentos): void {
    this.store.setDatosComplimentos(complimentos);
  }

  /**
   * Agrega datos de accionistas a la tabla correspondiente según el tipo de RFC.
   *
   * @param datos - Objeto de tipo `SociaoAccionistas` que contiene la información del accionista.
   *                Si el objeto incluye un RFC válido, se agrega a la tabla de datos nacionales.
   *                De lo contrario, se agrega a la tabla de datos extranjeros.
   */
  accionistasAgregados(datos: SociaoAccionistas): void {
    if (datos.rfc) {
      this.store.aggregarTablaDatosComplimentos(datos);
    } else {
      this.store.aggregarTablaDatosComplimentosExtranjera(datos);
    }
  }

  /**
   * Elimina los datos de los accionistas proporcionados de la tabla de complementos.
   *
   * @param datos - Una lista de objetos de tipo `SociaoAccionistas` que representan los accionistas a eliminar.
   *
   * Este método utiliza el servicio `store` para realizar la eliminación de los datos
   * correspondientes en la tabla de complementos.
   */
  accionistasEliminados(datos: SociaoAccionistas[]): void {
    this.store.eliminarTablaDatosComplimentos(datos);
  }

  /**
   * Elimina los datos de los accionistas extranjeros de la tabla de complementos.
   *
   * @param datos - Una lista de objetos de tipo `SociaoAccionistas` que representan
   * los accionistas extranjeros a eliminar.
   */
  accionistasExtranjerosEliminado(datos: SociaoAccionistas[]): void {
    this.store.eliminarTablaDatosComplimentosExtranjera(datos);
  }
}
