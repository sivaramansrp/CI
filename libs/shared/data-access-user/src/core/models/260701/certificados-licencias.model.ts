export interface TramitesAsociados {
    folioTramite: string;
    tipoTramite: string;
    estatus: string;
    fetchAlta: string;
}

export interface Destinatario {
    nombre: string;
    rfc: string;
    curp: string;
    telefono: string;
    correoElectronico: string;
    calle: string;
    numeroExterior: string;
    numeroInterior: string;
    pais: string;
    colonia: string;
    municipio: string;
    localidad: string;
    entidadFederativa: string;
    estado: string;
    codigoPostal: string;
    coloniaEquivalente: string;
}

export interface Fabricante260701 {
    nombre: string,
    rfc: string,
    curp: string,
    telefono: string,
    correoElectronico: string,
    calle: string,
    numeroExterior: string,
    numeroInterior: string,
    pais: string,
    colonia: string,
    municipio: string,
    localidad: string,
    entidadFederativa: string,
    estado: string,
    cp: string,
}