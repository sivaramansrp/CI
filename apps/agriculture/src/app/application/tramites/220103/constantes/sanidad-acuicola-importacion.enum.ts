import { REGEX_ALFANUMERICO_CON_ESPACIOS, REGEX_NO_ESPACIOS_AL_INICIO_NI_AL_FINAL, REGEX_PATRON_DECIMAL_15_4 } from "@libs/shared/data-access-user/src";

import { DatosDelTercero, Mercancia } from "../modelos/sanidad-acuicola-importacion.model";

export const PASOS = [
  {
    indice: 1,
    titulo: 'Capturar solicitud',
    activo: true,
    completado: true,
  },
  {
    indice: 2,
    titulo: 'Requisitos neccesarios',
    activo: false,
    completado: false,
  },
  {
    indice: 3,
    titulo: 'Firmar solicitud',
    activo: false,
    completado: false,
  }
];

export const IMPORTANTE = {
  Importante: `Las tablas con asterisco son obligatorias y debes agregar por lo menos un registro.`,
};

export const CAMPOS_FORMULARIO_DATOS_DEL_TRAMITE = [
  {
    id: 'aduanaDeIngreso',
    labelNombre: 'Aduana de ingreso',
    campo: 'aduanaDeIngreso',
    clase: 'col-md-4',
    tipoInput: 'select-catalogos',
    desactivado: false,
    soloLectura: false,
    validadores: [
      { tipo: 'required' }
    ],
    marcadorDePosicion: '',
    valorPredeterminado: '',
    opciones: [{ id: 1, descripcion: "ACAPULCO, PUERTO Y AEROPUERTO" },
    { id: 2, descripcion: "ADUANA DE PANTACO" },
    { id: 3, descripcion: "AEROPUERTO INT. DE LA CD DE MEXICO" },
    { id: 4, descripcion: "AEROPUERTO INTERNACIONAL FELIPE ÁNGELES" },
    { id: 5, descripcion: "AGUA PRIETA" },
    { id: 6, descripcion: "AGUASCALIENTES, AGS." },
    { id: 7, descripcion: "ALTAMIRA" },
    { id: 8, descripcion: "CANCUN, AEROPUERTO" },
    { id: 9, descripcion: "CD. CAMARGO, TAMPS." },
    { id: 10, descripcion: "CD. DEL CARMEN" },
    { id: 11, descripcion: "CD. JUAREZ" },
    { id: 12, descripcion: "CHIHUAHUA, CHIH." }],
    marginTop: 4,
    mostrar: true,
    habilitado: true,
  },
  {
    id: 'medioDeTransporte',
    labelNombre: 'Medio de transporte',
    campo: 'medioDeTransporte',
    clase: 'col-md-4',
    tipoInput: 'select-catalogos',
    desactivado: false,
    soloLectura: false,
    validadores: [
    ],
    marcadorDePosicion: '',
    valorPredeterminado: '',
    opciones: [
      { id: 1, descripcion: "Aéreo" },
      { id: 2, descripcion: "Marítimo" },
      { id: 3, descripcion: "Otros" },
      { id: 4, descripcion: "Terrestre" }
    ],
    marginTop: 4,
    mostrar: true,
    habilitado: true,
  },
  {
    id: 'identificacionDelTransporte',
    labelNombre: 'Identificación del transporte',
    campo: 'identificacionDelTransporte',
    clase: 'col-md-4',
    tipoInput: 'text',
    desactivado: false,
    soloLectura: false,
    validadores: [
      { tipo: 'pattren', valor: REGEX_ALFANUMERICO_CON_ESPACIOS, mensaje: 'El campo solo acepta letras y números' },

    ],
    marcadorDePosicion: '',
    valorPredeterminado: '',
    marginTop: 4,
    mostrar: true,
    habilitado: true,
  }
];

