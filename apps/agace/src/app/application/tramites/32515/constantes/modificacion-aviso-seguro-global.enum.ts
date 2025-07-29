import { PATRON_LETRAS_NUMEROS_ESPACIOS, PATRON_MAYUSCULAS_NUMEROS_SIMBOLOS, PATRON_NUMERO_DECIMAL_10_2, PATRON_NUMERO_DECIMAL_3_18, REGEX_ALFANUMERICO_CON_ESPACIOS, REGEX_CORREO_ELECTRONICO, REGEX_LETRAS_NUMEROS_COMA_PARENTESIS_ESPACIO, REGEX_PATRON_ALFANUMERICO, REGEX_TELEFONO } from "@libs/shared/data-access-user/src";

/**
 * Lista de pasos del proceso de captura y firma de solicitud.
 * Cada paso contiene un índice, un título, y estados de activación y finalización.
 */
export const PASOS = [
  {
    indice: 1, // Índice del paso en el flujo
    titulo: 'Capturar solicitud', // Nombre del paso mostrado al usuario
    activo: true, // Indica si es el paso actual
    completado: true, // Indica si el paso ya se completó
  },
  {
    indice: 2,
    titulo: 'Anexar requisitos',
    activo: false,
    completado: false,
  },
  {
    indice: 3,
    titulo: 'Firmar solicitud',
    activo: false,
    completado: false,
  },
];

/**
 * Definición de los campos dinámicos para el formulario de datos del solicitante.
 */
export const DATOS_DEL_SOLICITANTE = [
  {
    id: 'acuseResolucion.acumulables', // Identificador único del campo
    labelNombre: 'Ingresos acumulables', // Etiqueta visible
    campo: 'acumulables', // Nombre del campo para el binding
    clase: 'col-md-4', // Clase para el diseño del formulario (Bootstrap)
    tipoInput: 'text', // Tipo de campo
    desactivado: false, // Indica si está deshabilitado
    soloLectura: false, // Indica si solo es de lectura
    validadores: [{ tipo: 'required', mensaje: '' }, {
        tipo: 'maxlength',
        valor: 50,
        
      }], // Validadores asociados
    marcadorDePosicion: '', // Texto de placeholder
    valorPredeterminado: '', // Valor inicial
    marginTop: 0, // Margen superior personalizado
  },
  {
    id: 'acuseResolucion.socialPagado',
    labelNombre: 'Capital social mínimo pagado',
    campo: 'socialPagado',
    clase: 'col-md-4',
    tipoInput: 'text',
    desactivado: false,
    soloLectura: false,
    validadores: [{ tipo: 'required', mensaje: '' }, {
        tipo: 'maxlength',
        valor: 50,
        
      }],
    marcadorDePosicion: '',
    valorPredeterminado: '',
    marginTop: 0,
  },
];

/**
 * Configuración del formulario para datos del representante legal.
 */
