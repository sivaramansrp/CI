/**
 * Etiquetas para los campos del formulario de datos del donante extranjero.
 */
export const DATOS_DONAR_EXTRANJERO_LABELS = {
    "nombreLabel": 'Nombre',
    "calleLabel": 'Calle',
    "numExteriorLabel": 'Número exterior',
    "numInteriorLabel": 'Número interior',
    "paisLabel": 'País',
    "codigoPostalLabel": 'Código postal',
    "estadoLabel": 'Estado',
    "ciudadLabel": 'Región o ciudad',
    "correoElectronicoLabel": 'Correo electrónico',
    "telefonoLabel": 'Teléfono',
    "documentoResidenciaLabel": 'Documento con el que acredita su residencia en el extranjero'
}

/**
 * Define los paneles colapsables para diferentes secciones en la interfaz de solicitud de donación.
 */
export const PANELS = [
    { label: 'Datos del donante extranjero', isCollapsed: true },
    { label: 'Datos del donatario', isCollapsed: true },
    { label: 'Datos del representante legal del donatario', isCollapsed: true },
    { label: 'Datos del representante legal autorizado para recibir la donación', isCollapsed: true },
    { label: 'Datos de la persona autorizada para oír y recibir notificaciones', isCollapsed: true },
];

/**
 * Textos utilizados en la interfaz de usuario para diferentes mensajes y etiquetas.
 */
export const TEXTOS = {
    DESCRIPCION_DONACION: 'Debe capturar la descripción de la mercancía en los mismos términos de la carta de donación',
    REGULACIONES_RESTRICCIONES_NO_ARANCELARIAS: '<p>Tratándose de mercancía sujeta a regulaciones y restricciones no arancelarias, adicional debe proporcionar la siguiente información</p>',
    REQUISITOS_CLAVES_CATALOGO_CAMPOS_PLANTILLA: '<p>En el caso de usar plantilla, para los campos: requerimiento básico, destino donación, UMC, UMT, país de procedencia, país de origen, condición mercancía y tipo vehículo, se deberá ingresar la clave del catálogo correspondiente. Los datos válidos de cada catálogo se encuentran en cada plantilla en la hoja correspondiente. <a href=""> Descargar plantilla</a></p>',
    ETIQUETA_DE_ARCHIVO: 'Sin archivo seleccionados'
}

/**
 * Configuración para el campo de fecha de caducidad.
 */
export const FECHA_CADUCIDAD = {
    labelNombre: 'Fecha de caducidad',
    required: true,
    habilitado: false,
}

/**
 * Matriz de opciones para botones de radio.
 *
 * Cada objeto representa una opción de botón de radio con:
 * - `label`: El texto mostrado a la usuaria.
 * - `value`: El valor correspondiente de la opción.
 */
export const OPCIONES_DE_BOTON_DE_RADIO = [
    {
        label: 'Sí',
        value: '1',
    },
    {
        label: 'No',
        value: '0',
    }
];