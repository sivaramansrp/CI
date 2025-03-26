import { BehaviorSubject, Observable, of } from 'rxjs';
import { Tramite40102Store } from './tramite40102.store';
import { Injectable } from '@angular/core';
import {
  DatosDelVehículo,
  DatosDelVehículoPaisEmisor,
  VehiculoVEHs,
  VehiculoColor,
  Emisor2daPlaca,
  TipoVehicleTerrestra,
  ColorCatalogo,
  PaisCatalogo,
  ClasifiRegimen,
} from 'libs/shared/data-access-user/src/core/models/40102/transportista-terrestre.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class Tramite40102Service {
  private urlServer = 'https://dev.v30.ultrasist.net/api/json-auxiliar';
  private choferesListSubject = new BehaviorSubject<any[]>([]);
  choferesList$ = this.choferesListSubject.asObservable();

  constructor(
    private tramite40102Store: Tramite40102Store,
    private http: HttpClient
  ) {
    const STORED_DATA = localStorage.getItem('choferesList');
    if (STORED_DATA) {
      this.choferesListSubject.next(JSON.parse(STORED_DATA));
    }
  }

  addChofer(nuevoMiembro: any, isExtranjero: boolean = false) {
    if (!nuevoMiembro) return;
    const ALMACENAMIENTO_KEY = isExtranjero
      ? 'choferesextranjeroList'
      : 'choferesList';
    const STORED_DATA = localStorage.getItem(ALMACENAMIENTO_KEY);
    let choferArray: any[] = STORED_DATA ? JSON.parse(STORED_DATA) : [];
    choferArray.push(nuevoMiembro);
    localStorage.setItem(ALMACENAMIENTO_KEY, JSON.stringify(choferArray));

    // Actualizar tienda Akita
    this.tramite40102Store.update((state) => ({
      ...state,
      choferesextranjero: isExtranjero ? choferArray : state.choferesextranjero,
      choferes: !isExtranjero ? choferArray : state.choferes,
    }));

    if (isExtranjero) {
      this.choferesListSubject.next(choferArray);
    }
  }
  getClasifiRegimen(): Observable<ClasifiRegimen[]> {
    return this.http.get<DatosDelVehículo[]>(
      './assets/json/40102/clasifi-regimen.json'
    );
  }
  getVehiculoColor(): Observable<VehiculoColor[]> {
    return this.http.get<VehiculoColor[]>(
      './assets/json/40102/vehiculo-color.json'
    );
  }
  getVehiculoVEH(): Observable<VehiculoVEHs[]> {
    return this.http.get<VehiculoVEHs[]>(
      './assets/json/40102/vehiculo-veh.json'
    );
  }
  getPaisEmisor2daPlaca(): Observable<Emisor2daPlaca[]> {
    return this.http.get<Emisor2daPlaca[]>(
      './assets/json/40102/pais-emisor-2da-placa.json'
    );
  }

  getTipoVehiculoArrastre(): Observable<TipoVehicleTerrestra[]> {
    return this.http.get<TipoVehicleTerrestra[]>(
      './assets/json/40102/tipo-vehiculo-arrestre.json'
    );
  }

  getColorCatalogo(): Observable<ColorCatalogo[]> {
    return this.http.get<ColorCatalogo[]>('./assets/json/40102/color-catalogo.json');
  }

  getPaisCatalogo(): Observable<PaisCatalogo[]> {
    return this.http.get<PaisCatalogo[]>('./assets/json/40102/pais-catalogo.json');
  }

  getChoferNacionalData(): Observable<any> {
    return this.http.get<any>(this.urlServer);
  }

  getEstados(): Observable<any[]> {
    return this.http.get<any[]>(`${this.urlServer}/estados`);
  }
  getMunicipios(claveEstado: string): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.urlServer}/municipios?estado=${claveEstado}`
    );
  }

  getColonias(claveMunicipio: string): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.urlServer}/colonias?municipio=${claveMunicipio}`
    );
  }
}
