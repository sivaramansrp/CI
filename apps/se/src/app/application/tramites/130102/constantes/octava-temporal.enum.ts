import { FraccionArancelariaProsec, OctavaTemporal } from "../models/octava-temporal.model";

/**
 * Mensaje de alerta que se muestra cuando hay un error en el registro 
 * debido a que faltan campos obligatorios por capturar.
 */
export const ERROR_DE_REGISTRO_ALERT =
'<strong>¡Error de registrot</strong>Faltan campos por capturar.';

/*
  * Mensaje de alerta que se muestra cuando hay un error en el registro 
  * debido a que la mercancía ya ha sido registrada.
  */
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
/*
  * Mensaje de alerta que se muestra cuando hay un error en el registro 
  * debido a que la mercancía ya ha sido registrada.
  */
export const FRACCIONES_ANARCIA_TABLA = [
  {
    encabezado: 'Fracción arancelaria',
    clave: (ele: FraccionArancelariaProsec): number | string => ele.fraccionArancelariaProsec,
    orden: 1,
  },
  {
    encabezado: "Descripción",
    clave: (ele: FraccionArancelariaProsec): string => ele.descripción,
    orden: 2,
  },
 
]

/*
* @constant MODIFICAR_PARTIDAS_FORM
*/
export const MODIFICAR_PARTIDAS_FORM = [
  {
    id: 'cantidad_partidas',
    labelNombre: 'Cantidad',
    campo: 'modificar_cantidad',
    clase: 'col-md-4',
    tipoInput: 'number',
    desactivado: false,
    soloLectura: false,
    validadores: [{ tipo: 'required' }],
    marcadorDePosicion: '',
    marginTop: 0,
  },
   {
    id: 'descripcion_partidas',
    labelNombre: 'Descripción',
    campo: 'modificar_descripcion',
    clase: 'col-md-8',
    tipoInput: 'textarea',
    desactivado: false,
    soloLectura: false,
    validadores: [
      {
        tipo: 'required',
        mensaje: '',
      },
    ],
    marcadorDePosicion: '',
    marginTop: 0,
  },
  {
    id: 'valor_partidas_usd',
    labelNombre: 'Valor partida USD',
    campo: 'valor_partidas_usd',
    clase: 'col-md-4',
    tipoInput: 'number',
    desactivado: false,
    soloLectura: false,
    validadores: [{ tipo: 'required' }],
    marcadorDePosicion: '',
    marginTop: 0,
  },
  {
    id: 'fraccion_partidas',
    labelNombre: 'Fracción arancelaria TIGIE',
    campo: 'fraccion_partidas',
    clase: 'col-md-8',
    tipoInput: 'select-catalogos',
    desactivado: false,
    soloLectura: false,
    validadores: [{ tipo: '' }],
    marcadorDePosicion: 'Selecciona una fracción',
    opciones: [
      {
        id: 1,
        descripcion: '87033302 Usados.',
      },
    ],
    marginTop: 0,
  },
 
 
];