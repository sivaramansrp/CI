import { Fabricante, Otros } from "@libs/shared/data-access-user/src";

export const PANTA_PASOS = [
    {
      indice: 1,
      titulo: 'Capturar solicitud',
      activo: true,
      completado: false,
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


export const FABRICANTE_TABLA: Array<{ encabezado: string; clave: keyof Fabricante }> = [
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


export const OTROS_TABLA:Array<{ encabezado: string; clave: keyof Otros }> = [
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

export const PASO_UNO = 'Solicitud de Importación de Medicamentos que sean o contengan Estupefacientes o Psicotrópicos';
export const PASO_DOS = 'Cargar archivos';
export const PASO_TRES = 'Firmar';

export const FECHA_PAGO = {
  labelNombre: 'Fecha de pago',
  required: false,
  habilitado: false,
};
