import { BehaviorSubject, Observable, of } from 'rxjs';
import { ClasifiRegimen } from '@libs/shared/data-access-user/src/core/models/40101/transportista-terrestre.model';
import { ColorCatalogo } from '@libs/shared/data-access-user/src/core/models/40101/transportista-terrestre.model';
import { DatosDelVehículo } from '@libs/shared/data-access-user/src/core/models/40101/transportista-terrestre.model';
import { Emisor2daPlaca } from '@libs/shared/data-access-user/src/core/models/40101/transportista-terrestre.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PaisCatalogo } from '@libs/shared/data-access-user/src/core/models/40101/transportista-terrestre.model';
import { TipoVehicleTerrestra } from '@libs/shared/data-access-user/src/core/models/40101/transportista-terrestre.model';
import { Tramite40101Store } from './tramite40101.store';
import { VehiculoColor } from '@libs/shared/data-access-user/src/core/models/40101/transportista-terrestre.model';
import { VehiculoVEHs } from '@libs/shared/data-access-user/src/core/models/40101/transportista-terrestre.model';

@Injectable({
  providedIn: 'root',
})
export class Tramite40101Service {
  private urlServer = 'https://dev.v30.ultrasist.net/api/json-auxiliar';
  private choferesListSubject = new BehaviorSubject<any[]>([]);
  choferesList$ = this.choferesListSubject.asObservable();

  constructor(
    private tramite40101Store: Tramite40101Store,
    private http: HttpClient
  ) {
    const STORED_DATA = localStorage.getItem('choferesList');
    if (STORED_DATA) {
      this.choferesListSubject.next(JSON.parse(STORED_DATA));
    }
  }

  addChofer(nuevoMiembro: any, isExtranjero: boolean = false):void {
    if (!nuevoMiembro) return;
    const ALMACENAMIENTO_KEY = isExtranjero
      ? 'choferesextranjeroList'
      : 'choferesList';
    const STORED_DATA = localStorage.getItem(ALMACENAMIENTO_KEY);
    let choferArray: any[] = STORED_DATA ? JSON.parse(STORED_DATA) : [];
    choferArray.push(nuevoMiembro);
    localStorage.setItem(ALMACENAMIENTO_KEY, JSON.stringify(choferArray));
    this.tramite40101Store.update((state) => ({
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
      './assets/json/40101/clasifi-regimen.json'
    );
  }
  getVehiculoColor(): Observable<VehiculoColor[]> {
    return this.http.get<VehiculoColor[]>(
      './assets/json/40101/vehiculo-color.json'
    );
  }
  getVehiculoVEH(): Observable<VehiculoVEHs[]> {
    return this.http.get<VehiculoVEHs[]>(
      './assets/json/40101/vehiculo-veh.json'
    );
  }
  getPaisEmisor2daPlaca(): Observable<Emisor2daPlaca[]> {
    return this.http.get<Emisor2daPlaca[]>(
      './assets/json/40101/pais-emisor-2da-placa.json'
    );
  }

  getTipoVehiculoArrastre(): Observable<TipoVehicleTerrestra[]> {
    return this.http.get<TipoVehicleTerrestra[]>(
      './assets/json/40101/tipo-vehiculo-arrestre.json'
    );
  }

  getColorCatalogo(): Observable<ColorCatalogo[]> {
    return this.http.get<ColorCatalogo[]>(
      './assets/json/40101/color-catalogo.json'
    );
  }

  getPaisCatalogo(): Observable<PaisCatalogo[]> {
    return this.http.get<PaisCatalogo[]>(
      './assets/json/40101/pais-catalogo.json'
    );
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
