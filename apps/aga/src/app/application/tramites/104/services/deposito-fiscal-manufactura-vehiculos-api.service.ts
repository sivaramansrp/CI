import { DatosDelInmueble104State, DatosDelInmueble104Store } from '../../../core/estados/tramites/tramite104.store';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DepositoFiscalManufacturaVehiculosApiService {

  constructor(private http: HttpClient,private datosDelInmueble104Store:DatosDelInmueble104Store) {
    // Constructor vacío: La inicialización se realizará en métodos específicos según sea necesario.
   }

   actualizarEstadoFormulario(DATOS: DatosDelInmueble104State): void {
  this.datosDelInmueble104Store.setFomentoExportacion(DATOS.fomentoExportacion);
  this.datosDelInmueble104Store.setDireccion(DATOS.direccion);
}


    obtenerDatosInicialesFormulario(): Observable<DatosDelInmueble104State> {
      return this.http.get<DatosDelInmueble104State>('assets/json/104/inicializar_formulario.json');
    }
}
