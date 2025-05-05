import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';

/**
 * Interfaz que define el estado de la solicitud 120603.
 * Contiene todas las propiedades necesarias para almacenar la información
 * relacionada con la solicitud.
 */
export interface Solicitud120603State {
    /** Estado actual de la solicitud */
    estado: string,
    /** Representación federal asociada a la solicitud */
    representacionFederal: string,
    /** Tipo de empresa (puede ser nulo) */
    tipoEmpresa: string | null,
    /** Especificación adicional */
    especifique: string,
    /** Actividad económica preponderante */
    actividadEconomicaPreponderante: string,
    /** Descripción de la solicitud */
    descripcion: string,
    /** País relacionado con la solicitud */
    pais: string,
    /** Código postal del domicilio */
    codigoPostal: string,
    /** Estado del domicilio */
    estadoDomicilio: string,
    /** Municipio o alcaldía del domicilio */
    municipioAlcaldia: string,
    /** Localidad del domicilio */
    localidad: string,
    /** Colonia del domicilio */
    colonia: string,
    /** Calle del domicilio */
    calle: string,
    /** Número exterior del domicilio */
    numeroExterior: string,
    /** Número interior del domicilio */
    numeroInterior: string,
    /** Lada telefónica */
    lada: string,
    /** Teléfono de contacto */
    telefono: string,
    /** Nacionalidad del solicitante */
    nacionalidad: string,
    /** Tipo de persona (física o moral) */
    tipoDePersona: string,
    /** Identificación fiscal (Tax ID) */
    taxId: string,
    /** Razón social de la empresa */
    razonSocial: string,
    /** País relacionado con los datos adicionales */
    datosPais: string | null,
    /** Código postal relacionado con los datos adicionales */
    datosCodigoPostal: string,
    /** Estado relacionado con los datos adicionales */
    datosEstado: string,
    /** Correo electrónico de contacto */
    correoElectronico: string,
    /** Registro federal del contribuyente */
    registroFederal: string,
    /** Nombre del solicitante */
    nombre: string,
    /** Apellido paterno del solicitante */
    apellidoPaterno: string,
    /** Apellido materno del solicitante */
    apellidoMaterno: string,
}

export function createInitialState(): Solicitud120603State {
    return {
        /** Estado actual de la solicitud */
        estado: '',
        /** Representación federal asociada a la solicitud */
        representacionFederal: '',
        /** Tipo de empresa (puede ser nulo) */
        tipoEmpresa: '',
        /** Especificación adicional */
        especifique: '',
        /** Actividad económica preponderante */
        actividadEconomicaPreponderante: '',
        /** Descripción de la solicitud */
        descripcion: '',
        /** País relacionado con la solicitud */
        pais: '',
        /** Código postal del domicilio */
        codigoPostal: '',
        /** Estado del domicilio */
        estadoDomicilio: '',
        /** Municipio o alcaldía del domicilio */
        municipioAlcaldia: '',
        /** Localidad del domicilio */
        localidad: '',
        /** Colonia del domicilio */
        colonia: '',
        /** Calle del domicilio */
        calle: '',
        /** Número exterior del domicilio */
        numeroExterior: '',
        /** Número interior del domicilio */
        numeroInterior: '',
        /** Lada telefónica */
        lada: '',
        /** Teléfono de contacto */
        telefono: '',
        /** Nacionalidad del solicitante */
        nacionalidad: '',
        /** Tipo de persona (física o moral) */
        tipoDePersona: '',
        /** Identificación fiscal (Tax ID) */
        taxId: '',
        /** Razón social de la empresa */
        razonSocial: '',
        /** País relacionado con los datos adicionales */
        datosPais: '',
        /** Código postal relacionado con los datos adicionales */
        datosCodigoPostal: '',
        /** Estado relacionado con los datos adicionales */
        datosEstado: '',
        /** Correo electrónico de contacto */
        correoElectronico: '',
        /** Registro federal del contribuyente */
        registroFederal: '',
        /** Nombre del solicitante */
        nombre: '',
        /** Apellido paterno del solicitante */
        apellidoPaterno: '',
        /** Apellido materno del solicitante */
        apellidoMaterno: '',
    };
}

 /**
 * Injectable decorator to make the store available at the root level.
 */
