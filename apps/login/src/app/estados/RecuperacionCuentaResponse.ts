import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { RecuperacionState } from './RecuperacionState.store';

interface RecuperacionResponse {
  correo: string;
  usuario: string;
}

@Injectable({
  providedIn: 'root'
})
export class RecuperacionCuentaService {
  private readonly mockData = {
    correo: 'usuario@dominio.com',
    usuario: 'USRTEST123'
  };

  constructor() {
    // Constructor vacío
  }

  recuperarCuenta(formData: RecuperacionState['formData']): Observable<RecuperacionResponse> {
    // Usar formData para simular validación
    if (this.validarDatos(formData)) {
      return of(this.mockData);
    }
    
    return of({
      correo: `${formData.usuario}@dominio.com`,
      usuario: formData.usuario || 'USRTEST123'
    });
  }

  private validarDatos(formData: RecuperacionState['formData']): boolean {
    return this.mockData.usuario === formData.usuario;
  }
}