export const CAMPOS_FORMULARIO_MERCANCIAS = [
  {
    id: 'descripcion',
    labelNombre: 'Descripción',
    campo: 'descripcion',
    clase: 'col-md-9',
    tipoInput: 'textarea',
    desactivado: false,
    soloLectura: false,
    validadores: [
      { tipo: 'required' },
      { tipo: 'pattern', valor: REGEX_NO_ESPACIOS_AL_INICIO_NI_AL_FINAL, mensaje: 'Por favor, corrija la descripción' }
    ],
    marcadorDePosicion: '',
    valorPredeterminado: '',
    marginTop: 0,
    mostrar: true,
    habilitado: true,
  },
  {
    id: 'fraccionArancelaria',
    labelNombre: 'Fracción arancelaria',
    campo: 'fraccionArancelaria',
    clase: 'col-md-4',
    tipoInput: 'text',
    desactivado: false,
    soloLectura: false,
    validadores: [
    ],
    marcadorDePosicion: '',
    valorPredeterminado: '',
    marginTop: 4,
    mostrar: true,
    habilitado: true,
  },
  {
    id: 'descripcionFraccion',
    labelNombre: 'Descripción de la fracción',
    campo: 'descripcionFraccion',
    clase: 'col-md-8',
    tipoInput: 'text',
    desactivado: true,
    soloLectura: false,
    validadores: [
    ],
    marcadorDePosicion: '',
    valorPredeterminado: '',
    marginTop: 4,
    mostrar: true,
    habilitado: true,
  },

  {
    id: 'cantidadUMT',
    labelNombre: 'Cantidad en UMT',
    campo: 'cantidadUMT',
    clase: 'col-md-4',
    tipoInput: 'number',
    desactivado: false,
    soloLectura: false,
    validadores: [
      { tipo: 'pattern', valor: REGEX_PATRON_DECIMAL_15_4, mensaje: 'El valor debe ser un número con hasta 15 dígitos enteros y hasta 4 dígitos decimales.' }

    ],
    marcadorDePosicion: '',
    valorPredeterminado: '',
    marginTop: 4,
    mostrar: true,
    habilitado: true,
  },
  {
    id: 'umt',
    labelNombre: 'Unidad de medida (UMT)',
    campo: 'umt',
    clase: 'col-md-4',
    tipoInput: 'text',
    desactivado: true,
    soloLectura: false,
    validadores: [
    ],
    marcadorDePosicion: '',
    valorPredeterminado: '',
    marginTop: 4,
    mostrar: true,
    habilitado: true,
  },
  {
    id: '',
    labelNombre: '',
    campo: '',
    clase: 'col-md-4',
    tipoInput: '',
    desactivado: false,
    soloLectura: false,
    validadores: [],
    marcadorDePosicion: '',
    valorPredeterminado: '',
    marginTop: 0
  },
  {
    id: 'cantidadUMC',
    labelNombre: 'Cantidad en UMC',
    campo: 'cantidadUMC',
    clase: 'col-md-4',
    tipoInput: 'number',
    desactivado: false,
    soloLectura: false,
    validadores: [
    ],
    marcadorDePosicion: '',
    valorPredeterminado: '',
    marginTop: 0,
    mostrar: true,
    habilitado: true,
  },
  {
    id: 'umc',
    labelNombre: 'Unidad de medida (UMC)',
    campo: 'umc',
    clase: 'col-md-4',
    tipoInput: 'select-catalogos',
    desactivado: false,
    soloLectura: false,
    validadores: [
    ],
    marcadorDePosicion: '',
    valorPredeterminado: '',
    opciones: [{ id: 1, descripcion: 'Caja' },
    { id: 2, descripcion: 'Cientos' },
    { id: 3, descripcion: 'Decenas' },
    { id: 4, descripcion: 'Docenas' },
    { id: 5, descripcion: 'Gramo' },
    { id: 6, descripcion: 'Gramo Neto' },
    { id: 7, descripcion: 'Juego' },
    { id: 8, descripcion: 'Kilogramo' },
    { id: 9, descripcion: 'Litro' },
    { id: 10, descripcion: 'Metro Cúbico' },
    { id: 11, descripcion: 'Metro Lineal' },
    { id: 12, descripcion: 'Metros Cuadrados' },
    { id: 13, descripcion: 'Miligramo' },
    { id: 14, descripcion: 'Pieza' },
    { id: 15, descripcion: 'Tonelada' }],
    marginTop: 0,
    mostrar: true,
    habilitado: true,
  },
  {
    id: '',
    labelNombre: '',
    campo: '',
    clase: 'col-md-4',
    tipoInput: '',
    desactivado: false,
    soloLectura: false,
    validadores: [],
    marcadorDePosicion: '',
    valorPredeterminado: '',
    marginTop: 0
  },
  {
    id: 'nombreComun',
    labelNombre: 'Nombre común',
    campo: 'nombreComun',
    clase: 'col-md-4',
    tipoInput: 'text',
    desactivado: false,
    soloLectura: false,
    validadores: [
      { tipo: 'required' },
      { tipo: 'pattern', valor: REGEX_NO_ESPACIOS_AL_INICIO_NI_AL_FINAL, mensaje: 'Por favor, corrija el nombre común' }
    ],
    marcadorDePosicion: '',
    valorPredeterminado: '',
    marginTop: 0,
    mostrar: true,
    habilitado: true,
  },
  {
    id: 'nombreCientifico',
    labelNombre: 'Nombre científico',
    campo: 'nombreCientifico',
    clase: 'col-md-4',
    tipoInput: 'text',
    desactivado: false,
    soloLectura: false,
    validadores: [
      { tipo: 'required' },
      { tipo: 'pattern', valor: REGEX_NO_ESPACIOS_AL_INICIO_NI_AL_FINAL, mensaje: 'Por favor, corrija el nombre científico' }
    ],
    marcadorDePosicion: '',
    valorPredeterminado: '',
    marginTop: 0,
    mostrar: true,
    habilitado: true,
  },
  {
    id: '',
    labelNombre: '',
    campo: '',
    clase: 'col-md-4',
    tipoInput: '',
    desactivado: false,
    soloLectura: false,
    validadores: [],
    marcadorDePosicion: '',
    valorPredeterminado: '',
    marginTop: 0
  },
  {
    id: 'faseDesarrollo',
    labelNombre: 'Fase de desarrollo',
    campo: 'faseDesarrollo',
    clase: 'col-md-4',
    tipoInput: 'text',
    desactivado: false,
    soloLectura: false,
    validadores: [
    ],
    marcadorDePosicion: '',
    valorPredeterminado: '',
    marginTop: 0,
    mostrar: true,
    habilitado: true,
  },
  {
    id: '',
    labelNombre: '',
    campo: '',
    clase: 'col-md-8',
    tipoInput: '',
    desactivado: false,
    soloLectura: false,
    validadores: [],
    marcadorDePosicion: '',
    valorPredeterminado: '',
    marginTop: 0
  },
  {
    id: 'uso',
    labelNombre: 'Uso',
    campo: 'uso',
    clase: 'col-md-4',
    tipoInput: 'select-catalogos',
    desactivado: false,
    soloLectura: false,
    validadores: [
    ],
    marcadorDePosicion: '',
    valorPredeterminado: '',
    opciones: [{ id: 1, descripcion: 'Acuacultura' },
    { id: 2, descripcion: 'Consumo humano' },
    { id: 3, descripcion: 'Investigación, diagnóstico o fomento' },
    { id: 4, descripcion: 'Ornato' },
    { id: 5, descripcion: 'Otro' },
    { id: 6, descripcion: 'Uso o consumo de animales terrestres' },
    { id: 7, descripcion: 'Uso o consumo de especies acuáticas' }],
    marginTop: 0,
    mostrar: true,
    habilitado: true,
  },
  {
    id: 'otroUso',
    labelNombre: 'Otro uso',
    campo: 'otroUso',
    clase: 'col-md-8',
    tipoInput: 'text',
    desactivado: false,
    soloLectura: false,
    validadores: [],
    marcadorDePosicion: '',
    valorPredeterminado: '',
    marginTop: 0,
    mostrar: false,
    habilitado: true,
  },
  {
    id: 'origen',
    labelNombre: 'Origen',
    campo: 'origen',
    clase: 'col-md-4',
    tipoInput: 'select-catalogos',
    desactivado: false,
    soloLectura: false,
    validadores: [
    ],
    marcadorDePosicion: '',
    valorPredeterminado: '',
    opciones: [{ id: 1, descripcion: 'Silvestre' },
    { id: 2, descripcion: 'Cultivado' }],
    marginTop: 4,
    mostrar: true,
    habilitado: true,
  },
  {
    id: '',
    labelNombre: '',
    campo: '',
    clase: 'col-md-8',
    tipoInput: '',
    desactivado: false,
    soloLectura: false,
    validadores: [],
    marcadorDePosicion: '',
    valorPredeterminado: '',
    marginTop: 0
  },
  {
    id: 'paisOrigen',
    labelNombre: 'País de origen',
    campo: 'paisOrigen',
    clase: 'col-md-4',
    tipoInput: 'select-catalogos',
    desactivado: false,
    soloLectura: false,
    validadores: [
      { tipo: 'required' }
    ],
    marcadorDePosicion: '',
    valorPredeterminado: '',
    opciones: [
      {
        id: 1,
        descripcion: "AFGANISTAN (EMIRATO ISLAMICO DE)"
      },
      {
        id: 2,
        descripcion: "ALBANIA (REPUBLICA DE)"
      },
      {
        id: 3,
        descripcion: "ALEMANIA (REPUBLICA FEDERAL DE)"
      },
      {
        id: 4,
        descripcion: "ANDORRA (PRINCIPADO DE)"
      },
      {
        id: 5,
        descripcion: "ANGOLA (REPUBLICA DE)"
      },
      {
        id: 6,
        descripcion: "ANGUILA"
      },
      {
        id: 7,
        descripcion: "ANTARTIDA"
      },
      {
        id: 8,
        descripcion: "ANTIGUA Y BARBUDA (COMUNIDAD BRITANICA DE NACIONES)"
      },
      {
        id: 9,
        descripcion: "ANTILLAS NEERLANDESAS (TERRITORIO HOLANDES DE ULTRAMAR)"
      },
      {
        id: 10,
        descripcion: "ARABIA SAUDITA (REINO DE)"
      }
    ],
    marginTop: 0,
    mostrar: true,
    habilitado: true,
  },
  {
    id: 'paisProcedencia',
    labelNombre: 'País de procedencia',
    campo: 'paisProcedencia',
    clase: 'col-md-4',
    tipoInput: 'select-catalogos',
    desactivado: false,
    soloLectura: false,
    validadores: [
      { tipo: 'required' }
    ],
    marcadorDePosicion: '',
    valorPredeterminado: '',
    opciones: [
      {
        id: 1,
        descripcion: "AFGANISTAN (EMIRATO ISLAMICO DE)"
      },
      {
        id: 2,
        descripcion: "ALBANIA (REPUBLICA DE)"
      },
      {
        id: 3,
        descripcion: "ALEMANIA (REPUBLICA FEDERAL DE)"
      },
      {
        id: 4,
        descripcion: "ANDORRA (PRINCIPADO DE)"
      },
      {
        id: 5,
        descripcion: "ANGOLA (REPUBLICA DE)"
      },
      {
        id: 6,
        descripcion: "ANGUILA"
      },
      {
        id: 7,
        descripcion: "ANTARTIDA"
      },
      {
        id: 8,
        descripcion: "ANTIGUA Y BARBUDA (COMUNIDAD BRITANICA DE NACIONES)"
      },
      {
        id: 9,
        descripcion: "ANTILLAS NEERLANDESAS (TERRITORIO HOLANDES DE ULTRAMAR)"
      },
      {
        id: 10,
        descripcion: "ARABIA SAUDITA (REINO DE)"
      }],
    marginTop: 0,
    mostrar: true,
    habilitado: true,
  }
];

