export const PANTA_PASOS = [
    {
      indice: 1,
      titulo: 'Capturar solicitud',
      activo: true,
      completado: false,
    },
    {
      indice: 2,
      titulo: 'Requisitos necesarios',
      activo: false,
      completado: false,
    },
    {
        indice: 3,
        titulo: 'Anexar requisitos',
        activo: false,
        completado: false,
    },
    {
        indice: 4,
        titulo: 'Firmar solicitud',
        activo: false,
        completado: false,
    },
];

export const CROSLISTA_DE_PAISES: string[] = [
  "JARABE",
  "LAMINILLA",
  "LINIMENTO LOCIÓN",
  "OBLEA",
  "OTROS",
  "PARCHES",
  "PASTA",
  "PASTILLA",
  "POLVO",
  "SISTEMA DE LIBERACIÓN",
  "SOLUCIÓN",
];


export const PAISES_DE_ORIGEN: string[] = [
  "AFGANISTÁN (EMIRATO ISLÁMICO)",
  "ALBANIA (REPÚBLICA DE)",
  "ALEMANIA (REPÚBLICA FEDERAL DE)",
  "ANDORRA (PRINCIPADO DE)",
  "ANGOLA (REPÚBLICA DE)",
  "ANGUILLA",
  "ANTIGUA Y BARBUDA",
  "ARABIA SAUDITA (COMUNIDAD ECONÓMICA EUROPEA)",
  "ARGELIA (REPÚBLICA DEMOCRÁTICA Y POPULAR DE)",
  "ARGENTINA (REPÚBLICA)",
  "AUSTRALIA (COMMONWEALTH OF)",
  "AUSTRIA (REPUBLIC OF)",
  "BAHAMAS (COMMONWEALTH OF THE)",
  "BAHRAIN (KINGDOM OF)",
  "BANGLADESH (PEOPLE'S REPUBLIC OF)",
  "BARBADOS",
  "BELGIUM (KINGDOM OF)",
  "BELIZE",
  "BENIN (REPUBLIC OF)",
  "BHUTAN (KINGDOM OF)"
];


export const USO_ESPECIFICO: string[] = [
  "ACONDICIONAMIENTO",
  "ALMACENAMIENTO",
  "ANÁLISIS",
  "CONSERVACIÓN",
  "DISTRIBUCIÓN",
  "DONACIONES",
  "ELABORACIÓN",
  "ENVASADO",
  "EXPORTACIÓN",
  "FABRICACIÓN",
  "FORMULACIÓN"
];

export const FABRICANTE_TABLA = [
    { encabezado: 'Nombre/denominación o razón social', clave: 'nombre' },
    { encabezado: 'R.F.C', clave: 'rfc' },
    { encabezado: 'CURP', clave: 'curp' },
    { encabezado: 'Teléfono', clave: 'telefono' },
    { encabezado: 'Correo electrónico', clave: 'correoElectronico' },
    { encabezado: 'Calle', clave: 'calle' },
    { encabezado: 'Número exterior', clave: 'numeroExterior' },
    { encabezado: 'Número interior', clave: 'numeroInterior' },
    { encabezado: 'País', clave: 'pais' },
    { encabezado: 'Colonia', clave: 'colonia' },
    { encabezado: 'Municipio o alcaldia', clave: 'municipio' },
    { encabezado: 'Localidad', clave: 'localidad' },
    { encabezado: 'Entidad federativa', clave: 'entidadFederativa' },
    { encabezado: 'Estado/Localidad', clave: 'estado' },
    { encabezado: 'Código postal.', clave: 'cp' },
  ];


export const OTROS_TABLA = [
  { encabezado: 'Tercero nombre descripción', clave: 'tercero' },
  { encabezado: 'Nombre/denominación o razón social', clave: 'nombre' },
  { encabezado: 'R.F.C', clave: 'rfc' },
  { encabezado: 'CURP', clave: 'curp' },
  { encabezado: 'Teléfono', clave: 'telefono' },
  { encabezado: 'Correo electrónico', clave: 'correoElectronico' },
  { encabezado: 'Calle', clave: 'calle' },
  { encabezado: 'Número exterior', clave: 'numeroExterior' },
  { encabezado: 'Número interior', clave: 'numeroInterior' },
  { encabezado: 'País', clave: 'pais' },
  { encabezado: 'Colonia', clave: 'colonia' },
  { encabezado: 'Municipio o alcaldia', clave: 'municipio' },
  { encabezado: 'Localidad', clave: 'localidad' },
  { encabezado: 'Entidad federativa', clave: 'entidadFederativa' },
  { encabezado: 'Estado/Localidad', clave: 'estado' },
  { encabezado: 'Código postal.', clave: 'cp' },
];

export const PASO_ONE = 'Solicitud Importación de Medicamentos que sean o contengan Estupefacientes O Psicotrópicos';
export const PASO_TWO = 'Cargar archivos';
export const PASO_THREE = 'Cargar archivos';
export const PASO_FOUR = 'Firmar';
