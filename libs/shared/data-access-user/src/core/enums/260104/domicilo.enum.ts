import { CrossListLable } from "../../../tramites/components/crosslist/crosslist.component";

/**
 * Lista de países disponibles para la selección en el formulario.
 * Cada elemento de la lista representa el nombre oficial de un país o territorio.
 */
export const CROSLISTA_DE_PAISES: string[] = [
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
 
/**
 * Constante que representa una acción para continuar un proceso.
 * Valor "t" indica la continuidad o confirmación de una acción específica.
 */
export const CONTINUAR: string = "t";

export const ETIQUETA : CrossListLable ={
  tituluDeLaIzquierda: 'País de procedencia',
  derecha: 'País(es) seleccionados',
}

export const FECHA_DE_FABRICACION = {
  labelNombre: 'Fecha de fabricación',
  required: true,
  habilitado: false,
};

export const FECHA_DE_PAGO = {
  labelNombre: 'Fecha de caducidad',
  required: true,
  habilitado: false,
};

export const OPCIONES_DE_BOTON_DE_RADIO = [
  {
      label: 'No',
      value: '0',
  },
  {
      label: 'Si',
      value: '1',
  }
];

export const VALOR_FORMULARIO = {
  nombre: 47875,
  apellidoPaterno: 'Paterno',
  apellidoMaterno: 'Materno',
}
 