export const CAMPOS_FORMULARIO_DATOS_DE_INSTALACION = [
  {
    id: 'numeroEstablecimiento',
    labelNombre: 'Número de establecimiento aprobado o autorizado',
    campo: 'numeroEstablecimiento',
    clase: 'col-md-8',
    tipoInput: 'number',
    desactivado: false,
    soloLectura: false,
    validadores: [],
    marcadorDePosicion: '',
    valorPredeterminado: '',
    marginTop: 4,
    mostrar: true,
    habilitado: true,
  },
  {
    id: 'coordenadasGeograficas',
    labelNombre: 'Coordenadas geográficas',
    campo: 'coordenadasGeograficas',
    clase: 'col-md-8',
    tipoInput: 'number',
    desactivado: false,
    soloLectura: false,
    validadores: [
    ],
    marcadorDePosicion: '',
    valorPredeterminado: '',
    marginTop: 4,
    mostrar: true,
    habilitado: true,
  }
];

export const CONFIGURACION_MERCANCIAS = [
  {
    encabezado: 'Fracción arancelaria',
    clave: (ele: Mercancia): string => ele.fraccionArancelaria,
    orden: 1
  },
  {
    encabezado: 'Descripción de la fracción',
    clave: (ele: Mercancia): string => ele.descripcionFraccion,
    orden: 2
  },
  {
    encabezado: 'Descripción de la mercancía',
    clave: (ele: Mercancia): string => ele.descripcion,
    orden: 3
  },
  {
    encabezado: 'Cantidad en UMT',
    clave: (ele: Mercancia): string => ele.cantidadUMT,
    orden: 4
  },
  {
    encabezado: 'Unidad de medida (UMT)',
    clave: (ele: Mercancia): string => ele.umt,
    orden: 5
  },
  {
    encabezado: 'Cantidad en UMC',
    clave: (ele: Mercancia): string => ele.cantidadUMC,
    orden: 6
  },
  {
    encabezado: 'Unidad de medida (UMC)',
    clave: (ele: Mercancia): string => ele.umc,
    orden: 7
  },
  {
    encabezado: 'Nombre común',
    clave: (ele: Mercancia): string => ele.nombreComun,
    orden: 8
  },
  {
    encabezado: 'Nombre científico',
    clave: (ele: Mercancia): string => ele.nombreCientifico,
    orden: 9
  },
  {
    encabezado: 'Fase de desarrollo',
    clave: (ele: Mercancia): string => ele.faseDesarrollo,
    orden: 10
  },
  {
    encabezado: 'Uso',
    clave: (ele: Mercancia): string => ele.uso,
    orden: 11
  },
  {
    encabezado: 'Otro uso',
    clave: (ele: Mercancia): string => ele.otroUso,
    orden: 12
  },
  {
    encabezado: 'Origen',
    clave: (ele: Mercancia): string => ele.origen,
    orden: 13
  },
  {
    encabezado: 'País de origen',
    clave: (ele: Mercancia): string => ele.paisOrigen,
    orden: 14
  },
  {
    encabezado: 'País de procedencia',
    clave: (ele: Mercancia): string => ele.paisProcedencia,
    orden: 15
  }
];

