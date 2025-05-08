
import { Solicitud80301State } from './tramite80301.store';

/** Importa el decorador Injectable para inyección de dependencias */
import { Injectable } from '@angular/core';

/** Importa la clase base Query de Akita para manejar el estado */
import { Query } from '@datorama/akita';

/** Importa el store que contiene el estado del trámite 80301 */
import { Tramite80301Store } from './tramite80301.store';

/** Define un servicio inyectable disponible en la raíz de la aplicación */
@Injectable({ providedIn: 'root' })
/** Clase que permite consultar el estado del trámite 80301 */
export class Tramite80301Query extends Query<Solicitud80301State> {
  
  /** Constructor que inicializa la clase con el store del trámite */
  constructor(protected override store: Tramite80301Store) {
    /** Llama al constructor de la clase padre con el store como parámetro */
    super(store);
  }

  /** Observable que emite el estado completo del trámite */
  selectSolicitud$ = this.select((state) => state);

  /** Observable que emite el valor del manifiesto */
  selectManifesto$ = this.select((state) => state.manifesto);

  /** Observable que emite el catálogo de aduanas */
  selectAduana$ = this.select((state) => state.aduana);

  /** Observable que emite el catálogo de años */
  selectAno$ = this.select((state) => state.ano);

  /** Observable que emite el catálogo de condiciones */
  selectCondicion$ = this.select((state) => state.condicion);

  /** Observable que emite el catálogo de países */
  selectPais$ = this.select((state) => state.pais);

  /** Observable que emite el tipo de documento */
  selectTipoDocumento$ = this.select((state) => state.tipoDocumento);

  /** Observable que emite las fechas seleccionadas */
  selectFechasSeleccionadas$ = this.select((state) => state.fechasSeleccionadas);

  /** Observable que emite la lista de fines elegidos */
  selectFinesElegidos$ = this.select((state) => state.finesElegidos);

  /** Observable que emite los elementos seleccionados */
  selectElegidosSeleccionados$ = this.select((state) => state.elegidosSeleccionados);

  /** Observable que emite el rango de días seleccionado */
  selectSelectRangoDias$ = this.select((state) => state.selectRangoDias);

  /** Observable que emite los datos relacionados con fechas */
  selectFechasDatos$ = this.select((state) => state.fechasDatos);

  /** Observable que emite la fecha */
  selectFecha$ = this.select((state) => state.fecha);

  /** Observable que emite la fecha seleccionada */
  selectFechaSeleccionada$ = this.select((state) => state.fechaSeleccionada);

  /** Observable que indica si se debe mostrar la tabla */
  selectShowTabla$ = this.select((state) => state.showTabla);

  /** Observable que indica si el popup está abierto */
  selectIsPopupOpen$ = this.select((state) => state.isPopupOpen);

  /** Observable que indica si el popup está cerrado */
  selectIsPopupClose$ = this.select((state) => state.isPopupClose);

  /** Observable que emite el valor actualmente seleccionado */
  selectValorSeleccionado$ = this.select((state) => state.valorSeleccionado);

  /** Observable que emite el catálogo de documentos */
  selectDocumento$ = this.select((state) => state.documentos);
}
