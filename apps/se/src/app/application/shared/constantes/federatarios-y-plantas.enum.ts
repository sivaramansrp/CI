

/**
 * Constante que representa la configuración de la fecha de pago.
 * 
 * @property {string} labelNombre - Etiqueta que describe el nombre del campo.
 * @property {boolean} required - Indica si el campo es obligatorio.
 * @property {boolean} habilitado - Indica si el campo está habilitado.
 */
export const FECHA_DE_PAGO = {
  labelNombre: 'Fecha del acta',
  required: true,
  habilitado: true,
};

/**
 * Constante que define los estados predeterminados para un formulario.
 * 
 * Esta constante es un objeto que contiene tres propiedades:
 * - `estadoUno`: Representa el primer estado del formulario, inicialmente vacío.
 * - `estadoDos`: Representa el segundo estado del formulario, inicialmente vacío.
 * - `estadoTres`: Representa el tercer estado del formulario, inicialmente vacío.
 * 
 * Estos estados pueden ser utilizados para inicializar o resetear un formulario
 * en una aplicación Angular.
 */
export const DEFAULT_ESTADOS = {
  estadoUno: '',
  estadoDos: '',
  estadoTres: ''
}

/**
 * Constante que define las opciones predeterminadas para los estados de un formulario.
 * 
 * Esta constante es un objeto que contiene tres propiedades:
 * - `estadoOptionUno`: Representa la primera opción del estado, inicialmente vacío.
 * - `estadoOptionDos`: Representa la segunda opción del estado, inicialmente vacío.
 * - `estadoOptionTres`: Representa la tercera opción del estado, inicialmente vacío.
 * 
 * Estas opciones pueden ser utilizadas para inicializar o resetear un formulario
 * en una aplicación Angular.
 */
export const DEFAULT_ESTADOS_OPTIONS = {
  estadoOptionUno: '',
  estadoOptionDos: '',
  estadoOptionTres: ''
}
/**
 * Constante que define los datos de configuración para los campos de entrada
 * relacionados con federatarios y plantas.
 * 
 * Cada objeto dentro del arreglo `DATOS_FEDERATARIOS` representa un campo con
 * las siguientes propiedades:
 * 
 * - `id`: Identificador único del campo.
 * - `labelNombre`: Etiqueta que se muestra como nombre del campo.
 * - `campo`: Nombre del atributo asociado al campo.
 * - `clase`: Clase CSS que define el diseño del campo.
 * - `tipoInput`: Tipo de entrada del campo (por ejemplo, texto, fecha, select, etc.).
 * - `desactivado`: Indica si el campo está deshabilitado.
 * - `solo_lectura`: Indica si el campo es de solo lectura.
 * - `validadores`: Arreglo de validadores aplicados al campo, cada validador tiene:
 *   - `tipo`: Tipo de validación (por ejemplo, requerido).
 * - `marcadorDePosicion`: Texto que se muestra como marcador de posición en el campo.
 * - `valorPredeterminado`: Valor inicial del campo.
 * - `margin_top`: Margen superior aplicado al campo (en unidades CSS).
 * - `marginTop`: Alternativa para definir el margen superior (en unidades CSS).
 * - `habilitado`: Indica si el campo está habilitado (opcional).
 */
