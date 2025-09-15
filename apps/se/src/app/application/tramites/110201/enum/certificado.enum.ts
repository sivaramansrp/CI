import { ConfiguracionColumna } from "@libs/shared/data-access-user/src";
import { SeleccionadasTabla } from "../models/registro.model";

/**
 * Encabezados de la tabla de mercancías seleccionadas.
 * 
 * Define la configuración de las columnas que se mostrarán en la tabla de mercancías seleccionadas,
 * incluyendo el nombre del encabezado, la clave para obtener el valor de cada columna y el orden de aparición.
 */
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

/**
 * Mapeo de los encabezados de la tabla a las claves de los datos.
 * 
 * Permite relacionar el nombre del encabezado mostrado en la tabla con la propiedad correspondiente
 * en el modelo de datos SeleccionadasTabla.
 */
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

/**
 * @constant ERROR_FORMA_ALERT
 * @description
 * Mensaje HTML que se muestra como alerta cuando faltan campos por capturar en el formulario.
 * Se utiliza para informar al usuario que debe completar todos los campos requeridos antes de continuar.
 */
export const ERROR_FORMA_ALERT =
  `
<div class="d-flex justify-content-center text-center">
  <div>
    <div class="col-md-12">
      <strong>¡Error de registro!</strong>Faltan campos por capturar.
    </div>
  </div>
</div>
`