export interface TablaDatos {
  tbodyData: string[];
}
export interface Transporte {
  numeroIdentificacion: string;
  numeroEconomico: string;
  placa: string;
}

export interface Requisito {
  No: string;
  Fecha: string;
  Tipo: string | undefined;
}
export interface Producto {
  descripcion: string | undefined; 
}

export interface Detalle {
  fraccionArancelaria: string | undefined;
  cantidad: string;
  unidadMedida: string | undefined;
  nombreCientifico: string | undefined;
  nombreComun: string | undefined;
  paisOrigen: string | undefined;
  paisProcedencia: string | undefined;
}
export const CONFIGURATION_TABLA = [
  { encabezado: 'Descripción de la mercancía', clave: (item: Producto) => item.descripcion, orden: 1 },
];
export const CONFIGURATION_TABLA_MERCANCIAS = [
  { encabezado: 'Fracción arancelaria', clave: (item: Detalle) => item.fraccionArancelaria, orden: 1 },
  { encabezado: 'Cantidad', clave: (item: Detalle) => item.cantidad, orden: 2 },
  { encabezado: 'Unidad de medida', clave: (item: Detalle) => item.unidadMedida, orden: 3 },
  { encabezado: 'Nombre científico', clave: (item: Detalle) => item.nombreCientifico, orden: 4 },
  { encabezado: 'Nombre común', clave: (item: Detalle) => item.nombreComun, orden: 5 },
  { encabezado: 'País de origen', clave: (item: Detalle) => item.paisOrigen, orden: 6 },
  { encabezado: 'País de procedencia', clave: (item: Detalle) => item.paisProcedencia, orden: 7 }  
];
export const CONFIGURATION_TABLA_TRANSPORTE = [
{ encabezado: 'No. de Identificación', clave: (item: Transporte) => item.numeroIdentificacion, orden: 1 },
{ encabezado: 'No. económico', clave: (item: Transporte) => item.numeroEconomico, orden: 2 },
{ encabezado: 'Placa', clave: (item: Transporte) => item.placa, orden: 3 }];

export const CONFIGURATION_TABLA_REQUISITOS = [
  { encabezado: 'No', clave: (item: Requisito) => item.No, orden: 1 },
  { encabezado: 'Fecha', clave: (item: Requisito) => item.Fecha, orden: 2},
  { encabezado: 'Tipo', clave: (item: Requisito) => item.Tipo, orden: 3 }];
