/**
 * Representa la información de un socio extranjero persona física.
 *
 * @property nombre - Nombre(s) del socio.
 * @property apellidoPaterno - Apellido paterno del socio.
 * @property apellidoMaterno - Apellido materno del socio.
 * @property pais - País de residencia del socio.
 * @property codigoPostal - Código postal de la dirección del socio.
 * @property estado - Estado o provincia de la dirección del socio.
 * @property calle - Calle de la dirección del socio.
 * @property numeroInterior - Número interior de la dirección (opcional).
 * @property numeroExterior - Número exterior de la dirección.
 * @property numeroSeguroSocial - Número de seguro social del socio.
 * @property numeroIdentificacionFiscal - Número de identificación fiscal del socio.
 */
export interface ConsultaSocioExtranjeroFisica {
    nombre: string;
    apellidoPaterno: string;
    apellidoMaterno: string;
    pais: string;
    codigoPostal: string;
    estado: string;
    calle: string;
    numeroInterior: string;
    numeroExterior: string;
    numeroSeguroSocial: string;
    numeroIdentificacionFiscal: string;
}

export interface ConsultaSocioExtranjeroMoral {
    razonSocial: string;
    pais: string;
    codigoPostal: string;
    estado: string;
    calle: string;
    numeroInterior: string;
    numeroExterior: string;
}