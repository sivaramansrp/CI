import { AbstractControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs';
import { PermisosCancelar } from '../models/permisos-cancelar.model';

@Injectable({
  providedIn: 'root'
})
export class PermisosCancelarService {

  constructor(private http: HttpClient,
  ) { }
  /**
   * Obtiene la lista de permisos para cancelar.
   * @returns {Observable<PermisosCancelar[]>} : Retorna un observable con la lista de permisos a cancelar.
   */
  getPermisosCancelar(): Observable<PermisosCancelar[]> {
    return this.http.get<PermisosCancelar[]>('assets/json/140112/permisos-cancelar.json');
  }



  /**
   * Valida si el campo de un formulario no contiene errores
   * @param {AbstractControl} control  : Control del formulario
   * @param {string} campo  : si el control es un FormGroup
   * @returns {boolean | null} : Retorna true si el campo contiene errores y ha sido tocado, de lo contrario retorna false
   */
  public static isValid(control: AbstractControl, campo?: string): boolean | null {
    if (control instanceof FormGroup && campo) {
      return control?.controls[campo]?.errors && control?.controls[campo]?.touched;
    }
    return control?.errors && control?.touched;
  }
}