export const REPRESENTANTE_LEGAL = [
  {
    id: 'representante.rfc',
    labelNombre: 'RFC',
    campo: 'rfc',
    clase: 'col-md-4',
    tipoInput: 'text',
    desactivado: false,
    soloLectura: false,
    validadores: [{ tipo: 'required', mensaje: '' },
      {
        tipo: 'maxlength',
        valor: 13,
        
      },
      { tipo: 'pattern', valor: PATRON_MAYUSCULAS_NUMEROS_SIMBOLOS, mensaje: 'Solo se permiten letras mayúsculas, números y los símbolos' }
    ],
    marcadorDePosicion: '',
    valorPredeterminado: '',
    marginTop: 0,
  },
  {
    id: 'representante.nombre',
    labelNombre: 'Nombre',
    campo: 'nombre',
    clase: 'col-md-4',
    tipoInput: 'text', // Nota: se recomienda cambiar a 'text' si es un nombre de persona
    desactivado: false,
    soloLectura: false,
    validadores: [{ tipo: 'required', mensaje: '' },
      {
        tipo: 'maxlength',
        valor: 50,
        
      },
      { tipo: 'pattern', valor: PATRON_LETRAS_NUMEROS_ESPACIOS, mensaje: 'Solo se permiten letras, números y espacios.' }],
    marcadorDePosicion: '',
    valorPredeterminado: '',
    marginTop: 0,
  },
  {
    id: 'representante.apellidoPaterno',
    labelNombre: 'Apellido paterno',
    campo: 'apellidoPaterno',
    clase: 'col-md-4',
    tipoInput: 'text',
    desactivado: false,
    soloLectura: false,
    validadores: [{ tipo: 'required', mensaje: '' },
      {
        tipo: 'maxlength',
        valor: 50,
        
      },
      { tipo: 'pattern', valor: PATRON_LETRAS_NUMEROS_ESPACIOS, mensaje: 'Solo se permiten letras, números y espacios.' }],
    marcadorDePosicion: '',
    valorPredeterminado: '',
    marginTop: 0,
  },
  {
    id: 'acuseResolucion.apellidoMaterno',
    labelNombre: 'Apellido materno',
    campo: 'apellidoMaterno',
    clase: 'col-md-4',
    tipoInput: 'text',
    desactivado: false,
    soloLectura: false,
    validadores: [{ tipo: 'required', mensaje: '' },
      {
        tipo: 'maxlength',
        valor: 50,
        
      },
      { tipo: 'pattern', valor: PATRON_LETRAS_NUMEROS_ESPACIOS, mensaje: 'Solo se permiten letras, números y espacios.' }],
    marcadorDePosicion: '',
    valorPredeterminado: '',
    marginTop: 0,
  },
  {
    id: 'acuseResolucion.telefono',
    labelNombre: 'Teléfono',
    campo: 'telefono',
    clase: 'col-md-4',
    tipoInput: 'text',
    desactivado: false,
    soloLectura: false,
    validadores: [{ tipo: 'required', mensaje: '' },
      {
        tipo: 'maxlength',
        valor: 15,
        
      },
      { tipo: 'pattern', valor: REGEX_TELEFONO, mensaje: 'Solo se permiten números.' }],
  
    marcadorDePosicion: '',
    valorPredeterminado: '',
    marginTop: 0,
  },
  {
    id: 'acuseResolucion.correoElectronico',
    labelNombre: 'Correo electrónico',
    campo: 'correoElectronico',
    clase: 'col-md-4',
    tipoInput: 'text',
    desactivado: false,
    soloLectura: false,
    validadores: [{ tipo: 'required', mensaje: '' },
      {
        tipo: 'maxlength',
        valor: 50,
        
      },
      { tipo: 'pattern', valor: REGEX_CORREO_ELECTRONICO, mensaje: 'Formato de correo electrónico inválido.' }
    ],
    marcadorDePosicion: '',
    valorPredeterminado: '',
    marginTop: 0,
  },
];

/**
 * Campos del formulario relacionados con el seguro contratado por el solicitante.
 */
