import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';

/**
 * Estado del formulario de residuos
 */
export interface EstadoFormularioResiduo {
  formularioDatos: {
    numero: string;
    nombreMateriaPrima: string;
    cantidad: string;
    cantidadLetra: string;
    unidadDeMedida: string;
    fraccionArancelaria: string;
  };
  formularioResiduo: {
    fraccionArancelaria: string;
    nico: string;
    acotacion: string;
    residuoPeligroso: string;
    cantidad: string;
    cantidadLetra: string;
    unidadMedida: string;
    clasificacion: string;
    claveResiduo: string;
    nombre: string;
    descripcion: string;
    creti: string;
    estadoFisico: string;
    tipoContenedor: string;
    capacidad: string;
  };
}

/**
 * Estado inicial
 */
export function crearEstadoInicialFormularioResiduo(): EstadoFormularioResiduo {
  return {
    formularioDatos: {
      numero: '',
      nombreMateriaPrima: '',
      cantidad: '',
      cantidadLetra: '',
      unidadDeMedida: '',
      fraccionArancelaria: '',
    },
    formularioResiduo: {
      fraccionArancelaria: '',
      nico: '',
      acotacion: '',
      residuoPeligroso: '',
      cantidad: '',
      cantidadLetra: '',
      unidadMedida: '',
      clasificacion: '',
      claveResiduo: '',
      nombre: '',
      descripcion: '',
      creti: '',
      estadoFisico: '',
      tipoContenedor: '',
      capacidad: '',
    }
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'formulario-residuo', resettable: true })
export class FormularioResiduoStore extends Store<EstadoFormularioResiduo> {
  constructor() {
    super(crearEstadoInicialFormularioResiduo());
  }

  actualizarFormularioDatos(datos: EstadoFormularioResiduo['formularioDatos']): void {
    this.update(state => ({
      ...state,
      formularioDatos: { ...datos }
    }));
  }

  actualizarFormularioResiduo(residuo: EstadoFormularioResiduo['formularioResiduo']): void {
    this.update(state => ({
      ...state,
      formularioResiduo: { ...residuo }
    }));
  }

  limpiarFormulario(): void {
    this.reset();
  }
}
