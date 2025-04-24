import { Catalogo, RespuestaCatalogos } from '@libs/shared/data-access-user/src';
import { Injectable, OnDestroy } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { InformaciondeProcedencia } from '../enums/informacion-de-procedencia.enum';
import { TramiteAsociados } from '../../../shared/models/tramite-asociados.model';

@Injectable({
  providedIn: 'root'
})
export class SolicitudModificacionPermisoInternacionService implements OnDestroy {
 /**
   * Subject utilizado para manejar la destrucción de suscripciones.
   */
  private destroyNotifier$: Subject<void> = new Subject();
 /**
   * Lista de bancos disponibles para el pago de derechos.
   */
 banco: Catalogo[] = [];

 /**
  * Constructor del servicio.
  * Param http Cliente HTTP para realizar solicitudes a servicios externos.
  */
 constructor(private http: HttpClient) {
   // Constructor
 }

 /**
  * Obtiene la lista de destinatarios desde un archivo JSON.
  * Retorna un observable con la lista de destinatarios.
  */
 obtenerDestinatarioListo(): Observable<InformaciondeProcedencia[]> {
   return this.http
     .get<InformaciondeProcedencia[]>('../../../assets/json/261402/destinatario-mock.json')
     .pipe();
 }

 /**
  * Inicializa los datos de los catálogos necesarios para el pago de derechos.
  * Realiza una solicitud para obtener la lista de bancos.
  */
 inicializaPagoDeDerechosDatosCatalogos(): void {
   this.obtenerRespuestaPorUrl(this, 'banco', '/261402/banco.json');
 }

 /**
  * Realiza una solicitud HTTP para obtener datos desde una URL específica
  * y los asigna a una variable del servicio.
  * Param self Referencia al servicio actual.
  * Param variable Nombre de la variable donde se almacenarán los datos.
  * Param url URL del archivo JSON que contiene los datos.
  */
 obtenerRespuestaPorUrl(
   self: SolicitudModificacionPermisoInternacionService,
   variable: keyof SolicitudModificacionPermisoInternacionService,
   url: string
 ): void {
   if (self && variable && url) {
     this.http
       .get<RespuestaCatalogos>(`assets/json${url}`).pipe(takeUntil(this.destroyNotifier$))
       .subscribe((resp): void => {
         (self[variable] as Catalogo[]) =
           resp?.code === 200 && resp.data ? resp.data : [];
       });
   }
 }

 /**
  * Obtiene la lista de trámites asociados desde un archivo JSON.
  * Retorna un observable con la lista de trámites asociados.
  */
 obtenerTramitesAsociados(): Observable<TramiteAsociados[]> {
   return this.http.get<TramiteAsociados[]>(
     'assets/json/261402/tramite-asociados.json'
   );
 }

   /**
   * Método del ciclo de vida de Angular que se ejecuta al destruir el componente.
   * Completa el Subject para evitar fugas de memoria.
   */
   ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