export const DATOS_FEDERATARIOS = [
  {
    id: 'nombre',
    labelNombre: 'Nombre(s)',
    campo: 'nombre',
    clase: 'col-md-4',
    tipoInput: 'text',
    desactivado: false,
    solo_lectura: false,
    validadores: [
      {
        tipo: 'required'
      }
    ],
    marcadorDePosicion: '',
    valorPredeterminado: '',
    margin_top: 3
  },
  {
    id: 'primerApellido',
    labelNombre: 'Primer apellido*',
    campo: 'primerApellido',
    clase: 'col-md-4',
    tipoInput: 'text',
    desactivado: true,
    solo_lectura: false,
    validadores: [
      {
        tipo: 'required'
      }
    ],
    marcadorDePosicion: '',
    valorPredeterminado: '',
    margin_top: 3
  },
  {
    id: 'segundoApellido',
    labelNombre: 'Segundo apellido',
    campo: 'segundoApellido',
    clase: 'col-md-4',
    tipoInput: 'text',
    desactivado: true,
    solo_lectura: false,
    validadores: [
      { tipo: 'required' }
    ],
    marcadorDePosicion: '',
    valorPredeterminado: '',
    margin_top: 3
  },
  {
    id: 'numeroDeActa',
    labelNombre: 'Número de acta',
    campo: 'numeroDeActa',
    clase: 'col-md-4',
    tipoInput: 'text',
    desactivado: true,
    solo_lectura: false,
    validadores: [
      { tipo: '' }
    ],
    marcadorDePosicion: '',
    valorPredeterminado: '',
    margin_top: 3
  },
  {

    id: 'fechaDelActa',
    labelNombre: 'Fecha del acta',
    campo: 'fechaDelActa',
    clase: 'col-md-4',
    tipoInput: 'date',
    desactivado: false,
    soloLectura: false,
    validadores: [
      { tipo: 'required' }
    ],
    marcadorDePosicion: '',
    valorPredeterminado: '',
    marginTop: 0,
    habilitado: true
  },
  {
    id: 'numeroDeNotaria',
    labelNombre: 'Número de notaría',
    campo: 'numeroDeNotaria',
    clase: 'col-md-4',
    tipoInput: 'text',
    desactivado: true,
    solo_lectura: false,
    validadores: [
      { tipo: '' }
    ],
    marcadorDePosicion: '',
    valorPredeterminado: '',
    margin_top: 3
  },
  {
    id: 'estado',
    labelNombre: 'Estado',
    campo: 'estado',
    clase: 'col-md-4',
    tipoInput: 'select-catalogos',
    desactivado: false,
    soloLectura: false,
    validadores: [{ tipo: 'required' }],
    marcadorDePosicion: 'Selecciona un valor',
    valorPredeterminado: '',
    marginTop: 0,
  },
  {
    id: 'estadoOptions',
    labelNombre: 'Municipio o alcaldía',
    campo: 'estadoOptions',
    clase: 'col-md-4',
    tipoInput: 'select-catalogos',
    desactivado: false,
    soloLectura: false,
    validadores: [{ tipo: 'required' }],
    marcadorDePosicion: 'Selecciona un valor',
    valorPredeterminado: '',
    marginTop: 0,
  },
];

/**
 * Constante `EXPRESAS` que define un arreglo de objetos utilizados para configurar
 * los campos de un formulario. Cada objeto representa un campo con sus propiedades
 * y validaciones específicas.
 * 
 * Propiedades de cada objeto:
 * - `id`: Identificador único del campo.
 * - `labelNombre`: Etiqueta que describe el nombre del campo.
 * - `campo`: Nombre del campo asociado.
 * - `clase`: Clase CSS aplicada al campo para definir su estilo.
 * - `tipoInput`: Tipo de entrada del campo (por ejemplo, texto, selección, área de texto).
 * - `desactivado`: Indica si el campo está deshabilitado.
 * - `solo_lectura`: Indica si el campo es de solo lectura.
 * - `validadores`: Arreglo de validaciones aplicadas al campo. Cada validador tiene:
 *   - `tipo`: Tipo de validación (por ejemplo, requerido).
 * - `marcadorDePosicion`: Texto de marcador de posición para el campo.
 * - `valorPredeterminado`: Valor inicial del campo.
 * - `margin_top`: Margen superior aplicado al campo.
 * 
 * Ejemplo de uso:
 * Esta constante puede ser utilizada para generar dinámicamente un formulario
 * en una aplicación Angular, donde cada campo se renderiza según las propiedades
 * definidas en este arreglo.
 */
export const EXPRESAS = [
  {
    id: 'taxId',
    labelNombre: 'Tax ID',
    campo: 'taxId',
    clase: 'col-md-6',
    tipoInput: 'text',
    desactivado: false,
    solo_lectura: false,
    validadores: [
      {
        tipo: 'required'
      }
    ],
    marcadorDePosicion: '',
    valorPredeterminado: '',
    margin_top: 3
  },
  {
    id: 'nombreDelEmpresa',
    labelNombre: 'Nombre de la Empresa',
    campo: 'nombreDelEmpresa',
    clase: 'col-md-6',
    tipoInput: 'text',
    desactivado: false,
    solo_lectura: false,
    validadores: [
      {
        tipo: 'required'
      }
    ],
    marcadorDePosicion: '',
    valorPredeterminado: '',
    margin_top: 3
  },
  {
    id: 'pais',
    labelNombre: 'País',
    campo: 'pais',
    clase: 'col-md-12',
    tipoInput: 'select-catalogos',
    desactivado: false,
    soloLectura: false,
    validadores: [{ tipo: 'required' }],
    marcadorDePosicion: 'Selecciona un valor',
    valorPredeterminado: '',
    marginTop: 0,
  },
  {
    id: 'direccion',
    labelNombre: 'Dirección',
    campo: 'direccion',
    clase: 'col-md-12',
    tipoInput: 'textarea',
    desactivado: false,
    solo_lectura: false,
    validadores: [
      {
        tipo: 'required'
      }
    ],
    marcadorDePosicion: '',
    valorPredeterminado: '',
    margin_top: 5
  }
];
