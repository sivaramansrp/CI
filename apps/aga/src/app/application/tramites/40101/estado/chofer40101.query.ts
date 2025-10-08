import { Chofer40101State, Chofer40101Store } from './chofer40101.store';
import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';

@Injectable({ providedIn: 'root' })
export class Chofer40101Query extends Query<Chofer40101State> {
  constructor(protected override store: Chofer40101Store) {
    super(store);
  }

  // Selectores para el controlador que se está editando en el cuadro de diálogo
  selectDriverInEdit$ = this.select('driverInEdit');
  selectSelectedDriverType$ = this.select('selectedDriverType');

  // Selectores para las listas de controladores
  getdatosDelChoferNacional$ = this.select('datosDelChoferNacionalAlta');
  getdatosDelChoferNacionalModification$ = this.select('datosDelChoferNacionalModification');
  getdatosDelChoferNacionalRetirada$ = this.select('datosDelChoferNacionalRetirada');

  getdatosDelChoferExtranjeros$ = this.select('datosDelChoferExtranjerosAlta');
  getdatosDelChoferExtranjerosModification$ = this.select('datosDelChoferExtranjerosModification');
  getdatosDelChoferExtranjerosRetirada$ = this.select('datosDelChoferExtranjerosRetirada');

  // Un selector para todo el estado si es necesario
  selectChoferState$ = this.select();

  /**
* @deprecated selectSolicitud$ está obsoleto y se eliminará en una versión futura.
* Utilice selectChoferState$ en su lugar.
*/
  selectSolicitud$ = this.select();

  /**
* @deprecated selectSeccionState$ está obsoleto y se eliminará en una versión futura.
* Utilice selectChoferState$ en su lugar.
*/
  selectSeccionState$ = this.select();
}