export const DATOS_DEL_SEGURO = [
  {
    id: 'datosDelSeguro.fechaInicioVigencia',
    labelNombre: 'Fecha de inicio de vigencia del seguro',
    campo: 'fechaInicioVigencia',
    clase: 'col-md-6',
    tipoInput: 'date',
    desactivado: false,
    soloLectura: false,
    validadores: [{ tipo: 'required' }],
    marcadorDePosicion: '',
    valorPredeterminado: '',
    marginTop: 0,
    habilitado: true,
  },
  {
    id: 'datosDelSeguro.fechaDeTerminoVigencia',
    labelNombre: 'Fecha de término de la vigencia del seguro',
    campo: 'fechaDeTerminoVigencia',
    clase: 'col-md-6',
    tipoInput: 'date',
    desactivado: false,
    soloLectura: false,
    validadores: [{ tipo: 'required' }],
    marcadorDePosicion: '',
    valorPredeterminado: '',
    marginTop: 0,
    habilitado: true,
  },
  {
    id: 'datosDelSeguro.noPolizaSeguro',
    labelNombre: 'No. de póliza de seguro global anual de transporte',
    campo: 'noPolizaSeguro',
    clase: 'col-md-6',
    tipoInput: 'text',
    desactivado: false,
    soloLectura: false,
    validadores: [{ tipo: 'required' }],
    marcadorDePosicion: '',
    valorPredeterminado: '',
    marginTop: 0,
    habilitado: true,
  },
  {
    id: 'datosDelSeguro.costoSeguroGlobal',
    labelNombre: ' Costo del seguro global',
    campo: 'costoSeguroGlobal',
    clase: 'col-md-6',
    tipoInput: 'text',
    desactivado: false,
    soloLectura: false,
    validadores: [{ tipo: 'required' , mensaje: ''},
      {
        tipo: 'maxlength',
        valor: 13,
        
      },
      {
        tipo: 'pattern',
        valor: PATRON_NUMERO_DECIMAL_10_2,
        mensaje: 'No cumple con el formato esperado: 9999999999.99'
      }
    ],
    marcadorDePosicion: '',
    valorPredeterminado: '',
    marginTop: 0,
    habilitado: true,
    tooltipQuestionCircle: true,
    tooltipTxt:"Indicará el monto total pagado por la póliza de seguro global del año anterior o la vigente al momento de la importación, según se trate:"
  },
  {
    id: 'datosDelSeguro.valorTotalMercancias',
    labelNombre: 'Valor de las mercancías',
    campo: 'valorTotalMercancias',
    clase: 'col-md-4',
    tipoInput: 'text',
    desactivado: false,
    soloLectura: false,
    validadores: [{ tipo: 'required' , mensaje: ''},
      {
        tipo: 'maxlength',
        valor: 13,
        
      },
      {
        tipo: 'pattern',
        valor: PATRON_NUMERO_DECIMAL_10_2,
        mensaje: 'No cumple con el formato esperado: 9999999999.99'
      }
    ],
    marcadorDePosicion: '',
    valorPredeterminado: '',
    marginTop: 0,
    habilitado: true,
    tooltipQuestionCircle: true,
    tooltipTxt:"Señalar el valor de transacción de las mercancías importadas en el año anterior o las que estime importar durante el año de cobertura de la pólíza, según se trate."
  },
  {
    id: 'datosDelSeguro.factorAplicable',
    labelNombre: 'Factor aplicable',
    campo: 'factorAplicable',
    clase: 'col-md-4',
    tipoInput: 'text',
    desactivado: false,
    soloLectura: false,
    validadores: [{ tipo: 'required', mensaje: '' },
      {
        tipo: 'maxlength',
        valor: 22,
        
      },
      {
        tipo: 'pattern',
        valor: PATRON_NUMERO_DECIMAL_3_18,
        mensaje: 'No cumple con el formato esperado 999.999999999999999999'
      }
    ],
    marcadorDePosicion: '',
    valorPredeterminado: '',
    marginTop: 0,
    habilitado: true,
    tooltipQuestionCircle: true,
    tooltipTxt: 'El factor que resulte de dividir los conceptos anteriores, conforme lo dispuesto en el artículo 117, fracción I del Reglamento de la Ley Adunera.',
  },
];

/**
 * Campos para el formulario de información de la compañía aseguradora.
 */
