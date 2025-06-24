import { Sensible } from "../models/datos-de-la-solicitue.model";

export const CONFIGURACION_SENSIBLES = [
  {
    encabezado: 'Número de lote',
    clave: (ele: Sensible): string | undefined => ele.NumeroLote,
    orden: 1,
  },
  {
    encabezado: 'Color/Pelaje',
    clave: (ele: Sensible): string | undefined => ele.ColorPelaje,
    orden: 2,
  },
  {
    encabezado: 'Edad del animal',
    clave: (ele: Sensible): string | undefined => ele.EdadAnimal,
    orden: 3,
  },
  {
    encabezado: 'Fase de desarrollo',
    clave: (ele: Sensible): string | undefined => ele.FaseDesarrollo,
    orden: 4,
  },
  {
    encabezado: 'Función zootécnica',
    clave: (ele: Sensible): string | undefined => ele.FuncionZootecnica,
    orden: 5,
  },
  {
    encabezado: 'Nombre de la mercancía',
    clave: (ele: Sensible): string | undefined => ele.NombreMercancia,
    orden: 6,
  },
  {
    encabezado: 'Número de identificación',
    clave: (ele: Sensible): string | undefined => ele.NumeroIdentificacion,
    orden: 7,
  },
  {
    encabezado: 'Raza',
    clave: (ele: Sensible): string | undefined => ele.Raza,
    orden: 8,
  },
  {
    encabezado: 'Nombre científico',
    clave: (ele: Sensible): string | undefined => ele.NombreCientifico,
    orden: 9,
  },
  {
    encabezado: 'Sexo',
    clave: (ele: Sensible): string | undefined => ele.Sexo,
    orden: 10,
  },
];
