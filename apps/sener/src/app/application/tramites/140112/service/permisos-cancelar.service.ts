import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AbstractControl, FormGroup } from '@angular/forms';
import { PermisosCancelar } from '../models/permisos-cancelar.model';

@Injectable({
  providedIn: 'root'
})
export class PermisosCancelarService {

  constructor(private http: HttpClient,
  ) { }
  getPermisosCancelar() {
    return this.http.get<PermisosCancelar[]>('assets/json/140112/permisos-cancelar.json');
  }



  /**
   * Valida si el campo de un formulario no contiene errores
   * @param {AbstractControl} control  : Control del formulario
   * @param {string} campo  : si el control es un FormGroup
   * @returns {boolean | null} : Retorna true si el campo contiene errores y ha sido tocado, de lo contrario retorna false
   */
  public isValid(control: AbstractControl, campo?: string): boolean | null {
    if (control instanceof FormGroup && campo) {
      return control?.controls[campo]?.errors && control?.controls[campo]?.touched;
    }
    return control?.errors && control?.touched;
  }
}
