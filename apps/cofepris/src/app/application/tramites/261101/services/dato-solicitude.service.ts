import { AbstractControl } from '@angular/forms';
import { Domicilio } from '../modelos/domicilio-establecimientos.model';
import { FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Mercancias } from '../modelos/mercancias.model';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})  

export class DatosSolicitudService {


  /**
   * Constructor del servicio.
   * 
   * @param {HttpClient} http - Cliente HTTP para realizar solicitudes.
   */
  constructor(private http: HttpClient) {
    // No se necesita lógica de inicialización adicional.
    
  }


  /**
   * Valida si el campo de un formulario no contiene errores
   * @param {AbstractControl} control  : Control del formulario
   * @param {string} campo  : si el control es un FormGroup
   * @returns {boolean | null} : Retorna true si el campo contiene errores y ha sido tocado, de lo contrario retorna false
   */
  /**
   * Valida si el campo de un formulario no contiene errores
   * @param {AbstractControl} control  : Control del formulario
   * @param {string} campo  : si el control es un FormGroup
   * @returns {boolean | null} : Retorna true si el campo contiene errores y ha sido tocado, de lo contrario retorna false
   */
   static isValid(control: AbstractControl, campo?: string): boolean | null {
    if (control instanceof FormGroup && campo) {
      return control?.controls[campo]?.errors && control?.controls[campo]?.touched;
    }
    return control?.errors && control?.touched;
  }

  getDomicilioData(): Observable<Domicilio[]> {
    return this.http.get<Domicilio[]>('assets/json/261101/domicilio-establecimientos.json');
  }
  
  getMercanciasData(): Observable<Mercancias[]> {
    return this.http.get<Mercancias[]>('assets/json/261101/mercancias.json');
  }
}