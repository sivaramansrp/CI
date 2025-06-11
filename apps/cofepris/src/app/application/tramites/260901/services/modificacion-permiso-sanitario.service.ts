import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root',
})

export class ModificacionPermisoSanitario{
     constructor(private http: HttpClient) {
        // Constructor logic can be added here if needed
      }
}