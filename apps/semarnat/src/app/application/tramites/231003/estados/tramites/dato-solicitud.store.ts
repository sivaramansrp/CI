import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';

/**
 * Estado de los formularios para el trámite de reciclaje.
 */
export interface EstadoFormularioReciclaje {
  solicitudForm: {
    numeroRegistroAmbiental: string;
    descripcionGenerica1: string;
    numeroProgramaImmex: string;
  };
  empresaReciclaje: {
    requiereEmpresa: string;
    nombreEmpresa: string;
    representanteLegal: string;
    telefono: string;
    correoElectronico: string;
  };
  lugarReciclaje: {
    reciclajeInstalaciones: string;
    lugarReciclaje: string;
    numeroAutorizacionEmpresaReciclaje: string;
  };
}

/**
 * Función para crear el estado inicial de los formularios.
 */
export function crearEstadoInicialFormularioReciclaje(): EstadoFormularioReciclaje {
  return {
    solicitudForm: {
      numeroRegistroAmbiental: '',
      descripcionGenerica1: '',
      numeroProgramaImmex: '',
    },
    empresaReciclaje: {
      requiereEmpresa: 'Si',
      nombreEmpresa: '',
      representanteLegal: '',
      telefono: '',
      correoElectronico: '',
    },
    lugarReciclaje: {
      reciclajeInstalaciones: 'Si',
      lugarReciclaje: '',
      numeroAutorizacionEmpresaReciclaje: '',
    }
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'formulario-reciclaje', resettable: true })
export class FormularioReciclajeStore extends Store<EstadoFormularioReciclaje> {
  constructor() {
    super(crearEstadoInicialFormularioReciclaje());
  }

  actualizarSolicitudForm(valores: EstadoFormularioReciclaje['solicitudForm']): void {
    this.update(state => ({
      ...state,
      solicitudForm: { ...valores }
    }));
  }

  actualizarEmpresaReciclaje(valores: EstadoFormularioReciclaje['empresaReciclaje']): void {
    this.update(state => ({
      ...state,
      empresaReciclaje: { ...valores }
    }));
  }

  actualizarLugarReciclaje(valores: EstadoFormularioReciclaje['lugarReciclaje']): void {
    this.update(state => ({
      ...state,
      lugarReciclaje: { ...valores }
    }));
  }

  limpiarFormulario(): void {
    this.reset();
  }
}
