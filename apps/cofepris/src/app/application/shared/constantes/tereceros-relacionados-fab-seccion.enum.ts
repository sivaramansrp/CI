import { FacricanteModel } from "../models/terceros-fabricante-relocionados.model";

/**
 * `NACIONALIDAD_OPCIONES_DE_BOTON_DE_RADIO`
 * 
 * Esta constante define las opciones disponibles para un grupo de botones de radio que representan la nacionalidad.
 * 
 * 
 * ### Propósito:
 * - Se utiliza para representar la nacionalidad de una persona o entidad en formularios o interfaces de usuario.
 * - Permite al usuario seleccionar entre las opciones "Nacional" y "Extranjero".

 */
export const NACIONALIDAD_OPCIONES_DE_BOTON_DE_RADIO = [
    {
        label: 'Nacional',
        value: '1',
    },
    {
        label: 'Extranjero',
        value: '0',
    }
  ];
  /**
 * `PERSONA_OPCIONES_DE_BOTON_DE_RADIO`
 * 
 * Esta constante define las opciones disponibles para un grupo de botones de radio que representan el tipo de persona.
 * 
 * ### Estructura:
 * - Cada objeto dentro del array contiene las siguientes propiedades:
 *   - `label`: El texto que se mostrará junto al botón de radio.
 *   - `value`: El valor asociado a la opción seleccionada.
 * 

 * ### Propósito:
 * - Se utiliza para representar el tipo de persona (física o moral) en formularios o interfaces de usuario.
 * - Permite al usuario seleccionar entre las opciones "Física" y "Moral".
 * 

 * 

 * ```
 */
  export const PERSONA_OPCIONES_DE_BOTON_DE_RADIO = [
    {
        label: 'Física',
        value: '1',
    },
    {
        label: 'Moral',
        value: '0',
    }
  ];
  /**
 * Texto de alerta para los terceros relacionados.
 * Indica que las tablas con asterisco son obligatorias.
 */
export const TERCEROS_TEXTO_DE_ALERTA =
'Las tablas con asterisco son obligatorias y debes agregar por lo menos un registro.';


export const FABRICANTE_TABLE_CONFIG = [
  {
    encabezado: 'Nombre/denominación o razón social',
    clave: (ele: FacricanteModel): string => ele.denominacionRazonSocial,
    orden: 1,
  },
  {
    encabezado: "R.F.C",
    clave: (ele: FacricanteModel): string => ele.rfc,
    orden: 2,
  },
 {
    encabezado: 'CURP',
    clave: (ele: FacricanteModel): string => ele.curp,
    orden: 1,
  },
  {
    encabezado: "Teléfono",
    clave: (ele: FacricanteModel): string => ele.telefono,
    orden: 2,
  },
   {
    encabezado: 'Correo electrónico',
    clave: (ele: FacricanteModel): string => ele.CorreoElectronico,
    orden: 1,
  },
  {
    encabezado: "Calle",
    clave: (ele: FacricanteModel): string => ele.calle,
    orden: 2,
  },
   {
    encabezado: 'Número exterior',
    clave: (ele: FacricanteModel): string => ele.numeroExterior,
    orden: 1,
  },
  {
    encabezado: "Número interior",
    clave: (ele: FacricanteModel): string => ele.numeroInterior,
    orden: 2,
  },
   {
    encabezado: 'País',
    clave: (ele: FacricanteModel): string => ele.pais,
    orden: 1,
  },
  {
    encabezado: "Colonia",
    clave: (ele: FacricanteModel): string => ele.colonia,
    orden: 2,
  },

   {
    encabezado: 'Municipio o alcaldía',
    clave: (ele: FacricanteModel): string => ele.municipioOAlcaldia,
    orden: 1,
  },
  {
    encabezado: "Localidad",
    clave: (ele: FacricanteModel): string => ele.localidad,
    orden: 2,
  }, 
  {
    encabezado: 'Entidad federativa',
    clave: (ele: FacricanteModel): string => ele.entidadFederativa,
    orden: 1,
  },
   {
    encabezado: 'Estado/localidad',
    clave: (ele: FacricanteModel): string => ele.estadoLocalidad,
    orden: 1,
  },
  {
    encabezado: "Código postal",
    clave: (ele: FacricanteModel): string => ele.codigoPostal,
    orden: 2,
  },
 {
    encabezado: "Colonia o equivalente",
    clave: (ele: FacricanteModel): string => ele.coloniaoEquivalente,
    orden: 2,
  },

]