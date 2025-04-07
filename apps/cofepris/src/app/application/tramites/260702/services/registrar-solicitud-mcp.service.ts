import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Catalogo, } from '@libs/shared/data-access-user/src';
import { Observable } from 'rxjs';
import { TramitesAsociados } from '../models/destinatario.model';
import { FilaData2 } from '../models/fila-modal';
@Injectable({
  providedIn: 'root'
})
export class RegistrarSolicitudMcpService {

  constructor(private http: HttpClient) {}

  getEstadosData(): Observable<Catalogo[]>{
    return this.http.get<Catalogo[]>('./assets/json/260702/estado.json');
  }
  
  getClaveScianData(): Observable<Catalogo[]>{
    return this.http.get<Catalogo[]>('./assets/json/260702/clavescian.json');
  }

  getClaveDescripcionDelData(): Observable<Catalogo[]>{
    return this.http.get<Catalogo[]>('./assets/json/260702/clavedescripciondel.json');
  }

  getRegimenalqueData(): Observable<Catalogo[]>{
    return this.http.get<Catalogo[]>('./assets/json/260702/regimen.json');
  }
  getAduanaData(): Observable<Catalogo[]>{
    return this.http.get<Catalogo[]>('./assets/json/260702/adauna.json');
  }

   getBancoData(): Observable<Catalogo[]>{
    return this.http.get<Catalogo[]>('./assets/json/260702/banco.json');
  }

  getPaisData(): Observable<Catalogo[]>{
    return this.http.get<Catalogo[]>('./assets/json/260702/pais.json');
  }
  getTramitesAsociados(): Observable<TramitesAsociados[]>{
    return this.http.get<TramitesAsociados[]>('./assets/json/260702/tramitesasociados.json');
  }

  getMercanciasData(): Observable<FilaData2[]>{
    return this.http.get<FilaData2[]>('./assets/json/260702/mercanciatabla.json');
  }

  getClasificacionDelProductoData(): Observable<Catalogo[]>{
    return this.http.get<Catalogo[]>('./assets/json/260702/delproducto.json');
  }
  
  getEspificarData(): Observable<Catalogo[]>{
    return this.http.get<Catalogo[]>('./assets/json/260702/espicificar.json');
  }
 getTipoProductoData(): Observable<Catalogo[]>{
  return this.http.get<Catalogo[]>('./assets/json/260702/tipoproducto.json');
}
}
