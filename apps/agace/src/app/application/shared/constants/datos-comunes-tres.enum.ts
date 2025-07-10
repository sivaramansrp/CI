import { Domicilios, Inventarios, NumeroDeEmpleados } from "../models/datos-comunes-tres.model";
import { ConfiguracionAporteColumna, ConfiguracionColumna, TablaCampoSeleccion } from "@libs/shared/data-access-user/src";

export const DATOS_COMUNES = [
  {
    id: 'catseleccionados',
    labelNombre: 'Sector Productivo',
    campo: 'catseleccionados',
    clase: 'col-md-6',
    tipoInput: 'select-catalogos',
    desactivado: false,
    soloLectura: false,
    validadores: [],
    valorPredeterminado: '',
    marcadorDePosicion: '',
    marginTop: 0
  },
  {
    id: 'servicio',
    labelNombre: 'Servicio',
    campo: 'servicio',
    clase: 'col-md-6',
    tipoInput: 'select-catalogos',
    desactivado: false,
    soloLectura: false,
    validadores: [],
    marcadorDePosicion: '',
    valorPredeterminado: '',
    marginTop: 0,
  },
  {
    id: '',
    labelNombre: '',
    campo: '',
    clase: 'col-md-12',
    tipoInput: 'custom-html',
    desactivado: false,
    soloLectura: false,
    validadores: [],
    marcadorDePosicion: '',
    valorPredeterminado: '',
    marginTop: 5,
    templateKey: 'customSection1',
  },
  {
    id: 'senaleAduaneras',
    labelNombre: 'Señale si al momento de ingresar su solicitud si se encuentra al corriente en el cumplimiento de sus obligaciones fiscales y aduaneras',
    campo: 'senaleAduaneras',
    clase: 'col-md-12',
    tipoInput: 'radio',
    desactivado: false,
    soloLectura: false,
    validadores: [{ tipo: 'required' }],
    valorPredeterminado: '',
    marcadorDePosicion: '',
    marginTop: 0,
    opciones: [
      {
        label: 'Si',
        value: 'Si',
      },
      {
        label: 'No',
        value: 'No',
      },
    ],
    gridLayout: true
  },
  {
    id: 'indiqueSiAutorizo',
    labelNombre: 'Indique si autorizó al S A T hacer pública su opinión positiva sobre el cumplimiento de obligaciones fiscales',
    campo: 'indiqueSiAutorizo',
    clase: 'col-md-12',
    tipoInput: 'radio',
    desactivado: false,
    soloLectura: false,
    validadores: [{ tipo: 'required' }],
    valorPredeterminado: '',
    marcadorDePosicion: '',
    marginTop: 0,
    opciones: [
      {
        label: 'Si',
        value: 'Si',
      },
      {
        label: 'No',
        value: 'No',
      },
    ],
    gridLayout: true
  },
  {
    id: 'senaleSiCuenta',
    labelNombre: 'Señale si cuenta con empleados propios para realizar el proceso productivo o la prestación de servicios, registrado ante elIMSS',
    campo: 'senaleSiCuenta',
    clase: 'col-md-12',
    tipoInput: 'radio',
    desactivado: false,
    soloLectura: false,
    validadores: [{ tipo: 'required' }],
    valorPredeterminado: '',
    marcadorDePosicion: '',
    marginTop: 0,
    opciones: [
      {
        label: 'Si',
        value: 'Si',
      },
      {
        label: 'No',
        value: 'No',
      },
    ],
    gridLayout: true
  },
  {
    id: 'cualEsElNumero',
    labelNombre: 'Cual es el número de empleados propios con los que contó en el último bimestre anterior a su solicitud',
    campo: 'cualEsElNumero',
    clase: 'col-md-12',
    tipoInput: 'label-only',
    desactivado: false,
    soloLectura: false,
    validadores: [],
    marcadorDePosicion: '',
    valorPredeterminado: '',
    marginTop: 5,
    mostrar: false,
  },
  {
    id: 'empleados',
    labelNombre: 'Número de empleados',
    campo: 'empleados',
    clase: 'col-md-6',
    tipoInput: 'text',
    desactivado: false,
    soloLectura: false,
    validadores: [],
    valorPredeterminado: '',
    marcadorDePosicion: '',
    marginTop: 0,
    mostrar: false,
  },
   {
    id: 'bimestre',
    labelNombre: 'Bimestre',
    campo: 'bimestre',
    clase: 'col-md-6',
    tipoInput: 'select-catalogos',
    desactivado: false,
    soloLectura: false,
    validadores: [],
    marcadorDePosicion: '',
    valorPredeterminado: '',
    marginTop: 0,
    opciones: [],
    mostrar: false,
  },
  {
    id: 'cumpleConLaObligacion',
    labelNombre: 'Cumple con la obligación de retener y enterar el I S R de los trabajadores',
    campo: 'cumpleConLaObligacion',
    clase: 'col-md-12',
    tipoInput: 'radio',
    desactivado: false,
    soloLectura: false,
    validadores: [{ tipo: 'required' }],
    valorPredeterminado: '',
    marcadorDePosicion: '',
    marginTop: 0,
    opciones: [
      {
        label: 'Si',
        value: 'Si',
      },
      {
        label: 'No',
        value: 'No',
      },
    ],
    gridLayout: true
  },
  {
    id: 'acreditaRealizar',
    labelNombre: 'Acredita realizar el pago de cuotas obrero patronales',
    campo: 'acreditaRealizar',
    clase: 'col-md-12',
    tipoInput: 'radio',
    desactivado: false,
    soloLectura: false,
    validadores: [{ tipo: 'required' }],
    valorPredeterminado: '',
    marcadorDePosicion: '',
    marginTop: 0,
    opciones: [
      {
        label: 'Si',
        value: 'Si',
      },
      {
        label: 'No',
        value: 'No',
      },
    ],
    gridLayout: true
  },
  {
    id: 'senaleEspecializadas',
    labelNombre: 'Señale si al momento de ingresar su solicitud la empresa solicitante cuenta con subcontratación de servicios especializados o de ejecución de obras especializadas',
    campo: 'senaleEspecializadas',
    clase: 'col-md-12',
    tipoInput: 'radio',
    desactivado: false,
    soloLectura: false,
    validadores: [{ tipo: 'required' }],
    valorPredeterminado: '',
    marcadorDePosicion: '',
    marginTop: 0,
    opciones: [
      {
        label: 'Si',
        value: 'Si',
      },
      {
        label: 'No',
        value: 'No',
      },
    ],
    gridLayout: true
  },
  {
    id: '',
    labelNombre: '',
    campo: '',
    clase: 'col-md-12',
    tipoInput: 'custom-html',
    desactivado: false,
    soloLectura: false,
    validadores: [],
    marcadorDePosicion: '',
    valorPredeterminado: '',
    marginTop: 5,
    templateKey: 'customSection2',
  },
  {
    id: 'enSuCasoLFT',
    labelNombre: 'En su caso, acredite cumplir con el registro y estar en el padrón a que se refiere el artículo 15 de la LFT.',
    campo: 'enSuCasoLFT',
    clase: 'col-md-12',
    tipoInput: 'radio',
    desactivado: false,
    soloLectura: false,
    validadores: [{ tipo: 'required' }],
    valorPredeterminado: '',
    marcadorDePosicion: '',
    marginTop: 0,
    opciones: [
      {
        label: 'Si',
        value: 'Si',
      },
      {
        label: 'No',
        value: 'No',
      },
    ],
    gridLayout: true,
    mostrar: false,
  },
  {
    id: 'senaleSiAlMomentoFraccionVI',
    labelNombre: 'Señale si al momento de ingresar su solicitud se encuentra en el listado de empresas publicadas por el SAT en términos del artículo 69, con excepción de lo dispuesto en la fracción VI.',
    campo: 'senaleSiAlMomentoFraccionVI',
    clase: 'col-md-12',
    tipoInput: 'radio',
    desactivado: false,
    soloLectura: false,
    validadores: [{ tipo: 'required' }],
    valorPredeterminado: '',
    marcadorDePosicion: '',
    marginTop: 0,
    opciones: [
      {
        label: 'Si',
        value: 'Si',
      },
      {
        label: 'No',
        value: 'No',
      },
    ],
    gridLayout: true,
  },
  {
    id: 'delMismoModo',
    labelNombre: 'Del mismo modo, indique si al momento de ingresar su solicitud se encuentra en el listado de empresas publicadas por el SAT en términos del artículo 69-B, cuarto párrafo del CFF.',
    campo: 'delMismoModo',
    clase: 'col-md-12',
    tipoInput: 'radio',
    desactivado: false,
    soloLectura: false,
    validadores: [{ tipo: 'required' }],
    valorPredeterminado: '',
    marcadorDePosicion: '',
    marginTop: 0,
    opciones: [
      {
        label: 'Si',
        value: 'Si',
      },
      {
        label: 'No',
        value: 'No',
      },
    ],
    gridLayout: true,
  },
  {
    id: 'senaleSiSeEncuentraCFF',
    labelNombre: 'Señale si se encuentra en el listado de empresas publicadas por el SAT en términos del artículo 69-B Bis noveno párrafo del CFF.',
    campo: 'senaleSiSeEncuentraCFF',
    clase: 'col-md-12',
    tipoInput: 'radio',
    desactivado: false,
    soloLectura: false,
    validadores: [{ tipo: 'required' }],
    valorPredeterminado: '',
    marcadorDePosicion: '',
    marginTop: 0,
    opciones: [
      {
        label: 'Si',
        value: 'Si',
      },
      {
        label: 'No',
        value: 'No',
      },
    ],
    gridLayout: true,
  },
  {
    id: 'senaleSiSusCertificados',
    labelNombre: 'Señale si sus certificados de sellos digitales están vigentes.',
    campo: 'senaleSiSusCertificados',
    clase: 'col-md-12',
    tipoInput: 'radio',
    desactivado: false,
    soloLectura: false,
    validadores: [{ tipo: 'required' }],
    valorPredeterminado: '',
    marcadorDePosicion: '',
    marginTop: 0,
    opciones: [
      {
        label: 'Si',
        value: 'Si',
      },
      {
        label: 'No',
        value: 'No',
      },
    ],
    gridLayout: true,
  },
  {
    id: 'enCasoAfirmativoSenale',
    labelNombre: 'En caso afirmativo señale si se infringió alguno de los supuestos previstos en el artículo 17-H Bis del CFF, durante los últimos doce meses.',
    campo: 'enCasoAfirmativoSenale',
    clase: 'col-md-12',
    tipoInput: 'radio',
    desactivado: false,
    soloLectura: false,
    validadores: [{ tipo: 'required' }],
    valorPredeterminado: '',
    marcadorDePosicion: '',
    marginTop: 0,
    opciones: [
      {
        label: 'Si',
        value: 'Si',
      },
      {
        label: 'No',
        value: 'No',
      },
    ],
    gridLayout: true,
  },
  {
    id: 'indiqueTodos',
    labelNombre: '',
    campo: 'indiqueTodos',
    clase: 'col-md-6',
    tipoInput: 'select-catalogos',
    desactivado: false,
    soloLectura: false,
    validadores: [],
    marcadorDePosicion: '',
    valorPredeterminado: '',
    marginTop: 0,
    opciones: []
  },
  {
    id: 'indiqueTodosLosDomicilios',
    labelNombre: 'Indique todos los domicilios registrados ante el RFC del solicitante e indique aquellos en que se desarrollen actividades relacionadas con su proceso productivo y/o la prestación de servicios.',
    campo: 'indiqueTodosLosDomicilios',
    clase: 'col-md-12',
    tipoInput: 'label-only',
    desactivado: false,
    soloLectura: false,
    validadores: [],
    marcadorDePosicion: '',
    valorPredeterminado: '',
    marginTop: 3,
  },
  {
    id: '',
    labelNombre: '',
    campo: '',
    clase: 'col-md-12',
    tipoInput: 'custom-html',
    desactivado: false,
    soloLectura: false,
    validadores: [],
    marcadorDePosicion: '',
    valorPredeterminado: '',
    marginTop: 3,
    templateKey: 'customSection3',
  },
  {
    id: 'senalesiTieneCFF',
    labelNombre: 'Señale si tiene actualizado sus medios de contacto para efectos del buzón tributario en términos del penúltimo párrafo del artículo 17-K del CFF.',
    campo: 'senalesiTieneCFF',
    clase: 'col-md-12',
    tipoInput: 'radio',
    desactivado: false,
    soloLectura: false,
    validadores: [{ tipo: 'required' }],
    valorPredeterminado: '',
    marcadorDePosicion: '',
    marginTop: 0,
    opciones: [
      {
        label: 'Si',
        value: 'Si',
      },
      {
        label: 'No',
        value: 'No',
      },
    ],
    gridLayout: true,
  },
  {
    id: 'senalesiSeSectorial',
    labelNombre: 'Señale si se encuentra suspendida en el Padron de Importadores o en el Padrón de Importadores de Sectores Específicos o Padrón de Exportadores Sectorial',
    campo: 'senalesiSeSectorial',
    clase: 'col-md-12',
    tipoInput: 'radio',
    desactivado: false,
    soloLectura: false,
    validadores: [{ tipo: 'required' }],
    valorPredeterminado: '',
    marcadorDePosicion: '',
    marginTop: 0,
    opciones: [
      {
        label: 'Si',
        value: 'Si',
      },
      {
        label: 'No',
        value: 'No',
      },
    ],
    gridLayout: true,
  },
];

