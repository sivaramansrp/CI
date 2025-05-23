import { Adquiriente, Complementaria, DetallesLicitacion, LicitacionesDisponibles } from '@libs/shared/data-access-user/src/tramites/constantes/120501/licitaciones-disponibles-table-data.enum';
import { Solicitud120501State, Tramite120501Store } from '../estados/tramites/tramite120501.store';
import { Catalogo } from '@libs/shared/data-access-user/src';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
@Injectable({
  providedIn: 'root'
})
export class LicitacionesDisponiblesService {

  constructor(private http: HttpClient, private tramite120501Store: Tramite120501Store) { 
    // Lógica de inicialización si es necesario
  }

  getData(): Observable<LicitacionesDisponibles[]> {
    return this.http.get<LicitacionesDisponibles[]>('assets/json/120501/licitaciones-disponibles.json');
  }
  getEntidadFederativa(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('assets/json/120501/entidad-federativa.json');
  }
  getRepresentacionFederal(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('assets/json/120501/representacion-federal.json');
  }
  getDetallesDelalicitacion(): Observable<DetallesLicitacion> {
    return this.http.get<DetallesLicitacion>('assets/json/120501/detalles-licitacion.json');
  }
  getAdquiriente(): Observable<Adquiriente> {
    return this.http.get<Adquiriente>('assets/json/120501/adquiriente.json');
  }
  getTableData(): Observable<Complementaria[]> {
    return this.http.get<Complementaria[]>('assets/json/120501/datos-de-la-tabla.json');
  }

  getLicitationesVigentesData(): Observable<Solicitud120501State> {
    return this.http.get<Solicitud120501State>('assets/json/120501/solicitar-transferencia-cupos.json');
  }

    actualizarEstadoFormulario(DATOS: Solicitud120501State): void {
    this.tramite120501Store.setmontoRecibir(DATOS.montoRecibir);
     if (DATOS.entidadFederativa) {
      this.tramite120501Store.setEntidadFederativa(DATOS.entidadFederativa);
    }
    if (DATOS.representacionFederal) {
      this.tramite120501Store.setRepresentacionFederal(DATOS.representacionFederal);
    }

    
  }
}
