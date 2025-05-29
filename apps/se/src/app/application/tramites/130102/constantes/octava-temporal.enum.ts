import { FraccionArancelariaProsec, OctavaTemporal } from "../models/octava-temporal.model";

/**
 * Mensaje de alerta que se muestra cuando hay un error en el registro 
 * debido a que faltan campos obligatorios por capturar.
 */
export const ERROR_DE_REGISTRO_ALERT =
'<strong>¡Error de registrot</strong>Faltan campos por capturar.';


export const MERCANCIA_TABLA = [
  {
    encabezado: 'Cantidad',
    clave: (ele: OctavaTemporal): number => ele.cantidad,
    orden: 1,
  },
  {
    encabezado: "Unidad de medida",
    clave: (ele: OctavaTemporal): string => ele.unidadDeMedida,
    orden: 2,
  },
  {
    encabezado:  "Fracción arancelaria",
    clave: (ele: OctavaTemporal): string => ele.fraccionArancelaria,
    orden: 3,
  },
  {
    encabezado: "Descripción",
    clave: (ele: OctavaTemporal): string => ele.descripción,
    orden: 4,
  },
  {
    encabezado: "Colonia",
    clave: (ele: OctavaTemporal): string => ele.colonia,
    orden: 5,
  },
  {
    encabezado: "Precio unitario USD",
    clave: (ele: OctavaTemporal): string => ele.precioUnitarioUSD,
    orden: 6,
  },
  {
    encabezado:   "Total USD",
    clave: (ele: OctavaTemporal): number => ele.totalUsd,
    orden: 7,
  }
];

export const FRACCIONES_ANARCIA_TABLA = [
  {
    encabezado: 'Fracción arancelaria',
    clave: (ele: FraccionArancelariaProsec): number => ele.fraccionArancelariaProsec,
    orden: 1,
  },
  {
    encabezado: "Descripción",
    clave: (ele: FraccionArancelariaProsec): string => ele.descripción,
    orden: 2,
  },
 
]