export const CONFIGURACION_CONTACTO = [
  {
    encabezado: 'Nombre/denominaciC o razón social',
    clave: (ele: DatosDelTercero): string => ele.nombre,
    orden: 1
  },
  {
    encabezado: 'Teléfono',
    clave: (ele: DatosDelTercero): string => ele.telefono,
    orden: 2
  },
  {
    encabezado: 'Correo electrónico',
    clave: (ele: DatosDelTercero): string => ele.correoElectronico,
    orden: 3
  },
  {
    encabezado: 'Calle',
    clave: (ele: DatosDelTercero): string => ele.calle,
    orden: 4
  },
  {
    encabezado: 'Número exterior',
    clave: (ele: DatosDelTercero): string => ele.numeroExterior,
    orden: 5
  },
  {
    encabezado: 'Número interior',
    clave: (ele: DatosDelTercero): string => ele.numeroInterior,
    orden: 6
  },
  {
    encabezado: 'País',
    clave: (ele: DatosDelTercero): string => ele.pais,
    orden: 7
  },
];

export const CONFIGURACION_TABLA_INSTALACION = [
  {
    encabezado: 'Nombre de la instalación',
    clave: (ele: any): string => ele.nombreInstalacion,
    orden: 1,
  },
  {
    encabezado: 'Dirección',
    clave: (ele: any): string => ele.direccion,
    orden: 2,
  },
  {
    encabezado: 'Teléfono',
    clave: (ele: any): string => ele.telefono,
    orden: 3,
  },
  {
    encabezado: 'Correo electrónico',
    clave: (ele: any): string => ele.correoElectronico,
    orden: 4,
  },
  {
    encabezado: 'País',
    clave: (ele: any): string => ele.pais,
    orden: 5,
  },
];
