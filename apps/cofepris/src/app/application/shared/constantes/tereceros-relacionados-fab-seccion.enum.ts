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