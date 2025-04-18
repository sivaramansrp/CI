import { CatalogosSelect } from '@libs/shared/data-access-user/src';
import { DatosGeneralesDeLaSolicitud, DatosGeneralesDeLaSolicitudCatologo, DatosPorGarantia, Domicilios, SeccionSociosIC, SubContratistas, TipoDeInversion } from '../models/solicitud.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ModificacionDenominacionRazonSocial } from '../models/solicitud.model';
import { Observable } from 'rxjs';
import { RecibirNotificaciones } from '../models/solicitud.model';

@Injectable({
  providedIn: 'root',
})
export class SolicitudService {
  constructor(private http: HttpClient) {
    // Lógica del constructor aquí
  }

  conseguirRecibirNotificaciones(): Observable<RecibirNotificaciones[]> {
    return this.http.get<RecibirNotificaciones[]>(
      'assets/json/31301/recibir-notificaciones.json'
    );
  }

  conseguirModificacionDenominacionRazonSocial(): Observable<ModificacionDenominacionRazonSocial> {
    return this.http.get<ModificacionDenominacionRazonSocial>(
      'assets/json/31301/modificacion-denominacion-razon-social.json'
    );
  }

  conseguirNombreInstitucionCatalogo(): Observable<CatalogosSelect> {
    return this.http.get<CatalogosSelect>(
      'assets/json/31301/nombre-institucion-catalogo.json'
    );
  }

  conseguirDatosPorGarantia(): Observable<DatosPorGarantia> {
    return this.http.get<DatosPorGarantia>(
      'assets/json/31301/datos-por-garantia.json'
    );
  }

  conseguirDatosGeneralesOpcionDeRadio(): Observable<DatosGeneralesDeLaSolicitud> {
    return this.http.get<DatosGeneralesDeLaSolicitud>(
      'assets/json/31301/datos-generales-de-la-solicitud-radio-option.json'
    );
  }

  conseguirDatosGeneralesCatologo(): Observable<DatosGeneralesDeLaSolicitudCatologo> {
    return this.http.get<DatosGeneralesDeLaSolicitudCatologo>(
      'assets/json/31301/datos-generales-de-la-solicitud-catologo.json'
    );
  }

  conseguirListaDeSubcontratistas(): Observable<SubContratistas[]> {
    return this.http.get<SubContratistas[]>(
      'assets/json/31301/lista-de-subcontratistas.json'
    );
  }

  conseguirRegimenAduanero(): Observable<string[]> {
    return this.http.get<string[]>(
      'assets/json/31301/regimen-aduanero.json'
    );
  }
  
  conseguirMiembrosDeLaEmpresa(): Observable<SeccionSociosIC[]> {
    return this.http.get<SeccionSociosIC[]>(
      'assets/json/31301/miembros-de-la-empresa.json'
    );
  }

  conseguirTipoDeInversionDatos(): Observable<TipoDeInversion[]> {
    return this.http.get<TipoDeInversion[]>(
      'assets/json/31301/tipo-de-inversion-datos.json'
    );
  }

  conseguirDomicilios(): Observable<Domicilios[]> {
    return this.http.get<Domicilios[]>(
      'assets/json/31301/domicilios.json'
    );
  } 
}
