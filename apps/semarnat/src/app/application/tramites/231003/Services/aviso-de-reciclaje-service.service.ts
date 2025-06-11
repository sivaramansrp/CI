import { DatoSolicitudStore } from '../estados/tramites/dato-solicitud.store';
import { EstadoDatoSolicitud } from '../models/datos-solicitud.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AvisoDeReciclajeServiceService {

  constructor(private http:HttpClient,private datoSolicitudStore:DatoSolicitudStore) { }

    actualizarEstadoFormulario(DATOS: EstadoDatoSolicitud): void {
      this.datoSolicitudStore.actualizarSolicitudForm(DATOS.solicitudForm);
      this.datoSolicitudStore.actualizarEmpresaReciclaje(DATOS.empresaReciclaje);
      this.datoSolicitudStore.actualizarLugarReciclaje(DATOS.lugarReciclaje);
      this.datoSolicitudStore.actualizarEmpresaTransportista(DATOS.empresaTransportista);
      this.datoSolicitudStore.actualizarPrecaucionesManejo(DATOS.precaucionesManejo);
    }

  obtenerDatosSolicitudInicial(): Observable<EstadoDatoSolicitud> {
    return this.http.get<EstadoDatoSolicitud>('assets/json/231003/inicializar-formulario-datos.json');
  }

  obtenerDatosCompletosFormulario(): Observable<EstadoDatoSolicitud> {
    return this.http.get<EstadoDatoSolicitud>('assets/json/231003/inicializar-formulario-datos-residuos.json');
  }

}
