import { EstadoFormularioReciclaje,FormularioReciclajeStore} from '../tramites/dato-solicitud.store';
import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';

@Injectable({ providedIn: 'root' })
export class FormularioReciclajeQuery extends Query<EstadoFormularioReciclaje> {

  estadoFormulario$ = this.select();

  constructor(protected override store: FormularioReciclajeStore) {
    super(store);
  }

  obtenerSolicitudForm$ = this.select(state => state.solicitudForm);
  obtenerEmpresaReciclaje$ = this.select(state => state.empresaReciclaje);
  obtenerLugarReciclaje$ = this.select(state => state.lugarReciclaje);
}
