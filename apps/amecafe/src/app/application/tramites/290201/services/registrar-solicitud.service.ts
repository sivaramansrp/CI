import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Catalogo, RespuestaCatalogos } from '@libs/shared/data-access-user/src/core/models/shared/catalogos.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistrarSolicitudService {

  constructor(private http: HttpClient) {}

getTiposData(): Observable<Catalogo[]>{
  return this.http.get<Catalogo[]>('./assets/json/290201/tipos.json');
}

getFormasdelcafeData(): Observable<Catalogo[]>{
  return this.http.get<Catalogo[]>('./assets/json/290201/formadelcafe.json');
}

getCalidadData(): Observable<Catalogo[]>{
  return this.http.get<Catalogo[]>('./assets/json/290201/calidad.json');
}

getProcesosData(): Observable<Catalogo[]>{
  return this.http.get<Catalogo[]>('./assets/json/290201/procesos.json');
}

getAduanadesalidaData(): Observable<Catalogo[]>{
  return this.http.get<Catalogo[]>('./assets/json/290201/adunadesalida.json');

}
getEntidadDeProcedenciaData(): Observable<Catalogo[]>{
  return this.http.get<Catalogo[]>('./assets/json/290201/entidaddeprocedencia.json');
}

getCiclocafetaleroData(): Observable<Catalogo[]>{
  return this.http.get<Catalogo[]>('./assets/json/290201/ciclocafetalero.json');
  
}

getEnvasadoenData(): Observable<Catalogo[]>{
  return this.http.get<Catalogo[]>('./assets/json/290201/envasadoen.json');

}

getUtilicoCafeComoData(): Observable<Catalogo[]>{
  return this.http.get<Catalogo[]>('./assets/json/290201/utilizocafecomo.json');
}

getPaisDeImportacionData(): Observable<Catalogo[]>{
  return this.http.get<Catalogo[]>('./assets/json/290201/paisdeimportacion.json');

}

getFraccionArancelariaData(): Observable<Catalogo[]>{
  return this.http.get<Catalogo[]>('./assets/json/290201/fraccionarancelaria.json');
}

getUnidadDeMedidaData(): Observable<Catalogo[]>{
  return this.http.get<Catalogo[]>('./assets/json/290201/unidaddemedida.json');

}
getDollarData(): Observable<Catalogo[]>{
  return this.http.get<Catalogo[]>('./assets/json/290201/dolardata.json');

}

getMediaDeTransporte(): Observable<Catalogo[]>{
  return this.http.get<Catalogo[]>('./assets/json/290201/mediodetransporte.json');

}
}