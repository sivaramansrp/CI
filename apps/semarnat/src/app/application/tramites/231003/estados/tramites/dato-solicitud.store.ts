import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';

/**
 * Estado de los formularios: solicitud, empresa reciclaje y lugar reciclaje.
 */
export interface EstadoFormularioSolicitud {
  solicitud: {
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
 * Estado inicial del formulario.
 */
export function crearEstadoInicialFormulario(): EstadoFormularioSolicitud {
  return {
    solicitud: {
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
@StoreConfig({ name: 'formulario-solicitud', resettable: true })
export class FormularioSolicitudStore extends Store<EstadoFormularioSolicitud> {
  constructor() {
    super(crearEstadoInicialFormulario());
  }

  public establecerSolicitud(solicitud: EstadoFormularioSolicitud['solicitud']): void {
    this.update({ solicitud });
  }

  public establecerEmpresaReciclaje(empresaReciclaje: EstadoFormularioSolicitud['empresaReciclaje']): void {
    this.update({ empresaReciclaje });
  }

  public establecerLugarReciclaje(lugarReciclaje: EstadoFormularioSolicitud['lugarReciclaje']): void {
    this.update({ lugarReciclaje });
  }

  public limpiarFormulario(): void {
    this.reset();
  }
}
