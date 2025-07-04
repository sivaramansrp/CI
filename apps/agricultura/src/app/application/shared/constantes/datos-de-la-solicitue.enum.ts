import { DetallasDatos, Sensible } from "../models/datos-de-la-solicitue.model";
import { ConfiguracionColumna } from "@libs/shared/data-access-user/src";

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


export const CONFIGURACION_DETALLAS_DATOS: ConfiguracionColumna<DetallasDatos>[] = [
  {
    encabezado: 'Número de lote *',
    clave: (dato: DetallasDatos): string | undefined => dato.numeroDeLote,
    orden: 1,
  },
  {
    encabezado: 'Fecha de elaboración o empaque o proceso',
    clave: (dato: DetallasDatos): string | undefined => dato.fechaElaboracionEmpaqueProceso,
    orden: 2,
  },
  {
    encabezado: 'Fecha de producción o sacrificio',
    clave: (dato: DetallasDatos): string | undefined => dato.fechaProduccionSacrificio,
    orden: 3,
  },
  {
    encabezado: 'Fecha de caducidad del producto o consumo preferente',
    clave: (dato: DetallasDatos): string | undefined => dato.fechaCaducidadProducto,
    orden: 4,
  },
  {
    encabezado: 'Fecha fin de elaboración o empaque o proceso',
    clave: (dato: DetallasDatos): string | undefined => dato.fechaFinElaboracionEmpaqueProceso,
    orden: 5,
  },
  {
    encabezado: 'Fecha fin de producción o sacrificio',
    clave: (dato: DetallasDatos): string | undefined => dato.fechaFinProduccionSacrificio,
    orden: 6,
  },
  {
    encabezado: 'Fecha fin de caducidad del producto o consumo preferente',
    clave: (dato: DetallasDatos): string | undefined => dato.fechaFinCaducidadProducto,
    orden: 7,
  }
];

