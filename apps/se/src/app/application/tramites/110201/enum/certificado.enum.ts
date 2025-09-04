import { ConfiguracionColumna } from "@libs/shared/data-access-user/src";
import { SeleccionadasTabla } from "../models/registro.model";

export const HEADERS_DATA: ConfiguracionColumna<SeleccionadasTabla>[] = [
    {
      encabezado: 'Fracción arancelaria',
      clave: (ele: SeleccionadasTabla) => ele.fraccionArancelaria,
      orden: 1,
    },
    {
      encabezado: 'Cantidad',
      clave: (ele: SeleccionadasTabla) => ele.cantidad,
      orden: 2,
    },
    {
      encabezado: 'Unidad de medida',
      clave: (ele: SeleccionadasTabla) => ele.unidadMedida,
      orden: 3,
    },
    {
      encabezado: 'Valor mercancía',
      clave: (ele: SeleccionadasTabla) => ele.valorMercancia,
      orden: 4,
    },
    {
      encabezado: 'Tipo de factura',
      clave: (ele: SeleccionadasTabla) => ele.tipoFactura,
      orden: 5,
    },
    {
      encabezado: 'Número factura',
      clave: (ele: SeleccionadasTabla) => ele.numFactura,
      orden: 6,
    },
    {
      encabezado: 'Complemento descripción',
      clave: (ele: SeleccionadasTabla) => ele.complementoDescripcion,
      orden: 7,
    },
    {
      encabezado: 'Fecha factura',
      clave: (ele: SeleccionadasTabla) => ele.fechaFactura,
      orden: 8,
    },
  ];

  export const HEADER_MAP_DATOS: { [key: string]: string } = {
    'Fracción arancelaria': 'fraccionArancelaria',
    'Cantidad': 'cantidad',
    'Unidad de medida': 'unidadMedida',
    'Valor mercancía': 'valorMercancia',
    'Tipo de factura': 'tipoFactura',
    'Número factura': 'numFactura',
    'Complemento descripción': 'complementoDescripcion',
    'Fecha factura': 'fechaFactura',
  };