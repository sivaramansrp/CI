/**
 * @fileoverview Estado `DatosDelSolicituteSeccionStateStore`
 * Este archivo define el estado global para gestionar los datos relacionados con la solicitud,
 * incluyendo información del representante, establecimiento, y propietario.
 */

import { Injectable } from '@angular/core';

import { DatosDeLaProductoModel, PropietarioModel } from '../../models/datos-de-la-solicitud.model';
import { Store, StoreConfig } from '@datorama/akita';

/**
 * @interface DatosDelSolicituteSeccionState
 * Representa la estructura del estado global para los datos de la solicitud.
 */
export interface DatosDelSolicituteSeccionState {
  /**
   * RFC del representante.
   */
  representanteRfc: string;

  /**
   * Nombre del representante.
   */
  representanteNombre: string;

  /**
   * Apellido paterno del representante.
   */
  apellidoPaterno: string;

  /**
   * Apellido materno del representante.
   */
  apellidoMaterno: string;

  /**
   * Denominación o razón social del establecimiento.
   */
  establecimientoDenominacionRazonSocial: string;

  /**
   * Correo electrónico del establecimiento.
   */
  establecimientoCorreoElectronico: string;

  /**
   * Código postal del domicilio del establecimiento.
   */
  establecimientoDomicilioCodigoPostal: string;

  /**
   * Estado del domicilio del establecimiento.
   */
  establecimientoDomicilioEstado: string;

  /**
   * Municipio o alcaldía del domicilio del establecimiento.
   */
  establecimientoMunicipioYAlcaldia: string;

  /**
   * Localidad del domicilio del establecimiento.
   */
  establecimientoDomicilioLocalidad: string;

  /**
   * Colonia del domicilio del establecimiento.
   */
  establecimientoDomicilioColonia: string;

  /**
   * Calle del domicilio del establecimiento.
   */
  establecimientoDomicilioCalle: string;

  /**
   * Lada del domicilio del establecimiento.
   */
  establecimientoDomicilioLada: string;

  /**
   * Teléfono del domicilio del establecimiento.
   */
  establecimientoDomicilioTelefono: string;

  /**
   * RFC del profesional responsable.
   */
  rfcDelProfesionalResponsable: string;

  /**
   * Nombre del profesional responsable.
   */
  nombreDelProfesionalResponsable: string;

  /**
   * Opción seleccionada para información confidencial.
   */
  informacionConfidencialRadio: string;

  /**
   * Lista de datos del propietario.
   */
  propietarioData: PropietarioModel[];


  /**
   * Lista de datos del establecimiento.
   */
  establecimientoData: DatosDeLaProductoModel[];

  /**
   * Identificador genérico.
   */
  ideGenerica1: string;

  /**
   * Observaciones adicionales.
   */
  observaciones: string;

  /**
   * RFC del responsable sanitario del establecimiento.
   */
  establecimientoRFCResponsableSanitario: string;

  /**
   * Razón social del establecimiento.
   */
  establecimientoRazonSocial: string;

  /**
   * Estado del establecimiento.
   */
  establecimientoEstados: string;

  /**
   * Descripción del municipio.
   */
  descripcionMunicipio: string;

  /**
   * Localidad del establecimiento.
   */
  localidad: string;

  /**
   * Colonia del establecimiento.
   */
  colonias: string;

  /**
   * Calle del establecimiento.
   */
  calle: string;

  /**
   * Lada del establecimiento.
   */
  lada: string;

  /**
   * Teléfono del establecimiento.
   */
  telefono: string;

  /**
   * Código SCIAN del establecimiento.
   */
  scian: string;

  /**
   * Colonias del establecimiento.
   */
  establishomentoColonias: string;

  /**
   * Número de licencia sanitaria.
   */
  noLicenciaSanitaria: string;

  /**
   * Checkbox de aviso.
   */
  avisoCheckbox: string;

  /**
   * Licencia sanitaria.
   */
  licenciaSanitaria: string;

  /**
   * Régimen del establecimiento.
   */
  regimen: string;

  /**
   * Aduanas de entrada.
   */
  aduanasEntradas: string;

  /**
   * Checkbox de AIFA.
   */
  aifaCheckbox: string;
/**
 * * Descripción del SCIAN.
 */
  descripcionScian: string;
}

/**
 * @function createInitialState
 * Crea el estado inicial para `DatosDelSolicituteSeccionState`.
 * @returns {DatosDelSolicituteSeccionState} El estado inicial.
 */
export function createInitialState(): DatosDelSolicituteSeccionState {
  return {
    representanteRfc: '',
    representanteNombre: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    establecimientoDenominacionRazonSocial: '',
    establecimientoCorreoElectronico: '',
    establecimientoDomicilioCodigoPostal: '',
    establecimientoDomicilioEstado: '',
    establecimientoMunicipioYAlcaldia: '',
    establecimientoDomicilioLocalidad: '',
    establecimientoDomicilioColonia: '',
    establecimientoDomicilioCalle: '',
    establecimientoDomicilioLada: '',
    establecimientoDomicilioTelefono: '',
    rfcDelProfesionalResponsable: '',
    nombreDelProfesionalResponsable: '',
    informacionConfidencialRadio: '',
    propietarioData: [],
    establecimientoData: [],
     scian: '',
          descripcionScian: '',
     ideGenerica1: '',
          observaciones: '',
          establecimientoRFCResponsableSanitario: '',
          establecimientoRazonSocial:'',
          establishomentoColonias:'',
          establecimientoEstados :'',
          descripcionMunicipio: '',
          localidad :'',
          colonias:'',
          calle: '',
          lada: '',
          telefono:'',
       
          noLicenciaSanitaria: '',
          avisoCheckbox: '',
          licenciaSanitaria: '',
          regimen:'',
          aduanasEntradas: '',
          aifaCheckbox: '',
  };
}

/**
 * @class DatosDelSolicituteSeccionStateStore
 * @description
 * Clase que representa el estado global para los datos de la solicitud.
 * Utiliza Akita para gestionar el estado de manera reactiva.
 */
@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'datosDelSolicitute' })
export class DatosDelSolicituteSeccionStateStore extends Store<DatosDelSolicituteSeccionState> {
  /**
   * Constructor de la clase.
   * Inicializa el estado con los valores predeterminados.
   */
  constructor() {
    super(createInitialState());
  }

 
  /**
   * Actualiza el RFC del representante.
   * @param rfc Nuevo RFC del representante.
   */
  setRepresentanteRfc(rfc: string): void {
    this.update({ representanteRfc: rfc });
  }

  /**
   * Actualiza el nombre del representante.
   * @param nombre Nuevo nombre del representante.
   */
  setRepresentanteNombre(nombre: string): void {
    this.update({ representanteNombre: nombre });
  }

  /**
   * Actualiza los apellidos del representante.
   * @param apellidoPaterno Nuevo apellido paterno.
   * @param apellidoMaterno Nuevo apellido materno.
   */
  setRepresentanteApellidos(apellidoPaterno: string, apellidoMaterno: string): void {
    this.update({ apellidoPaterno, apellidoMaterno });
  }

  /**
   * Actualiza la opción seleccionada de información confidencial.
   * @param informacionConfidencial Nueva opción seleccionada.
   */
  setInformacionConfidencial(informacionConfidencial: string): void {
    this.update({ informacionConfidencialRadio: informacionConfidencial });
  }
}