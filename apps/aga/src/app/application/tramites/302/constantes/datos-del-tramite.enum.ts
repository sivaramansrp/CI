/**
 * MERCANCIAS:
 * Contiene la configuración de los campos relacionados con las mercancías.
 * Cada objeto dentro del arreglo representa un campo con las siguientes propiedades:
 * 
 * - labelNombre: Etiqueta que describe el campo.
 * - campo: Nombre del campo utilizado para identificarlo.
 * - class: Clase CSS que define el tamaño y diseño del campo.
 * - tipo_input: Tipo de entrada del campo (ej. select-catalogos, checkbox, textarea, etc.).
 * - disabled: Indica si el campo está deshabilitado (true o false).
 * - validators: Validaciones aplicadas al campo (ej. 'required').
 * - placeholder: Texto de marcador de posición para el campo.
 * - tooltip: Información adicional que se muestra como un tooltip (opcional).
 */
export const MERCANCIAS = [
    {
      labelNombre: 'Aduana por la que ingresará la mercancía',
      campo: 'aduana',
      class: 'col-md-8',
      tipo_input: 'select-catalogos',
      disabled: false,
      validators: ['required'],
      placeholder: '---Selecciona---',
    },
    {
      labelNombre: 'Organismo público',
      campo: 'organisamoPublico',
      class: 'col-md-4',
      tipo_input: 'checkbox',
      disabled: false,
      validators: ['required'],
      placeholder: '',
    },
    {
      labelNombre: 'Fin al cual se destinará la mercancía',
      campo: 'finAlDestinara',
      class: 'col-md-12',
      tipo_input: 'textarea',
      disabled: false,
      tooltip: '',
      validators: ['required'],
      placeholder: '',
    }
  ];

  /**
 * PRODUCTOS:
 * Contiene la configuración de los campos relacionados con las mercancías.
 * Cada objeto dentro del arreglo representa un campo con las siguientes propiedades:
 * 
 * - labelNombre: Etiqueta que describe el campo.
 * - campo: Nombre del campo utilizado para identificarlo.
 * - class: Clase CSS que define el tamaño y diseño del campo.
 * - tipo_input: Tipo de entrada del campo (ej. select-catalogos, checkbox, textarea, etc.).
 * - disabled: Indica si el campo está deshabilitado (true o false).
 * - validators: Validaciones aplicadas al campo (ej. 'required').
 * - placeholder: Texto de marcador de posición para el campo.
 * - tooltip: Información adicional que se muestra como un tooltip (opcional).
 */
  export const PRODUCTOS = [
    {
      labelNombre: 'Tipo de mercancía',
      campo: 'tipoDeMercancia',
      class: 'col-md-4',
      tipo_input: 'text',
      disabled: false,
      validators: ['required'],
      placeholder: '',
    },
    {
      labelNombre: 'Condición de la mercancía',
      campo: 'condicionDeLaMercancia',
      class: 'col-md-8',
      tipo_input: 'text',
      disabled: true,
      validators: [''],
      placeholder: '',
    },
    {
      labelNombre: 'Cantidad',
      campo: 'cantidad',
      class: 'col-md-8',
      tipo_input: 'text',
      disabled: false,
      tooltip: '',
      validators: ['required'],
      placeholder: '',
    },
    {
      labelNombre: 'Unidad de medida',
      campo: 'unidadDeMedida',
      class: 'col-md-4',
      tipo_input: 'select-catalogos',
      disabled: false,
      tooltip: '',
      validators: ['required'],
      placeholder: '',
    },
    {
      labelNombre: 'En su caso (maquinaria y equipo obsoleto)',
      campo: 'enSuCaso',
      class: 'col-md-12',
      tipo_input: '',
      disabled: false,
      tooltip: '',
      validators: [''],
      placeholder: '',
    },
    {
        labelNombre: 'Marca',
        campo: 'marca',
        class: 'col-md-4',
        tipo_input: 'text',
        disabled: false,
        tooltip: '',
        validators: [''],
        placeholder: '',
      },
      {
        labelNombre: 'Año de importación temporal',
        campo: 'anoDeImportacionTemporal',
        class: 'col-md-4',
        tipo_input: 'select-catalogos',
        disabled: false,
        tooltip: '',
        validators: [''],
        placeholder: '',
      },
      {
        labelNombre: 'Modelo',
        campo: 'modelo',
        class: 'col-md-4',
        tipo_input: 'text',
        disabled: false,
        tooltip: '',
        validators: [''],
        placeholder: '',
      },
      {
        labelNombre: 'Número de serie',
        campo: 'numeroDeSerie',
        class: 'col-md-8',
        tipo_input: 'text',
        disabled: false,
        tooltip: '',
        validators: [''],
        placeholder: '',
      }
  ];

  /**
 * DATOS_DEL_DONANTE:
 * Contiene la configuración de los campos relacionados con las mercancías.
 * Cada objeto dentro del arreglo representa un campo con las siguientes propiedades:
 * 
 * - labelNombre: Etiqueta que describe el campo.
 * - campo: Nombre del campo utilizado para identificarlo.
 * - class: Clase CSS que define el tamaño y diseño del campo.
 * - tipo_input: Tipo de entrada del campo (ej. select-catalogos, checkbox, textarea, etc.).
 * - disabled: Indica si el campo está deshabilitado (true o false).
 * - validators: Validaciones aplicadas al campo (ej. 'required').
 * - placeholder: Texto de marcador de posición para el campo.
 * - tooltip: Información adicional que se muestra como un tooltip (opcional).
 */
  export const DATOS_DEL_DONANTE = [
    {
      labelNombre: 'RFC',
      campo: 'rfc',
      class: 'col-md-4',
      tipo_input: 'text',
      disabled: false,
      validators: ['required'],
      placeholder: '',
      tooltip: ''
    },
    {
      labelNombre: 'Número de programa Immex',
      campo: 'programaImmex',
      class: 'col-md-8',
      tipo_input: 'text',
      disabled: true,
      validators: ['required'],
      placeholder: '',
    },
    {
      labelNombre: 'Razón / Razon Social',
      campo: 'nombreRazonSocial',
      class: 'col-md-8',
      tipo_input: 'text',
      disabled: false,
      tooltip: '',
      validators: ['required'],
      placeholder: '',
    }
  ];

  /**
 * DOMICILIO_FISCAL:
 * Contiene la configuración de los campos relacionados con las mercancías.
 * Cada objeto dentro del arreglo representa un campo con las siguientes propiedades:
 * 
 * - labelNombre: Etiqueta que describe el campo.
 * - campo: Nombre del campo utilizado para identificarlo.
 * - class: Clase CSS que define el tamaño y diseño del campo.
 * - tipo_input: Tipo de entrada del campo (ej. select-catalogos, checkbox, textarea, etc.).
 * - disabled: Indica si el campo está deshabilitado (true o false).
 * - validators: Validaciones aplicadas al campo (ej. 'required').
 * - placeholder: Texto de marcador de posición para el campo.
 * - tooltip: Información adicional que se muestra como un tooltip (opcional).
 */
  export const DOMICILIO_FISCAL = [
    {
      labelNombre: 'País',
      campo: 'pais',
      class: 'col-md-4',
      tipo_input: 'text',
      disabled: true,
      validators: ['required'],
      placeholder: '',
      tooltip: ''
    },
    {
      labelNombre: 'C.P o zona postal',
      campo: 'zonaPostal',
      class: 'col-md-4',
      tipo_input: 'text',
      disabled: true,
      validators: ['required'],
      placeholder: '',
    },
    {
      labelNombre: 'Estado',
      campo: 'estado',
      class: 'col-md-4',
      tipo_input: 'text',
      disabled: true,
      tooltip: '',
      validators: ['required'],
      placeholder: '',
    },
    {
      labelNombre: 'Colonia',
      campo: 'colonia',
      class: 'col-md-4',
      tipo_input: 'text',
      disabled: true,
      tooltip: '',
      validators: ['required'],
      placeholder: '',
    },
    {
      labelNombre: 'Calle',
      campo: 'calle',
      class: 'col-md-8',
      tipo_input: 'text',
      disabled: true,
      tooltip: '',
      validators: ['required'],
      placeholder: '',
    },
    {
      labelNombre: 'Número y/o letra exterior',
      campo: 'numeroExterior',
      class: 'col-md-4',
      tipo_input: 'text',
      disabled: true,
      tooltip: '',
      validators: ['required'],
      placeholder: '',
    },
    {
      labelNombre: 'Número y/o letra interior',
      campo: 'numeroInterior',
      class: 'col-md-4',
      tipo_input: 'text',
      disabled: true,
      tooltip: '',
      validators: [''],
      placeholder: '',
    },
    {
      labelNombre: 'Correo electrónico',
      campo: 'correoElectronico',
      class: 'col-md-8',
      tipo_input: 'text',
      disabled: true,
      tooltip: '',
      validators: [''],
      placeholder: '',
    },
    {
      labelNombre: 'Teléfono',
      campo: 'telephono',
      class: 'col-md-4',
      tipo_input: 'text',
      disabled: true,
      tooltip: '',
      validators: [''],
      placeholder: '',
    },
    {
      labelNombre: 'Correo electrónico (opcional)',
      campo: 'correoElectronicoOpcional',
      class: 'col-md-8',
      tipo_input: 'text',
      disabled: false,
      tooltip: '',
      validators: [''],
      placeholder: '',
    },
    {
      labelNombre: 'Teléfono (opcional)',
      campo: 'telephonoOpcional',
      class: 'col-md-4',
      tipo_input: 'text',
      disabled: false,
      tooltip: '',
      validators: [''],
      placeholder: '',
    }
  ];

  /**
 * DATOS_ALERT:
 * Contiene un mensaje de alerta que se muestra al usuario.
 * 
 * - message: Mensaje en formato HTML que indica al usuario que debe capturar
 *   la descripción de la mercancía en los mismos términos de la carta de donación.
 */
export const DATOS_ALERT = {
  message: `<p>Debes capturar la descripción de la mercancía en los mismos términos de la carta de donación.</p>`,
};