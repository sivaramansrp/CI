import { ConfiguracionColumna } from '@libs/shared/data-access-user/src';

export interface UnidadArrastre {
  numeroEconomico: string;
  tipoUnidad: string;
  marca: string;
  modelo: string;
  placas: string;
  capacidad: string;
  propietario: string;
}

export const UNIDADES_ARRASTRE_COLUMNAS: ConfiguracionColumna<UnidadArrastre>[] = [
  {
    encabezado: 'Número económico',
    clave: (item: UnidadArrastre) => item.numeroEconomico,
    orden: 1,
  },
  {
    encabezado: 'Tipo de unidad',
    clave: (item: UnidadArrastre) => item.tipoUnidad,
    orden: 2,
  },
  {
    encabezado: 'Marca',
    clave: (item: UnidadArrastre) => item.marca,
    orden: 3,
  },
  {
    encabezado: 'Modelo',
    clave: (item: UnidadArrastre) => item.modelo,
    orden: 4,
  },
  {
    encabezado: 'Placas',
    clave: (item: UnidadArrastre) => item.placas,
    orden: 5,
  },
  {
    encabezado: 'Capacidad',
    clave: (item: UnidadArrastre) => item.capacidad,
    orden: 6,
  },
  {
    encabezado: 'Propietario',
    clave: (item: UnidadArrastre) => item.propietario,
    orden: 7,
  },
];

export const TEXTOS_UNIDAD_ARRASTRE = {
  MENSAJE_MODIFICACION: `<p>Para modificar o dar de baja una unidad de arrastre existente, primero debe seleccionarla de la tabla.</p>`,
};
