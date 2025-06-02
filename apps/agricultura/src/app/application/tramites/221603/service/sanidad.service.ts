import { Catalogo, RespuestaCatalogos } from '@libs/shared/data-access-user/src';
import { Destinatario, Exportador, FormularioDatos, Mercancia } from '../enum/sanidad.enum';
import { Solicitud221603State, Tramite221603Store } from '../estados/tramite221603.store';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
/**
 * Servicio que gestiona las operaciones relacionadas con la sanidad en el trámite 221603.
 * Proporciona métodos para inicializar y obtener datos de catálogos, mercancías, exportadores, destinatarios,
 * y otros elementos necesarios para el trámite.
 */
export class SanidadService {

  /**
   * Catálogo de regímenes aduaneros.
   */
  regimen: Catalogo[] = [];

  /**
   * Lista de mercancías asociadas al trámite.
   */
  mercancia: Mercancia[] = [];

  /**
   * Catálogo de medios de transporte.
   */
  medio: Catalogo[] = [];

  /**
   * Catálogo de verificaciones disponibles.
   */
  verificacion: Catalogo[] = [];

  /**
   * Lista de exportadores asociados al trámite.
   */
  exportador: Exportador[] = [];

  /**
   * Lista de destinatarios asociados al trámite.
   */
  destinatario: Destinatario[] = [];

  /**
   * Catálogo de bancos disponibles para el pago de derechos.
   */
  banco: Catalogo[] = [];

  /**
   * Catálogo de justificaciones disponibles.
   */
  justificacionCatalogo: Catalogo[] = [];

  /**
   * Constructor del servicio.
   * Inyecta el cliente HTTP para realizar solicitudes a los catálogos y datos necesarios.
   * http Cliente HTTP para realizar solicitudes.
   */
  constructor(private http: HttpClient, private tramite221603Store: Tramite221603Store) { }

  /**
   * Inicializa los datos del catálogo de regímenes aduaneros.
   */
  public inicializaCatalogosRegimen(): void {
    this.obtenerRespuestaPorUrl(this, 'regimen', '/221603/regimen.json');
  }

  /**
   * Inicializa los datos de las mercancías asociadas al trámite.
   */
  public inicializaDatosMercancia(): void {
    this.obtenerRespuestaPorUrl(this, 'mercancia', '/221603/mercancia.json');
  }

  /**
   * Inicializa los datos de los catálogos relacionados con la movilización.
   * Incluye medios de transporte y verificaciones.
   */
  public inicializaMovilizacionDatosCatalogos(): void {
    this.obtenerRespuestaPorUrl(this, 'medio', '/221603/medio.json');
    this.obtenerRespuestaPorUrl(this, 'verificacion', '/221603/verificacion.json');
  }

  /**
   * Inicializa los datos de los exportadores asociados al trámite.
   */
  public inicializaDatosExportador(): void {
    this.obtenerRespuestaPorUrl(this, 'exportador', '/221603/exportador.json');
  }

  /**
   * Inicializa los datos de los destinatarios asociados al trámite.
   */
  public inicializaDatosDestinatario(): void {
    this.obtenerRespuestaPorUrl(this, 'destinatario', '/221603/destinatario.json');
  }

  /**
   * Obtiene los datos del formulario relacionados con la solicitud.
   * Retorna un observable con los datos del formulario.
   */
  public obtenerFormularioDatos(): Observable<FormularioDatos> {
    return this.http.get<FormularioDatos>('assets/json/221603/formularioDatos.json');
  }

  /**
   * Inicializa los datos de los catálogos relacionados con el pago de derechos.
   * Incluye bancos y justificaciones.
   */
  public inicializaPagoDeDerechosDatosCatalogos(): void {
    this.obtenerRespuestaPorUrl(this, 'banco', '/221603/banco.json');
    this.obtenerRespuestaPorUrl(this, 'justificacionCatalogo', '/221603/justificacion.json');
  }

  public getData(): Observable<Solicitud221603State>{
    return this.http.get<Solicitud221603State>('assets/json/221603/solicitud.json');
  }

 public actualizarEstadoFormulario(resp: Solicitud221603State): void {
    this.tramite221603Store.setJustificacion(resp.justificacion)
    this.tramite221603Store.setJustificacionDescription(resp.justificacionDescription)
    this.tramite221603Store.setAduana(resp.aduana)
    this.tramite221603Store.setOficina(resp.oficina)
    this.tramite221603Store.setPunto(resp.punto)
    this.tramite221603Store.setGuia(resp.guia)
    this.tramite221603Store.setRegimen(resp.regimen)
    this.tramite221603Store.setCarro(resp.carro)
    this.tramite221603Store.setMedio(resp.medio)
    this.tramite221603Store.setTransporte(resp.transporte)
    this.tramite221603Store.setExentoDePago(resp.exento)
    this.tramite221603Store.setClave(resp.clave)
    this.tramite221603Store.setDependencia(resp.dependencia)
    this.tramite221603Store.setBanco(resp.banco)
    this.tramite221603Store.setLlave(resp.llave)
    this.tramite221603Store.setFecha(resp.fecha)
    this.tramite221603Store.setImporte(resp.importe)
 }

  /**
   * Método genérico para obtener datos desde una URL y asignarlos a una variable del servicio.
   * self Instancia del servicio donde se almacenarán los datos.
   * variable Nombre de la variable donde se asignarán los datos obtenidos.
   * url URL desde donde se obtendrán los datos.
   */
  obtenerRespuestaPorUrl(
    self: SanidadService,
    variable: keyof SanidadService,
    url: string
  ): void {
    if (self && variable && url) {
      this.http.get<RespuestaCatalogos>(`assets/json${url}`).subscribe((resp): void => {
        (self[variable] as Catalogo[]) = resp?.code === 200 && resp.data ? resp.data : [];
      });
    }
  }
}