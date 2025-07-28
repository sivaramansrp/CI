import { TablaEmpresaTransportista } from "../modelos/aviso-de-transportistas.model";

/**
 * Enumeración que define los diferentes manifiestos relacionados con la solicitud 33304.
 * Cada valor representa una declaración específica que puede ser utilizada en el contexto
 * de la solicitud para la importación temporal de activo fijo bajo el esquema pre-operativo.
 */


//TAB 1
export enum Solicitud33304Enum {
  /**
   * Manifiesto que indica que la empresa solicitante es la propietaria del activo fijo.
   */
  BAJO_MANIFIESTO = 'Bajo protesta de decir verdad, manifiesto que los datos asentados en el presente documento son ciertos y que las facultades que me fueron otorgadas para representar a la solicitante no me han sido modificadas y/o revocadas.',
}


//TAB 4
export const EMPRESAS_TRANSPORTISTAS_TABLA_DATOS = [
  {
    encabezado: 'RFC',
    clave: (item: TablaEmpresaTransportista): string => item.rfc,
    orden: 1,
  },
  {
    encabezado: 'Denominación o Razón Social',
    clave: (item: TablaEmpresaTransportista): string => item.denominacion,
    orden: 2,
  },
  {
    encabezado: 'Domicilio',
    clave: (item: TablaEmpresaTransportista): string => item.domicilio,
    orden: 3,
  },
  {
    encabezado: 'Registro CAAT Vigente',
    clave: (item: TablaEmpresaTransportista): string => item.registroCaat,
    orden: 4,
  },
  {
    encabezado: 'Estatus',
    clave: (item: TablaEmpresaTransportista): string => item.estatus,
    orden: 5,
  }
];


