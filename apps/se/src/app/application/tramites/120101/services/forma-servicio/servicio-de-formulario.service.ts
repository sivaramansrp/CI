import { FormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';
import { InsumosTabla } from '../../models/insumos.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Catalogo } from '@libs/shared/data-access-user/src';

@Injectable({
  providedIn: 'root'
})
export class ServicioDeFormularioService {
  
  private forms = new Map<string, FormGroup>();


  constructor( private http: HttpClient) {
    //
  }

  /** Register a new form */
  registerForm(name: string, form: FormGroup): void {
    if (!this.forms.has(name)) {
      this.forms.set(name, form);
    }
  }

  /** Retrieve a form */
  getForm(name: string): FormGroup | undefined {
    return this.forms.get(name);
  }

  /** Set values in a form */
  setFormValue(name: string, value: Record<string, string | object>): void {
    const FORMA = this.getForm(name);
    if (FORMA) {
      FORMA.patchValue(value);
    }
  }

  /** Retrieve the value of a form */
  getFormValue(name: string): Record<string, string | object> | undefined {
    const FORMA = this.getForm(name);
    return FORMA?.value;
  }

  /** Reset a form */
  resetForm(name: string): void {
    const FORMA = this.getForm(name);
    if (FORMA) {
      FORMA.reset();
    }
  }

  /** Check the validity of a form */
  isFormValid(name: string): boolean | undefined {
    const FORMA = this.getForm(name);
    return FORMA?.valid;
  }

  
  obtenerDatosTablaInsumos(): Observable<InsumosTabla[]> {
     return this.http.get<InsumosTabla[]>('assets/json/120101/insumos-tabla.json');
   }  

  obtenerDatosFraccionArancelaria(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('assets/json/120101/pais.json');  
   }

    obtenerDatosEstados(): Observable<Catalogo[]> {
      return this.http.get<Catalogo[]>('assets/json/120101/estados.json');  
    }
   
}
