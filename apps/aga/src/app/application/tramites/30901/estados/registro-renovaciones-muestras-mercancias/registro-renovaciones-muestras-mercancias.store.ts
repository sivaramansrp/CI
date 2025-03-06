import { Injectable } from '@angular/core';
import { RegistroMuestras } from '../../models/registro-muestras-mercancias.model';
import { Store } from '@datorama/akita';
import { StoreConfig } from '@datorama/akita';

/**
 * Crea el estado inicial del registro de muestras de mercancías.
 * 
 * @returns Un objeto `RegistroMuestras` con valores vacíos.
 */
export function crearEstadoInicial(): RegistroMuestras {
  return {
    opcionDeImportador: '',
    tomaMuestraDespacho: '',
    descMotivoFaltaMuestra: '',
    comboFraccionConcatenada: '',
    fraccionConcatenada: '',
    fracciondescripcion: '',
    comboNicos: '',
    nicoDescripcion: '',
    nombreQuimico: '',
    nombreComercial: '',
    numeroCAS: '',
    ideGenerica: '',
    descClobGenerica: '',
  };
}

@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'RegistroRenovacionesMuestrasMercanciasStore', resettable: true })
export class RegistroRenovacionesMuestrasMercanciasStore extends Store<RegistroMuestras> {
  /**
   * Inicializa la tienda con el estado predeterminado.
   */
  constructor() {
    super(crearEstadoInicial());
  }

  /**
   * Actualiza el registro de muestras de mercancías en el estado de la tienda.
   * 
   * @param nuevoRegistro - Nuevo objeto de tipo `RegistroMuestras` con los datos actualizados.
   */
  actualizarRegistro(nuevoRegistro: RegistroMuestras): void {
    this.update(nuevoRegistro);
  }
}
