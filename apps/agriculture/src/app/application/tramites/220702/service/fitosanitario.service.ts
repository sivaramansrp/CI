
import { ApiResponseDos,CertificadosResponse ,DestinoInfoDatos,ExportadorInfoDatos,InspeccionApiResponse,MercanciaDatosDos, PagoDeDerechosApiResponse,PagoDeDerechosRevisionResponse} from '../modelos/acuicola.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RespuestaCatalogos } from '@libs/shared/data-access-user/src';
import { map } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FitosanitarioService {

  /**
   * URL base para acceder a los archivos JSON que contienen los datos.
   */
  private apiUrl = 'assets/json/220702/';

  /**
   * Constructor del servicio.
   * 
   * @param http - Servicio de Angular `HttpClient` para realizar solicitudes HTTP.
   */
  constructor(
    private http: HttpClient,
    
  ) {
    // No se necesita lógica de inicialización adicional
   }

  /**
   * Obtiene los datos de los certificados.
   * 
   * @returns Un `Observable` que emite un objeto de tipo `DatosDelTramite`.
   */
  obtenerDatosCertificados(): Observable<CertificadosResponse> {
    return this.http.get<CertificadosResponse>(`${this.apiUrl}datos-certificados.json`).pipe(
      map((res) => {
        return res;
      })
    );
  }

  getDatosMercania(): Observable<MercanciaDatosDos> {
    return this.http.get<MercanciaDatosDos>(`${this.apiUrl}mercania-servico.json`).pipe(
      map((res) => {
        return res;
      })
    );
  }

  getDatosDeLaMercancia(): Observable<ApiResponseDos> {
    return this.http.get<ApiResponseDos>(`${this.apiUrl}datos-de-la-mercancia.json`).pipe(
      map((res) => {
        return res;
      })
    );
  }

  getDatosExportador(): Observable<ExportadorInfoDatos> {
    return this.http.get<ExportadorInfoDatos>(`${this.apiUrl}exportador.json`).pipe(
      map((res) => {
        return res;
      })
    );
  }

  getDatosDestinatarioInfo(): Observable<DestinoInfoDatos> {
    return this.http.get<DestinoInfoDatos>(`${this.apiUrl}destino-datos.json`).pipe(
      map((res) => {
        return res;
      })
    );
  }

  /**
   * Obtiene las horas de inspección disponibles.
   * 
   * @returns Un `Observable` que emite un objeto de tipo `RespuestaCatalogos`.
   */
  getHoraDeInspeccion(): Observable<RespuestaCatalogos> {
    return this.http.get<RespuestaCatalogos>(`${this.apiUrl}hora-de-inspeccion.json`).pipe(
      map(response => {
        return response;
      })
    );
  }

  /**
   * Obtiene las aduanas de ingreso disponibles.
   * 
   * @returns Un `Observable` que emite un objeto de tipo `RespuestaCatalogos`.
   */
  getAduanaDeIngreso(): Observable<RespuestaCatalogos> {
    return this.http.get<RespuestaCatalogos>(`${this.apiUrl}aduana-de-ingreso.json`).pipe(
      map(response => {
        return response;
      })
    );
  }

  /**
   * Obtiene las oficinas de inspección disponibles.
   * 
   * @returns Un `Observable` que emite un objeto de tipo `RespuestaCatalogos`.
   */
  getOficinaDeInspeccion(): Observable<RespuestaCatalogos> {
    return this.http.get<RespuestaCatalogos>(`${this.apiUrl}oficina-de-inspeccion.json`).pipe(
      map(response => {
        return response;
      })
    );
  }

  /**
   * Obtiene los puntos de inspección disponibles.
   * 
   * @returns Un `Observable` que emite un objeto de tipo `RespuestaCatalogos`.
   */
  getPuntoDeInspeccion(): Observable<RespuestaCatalogos> {
    return this.http.get<RespuestaCatalogos>(`${this.apiUrl}punto-de-inspeccion.json`).pipe(
      map(response => {
        return response;
      })
    );
  }

  /**
   * Obtiene los datos del responsable de inspección.
   * 
   * @returns Un `Observable` que emite un objeto de tipo `ResponsableInspección`.
   */
  obtenerResponsableDatos(): Observable<InspeccionApiResponse> {
    return this.http.get<InspeccionApiResponse>(`${this.apiUrl}responsable-inspeccion.json`).pipe(
      map((res) => {
        return res;
      })
    );
  }

  /**
   * Obtiene los tipos de contenedores disponibles.
   * 
   * @returns Un `Observable` que emite un objeto de tipo `RespuestaCatalogos`.
   */
  getTipoContenedor(): Observable<RespuestaCatalogos> {
    return this.http.get<RespuestaCatalogos>(`${this.apiUrl}tipo-contenedor.json`).pipe(
      map(response => {
        return response;
      })
    );
  }

  /**
   * Obtiene los medios de transporte disponibles.
   * 
   * @returns Un `Observable` que emite un objeto de tipo `RespuestaCatalogos`.
   */
  getMedioDeTransporte(): Observable<RespuestaCatalogos> {
    return this.http.get<RespuestaCatalogos>(`${this.apiUrl}medio-de-transporte.json`).pipe(
      map(response => {
        return response;
      })
    );
  }

  /**
   * Obtiene los datos de los bancos disponibles.
   * 
   * @returns Un `Observable` que emite un objeto de tipo `RespuestaCatalogos`.
   */
  getBancoDatos(): Observable<RespuestaCatalogos> {
    return this.http.get<RespuestaCatalogos>(`${this.apiUrl}banco-datos.json`).pipe(
      map(response => {
        return response;
      })
    );
  }

  /**
   * Obtiene los datos de pago de derechos.
   * 
   * @returns Un `Observable` que emite un objeto de tipo `PagoDeDerechos`.
   */
  pagoDeCargarDatos(): Observable<PagoDeDerechosApiResponse> {
    return this.http.get<PagoDeDerechosApiResponse>(`${this.apiUrl}pago-de-derechos.json`).pipe(
      map(res => {
        return res;
      })
    );
  }

  /**
   * Obtiene los datos de revisión de pago de derechos.
   * 
   * @returns Un `Observable` que emite un objeto de tipo `PagoDeDerechosRevision`.
   */
  getPagoDerechosRevision(): Observable<PagoDeDerechosRevisionResponse> {
    return this.http.get<PagoDeDerechosRevisionResponse>(`${this.apiUrl}pago-de-derechos-revision.json`).pipe(
      map((res) => {
        return res;
      })
    );
  }

  /**
   * Obtiene los regímenes a los que se puede destinar.
   * 
   * @returns Un `Observable` que emite un objeto de tipo `RespuestaCatalogos`.
   */
  getRegimenAlQue(): Observable<RespuestaCatalogos> {
    return this.http.get<RespuestaCatalogos>(`${this.apiUrl}regimen-al-que-se-destinara.json`).pipe(
      map(response => {
        return response;
      })
    );
  }

  /**
   * Obtiene los datos para la movilización.
   * 
   * @returns Un `Observable` que emite un objeto de tipo `RespuestaCatalogos`.
   */
  getDatosParaMovilizacion(): Observable<RespuestaCatalogos> {
    return this.http.get<RespuestaCatalogos>(`${this.apiUrl}datos-para-movilizacio.json`).pipe(
      map(response => {
        return response;
      })
    );
  }

  /**
   * Obtiene los puntos de verificación disponibles.
   * 
   * @returns Un `Observable` que emite un objeto de tipo `RespuestaCatalogos`.
   */
  getPuntoDeVerificacion(): Observable<RespuestaCatalogos> {
    return this.http.get<RespuestaCatalogos>(`${this.apiUrl}punto-de-verificacion.json`).pipe(
      map(response => {
        return response;
      })
    );
  }

}
