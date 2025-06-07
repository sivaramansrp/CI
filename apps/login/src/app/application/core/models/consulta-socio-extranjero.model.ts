/**
 * Representa la información de un socio extranjero.
 *
 * @property razonSocial - Razón social de la empresa o entidad (si aplica).
 * @property nombre - Nombre(s) del socio extranjero.
 * @property apellidoPaterno - Apellido paterno del socio extranjero.
 * @property apellidoMaterno - Apellido materno del socio extranjero.
 * @property pais - País de residencia del socio extranjero.
 * @property codigoPostal - Código postal de la dirección del socio extranjero.
 * @property estado - Estado o provincia de la dirección.
 * @property calle - Calle de la dirección.
 * @property numeroInterior - Número interior de la dirección (opcional).
 * @property numeroExterior - Número exterior de la dirección.
 * @property numeroSeguroSocial - Número de seguro social del socio extranjero.
 * @property numeroIdentificacionFiscal - Número de identificación fiscal del socio extranjero.
 */
export interface ConsultaSocioExtranjero {
    razonSocial: string;
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