export const INFORMACION_DE_COMPANIA = [
  {
    id: 'informacionCompania.rfc',
    labelNombre: 'RFC',
    campo: 'rfc',
    clase: 'col-md-4',
    tipoInput: 'text',
    desactivado: false,
    soloLectura: false,
    validadores: [{ tipo: 'required' },
      {
        tipo: 'maxlength',
        valor: 13,
        
      },
      {
        tipo: 'pattern',
        valor: REGEX_PATRON_ALFANUMERICO,
        mensaje: 'Solo se permiten letras y números.'
      }
    ],
    marcadorDePosicion: '',
    valorPredeterminado: '',
    marginTop: 0,
    habilitado: true,
  },
  {
    id: 'informacionCompania.nombreCompania',
    labelNombre: 'Nombre o Razón Social de la compañía aseguradora',
    campo: 'nombreCompania',
    clase: 'col-md-8',
    tipoInput: 'text',
    desactivado: false,
    soloLectura: false,
    validadores: [{ tipo: 'required' },
      {
        tipo: 'maxlength',
        valor: 50,
        
      },
      {
        tipo: 'pattern',
        valor: REGEX_ALFANUMERICO_CON_ESPACIOS,
        mensaje: 'Solo se permiten letras, números y espacios.'
      }
    ],
    marcadorDePosicion: '',
    valorPredeterminado: '',
    marginTop: 0,
    habilitado: true,
  },
  {
    id: 'informacionCompania.entidadFederativa',
    labelNombre: 'Entidad federativa',
    campo: 'entidadFederativa',
    clase: 'col-md-4',
    tipoInput: 'select-catalogos',
    desactivado: false,
    soloLectura: false,
    validadores: [{ tipo: 'required' }],
    marcadorDePosicion: 'Selecciona un valor',
    valorPredeterminado: '',
    marginTop: 2,
  },
  {
    id: 'informacionCompania.municipioDemarcacionTerritorial',
    labelNombre: 'Municipio/Demarcación Territorial',
    campo: 'municipioDemarcacionTerritorial',
    clase: 'col-md-4',
    tipoInput: 'select-catalogos',
    desactivado: false,
    soloLectura: false,
    validadores: [{ tipo: 'required' }],
    marcadorDePosicion: 'Selecciona un valor',
    valorPredeterminado: '',
    marginTop: 2,
  },
  {
    id: 'informacionCompania.colonia',
    labelNombre: 'Colonia',
    campo: 'colonia',
    clase: 'col-md-4',
    tipoInput: 'select-catalogos',
    desactivado: false,
    soloLectura: false,
    validadores: [{ tipo: 'required' }],
    marcadorDePosicion: 'Selecciona un valor',
    valorPredeterminado: '',
    marginTop: 2,
  },
  {
    id: 'datosDelSeguro.localidad',
    labelNombre: 'Localidad',
    campo: 'localidad',
    clase: 'col-md-4',
    tipoInput: 'text',
    desactivado: false,
    soloLectura: false,
    validadores: [{ tipo: 'required' },
      {
        tipo: 'maxlength',
        varlor: 15
      },
      {
        tipo: 'pattern',
        valor: REGEX_LETRAS_NUMEROS_COMA_PARENTESIS_ESPACIO,
        mensaje: 'Solo se permiten letras, números, comas, paréntesis y espacios.'
      }
      
    ],
    marcadorDePosicion: '',
    valorPredeterminado: '',
    marginTop: 0,
    habilitado: true,
  },
  {
    id: 'datosDelSeguro.calle',
    labelNombre: 'Calle',
    campo: 'calle',
    clase: 'col-md-4',
    tipoInput: 'text',
    desactivado: false,
    soloLectura: false,
    validadores: [{ tipo: 'required' },
       {
        tipo: 'maxlength',
        varlor: 250
      },
      {
        tipo: 'pattern',
        valor: REGEX_LETRAS_NUMEROS_COMA_PARENTESIS_ESPACIO,
        mensaje: 'Solo se permiten letras, números, comas, paréntesis y espacios.'
      }
    ],
    marcadorDePosicion: '',
    valorPredeterminado: '',
    marginTop: 0,
    habilitado: true,
  },
  {
    id: 'datosDelSeguro.numeroExterior',
    labelNombre: 'Número y/o letra exterior',
    campo: 'numeroExterior',
    clase: 'col-md-4',
    tipoInput: 'text',
    desactivado: false,
    soloLectura: false,
    validadores: [{ tipo: 'required' },

       {
        tipo: 'maxlength',
        varlor: 15
      },
      {
        tipo: 'pattern',
        valor: REGEX_LETRAS_NUMEROS_COMA_PARENTESIS_ESPACIO,
        mensaje: 'Solo se permiten letras, números, comas, paréntesis y espacios.'
      }
    ],
    marcadorDePosicion: '',
    valorPredeterminado: '',
    marginTop: 0,
    habilitado: true,
  },
  {
    id: 'datosDelSeguro.numeroInterior',
    labelNombre: 'Número y/o letra interior',
    campo: 'numeroInterior',
    clase: 'col-md-4',
    tipoInput: 'text',
    desactivado: false,
    soloLectura: false,
    marcadorDePosicion: '',
    valorPredeterminado: '',
    marginTop: 0,
    habilitado: true,
    validadores: [
      {
        tipo: 'maxlength',
        varlor: 50
      },
      {
        tipo: 'pattern',
        valor: REGEX_LETRAS_NUMEROS_COMA_PARENTESIS_ESPACIO,
        mensaje: 'Solo se permiten letras, números, comas, paréntesis y espacios.'
      }
    ],
  },
  {
    id: 'datosDelSeguro.codigoPostal',
    labelNombre: 'Código postal',
    campo: 'codigoPostal',
    clase: 'col-md-4',
    tipoInput: 'text',
    desactivado: false,
    soloLectura: false,
    validadores: [{ tipo: 'required' },
      {
        tipo: 'maxlength',
        varlor: 50
      },
      {
        tipo: 'pattern',
        valor: REGEX_LETRAS_NUMEROS_COMA_PARENTESIS_ESPACIO,
        mensaje: 'Solo se permiten letras, números, comas, paréntesis y espacios.'
      }
    ],
    marcadorDePosicion: '',
    valorPredeterminado: '',
    marginTop: 0,
    habilitado: true,
  },
];

export const ERROR_FORMA_ALERT =
`
<div class="d-flex justify-content-center text-center">
  <div>
    <div class="col-md-12">
      Faltan campos por capturar.
    </div>
  </div>
</div>
`;
