import { Solicitud31601State, Tramite31601Store } from '../../../estados/tramites/tramite31601.store';
import { ENVIRONMENT } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Solocitud31601Service {
  /**
   * AppConfig es una inyección de dependencias que proporciona la configuración de la aplicación.
   */
  urlServer = ENVIRONMENT.URL_SERVER;
  urlServerCatalogos = ENVIRONMENT.URL_SERVER_JSON_AUXILIAR;

  constructor(private http: HttpClient, private tramite31601Store: Tramite31601Store,) {
    // Lógica de inicialización si es necesario
  }

  actualizarEstadoFormulario(DATOS: Solicitud31601State): void {
    this.tramite31601Store.setAutorizacionIVAIEPS(DATOS.autorizacionIVAIEPS);
    this.tramite31601Store.setRegimen_0(DATOS.regimen_0);
    this.tramite31601Store.setRegimen_1(DATOS.regimen_1);
    this.tramite31601Store.setRegimen_2(DATOS.regimen_2);
    this.tramite31601Store.setRegimen_3(DATOS.regimen_3);
    this.tramite31601Store.setSectorProductivo(DATOS.sectorProductivo);
    this.tramite31601Store.setServicio(DATOS.servicio);
    this.tramite31601Store.setPreOperativo(DATOS.preOperativo);
    this.tramite31601Store.setIndiqueSi(DATOS.indiqueSi);
    this.tramite31601Store.setSenale(DATOS.senale);
    this.tramite31601Store.setEmpPropios(DATOS.empPropios);
    this.tramite31601Store.setBimestre(DATOS.bimestre);
    this.tramite31601Store.setSenaleSi(DATOS.senaleSi);
    this.tramite31601Store.setSeMomento(DATOS.seMomento);
    this.tramite31601Store.setCumplir(DATOS.cumplir);
    this.tramite31601Store.setIndique(DATOS.indique);
    this.tramite31601Store.setEncuentra(DATOS.encuentra);
    this.tramite31601Store.setDelMismo(DATOS.delMismo);
    this.tramite31601Store.setSenaleMomento(DATOS.senaleMomento);
    this.tramite31601Store.setEnCaso(DATOS.enCaso);
    this.tramite31601Store.setComboBimestresIDCSeleccione(DATOS.comboBimestresIDCSeleccione);
    this.tramite31601Store.setIngresar(DATOS.ingresar);
    this.tramite31601Store.setEncuentraSus(DATOS.encuentraSus);
    this.tramite31601Store.setRegistrosQue(DATOS.registrosQue);
    this.tramite31601Store.setRegistrosQue2(DATOS.registrosQue2);
    this.tramite31601Store.setMomentoIngresar(DATOS.momentoIngresar);
    this.tramite31601Store.setIndiqueCuenta(DATOS.indiqueCuenta);
    this.tramite31601Store.setIndiqueCheck(DATOS.indiqueCheck);
    this.tramite31601Store.setNombreDel(DATOS.nombreDel);
    this.tramite31601Store.setLugarDeRadicacion(DATOS.lugarDeRadicacion);
    this.tramite31601Store.setContabilidad(DATOS.contabilidad);
    this.tramite31601Store.setRmfRadio(DATOS.rmfRadio);
    this.tramite31601Store.setVinculacionRegistroCancelado(DATOS.vinculacionRegistroCancelado);
    this.tramite31601Store.setProveedoresListadoSAT(DATOS.proveedoresListadoSAT);
    this.tramite31601Store.setNumeroEmpleados(DATOS.numeroEmpleados);
    this.tramite31601Store.setEmpleadosPropios(DATOS.empleadosPropios);
  }

  getRegistroTomaMuestrasMercanciasData(): Observable<Solicitud31601State> {
    return this.http.get<Solicitud31601State>('assets/json/31601/registro_toma_muestras_mercancias.json');
  }

}
