import { Observable,catchError, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PersonaFusionEscisionDTO } from '../models/avisomodify.model';
import { catalogoResponse } from '@ng-mf/data-access-user';

@Injectable({
  providedIn: 'any'
})
export class AvisoModifyService {

  constructor(private http: HttpClient) {
    // El constructor se utiliza para la inyección de dependencias.
  }
  private jsonUrl = 'assets/json/32301';
  private fileName = 'tipoDeAviso.json'
   private personaFusionEscision = 'personaFusionEscision.json'
   private selectRangoDias = 'selectRangoDias.json'

    getAvisoModify(): Observable<catalogoResponse> {
        return this.http.get<catalogoResponse>(`${this.jsonUrl}/${this.fileName}`).pipe(
          catchError(error => {
            console.error('Error fetching data from:', this.jsonUrl, error);
            return of({ id: 0, descripcion: '', code: 0, data: [], message: 'Default response due to error' } as unknown as catalogoResponse);
          })
        );
      }

      cargarDatosPersonaFusion():Observable<PersonaFusionEscisionDTO> {
        return this.http.get<PersonaFusionEscisionDTO>(`${this.jsonUrl}/${this.personaFusionEscision}`).pipe(
          catchError(error => {
            console.error('Error fetching data from:', this.jsonUrl, error);
            return of({ id: 0, descripcion: '', code: 0, data: [], message: 'Default response due to error' } as unknown as PersonaFusionEscisionDTO);
          })
        );
      }
      
      getSelectRangoDias(): Observable<string[]> {
        return this.http.get<string[]>(`${this.jsonUrl}/${this.selectRangoDias}`);
      }
  
}
