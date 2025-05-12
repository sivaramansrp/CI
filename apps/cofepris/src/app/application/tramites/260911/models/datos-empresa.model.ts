
export interface DatosSociosTable {
    rfc: string;
    razonsocial: string;
    nombre: string;
    apellidoPaterno: string;
    apellidoM: string;
}

export interface Estado {
    id: number;
    descripcion: string;
}

export interface RepresentacionFederal{
    calle: string,
    numeroExterior: string,
    numeroInterior: string,
    codigoPostal: string,
    colonia: string,
    municipio: string,
    estado: string
}