/**
 * Configuración de columnas para la tabla de Número de Empleados.
 * Cada objeto en el arreglo define los detalles de una columna.
 * La clave indica el valor que se mostrará y el orden define la posición de la columna en la tabla.
 */
export const NUMERO_DE_EMPLEADOS_CONFIGURACION: ConfiguracionColumna<NumeroDeEmpleados>[] =
  [
    {
      encabezado: 'Denominacion Social',
      clave: (item: NumeroDeEmpleados) => item.denominacion,
      orden: 1,
    },
    {
      encabezado: 'RFC',
      clave: (item: NumeroDeEmpleados) => item.RFC,
      orden: 2,
    },
    {
      encabezado: 'Numero de Empleados',
      clave: (item: NumeroDeEmpleados) => item.numeroDeEmpleados,
      orden: 3,
    },
    {
      encabezado: 'Bimestre',
      clave: (item: NumeroDeEmpleados) => item.bimestre,
      orden: 4,
    },
  ];

  /**
   * Configuración de las columnas para la visualización de la información de domicilios.
   * Cada columna corresponde a una propiedad de la entidad `Domicilios` y se utiliza para mostrarla en una tabla.
   */
  export const DOMICILIOS_CONFIGURACION_COLUMNAS: ConfiguracionColumna<Domicilios>[] = 
    [
      {
        encabezado: 'Instalaciones principales',
        clave: (item: Domicilios) => item.instalacionPrincipal,
        orden: 1,
      },
      {
        encabezado: 'Tipo de instalación',
        clave: (item: Domicilios) => item.tipoInstalacion,
        orden: 2,
      },
      {
        encabezado: 'Entidad federativa',
        clave: (item: Domicilios) => item.entidadFederativa,
        orden: 3,
      },
      {
        encabezado: 'Municipio o delegación',
        clave: (item: Domicilios) => item.municipioDelegacion,
        orden: 4,
      },
      {
        encabezado: 'Colonia, calle y número',
        clave: (item: Domicilios) => item.direccion,
        orden: 5,
      },
      {
        encabezado: 'Código postal',
        clave: (item: Domicilios) => item.codigoPostal,
        orden: 6,
      },
      {
        encabezado: 'Registro ante SE/SAT',
        clave: (item: Domicilios) => item.registroSESAT,
        orden: 7,
      },
      {
        encabezado: 'Proceso Productivo',
        clave: (item: Domicilios) => item.procesoProductivo,
        orden: 8,
      },
      {
        encabezado: 'Acredita el uso y Goce del Inmueble',
        clave: (item: Domicilios) => item.acreditaInmueble,
        orden: 9,
      },
      {
        encabezado: 'Realiza operaciones de Comercio Exterior',
        clave: (item: Domicilios) => item.operacionesCExt,
        orden: 10,
      },
      {
        encabezado: 'Reconocimiento Mutuo (Instalación C-TPAT)',
        clave: (item: Domicilios) => item.instalacionCtpat,
        orden: 11,
      },
      {
        encabezado: 'Perfil de la empresa',
        clave: (item: Domicilios) => item.instalacionPerfil,
        orden: 12,
      },
      {
        encabezado: 'Perfil del Recinto Fiscalizado Estratégico',
        clave: (item: Domicilios) => item.instalacionPerfilRFE,
        orden: 13,
      },
      {
        encabezado: 'Perfil del Auto Transportista Terrestre',
        clave: (item: Domicilios) => item.instalacionPerfilAuto,
        orden: 14,
      },
      {
        encabezado: 'Perfil del Transportista Ferroviario',
        clave: (item: Domicilios) => item.instalacionPerfilFerro,
        orden: 15,
      },
      {
        encabezado: 'Perfil del Recinto Fiscalizado',
        clave: (item: Domicilios) => item.instalacionPerfilRf,
        orden: 16,
      },
      {
        encabezado: 'Perfil de Mensajería y Paquetería',
        clave: (item: Domicilios) => item.instalacionPerfilMensajeria,
        orden: 17,
      },
    ];