@Injectable({
    providedIn: 'root',
})

@StoreConfig({ name: 'Solicitud120603State', resettable: true })

export class Solicitud120603Store extends Store<Solicitud120603State>{
    
    constructor() {
        super(createInitialState());
    }
  /**
 * Proporciona el tipo de solicitud en el estado.
 *
 * @param estado - El estado que se va a guardar.
 */
public setEstado(estado: string): void {
    this.update((state) => ({
        ...state,
        estado,
    }));
}

/**
 * Proporciona la representación federal en el estado.
 *
 * @param representacionFederal - La representación federal que se va a guardar.
 */
public setRepresentacionFederal(representacionFederal: string): void {
    this.update((state) => ({
        ...state,
        representacionFederal,
    }));
}

/**
 * Proporciona el tipo de empresa en el estado.
 *
 * @param tipoEmpresa - El tipo de empresa que se va a guardar.
 */
public setTipoEmpresa(tipoEmpresa: string): void {
    this.update((state) => ({
        ...state,
        tipoEmpresa,
    }));
}

/**
 * Proporciona la especificación adicional en el estado.
 *
 * @param especifique - La especificación que se va a guardar.
 */
public setEspecifique(especifique: string): void { 
    this.update((state) => ({
        ...state,
        especifique,
    }));
}

/**
 * Proporciona la actividad económica preponderante en el estado.
 *
 * @param actividadEconomicaPreponderante - La actividad económica que se va a guardar.
 */
public setActividadEconomicaPreponderante(actividadEconomicaPreponderante: string): void {
    this.update((state) => ({
        ...state,
        actividadEconomicaPreponderante,
    }));
}

/**
 * Proporciona la descripción en el estado.
 *
 * @param descripcion - La descripción que se va a guardar.
 */
public setDescripcion(descripcion: string): void {
    this.update((state) => ({
        ...state,
        descripcion,
    }));
}

/**
 * Proporciona el país en el estado.
 *
 * @param pais - El país que se va a guardar.
 */
public setPais(pais: string): void {
    this.update((state) => ({
        ...state,
        pais,
    }));
}

/**
 * Proporciona el código postal en el estado.
 *
 * @param codigoPostal - El código postal que se va a guardar.
 */
public setCodigoPostal(codigoPostal: string): void {
    this.update((state) => ({
        ...state,
        codigoPostal,
    }));
}

/**
 * Proporciona el estado del domicilio en el estado.
 *
 * @param estadoDomicilio - El estado del domicilio que se va a guardar.
 */
public setEstadoDomicilio(estadoDomicilio: string): void {
    this.update((state) => ({
        ...state,
        estadoDomicilio,
    }));
}

/**
 * Proporciona el municipio o alcaldía en el estado.
 *
 * @param municipioAlcaldia - El municipio o alcaldía que se va a guardar.
 */
public setMunicipioAlcaldia(municipioAlcaldia: string): void {
    this.update((state) => ({
        ...state,
        municipioAlcaldia,
    }));
}

/**
 * Proporciona la localidad en el estado.
 *
 * @param localidad - La localidad que se va a guardar.
 */
public setLocalidad(localidad: string): void {
    this.update((state) => ({
        ...state,
        localidad,
    }));
}

/**
 * Proporciona la colonia en el estado.
 *
 * @param colonia - La colonia que se va a guardar.
 */
public setColonia(colonia: string): void {
    this.update((state) => ({
        ...state,
        colonia,
    }));
}

/**
 * Proporciona la calle en el estado.
 *
 * @param calle - La calle que se va a guardar.
 */
public setCalle(calle: string): void {
    this.update((state) => ({
        ...state,
        calle,
    }));
}

/**
 * Proporciona el número exterior en el estado.
 *
 * @param numeroExterior - El número exterior que se va a guardar.
 */
public setNumeroExterior(numeroExterior: string): void {
    this.update((state) => ({
        ...state,
        numeroExterior,
    }));
}

/**
 * Proporciona el número interior en el estado.
 *
 * @param numeroInterior - El número interior que se va a guardar.
 */
public setNumeroInterior(numeroInterior: string): void {
    this.update((state) => ({
        ...state,
        numeroInterior,
    }));
}

/**
 * Proporciona la lada telefónica en el estado.
 *
 * @param lada - La lada que se va a guardar.
 */
public setLada(lada: string): void {
    this.update((state) => ({
        ...state,
        lada,
    }));
}

/**
 * Proporciona el teléfono en el estado.
 *
 * @param telefono - El teléfono que se va a guardar.
 */
public setTelefono(telefono: string): void {
    this.update((state) => ({
        ...state,
        telefono,
    }));
}

/**
 * Proporciona la nacionalidad en el estado.
 *
 * @param nacionalidad - La nacionalidad que se va a guardar.
 */
public setNacionalidad(nacionalidad: string): void {
    this.update((state) => ({
        ...state,
        nacionalidad,
    }));
}

/**
 * Proporciona el tipo de persona en el estado.
 *
 * @param tipoDePersona - El tipo de persona que se va a guardar.
 */
public setTipoDePersona(tipoDePersona: string): void {
    this.update((state) => ({
        ...state,
        tipoDePersona,
    }));
}

/**
 * Proporciona el Tax ID en el estado.
 *
 * @param taxId - El Tax ID que se va a guardar.
 */
public setTaxId(taxId: string): void {
    this.update((state) => ({
        ...state,
        taxId,
    }));
}

/**
 * Proporciona la razón social en el estado.
 *
 * @param razonSocial - La razón social que se va a guardar.
 */
public setRazonSocial(razonSocial: string): void {
    this.update((state) => ({
        ...state,
        razonSocial,
    }));
}

/**
 * Proporciona los datos del país en el estado.
 *
 * @param datosPais - Los datos del país que se van a guardar.
 */
public setDatosPais(datosPais: string): void {
    this.update((state) => ({
        ...state,
        datosPais,
    }));
}

/**
 * Proporciona el código postal adicional en el estado.
 *
 * @param datosCodigoPostal - El código postal adicional que se va a guardar.
 */
public setDatosCodigoPostal(datosCodigoPostal: string): void {
    this.update((state) => ({
        ...state,
        datosCodigoPostal,
    }));
}

/**
 * Proporciona el estado adicional en el estado.
 *
 * @param datosEstado - El estado adicional que se va a guardar.
 */
public setDatosEstado(datosEstado: string): void {
    this.update((state) => ({
        ...state,
        datosEstado,
    }));
}

/**
 * Proporciona el correo electrónico en el estado.
 *
 * @param correoElectronico - El correo electrónico que se va a guardar.
 */
public setCorreoElectronico(correoElectronico: string): void {
    this.update((state) => ({
        ...state,
        correoElectronico,
    }));
}

/**
 * Proporciona el registro federal en el estado.
 *
 * @param registroFederal - El registro federal que se va a guardar.
 */
public setRegistroFederal(registroFederal: string): void {
    this.update((state) => ({
        ...state,
        registroFederal,
    }));
}

/**
 * Proporciona el nombre en el estado.
 *
 * @param nombre - El nombre que se va a guardar.
 */
public setNombre(nombre: string): void {
    this.update((state) => ({
        ...state,
        nombre,
    }));
}

/**
 * Proporciona el apellido paterno en el estado.
 *
 * @param apellidoPaterno - El apellido paterno que se va a guardar.
 */
public setApellidoPaterno(apellidoPaterno: string): void {
    this.update((state) => ({
        ...state,
        apellidoPaterno,
    }));
}

/**
 * Proporciona el apellido materno en el estado.
 *
 * @param apellidoMaterno - El apellido materno que se va a guardar.
 */
public setApellidoMaterno(apellidoMaterno: string): void {
    this.update((state) => ({
        ...state,
        apellidoMaterno,
    }));
}

/**
 * Limpia todos los datos de la empresa en el estado.
 */
public limpiarDatosEmpresa(): void {
    this.reset();
}
}