export const CONTROL_INVENTARIOS = [
  {
    id: 'indiqueSiCuentaFraccionI',
    labelNombre: 'Indique si cuenta con un sistema de control de inventarios, para el registro de sus operaciones de comercio exterior de conformidad con el artículo 59, fracción I de la Ley.',
    campo: 'indiqueSiCuentaFraccionI',
    clase: 'col-md-12',
    tipoInput: 'radio',
    desactivado: false,
    soloLectura: false,
    validadores: [{ tipo: 'required' }],
    valorPredeterminado: '',
    marcadorDePosicion: '',
    marginTop: 0,
    opciones: [
      {
        label: 'Si',
        value: 'Si',
      },
      {
        label: 'No',
        value: 'No',
      },
    ],
    gridLayout: true
  },
  {
    id: 'identificacion',
    labelNombre: 'Nombre del sistema o datos para su identificación',
    campo: 'identificacion',
    clase: 'col-md-6',
    tipoInput: 'text',
    desactivado: false,
    soloLectura: false,
    validadores: [{tipo: 'required'}],
    valorPredeterminado: '',
    marcadorDePosicion: '',
    marginTop: 0
  },
  {
    id: 'lugarDeRadicacion',
    labelNombre: 'Lugar de radicación',
    campo: 'lugarDeRadicacion',
    clase: 'col-md-6',
    tipoInput: 'text',
    desactivado: false,
    soloLectura: false,
    validadores: [{tipo: 'required'}],
    valorPredeterminado: '',
    marcadorDePosicion: '',
    marginTop: 0
  },
  {
    id: 'indiqueAnexo24',
    labelNombre: 'Indique, si cuenta con un sistema de control de inventarios de conformidad con las disposiciones previstas por el Anexo 24.',
    campo: 'indiqueAnexo24',
    clase: 'col-md-12',
    tipoInput: 'checkbox',
    desactivado: false,
    soloLectura: false,
    validadores: [],
    valorPredeterminado: '',
    marcadorDePosicion: '',
    marginTop: 3
  },
]

/**
 * Configuración de las columnas para la visualización de la información de inventarios.
 * Cada columna representa una propiedad de la entidad `Inventarios` y se configura con
 * detalles como la clave, el encabezado, y el tipo de entrada en la tabla.
 */
export const INVENTARIOS_CONFIGURACION: ConfiguracionAporteColumna<Inventarios>[] =
  [
    {
      encabezado: 'Nombre del sistema o datos para su identificación',
      llave: '',
      clave: (item: Inventarios) => item.nombre,
      orden: 1,
      opcionDeEntrada: TablaCampoSeleccion.NONE,
    },
    {
      encabezado: 'Lugar de radicación',
      llave: '',
      clave: (item: Inventarios) => item.lugarRadicacion,
      orden: 2,
      opcionDeEntrada: TablaCampoSeleccion.NONE,
    },
    {
      encabezado:
        'Indique, si cuenta con un sistema de control de inventarios de conformidad con las disposiciones previstas por el Anexo 24.',
      llave: '',
      clave: (item: Inventarios) => item.anexo24,
      orden: 3,
      opcionDeEntrada: TablaCampoSeleccion.CHECKBOX,
    },
  ];